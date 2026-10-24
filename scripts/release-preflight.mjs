import {execFileSync} from 'node:child_process';
import {writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const git=(...args)=>execFileSync('git',args,{maxBuffer:64*1024*1024});
const commit=git('rev-parse','HEAD').toString().trim();
const paths=git('ls-files','-z').toString().split('\0').filter(Boolean);
const historyPaths=[...new Set(git('log','--all','--format=','--name-only').toString().split(/\r?\n/).filter(Boolean))];
const privatePath=p=>/(^|\/)(?:learner-profile\.md|\.env(?:\..*)?|[^/]*\.(?:pem|p12|pfx)|cookies?\.(?:json|txt))$/i.test(p)&&!p.endsWith('.env.example');
const findings=historyPaths.filter(privatePath).map(path=>({path,reason:'Private filename in reachable history'}));
const signatures=[['private-key',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],['github-token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/],['openai-key',/\bsk-proj-[A-Za-z0-9_-]{30,}\b/],['aws-access-key',/\bAKIA[A-Z0-9]{16}\b/]];
let textBlobsScanned=0;
for(const row of git('rev-list','--objects','--all').toString().split(/\r?\n/)){
 const space=row.indexOf(' ');if(space<0)continue;const oid=row.slice(0,space),path=row.slice(space+1);
 if(!/\.(?:mjs|js|json|md|html|css|toml|txt|ya?ml|cmd|ps1)$/i.test(path))continue;
 const value=git('cat-file','blob',oid).toString('utf8');textBlobsScanned++;
 for(const [kind,pattern] of signatures)if(pattern.test(value))findings.push({path,blob:oid,reason:kind});
}
const pkg=JSON.parse(await readFile('package.json','utf8'));
assert.equal(Object.keys(pkg.dependencies||{}).length,0);
for(const path of ['LICENSE','README.md','devpost/scope.md','devpost/prd.md','devpost/spec.md','evidence/returnproof-demo.mp4'])assert.ok(paths.includes(path),'Missing required artifact '+path);
const video=JSON.parse(await readFile('evidence/demo-recording.json','utf8'));
for(const [path,blob] of Object.entries(video.applicationGitBlobs))assert.equal(git('rev-parse','HEAD:'+path).toString().trim(),blob,'Video asset mismatch '+path);
assert.ok(Number(video.media.format.duration)>=60&&Number(video.media.format.duration)<180);
const report={checkedAt:new Date().toISOString(),sourceCommit:commit,trackedFiles:paths.length,historyPaths:historyPaths.length,textBlobsScanned,findings,productionDependencies:0,requiredTechnicalFilesPresent:true,videoSeconds:Number(video.media.format.duration),videoMatchesAllApplicationAssets:true,scope:'Reachable local Git history and committed file names; high-confidence credential signatures. Manual review of intended publication files also required; not a guarantee that every possible secret is detected.',result:findings.length?'NEEDS_REVIEW':'PASS'};
report.originalHistoryContainsNonNoreplyAuthorEmail=git('log','--all','--format=%ae').toString().split(/\r?\n/).filter(Boolean).some(email=>!email.endsWith('@users.noreply.github.com'));
report.publicationStrategy='New one-commit source snapshot with verified GitHub noreply author; original local history is preserved and must not be pushed by this release plan.';
await writeFile('evidence/release-preflight.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));assert.equal(findings.length,0,'Resolve flagged publication material before publishing');
