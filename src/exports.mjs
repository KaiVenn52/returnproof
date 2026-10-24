import {analyze,deadline,addDays,isConfirmed,MATERIALS} from './domain.mjs';
export function evidencePack(c) {
  let candidate=null;
  try { candidate=deadline(c.interpretation); } catch {}
  return {product:'ReturnProof',formatVersion:1,exportedAt:new Date().toISOString(),status:isConfirmed(c)?'Human-confirmed interpretation':'UNRESOLVED — not a confirmed deadline',merchant:c.merchant,item:c.item,candidateDeadline:candidate,interpretation:c.interpretation,confirmation:isConfirmed(c)?{at:c.confirmation.at,identity:'Self-reported, not authenticated'}:null,evidence:analyze(c.receipt,c.policy),sources:{receipt:c.receipt,policy:c.policy},materials:MATERIALS.map((label,i)=>({label,checked:c.checklist[i],provenance:'General preparation suggestion; verify merchant requirements'})),notice:'Organizes supplied merchant policy, not legal rights. No merchant acceptance, refund, shipping action or notification is guaranteed. Raw evidence is user supplied and unverified.'};
}
export function markdown(c) {
  const p=evidencePack(c), safe=s=>String(s).replace(/\r/g,'');
  const literal=s=>{const text=safe(s);const runs=text.match(/`+/g)||[];const fence='`'.repeat(Math.max(3,...runs.map(r=>r.length+1)));return fence+'text\n'+text+'\n'+fence;};
  return `# ReturnProof evidence pack\n\nStatus: ${p.status}\nCandidate deadline: ${p.candidateDeadline||'Not calculable'}\n\n## Merchant and item (user supplied)\n${literal(c.merchant+'\n'+c.item)}\n\n## Interpretation\nAnchor: ${c.interpretation.anchor||'Unresolved'} (${c.interpretation.basis})\nWindow: ${c.interpretation.days||'Unresolved'} calendar days\nCounting: ${c.interpretation.counting||'Unresolved'} anchor\n\nRationale:\n${literal(c.interpretation.rationale||'Not supplied')}\n\n## Review flags\n${p.evidence.issues.map(i=>'- '+i).join('\n')||'No narrow-parser flags; human verification is still required.'}\n\n## Preparation checklist\n${p.materials.map(m=>`- [${m.checked?'x':' '}] ${m.label}`).join('\n')}\n\nThese are general suggestions, not extracted merchant requirements.\n\n## Receipt (user-supplied original)\n${literal(c.receipt)}\n\n## Policy (user-supplied original)\n${literal(c.policy)}\n\n## Limits\n${p.notice}\n`;
}
export const escapeICS = text => String(text).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r/g,'');
export function foldLine(text) {
  let lines=[],current='',bytes=0;
  for(const char of text) {
    const n=new TextEncoder().encode(char).length;
    if(bytes+n>75) {lines.push(current);current=' ';bytes=1;}
    current+=char;bytes+=n;
  }
  lines.push(current);return lines.join('\r\n');
}
export function calendar(c, now=new Date()) {
  if(!isConfirmed(c)) throw new Error('Confirm the current interpretation before calendar export.');
  const date=deadline(c.interpretation), dateKey=s=>s.replaceAll('-','');
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ReturnProof//Local Evidence Workspace//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${escapeICS(c.id)}@returnproof.local`,`DTSTAMP:${now.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}`,`DTSTART;VALUE=DATE:${dateKey(date)}`,`DTEND;VALUE=DATE:${dateKey(addDays(date,1))}`,`SUMMARY:${escapeICS('Review return deadline: '+c.item)}`,`DESCRIPTION:${escapeICS(`Human-confirmed interpretation, not merchant approval. ${c.interpretation.days} calendar days from ${c.interpretation.anchor}, ${c.interpretation.counting} anchor. ${c.interpretation.rationale}\nCheck merchant conditions, cutoff time, and whether request, dispatch, or receipt is required. Calendar software controls reminders.`)}`,'BEGIN:VALARM','TRIGGER:-P3D','ACTION:DISPLAY','DESCRIPTION:Review return evidence and merchant instructions','END:VALARM','END:VEVENT','END:VCALENDAR'];
  return lines.map(foldLine).join('\r\n')+'\r\n';
}
