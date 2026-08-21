const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const emptyElements = ['span', 'div', 'i'];
emptyElements.forEach(tag => {
  const regex = new RegExp(`(<${tag}\\b[^>]*>\\s*<\\/${tag}>)`, 'gi');
  let match;
  console.log(`\n--- Empty <${tag}> elements ---`);
  while ((match = regex.exec(content)) !== null) {
    const start = Math.max(0, match.index - 50);
    const end = Math.min(content.length, match.index + match[0].length + 50);
    console.log(`Context: ...${content.substring(start, end).replace(/\n/g, ' ')}...`);
  }
});
