const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'single-page-cms', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

const searchTerms = ['Aric', 'Yashas', 'Maniyar', 'Kiran Amin', 'Pravesh', 'Amit Patel', 'Sneha Sharma', 'Aryan Shah'];
searchTerms.forEach(term => {
  console.log(`Searching for "${term}":`, content.includes(term));
});
