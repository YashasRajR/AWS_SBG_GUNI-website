const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const outputPath = path.join(__dirname, '..', 'single-html-export', 'index.html');

// Create output directory if it doesn't exist
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let html = fs.readFileSync(inputPath, 'utf8');

console.log('--- Fixing Empty Elements (CKEditor Purge Prevention) ---');
// Prevent CKEditor from deleting empty tags by injecting &#x200d; inside them.
// Tags to check: span, div, i, a, p, label, b, strong, select, textarea, etc.
// We exclude self-closing/void tags (img, br, hr, input, link, meta).
const emptyTagRegex = /<(span|div|i|a|p|label|b|strong|button|select|textarea)\b([^>]*?)>\s*<\/\1>/gi;
let matchFound = true;
let iteration = 0;
while (matchFound && iteration < 10) {
  const matchCount = (html.match(emptyTagRegex) || []).length;
  if (matchCount === 0) {
    matchFound = false;
  } else {
    console.log(`Iteration ${iteration + 1}: Found ${matchCount} empty elements. Injecting ZWSP...`);
    html = html.replace(emptyTagRegex, '<$1$2>&#x200d;</$1>');
  }
  iteration++;
}

console.log('--- Restructuring Sections for CMS / CKEditor ---');
// We need to unwrap the main .sbg-wrapper div inside <body>,
// and wrap each child section/element in a clean <div id="ID" class="sbg-wrapper">.

const bodyStartRegex = /<body([^>]*)>/i;
const bodyEndRegex = /<\/body>/i;

const bodyStartMatch = html.match(bodyStartRegex);
const bodyEndMatch = html.match(bodyEndRegex);

if (!bodyStartMatch || !bodyEndMatch) {
  console.error('Body tags not found in source HTML');
  process.exit(1);
}

const headAndBodyStart = html.substring(0, bodyStartMatch.index + bodyStartMatch[0].length);
const bodyContent = html.substring(bodyStartMatch.index + bodyStartMatch[0].length, bodyEndMatch.index);
const bodyEndAndAfter = html.substring(bodyEndMatch.index);

// Find the outer sbg-wrapper in bodyContent
const wrapperStart = bodyContent.indexOf('class="sbg-wrapper');
if (wrapperStart === -1) {
  console.error('sbg-wrapper not found in body');
  process.exit(1);
}

const outerDivStart = bodyContent.lastIndexOf('<div', wrapperStart);
const outerDivEnd = bodyContent.indexOf('>', wrapperStart);
const innerContentStart = outerDivEnd + 1;

// Find matching closing </div> of the wrapper
let depth = 1;
let pos = innerContentStart;
const len = bodyContent.length;
let wrapperEnd = -1;

while (pos < len) {
  const nextDiv = bodyContent.indexOf('div', pos);
  if (nextDiv === -1) break;
  
  const isClose = bodyContent.substring(nextDiv - 2, nextDiv) === '</';
  const isOpen = bodyContent.substring(nextDiv - 1, nextDiv) === '<';
  
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
  console.error('Closing div of sbg-wrapper not found');
  process.exit(1);
}

const innerContent = bodyContent.substring(innerContentStart, wrapperEnd);

// Now parse the child elements inside innerContent.
// We will separate them and for every child element with an ID, we wrap it in a <div id="id" class="sbg-wrapper">
let parseDepth = 0;
let innerPos = 0;
const innerLen = innerContent.length;
const elements = [];
let lastPos = 0;

while (innerPos < innerLen) {
  const nextTag = innerContent.indexOf('<', innerPos);
  if (nextTag === -1) break;
  
  // Capturing text/style/comment before this tag
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
      // Reached the end of a top-level child element
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

// Clean up remaining text after last parsed tag
if (lastPos < innerLen) {
  const remaining = innerContent.substring(lastPos);
  if (remaining.trim()) {
    elements.push({ type: 'text', content: remaining });
  }
}

// Now build the new body content
let newBodyContent = '\n';

elements.forEach(el => {
  if (el.type === 'tag' && el.tagName !== 'style' && el.tagName !== 'script') {
    // This is a section/div/button tag. Wrap it!
    const tagContent = el.content;
    const firstTagOpen = tagContent.indexOf('<');
    const firstTagClose = tagContent.indexOf('>');
    const tagString = tagContent.substring(firstTagOpen, firstTagClose + 1);
    
    const idMatch = tagString.match(/\bid="([^"]+)"/i);
    const id = idMatch ? idMatch[1] : null;
    
    if (id) {
      console.log(`Wrapping section: <${el.tagName} id="${id}">`);
      
      // Remove id="id" from the inner tag string to avoid duplicate ID attributes
      // Use regex to remove exactly: id="id" (case insensitive, with spacing)
      const cleanTagString = tagString.replace(/\bid="[^"]*"\s*/gi, '');
      
      const remainingContent = tagContent.substring(firstTagClose + 1);
      
      // Build wrapped markup
      newBodyContent += `  <div id="${id}" class="sbg-wrapper">\n    ${cleanTagString}${remainingContent}\n  </div>\n`;
    } else {
      // No ID, just write it as is with sbg-wrapper class added if it's a div
      if (el.tagName === 'div') {
        const classMatch = tagString.match(/\bclass="([^"]+)"/i);
        const classes = classMatch ? classMatch[1] : '';
        const cleanTagString = tagString.replace(/\bclass="[^"]*"/gi, `class="sbg-wrapper ${classes}"`);
        newBodyContent += `  ${cleanTagString}${tagContent.substring(firstTagClose + 1)}\n`;
      } else {
        newBodyContent += `  ${tagContent}\n`;
      }
    }
  } else {
    // Keep text, styles, comments as is
    newBodyContent += el.content;
  }
});

// Stitch everything back together
const finalHtml = headAndBodyStart + newBodyContent + bodyEndAndAfter;

fs.writeFileSync(outputPath, finalHtml, 'utf8');
console.log('--- Conversion Successful! ---');
console.log(`Exported single-page HTML to: ${outputPath}`);
