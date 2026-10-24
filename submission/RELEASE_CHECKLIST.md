# ReturnProof — submission release desk

Updated October 24, 2026. **Technical deliverables prepared; registration, public links and entrant-authored fields remain open.** This is operational documentation, not a project pitch or a completed entry.

## Verified technical materials

| Deliverable | Current evidence |
| --- | --- |
| Running end-to-end app | Receipt + policy → exact evidence → interpreted date → confirmation → calendar/checklist/evidence downloads → persistence/deletion |
| Source and licenses | Five app assets, Node local server, MIT application license, upstream curriculum MIT license and third-party inventory |
| Planning | Substantive scope/PRD/spec/checklist/app map; learner review status remains honestly draft |
| Product QA | 24 core tests, 15 full browser-flow checks, five acknowledgment checks, 13 redesign checks, seven draft/recovery/navigation checks and seven direct evidence-interaction checks |
| Fresh source verification | `evidence/clean-checkout-review.json`; extracted archive runs tests/build and real browser download without npm install |
| Real UI video | `evidence/returnproof-demo.mp4`; current duration in demo-recording.json, 1440×1000 H.264, full decode and all five app Git blobs verified |
| Gallery images | `evidence/redesign-desktop-ready.png`, `evidence/redesign-mobile-plan.png`, `evidence/comparison-desktop.png`, `evidence/comparison-mobile.png`; real app captures with fictional data |
| History/content scan | `evidence/release-preflight.json`; high-confidence credential patterns and private filenames scanned; no flagged content; not a guarantee against every possible secret |
| Publishable snapshot | `node scripts/prepare-publication.mjs`; separate one-commit snapshot, matching source blobs, GitHub noreply author, original development history retained locally |
| Submission assets ZIP | `returnproof-submission-assets.zip`; video, four real screenshots, product review and operational worksheets, generated from the final committed source |
| Review source ZIP | `returnproof-review.zip`, SHA-256 and manifest; every file compared with its committed blob |

## Concrete publication plan — authorization pending

- Target: a new public `KaiVenn52/returnproof` GitHub repository, branch `codex/returnproof`. Authenticated login verified; no existing repository resolved at this name during inspection. Recheck before creation.
- Publish the prepared source snapshot from `returnproof-publication.manifest.json`, with the GitHub noreply author. Do not push the original local development history: its commit metadata contains a personal email.
- Code, technical documents, licensed curriculum, fictional examples, screenshots and video in the snapshot become publicly readable. The ignored learner profile, credentials, raw browser recordings and original `.git` history are excluded.
- After authorization, create/push the snapshot; verify repository visibility and anonymous access to README, app source, planning files and LICENSE. Record the resulting URL; do not label the planned URL as live.
- Upload the reviewed `evidence/returnproof-demo.mp4` to the entrant's selected YouTube/Vimeo account only after authorization. Set public visibility and verify logged-out access. Local MP4, GitHub-hosted MP4 and the assets ZIP do not replace this required video URL.
- App deployment is optional and is not an unresolved technical prerequisite.

## Entrant actions and final portal checks

1. Provide truthful registration answers shown in [FORM_REVIEW.md](FORM_REVIEW.md), and review eligibility/rules/terms personally. The account is signed in but not registered for this event.
2. Review the actual planning docs and app, including the code walkthrough, before marking learner activities or planning approvals complete. Report only participation that occurred.
3. Write the project name, description, actual entry answers and exit-survey responses. The official `6-ship` workflow keeps these learner-authored. [HUMAN_FIELDS.md](HUMAN_FIELDS.md) is a prompt sheet, not ready-to-paste entry copy.
4. Once registration opens the actual entry form, inspect its exact required fields, media constraints and survey prompts. Record them in FORM_REVIEW.md, then enter only supplied/approved content.
5. Verify public source and YouTube/Vimeo URLs anonymously. Review the final portal summary, then obtain final submission confirmation. Saving a draft is not accepted submission; preserve the final success page/status as evidence.

Official [overview](https://learn-ai-basics.devpost.com/) and [rules](https://learn-ai-basics.devpost.com/rules) were rechecked October 24. Deadline: October 26, 2026, 17:00 EDT = October 27, 2026, 05:00 Malaysia. The rules permit GitHub, GitLab or Bitbucket; this prepared plan uses the already authenticated GitHub account. Video must be publicly visible on YouTube or Vimeo and should be below three minutes. All submission materials must be English or include English translations.
