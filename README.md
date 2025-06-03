# 🔁 Smart Branch Merge and Feature Restoration

This project uses an **automated smart merge** system to handle multiple branches that have distributed, conflicting, or overwritten features.

## 🧩 Problem Solved
- Different branches have unique features.
- Some features got lost in merges.
- Functional interdependencies were broken.

## ✅ Solution
- `merge-resolution.js`: Merges all branches incrementally, preserving features.
- `MERGE_SUMMARY.md`: Lists differences and restored parts.
- GitHub Action: Runs automatically to keep the `merged-unified` branch updated.

## 🚀 To Use Locally
```bash
node merge-resolution.js
```

## 🤖 To Use via GitHub Actions
Go to **Actions > Smart Merge and Restore Features > Run Workflow**

## 📄 Output
- `merged-unified`: A unified, working branch
- `MERGE_SUMMARY.md`: Explanation of what was merged or restored
