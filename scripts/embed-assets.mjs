import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(path.join(root, 'src/styles.css'), 'utf8').trim();
const javascript = readFileSync(path.join(root, 'src/app.js'), 'utf8').trim();
const favicon = readFileSync(path.join(root, 'src/favicon.svg'), 'utf8').trim();
let html = readFileSync(path.join(root, 'index.html'), 'utf8');
if (/<\/style/i.test(css) || /<\/script/i.test(javascript)) throw new Error('Unexpected closing HTML tag in an asset.');
if (!html.includes('<style id="site-styles">') || !html.includes('<script id="site-interactions">')) throw new Error('Embedded asset markers missing.');
html = html.replace(/<style id="site-styles">[\s\S]*?<\/style>/, () => `<style id="site-styles">\n${css}\n  </style>`);
html = html.replace(/<script id="site-interactions">[\s\S]*?<\/script>/, () => `<script id="site-interactions">\n${javascript}\n  </script>`);
html = html.replace(/<link rel="icon"[^>]*>/, () => `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(favicon)}">`);
writeFileSync(path.join(root, 'index.html'), html);

const args = process.argv.slice(2);
if (args.length) {
  if (args.length !== 2 || args[0] !== '--output') throw new Error('Usage: node scripts/embed-assets.mjs [--output DIRECTORY]');
  const output = path.resolve(root, args[1]);
  mkdirSync(output, { recursive: true });
  writeFileSync(path.join(output, 'index.html'), html);
  writeFileSync(path.join(output, '.nojekyll'), '');
}
console.log('Standalone portfolio HTML is ready.');
