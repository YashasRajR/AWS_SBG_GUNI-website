const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all script blocks and extract references to IDs
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
const idsReferenced = new Set();

while ((match = scriptRegex.exec(content)) !== null) {
  const scriptContent = match[1];
  
  // Find getElementById('...')
  const getElRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
  let getElMatch;
  while ((getElMatch = getElRegex.exec(scriptContent)) !== null) {
    idsReferenced.add(getElMatch[1]);
  }
  
  // Find querySelector('#...')
  const querySelRegex = /querySelector\(['"]#([^'"]+)['"]\)/g;
  let querySelMatch;
  while ((querySelMatch = querySelRegex.exec(scriptContent)) !== null) {
    idsReferenced.add(querySelMatch[1]);
  }
  
  // Find any general selectors or window.innerWidth, etc.
}

console.log('IDs referenced in JavaScript:');
console.log(Array.from(idsReferenced));
