import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const html=readFileSync(resolve(root,'src/index.src.html'),'utf8');
const begin='/* PROFILE:BEGIN */', end='/* PROFILE:END */';
const a=html.indexOf(begin), b=html.indexOf(end);
if(a<0 || b<=a) throw new Error('PROFILE markers missing');
export const Profile=new Function(html.slice(a+begin.length,b)+'\nreturn Profile;')();
