const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const wrapperStart = content.indexOf('class="sbg-wrapper');
const startTagClose = content.indexOf('>', wrapperStart);
const innerContentStart = startTagClose + 1;

let depth = 1;
let pos = innerContentStart;
const len = content.length;
let wrapperEnd = -1;

while (pos < len) {
  const nextDiv = content.indexOf('div', pos);
  if (nextDiv === -1) break;
  const isClose = content.substring(nextDiv - 2, nextDiv) === '</';
  const isOpen = content.substring(nextDiv - 1, nextDiv) === '<';
  if (isClose) {
    depth--;
    if (depth === 0) {
      wrapperEnd = nextDiv - 2;
      break;
    }
  } else if (isOpen) {
    depth++;
  }
  pos = nextDiv + 3;
}

const innerContent = content.substring(innerContentStart, wrapperEnd);

console.log('--- Tracing from 0 to 705 ---');
let depth2 = 0;
let pos2 = 0;
while (pos2 < 705) {
  const nextTag = innerContent.indexOf('<', pos2);
  if (nextTag === -1 || nextTag >= 705) break;
  
  pos2 = nextTag;
  
  if (innerContent.substring(pos2, pos2 + 4) === '<!--') {
    const end = innerContent.indexOf('-->', pos2 + 4);
    pos2 = end === -1 ? innerContent.length : end + 3;
    continue;
  }
  
  const isClose = innerContent.substring(pos2, pos2 + 2) === '</';
  const tagEnd = innerContent.indexOf('>', pos2);
  const tagString = innerContent.substring(pos2, tagEnd + 1);
  const tagName = tagString.match(/^<\/?([a-zA-Z0-9:-]+)/)?.[1].toLowerCase() || '';
  const isVoid = ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
  const isSelfClosing = tagString.endsWith('/>') || isVoid;
  
  if (isClose) {
    depth2--;
    console.log(`Tag: </${tagName}> | Depth: ${depth2 + 1} -> ${depth2} | pos: ${pos2}`);
  } else {
    if (!isSelfClosing) depth2++;
    console.log(`Tag: <${tagName}${isSelfClosing ? ' (self-closing)' : ''}> | Depth: ${depth2 - (isSelfClosing ? 0 : 1)} -> ${depth2} | pos: ${pos2} | String: ${tagString.substring(0, 50)}`);
  }
  pos2 = tagEnd + 1;
}
