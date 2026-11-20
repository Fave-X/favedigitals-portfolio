# FaveDigitals — Design

Direction: **The Case File.** The site is an investigator's case file, not a portfolio template. A visitor should leave knowing one thing: this is an investigator who shows proof.

## Rules

- **Red pen means "act" or "found".** Red (`accent`) marks only links, buttons, the live trace line, the final node of a trail, and circled findings. Everything else uses ink, muted or line tones.
- **Typed data, set text.** Courier Prime (`typed`) is only for things a file clerk would type: wallet stubs, dates, figures, file fields. Headlines are Archivo condensed (`case-title`). Body text is Public Sans.
- **No template parts.** No eyebrows above headings, no stat tiles, no identical card grids, no gradient text, no glass. Key numbers go in a ledger table (`Key evidence`), and work items go in an exhibit log.
- **Every figure has a source.** No invented numbers, quotes or testimonials.

## Tokens (globals.css)

| Role | Dark (default) | Light |
|---|---|---|
| paper | #0a0e15 | #ece4d2 |
| surface | #16161b | #f7f2e7 |
| ink | #efe8da | #1b1915 |
| muted | #938b7c | #625b4e |
| line-strong | #3b3d4a | #b9ad93 |
| accent (red pen) | #ff6158 | #b3261e |
| tag (manila) | #2f2918 | #d8c59b |

## Components

- **Trail** (`components/case/Trail.tsx`): the fund flow, hop by hop. GSAP draws the red line on load (home) or on scroll (case page). Nodes are neutral, the last node is red, and the finding is circled. Reduced motion shows the finished trail with no animation.
- **ExhibitLog**: folder-tab filters (a Motion `layoutId` slides the red tab bar), then lettered exhibit rows with a stamp (Live / Published), the key finding, evidence tools and the poster.
- **Case pages**: file-field header, ledger of key evidence, then the same sections in order: The question, Data and method, The trail (where one exists), Findings, What the data cannot show.

## Motion

Three animations only, and all of them carry meaning: the trace draws, the tab bar slides, and the row arrow moves on hover. All are disabled under `prefers-reduced-motion`.
