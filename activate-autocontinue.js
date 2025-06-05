#!/usr/bin/env node

/**
 * Autocontinue Activation Script
 * Activates the Copilot Auto-Continue system for the Dimensional Echo Simulator
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    DEBUG: process.argv.includes('--debug') || process.env.DEBUG === 'true',
    VERBOSE: process.argv.includes('--verbose'),
    DRY_RUN: process.argv.includes('--dry-run')
};

// Enhanced logging
function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = `[AutoContinue ${timestamp}]`;
    
    if (CONFIG.VERBOSE || type === 'error' || type === 'warn') {
        console[type === 'error' ? 'error' : 'log'](`${prefix} ${message}`);
    }
}

// Check if userscript is installed
function checkUserscriptInstallation() {
    const userscriptPath = path.join(__dirname, 'copilot-auto-continue.user.js');
    
    if (!existsSync(userscriptPath)) {
        log('Userscript not found. Creating...', 'warn');
        return false;
    }
    
    log('Userscript found', 'info');
    return true;
}

// Enable debug mode in userscript
function enableDebugMode() {
    const userscriptPath = path.join(__dirname, 'copilot-auto-continue.user.js');
    
    if (!existsSync(userscriptPath)) {
        throw new Error('Userscript not found');
    }
    
    let content = readFileSync(userscriptPath, 'utf8');
    
    // Enable debug mode
    content = content.replace(
        /DEBUG_MODE:\s*false/g,
        'DEBUG_MODE: true'
    );
    
    if (!CONFIG.DRY_RUN) {
        writeFileSync(userscriptPath, content);
        log('Debug mode enabled in userscript', 'info');
    } else {
        log('DRY RUN: Would enable debug mode', 'info');
    }
}

// Run tests
function runTests() {
    try {
        log('Running autocontinue test suite...', 'info');
        
        const testCommand = CONFIG.VERBOSE ? 
            'node test-methods.js --verbose' : 
            'node test-methods.js';
        
        if (!CONFIG.DRY_RUN) {
            const output = execSync(testCommand, { 
                cwd: __dirname, 
                encoding: 'utf8',
                stdio: CONFIG.VERBOSE ? 'inherit' : 'pipe'
            });
            
            if (!CONFIG.VERBOSE) {
                log('Tests completed successfully', 'info');
            }
        } else {
            log('DRY RUN: Would run tests', 'info');
        }
        
        return true;
    } catch (error) {
        log(`Test execution failed: ${error.message}`, 'error');
        return false;
    }
}

// Display usage instructions
function displayUsage() {
    console.log(`
=== Copilot Auto-Continue Activation ===

The autocontinue system is now ready! Here's how to use it:

1. **Install Userscript** (Manual step required):
   - Install Tampermonkey or Greasemonkey browser extension
   - Copy the contents of: copilot-auto-continue.user.js
   - Create a new userscript and paste the content
   - Save and enable the script

2. **Usage**:
   - Navigate to GitHub, GitHub.dev, VS Code, or Copilot Chat
   - The script will automatically detect Copilot sessions
   - Auto-continuation will trigger when appropriate

3. **Features**:
   ✨ Smart context detection
   🔮 Quantum state management  
   🌌 Dimensional awareness
   ⚡ Automatic continuation triggering
   🛡️ Session validation

4. **Debug Mode**:
   - Open browser console to see autocontinue logs
   - Use: window.CopilotAutoContinue.config to view settings
   - Use: window.CopilotAutoContinue.resetQuantumState() to reset

5. **Configuration**:
   - AUTO_CONTINUE_ENABLED: ${CONFIG.DEBUG ? 'true' : 'true'}
   - DEBUG_MODE: ${CONFIG.DEBUG ? 'true' : 'false'}  
   - DIMENSIONAL_CONTEXT_AWARE: true
   - MAX_CONTINUATIONS: 5

Status: ✅ READY FOR USE
    `);
}

// Main activation function
async function activateAutoContinue() {
    log('🚀 Activating Copilot Auto-Continue System', 'info');
    
    try {
        // Check userscript
        if (!checkUserscriptInstallation()) {
            throw new Error('Userscript installation failed');
        }
        
        // Enable debug mode if requested
        if (CONFIG.DEBUG) {
            enableDebugMode();
        }
        
        // Run tests
        if (!runTests()) {
            throw new Error('Test validation failed');
        }
        
        log('✅ Auto-Continue system activated successfully!', 'info');
        displayUsage();
        
    } catch (error) {
        log(`❌ Activation failed: ${error.message}`, 'error');
        process.exit(1);
    }
}

// Command line interface
if (import.meta.url === `file://${__filename}`) {
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
        console.log(`
Usage: node activate-autocontinue.js [options]

Options:
  --debug      Enable debug mode in userscript
  --verbose    Show detailed output
  --dry-run    Show what would be done without making changes
  --help, -h   Show this help message

Examples:
  node activate-autocontinue.js
  node activate-autocontinue.js --debug --verbose
  node activate-autocontinue.js --dry-run
        `);
        process.exit(0);
    }
    
    activateAutoContinue().catch(error => {
        console.error('Activation script failed:', error);
        process.exit(1);
    });
}

export { activateAutoContinue };
