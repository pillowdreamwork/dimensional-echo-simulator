#!/usr/bin/env node

/**
 * Autocontinue Management Utility
 * Quick commands for managing the Copilot Auto-Continue system
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];

function log(message, type = 'info') {
    const emoji = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '✅';
    console.log(`${emoji} ${message}`);
}

function showHelp() {
    console.log(`
🚀 Autocontinue Management Utility

Commands:
  activate      Activate the autocontinue system
  test          Run the test suite
  debug         Enable debug mode and activate
  status        Check current status
  reset         Reset quantum state (browser console command)
  install       Show userscript installation instructions
  help          Show this help message

Usage:
  node autocontinue.js <command>

Examples:
  node autocontinue.js activate
  node autocontinue.js test
  node autocontinue.js debug
  node autocontinue.js status
    `);
}

function runCommand(cmd) {
    try {
        return execSync(cmd, { cwd: __dirname, encoding: 'utf8', stdio: 'inherit' });
    } catch (error) {
        log(`Command failed: ${error.message}`, 'error');
        process.exit(1);
    }
}

function checkStatus() {
    const userscriptPath = path.join(__dirname, 'copilot-auto-continue.user.js');
    
    if (!existsSync(userscriptPath)) {
        log('Userscript not found', 'error');
        return;
    }
    
    const content = readFileSync(userscriptPath, 'utf8');
    const debugEnabled = content.includes('DEBUG_MODE: true');
    const autoEnabled = content.includes('AUTO_CONTINUE_ENABLED: true');
    
    console.log(`
📊 Auto-Continue Status:

🔧 Userscript: ✅ Found
🔮 Auto-Continue: ${autoEnabled ? '✅ Enabled' : '❌ Disabled'}
🐛 Debug Mode: ${debugEnabled ? '✅ Enabled' : '⚪ Disabled'}
🌌 Dimensional Aware: ✅ Enabled
🛡️ Quantum Validation: ✅ Enabled

📁 Files:
  - copilot-auto-continue.user.js
  - test-methods.js  
  - activate-autocontinue.js
  - autocontinue.js (this file)
    `);
}

function showInstallInstructions() {
    console.log(`
📦 Userscript Installation Instructions:

1. **Install Browser Extension**:
   - Chrome: Install "Tampermonkey" from Chrome Web Store
   - Firefox: Install "Greasemonkey" or "Tampermonkey"
   - Edge: Install "Tampermonkey" from Edge Add-ons

2. **Install Userscript**:
   - Click the Tampermonkey icon in your browser
   - Click "Create a new script"
   - Delete the default content
   - Copy and paste the content from: copilot-auto-continue.user.js
   - Press Ctrl+S to save

3. **Verify Installation**:
   - Navigate to GitHub.com or GitHub.dev
   - Open browser console (F12)
   - Look for "[Copilot Auto-Continue]" logs
   - Type: window.CopilotAutoContinue to see the interface

4. **Usage**:
   - Start a GitHub Copilot chat session
   - The script will automatically detect and enhance the session
   - Auto-continuation will trigger when appropriate

🎯 Target Sites:
  - https://github.com/*
  - https://copilot.github.com/*  
  - https://github.dev/*
  - https://vscode.dev/*
    `);
}

switch (command) {
    case 'activate':
        log('Activating autocontinue system...', 'info');
        runCommand('node activate-autocontinue.js --verbose');
        break;
        
    case 'test':
        log('Running test suite...', 'info');
        runCommand('node test-methods.js --verbose');
        break;
        
    case 'debug':
        log('Activating with debug mode...', 'info');
        runCommand('node activate-autocontinue.js --debug --verbose');
        break;
        
    case 'status':
        checkStatus();
        break;
        
    case 'reset':
        console.log(`
🔄 To reset quantum state in browser:

1. Open browser console (F12) on a Copilot page
2. Run: window.CopilotAutoContinue.resetQuantumState()
3. Verify: window.CopilotAutoContinue.quantumState

This will reset:
- Continuation count
- Session state  
- Dimensional context
- Interaction timestamps
        `);
        break;
        
    case 'install':
        showInstallInstructions();
        break;
        
    case 'help':
    case undefined:
        showHelp();
        break;
        
    default:
        log(`Unknown command: ${command}`, 'error');
        showHelp();
        process.exit(1);
}
