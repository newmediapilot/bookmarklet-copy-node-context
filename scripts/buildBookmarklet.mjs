import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Paths
const srcPath = path.join(__dirname, '..', 'bookmarklet.js');
const outPath = path.join(__dirname, '..', 'out.js');
const templatePath = path.join(__dirname, '..', 'templates', 'index.template.html');
const indexOutPath = path.join(__dirname, '..', 'index.html');

try {
  const code = fs.readFileSync(srcPath, 'utf8').trim();
  // Minify with Terser (remove comments, compress)
  // Simple manual minification: strip comments, newlines, and collapse spaces
  const withoutComments = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
  const minified = withoutComments.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim();
  const bookmarkletCode = `javascript:${minified}`;
  fs.writeFileSync(outPath, bookmarkletCode, 'utf8');
  console.log(`Bookmarklet written to ${outPath}`);
  const template = fs.readFileSync(templatePath, 'utf8');
  fs.writeFileSync(indexOutPath, template, 'utf8');
} catch (err) {
  console.error('Error generating bookmarklet:', err.message);
  process.exit(1);
}
