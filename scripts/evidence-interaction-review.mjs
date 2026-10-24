import {loadPlaywright} from './browser-runtime.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await loadPlaywright().chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage(),report={checkedAt:new Date().toISOString(),browser:await browser.version(),checks:[],errors:[]};
page.on('pageerror',e=>report.errors.push(e.message));page.on('dialog',d=>d.accept());
const pass=s=>{report.checks.push(s);console.log('PASS '+s);};
try{
 await page.goto('http://127.0.0.1:43178');await page.locator('#sample-conflict').click();await page.locator('.analyze').click();
 assert.equal(await page.locator('.window-option').count(),2);
 assert.equal(await page.locator('#deadline-value').innerText(),'Choose a rule');
 assert.match(await page.locator('.window-option').nth(0).innerText(),/Nov 8, 2026[\s\S]*Nov 9, 2026/);
 assert.match(await page.locator('.window-option').nth(1).innerText(),/Oct 14, 2026[\s\S]*Oct 15, 2026/);
 assert.equal(await page.locator('#days').inputValue(),'');assert.equal(await page.locator('#calendar').isDisabled(),true);
 pass('Competing windows expose both counting possibilities without selecting a convenient date');
 await page.locator('.window-comparison').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
 await page.screenshot({path:'evidence/comparison-desktop.png'});
 for(const width of [768,390,360]){
  await page.setViewportSize({width,height:width===768?1024:844});
  await page.locator('.window-comparison').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  if(width<700){const box=await page.locator('#comparison-heading').boundingBox(),nav=await page.locator('.workspace-toolbar').boundingBox();assert.ok(box.y>=nav.y+nav.height);}
  assert.ok((await page.locator('.window-choice').evaluateAll(els=>els.map(el=>el.getBoundingClientRect()))).every(r=>r.left>=0&&r.right<=width&&r.height>=44));
  if(width===390)await page.screenshot({path:'evidence/comparison-mobile.png'});
 }
 pass('Comparison dates and rule actions fit tablet and two phone widths with 44px targets');
 await page.setViewportSize({width:1440,height:1000});await page.locator('[data-window="1"]').click();
 assert.equal(await page.locator('#anchor').inputValue(),'2026-10-01');assert.equal(await page.locator('#basis').inputValue(),'purchase');assert.equal(await page.locator('#days').inputValue(),'14');assert.equal(await page.locator('#counting').inputValue(),'');assert.equal(await page.locator('#rationale').inputValue(),'');assert.equal(await page.locator('#ack').isChecked(),false);assert.equal(await page.locator('#calendar').isDisabled(),true);
 assert.equal(await page.locator('#deadline-value').innerText(),'Choose first-day counting');
 pass('Explicit rule choice fills evidence-based fields, leaving counting and confirmation to the user');
 await page.locator('#counting').selectOption('include');await page.locator('#rationale').fill('Fictional review: the open-box purchase rule applies; this test explicitly assumes purchase is day one.');await page.locator('#ack').check();await page.locator('#confirm').click();
 assert.equal(await page.locator('#deadline-value').innerText(),'October 14, 2026');assert.equal(await page.locator('#calendar').isEnabled(),true);assert.match(await page.locator('.warning').innerText(),/Multiple return/);
 pass('Explicit interpretation unlocks the selected date while retaining original conflict flags');
 await page.getByRole('button',{name:'Show policy line 3 in original document',exact:true}).click();
 const selection=await page.locator('#policy').evaluate(el=>({focused:document.activeElement===el,text:el.value.slice(el.selectionStart,el.selectionEnd)}));
 assert.equal(selection.focused,true);assert.match(selection.text,/Open-box items: return requests within 14 calendar days of purchase/);assert.equal(await page.locator('#calendar').isEnabled(),true);
 await page.screenshot({path:'evidence/original-source-selected.png'});
 pass('Evidence action selects the exact original policy line without changing the reviewed case');
 await page.locator('#policy').fill((await page.locator('#policy').inputValue())+'\nChanged source.');
 assert.equal(await page.locator('#calendar').isDisabled(),true);assert.ok((await page.locator('[data-source],[data-window]').evaluateAll(els=>els.map(el=>el.disabled))).every(Boolean));
 pass('Source edits disable stale source links and rule shortcuts as well as calendar export');
 await page.locator('#new').click();await page.locator('#receipt').fill('Delivered: 2026-10-10');await page.locator('#policy').fill('Return within 14 business days of delivery.\nReturn within 30 calendar days of delivery, excluding the delivery day.');await page.locator('.analyze').click();
 assert.equal(await page.locator('[data-window="0"]').isDisabled(),true);assert.equal(await page.locator('[data-window="1"]').isEnabled(),true);assert.match(await page.locator('.window-option').nth(0).innerText(),/No date calculated/);
 pass('Unsupported business-day comparison never offers a calculated date or selectable shortcut');
 assert.deepEqual(report.errors,[]);report.result='PASS';
}catch(e){report.result='FAIL';report.error=e.stack;throw e;}
finally{await context.close();await browser.close();await writeFile('evidence/evidence-interaction-review.json',JSON.stringify(report,null,2)+'\n');}
