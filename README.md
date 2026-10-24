# ReturnProof

Local consumer return-policy evidence workspace. Paste receipt and policy text, inspect exact source lines, review a candidate return date, and export a preparation checklist, evidence JSON, or a confirmed all-day calendar event.

Save partial source documents with **Save draft** before checking. Reopen the draft to finish; checked files use **Save changes**. On phones, the Documents / Return file navigation stays accessible while scrolling.

See [the October 24 redesign and QA report](submission/REDESIGN_REVIEW.md) for the revised interface, repaired workflows and verification limits.

For submission operations, verified portal requirements, the prepared publication plan and exact remaining entrant actions, see [submission/RELEASE_CHECKLIST.md](submission/RELEASE_CHECKLIST.md). The public-source snapshot uses a GitHub noreply author and preserves the original development history privately.

## Run

For the shortest review path, open [submission/REVIEW.md](submission/REVIEW.md). On Windows, double-click `Start-ReturnProof.cmd` to start the local server.

Requires Node.js 22 or newer. The application has no npm runtime dependencies and no API keys.

```powershell
node server.mjs
# Open http://127.0.0.1:43178
```

```powershell
npm.cmd test
npm.cmd run build
```

`dist/` contains the five static app assets, suitable for a static server. Deployment has not been performed. Start this project's `server.mjs` for local review; it binds to loopback only. To change port, set `PORT` in the process environment. Browser storage is tied to the exact origin, including port.

## Try the complete workflow

1. Press **Try a clear example**, then **Check return window**. These are fictional sources, not real consumer data.
2. Inspect the receipt date and policy quote. Delivery on October 10 plus 30 calendar days, excluding the anchor, gives November 9, 2026. Calendar export remains disabled.
3. Enter a reason for the chosen rule, check the acknowledgment, and confirm. Mark any prepared materials, save, and download the checklist, evidence JSON and calendar.
4. Reload and open the saved case. Edit its policy: confirmation is immediately revoked and the plan must be rebuilt.
5. Try the conflicting example. It deliberately has both 30-day and 14-day windows; no convenient window is silently chosen. A person must enter the applicable interpretation and resolve the flags in their rationale. Flags remain in the evidence pack.
6. Delete a case with the deliberate second confirmation. This removes its browser record, not separately downloaded copies or browser backups.

When policies conflict, compare each rule with its source wording and possible dates. **Review this rule** fills supported fields without confirming them. **Original ↗** selects the referenced line in the supplied document. Unknown first-day counting stays explicit and calendar export remains locked until confirmation.

See [the product review](submission/PRODUCT_REVIEW.md) for repaired friction points, judging-evidence mapping and remaining limits.

## What is supported

- English pasted text, explicit `YYYY-MM-DD` receipt dates, and narrow numeric calendar-day return windows.
- Manual verified anchor, basis, day count and counting convention where parsing is incomplete.
- Calendar arithmetic across months, years and leap days, independent of DST clock changes.
- Exact source excerpts and visible arithmetic, explicit human confirmation, and invalidation after edits.
- Explicit local save, reload, checklist progress, deletion, and visible storage failure handling.
- All-day ICS with exclusive next-day end and a three-day display alarm. Notification delivery belongs to the importing calendar software.

## Limits and data handling

This app organizes merchant policy supplied by the person using it; it does not infer legal rights, verify merchant text, approve a return, or guarantee a refund. The parser is intentionally narrow and is not an LLM. It can miss conditions in arbitrary prose. Review the complete policy, product eligibility, fees, cutoff time, time zone, and whether the action is request, dispatch or receipt. Business days and holidays are not calculated.

Human confirmation is self-reported and not authenticated merchant approval. Candidate dates remain assumptions. A conflict can be overridden only by explicitly entering and confirming an interpretation, with rationale; the app cannot verify that the rationale is correct.

Receipts stay in browser memory until Save, then in unencrypted localStorage. No tracking, uploads, remote API, or automatic notification/message exists. Close without saving loses the draft. New/example/open actions warn before discarding meaningful unsaved changes. Storage is limited to 50 cases. Clearing site data removes saved records. Use a private device and keep exported personal evidence files private.

## Verification and demo assets

- `tests/domain.test.mjs`: date, extraction, confirmation, export and storage trust boundaries.
- `evidence/qa.json`: real Edge/Playwright UI observations, browser version and results.
- `evidence/*.png`: real desktop and phone-size app captures.
- `evidence/sample-*`: files downloaded by the browser from fictional sources.
- `evidence/workflow-review.webm`: local silent QA scratch recording, excluded from the review ZIP; not a hosted submission video.
- `evidence/returnproof-demo.mp4`: paced, actual app demonstration for review (silent, no AI-authored narration). See `demo-recording.json` for capture details. It has not been published.
- `submission/READINESS.md`: actual evidence level and remaining gates.

For optional reproducible browser QA, install Playwright in your own development environment and Edge, or set `PLAYWRIGHT_MODULE` to an existing Playwright module path. `npm run qa` uses the bundled Codex runtime as a machine-specific fallback, runs against port 43178, creates isolated browser contexts, and writes review artifacts. It does not use your normal browser profile. Browser plugin was unavailable in this session; regular Playwright was used. Production has no dependency on these QA tools.

## Build With AI: Basics provenance

New application created for this project from October 18, 2026; no ScopePay or other product code reused. AI coding assistance: Codex. Official Devpost Learn Skill Pack installed project-locally; source hashes are in `skills-lock.json`, upstream curriculum license in `.agents/skills/LICENSE`, and the adapted process is recorded in `devpost/process-log.md`. Read the substantive scope, PRD, spec, checklist and app map under `devpost/`.

Technical implementation is reviewable, but planning approval, learner interview/hands-on review and reflection are not represented as completed. Personal learner context and credentials are ignored by Git. Public publication, registration, video hosting and submission remain pending. This README is technical documentation, not a learner-authored entry description.

## License

Original application: MIT, see `LICENSE`. Official curriculum: upstream MIT, see `THIRD_PARTY.md`.
