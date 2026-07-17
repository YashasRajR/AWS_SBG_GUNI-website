const fs = require('fs');
const path = require('path');
function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (['About.tsx', 'Contact.tsx', 'Events.tsx', 'Gallery.tsx', 'Team.tsx'].includes(file)) {
      let content = fs.readFileSync(p, 'utf8');
      
      // Match h1 or motion.h1
      const regex = /(<(?:motion\.)?h1[^>]*className=")([^"]*)(bg-gradient-to-b from-\[#190a2b\] to-\[#d6aeff\] bg-clip-text text-transparent)([^"]*)("[^>]*>)\s*([^<]+)\s*(<\/(?:motion\.)?h1>)/g;
      
      let changed = false;
      content = content.replace(regex, (match, p1, p2, p3, p4, p5, text, p7) => {
        changed = true;
        const newClass = (p2 + p4).replace(/\s+/g, ' ').trim();
        return `${p1}${newClass}${p5}
          <span className="bg-gradient-to-b from-[#190a2b] to-[#d6aeff] bg-clip-text text-transparent inline-block pb-1">
            ${text.trim()}
          </span>
        ${p7}`;
      });
      
      if (changed) {
        fs.writeFileSync(p, content);
        console.log('Fixed heading in', p);
      }
    }
  });
}
walk('d:/GUNI/AWS SBG GUNI/AWS_GUNI-main/src/pages');
