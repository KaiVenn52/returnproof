---
doc: checklist
status: draft
execution: authorized-autonomous-build
---
# Build Checklist

Build mode: fast autonomous implementation, explicitly authorized by user. Human feedback and formal planning approval are pending; this is an adaptation, not a claim of completed guided learning.

## Slices

- [x] **1. Trace a receipt and policy through review, exports and a saved return case**
  Becomes usable: Paste sources, inspect candidates, confirm interpretation, download evidence/calendar, save/reload and delete locally.
  Why now: The evidence-to-date kernel must work end to end; a small native app keeps this one coherent slice.
  PRD ref: `prd.md > The Core Journey`, `Evidence Review`, `Human Interpretation`, `Evidence Pack and Calendar`, `Local Case Library`
  Spec ref: `spec.md > Evidence Engine`, `Workspace`, `Exporters`, `Local Server and Build`
  Build: Implement source extraction, date arithmetic, confirmation invalidation, responsive workspace, real downloads, storage lifecycle and meaningful failure states.
  Verify (mechanical): `npm test`, `npm run build`, `npm run qa`; inspect desktop/mobile screenshots and exported files. Results are in `evidence/qa.json` and `submission/READINESS.md`.
  Learner check: Open the local app, try both examples, inspect source quotes, compare inclusive/exclusive counting, save/reload and delete a case. Report anything confusing or incorrect.
  Commit: `Build traceable return review and local evidence workflow`

## Hands-on Checkpoints
- [ ] Early usable behavior explored by learner — agent browser checks do not substitute for feedback.
- [ ] Final kick-the-tires exploration and feedback completed by learner.

## Final Review
- [ ] Final review complete — learner feedback resolved and learner confirms ready to ship.

## Code Tour and App Map
- [ ] Learning activity completed by learner.
- [ ] Optional edit and transfer reflection addressed with learner.
- [x] `devpost/app-map.html` generated from finished code and mechanically checked.

Activity and evidence: Agent-prepared code route and test evidence; no claim of learner practice.
Route and stops: `src/app.mjs` source-form handler → `src/domain.mjs` analyze/deadline/confirmCase → `src/exports.mjs` calendar. Compare the inclusive/exclusive test with the date shown in the app.
Edit outcome: Not performed by learner.
Reflection: Not supplied; no answer generated.
Activity mode: Prepared technical walkthrough; learner session pending.

## Revisions

- October 23: refreshed the actual UI demonstration after the acknowledgment correction. Capture asserts the saved/reopened checkbox, withdrawal lock and explicit reconfirmation; metadata binds the recording to the application's Git blob. Video finalization checks codec, resolution, duration and complete decoding. No additional learner participation is claimed.

- User delegated remaining agent review on October 22. Fixed acknowledgment checkbox synchronization after Save/reopen and immediate revocation on uncheck; build and five targeted browser checks passed. Agent review is recorded separately from unperformed learner review, with no fabricated interview, approval or reflection.
- No runtime framework or model dependency — the narrow parser and native screen prove the requested loop with no credentials; no AI extraction claim is made.
- Default npm cache ran out of space — project-local cache/TEMP retry successfully installed the official skill bundle.
- Markdown exports fence untrusted sources and rationale — pasted HTML must remain literal evidence when a Markdown viewer opens the file.
- ISO anchor entry uses an explicit text format — native date controls inherited a non-English system-language placeholder, discovered in video-frame QA. Browser QA and build were rerun after the correction.
- A disk-full write interrupted the date-field edit — restored the known committed application source, reapplied only the intended field change, inspected the diff, then passed build/browser checks. No unrelated source was restored or changed.
- Default local review port moved from 4178 to 43178 to avoid another project's origin. Updated launch/docs/QA/recording entry points, added a short learner review packet and package verifier; targeted entry smoke passed without rerunning the completed full suite. Existing recording remains accurate for the unchanged product flow.

- October 24: implemented the user's explicit request to remove generic AI-looking UI and inspect the product comprehensively. New brand/layout, draft safeguards, stale-date suppression, storage-recovery decision and extraction fixes are verified by 20 core tests, 15 full-flow checks, 5 acknowledgment checks and 13 redesign checks across six widths. Agent implementation is distinct from learner planning approval or reflection. See submission/REDESIGN_REVIEW.md.

- October 24 second UI revision: reduced header/title/rail and redundant labels; added pre-analysis draft save/reopen and mobile sticky document/file navigation. Seven additional checks verify partial persistence, transition to analysis, clear-all draft protection, scroll destination and explicit corrupt-storage deletion recovery. No learner approval is inferred.
