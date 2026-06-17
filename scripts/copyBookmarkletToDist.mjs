import fs from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'out.js');
const dest = path.join(process.cwd(), 'dist', 'bookmarklet.js');
fs.mkdirSync(path.dirname(dest), {recursive:true});
fs.copyFileSync(src, dest);
