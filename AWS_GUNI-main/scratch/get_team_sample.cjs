const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find all text after id="team"
const teamSection = content.split('id="team"')[1]?.split('id="')[0] || '';
console.log('Team Section text sample:');
console.log(teamSection.substring(0, 1000));
