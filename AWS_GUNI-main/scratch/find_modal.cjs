const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-html', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

let pos = 0;
while (true) {
  const match = content.toLowerCase().indexOf('modal', pos);
  if (match === -1) break;
  console.log(`Found 'modal' at index ${match}:`);
  console.log(content.substring(match - 100, match + 200));
  console.log('--------------------------------------------------');
  pos = match + 5;
}
