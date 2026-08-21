const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const wrapperStart = content.indexOf('class="sbg-wrapper');
const startTagOpen = content.lastIndexOf('<div', wrapperStart);
const startTagClose = content.indexOf('>', wrapperStart);
const innerStart = startTagClose + 1;

// Find the matching closing </div> of the wrapper
let depth = 1;
let pos = innerStart;
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

const innerContent = content.substring(innerStart, wrapperEnd);

let parseDepth = 0;
let innerPos = 0;
const innerLen = innerContent.length;

while (innerPos < innerLen) {
  const nextTag = innerContent.indexOf('<', innerPos);
  if (nextTag === -1) break;
  
  innerPos = nextTag;
  
  if (innerContent.substring(innerPos, innerPos + 4) === '<!--') {
    const commentEnd = innerContent.indexOf('-->', innerPos + 4);
    innerPos = commentEnd + 3;
    continue;
  }
  
  const isClose = innerContent.substring(innerPos, innerPos + 2) === '</';
  const tagEnd = innerContent.indexOf('>', innerPos);
  if (tagEnd === -1) break;
  
  const tagString = innerContent.substring(innerPos, tagEnd + 1);
  const tagNameMatch = tagString.match(/^<\/?([a-zA-Z0-9:-]+)/);
  const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
  
  const isVoid = ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
  const isSelfClosing = tagString.trim().endsWith('/>') || isVoid;
  
  if (isClose) {
    const oldDepth = parseDepth;
    parseDepth--;
    if (parseDepth < 0 || parseDepth === 0) {
      console.log(`CLOSE: </${tagName}> | depth: ${oldDepth} -> ${parseDepth} | String: ${tagString}`);
    }
    innerPos = tagEnd + 1;
    continue;
  }
  
  // Start tag
  const oldDepth = parseDepth;
  if (parseDepth === 0) {
    console.log(`START ROOT: <${tagName}> | String: ${tagString.substring(0, 80)}`);
  }
  if (!isSelfClosing) {
    parseDepth++;
  }
  innerPos = tagEnd + 1;
}
