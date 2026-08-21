const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all style blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let count = 0;

while ((match = styleRegex.exec(content)) !== null) {
  count++;
  const styleContent = match[1];
  console.log(`\n--- Style Block #${count} ---`);
  // Let's print the first 5 lines and check if there are naked tags styled
  const lines = styleContent.trim().split('\n');
  console.log(lines.slice(0, 10).join('\n'));
  if (lines.length > 10) {
    console.log('...');
  }
}
