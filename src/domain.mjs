export const VERSION = 1;
export const MATERIALS = ['Proof of purchase', 'Photos of the item and its condition', 'Original packaging and included accessories', 'Merchant return instructions / authorization', 'Shipping receipt and tracking after dispatch'];
const DAY = 86400000;
export function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const [y,m,d] = value.split('-').map(Number);
  if (y < 1900 || y > 2200) return null;
  const n = Date.UTC(y,m-1,d), date = new Date(n);
  return date.getUTCFullYear() === y && date.getUTCMonth() === m-1 && date.getUTCDate() === d ? n : null;
}
export function addDays(date, days) {
  const n = parseDate(date);
  if (n === null || !Number.isInteger(days) || Math.abs(days) > 3660) throw new Error('Invalid calendar date or day count.');
  const result = new Date(n + days * DAY).toISOString().slice(0,10);
  if (parseDate(result) === null) throw new Error('Date outside supported range (1900–2200).');
  return result;
}
export function deadline(input) {
  if (!input || parseDate(input.anchor) === null) throw new Error('Enter a valid ISO anchor date.');
  if (!Number.isInteger(input.days) || input.days < 1 || input.days > 365) throw new Error('Enter a whole calendar-day window from 1 to 365.');
  if (!['purchase','delivery','other'].includes(input.basis)) throw new Error('Select the anchor basis.');
  if (!['exclude','include'].includes(input.counting)) throw new Error('Choose whether the anchor counts as day one.');
  return addDays(input.anchor, input.days - (input.counting === 'include' ? 1 : 0));
}
export function remaining(date, today) {
  if (parseDate(date) === null || parseDate(today) === null) return null;
  return Math.round((parseDate(date)-parseDate(today))/DAY);
}
export function analyze(receipt, policy) {
  const dates = [], rules = [], issues = [];
  for (const [index,line] of receipt.split(/\r?\n/).entries()) {
    for (const m of line.matchAll(/\b(\d{4}-\d{2}-\d{2})\b/g)) {
      const basis = /deliver(?:ed|y)|received/i.test(line) ? 'delivery' : /purchas|order(?:ed)?\s*(?:date|on|:)/i.test(line) ? 'purchase' : 'other';
      if (parseDate(m[1]) !== null) dates.push({date:m[1],basis,quote:line.trim(),line:index+1,source:'Receipt'});
      else issues.push(`Invalid receipt date on line ${index+1}: ${m[1]}.`);
    }
  }
  for (const [index,line] of policy.split(/\r?\n/).entries()) {
   for (const clause of line.split(/(?<=[.;!?])\s+(?=(?:refunds?|returns?|exchanges?|open[- ]box)\b)|,\s*(?=refunds?\b)/i)) {
    if (/\b(?:refunds?\s+(?:(?:are|will be)\s+)?(?:issued|processed)|refunds?\s+(?:(?:may|can)\s+)?takes?|refund processing|processing\s+(?:(?:a|your|the)\s+)?refund)\b/i.test(clause)) {
      issues.push(`Policy line ${index+1} describes refund processing, not a return window. Check it separately.`);
      continue;
    }
    for (const m of clause.matchAll(/\b(\d{1,3})\s*(calendar\s+|business\s+|working\s+)?days?\b/gi)) {
      if (!/return|refund|exchange|send|ship|request/i.test(clause)) continue;
      const unit = /business|working/i.test(m[2]||'') ? 'business' : m[2] ? 'calendar' : 'unspecified';
      const basis = /deliver|recei(?:pt|ve)/i.test(clause) ? 'delivery' : /purchas|order date/i.test(clause) ? 'purchase' : 'other';
      const includesAnchor = /including (?:the )?(?:delivery|purchase|anchor) (?:date|day)|(?:delivery|purchase|anchor)(?: (?:date|day))? is day (?:one|1)\b/i.test(clause);
      const excludesAnchor = /day after|excluding (?:the )?(?:delivery|purchase|anchor) (?:date|day)/i.test(clause);
      const counting = includesAnchor === excludesAnchor ? '' : includesAnchor ? 'include' : 'exclude';
      if(includesAnchor && excludesAnchor) issues.push('Contradictory anchor-day conventions in a policy line. Verify counting manually.');
      rules.push({days:Number(m[1]),unit,basis,counting,quote:line.trim(),line:index+1,source:'Policy'});
    }
   }
  }
  if (!dates.length) issues.push('No supported ISO receipt date found. Enter the verified anchor date manually.');
  if (!rules.length) issues.push('No supported return window found. Read the policy and enter the applicable rule manually.');
  if (new Set(rules.map(r=>`${r.days}:${r.unit}:${r.basis}:${r.counting}`)).size > 1) issues.push('Multiple return windows or counting rules found. Resolve the applicable rule before confirming.');
  if (rules.some(r=>r.unit==='business')) issues.push('Business/working-day rules are unsupported. Obtain a verified calendar-day interpretation; holidays are not calculated.');
  if (rules.some(r=>r.unit==='unspecified')) issues.push('The policy does not explicitly say calendar days. Verify the unit.');
  if (rules.some(r=>r.basis==='other')) issues.push('The policy anchor is unclear. Verify whether the window starts at purchase, delivery, or another event.');
  if (rules.some(r=>!r.counting)) issues.push('The policy does not explicitly define anchor-day counting. Confirm the convention.');
  if (new Set(dates.map(d=>d.date+':'+d.basis)).size>1) issues.push('Multiple receipt dates found. Match the date to the applicable policy anchor.');
  if (/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/.test(receipt+'\n'+policy)) issues.push('A non-ISO numeric date is ambiguous. Verify its day/month order manually.');
  const conditionText=policy.replace(/excluding (?:the )?(?:delivery|purchase|anchor) (?:date|day)/gi,'');
  if (/final sale|non[- ]returnable|no returns|not eligible|except|exclud|holiday|extended|unopened|unused|restocking/i.test(conditionText)) issues.push('Conditions, exclusions, fees, or special periods detected. Check applicability in the full policy.');
  if (/\buntil\b|\bby\s+\d{4}-\d{2}-\d{2}/i.test(policy)) issues.push('An explicit cutoff may override a day window. Verify the full policy manually.');
  const uniqueRules=[...new Map(rules.map(r=>[JSON.stringify([r.days,r.unit,r.basis,r.counting]),r])).values()];
  const first = uniqueRules.length===1 && uniqueRules[0].unit==='calendar' ? uniqueRules[0] : null;
  const matching = first ? [...new Map(dates.filter(d=>d.basis===first.basis).map(d=>[d.date,d])).values()] : [];
  const interpretation = {anchor:matching.length===1?matching[0].date:'',basis:first?.basis||'delivery',days:first?.days||'',counting:first?.counting||'',rationale:''};
  return {dates,rules,issues:[...new Set(issues)],interpretation};
}
export function compareWindows(findings) {
 return findings.rules.map((rule,index)=>{
  const anchors=[...new Set(findings.dates.filter(d=>d.basis===rule.basis).map(d=>d.date))];
  const anchor=anchors.length===1?anchors[0]:'';
  const supported=rule.unit==='calendar'&&['purchase','delivery'].includes(rule.basis)&&anchor&&Number.isInteger(rule.days)&&rule.days>=1&&rule.days<=365;
  let earliest=null,latest=null;
  if(supported)try{
   earliest=deadline({anchor,basis:rule.basis,days:rule.days,counting:rule.counting||'include'});
   latest=deadline({anchor,basis:rule.basis,days:rule.days,counting:rule.counting||'exclude'});
  }catch{/* Unsupported date range stays unresolved. */}
  return {index,rule,anchor,earliest,latest,countingKnown:Boolean(rule.counting),canPrefill:Boolean(earliest&&latest)};
 });
}
export function signature(c) {
  return JSON.stringify([c.merchant,c.item,c.receipt,c.policy,c.interpretation]);
}
export function isConfirmed(c) {
  try { deadline(c.interpretation); } catch { return false; }
  return c.confirmation?.signature === signature(c) && typeof c.confirmation?.at==='string' && c.interpretation.rationale.trim().length >= 12;
}
export function confirmCase(c, at=new Date().toISOString()) {
  deadline(c.interpretation);
  if (c.interpretation.rationale.trim().length < 12) throw new Error('Explain the rule and any resolved uncertainty (at least 12 characters).');
  return {...c,confirmation:{signature:signature(c),at}};
}
export function validCase(c) {
  return c && c.version===VERSION && typeof c.id==='string' && c.id.length<=100 && ['merchant','item','receipt','policy'].every(k=>typeof c[k]==='string' && c[k].length<=20000) && c.interpretation && ['anchor','basis','counting','rationale'].every(k=>typeof c.interpretation[k]==='string') && (typeof c.interpretation.days==='number'||c.interpretation.days==='') && c.interpretation.rationale.length<=20000 && Array.isArray(c.checklist) && c.checklist.length===MATERIALS.length && c.checklist.every(v=>typeof v==='boolean');
}
export function loadCases(storage) {
  const raw = storage.getItem('returnproof.v1');
  if (!raw) return [];
  const cases = JSON.parse(raw);
  if (!Array.isArray(cases) || cases.length>50 || !cases.every(validCase)) throw new Error('Saved data is invalid. Export any open work before clearing this site’s storage.');
  return cases;
}
export const SAMPLES = {
  clear:{merchant:'Northline Supply · fictional',item:'Everyday headphones',receipt:'FICTIONAL DEMO RECEIPT — NOT A REAL PURCHASE\nOrder: NL-1048\nItem: Everyday headphones\nDelivered: 2026-10-10',policy:'FICTIONAL DEMO POLICY — NOT A REAL MERCHANT\nReturn requests must be made within 30 calendar days of delivery. Count from the day after delivery.\nKeep your proof of purchase and original packaging. Contact the merchant for return authorization before shipping.'},
  conflict:{merchant:'Northline Supply · fictional',item:'Open-box desk lamp',receipt:'FICTIONAL DEMO RECEIPT — NOT A REAL PURCHASE\nOrdered on: 2026-10-01\nDelivered: 2026-10-10\nItem: Open-box desk lamp',policy:'FICTIONAL DEMO POLICY — NOT A REAL MERCHANT\nReturns are accepted within 30 calendar days of delivery.\nOpen-box items: return requests within 14 calendar days of purchase.\nFinal sale items are non-returnable. Original packaging required.'}
};
