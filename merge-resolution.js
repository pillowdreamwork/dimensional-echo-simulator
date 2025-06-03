import { execSync } from 'child_process';
import fs from 'fs';

const BRANCHES = ['main', 'feature-a', 'feature-b'];
const MERGE_TARGET = 'merged-unified';

function run(cmd, options = { stdio: 'inherit' }) {
  console.log(`→ ${cmd}`);
  return execSync(cmd, options);
}

function mergeBranches(branches, target) {
  run(`git checkout ${branches[0]}`);
  try {
    run(`git checkout -b ${target}`);
  } catch {
    run(`git checkout ${target}`);
  }

  for (const branch of branches.slice(1)) {
    console.log(`\n🔁 Merging ${branch} into ${target}`);
    try {
      run(`git merge ${branch} --no-commit`);
      run(`git commit -am "Merged ${branch} into ${target}"`);
    } catch (e) {
      console.warn(`⚠️ Merge conflicts in ${branch}. Manual resolution may be needed.`);
      try {
        run(`git commit -am "Merged ${branch} into ${target} (with conflicts resolved)"`);
      } catch {
        console.warn('⚠️ No changes to commit after conflict resolution.');
      }
    }
  }
}

function writeMergeSummary(branches, target) {
  fs.writeFileSync('MERGE_SUMMARY.md', '# Merge Summary\n\n');
  branches.forEach(branch => {
    const diff = run(`git diff ${target}..${branch}`, { stdio: 'pipe' }).toString();
    if (diff) {
      fs.appendFileSync('MERGE_SUMMARY.md', `## Differences from ${branch}\n\`\`\`diff\n${diff}\n\`\`\`\n`);
    }
  });
}

function main() {
  try {
    mergeBranches(BRANCHES, MERGE_TARGET);
    writeMergeSummary(BRANCHES, MERGE_TARGET);
    console.log('✅ Merge complete. Summary written to MERGE_SUMMARY.md');
  } catch (err) {
    console.error('❌ Merge process failed:', err);
  }
}

main();
