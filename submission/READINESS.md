# ReturnProof — Readiness

**Final status — October 27, 2026, Malaysia: SUBMITTED.** After explicit entrant confirmation of the current version and final terms, Submit project was activated. Devpost displayed “Project submitted!” and the project page showed “SUBMITTED TO — Build With AI: Basics”. Project: https://devpost.com/software/returnproof . Evidence: `evidence/devpost-submitted.png` and `evidence/publication.json`. Earlier pending/draft descriptions below are historical. This confirms portal submission, not eligibility review, judging or an award.


Current draft update: CAPTCHA completed with explicit consent; ReturnProof draft 1265915 now shows 4/5 steps done. Name, pitch, factual agent-assisted story, source/video links, four actual screenshots and entrant-confirmed additional answers have been saved. At the entrant's explicit instruction, the agent authored factual copy; no full guided-learning participation is claimed. The final terms checkbox and Submit project action remain untouched pending final confirmation. Review: https://devpost.com/software/returnproof . Earlier pending-field/CAPTCHA states below are historical.


## Current portal state — October 27, Malaysia

Registration completed after the entrant explicitly confirmed eligibility and agreement acceptance. Devpost displayed “Thanks for registering!”. The reviewed 88.44-second video is publicly published at https://youtu.be/GPr-uN0jM00 on Kang Ming Wong; YouTube reported no copyright issues. An unauthenticated YouTube oEmbed request returned the expected video title and channel. Public source remains https://github.com/KaiVenn52/returnproof.

Creating the project triggered a reCAPTCHA image challenge; action-time confirmation to complete that challenge is pending. The project-entry fields remain uninspected. No final submission has occurred. Any pending registration or publication statements below describe earlier preparation stages and are superseded by this update.


Updated October 24, 2026, Asia/Kuala_Lumpur. **Local implementation verified; not yet ready to claim an accepted or complete hackathon submission.**

October 24 comprehensive redesign and review: [REDESIGN_REVIEW.md](REDESIGN_REVIEW.md). Current evidence: 24 core tests, 15 full-flow UI checks, 5 acknowledgment regressions and 13 design/workflow checks. The second pass adds 7 draft/navigation/recovery checks, a more compact workspace and pre-analysis draft saving. Six widths inspected; primary-button contrast 4.90:1. Fixed unsaved-data loss paths, unchanged-source reset, stale-date display, recovery replacement and two extraction edge cases. See `brand.md` and `evidence/redesign-review.json`. These are agent checks, not learner feedback or a full accessibility certification.

October 22 delegated agent review completed: [AGENT_REVIEW.md](AGENT_REVIEW.md). Corrected acknowledgment/confirmation consistency and verified five targeted browser checks plus build. `evidence/confirmation-review.json` is the evidence. This does not record learner hands-on participation or reflection. October 24: replaced the earlier demo with real redesigned UI footage, recording all five application asset Git blobs and checking full MP4 decoding. `evidence/demo-recording.json` contains exact media properties and source identity.

Shortest learner review entry: [REVIEW.md](REVIEW.md). The current local entry is `http://127.0.0.1:43178`, with `Start-ReturnProof.cmd` for Windows. The default moved from 4178 to avoid sharing an origin with other projects. No unknown process was stopped; no saved cases from the old origin were copied or removed. `evidence/entry-check.json` records the targeted post-change smoke. The October 24 redesign supersedes the earlier core and browser checks; the full flow was rerun for this substantive revision.

`returnproof-review.manifest.json` beside the ZIP records the final Git commit, archive SHA-256 and byte-for-byte comparison of every archived file against that commit. The ZIP/hash/manifest are generated sidecars, not self-referential tracked source. Run `node scripts/verify-package.mjs` after creating the ZIP and SHA-256 file to repeat the comparison.

Rebuild the archive with `git -c core.autocrlf=false archive --format=zip --output=returnproof-review.zip HEAD`, then regenerate the SHA-256 sidecar. The per-command setting avoids a machine's automatic line-ending conversion changing archive bytes; it does not alter global Git configuration. The verifier intentionally rejects an archive whose text bytes were converted, even when the visible text looks the same.

## Evidence that exists

| Area | Evidence | Result |
| --- | --- | --- |
| New isolated project | Dedicated directory and `codex/returnproof` local Git branch | Application created for this event; no other product code reused |
| Official curriculum | Six installed project-local skills, `skills-lock.json`, upstream MIT license, `devpost/process-log.md` | Actually inspected and applied to planning/build; human stages are honestly unfinished |
| Planning | Substantive `devpost/scope.md`, `prd.md`, `spec.md` saved before implementation | Drafts; direct autonomous execution authorization is distinct from learner planning approval |
| Core logic | `npm test` on final domain/export code | 24/24 passed |
| Static build | `npm run build` | 5 assets built successfully in `dist/` |
| Desktop | Real Edge 155.0.4283.62, Playwright, 1440×1000 | App loads, exact dates/quotes, confirm/export and persistence/deletion tested |
| Mobile | Same browser engine, 390×844 viewport | No horizontal overflow; calendar control usable |
| Trust boundaries | `evidence/qa.json`, 15 passing browser checks | Source edits revoke confirmation; conflict unresolved; corrupt/full storage and HTML input handled |
| Browser downloads | `evidence/sample-checklist.md`, `sample-evidence.json`, `sample-deadline.ics` | Real files downloaded through UI from labelled fictional data |
| Runtime health | Final QA logs and request observations | No observed page/console errors; no outbound app requests |
| Visual QA | Desktop and mobile PNGs, inspected by agent | Coherent responsive layout; no observed clipping or overlap |
| Code map | `devpost/app-map.html` | Browser opened successfully, correct title and three content sections |
| Local recordings | `evidence/workflow-review.webm`; paced `returnproof-demo.mp4` documented in `evidence/demo-recording.json` | Real app footage, silent; public hosting not performed |

