const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const navbarStart = content.indexOf('id="navbar"');
const navbarEnd = content.indexOf('id="mobile-backdrop"');
const navbarContent = content.substring(navbarStart, navbarEnd);

let parseDepth = 0;
let pos = 0;
const len = navbarContent.length;

while (pos < len) {
  const nextTag = navbarContent.indexOf('<', pos);
  if (nextTag === -1) break;
  
  pos = nextTag;
  
  if (navbarContent.substring(pos, pos + 4) === '<!--') {
    const commentEnd = navbarContent.indexOf('-->', pos + 4);
    pos = commentEnd + 3;
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
    console.log(`Tag: </${tagName}> | Depth: ${oldDepth} -> ${parseDepth}`);
  } else {
    if (!isSelfClosing) {
      parseDepth++;
    }
    console.log(`Tag: <${tagName}${isSelfClosing ? ' (self-closing)' : ''}> | Depth: ${oldDepth} -> ${parseDepth} | String: ${tagString.substring(0, 50)}`);
  }
  pos = tagEnd + 1;
}
