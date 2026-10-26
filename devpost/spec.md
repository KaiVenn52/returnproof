---
doc: spec
status: draft
execution: authorized-autonomous-build
---
# ReturnProof — Technical Spec
## How This Works, In Plain Language
The browser looks for a few explicitly supported phrases in pasted text. It keeps the original lines beside its findings. A person chooses the actual rule and date before a calendar file can be made. Saving writes only to this browser; downloading a pack creates a file on the person's device. No receipt leaves the browser.

## The Core Journey Through the System
Implements `prd.md > The Core Journey`: form input → pure evidence extraction → review form → pure calendar-day arithmetic → confirmation bound to serialized case → checklist and file exports → local case storage. Source edits immediately revoke confirmation.

## Stack
Agent implementation choice under autonomous authorization: native ES modules and CSS, with Node >=22 for serving, building, and tests. No install required for the app. This small single-screen tool does not need a framework or runtime model. Docs: [Node](https://nodejs.org/api/), [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), [iCalendar RFC 5545](https://www.rfc-editor.org/rfc/rfc5545).

## Where It Runs and How Someone Tries It
`npm run dev` or `node server.mjs`, then `http://127.0.0.1:43178`. `npm test` exercises pure domain logic; `npm run build` writes a deployable `dist/`. No API keys or environment variables. Public deployment is optional and not performed. Public repository and a publicly visible YouTube/Vimeo demo under three minutes remain required submission deliverables.

## Look and Feel
Implements the October 24 revision of `prd.md > Look and Feel`: desk #f6f5f0, file paper #fffefa, ink #262721, muted #68685f, burnt orange #c6441c, review tint #f9ebe3. Segoe UI/Arial for legible controls and headings, Cascadia Code/Consolas for source references and arithmetic. Desktop 218px rail plus asymmetric source/result columns, one content column below 1000px, compact file strip on phones. Native labelled forms, explicit focus and keyboard result focus, reduced-motion support, status live region, no external assets. Design tokens and constraints: `../brand.md`.

## Components
### Evidence Engine — `src/domain.mjs`
Implements `prd.md > Evidence Review`, `Human Interpretation`: strict date parsing, line-based candidates, narrow rules, issue flags, interpretation validation, arithmetic, confirmation signature. Date calculations use UTC day ordinals only as calendar arithmetic; they never convert a local deadline time.
### Workspace — `src/app.mjs`
Implements `prd.md > Source Capture`, `Human Interpretation`, `Local Case Library`: event handlers, escaped DOM rendering, in-memory draft, explicit save/delete, source-edit invalidation, localStorage errors.
### Exporters — `src/exports.mjs`
Implements `prd.md > Evidence Pack and Calendar`: plain Markdown and JSON contain raw sources, excerpts, issues, assumptions, and checklist. ICS is unavailable without matching confirmation; text escapes and UTF-8 75-octet line folding protect file structure.
### Local Server and Build — `server.mjs`, `scripts/build.mjs`
Serves allowlisted app assets on loopback, rejects other methods and unknown paths, sets CSP and no-sniff. Build copies only app assets and validates module syntax. No backend consumer-data API.

## Data Model
Case: version, id, merchant, item, receipt, policy, interpretation {anchor, basis, days, counting, rationale}, confirmation {signature, at}, checklist. Evidence is derived from sources, never trusted from storage. Stored data validated structurally on load; unsafe or corrupt records rejected. Save failures preserve memory. Deleting removes one record and clears its open state. Browser storage is not encrypted or synced; OS/browser backups may retain copies.

## File Structure
```
index.html              # semantic app shell
src/app.mjs             # UI, review and persistence
src/domain.mjs          # extraction, dates and confirmation
src/exports.mjs         # evidence and iCalendar
src/styles.css          # responsive document workspace
server.mjs              # loopback static server
scripts/build.mjs       # reproducible dependency-free build
scripts/qa.mjs          # browser workflow QA and recording
tests/domain.test.mjs   # meaningful edge and trust-boundary tests
devpost/                # official skill-derived plans and app map
submission/             # factual readiness and human-author field prompts
evidence/               # verification evidence and real app recording
```

## External Services and Dependencies
No runtime services, credentials, paid calls, or receipt upload. Official skills are development curriculum, installed project-locally. Browser QA uses the already bundled Playwright runtime; no browser dependency is added to production.

## Important Failure Modes
- Unsupported language → exact source retained, review warning; no automatic claim of comprehension.
- Incomplete/invalid interpretation → no confirmation or calendar.
- Changed evidence → old confirmation invalid, even after reload.
- Storage blocked/full → visible warning and evidence download still available.

## What Was Simplified and Why
Text paste replaces OCR; explicit human interpretation replaces broad NLP; calendar download replaces notification service. Each still proves a usable evidence workflow without pretending live AI/provider functionality.

## Decisions and Open Issues
No learner uncertainty was reported; do not invent one. Agent investigation: inclusive versus exclusive anchor counting and leap-day arithmetic must be demonstrated by tests. Plans remain drafts for learner review; implementation proceeds under direct autonomy instruction. Formal guided interviews and hands-on feedback are outstanding.

October 24 second revision: compact workspace header/file rail and restrained title; draft saving is available before analysis. Draft reopen does not produce a date until the source check. Checked files expose Save changes. On phones, sticky Documents / Return file navigation leaves its destination visible. Clearing saved sources and deleting with unreadable existing storage retain explicit decision gates.

October 24 product revision: compare competing source rules and both possible first-day dates without selecting a default; explicitly copy supported values into review; jump to the exact original source line. Source edits disable stale shortcuts. Clause-level refund filtering preserves the real return rule in mixed lines; duplicate semantic evidence does not invent a date conflict. Draft/confirmation gates remain unchanged.

## Sharing instructions — October 26

Public source: https://github.com/KaiVenn52/returnproof (default branch `codex/returnproof`, MIT). The entrant authorized publication of a separate clean source snapshot; original development history remains local. Anonymous reads of README, license, planning and app source were verified. Public YouTube/Vimeo URL remains pending agreement acceptance and upload. Final Devpost submission has not occurred. See `../evidence/publication.json` and `../submission/RELEASE_CHECKLIST.md`.

October 27 sharing update (Malaysia): reviewed video publicly published at https://youtu.be/GPr-uN0jM00; anonymous YouTube oEmbed returned the expected title and channel. Event registration is confirmed. Project creation is awaiting action-time consent for a reCAPTCHA challenge; final entry is not submitted.
