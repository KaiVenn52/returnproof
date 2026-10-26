## What it does
ReturnProof turns pasted receipt and return-policy text into a reviewable return file. It preserves exact source lines, compares competing rules and possible dates, and asks the user to choose the date basis and first-day counting before confirming a deadline. A confirmed file can export a calendar event, checklist and evidence record.

## Why this project
A return deadline can depend on purchase versus delivery, contradictory policy wording and whether the first day counts. Showing one confident date hides those assumptions. ReturnProof makes the source and interpretation visible together so a person can check the decision before relying on it.

## How it was built
The project uses native JavaScript modules, HTML and CSS with a local Node.js server and no runtime dependencies or external API calls. A coding agent inspected the Devpost Learn Skill Pack, produced scope, PRD, specification, checklist and app-map artifacts, and implemented the application. The entrant directed the work, requested repeated UI and product improvements, and authorized public source and demonstration publication. The agent led implementation and testing; this entry does not claim that the entrant completed every guided interview or hands-on learning checkpoint.

## Challenges and checks
The main engineering challenge was preserving the link between a date and its supporting source. Editing a source invalidates confirmation; unresolved rules prevent calendar export. Draft recovery, stale saved sources, storage failures and deletion decisions were checked through browser flows. The final domain and export logic passed 24 automated tests, and the app was exercised in desktop and phone-sized Edge viewports. The public repository includes reproducible evidence and a real 88-second application recording.

## What the build demonstrated
Explicit uncertainty is useful product behavior. Comparing the rules and both first-day interpretations gives users a concrete decision to review. Iterating on source navigation, draft saving and mobile navigation made that decision easier to inspect. These are observations from the implementation and tests, not claims of user research or personal learning that was not recorded.

## Limits
This is a local proof of concept using narrow English text patterns. It does not verify merchant policies, provide legal advice, calculate business-day holidays, send notifications or prove a refund. Calendar imports and outcomes with real merchants remain untested.
