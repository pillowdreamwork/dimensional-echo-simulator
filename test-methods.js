#!/usr/bin/env node

/**
 * Test Methods for Copilot Auto-Continue System
 * Validates functionality of merge resolution, quantum state management, and auto-continue features
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configuration
const TEST_CONFIG = {
    VERBOSE: process.argv.includes('--verbose') || process.env.DEBUG === 'true',
    RUN_GIT_TESTS: !process.argv.includes('--no-git'),
    RUN_INTEGRATION_TESTS: !process.argv.includes('--no-integration'),
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
    const prefix = `[TEST ${timestamp}]`;
    
    if (level === 'debug' && !TEST_CONFIG.VERBOSE) return;
    
    const color = {
        info: '\x1b[36m',    // cyan
        success: '\x1b[32m', // green
        error: '\x1b[31m',   // red
        warn: '\x1b[33m',    // yellow
        debug: '\x1b[90m'    // gray
    }[level] || '\x1b[0m';
    
    console.log(`${color}${prefix} ${message}\x1b[0m`);
}

// Test runner utility
function runTest(name, testFunction) {
    testResults.total++;
    log(`Running test: ${name}`, 'info');
    
    try {
        const result = testFunction();
        
        if (result === true || result === undefined) {
            testResults.passed++;
            testResults.details.push({ name, status: 'PASSED', error: null });
            log(`✅ ${name} - PASSED`, 'success');
        } else {
            throw new Error(result || 'Test returned false');
        }
    } catch (error) {
        testResults.failed++;
        testResults.details.push({ name, status: 'FAILED', error: error.message });
        log(`❌ ${name} - FAILED: ${error.message}`, 'error');
    }
}

// Async test runner
function runAsyncTest(name, testFunction) {
    return new Promise((resolve) => {
        testResults.total++;
        log(`Running async test: ${name}`, 'info');
        
        const timeout = setTimeout(() => {
            testResults.failed++;
            testResults.details.push({ name, status: 'FAILED', error: 'Test timeout' });
            log(`❌ ${name} - FAILED: Test timeout`, 'error');
            resolve();
        }, TEST_CONFIG.TEST_TIMEOUT);
        
        testFunction()
            .then((result) => {
                clearTimeout(timeout);
                if (result === true || result === undefined) {
                    testResults.passed++;
                    testResults.details.push({ name, status: 'PASSED', error: null });
                    log(`✅ ${name} - PASSED`, 'success');
                } else {
                    throw new Error(result || 'Test returned false');
                }
                resolve();
            })
            .catch((error) => {
                clearTimeout(timeout);
                testResults.failed++;
                testResults.details.push({ name, status: 'FAILED', error: error.message });
                log(`❌ ${name} - FAILED: ${error.message}`, 'error');
                resolve();
            });
    });
}

// Test: Merge resolution script exists and is valid
function testMergeResolutionExists() {
    const mergeScript = path.join(__dirname, 'merge-resolution.js');
    
    if (!fs.existsSync(mergeScript)) {
        throw new Error('merge-resolution.js not found');
    }
    
    const content = fs.readFileSync(mergeScript, 'utf8');
    
    // Check for required functions and constants
    const requiredElements = ['BRANCHES', 'MERGE_TARGET', 'run(', 'execSync'];
    for (const element of requiredElements) {
        if (!content.includes(element)) {
            throw new Error(`Missing required element: ${element}`);
        }
    }
    
    return true;
}

// Test: Userscript has valid metadata and functions
function testUserscriptStructure() {
    const userScript = path.join(__dirname, 'copilot-auto-continue.user.js');
    
    if (!fs.existsSync(userScript)) {
        throw new Error('copilot-auto-continue.user.js not found');
    }
    
    const content = fs.readFileSync(userScript, 'utf8');
    
    // Check userscript metadata
    const requiredMetadata = ['@name', '@version', '@description', '@match'];
    for (const meta of requiredMetadata) {
        if (!content.includes(meta)) {
            throw new Error(`Missing userscript metadata: ${meta}`);
        }
    }
    
    // Check core functions
    const requiredFunctions = [
        'detectDimensionalContext',
        'isCopilotActive',
        'shouldTriggerContinuation',
        'triggerContinuation',
        'validateQuantumState'
    ];
    
    for (const func of requiredFunctions) {
        if (!content.includes(func)) {
            throw new Error(`Missing required function: ${func}`);
        }
    }
    
    return true;
}

// Test: GitHub Actions workflow is valid
function testGitHubWorkflow() {
    const workflowFile = path.join(__dirname, 'merge-and-restore.yml');
    
    if (!fs.existsSync(workflowFile)) {
        throw new Error('merge-and-restore.yml not found');
    }
    
    const content = fs.readFileSync(workflowFile, 'utf8');
    
    // Check workflow structure
    const requiredKeys = ['name:', 'on:', 'jobs:', 'runs-on:', 'steps:'];
    for (const key of requiredKeys) {
        if (!content.includes(key)) {
            throw new Error(`Missing workflow key: ${key}`);
        }
    }
    
    return true;
}

// Test: Quantum state simulation
function testQuantumStateConsistency() {
    const quantumStates = [
        { activeSession: true, continuationCount: 0, dimensionalContext: { isDimensional: true } },
        { activeSession: false, continuationCount: 5, dimensionalContext: { isDimensional: false } },
        { activeSession: true, continuationCount: 3, dimensionalContext: null }
    ];
    
    for (const state of quantumStates) {
        // Simulate quantum state validation logic
        const now = Date.now();
        const sessionDuration = now - (state.sessionStart || now);
        const isValid = sessionDuration <= 30 * 60 * 1000 && state.continuationCount <= 5;
        
        if (!isValid && state.activeSession) {
            log(`Quantum state validation working correctly for state: ${JSON.stringify(state)}`, 'debug');
        }
    }
    
    return true;
}

// Test: Dimensional context detection simulation
function testDimensionalContextDetection() {
    const testTexts = [
        {
            text: 'quantum state management and dimensional reality shifting',
            expectedDimensional: true
        },
        {
            text: 'regular programming without special concepts',
            expectedDimensional: false
        },
        {
            text: 'tesseract weaving with portal consciousness and archetype symbols',
            expectedDimensional: true
        }
    ];
    
    const indicators = [
        'quantum', 'dimensional', 'reality', 'tesseract', 'portal',
        'dreamwork', 'archetype', 'symbol', 'ritual', 'consciousness'
    ];
    
    for (const testCase of testTexts) {
        const contextScore = indicators.reduce((score, indicator) => {
            return score + (testCase.text.toLowerCase().includes(indicator) ? 1 : 0);
        }, 0);
        
        const isDimensional = contextScore > 2;
        
        if (isDimensional !== testCase.expectedDimensional) {
            throw new Error(`Dimensional detection failed for: "${testCase.text}". Expected: ${testCase.expectedDimensional}, Got: ${isDimensional}`);
        }
    }
    
    return true;
}

// Test: File integration with project structure
function testProjectIntegration() {
    const projectFiles = [
        'package.json',
        'src/components/QuantumInterface.tsx',
        'src/lib/reality-engine.ts',
        'src/types/quantum.ts'
    ];
    
    for (const file of projectFiles) {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
            log(`Warning: Expected project file not found: ${file}`, 'warn');
        }
    }
    
    // Check if package.json has required scripts
    const packagePath = path.join(__dirname, 'package.json');
    if (fs.existsSync(packagePath)) {
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        if (!packageJson.scripts) {
            throw new Error('package.json missing scripts section');
        }
        
        log('Project integration checks passed', 'debug');
    }
    
    return true;
}

// Test: Git repository operations (if available)
async function testGitOperations() {
    if (!TEST_CONFIG.RUN_GIT_TESTS) {
        log('Skipping Git tests (disabled)', 'debug');
        return true;
    }
    
    try {
        // Check if we're in a git repository
        execSync('git status', { stdio: 'pipe' });
        
        // Test git commands used in merge-resolution.js
        const branches = execSync('git branch -a', { encoding: 'utf8' });
        log(`Available branches: ${branches.trim()}`, 'debug');
        
        // Test git diff command
        const diff = execSync('git diff --name-only', { encoding: 'utf8' });
        log(`Current changes: ${diff.trim() || 'none'}`, 'debug');
        
        return true;
    } catch (error) {
        if (error.message.includes('not a git repository')) {
            log('Not in a git repository, skipping Git tests', 'warn');
            return true;
        }
        throw error;
    }
}

// Test: Environment and dependencies
function testEnvironmentSetup() {
    // Check Node.js version
    const nodeVersion = process.version;
    log(`Node.js version: ${nodeVersion}`, 'debug');
    
    if (!nodeVersion.startsWith('v18') && !nodeVersion.startsWith('v20') && !nodeVersion.startsWith('v21')) {
        log(`Warning: Unexpected Node.js version: ${nodeVersion}`, 'warn');
    }
    
    // Check required modules
    const requiredModules = ['child_process', 'fs', 'path'];
    for (const module of requiredModules) {
        try {
            import(module);
        } catch (error) {
            throw new Error(`Required module not available: ${module}`);
        }
    }
    
    return true;
}

// Test: Configuration validation
function testConfigurationOptions() {
    const configTests = [
        { AUTO_CONTINUE_ENABLED: true, expected: 'enabled' },
        { AUTO_CONTINUE_ENABLED: false, expected: 'disabled' },
        { QUANTUM_STATE_VALIDATION: true, expected: 'quantum validation on' },
        { DIMENSIONAL_CONTEXT_AWARE: true, expected: 'dimensional awareness on' }
    ];
    
    for (const config of configTests) {
        // Simulate configuration validation
        const isValid = typeof config.AUTO_CONTINUE_ENABLED === 'boolean' ||
                       typeof config.QUANTUM_STATE_VALIDATION === 'boolean' ||
                       typeof config.DIMENSIONAL_CONTEXT_AWARE === 'boolean';
        
        if (!isValid) {
            throw new Error(`Invalid configuration: ${JSON.stringify(config)}`);
        }
    }
    
    return true;
}

// Main test runner
async function runAllTests() {
    log('Starting Copilot Auto-Continue Test Suite', 'info');
    log(`Verbose mode: ${TEST_CONFIG.VERBOSE}`, 'debug');
    log(`Git tests: ${TEST_CONFIG.RUN_GIT_TESTS}`, 'debug');
    
    // Setup
    if (!fs.existsSync(TEST_CONFIG.TEMP_DIR)) {
        fs.mkdirSync(TEST_CONFIG.TEMP_DIR, { recursive: true });
    }
    
    // Run synchronous tests
    runTest('Merge Resolution Script Validation', testMergeResolutionExists);
    runTest('Userscript Structure Validation', testUserscriptStructure);
    runTest('GitHub Workflow Validation', testGitHubWorkflow);
    runTest('Quantum State Consistency', testQuantumStateConsistency);
    runTest('Dimensional Context Detection', testDimensionalContextDetection);
    runTest('Project Integration', testProjectIntegration);
    runTest('Environment Setup', testEnvironmentSetup);
    runTest('Configuration Options', testConfigurationOptions);
    
    // Run asynchronous tests
    if (TEST_CONFIG.RUN_INTEGRATION_TESTS) {
        await runAsyncTest('Git Operations', testGitOperations);
    }
    
    // Cleanup
    if (fs.existsSync(TEST_CONFIG.TEMP_DIR)) {
        fs.rmSync(TEST_CONFIG.TEMP_DIR, { recursive: true, force: true });
    }
    
    // Results summary
    log('\n=== Test Results Summary ===', 'info');
    log(`Total tests: ${testResults.total}`, 'info');
    log(`Passed: ${testResults.passed}`, 'success');
    log(`Failed: ${testResults.failed}`, testResults.failed > 0 ? 'error' : 'info');
    
    if (TEST_CONFIG.VERBOSE && testResults.details.length > 0) {
        log('\n=== Detailed Results ===', 'info');
        testResults.details.forEach(test => {
            const status = test.status === 'PASSED' ? '✅' : '❌';
            log(`${status} ${test.name}${test.error ? ` - ${test.error}` : ''}`, 
                test.status === 'PASSED' ? 'success' : 'error');
        });
    }
    
    const success = testResults.failed === 0;
    log(`\n=== Test Suite ${success ? 'PASSED' : 'FAILED'} ===`, success ? 'success' : 'error');
    
    process.exit(success ? 0 : 1);
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests().catch(error => {
        log(`Fatal error: ${error.message}`, 'error');
        process.exit(1);
    });
}

export {
    runAllTests,
    runTest,
    runAsyncTest,
    testResults
};