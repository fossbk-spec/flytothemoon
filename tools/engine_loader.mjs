import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'src/index.src.html'), 'utf8');
const begin = '/* ENGINE:BEGIN */';
const end = '/* ENGINE:END */';
const a = html.indexOf(begin), b = html.indexOf(end);
if (a < 0 || b <= a) throw new Error('ENGINE markers missing');
export const Engine = new Function(html.slice(a + begin.length, b) + '\nreturn Engine;')();
