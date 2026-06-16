const fs = require('fs');
const path = require('path');
const terser = require('terser');

// Paths
const srcPath = path.join(__dirname, '..', 'bookmarklet.js');
const outPath = path.join(__dirname, '..', 'out.js');

try {
  const code = fs.readFileSync(srcPath, 'utf8').trim();
  // Minify with Terser (remove comments, compress)
  // Simple manual minification: strip comments, newlines, and collapse spaces
const withoutComments = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
const minified = withoutComments.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim();
const bookmarkletCode = `javascript:${minified}`;
  fs.writeFileSync(outPath, bookmarkletCode, 'utf8');
  console.log(`Bookmarklet written to ${outPath}`);
} catch (err) {
  console.error('Error generating bookmarklet:', err.message);
  process.exit(1);
}
