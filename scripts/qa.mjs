import {loadPlaywright} from './browser-runtime.mjs';
import {mkdir,writeFile,readFile,copyFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const playwright=loadPlaywright();
await mkdir('evidence',{recursive:true});
const browser=await playwright.chromium.launch({channel:process.env.BROWSER_CHANNEL||'msedge',headless:true});
const report={runAt:new Date().toISOString(),browser:await browser.version(),browserPath:'Browser plugin not available; regular bundled Playwright with installed Edge',checks:[],console:[],outbound:[]};
const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true,recordVideo:{dir:'evidence/raw-video',size:{width:1440,height:1000}}});
const page=await context.newPage();
page.on('dialog',d=>d.accept());
const pause=()=>page.waitForTimeout(600);
page.on('pageerror',e=>report.console.push(e.message));
page.on('console',m=>{if(['warning','error'].includes(m.type()))report.console.push(m.text());});
page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:43178')&&!r.url().startsWith('blob:'))report.outbound.push(r.url());});
const check=(label)=>{report.checks.push({label,status:'PASS'});console.log('PASS '+label);};
try{
 await page.goto('http://127.0.0.1:43178');await page.waitForSelector('h1');assert.match(await page.title(),/ReturnProof/);assert.match(await page.locator('h1').innerText(),/Your return/);check('Correct URL/title, meaningful app, no framework overlay');
 await page.screenshot({path:'evidence/desktop-empty.png',fullPage:true});await pause();
 await page.getByRole('button',{name:/Try a clear example/}).click();await pause();await page.getByRole('button',{name:/Check return window/}).click();await pause();
 assert.equal(await page.locator('#deadline-value').innerText(),'November 9, 2026');assert.equal(await page.locator('#calendar').isDisabled(),true);check('Clear source extracts traceable November 9 candidate; calendar locked');
 await page.screenshot({path:'evidence/desktop-review.png',fullPage:true});
 await page.locator('#rationale').fill('The fictional policy gives 30 calendar days, starting the day after delivery. Item conditions were checked.');await page.locator('#ack').check();await page.locator('#confirm').click();assert.equal(await page.locator('#calendar').isEnabled(),true);check('Explicit rationale and acknowledgment unlock calendar');await pause();
 await page.locator('[data-material="0"]').check();await page.locator('#save').click();await pause();
 for(const [id,name] of [['download-md','sample-checklist.md'],['download-json','sample-evidence.json'],['calendar','sample-deadline.ics']]){
   const downloadPromise=page.waitForEvent('download');await page.locator('#'+id).click();const download=await downloadPromise;await download.saveAs('evidence/'+name);
 }
 const ics=await readFile('evidence/sample-deadline.ics','utf8');assert.match(ics,/DTSTART;VALUE=DATE:20261109/);assert.match(ics,/DTEND;VALUE=DATE:20261110/);
 const pack=JSON.parse(await readFile('evidence/sample-evidence.json','utf8'));assert.match(pack.status,/Human-confirmed/);assert.equal(pack.materials[0].checked,true);check('Real browser downloads: checklist, evidence JSON and valid all-day ICS');
 await page.reload();await page.locator('[data-case]').click();assert.equal(await page.locator('#calendar').isEnabled(),true);assert.equal(await page.locator('[data-material="0"]').isChecked(),true);check('Saved confirmed case and checklist survive reload');
 await page.locator('#policy').fill((await page.locator('#policy').inputValue())+'\nPolicy updated.');assert.equal(await page.locator('#calendar').isDisabled(),true);assert.equal(await page.locator('#confirm').isDisabled(),true);check('Editing a source immediately revokes confirmation and requires rebuild');
 await page.getByRole('button',{name:/Try a policy conflict/}).click();await page.getByRole('button',{name:/Check return window/}).click();await pause();assert.equal(await page.locator('#calendar').isDisabled(),true);assert.equal(await page.locator('#days').inputValue(),'');assert.match(await page.locator('.warning').innerText(),/Multiple return windows/);check('Conflict keeps window unresolved with exact source evidence');
 await page.screenshot({path:'evidence/desktop-conflict.png',fullPage:true});
 await page.locator('#anchor').fill('2026-10-01');await page.locator('#basis').selectOption('purchase');await page.locator('#days').fill('14');await page.locator('#counting').selectOption('include');await page.locator('#rationale').fill('Demonstration only: choosing the open-box purchase rule and explicitly assuming purchase is day one; merchant eligibility remains unverified.');await page.locator('#ack').check();await page.locator('#confirm').click();assert.equal(await page.locator('#deadline-value').innerText(),'October 14, 2026');assert.equal(await page.locator('#calendar').isEnabled(),true);assert.match(await page.locator('.warning').innerText(),/Multiple return windows/);check('Manual conflict interpretation changes arithmetic; source flags remain');
 await page.locator('#save').click();assert.equal(await page.locator('[data-case]').count(),2);
 await page.locator('#delete').click();assert.equal(await page.locator('[data-case]').count(),2);await page.locator('#delete').click();assert.equal(await page.locator('[data-case]').count(),1);await page.reload();assert.equal(await page.locator('[data-case]').count(),1);check('Two-step deletion removes only selected saved case after reload');
 await page.locator('[data-case]').click();await page.locator('#plan-heading').scrollIntoViewIfNeeded();await page.screenshot({path:'evidence/desktop-confirmed.png',fullPage:true});await pause();
 const mobile=await context.newPage();await mobile.setViewportSize({width:390,height:844});await mobile.goto('http://127.0.0.1:43178');await mobile.locator('[data-case]').click();
 assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await mobile.screenshot({path:'evidence/mobile-confirmed.png',fullPage:true});await mobile.locator('#calendar').scrollIntoViewIfNeeded();assert.equal(await mobile.locator('#calendar').isEnabled(),true);check('390×844 mobile: responsive layout, no horizontal overflow, usable export');await mobile.close();
 // Corruption and denied writes use an isolated context; never touch user storage.
 const faults=await browser.newContext();const fp=await faults.newPage();await fp.goto('http://127.0.0.1:43178');await fp.evaluate(()=>localStorage.setItem('returnproof.v1','{broken'));await fp.reload();assert.match(await fp.getByRole('alert').innerText(),/Saved files could not be read/);check('Corrupt storage displays an actionable warning');
 await fp.evaluate(()=>localStorage.clear());await fp.reload();await fp.getByRole('button',{name:/Try a clear example/}).click();await fp.getByRole('button',{name:/Check return window/}).click();await fp.evaluate(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Quota test','QuotaExceededError');};});await fp.locator('#save').click();assert.match(await fp.locator('#message').innerText(),/Could not save/);check('Denied/full storage does not claim save success');await faults.close();
 await page.getByRole('button',{name:/New return/}).click();await page.locator('#receipt').fill('Delivered: 2026-10-10\n<img src=x onerror=alert(1)>');await page.locator('#policy').fill('Return within 30 calendar days of delivery, count from the day after delivery.');await page.getByRole('button',{name:/Check return window/}).click();assert.equal(await page.locator('.evidence-list img').count(),0);check('Pasted HTML remains text and cannot execute');
 assert.equal(report.console.length,0);assert.equal(report.outbound.length,0);check('No app console/page errors and no outbound runtime requests');
 const r=await page.request.get('http://127.0.0.1:43178/.git/config');assert.equal(r.status(),404);const post=await page.request.post('http://127.0.0.1:43178/');assert.equal(post.status(),405);check('Static server rejects private paths and writes');
 report.result='PASS';
}catch(error){report.result='FAIL';report.error=error.stack;throw error;}
finally{const video=page.video();await context.close();if(video)await copyFile(await video.path(),'evidence/workflow-review.webm');await browser.close();await writeFile('evidence/qa.json',JSON.stringify(report,null,2));}
