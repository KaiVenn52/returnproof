import {test} from 'node:test';
import assert from 'node:assert/strict';
import {analyze,compareWindows,parseDate,deadline,addDays,remaining,confirmCase,isConfirmed,validCase,loadCases,SAMPLES,MATERIALS} from '../src/domain.mjs';
import {calendar,evidencePack,markdown,foldLine,escapeICS} from '../src/exports.mjs';
const input=(extra={})=>({anchor:'2026-10-10',days:30,basis:'delivery',counting:'exclude',rationale:'The calendar-day policy starts on the day after delivery.',...extra});
const sample=()=>({version:1,id:'case-123',...SAMPLES.clear,interpretation:input(),checklist:MATERIALS.map(()=>false),confirmation:null});
test('strict dates reject rollover, ambiguous and unsupported dates',()=>{
 for(const value of ['2026-02-29','2026-04-31','10/11/2026','2026-1-02','1899-12-31','2201-01-01',''])assert.equal(parseDate(value),null,value);
 assert.notEqual(parseDate('2024-02-29'),null);
});
test('calendar arithmetic handles month, year, leap and DST boundaries',()=>{
 assert.equal(addDays('2024-02-28',1),'2024-02-29');assert.equal(addDays('2024-02-29',1),'2024-03-01');
 assert.equal(addDays('2026-12-31',1),'2027-01-01');assert.equal(addDays('2026-03-08',1),'2026-03-09');
 assert.equal(addDays('2026-11-01',1),'2026-11-02');assert.throws(()=>addDays('2200-12-31',1));
});
test('anchor-inclusive and anchor-exclusive windows differ by exactly one day',()=>{
 assert.equal(deadline(input()),'2026-11-09');assert.equal(deadline(input({counting:'include'})),'2026-11-08');
 assert.equal(deadline(input({days:1,counting:'include'})),'2026-10-10');assert.equal(deadline(input({days:1})),'2026-10-11');
});
test('invalid interpretation cannot calculate',()=>{
 for(const extra of [{days:0},{days:366},{days:1.5},{days:'30'},{anchor:'2026-02-30'},{counting:''},{basis:'unknown'}])assert.throws(()=>deadline(input(extra)));
});
test('today and expired states use calendar dates',()=>{
 assert.equal(remaining('2026-10-10','2026-10-10'),0);assert.equal(remaining('2026-10-09','2026-10-10'),-1);assert.equal(remaining('2026-10-11','2026-10-10'),1);assert.equal(remaining('bad','2026-10-10'),null);
});
test('clear sample links values to exact line quotes and never auto-confirms',()=>{
 const a=analyze(SAMPLES.clear.receipt,SAMPLES.clear.policy);
 assert.equal(a.dates[0].date,'2026-10-10');assert.equal(a.dates[0].quote,'Delivered: 2026-10-10');
 assert.equal(a.rules[0].days,30);assert.equal(a.rules[0].line,2);assert.equal(a.interpretation.counting,'exclude');assert.equal(a.interpretation.anchor,'2026-10-10');
 assert.equal(a.issues.length,0);assert.equal(isConfirmed(sample()),false);
});
test('conflicting windows do not select a convenient deadline',()=>{
 const a=analyze(SAMPLES.conflict.receipt,SAMPLES.conflict.policy);
 assert.equal(a.rules.length,2);assert.equal(a.interpretation.days,'');assert.equal(a.interpretation.anchor,'');
 assert.ok(a.issues.some(x=>x.includes('Multiple return')));assert.ok(a.issues.some(x=>x.includes('Conditions')));
});
test('refund processing time cannot become the return window',()=>{
 const a=analyze('Delivered: 2026-10-10','Refunds will be processed within 7 calendar days after delivery.');
 assert.equal(a.rules.length,0);assert.equal(a.interpretation.days,'');assert.ok(a.issues.some(x=>x.includes('refund processing')));
 const b=analyze('Delivered: 2026-10-10','Return requests within 30 calendar days of delivery, count from the day after delivery.\nRefund processing takes 7 calendar days.');
 assert.equal(b.rules.length,1);assert.equal(b.rules[0].days,30);assert.equal(b.interpretation.days,30);
});
test('explicit anchor-day exclusion does not invent an item-exclusion warning',()=>{
 const a=analyze('Delivered: 2026-10-10','Return within 30 calendar days of delivery, excluding the delivery day.');
 assert.equal(a.interpretation.counting,'exclude');assert.equal(a.issues.some(x=>x.startsWith('Conditions')),false);
});

