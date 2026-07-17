const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      if (content.includes('target="_blank"')) {
        content = content.replace(/target="_blank"/g, '');
        // also remove rel="noopener noreferrer" if it exists, as it's useless without target="_blank"
        content = content.replace(/rel="noopener noreferrer"/g, '');
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated', p);
      }
    }
  });
}

walk('d:/GUNI/AWS SBG GUNI/AWS_GUNI-main/src');
