const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-html', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const start = content.indexOf('id="events"');
if (start !== -1) {
  console.log(content.substring(start, start + 3000));
} else {
  console.log('Events not found');
}
