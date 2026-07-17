const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      
      // Match most emojis but exclude normal text/numbers/punctuation
      const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu;
      
      const newContent = content.replace(emojiRegex, '');
      
      if (content !== newContent) {
        fs.writeFileSync(p, newContent, 'utf8');
        console.log('Removed emojis from:', p);
      }
    }
  });
}

walk('d:/GUNI/AWS SBG GUNI/AWS_GUNI-main/src');
