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

let parseDepth = 0;
let innerPos = 0;
const innerLen = innerContent.length;
const elements = [];
let lastPos = 0;

while (innerPos < innerLen) {
  const nextTag = innerContent.indexOf('<', innerPos);
  if (nextTag === -1) break;
  
  if (parseDepth === 0 && nextTag > lastPos) {
    const textBetween = innerContent.substring(lastPos, nextTag);
    if (textBetween.trim()) {
      elements.push({ type: 'text', content: textBetween });
    }
  }
  
  innerPos = nextTag;
  
  if (innerContent.substring(innerPos, innerPos + 4) === '<!--') {
    const commentEnd = innerContent.indexOf('-->', innerPos + 4);
    const commentContent = innerContent.substring(innerPos, commentEnd + 3);
    if (parseDepth === 0) {
      elements.push({ type: 'comment', content: commentContent });
    }
    innerPos = commentEnd + 3;
    lastPos = innerPos;
    continue;
  }
  
  const isClose = innerContent.substring(innerPos, innerPos + 2) === '</';
  const tagEnd = innerContent.indexOf('>', innerPos);
  if (tagEnd === -1) break;
  
  const tagString = innerContent.substring(innerPos, tagEnd + 1);
  const tagNameMatch = tagString.match(/^<\/?([a-zA-Z0-9:-]+)/);
  const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
  
  if (isClose) {
    parseDepth--;
    if (parseDepth === 0) {
      const elementContent = innerContent.substring(lastPos, tagEnd + 1);
      elements.push({ type: 'tag', tagName, content: elementContent });
      lastPos = tagEnd + 1;
    }
    innerPos = tagEnd + 1;
    continue;
  }
  
  const isVoid = ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
  const isSelfClosing = tagString.endsWith('/>') || isVoid;
  
  if (parseDepth === 0) {
    lastPos = innerPos;
    if (isSelfClosing) {
      elements.push({ type: 'tag', tagName, content: tagString });
      lastPos = tagEnd + 1;
    }
  }
  
  if (!isSelfClosing) {
    parseDepth++;
  }
  
  innerPos = tagEnd + 1;
}

elements.forEach((el, index) => {
  if (el.content.includes('id="navbar"')) {
    console.log(`FOUND id="navbar" in Element ${index}! type: ${el.type}`);
  }
  if (el.content.includes('sbg-navbar')) {
    console.log(`FOUND sbg-navbar in Element ${index}! type: ${el.type}`);
  }
});
