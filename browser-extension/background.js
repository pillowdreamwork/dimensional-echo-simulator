/**
 * Background Service Worker for Copilot Auto-Continue Extension
 * Handles extension lifecycle, storage management, and cross-tab communication
 */

// Extension configuration
const DEFAULT_CONFIG = {
  AUTO_CONTINUE_ENABLED: true,
  QUANTUM_STATE_VALIDATION: true,
  DEBUG_MODE: false,
  CONTINUATION_DELAY: 1500,
  MAX_CONTINUATIONS: 5,
  DIMENSIONAL_CONTEXT_AWARE: true
};

// Install/Update handler
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('[Copilot Auto-Continue] Extension installed/updated:', details.reason);
  
  // Initialize default configuration
  const existingConfig = await chrome.storage.sync.get(DEFAULT_CONFIG);
  await chrome.storage.sync.set({
    ...DEFAULT_CONFIG,
    ...existingConfig,
    lastUpdate: Date.now()
  });
  
  // Set up context menu if needed
  try {
    chrome.contextMenus.create({
      id: 'copilot-auto-continue-toggle',
      title: 'Toggle Auto-Continue',
      contexts: ['page'],
      documentUrlPatterns: [
        'https://github.com/*',
        'https://copilot.github.com/*',
        'https://github.dev/*',
        'https://vscode.dev/*'
      ]
    });
  } catch (error) {
    console.warn('[Copilot Auto-Continue] Context menu creation failed:', error);
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'copilot-auto-continue-toggle') {
    const config = await chrome.storage.sync.get(['AUTO_CONTINUE_ENABLED']);
    const newState = !config.AUTO_CONTINUE_ENABLED;
    
    await chrome.storage.sync.set({ AUTO_CONTINUE_ENABLED: newState });
    
    // Notify content script
    chrome.tabs.sendMessage(tab.id, {
      action: 'CONFIG_UPDATED',
      config: { AUTO_CONTINUE_ENABLED: newState }
    });
    
    // Show notification
    chrome.action.setBadgeText({
      text: newState ? 'ON' : 'OFF',
      tabId: tab.id
    });
    
    chrome.action.setBadgeBackgroundColor({ color: newState ? '#00FF00' : '#FF0000' });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'GET_CONFIG':
      chrome.storage.sync.get(DEFAULT_CONFIG).then(config => {
        sendResponse({ success: true, config });
      });
      return true; // Keep message channel open for async response
      
    case 'UPDATE_CONFIG':
      chrome.storage.sync.set(message.config).then(() => {
        // Broadcast to all tabs
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
              action: 'CONFIG_UPDATED',
              config: message.config
            }).catch(() => {}); // Ignore errors for inactive tabs
          });
        });
        
        sendResponse({ success: true });
      });
      return true;
      
    case 'LOG_EVENT':
      // Store usage analytics locally
      chrome.storage.local.get(['usage_logs']).then(result => {
        const logs = result.usage_logs || [];
        logs.push({
          timestamp: Date.now(),
          event: message.event,
          data: message.data,
          url: sender.tab?.url
        });
        
        // Keep only last 1000 logs
        if (logs.length > 1000) {
          logs.splice(0, logs.length - 1000);
        }
        
        chrome.storage.local.set({ usage_logs: logs });
      });
      break;
      
    case 'QUANTUM_STATE_UPDATE':
      // Handle quantum state synchronization across tabs
      chrome.tabs.query({ url: ['https://github.com/*', 'https://copilot.github.com/*'] }, (tabs) => {
        tabs.forEach(tab => {
          if (tab.id !== sender.tab?.id) {
            chrome.tabs.sendMessage(tab.id, {
              action: 'SYNC_QUANTUM_STATE',
              quantumState: message.quantumState
            }).catch(() => {});
          }
        });
      });
      break;
  }
});

// Tab activation handler - update badge
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  
  if (tab.url && (
    tab.url.includes('github.com') ||
    tab.url.includes('copilot.github.com') ||
    tab.url.includes('github.dev') ||
    tab.url.includes('vscode.dev')
  )) {
    const config = await chrome.storage.sync.get(['AUTO_CONTINUE_ENABLED']);
    chrome.action.setBadgeText({
      text: config.AUTO_CONTINUE_ENABLED ? 'ON' : 'OFF',
      tabId: tab.id
    });
    chrome.action.setBadgeBackgroundColor({ 
      color: config.AUTO_CONTINUE_ENABLED ? '#00FF00' : '#FF0000' 
    });
  } else {
    chrome.action.setBadgeText({ text: '', tabId: tab.id });
  }
});

// Periodic cleanup and maintenance
setInterval(async () => {
  // Clean old usage logs
  const result = await chrome.storage.local.get(['usage_logs']);
  if (result.usage_logs) {
    const cutoff = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days
    const filteredLogs = result.usage_logs.filter(log => log.timestamp > cutoff);
    
    if (filteredLogs.length !== result.usage_logs.length) {
      await chrome.storage.local.set({ usage_logs: filteredLogs });
      console.log('[Copilot Auto-Continue] Cleaned old usage logs');
    }
  }
}, 60 * 60 * 1000); // Run every hour

// Export for debugging
if (typeof globalThis !== 'undefined') {
  globalThis.CopilotAutoContinueBackground = {
    DEFAULT_CONFIG,
    getStorageData: () => chrome.storage.sync.get(),
    clearLogs: () => chrome.storage.local.remove(['usage_logs'])
  };
}
