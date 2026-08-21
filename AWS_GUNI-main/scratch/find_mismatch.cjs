const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const navbarStart = content.indexOf('id="navbar"');
const navbarEnd = content.indexOf('id="mobile-backdrop"');
const navbarContent = content.substring(navbarStart, navbarEnd);

let parseDepth = 1; // Start at 1 for <div id="navbar"
let pos = navbarContent.indexOf('>') + 1; // start after <div id="navbar"...>
const len = navbarContent.length;

while (pos < len) {
  const nextTag = navbarContent.indexOf('<', pos);
  if (nextTag === -1) break;
  
  pos = nextTag;
  
  if (navbarContent.substring(pos, pos + 4) === '<!--') {
    const commentEnd = navbarContent.indexOf('-->', pos + 4);
    pos = commentEnd === -1 ? len : commentEnd + 3;
    continue;
  }
  
  const isClose = navbarContent.substring(pos, pos + 2) === '</';
  const tagEnd = navbarContent.indexOf('>', pos);
  if (tagEnd === -1) break;
  
  const tagString = navbarContent.substring(pos, tagEnd + 1);
  const tagNameMatch = tagString.match(/^<\/?([a-zA-Z0-9:-]+)/);
  const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
  
  const isVoid = ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
  const isSelfClosing = tagString.trim().endsWith('/>') || isVoid;
  
  const oldDepth = parseDepth;
  if (isClose) {
    parseDepth--;
    console.log(`Tag: </${tagName}> | Depth: ${oldDepth} -> ${parseDepth} | String: ${tagString}`);
    if (parseDepth === 0) {
      console.log(`WARNING: Depth hit 0 prematurely at position ${pos}! Tag string: ${tagString}`);
      // Print the surrounding content to see what closed it
      const start = Math.max(0, pos - 200);
      const end = Math.min(len, pos + 200);
      console.log('Surrounding Context:');
      console.log(navbarContent.substring(start, end));
    }
  } else {
    if (!isSelfClosing) {
      parseDepth++;
    }
    // Only print start tags of div to keep log short
    if (tagName === 'div') {
      console.log(`Tag: <${tagName}${isSelfClosing ? ' (self-closing)' : ''}> | Depth: ${oldDepth} -> ${parseDepth} | String: ${tagString}`);
    }
  }
  pos = tagEnd + 1;
}
