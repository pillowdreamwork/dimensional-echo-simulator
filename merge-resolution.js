const { execSync } = require('child_process');
const fs = require('fs');

const BRANCHES = ['main', 'feature-a', 'feature-b'];
const MERGE_TARGET = 'merged-unified';

function run(cmd) {
  console.log(`→ ${cmd}`);
  return execSync(cmd, { stdio: 'inherit' });
}

try {
  run(`git checkout main`);
  run(`git checkout -b ${MERGE_TARGET}`);

  for (const branch of BRANCHES.slice(1)) {
    console.log(`\n🔁 Merging ${branch} into ${MERGE_TARGET}`);
    try {
      run(`git merge ${branch} --no-commit`);
    } catch (e) {
      console.warn(`⚠️ Merge conflicts in ${branch}. Manual resolution may be needed.`);
    }
    run(`git commit -am "Merged ${branch} into ${MERGE_TARGET}" || echo "Already committed."`);
  }

  fs.writeFileSync('MERGE_SUMMARY.md', '# Merge Summary\n\n');
  BRANCHES.forEach(branch => {
    const diff = execSync(`git diff ${MERGE_TARGET}..${branch}`).toString();
    if (diff) {
      fs.appendFileSync('MERGE_SUMMARY.md', `## Differences from ${branch}\n\\`\\`\\`diff\n${diff}\n\\`\\`\\`\n`);
    }
  });

  console.log('✅ Merge complete. Summary written to MERGE_SUMMARY.md');

} catch (err) {
  console.error('❌ Merge process failed:', err);
}
