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
      lastPos = commentEnd + 3;
    }
    innerPos = commentEnd + 3;
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

if (lastPos < innerLen) {
  const remaining = innerContent.substring(lastPos);
  if (remaining.trim()) {
    elements.push({ type: 'text', content: remaining });
  }
}

function getFirstTagString(tagContent) {
  let pos = 0;
  while (pos < tagContent.length) {
    const nextTag = tagContent.indexOf('<', pos);
    if (nextTag === -1) break;
    if (tagContent.substring(nextTag, nextTag + 4) === '<!--') {
      const end = tagContent.indexOf('-->', nextTag + 4);
      pos = end === -1 ? tagContent.length : end + 3;
      continue;
    }
    const tagEnd = tagContent.indexOf('>', nextTag);
    if (tagEnd === -1) break;
    const tagString = tagContent.substring(nextTag, tagEnd + 1);
    const tagNameMatch = tagString.match(/^<([a-zA-Z0-9:-]+)/);
    if (tagNameMatch && tagNameMatch[1].toLowerCase() !== 'style' && tagNameMatch[1].toLowerCase() !== 'script') {
      return {
        tagString,
        firstTagOpen: nextTag,
        firstTagClose: tagEnd
      };
    }
    pos = tagEnd + 1;
  }
  return null;
}

console.log(`Total elements parsed: ${elements.length}`);
elements.forEach((el, index) => {
  if (el.type === 'tag') {
    const tagContent = el.content;
    const tagInfo = getFirstTagString(tagContent);
    if (tagInfo) {
      const tagString = tagInfo.tagString;
      const idMatch = tagString.match(/\bid="([^"]+)"/i);
      const id = idMatch ? idMatch[1] : null;
      console.log(`Element ${index}: TagName: ${el.tagName} | ID: ${id} | tagString: ${tagString.substring(0, 100)}`);
    } else {
      console.log(`Element ${index}: TagName: ${el.tagName} | No tag info | Content starts with: ${tagContent.substring(0, 50).replace(/\n/g, ' ')}`);
    }
  }
});