Browser plugin was not listed in this session, so the frontend verification skill's regular Playwright path was used. These checks are agent observations, not user feedback or a production accuracy benchmark. A phone-size viewport is not a physical-device test. No runtime model/provider call, live merchant integration, OCR, notification delivery, or refund evidence exists or is needed for this local design.

## Submission release preparation — October 24

[RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) is the current release desk. [FORM_REVIEW.md](FORM_REVIEW.md) records the actual registration prompts. The signed-in account is not registered for this event; no fields or agreements were entered. A clean extraction passes 24 core tests, static build and the core browser journey without dependency installation. Content/history preflight reports no flagged credential signatures or private file names. Original commit metadata contains a personal email, so the prepared public-source snapshot uses a verified GitHub noreply author and leaves original history local. QA scripts now resolve the browser runtime from the environment/home directory instead of a named local account. See the two new evidence JSON reports. Public repository and video publication still require authorization; no remote has been created.

## Product differentiation revision — October 24

[PRODUCT_REVIEW.md](PRODUCT_REVIEW.md) records the current product assessment. Added explicit competing-rule/date comparison, exact original-line selection and safe review-field shortcuts; source changes disable stale shortcuts. Seven new browser checks and four new core tests cover these behaviors and the mixed refund/return-line and duplicate-evidence fixes. The recording is refreshed from the new source before release. This does not establish user research, a predicted award result or learner curriculum completion.

## Publication update — October 26

The public source repository is now [KaiVenn52/returnproof](https://github.com/KaiVenn52/returnproof), with MIT license and default branch `codex/returnproof`. The reviewed snapshot was pushed after explicit authorization; README, LICENSE, four planning documents and app source returned HTTP 200 without authentication. See `evidence/publication.json`. The previous October 24 preparation paragraph above records an earlier state. Video publication is authorized but paused at the upload dialog’s terms/community-guidelines agreement pending explicit acceptance. Entrant-supplied registration answers are filled; eligibility/rules acceptance and Register are still pending.

## Exact remaining gates

1. **Learner review and curriculum participation.** Review the actual scope/PRD/spec, try the app, provide product feedback, and complete one short code/evidence walkthrough. No interviews, planning approvals, hands-on review or personal learning reflections have been fabricated. Resolve the adapted workflow before representing the guided curriculum as fully completed. Only real learner approval should change planning status to approved.
2. **Personal eligibility and registration.** Entrant checks adulthood, location, affiliations, conflicts, ownership/team details, and accepts terms/registration personally or with explicit authorization. Not performed.
3. **Human-authored submission fields and survey.** `HUMAN_FIELDS.md` contains prompts, not completed entry copy. The official `6-ship` skill requires learner authorship. Registration fields were inspected; exact project-entry fields remain inaccessible until registration.
4. **Public source repository — completed.** The authorized clean snapshot is public and anonymously verified. Original development history and ignored learner profile remain excluded.
5. **Public demo link.** Local silent real-UI footage is available for review. The reviewed 88.44-second recording and public upload have been authorized. Explicit acceptance of the upload dialog’s agreement is pending. Verify anonymous access. Local files and GitHub attachments are not qualifying hosted-video URLs.
6. **Final Devpost submission.** Fill actual form, verify links and submit only with explicit confirmation. No accepted submission is claimed.

## Rules snapshot

Official pages rechecked October 24. Deadline: **October 27, 2026, 05:00 Malaysia** (October 26, 17:00 EDT). Event is online. New project, official Skill Pack/planning docs, public open-source repository and publicly visible YouTube/Vimeo app demo are required; video should be under three minutes. Deployment is optional. See `RULES.md` for sources and the distinction between successful direct capture and later 403 responses.

## Known product limits

English narrow-pattern extraction can miss arbitrary prose conditions. Human confirmation is a documented assumption, not merchant approval or legal determination. Business-day and holiday math is unsupported. Sources are user-supplied and unverified. All-day ICS does not establish the merchant's cutoff time or guarantee calendar notifications. Partial sources can be saved as drafts before analysis. Storage is unencrypted and local to origin; New/example/open actions warn before discarding meaningful unsaved changes. Deletion cannot remove already downloaded or backed-up copies. Cross-browser calendar import, actual mobile hardware and real merchant policy outcomes remain untested.

## Local review

```powershell
Set-Location '<path-to-returnproof>'
node server.mjs
# http://127.0.0.1:43178
```

Try clear example → build → inspect evidence and arithmetic → explain and confirm interpretation → save/download → reload/reopen → edit policy and observe lock. Then try conflict example. These are the exact actions worth reviewing before public release.
