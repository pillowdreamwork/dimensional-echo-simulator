import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  BRANCHES: process.env.MERGE_BRANCHES ? process.env.MERGE_BRANCHES.split(',') : ['main', 'quantum-fixes-2025', 'merge-unified'],
  MERGE_TARGET: process.env.MERGE_TARGET || 'merged-unified',
  BACKUP_BRANCH: 'backup-before-merge',
  VERBOSE: process.argv.includes('--verbose') || process.env.DEBUG === 'true',
  DRY_RUN: process.argv.includes('--dry-run'),
  AUTO_RESOLVE_CONFLICTS: process.argv.includes('--auto-resolve')
};

// Enhanced logging
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warn: '\x1b[33m'
  };
  
  const color = colors[level] || '\x1b[0m';
  console.log(`${color}[MERGE ${timestamp}] ${message}\x1b[0m`);
}

function run(cmd, options = {}) {
  log(`→ ${cmd}`, 'info');
  
  if (CONFIG.DRY_RUN) {
    log('DRY RUN: Command would be executed', 'warn');
    return '';
  }
  
  try {
    return execSync(cmd, { 
      stdio: CONFIG.VERBOSE ? 'inherit' : 'pipe',
      encoding: 'utf8',
      ...options 
    });
  } catch (error) {
    if (!options.allowFailure) {
      throw error;
    }
    log(`Command failed (allowed): ${error.message}`, 'warn');
    return null;
  }
}

