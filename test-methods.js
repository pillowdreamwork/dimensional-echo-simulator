#!/usr/bin/env node

/**
 * Test Methods for Copilot Auto-Continue System
 * Validates functionality of quantum state management and auto-continue features
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configuration
const TEST_CONFIG = {
    VERBOSE: process.argv.includes('--verbose') || process.env.DEBUG === 'true',
    TEST_TIMEOUT: 30000,
    TEMP_DIR: path.join(__dirname, '.test-temp')
};

// Test results tracking
let testResults = {
    passed: 0,
    failed: 0,
    total: 0,
    details: []
};

// Enhanced logging
function log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = `[Test ${timestamp}]`;
    
    if (TEST_CONFIG.VERBOSE || level === 'error' || level === 'warn') {
        console.log(`${prefix} ${message}`);
    }
}

// Test runner utility
function runTest(name, testFunction) {
    testResults.total++;
    
    try {
        log(`Running: ${name}`, 'info');
        const result = testFunction();
        
        if (result === true || result === undefined) {
            testResults.passed++;
            testResults.details.push({ name, status: 'PASSED', error: null });
            log(`✅ PASSED: ${name}`, 'info');
        } else {
            testResults.failed++;
            testResults.details.push({ name, status: 'FAILED', error: 'Test returned false' });
            log(`❌ FAILED: ${name}`, 'error');
        }
    } catch (error) {
        testResults.failed++;
        testResults.details.push({ name, status: 'FAILED', error: error.message });
        log(`❌ FAILED: ${name} - ${error.message}`, 'error');
    }
}

// Test: Userscript structure validation
function testUserscriptStructure() {
    const userscriptPath = path.join(__dirname, 'copilot-auto-continue.user.js');
    
    if (!fs.existsSync(userscriptPath)) {
        throw new Error('Userscript file not found');
    }
    
    const content = fs.readFileSync(userscriptPath, 'utf8');
    
    // Check for required headers
    if (!content.includes('// ==UserScript==')) {
        throw new Error('Missing UserScript header');
    }
    
    if (!content.includes('@name')) {
        throw new Error('Missing @name directive');
    }
    
    // Check for key functions
    const requiredFunctions = [
        'isCopilotActive',
        'shouldTriggerContinuation',
        'triggerContinuation',
        'detectDimensionalContext'
    ];
    
    for (const func of requiredFunctions) {
        if (!content.includes(`function ${func}`)) {
            throw new Error(`Missing required function: ${func}`);
        }
    }
    
    log('Userscript structure validation passed', 'debug');
    return true;
}

// Test: Quantum state consistency
function testQuantumStateConsistency() {
    const userscriptPath = path.join(__dirname, 'copilot-auto-continue.user.js');
    const content = fs.readFileSync(userscriptPath, 'utf8');
    
    // Check for quantum state management
    if (!content.includes('quantumState')) {
        throw new Error('Missing quantum state management');
    }
    
    if (!content.includes('validateQuantumState')) {
        throw new Error('Missing quantum state validation');
    }
    
    if (!content.includes('resetQuantumState')) {
        throw new Error('Missing quantum state reset function');
    }
    
    log('Quantum state consistency validation passed', 'debug');
    return true;
}

// Test: Dimensional context detection
function testDimensionalContextDetection() {
    const userscriptPath = path.join(__dirname, 'copilot-auto-continue.user.js');
    const content = fs.readFileSync(userscriptPath, 'utf8');
    
    // Check for dimensional keywords
    const dimensionalKeywords = [
        'quantum', 'dimensional', 'reality', 'tesseract', 'consciousness'
    ];
    
    for (const keyword of dimensionalKeywords) {
        if (!content.includes(keyword)) {
            throw new Error(`Missing dimensional keyword: ${keyword}`);
        }
    }
    
    if (!content.includes('detectDimensionalContext')) {
        throw new Error('Missing dimensional context detection function');
    }
    
    log('Dimensional context detection validation passed', 'debug');
    return true;
}

// Test: Project integration
function testProjectIntegration() {
    const projectFiles = [
        'package.json',
        'src/App.tsx',
        'src/components',
        'src/lib'
    ];
    
    for (const file of projectFiles) {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Missing project file: ${file}`);
        }
    }
    
    log('Project integration validation passed', 'debug');
    return true;
}

// Test: Environment setup
function testEnvironmentSetup() {
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 18) {
        throw new Error(`Node.js version ${nodeVersion} is too old. Requires 18+`);
    }
    
    // Check if we can create temp directory
    if (!fs.existsSync(TEST_CONFIG.TEMP_DIR)) {
        fs.mkdirSync(TEST_CONFIG.TEMP_DIR, { recursive: true });
    }
    
    log('Environment setup validation passed', 'debug');
    return true;
}

// Test: Configuration options
function testConfigurationOptions() {
    const userscriptPath = path.join(__dirname, 'copilot-auto-continue.user.js');
    const content = fs.readFileSync(userscriptPath, 'utf8');
    
    // Check for configuration object
    if (!content.includes('const CONFIG = {')) {
        throw new Error('Missing CONFIG object');
    }
    
    const requiredConfigOptions = [
        'AUTO_CONTINUE_ENABLED',
        'QUANTUM_STATE_VALIDATION',
        'DEBUG_MODE',
        'CONTINUATION_DELAY',
        'MAX_CONTINUATIONS'
    ];
    
    for (const option of requiredConfigOptions) {
        if (!content.includes(option)) {
            throw new Error(`Missing config option: ${option}`);
        }
    }
    
    log('Configuration options validation passed', 'debug');
    return true;
}

// Main test runner
async function runAllTests() {
    log('Starting Copilot Auto-Continue Test Suite', 'info');
    log(`Verbose mode: ${TEST_CONFIG.VERBOSE}`, 'debug');
    
    // Setup
    if (!fs.existsSync(TEST_CONFIG.TEMP_DIR)) {
        fs.mkdirSync(TEST_CONFIG.TEMP_DIR, { recursive: true });
    }
    
    // Run tests
    runTest('Userscript Structure Validation', testUserscriptStructure);
    runTest('Quantum State Consistency', testQuantumStateConsistency);
    runTest('Dimensional Context Detection', testDimensionalContextDetection);
    runTest('Project Integration', testProjectIntegration);
    runTest('Environment Setup', testEnvironmentSetup);
    runTest('Configuration Options', testConfigurationOptions);
    
    // Cleanup
    if (fs.existsSync(TEST_CONFIG.TEMP_DIR)) {
        fs.rmSync(TEST_CONFIG.TEMP_DIR, { recursive: true, force: true });
    }
    
    // Results summary
    console.log('\n=== Test Results Summary ===');
    console.log(`Total tests: ${testResults.total}`);
    console.log(`Passed: ${testResults.passed} ✅`);
    console.log(`Failed: ${testResults.failed}`);
    
    if (testResults.failed > 0) {
        console.log('\n=== Failed Tests ===');
        testResults.details
            .filter(test => test.status === 'FAILED')
            .forEach(test => {
                console.log(`❌ ${test.name}: ${test.error}`);
            });
        
        process.exit(1);
    } else {
        console.log('Status: ALL TESTS PASSING');
        process.exit(0);
    }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${__filename}`) {
    runAllTests().catch(error => {
        console.error('Test runner failed:', error);
        process.exit(1);
    });
}

export { runAllTests, testResults };
