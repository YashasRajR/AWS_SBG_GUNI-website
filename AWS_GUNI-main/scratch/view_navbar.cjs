const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const navbarStart = content.indexOf('id="navbar"');
const navbarEnd = content.indexOf('id="mobile-backdrop"');
console.log(content.substring(navbarStart, navbarEnd));
