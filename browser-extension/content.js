// Copilot Auto-Continue Browser Extension Content Script
// This is a simplified version of the userscript for Chrome extension compatibility

(function() {
    'use strict';
    
    // Configuration - matches userscript settings
    const CONFIG = {
        AUTO_CONTINUE_ENABLED: true,
        QUANTUM_STATE_VALIDATION: true,
        DEBUG_MODE: false,
        CONTINUATION_DELAY: 1500,
        MAX_CONTINUATIONS: 5,
        DIMENSIONAL_CONTEXT_AWARE: true
    };

    // Quantum state tracking
    let quantumState = {
        activeSession: false,
        continuationCount: 0,
        lastInteraction: null,
        dimensionalContext: null,
        sessionStart: Date.now()
    };

    // Logging function
    function log(message, type = 'info', quantumData = null) {
        if (!CONFIG.DEBUG_MODE && type === 'debug') return;
        
        const timestamp = new Date().toISOString();
        const prefix = `[Copilot Auto-Continue Ext ${timestamp}]`;
        const quantumInfo = quantumData ? ` [Q:${JSON.stringify(quantumData)}]` : '';
        
        console[type === 'error' ? 'error' : 'log'](`${prefix} ${message}${quantumInfo}`);
    }

    // Detect dimensional context
    function detectDimensionalContext() {
        const indicators = [
            'quantum', 'dimensional', 'reality', 'tesseract', 'portal',
            'dreamwork', 'archetype', 'symbol', 'ritual', 'consciousness'
        ];
        
        const pageText = document.body?.textContent?.toLowerCase() || '';
        const contextScore = indicators.reduce((score, indicator) => {
            return score + (pageText.includes(indicator) ? 1 : 0);
        }, 0);
        
        return {
            isDimensional: contextScore > 2,
            score: contextScore,
            detectedConcepts: indicators.filter(i => pageText.includes(i))
        };
    }

    // Check if Copilot is active
    function isCopilotActive() {
        const copilotSelectors = [
            '[data-testid="copilot-chat"]',
            '.copilot-chat-container',
            '[aria-label*="Copilot"]',
            '.github-copilot',
            '[data-copilot]',
            '.vscode-chat-widget'
        ];
        
        return copilotSelectors.some(selector => document.querySelector(selector));
    }

    // Check if continuation should be triggered
    function shouldTriggerContinuation() {
        if (!CONFIG.AUTO_CONTINUE_ENABLED) return false;
        if (quantumState.continuationCount >= CONFIG.MAX_CONTINUATIONS) return false;
        
        const timeSinceLastInteraction = Date.now() - (quantumState.lastInteraction || 0);
        if (timeSinceLastInteraction < CONFIG.CONTINUATION_DELAY) return false;
        
        const continuationIndicators = [
            'continue', '...', 'more', 'next', 'expand', 'elaborate'
        ];
        
        const recentText = getRecentChatText();
        const shouldContinue = continuationIndicators.some(indicator => 
            recentText.toLowerCase().includes(indicator)
        );
        
        if (CONFIG.DIMENSIONAL_CONTEXT_AWARE && quantumState.dimensionalContext?.isDimensional) {
            const dimensionalPatterns = [
                /quantum.*incomplete/i,
                /reality.*shift.*pending/i,
                /dimensional.*analysis.*partial/i
            ];
            const dimensionalContinuationNeeded = dimensionalPatterns.some(pattern => pattern.test(recentText));
            return shouldContinue || dimensionalContinuationNeeded;
        }
        
        return shouldContinue;
    }

    // Get recent chat text
    function getRecentChatText() {
        const chatSelectors = [
            '.copilot-chat-message:last-child',
            '[data-testid="chat-message"]:last-child',
            '.chat-message:last-child',
            '.message-content:last-child'
        ];
        
        for (const selector of chatSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element.textContent || '';
            }
        }
        
        return '';
    }

    // Trigger continuation
    function triggerContinuation() {
        const continueButtons = [
            'button[aria-label*="Continue"]',
            'button[title*="Continue"]',
            '[data-testid="continue-button"]',
            '.copilot-continue-btn'
        ];
        
        for (const selector of continueButtons) {
            const button = document.querySelector(selector);
            if (button && !button.disabled) {
                log('Triggering continuation via button', 'info', { 
                    selector,
                    quantumState: quantumState.continuationCount 
                });
                
                quantumState.continuationCount++;
                quantumState.lastInteraction = Date.now();
                
                button.click();
                return true;
            }
        }
        
        // Fallback: try input method
        const chatInput = document.querySelector('textarea[placeholder*="Ask Copilot"], textarea[data-copilot-input]');
        if (chatInput) {
            chatInput.focus();
            chatInput.value = 'continue';
            
            // Trigger enter key
            chatInput.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                bubbles: true
            }));
            
            log('Triggered continuation via input', 'info');
            quantumState.continuationCount++;
            quantumState.lastInteraction = Date.now();
            return true;
        }
        
        return false;
    }

    // Validate quantum state
    function validateQuantumState() {
        if (!CONFIG.QUANTUM_STATE_VALIDATION) return true;
        
        const now = Date.now();
        const sessionDuration = now - quantumState.sessionStart;
        
        if (sessionDuration > 30 * 60 * 1000 || quantumState.continuationCount > CONFIG.MAX_CONTINUATIONS) {
            resetQuantumState();
            return false;
        }
        
        return true;
    }

    // Reset quantum state
    function resetQuantumState() {
        quantumState = {
            activeSession: false,
            continuationCount: 0,
            lastInteraction: null,
            dimensionalContext: null,
            sessionStart: Date.now()
        };
        
        log('Quantum state reset', 'debug', quantumState);
    }

    // Initialize the extension
    function initializeExtension() {
        log('Initializing Copilot Auto-Continue browser extension');
        
        const observer = new MutationObserver((mutations) => {
            if (!validateQuantumState()) return;
            
            const copilotActive = isCopilotActive();
            
            if (copilotActive && !quantumState.activeSession) {
                quantumState.activeSession = true;
                quantumState.dimensionalContext = detectDimensionalContext();
                
                log('Copilot session activated', 'info', {
                    dimensional: quantumState.dimensionalContext
                });
            }
            
            if (quantumState.activeSession && shouldTriggerContinuation()) {
                setTimeout(() => {
                    if (triggerContinuation()) {
                        log('Auto-continuation triggered', 'info', {
                            count: quantumState.continuationCount,
                            dimensional: quantumState.dimensionalContext?.isDimensional
                        });
                    }
                }, CONFIG.CONTINUATION_DELAY);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });
        
        // Session maintenance
        setInterval(() => {
            if (!isCopilotActive() && quantumState.activeSession) {
                quantumState.activeSession = false;
                log('Copilot session deactivated', 'debug');
            }
        }, 5000);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeExtension);
    } else {
        initializeExtension();
    }

    // Expose API for popup
    window.CopilotAutoContinueExt = {
        config: CONFIG,
        quantumState,
        resetQuantumState,
        triggerContinuation
    };

})();