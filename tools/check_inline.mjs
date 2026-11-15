import { readFileSync } from 'node:fs';
const html=readFileSync(new URL('../src/index.src.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/);
if(!script) throw new Error('Inline script missing');
new Function(script[1]);
console.log('Inline script syntax OK');
