
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Run system checks during startup
import { runSystemCheck } from './utils/moduleCheck';
import { initializeErrorHandler } from './utils/errorHandler';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize error handler with auto-repair enabled
  initializeErrorHandler(true);
  
  // Run module check and log results
  const systemStatus = runSystemCheck();
  console.log(`System Status: ${systemStatus.status} (${systemStatus.functionalityScore}% functional)`);
  
  // Render the application
  createRoot(document.getElementById("root")!).render(<App />);
});
