const fs = require('fs');
const path = require('path');

const hookPath = path.join(__dirname, '../.git/hooks/pre-push');
const hookContent = `#!/bin/sh
node ./scripts/generate-example-env.js
git add .env.example
`;

function setupGitHook() {
    if (!fs.existsSync(path.join(__dirname, '../.git/hooks'))) {
        console.log('Git hooks directory not found. Make sure you have initialized a Git repository.');
        return;
    }

    if (fs.existsSync(hookPath)) {
        console.log('pre-push hook already exists, make sure it contains the following lines:\n1. node ./scripts/generate-example-env.js\n2. git add .env.example');
        return;
    }

    fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
    console.log('pre-push hook installed successfully.');
}

console.log('Setting up Git hook...');
setupGitHook();
console.log('Done ✅');