// Check if branches exist and are accessible
function validateBranches() {
  log('Validating branches...', 'info');
  
  const availableBranches = run('git branch -a', { allowFailure: true });
  if (!availableBranches) {
    throw new Error('Unable to list branches. Are you in a git repository?');
  }
  
  const branchList = availableBranches.split('\n').map(b => b.trim().replace(/^\*\s*/, '').replace(/^remotes\/origin\//, ''));
  
  for (const branch of CONFIG.BRANCHES) {
    if (!branchList.some(b => b === branch || b.endsWith(`/${branch}`))) {
      log(`Warning: Branch '${branch}' not found in repository`, 'warn');
    }
  }
  
  return true;
}

// Create backup before merge operations
function createBackup() {
  log('Creating backup branch...', 'info');
  
  const currentBranch = run('git branch --show-current').trim();
  
  try {
    run(`git branch -D ${CONFIG.BACKUP_BRANCH}`, { allowFailure: true });
    run(`git checkout -b ${CONFIG.BACKUP_BRANCH}`);
    run(`git checkout ${currentBranch}`);
    log(`Backup created at branch: ${CONFIG.BACKUP_BRANCH}`, 'success');
  } catch (error) {
    log(`Backup creation failed: ${error.message}`, 'warn');
  }
}

// Smart conflict resolution
function resolveConflicts(branch) {
  log(`Attempting to resolve conflicts from ${branch}...`, 'info');
  
  if (!CONFIG.AUTO_RESOLVE_CONFLICTS) {
    log('Auto-resolve disabled. Manual resolution required.', 'warn');
    return false;
  }
  
  try {
    // Get list of conflicted files
    const status = run('git status --porcelain', { allowFailure: true });
    if (!status) return false;
    
    const conflictedFiles = status.split('\n')
      .filter(line => line.startsWith('UU ') || line.startsWith('AA '))
      .map(line => line.substring(3));
    
    if (conflictedFiles.length === 0) {
      log('No conflicts detected', 'success');
      return true;
    }
    
    log(`Found ${conflictedFiles.length} conflicted files`, 'info');
    
    // Simple auto-resolution strategy: prefer incoming changes for specific file types
    const autoResolvablePatterns = [
      /\.md$/,
      /\.json$/,
      /\.txt$/,
      /package-lock\.json$/,
      /yarn\.lock$/
    ];
    
    let resolvedCount = 0;
    
    for (const file of conflictedFiles) {
      const isAutoResolvable = autoResolvablePatterns.some(pattern => pattern.test(file));
      
      if (isAutoResolvable) {
        try {
          // Accept incoming version for auto-resolvable files
          run(`git checkout --theirs "${file}"`, { allowFailure: true });
          run(`git add "${file}"`);
          resolvedCount++;
          log(`Auto-resolved: ${file}`, 'success');
        } catch (error) {
          log(`Failed to auto-resolve: ${file}`, 'warn');
        }
      }
    }
    
    if (resolvedCount > 0) {
      log(`Auto-resolved ${resolvedCount}/${conflictedFiles.length} conflicts`, 'success');
      return resolvedCount === conflictedFiles.length;
    }
    
    return false;
  } catch (error) {
    log(`Conflict resolution failed: ${error.message}`, 'error');
    return false;
  }
}

// Generate comprehensive merge summary
function generateMergeSummary() {
  log('Generating merge summary...', 'info');
  
  const summaryPath = 'MERGE_SUMMARY.md';
  let summary = `# Merge Summary\n\nGenerated: ${new Date().toISOString()}\n`;
  summary += `Target Branch: ${CONFIG.MERGE_TARGET}\n`;
  summary += `Source Branches: ${CONFIG.BRANCHES.join(', ')}\n\n`;
  
  // Add branch information
  summary += `## Branch Status\n\n`;
  for (const branch of CONFIG.BRANCHES) {
    try {
      const exists = run(`git show-ref --verify --quiet refs/heads/${branch}`, { allowFailure: true });
      const status = exists !== null ? '✅ Exists' : '❌ Missing';
      summary += `- **${branch}**: ${status}\n`;
      
      if (exists !== null) {
        const lastCommit = run(`git log -1 --format="%h %s" ${branch}`, { allowFailure: true });
        if (lastCommit) {
          summary += `  - Last commit: ${lastCommit.trim()}\n`;
        }
      }
    } catch (error) {
      summary += `- **${branch}**: ❌ Error: ${error.message}\n`;
    }
  }
  
  // Add differences between branches
  summary += `\n## Branch Differences\n\n`;
  for (const branch of CONFIG.BRANCHES.slice(1)) {
    try {
      const diff = run(`git diff --stat ${CONFIG.MERGE_TARGET}..${branch}`, { allowFailure: true });
      if (diff && diff.trim()) {
        summary += `### Differences from ${branch}\n\n`;
        summary += '```diff\n' + diff + '\n```\n\n';
        
        // Add file-level changes
        const changedFiles = run(`git diff --name-only ${CONFIG.MERGE_TARGET}..${branch}`, { allowFailure: true });
        if (changedFiles) {
          summary += `**Changed files**: ${changedFiles.split('\n').filter(f => f.trim()).length}\n`;
          summary += changedFiles.split('\n').filter(f => f.trim()).map(f => `- ${f}`).join('\n') + '\n\n';
        }
      } else {
        summary += `### ${branch}\nNo differences detected.\n\n`;
      }
    } catch (error) {
      summary += `### ${branch}\nError generating diff: ${error.message}\n\n`;
    }
  }
  
  // Add merge conflicts if any
  try {
    const conflicts = run('git diff --name-only --diff-filter=U', { allowFailure: true });
    if (conflicts && conflicts.trim()) {
      summary += `## Merge Conflicts\n\n`;
      summary += `**Unresolved conflicts**:\n`;
      conflicts.split('\n').filter(f => f.trim()).forEach(file => {
        summary += `- ${file}\n`;
      });
      summary += '\n';
    }
  } catch (error) {
    // Ignore conflict detection errors
  }
  
  // Add quantum state information for dimensional context
  summary += `## Dimensional Context Analysis\n\n`;
  try {
    const quantumFiles = run(`find . -name "*.tsx" -o -name "*.ts" | grep -E "(quantum|dimensional|reality)" | head -10`, { allowFailure: true });
    if (quantumFiles) {
      summary += `**Quantum/Dimensional files detected**:\n`;
      quantumFiles.split('\n').filter(f => f.trim()).forEach(file => {
        summary += `- ${file.replace('./', '')}\n`;
      });
    }
  } catch (error) {
    summary += `Unable to analyze dimensional context: ${error.message}\n`;
  }
  
  fs.writeFileSync(summaryPath, summary);
  log(`Merge summary written to ${summaryPath}`, 'success');
  
  return summaryPath;
}

try {
  log('Starting enhanced merge resolution process...', 'info');
  log(`Configuration: ${JSON.stringify(CONFIG, null, 2)}`, 'info');
  
  // Validate environment
  validateBranches();
  
  // Create backup
  if (!CONFIG.DRY_RUN) {
    createBackup();
  }
  
  // Switch to main branch and create/switch to merge target
  run(`git checkout ${CONFIG.BRANCHES[0]}`);
  
  if (!CONFIG.DRY_RUN) {
    run(`git checkout -B ${CONFIG.MERGE_TARGET}`);
  }

  let mergeResults = {
    successful: [],
    failed: [],
    conflicts: []
  };

  // Merge each branch
  for (const branch of CONFIG.BRANCHES.slice(1)) {
    log(`\n🔁 Merging ${branch} into ${CONFIG.MERGE_TARGET}`, 'info');
    
    try {
      if (!CONFIG.DRY_RUN) {
        // Attempt merge
        const mergeResult = run(`git merge ${branch} --no-commit`, { allowFailure: true });
        
        if (mergeResult === null) {
          // Merge failed, likely due to conflicts
          log(`⚠️ Merge conflicts detected for ${branch}`, 'warn');
          
          const resolved = resolveConflicts(branch);
          
          if (resolved) {
            run(`git commit -m "Merged ${branch} into ${CONFIG.MERGE_TARGET} (auto-resolved conflicts)"`);
            mergeResults.successful.push(branch);
            log(`✅ ${branch} merged successfully with auto-resolved conflicts`, 'success');
          } else {
            mergeResults.conflicts.push(branch);
            log(`❌ ${branch} has unresolved conflicts`, 'error');
            
            // Abort the merge for now
            run('git merge --abort', { allowFailure: true });
          }
        } else {
          // Merge successful
          run(`git commit -m "Merged ${branch} into ${CONFIG.MERGE_TARGET}"`);
          mergeResults.successful.push(branch);
          log(`✅ ${branch} merged successfully`, 'success');
        }
      } else {
        log(`DRY RUN: Would merge ${branch}`, 'info');
        mergeResults.successful.push(branch);
      }
    } catch (error) {
      mergeResults.failed.push({ branch, error: error.message });
      log(`❌ Failed to merge ${branch}: ${error.message}`, 'error');
    }
  }

  // Generate summary
  generateMergeSummary();
  
  // Print results
  log('\n=== Merge Results ===', 'info');
  log(`Successful merges: ${mergeResults.successful.length}`, 'success');
  log(`Failed merges: ${mergeResults.failed.length}`, 'error');
  log(`Conflicts requiring attention: ${mergeResults.conflicts.length}`, 'warn');
  
  if (mergeResults.successful.length > 0) {
    log(`Successfully merged: ${mergeResults.successful.join(', ')}`, 'success');
  }
  
  if (mergeResults.conflicts.length > 0) {
    log(`Branches with conflicts: ${mergeResults.conflicts.join(', ')}`, 'warn');
    log('Manual resolution required for conflicted branches', 'warn');
  }
  
  if (mergeResults.failed.length > 0) {
    log('Failed merges:', 'error');
    mergeResults.failed.forEach(({ branch, error }) => {
      log(`  - ${branch}: ${error}`, 'error');
    });
  }

  const allSuccessful = mergeResults.failed.length === 0 && mergeResults.conflicts.length === 0;
  log(`\n✅ Merge process ${allSuccessful ? 'completed successfully' : 'completed with issues'}`, 
      allSuccessful ? 'success' : 'warn');

} catch (err) {
  log(`❌ Merge process failed: ${err.message}`, 'error');
  log('Check the merge summary for details', 'info');
  process.exit(1);
}
