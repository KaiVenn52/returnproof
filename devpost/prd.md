---
doc: prd
status: draft
execution: authorized-autonomous-build
---
# ReturnProof — Product Requirements
Implements `scope.md > The Unique Kernel` and `The Core Loop`.

## The Core Journey
1. Open an empty local workspace or load a labelled fictional example.
2. Paste receipt and policy text, label the merchant and item, and build an evidence plan.
3. Read exact receipt-date and policy excerpts. Multiple windows, unspecified counting, business days, exceptions, missing dates, or unsupported language require human review.
4. Select or enter the applicable calendar-day window, anchor date and basis, anchor-day convention, and rationale. Explicitly confirm the interpretation.
5. Review the calculated candidate deadline, check materials, save locally, and export checklist, evidence JSON, or an all-day calendar event with a three-day reminder.
6. Reload and reopen a saved case, or delete it with a second deliberate action.

## Screens and Layout
One responsive workspace. A narrow left case rail, central evidence-input form, and a right plan panel. On narrow screens these stack in reading order. The plan presents review state before its date, then source excerpts, interpretation, materials, and exports. Saved cases are buttons with item, merchant, and status.

## Look and Feel
October 24 user request: remove generic AI-generated styling and inspect the product comprehensively. Agent-selected specifics: a flat consumer return-file desk, warm neutral surfaces, dark ink and one burnt-orange accent. Asymmetric source/result layout; original source labels and line references; familiar sans-serif controls and monospaced arithmetic. No marketing-style italic hero, symmetric card pair, gradient hero or tiny body copy. Visible focus, readable form text and at least 44px primary targets. Mobile/tablet stack in source-to-plan reading order. See `../brand.md` for tokens and rationale.

## Features and Behavior
### Source Capture
Require a receipt and a policy, each at most 20,000 characters. Preserve raw text and source labels in every saved case and evidence export. Text is rendered as text, never HTML. Rebuilding changed sources resets prior confirmation/checklist; checking unchanged sources preserves the existing review and materials. New/example/open and page unload warn before discarding meaningful unsaved changes. Show local saved/draft state.
### Evidence Review
Narrow English parser finds purchase/delivery ISO dates and calendar-day return windows. Show all detected candidates with exact line quotes. No window/date means no guessed deadline. Business days, ambiguous numeric dates, holiday rules, explicit exclusions, and final-sale conditions are prominent review issues. Even a clean result is unconfirmed until the person accepts its interpretation.
### Human Interpretation
Person may choose the applicable rule and input missing calendar-day values with a rationale. Show the proposed arithmetic before confirmation. Confirmation is bound to the whole current case; changing any source or interpretation invalidates it. Human-entered values are labelled accordingly. A confirmed plan is a consumer assumption, never merchant approval.
### Evidence Pack and Calendar
Checklist always exportable with unresolved issues and source evidence. Calendar is disabled until a complete interpretation is explicitly confirmed. ICS uses date-only all-day DTSTART and exclusive next-day DTEND, one event, escaped content, and a three-day display reminder. The app does not deliver notifications; calendar software controls reminder delivery.
### Local Case Library
Explicit Save stores the case in this browser. Reload restores only saved cases. Storage failures produce a visible error, without claiming success. Delete requires a confirm button and clears the active case when applicable. No tracking, upload, accounts, or network calls from the application.

## States and Boundaries
- Empty: show input help and sample actions; no fictional case exists until requested.
- Unreviewed: possible dates shown as candidates, calendar locked.
- Needs review: missing/conflicting data or unsupported policy; calendar locked.
- Confirmed interpretation: display deadline and enable calendar; no promise of acceptance.
- Changed after confirmation: confirmation revoked and calendar locked immediately; previous date suppressed until sources are rechecked.
- Corrupt saved data: existing raw storage is not silently replaced; saving over it requires an explicit replacement decision.
- Corrupt/unavailable storage: visible warning; user can continue in memory and export.
- Expired/today/upcoming: compare ISO local dates, not elapsed 24-hour periods.

## Product Decisions
Brief requirements: traceable dates, human-review state, exports, persistence/deletion, no automated requests. Agent details: native JavaScript modules and deterministic extraction, localStorage, one responsive screen, explicit Save and confirmation. Learner has not yet reviewed these details.

## What We're Building
One coherent source-to-review-to-export workflow, a labelled clear sample and a conflicting sample, date-boundary tests, desktop/mobile browser QA, and factual technical documentation.

## Deferred From the POC
OCR, cloud sync, push/email reminders, live merchant feeds, and runtime AI parsing. None is represented as functioning.

## Non-Goals
Legal advice, inferred statutory rights, automatic requests, refunds, guarantees, or arbitrary-policy comprehension.

## Open Questions
Learner product review and hands-on feedback remain pending. Verify personal event eligibility before registration. These do not block the explicitly authorized local build; they block claims of completed guided curriculum or submission readiness.

October 24 second revision: compact workspace header/file rail and restrained title; draft saving is available before analysis. Draft reopen does not produce a date until the source check. Checked files expose Save changes. On phones, sticky Documents / Return file navigation leaves its destination visible. Clearing saved sources and deleting with unreadable existing storage retain explicit decision gates.

October 24 product revision: compare competing source rules and both possible first-day dates without selecting a default; explicitly copy supported values into review; jump to the exact original source line. Source edits disable stale shortcuts. Clause-level refund filtering preserves the real return rule in mixed lines; duplicate semantic evidence does not invent a date conflict. Draft/confirmation gates remain unchanged.
