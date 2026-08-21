const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all style blocks and check for ID selectors (like #about, #home etc.)
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
const idSelectors = [];

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  // Simple regex to find selectors starting with #
  const idSelRegex = /#([a-zA-Z0-9_-]+)\b/g;
  let idSelMatch;
  while ((idSelMatch = idSelRegex.exec(styleContent)) !== null) {
    idSelectors.push(idSelMatch[1]);
  }
}

console.log('ID selectors in CSS stylesheet:');
console.log(Array.from(new Set(idSelectors)));
