# October 24 redesign and product review

The user requested a comprehensive revision because the UI looked generic and AI-generated. This is an implemented agent revision, not a learner interview, usability study or approval of the curriculum planning drafts.

## Design delivered

ReturnProof now looks like a place to prepare and keep a return file: a quiet local-file rail, a flat source column and one paper-like result sheet. Ink, warm neutral surfaces and burnt orange replace the italic-serif/teal paired-card layout. Source labels, line numbers and date arithmetic carry the visual identity. The primary action is “Check return window”. There are no generated images or decorative marketing sections. See [brand.md](../brand.md).

## Findings repaired

| Finding | Delivered behavior |
| --- | --- |
| Generic hero and competing cards | Compact title and asymmetric source/result desk |
| New/example/open could discard a draft silently | Explicit discard prompt; cancel preserves input |
| Checking unchanged sources erased review work | Rationale, materials and confirmation remain intact |
| Edited sources left the previous date prominent | Date is suppressed until rechecked; confirmation/export lock |
| Corrupt browser data could be replaced without a deliberate recovery decision | Explicit replacement confirmation; cancel preserves the original bytes |
| Delete lacked a convenient cancel path | “Keep this case” retains the record |
| Refund-processing duration could become a return window | Processing lines are excluded and flagged |
| “Excluding the delivery day” caused a false item-exclusion warning | Recognized anchor-day language does not create that warning |
| Keyboard and small-screen friction | Focusable result heading, keyboard skip link, shorter counting labels, visible focus and reduced-motion support |

## Verification

- 20 domain/export tests passed; static build produced five application assets.
- 15 full-flow browser checks passed, including downloads, persistence, deletion, conflict handling, untrusted text and storage failures.
- Five acknowledgment regression checks passed.
- 13 redesign/workflow checks passed, including draft preservation, unchanged-source preservation, stale-date suppression and recovery cancellation.
- Edge 155.0.4283.62: 1440×1000, 1280×900, 1024×768, 768×1024, 390×844 and 360×800. No horizontal overflow or off-screen inputs observed.
- Primary button text contrast: 4.90:1. Primary flow targets: at least 44px. Reduced-motion preference checked.
- No observed page errors or outbound app requests in the full-flow run.

Reproduce with `node --test`, `node scripts/build.mjs`, `node scripts/qa.mjs`, `node scripts/confirmation-review.mjs` and `node scripts/redesign-review.mjs` while the local server is running where required. Reports are in `evidence/qa.json`, `confirmation-review.json` and `redesign-review.json`. Browser plugin was unavailable in this session, so regular Playwright with installed Edge was used.

## Visual evidence and delivery

Real screenshots: `evidence/redesign-before-desktop.png`, `redesign-desktop-empty.png`, `redesign-desktop-ready.png`, `redesign-desktop-conflict.png`, `redesign-tablet-ready.png`, `redesign-mobile-ready.png` and `redesign-mobile-plan.png`. Desktop, tablet and phone compositions were visually inspected. The demo is recaptured after committing the application assets; finalization checks all five asset Git blobs, full MP4 decoding, duration and resolution. The review ZIP is then rebuilt and compared byte-for-byte to its recorded Git commit.

## Limits retained

The parser supports narrow English patterns, not arbitrary merchant policies or business-day/holiday calculations. Supplied sources and merchant acceptance remain unverified. Calendar export records a user-confirmed interpretation and cannot establish a merchant cutoff time or guarantee notifications. Browser storage is local and unencrypted. No physical-device, alternate-engine or real merchant outcome test was performed. Axe was unavailable; targeted keyboard, layout, motion and contrast checks do not constitute a full WCAG audit. No learner participation, approval, learning reflection, public publication or submission is claimed.

## Second revision after repeated UI feedback

The second pass reduced the 76px header to 60px, the 218px rail to 184px and the 58px title to 30px. Removed repeated decorative labels, the large empty count, empty-state icon and rail slogan. The original documents and candidate deadline sit higher; the main source action fits the 1440×1000 first viewport. Mobile has sticky document/file navigation with sufficient scroll offset to keep its destination visible. The source-backed result remains the central visual object.

Added Save draft before analysis and Save changes after checking. Partial documents survive save/reload/reopen without inventing a candidate date. A draft can then become a checked file. Clearing every source field of a saved file still warns before leaving. Deletion cannot replace unreadable existing storage without a deliberate recovery confirmation.

Seven additional browser checks pass in `evidence/draft-review.json`; 20 core tests, 15 full-flow checks, five acknowledgment checks and 13 redesign checks also pass for this revision. These checks do not establish learner approval or real merchant accuracy. The updated recording includes draft save/reopen before checking the return window.

Final persistence edge: if sources change after checking, saving stores them as a draft. Reopening cannot revive the previous candidate; a new check must calculate from the changed sources. This path is included in the seven draft checks.
