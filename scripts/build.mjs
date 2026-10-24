import {mkdir,copyFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const files=['index.html','src/app.mjs','src/domain.mjs','src/exports.mjs','src/styles.css'];
await mkdir('dist/src',{recursive:true});
for(const f of files){if(f.endsWith('.mjs'))execFileSync(process.execPath,['--check',f]);await copyFile(f,'dist/'+f);}
console.log('Built 5 static assets in dist/. No runtime dependencies or secrets.');
