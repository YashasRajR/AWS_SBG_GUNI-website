const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const wrapperStart = content.indexOf('class="sbg-wrapper');
const startTagClose = content.indexOf('>', wrapperStart);
const innerContentStart = startTagClose + 1;

console.log('First 500 characters of innerContent:');
console.log(content.substring(innerContentStart, innerContentStart + 500));
