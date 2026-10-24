import {loadPlaywright} from './browser-runtime.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const pw=loadPlaywright();
const browser=await pw.chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
try{
 await page.goto('http://127.0.0.1:43178');
 await page.getByRole('button',{name:/Try a clear example/}).click();await page.getByRole('button',{name:/Check return window/}).click();
 await page.locator('#rationale').fill('The fictional policy specifies calendar days beginning the day after delivery. Item eligibility checked for this demo.');await page.locator('#ack').check();await page.locator('#confirm').click();
 assert.equal(await page.locator('#calendar').isEnabled(),true);
 await page.locator('#save').click();
 const checkedAfterSave=await page.locator('#ack').isChecked();
 if(process.argv.includes('--observe-before')){console.log(JSON.stringify({checkedAfterSave,calendarEnabledAfterSave:await page.locator('#calendar').isEnabled()}));}
 else{
  assert.equal(checkedAfterSave,true,'Saved confirmation must match the visible checkbox.');
  await page.reload();await page.locator('[data-case]').click();assert.equal(await page.locator('#ack').isChecked(),true);
  await page.locator('#ack').uncheck();assert.equal(await page.locator('#calendar').isDisabled(),true,'Withdrawing acknowledgment must revoke calendar access.');
  await page.locator('#save').click();await page.reload();await page.locator('[data-case]').click();assert.equal(await page.locator('#calendar').isDisabled(),true);assert.equal(await page.locator('#ack').isChecked(),false);
  await page.locator('#ack').check();await page.locator('#confirm').click();assert.equal(await page.locator('#calendar').isEnabled(),true);
  await page.locator('#policy').fill((await page.locator('#policy').inputValue())+'\nChanged source.');assert.equal(await page.locator('#calendar').isDisabled(),true);assert.equal(await page.locator('#ack').isChecked(),false);
  assert.deepEqual(errors,[]);await writeFile('evidence/confirmation-review.json',JSON.stringify({checkedAt:new Date().toISOString(),reviewer:'Codex agent; not learner participation',result:'PASS',checks:['Confirmed checkbox stays checked after save/reopen','Unchecking revokes calendar access immediately','Saved withdrawal survives reload','Explicit reconfirmation restores access','Source edits still revoke acknowledgment and calendar access'],pageErrors:errors},null,2));console.log('PASS: five acknowledgment consistency and withdrawal checks.');
 }
}finally{await browser.close();}
