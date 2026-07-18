const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const resolved = path.resolve(path.dirname(file), importPath).replace(/\\/g, '/');
      const relPath = path.relative('.', resolved).replace(/\\/g, '/');
      
      const dir = path.dirname(relPath);
      if (fs.existsSync(dir)) {
        const basename = path.basename(relPath);
        const actualFiles = fs.readdirSync(dir);
        let found = false;
        for (const actualFile of actualFiles) {
          const actualNameWithoutExt = actualFile.replace(/\.[^/.]+$/, '');
          if (actualNameWithoutExt.toLowerCase() === basename.toLowerCase()) {
            if (actualNameWithoutExt !== basename) {
              console.log(`Case mismatch in ${file}: imported ${basename} but actual file is ${actualNameWithoutExt}`);
            }
            found = true;
            break;
          }
        }
      }
    }
  }
}
console.log('Done checking casing.');