test('same-line refund processing does not erase or replace a return rule',()=>{
 for(const separator of ['. ', '; ', ', ']){
  const policy='Return within 30 calendar days of delivery, excluding the delivery day'+separator+'Refunds are processed within 7 calendar days.';
  const a=analyze('Delivered: 2026-10-10',policy);
  assert.equal(a.rules.length,1);assert.equal(a.rules[0].days,30);assert.equal(a.rules[0].quote,policy);
  assert.equal(a.interpretation.counting,'exclude');assert.ok(a.issues.some(x=>x.includes('refund processing')));
 }
});

test('repeated evidence is retained without creating a false date ambiguity',()=>{
 const a=analyze('Delivered: 2026-10-10\nDelivered: 2026-10-10',Array(2).fill('Returns within 30 calendar days of delivery, excluding the delivery day.').join('\n'));
 assert.equal(a.dates.length,2);assert.equal(a.rules.length,2);assert.equal(a.interpretation.anchor,'2026-10-10');assert.equal(a.interpretation.days,30);
});

test('comparison exposes both counting dates without choosing a conflicting rule',()=>{
 const a=analyze(SAMPLES.conflict.receipt,SAMPLES.conflict.policy),rows=compareWindows(a);
 assert.equal(a.interpretation.days,'');
 assert.deepEqual(rows.map(r=>[r.earliest,r.latest]),[['2026-11-08','2026-11-09'],['2026-10-14','2026-10-15']]);
 assert.ok(rows.every(r=>r.canPrefill&&!r.countingKnown));assert.equal(rows[1].rule.quote,a.rules[1].quote);
});

