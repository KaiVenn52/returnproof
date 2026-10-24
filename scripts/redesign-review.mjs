import {loadPlaywright} from './browser-runtime.mjs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const pw=loadPlaywright();
const browser=await pw.chromium.launch({channel:'msedge',headless:true});
const report={runAt:new Date().toISOString(),browser:await browser.version(),reviewer:'Agent review, not a learner interview or user study',checks:[],viewports:[],errors:[]};
const pass=label=>{report.checks.push(label);console.log('PASS '+label);};
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
page.on('pageerror',e=>report.errors.push(e.message));
async function shot(name){await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});await page.screenshot({path:'evidence/'+name+'.png',fullPage:false});}
async function confirm(){await page.locator('#rationale').fill('The fictional policy uses 30 calendar days from the day after delivery. Conditions checked for this demo.');await page.locator('#ack').check();await page.locator('#confirm').click();}
try{
 await page.goto('http://127.0.0.1:43178');
 await page.keyboard.press('Tab');assert.equal(await page.locator('.skip').evaluate(el=>el===document.activeElement),true);assert.ok((await page.locator('.skip').boundingBox()).y>=0);pass('Keyboard skip link is visible when focused');
 await page.keyboard.press('Enter');assert.ok(await page.locator('main').isVisible());
 await shot('redesign-desktop-empty');
 await page.getByRole('button',{name:/Try a clear example/}).click();
 let leaveMessage='';page.once('dialog',async d=>{leaveMessage=d.message();await d.dismiss();});await page.locator('#new').click();assert.match(leaveMessage,/Discard unsaved/);assert.match(await page.locator('#receipt').inputValue(),/2026-10-10/);pass('Cancel discard keeps unsaved input');
 page.once('dialog',d=>d.accept());await page.locator('#new').click();assert.equal(await page.locator('#receipt').inputValue(),'');pass('Explicit discard starts a fresh case');
 await page.getByRole('button',{name:/Try a clear example/}).click();await page.getByRole('button',{name:/Check return window/}).click();await confirm();await page.locator('[data-material="0"]').check();
 const rationale=await page.locator('#rationale').inputValue();await page.getByRole('button',{name:/Check return window/}).click();assert.equal(await page.locator('#rationale').inputValue(),rationale);assert.equal(await page.locator('[data-material="0"]').isChecked(),true);assert.equal(await page.locator('#calendar').isEnabled(),true);pass('Unchanged-source recheck preserves rationale, checklist and confirmation');
 await page.locator('#save').click();assert.match(await page.locator('#draft-state').innerText(),/Saved/);assert.equal(await page.locator('#ack').isChecked(),true);pass('Saved indicator and acknowledgment match persisted state');
 await shot('redesign-desktop-ready');
 const targets=await page.locator('.analyze,#confirm,#save,#calendar').evaluateAll(els=>els.map(e=>({id:e.id||'analyze',height:e.getBoundingClientRect().height})));assert.ok(targets.every(t=>t.height>=44));pass('Primary flow controls have at least 44px targets');
 // Measure only visible core control contrast, not a claim of a full WCAG audit.
 const colors=await page.locator('.analyze').evaluate(el=>({fg:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
 const lum=s=>s.match(/[\d.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((v,n,i)=>v+n*[.2126,.7152,.0722][i],0);const ratio=(Math.max(lum(colors.fg),lum(colors.bg))+.05)/(Math.min(lum(colors.fg),lum(colors.bg))+.05);assert.ok(ratio>=4.5);report.primaryButtonContrast=ratio;pass('Primary button text contrast exceeds 4.5:1');
 for(const [width,height] of [[1440,1000],[1280,900],[1024,768],[768,1024],[390,844],[360,800]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${width}px overflow`);
  const bad=await page.locator('input:not([type=checkbox]),select,textarea').evaluateAll(els=>els.filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.getBoundingClientRect().left<0).map(e=>e.id));assert.deepEqual(bad,[]);report.viewports.push({width,height,horizontalOverflow:false,controlsWithinViewport:true});
  if(width===390){await shot('redesign-mobile-ready');await page.locator('.plan-panel').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));await page.screenshot({path:'evidence/redesign-mobile-plan.png'});}if(width===768)await shot('redesign-tablet-ready');
 }
 pass('Six desktop/tablet/phone widths have no horizontal overflow or off-screen inputs');
 await page.setViewportSize({width:1440,height:1000});await page.locator('#policy').fill((await page.locator('#policy').inputValue())+'\nChanged policy.');assert.equal(await page.locator('#deadline-value').innerText(),'Recheck the sources');assert.equal(await page.locator('#calendar').isDisabled(),true);assert.equal(await page.locator('#stale-note').isVisible(),true);pass('Changed sources suppress the old date and disable exports');
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:/Try a policy conflict/}).click();await page.getByRole('button',{name:/Check return window/}).click();await shot('redesign-desktop-conflict');
 await page.locator('#anchor').fill('2026-10-01');await page.locator('#basis').selectOption('purchase');await page.locator('#days').fill('14');await page.locator('#counting').selectOption('exclude');await confirm();await page.locator('#save').click();
 await page.locator('#delete').click();await page.locator('#cancel-delete').click();assert.equal(await page.locator('[data-case]').count(),2);assert.equal(await page.locator('#delete').innerText(),'Delete this case');pass('Delete has a working cancel path that keeps the record');
 const faultContext=await browser.newContext(),fault=await faultContext.newPage();await fault.goto('http://127.0.0.1:43178');await fault.evaluate(()=>localStorage.setItem('returnproof.v1','{unreadable'));await fault.reload();await fault.getByRole('button',{name:/Try a clear example/}).click();await fault.getByRole('button',{name:/Check return window/}).click();
 fault.once('dialog',d=>d.dismiss());await fault.locator('#save').click();assert.equal(await fault.evaluate(()=>localStorage.getItem('returnproof.v1')),'{unreadable');pass('Cancel replacement preserves unreadable existing browser data');
 fault.once('dialog',d=>d.accept());await fault.locator('#save').click();assert.equal(await fault.getByRole('alert').count(),0);assert.equal(await fault.evaluate(()=>JSON.parse(localStorage.getItem('returnproof.v1')).length),1);await faultContext.close();pass('Explicit replacement recovers storage without a stale warning');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.plan-panel').evaluate(el=>getComputedStyle(el).animationName),'none');pass('Reduced-motion preference disables entrance animation');
 assert.deepEqual(report.errors,[]);report.result='PASS';
}catch(e){report.result='FAIL';report.error=e.stack;throw e;}
finally{await context.close();await browser.close();await writeFile('evidence/redesign-review.json',JSON.stringify(report,null,2));}
