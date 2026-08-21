const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find the content inside <div class="sbg-wrapper ...">
const wrapperStart = content.indexOf('class="sbg-wrapper');
if (wrapperStart === -1) {
  console.log('No sbg-wrapper found');
  process.exit(1);
}

const tagStart = content.lastIndexOf('<div', wrapperStart);
const tagEnd = content.indexOf('>', wrapperStart);
const innerContentStart = tagEnd + 1;

// Find the matching closing </div> of the wrapper
// Let's do a simple count of div depth to find the closing tag of this wrapper
let depth = 1;
let pos = innerContentStart;
const length = content.length;
let wrapperEnd = -1;

while (pos < length) {
  const nextDiv = content.indexOf('div', pos);
  if (nextDiv === -1) break;
  
  // Check if it's <div or </div
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

if (wrapperEnd === -1) {
  console.log('Could not find closing tag for sbg-wrapper');
  process.exit(1);
}

const innerContent = content.substring(innerContentStart, wrapperEnd);

// Let's parse the children of innerContent
let parseDepth = 0;
let innerPos = 0;
const innerLength = innerContent.length;
const directChildren = [];

while (innerPos < innerLength) {
  const nextTag = innerContent.indexOf('<', innerPos);
  if (nextTag === -1) break;

  innerPos = nextTag;
  
  if (innerContent.substring(innerPos, innerPos + 4) === '<!--') {
    // Comment tag
    const commentEnd = innerContent.indexOf('-->', innerPos + 4);
    if (commentEnd === -1) {
      innerPos = innerLength;
    } else {
      innerPos = commentEnd + 3;
    }
    continue;
  }
  
  if (innerContent.substring(innerPos, innerPos + 2) === '</') {
    // End tag
    parseDepth--;
    const tagEnd = innerContent.indexOf('>', innerPos + 2);
    innerPos = tagEnd + 1;
    continue;
  }
  
  // Start tag
  const isSelfClosing = innerContent.charAt(innerPos + 1) === '/' || innerContent.indexOf('/>', innerPos) === innerContent.indexOf('>', innerPos) - 1;
  const tagEnd = innerContent.indexOf('>', innerPos + 1);
  const tagString = innerContent.substring(innerPos, tagEnd + 1);
  const tagNameMatch = tagString.match(/^<([a-zA-Z0-9:-]+)/);
  const tagName = tagNameMatch ? tagNameMatch[1] : '';
  
  if (parseDepth === 0) {
    const idMatch = tagString.match(/\bid="([^"]*)"/i);
    const classMatch = tagString.match(/\bclass="([^"]*)"/i);
    directChildren.push({
      tagString: tagString.trim(),
      tagName,
      id: idMatch ? idMatch[1] : null,
      className: classMatch ? classMatch[1] : null
    });
  }
  
  if (!isSelfClosing && tagName.toLowerCase() !== 'img' && tagName.toLowerCase() !== 'br' && tagName.toLowerCase() !== 'hr' && tagName.toLowerCase() !== 'input' && tagName.toLowerCase() !== 'meta' && tagName.toLowerCase() !== 'link' && tagName.toLowerCase() !== 'style') {
    // Not self closing and not void/style element
    parseDepth++;
  }
  
  innerPos = tagEnd + 1;
}

console.log('Direct children tags under .sbg-wrapper:');
directChildren.forEach((child, index) => {
  console.log(`${index + 1}. <${child.tagName}> ID: "${child.id}" Class: "${child.className}"`);
});