test('comparison cannot invent a date for business-day rules or multiple anchors',()=>{
 const business=compareWindows(analyze('Delivered: 2026-10-10','Return within 14 business days of delivery.'))[0];assert.equal(business.earliest,null);assert.equal(business.canPrefill,false);
 const dates=compareWindows(analyze('Delivered: 2026-10-10\nDelivered: 2026-10-12','Return within 30 calendar days of delivery.'))[0];assert.equal(dates.anchor,'');assert.equal(dates.latest,null);
 const unclear=compareWindows(analyze('Activation: 2026-10-10','Return within 30 calendar days after activation.'))[0];assert.equal(unclear.rule.basis,'other');assert.equal(unclear.canPrefill,false);assert.equal(unclear.latest,null);
});
test('business days, unspecified units and unknown counting all need review',()=>{
 const business=analyze('Delivered: 2026-10-10','Return within 14 business days of delivery.');
 assert.equal(business.interpretation.days,'');assert.ok(business.issues.some(x=>x.includes('Business')));
 const vague=analyze('Delivered: 2026-10-10','Return within 30 days of delivery.');assert.equal(vague.interpretation.days,'');assert.ok(vague.issues.some(x=>x.includes('unit')));
 assert.ok(vague.issues.some(x=>x.includes('counting')));
});
test('unknown anchors, missing rules and ambiguous dates never yield a default date',()=>{
 const a=analyze('Date: 10/11/2026','Return within 30 calendar days.');
 assert.equal(a.interpretation.anchor,'');assert.ok(a.issues.some(x=>x.includes('non-ISO')));assert.ok(a.issues.some(x=>x.includes('anchor is unclear')));
 const b=analyze('Delivered: 2026-02-30','Contact support.');assert.ok(b.issues.some(x=>x.includes('Invalid receipt')));assert.equal(b.rules.length,0);
});
test('policy exceptions and explicit cutoffs stay visible in evidence',()=>{
 const a=analyze('Delivered: 2026-10-10','Return within 30 calendar days of delivery, excluding the delivery day.\nReturn by 2026-10-25.\nUnused items only; restocking fees apply.');
 assert.ok(a.issues.some(x=>x.includes('cutoff')));assert.ok(a.issues.some(x=>x.includes('Conditions')));
});
test('day one phrasing does not silently imply anchor-inclusive counting',()=>{
 const a=analyze('Delivered: 2026-10-10','Return within 30 calendar days of delivery; day 1 is the day after delivery.');
 assert.equal(a.interpretation.counting,'exclude');
 const b=analyze('Delivered: 2026-10-10','Return within 30 calendar days of delivery; delivery is day one, excluding the delivery day.');
 assert.equal(b.interpretation.counting,'');assert.ok(b.issues.some(x=>x.includes('Contradictory')));
});
test('confirmation requires rationale and binds every source and interpretation field',()=>{
 assert.throws(()=>confirmCase({...sample(),interpretation:input({rationale:''})}));
 const c=confirmCase(sample());assert.equal(isConfirmed(c),true);
 for(const key of ['receipt','policy','merchant','item'])assert.equal(isConfirmed({...c,[key]:c[key]+' changed'}),false,key);
 assert.equal(isConfirmed({...c,interpretation:input({days:14})}),false);
 assert.equal(isConfirmed(JSON.parse(JSON.stringify(c))),true);
});
test('unconfirmed and stale evidence cannot produce calendar files',()=>{
 assert.throws(()=>calendar(sample()));const c=confirmCase(sample());assert.throws(()=>calendar({...c,policy:'Changed policy'}));
});
test('ICS uses all-day dates, exclusive end, stable UID and a 3-day alarm',()=>{
 const c=confirmCase(sample()),ics=calendar(c,new Date('2026-10-21T01:02:03Z'));
 assert.ok(ics.includes('DTSTART;VALUE=DATE:20261109\r\n'));assert.ok(ics.includes('DTEND;VALUE=DATE:20261110\r\n'));
 assert.ok(ics.includes('TRIGGER:-P3D'));assert.ok(ics.includes('DTSTAMP:20261021T010203Z'));assert.ok(ics.includes('UID:case-123@returnproof.local'));
 assert.equal(ics.match(/BEGIN:VEVENT/g).length,1);
});
test('ICS escaping and UTF-8 folding prevent text becoming new event lines',()=>{
 const malicious='Item, test; \\ name\nBEGIN:VEVENT';assert.equal(escapeICS(malicious),'Item\\, test\\; \\\\ name\\nBEGIN:VEVENT');
 const line='DESCRIPTION:'+('界🙂'.repeat(60));for(const part of foldLine(line).split('\r\n'))assert.ok(new TextEncoder().encode(part).length<=75);
 assert.equal(foldLine(line).replace(/\r\n /g,''),line);
 const c=confirmCase({...sample(),item:malicious});assert.equal(calendar(c).match(/\r\nBEGIN:VEVENT\r\n/g).length,1);
});
test('exports preserve unresolved flags, raw sources, rationale and checklist',()=>{
 const c=sample(),p=evidencePack(c);assert.match(p.status,/UNRESOLVED/);assert.equal(p.sources.policy,c.policy);assert.equal(p.confirmation,null);
 assert.ok(markdown(c).includes(c.receipt));const confirmed=evidencePack(confirmCase(c));assert.match(confirmed.status,/Human-confirmed/);assert.equal(confirmed.materials.length,5);
});
test('Markdown keeps untrusted HTML and fence escapes inside literal blocks',()=>{
 const c={...sample(),receipt:'```\n<img src="https://example.test/tracker">\n````'};
 const md=markdown(c);assert.ok(md.includes('`````text\n'+c.receipt+'\n`````'));assert.ok(md.includes('```text\n'+c.merchant));
});
test('storage roundtrip validates case shape and rejects malformed data',()=>{
 const c=confirmCase(sample());assert.equal(validCase(c),true);
 assert.deepEqual(loadCases({getItem:()=>JSON.stringify([c])}),[c]);assert.deepEqual(loadCases({getItem:()=>null}),[]);
 for(const data of ['{broken','{}','[null]',JSON.stringify([{...c,receipt:null}]),JSON.stringify([{...c,checklist:[true]}])])assert.throws(()=>loadCases({getItem:()=>data}));
 assert.throws(()=>loadCases({getItem:()=>{throw new Error('Storage denied');}}));
});
