// Popup script for browser extension
document.addEventListener('DOMContentLoaded', async () => {
    const enableToggle = document.getElementById('enableToggle');
    const statusSpan = document.getElementById('status');
    const clickCountSpan = document.getElementById('clickCount');
    const activeTabsSpan = document.getElementById('activeTabs');
    const statusIndicator = document.getElementById('statusIndicator');
    const clickNowBtn = document.getElementById('clickNow');
    const resetBtn = document.getElementById('reset');

    // Load saved state
    const result = await chrome.storage.sync.get(['enabled', 'clickCount']);
    const enabled = result.enabled !== false; // Default to true
    const clickCount = result.clickCount || 0;

    enableToggle.checked = enabled;
    clickCountSpan.textContent = clickCount;
    updateUI();

    // Toggle functionality
    enableToggle.addEventListener('change', async () => {
        const enabled = enableToggle.checked;
        await chrome.storage.sync.set({ enabled });
        
        // Send message to all tabs
        const tabs = await chrome.tabs.query({});
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { 
                action: 'toggle', 
                enabled 
            }).catch(() => {}); // Ignore errors for tabs without content script
        });
        
        updateUI();
    });

    // Click now functionality
    clickNowBtn.addEventListener('click', async () => {
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.sendMessage(activeTab.id, { action: 'clickNow' }).catch(() => {});
    });

    // Reset functionality
    resetBtn.addEventListener('click', async () => {
        await chrome.storage.sync.set({ clickCount: 0 });
        clickCountSpan.textContent = '0';
        
        const tabs = await chrome.tabs.query({});
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { 
                action: 'reset' 
            }).catch(() => {});
        });
    });

    // Update UI based on state
    function updateUI() {
        const enabled = enableToggle.checked;
        statusSpan.textContent = enabled ? 'Active' : 'Disabled';
        statusIndicator.textContent = enabled ? 'Active' : 'Inactive';
        statusIndicator.className = `status ${enabled ? 'active' : 'inactive'}`;
    }

    // Listen for updates from content scripts
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === 'updateStats') {
            clickCountSpan.textContent = message.clickCount;
        }
    });

    // Update active tabs count
    const tabs = await chrome.tabs.query({});
    const relevantTabs = tabs.filter(tab => 
        tab.url.includes('github.com') || 
        tab.url.includes('vscode.dev') || 
        tab.url.includes('localhost')
    );
    activeTabsSpan.textContent = relevantTabs.length;
});
