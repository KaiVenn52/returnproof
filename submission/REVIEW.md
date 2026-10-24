# ReturnProof — Short Learner Review

**Start here:** [actual app demo, refreshed October 24](../evidence/returnproof-demo.mp4), then open [the local app](http://127.0.0.1:43178). The recording shows the redesigned return-file desk and acknowledgment-state correction; exact duration and all five application Git blobs are in `evidence/demo-recording.json`. Double-click `Start-ReturnProof.cmd`, or run `node server.mjs` from the project folder. No install or API key is needed. The default moved from 4178 to 43178 to avoid sharing another project's origin; saved browser cases at the former origin are not migrated or deleted.

The second October 24 revision also lets you save incomplete sources before checking: paste part of a receipt → Save draft → reload and reopen → finish the policy → Check return window. On phones, use the sticky Documents / Return file navigation to move between sources and the result.

## Three things to review

1. **Plan:** read [scope](../devpost/scope.md), [PRD](../devpost/prd.md) and [technical spec](../devpost/spec.md). Name any intended behavior that should change. Their draft status records that learner review has not happened.
2. **Try it:** load the clear example → build the plan → inspect the receipt/policy quotes → compare the two anchor-counting conventions → explain and confirm your chosen interpretation → save/download → reload/reopen. Edit the policy and observe that calendar export locks. Try the conflict example and inspect the unresolved windows. Report what happened and what you expected.
3. **Follow one action:** use the [app map](../devpost/app-map.html) to follow `source-form` → `analyze` / `deadline` → `calendar`. Give your own short observation about a decision, edge case or thing you understood. No reflection answer has been generated for you.

## What you personally write or confirm

- Confirm the working project name; write the short description and the actual form's other submission answers in your own English.
- Supply your own learning/exit-survey reflections based on participation that actually occurred.
- Answer eligibility, affiliation/conflict, ownership and team questions truthfully; review terms before registration.
- Review the public repository/video contents and authorize publication, then confirm the final submission after links are verified.

Use [HUMAN_FIELDS.md](HUMAN_FIELDS.md) for prompts, [READINESS.md](READINESS.md) for evidence and remaining gates. The authenticated entry form has not been inspected, so its exact fields remain to be confirmed. The list above is not a fabricated copy of that form.

## Why human steps remain

Official [5-build, line 8](../.agents/skills/5-build/SKILL.md): “Both modes require hands-on learner feedback and a final revision round”. [Lines 154–158](../.agents/skills/5-build/SKILL.md) describe the learner trying the running app and reporting observations. [6-ship, line 8](../.agents/skills/6-ship/SKILL.md): “They must write their submission themselves.” Lines 63–67 restrict agent help with public entry copy to feedback on gaps and spelling/grammar corrections of the learner's own writing. These are curriculum requirements, not a claim that those steps already happened.

The direct autonomous-build instruction was used to finish implementation and technical evidence. It does not invent your approval, interviews, hands-on feedback or authorship. Public repository, public video, registration and accepted submission remain separate unperformed actions.
