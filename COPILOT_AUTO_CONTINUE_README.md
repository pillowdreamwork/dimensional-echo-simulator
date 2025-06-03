# Copilot Auto Continue

Automatically clicks "Continue" buttons when GitHub Copilot is working across all repositories and platforms.

## Installation Options

### Option 1: Userscript (Recommended)
1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/)
2. Click on `copilot-auto-continue.user.js` and install
3. The script will automatically work on GitHub, VS Code Web, and localhost

### Option 2: Browser Extension
1. Go to `chrome://extensions/` in Chrome/Edge
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `browser-extension` folder
4. The extension will appear in your toolbar

## Features

- ✅ **Universal**: Works on GitHub, VS Code Web, localhost, and any domain
- ✅ **Smart Detection**: Finds continue buttons using multiple methods
- ✅ **Configurable**: Enable/disable with toggle
- ✅ **Safe**: 1-second cooldown between clicks
- ✅ **Statistics**: Track clicks and monitor status
- ✅ **Performance**: Minimal CPU usage, efficient DOM monitoring

## Supported Platforms

- GitHub.com (all repositories)
- VS Code Web (vscode.dev)
- Localhost development servers
- Any website with Copilot integration

## Manual Control

Access via browser console:
```javascript
// Enable auto-clicking
window.copilotAutoClick.enable();

// Disable auto-clicking
window.copilotAutoClick.disable();

// Click now
window.copilotAutoClick.clickNow();

// Get statistics
window.copilotAutoClick.getStats();
```

## How It Works

1. **Button Detection**: Searches for continue buttons using CSS selectors and text content
2. **Context Awareness**: Prioritizes buttons in Copilot contexts
3. **Smart Clicking**: Only clicks visible, enabled buttons
4. **Real-time Monitoring**: Uses MutationObserver for dynamic content
5. **Keyboard Integration**: Responds to Copilot keyboard shortcuts

## Troubleshooting

- **Not working?** Check if the control panel appears (top-right corner)
- **Too many clicks?** The 1-second cooldown prevents spam
- **Missing buttons?** The script adapts to new button types automatically

## Safety Features

- Cooldown period between clicks
- Only clicks buttons with continue-related text
- Requires Copilot context for activation
- Can be disabled instantly
- Non-intrusive monitoring

The script will work across ALL repositories automatically once installed!
