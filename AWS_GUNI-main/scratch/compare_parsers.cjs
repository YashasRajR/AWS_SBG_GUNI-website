const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const wrapperStart = content.indexOf('class="sbg-wrapper');
const startTagOpen = content.lastIndexOf('<div', wrapperStart);
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

// Let's run both parsing loops and log state when pos is inside navbar
const navbarStart = innerContent.indexOf('id="navbar"');
const navbarEnd = innerContent.indexOf('id="mobile-backdrop"');

console.log('--- Parser 1 (trace_navbar logic) ---');
let depth1 = 0;
let pos1 = navbarStart;
while (pos1 < navbarEnd) {
  const nextTag = innerContent.indexOf('<', pos1);
  if (nextTag === -1 || nextTag >= navbarEnd) break;
  pos1 = nextTag;
  
  if (innerContent.substring(pos1, pos1 + 4) === '<!--') {
    const end = innerContent.indexOf('-->', pos1 + 4);
    pos1 = end === -1 ? len : end + 3;
    continue;
  }
  
  const isClose = innerContent.substring(pos1, pos1 + 2) === '</';
  const tagEnd = innerContent.indexOf('>', pos1);
  const tagString = innerContent.substring(pos1, tagEnd + 1);
  const tagName = tagString.match(/^<\/?([a-zA-Z0-9:-]+)/)?.[1].toLowerCase() || '';
  const isVoid = ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
  const isSelfClosing = tagString.trim().endsWith('/>') || isVoid;
  
  if (isClose) {
    depth1--;
    console.log(`P1: </${tagName}> -> depth: ${depth1} at ${pos1}`);
  } else {
    if (!isSelfClosing) depth1++;
    console.log(`P1: <${tagName}> -> depth: ${depth1} at ${pos1}`);
  }
  pos1 = tagEnd + 1;
}

console.log('--- Parser 2 (generate_final_html logic) ---');
let depth2 = 0;
let pos2 = 0; // Starts from 0 of innerContent!
const innerLen = innerContent.length;

while (pos2 < innerLen) {
  const nextTag = innerContent.indexOf('<', pos2);
  if (nextTag === -1) break;
  
  pos2 = nextTag;
  
  if (innerContent.substring(pos2, pos2 + 4) === '<!--') {
    const end = innerContent.indexOf('-->', pos2 + 4);
    pos2 = end === -1 ? innerLen : end + 3;
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
    if (pos2 >= navbarStart && pos2 < navbarEnd) {
      console.log(`P2: </${tagName}> -> depth: ${depth2} at ${pos2}`);
    }
  } else {
    if (!isSelfClosing) depth2++;
    if (pos2 >= navbarStart && pos2 < navbarEnd) {
      console.log(`P2: <${tagName}> -> depth: ${depth2} at ${pos2}`);
    }
  }
  pos2 = tagEnd + 1;
}
