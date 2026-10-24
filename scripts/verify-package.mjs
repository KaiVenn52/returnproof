import {readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {inflateRawSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
// Compare every archived byte with its committed Git blob; no extraction or dependencies.
const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
assert.equal(execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim(),'','Commit project changes before verifying the package.');
const expected=new Map(execFileSync('git',['ls-tree','-r','-z',commit],{encoding:'utf8'}).split('\0').filter(Boolean).map(row=>{const [meta,path]=row.split('\t');return[path,meta.split(' ')[2]];}));
const zip=await readFile('returnproof-review.zip');
let end=-1;for(let i=zip.length-22;i>=Math.max(0,zip.length-65557);i--)if(zip.readUInt32LE(i)===0x06054b50){end=i;break;}
assert.ok(end>=0,'ZIP end record missing');
const count=zip.readUInt16LE(end+10);let offset=zip.readUInt32LE(end+16),checked=0;
for(let i=0;i<count;i++){
 assert.equal(zip.readUInt32LE(offset),0x02014b50);
 const method=zip.readUInt16LE(offset+10),size=zip.readUInt32LE(offset+20),nameLength=zip.readUInt16LE(offset+28),extra=zip.readUInt16LE(offset+30),comment=zip.readUInt16LE(offset+32),local=zip.readUInt32LE(offset+42);
 const name=zip.subarray(offset+46,offset+46+nameLength).toString('utf8');offset+=46+nameLength+extra+comment;
 if(name.endsWith('/'))continue;
 assert.ok(expected.has(name),'Unexpected archived file: '+name);
 const start=local+30+zip.readUInt16LE(local+26)+zip.readUInt16LE(local+28),compressed=zip.subarray(start,start+size);
 assert.ok(method===0||method===8,'Unsupported ZIP method');const bytes=method===8?inflateRawSync(compressed):compressed;
 const blob=execFileSync('git',['cat-file','blob',expected.get(name)],{maxBuffer:32*1024*1024});
 assert.ok(blob.equals(bytes),'Archived bytes differ from committed source: '+name);expected.delete(name);checked++;
}
assert.equal(expected.size,0,'Some committed files are missing from the ZIP.');
const sha256=createHash('sha256').update(zip).digest('hex').toUpperCase();
const recorded=(await readFile('returnproof-review.sha256','utf8')).trim().split(/\s+/)[0];assert.equal(sha256,recorded,'SHA-256 file mismatch');
const report={verifiedAt:new Date().toISOString(),commit,zip:'returnproof-review.zip',sha256,filesCompared:checked,comparison:'Every ZIP file byte equals the corresponding Git blob at this commit',workingTreeClean:true};
await writeFile('returnproof-review.manifest.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
