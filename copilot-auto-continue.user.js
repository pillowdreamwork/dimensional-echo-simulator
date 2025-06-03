// ==UserScript==
// @name         Copilot Auto Continue
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-click continue button when GitHub Copilot is working
// @author       You
// @match        https://github.com/*
// @match        https://*.github.com/*
// @match        https://vscode.dev/*
// @match        https://*.vscode.dev/*
// @match        *://localhost:*/*
// @match        *://127.0.0.1:*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let isAutoClickEnabled = true;
    let clickInterval = null;
    let lastClickTime = 0;
    const CLICK_COOLDOWN = 1000; // 1 second cooldown between clicks

    // CSS selectors for continue buttons across different platforms
    const continueSelectors = [
        '[data-testid="continue-button"]',
        'button[aria-label*="continue"]',
        'button[title*="continue"]',
        'button:contains("Continue")',
        '.continue-button',
        '[class*="continue"]',
        'button[data-action="continue"]',
        'button:has-text("Continue")',
        '[role="button"]:contains("Continue")',
        // GitHub Copilot specific
        '.copilot-continue-button',
        '[data-copilot-action="continue"]',
        // VS Code specific
        '.monaco-button:contains("Continue")',
        '.action-label:contains("Continue")',
        // Generic patterns
        'button:contains("Continue")',
        'input[type="button"][value*="Continue"]',
        'input[type="submit"][value*="Continue"]'
    ];

    // Create floating control panel
    function createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'copilot-auto-continue-panel';
        panel.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                background: #1a1a1a;
                border: 2px solid #4CAF50;
                border-radius: 8px;
                padding: 12px;
                font-family: monospace;
                font-size: 12px;
                color: #fff;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                min-width: 200px;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="color: #4CAF50; margin-right: 8px;">🤖</span>
                    <strong>Copilot Auto-Continue</strong>
                </div>
                <div style="margin-bottom: 8px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="auto-click-toggle" ${isAutoClickEnabled ? 'checked' : ''} 
                               style="margin-right: 6px;">
                        Auto-click enabled
                    </label>
                </div>
                <div style="font-size: 10px; color: #888;">
                    Status: <span id="status">Monitoring</span>
                </div>
                <div style="font-size: 10px; color: #888; margin-top: 4px;">
                    Clicks: <span id="click-count">0</span>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        // Add event listeners
        const toggle = document.getElementById('auto-click-toggle');
        toggle.addEventListener('change', (e) => {
            isAutoClickEnabled = e.target.checked;
            updateStatus();
        });
    }

    let clickCount = 0;

    function updateStatus() {
        const statusEl = document.getElementById('status');
        const countEl = document.getElementById('click-count');
        if (statusEl) {
            statusEl.textContent = isAutoClickEnabled ? 'Active' : 'Disabled';
            statusEl.style.color = isAutoClickEnabled ? '#4CAF50' : '#ff6b6b';
        }
        if (countEl) {
            countEl.textContent = clickCount;
        }
    }

    // Enhanced button detection with text content matching
    function findContinueButton() {
        // Try CSS selectors first
        for (const selector of continueSelectors) {
            const buttons = document.querySelectorAll(selector);
            for (const button of buttons) {
                if (isValidContinueButton(button)) {
                    return button;
                }
            }
        }

        // Fallback: search all buttons for text content
        const allButtons = document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"]');
        for (const button of allButtons) {
            if (isValidContinueButton(button)) {
                return button;
            }
        }

        return null;
    }

    function isValidContinueButton(element) {
        if (!element || !element.offsetParent) return false; // Hidden element
        
        const text = (element.textContent || element.value || element.getAttribute('aria-label') || '').toLowerCase();
        const continueKeywords = ['continue', 'proceed', 'next', 'go on', 'keep going'];
        
        // Check if button contains continue-related text
        const hasKeyword = continueKeywords.some(keyword => text.includes(keyword));
        
        // Additional checks for Copilot context
        const isCopilotContext = 
            element.closest('[class*="copilot"]') ||
            element.closest('[data-testid*="copilot"]') ||
            document.querySelector('[class*="copilot"], [data-testid*="copilot"]');

        // Check if button is clickable and visible
        const isClickable = !element.disabled && 
                           element.offsetWidth > 0 && 
                           element.offsetHeight > 0 &&
                           getComputedStyle(element).visibility !== 'hidden';

        return hasKeyword && isClickable && (isCopilotContext || text.includes('continue'));
    }

    function clickContinueButton() {
        if (!isAutoClickEnabled) return;

        const now = Date.now();
        if (now - lastClickTime < CLICK_COOLDOWN) return;

        const button = findContinueButton();
        if (button) {
            console.log('Auto-clicking continue button:', button);
            
            // Try multiple click methods for maximum compatibility
            button.click();
            button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            
            // For React components
            const reactClick = new Event('click', { bubbles: true });
            button.dispatchEvent(reactClick);

            clickCount++;
            lastClickTime = now;
            updateStatus();
        }
    }

    // Advanced monitoring system
    function startMonitoring() {
        // Primary interval for button detection
        clickInterval = setInterval(clickContinueButton, 500);

        // MutationObserver for dynamic content
        const observer = new MutationObserver((mutations) => {
            let shouldCheck = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldCheck = true;
                }
            });
            
            if (shouldCheck && isAutoClickEnabled) {
                setTimeout(clickContinueButton, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false
        });

        // Listen for keyboard shortcuts that might indicate Copilot activity
        document.addEventListener('keydown', (e) => {
            // Common Copilot shortcuts
            if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === '>')) {
                setTimeout(clickContinueButton, 200);
            }
        });

        // Listen for focus changes that might indicate new dialogs
        document.addEventListener('focusin', () => {
            setTimeout(clickContinueButton, 100);
        });
    }

    // Initialize when DOM is ready
    function init() {
        if (document.getElementById('copilot-auto-continue-panel')) return;
        
        createControlPanel();
        startMonitoring();
        updateStatus();
        
        console.log('Copilot Auto-Continue initialized');
    }

    // Multiple initialization triggers
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize on page navigation (SPA support)
    let currentUrl = location.href;
    setInterval(() => {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            setTimeout(init, 1000);
        }
    }, 1000);

    // Global functions for manual control
    window.copilotAutoClick = {
        enable: () => {
            isAutoClickEnabled = true;
            document.getElementById('auto-click-toggle').checked = true;
            updateStatus();
        },
        disable: () => {
            isAutoClickEnabled = false;
            document.getElementById('auto-click-toggle').checked = false;
            updateStatus();
        },
        clickNow: clickContinueButton,
        getStats: () => ({ enabled: isAutoClickEnabled, clicks: clickCount })
    };
})();
