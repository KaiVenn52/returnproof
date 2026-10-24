# Demo recording mechanics

Technical review assets use fictional receipts only. `evidence/workflow-review.webm` is a quick silent QA recording. `evidence/returnproof-demo.mp4` is a paced actual-browser demonstration for local review, with no AI-authored narration. It has no public URL. Its final capture/probe metadata is in `evidence/demo-recording.json`; decoded frames and full media decoding are checked before delivery.

The current October 24 evidence-first capture shows the redesigned return-file desk and includes draft save/reopen, acknowledgment synchronization, withdrawal and explicit reconfirmation. Reproduce with `node scripts/record-demo.mjs` while the local app is running, then `node scripts/finalize-demo.mjs`. Finalization rejects mismatched Git blobs for all five application assets and checks duration below three minutes, H.264 at 1440×1000 and full-file decoding. A new app-code change requires a fresh capture.

For the final human-led recording, keep the complete video below three minutes and use actual app footage. These are operational beats, not a narration script:

| Order | Actual app action | Observable proof |
| --- | --- | --- |
| 1 | Open the conflicting fictional policy and compare alternatives | Purchase/delivery bases and both first-day counting candidates remain explicit |
| 2 | Jump to the original policy line; choose a rule for review | Exact source selection; unknown counting stays blank; no automatic confirmation |
| 3 | Enter a fictional interpretation, confirm and download calendar | Explicit choice produces the demonstrated date and real file |
| 4 | Load clear sources; save/reopen a draft, check, confirm and export | Draft persistence and the normal end-to-end preparation flow |
| 5 | Reopen, withdraw/reconfirm acknowledgment, edit source and save | Export lock and changed-source draft survive reopening |
| 6 | Return to the empty workspace | No external requests, merchant approval or refund is claimed |

The entrant chooses what to say, using their own explanation and learning reflection. Record at 1440×1000 or similar; zoom if labels are hard to read. Keep other windows, real receipts, accounts and personal information outside the capture. Upload to publicly visible YouTube or Vimeo only after authorization, then verify anonymous access. A local MP4/WebM or GitHub attachment does not satisfy the hosting requirement.
