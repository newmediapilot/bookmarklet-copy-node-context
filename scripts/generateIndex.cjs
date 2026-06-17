const fs = require('fs');
const path = require('path');

// Paths
const outPath = path.join(__dirname, '..', 'out.js');
const templatePath = path.join(__dirname, '..', 'templates', 'index.template.html');
const indexOutPath = path.join(__dirname, '..', 'index.html');

try {
const template = fs.readFileSync(templatePath, 'utf8');
  const finalIndex = template;

  fs.writeFileSync(indexOutPath, finalIndex, 'utf8');
  console.log(`Generated index.html with bookmarklet code.`);
} catch (err) {
  console.error('Error generating index:', err.message);
  process.exit(1);
}
