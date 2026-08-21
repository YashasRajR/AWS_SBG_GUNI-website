const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Search for any .sbg-wrapper followed by > in the styles
const matches = content.match(/\.sbg-wrapper\s*>/g);
console.log('Matches for ".sbg-wrapper >":', matches);
