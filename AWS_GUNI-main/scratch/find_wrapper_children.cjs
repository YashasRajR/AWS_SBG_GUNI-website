const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const wrapperStart = content.indexOf('class="sbg-wrapper');
const startTagOpen = content.lastIndexOf('<div', wrapperStart);
const startTagClose = content.indexOf('>', wrapperStart);
const innerStart = startTagClose + 1;

let depth = 1;
let pos = innerStart;
const len = content.length;
const children = [];

while (pos < len) {
  const nextOpen = content.indexOf('<', pos);
  if (nextOpen === -1) break;
  
  pos = nextOpen;
  
  if (content.substring(pos, pos + 4) === '<!--') {
    const end = content.indexOf('-->', pos + 4);
    pos = end === -1 ? len : end + 3;
    continue;
  }
  
  const isClose = content.substring(pos, pos + 2) === '</';
  const tagEnd = content.indexOf('>', pos);
  if (tagEnd === -1) break;
  
  const tagString = content.substring(pos, tagEnd + 1);
  const tagNameMatch = tagString.match(/^<\/?([a-zA-Z0-9:-]+)/);
  const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
  
  if (isClose) {
    depth--;
    if (depth === 0) {
      break;
    }
    pos = tagEnd + 1;
    continue;
  }
  
  const isVoid = ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
  const isSelfClosing = tagString.endsWith('/>') || isVoid;
  
  if (depth === 1) {
    children.push({
      tagName,
      id: tagString.match(/\bid="([^"]+)"/i)?.[1] || null,
      class: tagString.match(/\bclass="([^"]+)"/i)?.[1] || null,
      tagString
    });
  }
  
  if (!isSelfClosing) {
    depth++;
  }
  
  pos = tagEnd + 1;
}

console.log('Direct children of .sbg-wrapper:');
children.forEach((c, i) => {
  console.log(`${i + 1}. <${c.tagName}> ID: "${c.id}" Class: "${c.class}"`);
});
