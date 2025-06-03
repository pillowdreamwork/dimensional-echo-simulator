# Copilot Auto-Continue System

## Overview

This system provides automated continuation capabilities for GitHub Copilot in the Dimensional Echo Simulator project. It includes smart merge resolution, automated testing, and continuous integration features.

## Components

### 1. Auto-Continue User Script (`copilot-auto-continue.user.js`)
A Tampermonkey/Greasemonkey userscript that enhances Copilot's behavior:
- Automatically continues conversations when appropriate
- Provides smart context awareness
- Integrates with the project's quantum state management

### 2. Merge Resolution (`merge-resolution.js`)
Automated merge conflict resolution for multiple development branches:
- Handles merges between main, feature branches
- Generates comprehensive merge summaries
- Provides conflict resolution suggestions

### 3. Test Methods (`test-methods.js`)
Automated testing suite for the auto-continue functionality:
- Validates merge operations
- Tests quantum state consistency
- Ensures dimensional stability

### 4. GitHub Actions Workflow (`merge-and-restore.yml`)
CI/CD pipeline for automated merge and restore operations:
- Triggers on push to main branches
- Runs merge resolution scripts
- Uploads merge summaries as artifacts

## Installation

1. Install the userscript in Tampermonkey/Greasemonkey
2. Configure your Git branches in `merge-resolution.js`
3. Set up GitHub Actions workflow permissions
4. Run initial tests with `npm test`

## Usage

### Manual Merge Resolution
```bash
node merge-resolution.js
```

### Running Tests
```bash
node test-methods.js
```

### Triggering Auto-Continue
The userscript will automatically activate when using GitHub Copilot in supported environments.

## Configuration

### Environment Variables
- `COPILOT_AUTO_CONTINUE_ENABLED`: Enable/disable auto-continue (default: true)
- `MERGE_TARGET_BRANCH`: Target branch for merges (default: 'merged-unified')
- `QUANTUM_STATE_VALIDATION`: Enable quantum state checks (default: true)

### Customization
Edit the configuration section in each file to match your project's specific needs.

## Troubleshooting

### Common Issues
1. **Merge conflicts**: Check `MERGE_SUMMARY.md` for detailed conflict information
2. **Script not loading**: Verify Tampermonkey is enabled and script is active
3. **Test failures**: Run with `--verbose` flag for detailed output

### Debug Mode
Set `DEBUG=true` in your environment to enable verbose logging.

## Contributing

When modifying auto-continue functionality:
1. Test thoroughly with the test suite
2. Update this README with any new features
3. Ensure compatibility with the quantum state system
4. Follow the project's dimensional coding standards