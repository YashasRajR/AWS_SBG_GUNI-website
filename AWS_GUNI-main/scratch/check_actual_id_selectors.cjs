const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
const actualIdSelectors = new Set();

while ((match = styleRegex.exec(content)) !== null) {
  const styleContent = match[1];
  // Find words starting with #, but not hex colors (which are followed by whitespace, comma, semicolon, brace or close parenthesis)
  // Hex colors: #[0-9a-fA-F]{3,8}
  const idSelRegex = /#([a-zA-Z0-9_-]+)/g;
  let idSelMatch;
  while ((idSelMatch = idSelRegex.exec(styleContent)) !== null) {
    const val = idSelMatch[1];
    // Check if it is a hex color
    const isHex = /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{4}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(val);
    if (!isHex) {
      actualIdSelectors.add(val);
    }
  }
}

console.log('Actual ID selectors (excluding hex colors):');
console.log(Array.from(actualIdSelectors));
