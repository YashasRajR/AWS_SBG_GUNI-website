const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all HTML tags that might violate rules
console.log('--- Checking HTML5 semantic tags ---');
const semanticTags = ['section', 'header', 'footer', 'nav', 'aside', 'article', 'main'];
semanticTags.forEach(tag => {
  const regex = new RegExp(`<${tag}\\b`, 'i');
  if (regex.test(content)) {
    console.log(`Violation: Found semantic tag <${tag}>`);
  } else {
    console.log(`Pass: No <${tag}> found`);
  }
});

console.log('--- Checking Heading tags ---');
const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
headings.forEach(tag => {
  const regex = new RegExp(`<${tag}\\b`, 'i');
  if (regex.test(content)) {
    console.log(`Warning/Violation: Found heading tag <${tag}>`);
  } else {
    console.log(`Pass: No <${tag}> found`);
  }
});

console.log('--- Checking Style tag placements ---');
// Style tags should be directly before their corresponding sections
const styleCount = (content.match(/<style\b/g) || []).length;
console.log(`Total <style> tags: ${styleCount}`);

console.log('--- Checking Script tag placements ---');
// Scripts should be in <head>
const scriptsInHead = content.split('</head>')[0].match(/<script\b/g) || [];
const totalScripts = content.match(/<script\b/g) || [];
console.log(`Scripts in <head>: ${scriptsInHead.length} out of ${totalScripts.length}`);

console.log('--- Checking Image tag URLs ---');
const imgRegex = /<img\s+[^>]*src=["']([^"']+)["']/g;
let match;
let relativeCount = 0;
while ((match = imgRegex.exec(content)) !== null) {
  const src = match[1];
  if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
    console.log(`Relative Image URL: ${src}`);
    relativeCount++;
  }
}
console.log(`Total relative image paths: ${relativeCount}`);

console.log('--- Checking for empty elements ---');
const emptyElements = ['span', 'div', 'i'];
emptyElements.forEach(tag => {
  const regex = new RegExp(`<${tag}[^>]*>\\s*<\\/${tag}>`, 'g');
  const count = (content.match(regex) || []).length;
  if (count > 0) {
    console.log(`Violation: Found ${count} empty <${tag}> elements`);
  }
});

console.log('--- Top level section IDs ---');
// Find top-level divs and their IDs
// A simple regex approach to find divs directly inside body
const bodyContent = content.split(/<body[^>]*>/i)[1]?.split(/<\/body>/i)[0] || '';
const topLevelDivs = [];
const regex = /<div\s+id="([^"]+)"/g;
while ((match = regex.exec(bodyContent)) !== null) {
  topLevelDivs.push(match[1]);
}
console.log('Top level IDs:', topLevelDivs);
