// Content script for browser extension
(function() {
    'use strict';

    let isAutoClickEnabled = true;
    let clickInterval = null;
    let lastClickTime = 0;
    let clickCount = 0;
    const CLICK_COOLDOWN = 1000;

    // Load settings from storage
    chrome.storage.sync.get(['enabled', 'clickCount'], (result) => {
        isAutoClickEnabled = result.enabled !== false;
        clickCount = result.clickCount || 0;
        if (isAutoClickEnabled) {
            startMonitoring();
        }
    });

    // Continue button selectors (same as userscript)
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
        '.copilot-continue-button',
        '[data-copilot-action="continue"]',
        '.monaco-button:contains("Continue")',
        '.action-label:contains("Continue")',
        'button:contains("Continue")',
        'input[type="button"][value*="Continue"]',
        'input[type="submit"][value*="Continue"]'
    ];

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

        // Fallback: search all buttons
        const allButtons = document.querySelectorAll('button, input[type="button"], input[type="submit"], [role="button"]');
        for (const button of allButtons) {
            if (isValidContinueButton(button)) {
                return button;
            }
        }

        return null;
    }

    function isValidContinueButton(element) {
        if (!element || !element.offsetParent) return false;
        
        const text = (element.textContent || element.value || element.getAttribute('aria-label') || '').toLowerCase();
        const continueKeywords = ['continue', 'proceed', 'next', 'go on', 'keep going'];
        
        const hasKeyword = continueKeywords.some(keyword => text.includes(keyword));
        
        const isCopilotContext = 
            element.closest('[class*="copilot"]') ||
            element.closest('[data-testid*="copilot"]') ||
            document.querySelector('[class*="copilot"], [data-testid*="copilot"]');

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
            
            button.click();
            button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            
            const reactClick = new Event('click', { bubbles: true });
            button.dispatchEvent(reactClick);

            clickCount++;
            lastClickTime = now;
            
            // Save to storage and notify popup
            chrome.storage.sync.set({ clickCount });
            chrome.runtime.sendMessage({ 
                action: 'updateStats', 
                clickCount 
            }).catch(() => {});
        }
    }

    function startMonitoring() {
        if (clickInterval) return;
        
        clickInterval = setInterval(clickContinueButton, 500);

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

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === '>')) {
                setTimeout(clickContinueButton, 200);
            }
        });

        document.addEventListener('focusin', () => {
            setTimeout(clickContinueButton, 100);
        });
    }

    function stopMonitoring() {
        if (clickInterval) {
            clearInterval(clickInterval);
            clickInterval = null;
        }
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch (message.action) {
            case 'toggle':
                isAutoClickEnabled = message.enabled;
                if (isAutoClickEnabled) {
                    startMonitoring();
                } else {
                    stopMonitoring();
                }
                break;
            case 'clickNow':
                clickContinueButton();
                break;
            case 'reset':
                clickCount = 0;
                chrome.storage.sync.set({ clickCount: 0 });
                break;
        }
    });

    // Auto-start if enabled
    if (isAutoClickEnabled) {
        startMonitoring();
    }

    console.log('Copilot Auto Continue extension loaded');
})();
