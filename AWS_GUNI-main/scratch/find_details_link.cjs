const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-html', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all occurrences of the word "Details" (case-sensitive or not) inside the events section
const eventsStart = content.indexOf('id="events"');
const eventsEnd = content.indexOf('id="gallery"');
const eventsSection = content.substring(eventsStart, eventsEnd);

let pos = 0;
while (true) {
  const match = eventsSection.toLowerCase().indexOf('details', pos);
  if (match === -1) break;
  console.log(`Found 'Details' around pos ${match}:`);
  console.log(eventsSection.substring(match - 300, match + 300));
  console.log('--------------------------------------------------');
  pos = match + 7;
}
