# Pod Request Access Landing Page — Design Definition

## Document status

- **Status:** Complete — Stage 4 reconciled design definition
- **Last reviewed:** 2026-07-31
- **Figma source:** <https://www.figma.com/design/3QpvW7LouEu2K1bNwzICoD/pod-request-access-landing-page?node-id=102-145>
- **Selected node:** `102:145` — `🧪 Pod request access landing page`
- **Related workflow:** [WORKFLOW.md](./WORKFLOW.md)
- **Source scope:** The selected node and its Main page, States, Style Guide, and Components sections. No behavior or content outside that scope is defined here.

## Executive summary

The design represents a focused, single-page request-access experience for Pod, a podcast distribution service. It combines a short value proposition, platform credibility marks, and one email submission control into a compact landing page with no visible navigation or secondary journey.

The experience is intentionally atmospheric and direct. A dark blue field establishes the page foundation; a green-tinted recording photograph supplies context; green highlights the brand and primary action; and a dark content surface preserves legibility where text overlaps the photograph. The desktop and tablet examples use an asymmetric overlap between content and imagery. The mobile example changes to a centered, single-column composition with the photograph subdued behind the full page.

**Inferred product context:** The page is intended to collect an email from a prospective user who wants early or restricted access. Figma establishes the request control and invalid-email presentation. Approved product decisions extend that evidence with submission-first validation, a guarded submitting state, recoverable service errors, and an inline success confirmation; the submission destination and operational service remain unresolved.

## Scope and non-goals

### Included

- One request-access landing page.
- Mobile (`375 × 812`), tablet (`768 × 1024`), and desktop (`1440 × 960`) design examples.
- Pod branding, value-proposition copy, hero photography, dot decoration, and four distribution-platform marks.
- Empty, filled, invalid, and CTA hover presentations for the email form.
- Submitting, recoverable service-error, and inline success behavior established by approved product decisions.
- Design foundations visible in the selected Style Guide and variable definitions.
- Responsive, interaction, content, and accessibility intent that can be supported by the selected Figma scope.

### Excluded or unresolved

- Navigation, authentication, account creation, or any secondary screen.
- The data destination, API contract, or service used to process a request.
- Confirmation-email behavior, redirect behavior, or any post-success account journey.
- Exact visual treatments and production copy for submitting, focus-visible, pressed, recoverable service-error, and success states.
- Exact responsive transition thresholds and unsupported intermediate-width behavior.
- Analytics, tracking, privacy disclosure, consent requirements, and legal copy.
- Localization and alternate copy lengths.
- Final licensing, approval, format, and delivery requirements for imagery, marks, and fonts.

## Experience structure

### View inventory

| View | Figma evidence | Intended role |
|---|---|---|
| Mobile page | `102:203` | Centered, single-column request experience with subdued full-page imagery. |
| Tablet page | `102:486` | Left-aligned request experience overlapping a tall image on the right. |
| Desktop page | `102:326` | Wide, asymmetric request experience within a centered maximum-width composition. |
| Mobile filled state | `102:705` | Demonstrates entered email content and CTA hover treatment at mobile size. |
| Mobile invalid state | `102:828` | Demonstrates invalid input, red outline, and error copy at mobile size. |
| Desktop filled state | `102:951` | Demonstrates entered email content and CTA hover treatment in the inline form. |
| Desktop invalid state | `102:1111` | Demonstrates invalid input, red outline, and error copy in the inline form. |

### Information architecture

The page contains one hierarchy:

1. Pod brand identification.
2. Primary promise: “Publish your podcasts everywhere.”
3. Supporting explanation of Pod’s distribution value.
4. Request-access form and distribution-platform credibility marks.

**Observed responsive difference:** Desktop and tablet place the form before the platform marks. Mobile places the platform marks before the form. This order is treated as intentional until the design owner changes it.

### Primary journey

1. The visitor recognizes the Pod brand and podcast-recording context.
2. The visitor reads the promise and supporting explanation.
3. The visitor enters an email address.
4. The visitor activates “Request Access.”
5. The first validation check occurs on submission.
6. If the value is empty or invalid, the field receives a red outline and the message “Oops! Please check your email” appears while retaining the entered value.
7. If the value is valid, one request enters a guarded submitting state that prevents duplicate submission.
8. Affirmative service success replaces the form with an inline confirmation without redirecting the visitor.
9. A network or service failure restores the operable form, preserves the email, and presents recoverable inline feedback with retry available.

Steps 3–4 are **inferred interaction intent** from the form appearance and state examples. Steps 5–9 are **approved product decisions** that extend the static Figma evidence.

### Secondary journeys and navigation

No navigation, secondary action, or alternate journey is observed. The platform marks communicate availability or credibility rather than navigation. The approved product decision treats them as visible, non-interactive decorative reinforcement because the same platforms are named in the supporting copy.

## Layout and visual hierarchy

### Shared hierarchy

- The page uses Blue 950 as its visual base.
- The Pod logo introduces the experience before the content panel.
- The uppercase heading is the primary visual anchor. Green emphasizes “Publish your podcasts”; white emphasizes “everywhere.”
- Supporting copy uses Blue 300 and a smaller, lighter typographic treatment.
- The green CTA is the strongest interactive signal.
- Platform marks use the quieter Blue 600 role so they support rather than compete with the CTA.
- The hero photograph and dot pattern provide atmosphere and balance without adding another content task.

### Desktop composition

**Observed at `1440 × 960` (`102:326`):**

- The main composition is centered, constrained to `1120px`, and surrounded by `80px` outer spacing.
- The logo sits above the content surface with a `104px` relationship to the content block.
- A Blue 950 content surface, `736px` wide in the example, overlaps the photograph and remains visually in front of it.
- The content surface begins with `88px` top space and `64px` right space, preserving a broad, calm edge around the copy.
- Heading and body copy are separated by `24px`; the body copy is constrained to approximately `448px`.
- The form is an inline, `448px`-wide pill. Platform marks follow it with additional vertical separation.
- The photograph occupies the right side in a wide crop, while the `232 × 104` dot pattern extends near its lower-right edge.

**Intent:** The overlap should feel deliberate and stable, with the dark content surface guaranteeing readable text while allowing the photograph to remain prominent.

### Tablet composition

**Observed at `768 × 1024` (`102:486`):**

- The page uses `44px` outer spacing.
- The left-aligned logo, text, inline form, and platform marks retain the desktop typographic hierarchy.
- The dark content surface narrows to `592px`, while the form and body copy retain their approximate `448px` measure.
- The content overlaps a narrower, taller crop of the same photograph on the right.
- The dot pattern is partially visible near the lower-right edge.

**Intent:** Tablet is not a centered mobile layout. It preserves the desktop relationship between text, form, and image while allowing controlled overlap and cropping in a narrower viewport.

### Mobile composition

**Observed at `375 × 812` (`102:203`):**

- The page uses `36px` outer spacing and centers a single column with a maximum content width of `480px`.
- The photograph fills the page behind the content at approximately 10% visible opacity, rather than occupying a separate right-side region.
- The logo, heading, supporting copy, platform marks, and form are centered.
- The primary content groups use `56px` and `40px` spacing relationships; heading and body copy are separated by `16px`.
- The heading reduces to `32px`; supporting copy reduces to `14px`.
- The platform marks appear before the form and use substantially smaller artwork.
- The form uses a `303px` field above a `303px` CTA with an `8px` gap.

**Intent:** Mobile prioritizes a compact, centered reading path and keeps the action comfortably wide. The background photograph should remain atmospheric and must not reduce text or control legibility.

### Density and overflow

The examples favor generous spacing over dense content. Copy growth, localization, short mobile viewports, landscape orientation, and long email values are not represented. The intended design should preserve content access and reading order if vertical scrolling becomes necessary; fitting the complete composition into one viewport is not a requirement established by Figma.

## Design foundations

### Color roles

| Token | Value | Intended role |
|---|---:|---|
| Green | `#54E6AF` | Brand accent, heading emphasis, CTA background, dot decoration, and image tint. |
| White | `#FFFFFF` | Strong heading contrast and logo detail. |
| Blue 950 | `#121725` | Page background, content surface, and CTA text. |
| Blue 900 | `#2C344B` | Email-field surface. |
| Blue 600 | `#5A668A` | Supporting platform marks. |
| Blue 300 | `#C2CBE5` | Supporting body copy. |
| Error red | `#FB3E3E` | Invalid-field outline and error message. |

These are reusable palette roles from the selected variables and Style Guide, not one-off sampled colors.

### Typography

| Role | Family and weight | Desktop/tablet | Mobile | Intent |
|---|---|---|---|---|
| Primary heading | Chivo Light, `300` | `48px`, `1.2` line height | `32px`, `1.2` line height | Uppercase promise with green first phrase and white completion. |
| Supporting copy | Chivo Light, `300` | `18px`, `1.5` line height | `14px`, `1.5` line height | Calm explanatory text with comfortable line spacing. |
| Field and CTA text | Chivo Bold, `700` | `14px`, `2` line height | `14px`, `2` line height | Compact, high-emphasis control text. |
| Error message | Chivo Bold, `700` | `12px`, normal line height | `12px`, normal line height | Short corrective message adjacent to the invalid field. |

All observed text styles use zero letter spacing. The heading’s line breaks differ by viewport because of available width; the phrase structure is more important than reproducing an accidental wrap at every intermediate size.

### Spacing

The selected Style Guide defines a reusable spacing set of `4`, `8`, `16`, `24`, `32`, `40`, `56`, `64`, `80`, `88`, and `104px`. The composition relies most strongly on:

- `4px` internal inset in the inline field/control shell.
- `8px` between stacked mobile form controls and between a control and related feedback.
- `16px` between mobile heading and supporting copy.
- `24px` between desktop/tablet heading and supporting copy.
- `40px` between major content groups.
- `56px` between primary mobile groups.
- `64px` and `88px` within the desktop/tablet content surface.
- `80px` desktop outer space and `104px` logo-to-panel relationship.

Values such as the `36px` mobile and `44px` tablet outer spacing are layout-specific values rather than members of the documented reusable scale.

### Shape, border, and elevation

- Field and CTA surfaces use fully rounded, pill-like geometry.
- Field and CTA heights are `44px` in the inspected examples.
- The CTA carries a subtle `0 2px 4px` green shadow at low opacity.
- Invalid fields use a `2px` red outline.
- No card border, page elevation, or content-panel shadow is visible.

### Grid and alignment

- Desktop and tablet use asymmetric overlap rather than equal grid columns.
- Desktop centers a maximum-width main composition; tablet preserves the same relationship with reduced outer space.
- Mobile replaces overlap with a centered single column and a full-page background image treatment.
- Exact responsive transition thresholds are not defined by the three sample widths.

### Imagery conventions

The same recording photograph is reused across viewport examples with responsive cropping and a green color treatment. Desktop and tablet give it a distinct visual region; mobile reduces it to a low-opacity background. The dot pattern uses the green accent and functions as a balancing ornament in larger layouts only. No animation or image transition is observed.

## Component inventory

### Pod logo

- **Purpose:** Establish brand identity before the value proposition.
- **Anatomy:** Green circular waveform mark plus white “pod” wordmark.
- **Variants/states:** One default component variant is observed.
- **Content constraints:** The artwork and wordmark should remain a single recognizable lockup; no alternate name or compact mark is defined.
- **Reuse:** Shared by mobile, tablet, and desktop examples.
- **Evidence:** Component frame `102:1651`; source instance `4:2495`.

### Heading group

- **Purpose:** Communicate the primary promise with strong brand emphasis.
- **Anatomy:** Green first phrase and white final phrase within one semantic heading concept.
- **Variants:** Desktop/tablet and mobile typography sizes.
- **Content constraints:** Current copy is uppercase and intentionally short. Longer or translated copy is unresolved.
- **Composition:** The color split must not create two unrelated headings or disturb the spoken reading order.
- **Evidence:** Mobile `102:213`; tablet `102:492`; desktop `102:332`.

### Supporting copy

- **Purpose:** Explain the one-click upload and platform distribution proposition.
- **Variants:** `18px` desktop/tablet and `14px` mobile.
- **Content constraints:** Current copy names four platforms and ends with “and more!” Final platform references require approval.
- **Evidence:** Mobile `102:214`; tablet `102:493`; desktop `102:333`.

### Request-access form

- **Purpose:** Collect the visitor’s email and expose the page’s primary action.
- **Desktop/tablet anatomy:** One `448px` pill surface containing email entry on the left and a green CTA on the right; validation feedback appears below.
- **Mobile anatomy:** A `303px` email field, a separate full-width CTA, and validation feedback below.
- **Observed variants:** Empty/default, filled, and invalid/error. The desktop set calls its filled variant `form-hover-active`; its content shows an entered address, so it must not be treated as proof of focus or hover behavior for the field.
- **Content constraints:** The field must tolerate realistic email lengths without covering the CTA or escaping the field. The value remains on one line and uses the control’s internal horizontal text navigation when it exceeds the visible area.
- **Reuse:** Desktop and tablet share the inline form composition; mobile uses the stacked composition.
- **Evidence:** Desktop set `102:1606` with variants `102:1619`, `102:1607`, `102:1611`; mobile set `102:1595` with variants `102:1596`, `102:1599`, `102:1602`.

### Email field

- **Purpose:** Accept an email address for the request.
- **Anatomy:** Blue 900 pill surface, left-aligned bold text, and a lower-emphasis empty prompt.
- **States:** Empty prompt at 50% white opacity, filled white text, and invalid filled text with a red outline.
- **Feedback:** Invalid feedback appears outside and below the field rather than overlaying it.
- **Required non-Figma states:** Focus-visible and autofill preserve field readability; submitting prevents duplicate requests; service failure preserves an editable value for retry; success removes the complete form. Exact visual treatments remain unresolved.
- **Evidence:** Desktop field variants within `102:1606`; mobile text-field variants within `102:1595`.

### Request Access CTA

- **Purpose:** Submit the email request.
- **Anatomy:** Green pill surface, centered Blue 950 bold label, and subtle green shadow.
- **Variants:** Inline desktop/tablet and full-width mobile; each has default and hover visuals.
- **Hover treatment:** A 50% white overlay lightens the green background while the label remains dark.
- **Required non-Figma states:** Focus-visible remains distinct from hover; pressed feedback does not change field state; submitting prevents duplicate activation and communicates progress; success removes the control with the rest of the form. Exact visual treatments and loading label or indicator remain unresolved.
- **Evidence:** Desktop button set `102:1628`, variants `102:1629` and `102:1631`; mobile button set `102:1646`, variants `102:1647` and `102:1649`.

### Error feedback

- **Purpose:** Explain that the submitted or entered value is not accepted.
- **Anatomy:** A `2px` red field outline plus red `12px` bold message.
- **Copy:** “Oops! Please check your email”.
- **Placement:** Indented beneath the inline desktop/tablet field; centered beneath the stacked mobile form.
- **Layout behavior:** Feedback participates in layout and increases the form block’s height.
- **Evidence:** Desktop invalid variant `102:1611`; mobile invalid variant `102:1602`; page states `102:1111` and `102:828`.

### Distribution-platform marks

- **Purpose:** Communicate intended distribution reach and reinforce credibility.
- **Anatomy:** Spotify, Apple Podcasts, Google Podcasts, and Pocket Casts marks in Blue 600.
- **Variants:** Larger marks with `40px` gaps on desktop/tablet; smaller, evenly distributed marks on mobile.
- **Interaction:** The marks are non-interactive and receive no hover, pressed, or focus behavior.
- **Content constraints:** The visible marks retain the observed names and order until approved content supersedes them. They are hidden from the accessibility tree so they do not duplicate the platform names already available in supporting copy.
- **Evidence:** Mobile group `102:215`; tablet group `102:495`; desktop group `102:335`.

### Hero photograph

- **Purpose:** Establish the podcast-recording context and supply emotional atmosphere.
- **Variants:** Wide desktop crop, tall tablet crop, and full-page low-opacity mobile crop.
- **Interaction:** None observed.
- **Accessibility classification:** Unresolved. It is likely decorative because the value proposition does not depend on identifying the person, but this must be confirmed.
- **Evidence:** Mobile image group `102:204`; tablet image group `102:606`; desktop image group `102:446`.

### Dot pattern

- **Purpose:** Balance the larger asymmetric compositions and repeat the green brand accent.
- **Variants:** Visible on tablet and desktop; absent from the mobile example.
- **Interaction and motion:** None observed.
- **Accessibility classification:** Inferred decorative.
- **Evidence:** Tablet `102:612`; desktop `102:452`.

## Interaction and feedback

### Observed

- The CTA has a lighter green hover presentation on desktop and mobile component sets.
- A filled email is shown with full-opacity white text.
- An invalid email is shown with both a red outline and an explanatory message.
- The invalid message takes space in the page layout.
- No navigation, link treatment, transition, or motion is visible.

### Inferred intent

- The email area is an editable form field, not a button or static text surface.
- “Request Access” is the form’s submission control.
- Keyboard activation and touch activation should produce the same action as pointer activation.
- Filled content, browser autofill, CTA hover, pressed feedback, keyboard focus, invalid feedback, and submitting are independent states.

### Approved behavior beyond Figma

- Empty or invalid values are first rejected on submission and use the observed invalid presentation.
- Validation feedback preserves the value and clears once editing produces a valid address; it does not reappear solely because later editing makes the value invalid.
- A valid submission enters a pending state, retains the submitted value, communicates progress, and prevents concurrent duplicate requests.
- Service failure returns to an operable form, retains the email, and presents inline feedback with retry available.
- Affirmative success keeps the visitor on the page and replaces the complete form with inline confirmation.
- Platform marks are visible but non-interactive and hidden from assistive technology.

### Reconciled visual direction for missing states

- **Focus-visible:** Add a distinct, high-contrast indicator to the focused field or CTA without borrowing the lighter hover fill. The exact token, thickness, and offset remain a design decision.
- **Pressed:** Provide immediate control feedback without changing the field’s populated, invalid, or focus state. The exact treatment is unresolved.
- **Submitting:** Keep the form’s position and overall measure stable, make progress perceptible, and prevent duplicate activation. A loading indicator or label must not cause destructive layout shift; exact copy and visuals are unresolved.
- **Service error:** Keep the form and email in place. Put recoverable feedback in the same normal-flow feedback region used by validation so it cannot cover nearby content, while ensuring the message is distinguishable as a request failure rather than an email-format error.
- **Success:** Replace the complete form in its existing content slot with a concise confirmation that preserves the page hierarchy and remains legible in every layout mode. Exact copy and visual styling are unresolved.
- **Motion:** No motion is required. Any later state transition must keep status information immediate and respect reduced-motion preferences.

## Responsive intent

### Available evidence

Figma supplies three static examples at `375`, `768`, and `1440px` wide. They define representative layout modes, not proven transition thresholds.

### Required relationships

| Relationship | Desktop and tablet intent | Mobile intent |
|---|---|---|
| Overall composition | Asymmetric overlap between dark content surface and right-side image. | Centered single column over a subdued full-page image. |
| Alignment | Left-aligned. | Center-aligned. |
| Logo | Above the content surface. | Centered within the single content flow. |
| Heading | `48px`, wider measure. | `32px`, narrower measure. |
| Supporting copy | `18px`, approximately `448px` measure. | `14px`, full available column width. |
| Form | Inline field and CTA, approximately `448px` wide. | Stacked field and CTA, each approximately `303px` wide in the sample. |
| Platform marks | After the form; larger with fixed visual gaps. | Before the form; smaller and distributed across the available width. |
| Hero image | Distinct right-side region with green tint. | Low-opacity background covering the page. |
| Dot pattern | Visible near lower-right image edge. | Not shown. |

### Resizing and reflow intent

- The design should move between composition modes when the shared desktop/tablet relationship no longer fits without collision or unreadable content. The exact transition point remains unresolved.
- The main composition should remain centered and should not continue expanding beyond the observed desktop maximum without an explicit design decision.
- The image may crop to preserve its assigned region; it must not distort.
- Text, controls, or feedback must not be clipped merely to preserve the sample-frame height.
- The stacked mobile controls should remain comfortably operable and should not shrink below their content needs.
- Long email content remains contained in the single-line control with native internal text navigation. Longer copy and feedback wrap, increase page height, and remain reachable through vertical scrolling.

### Unrepresented conditions

- Widths between the three examples.
- Viewports wider than `1440px`.
- Narrow devices below `375px`.
- Short viewports and mobile landscape.
- Text resizing, zoom, and alternate language lengths.
- Virtual-keyboard effects while editing the field.

## Accessibility intent

### Visible evidence

- Primary text and CTA color relationships provide strong contrast against Blue 950.
- Derived from the observed tokens, Blue 300 on Blue 950 is approximately `11.04:1`, Green on Blue 950 approximately `11.33:1`, and Error red on Blue 950 approximately `4.99:1`.
- The invalid state uses both outline and text, not color alone.
- Field and CTA examples are `44px` high with ample horizontal target area.
- The platform marks are visually quieter; Blue 600 on Blue 950 is approximately `3.15:1`, and their small mobile rendering creates a legibility risk.

### Accessibility goals not established by Figma

- The page should expose one clear primary heading and one form with a persistent accessible name for the email field.
- Visual color splitting within the heading should preserve one coherent reading order.
- Semantic reading and focus order should remain logo/brand context, heading, supporting copy, then form. Decorative platform marks may change visual position between layout modes without entering the accessibility or focus order.
- All form controls must be operable by keyboard, pointer, and touch.
- Keyboard focus must be clearly visible on the field and CTA; focus styling is unresolved and needs a design decision.
- Invalid feedback should be programmatically associated with the field, announced when it appears, and should not remove the entered value.
- Placeholder text should not be the field’s only accessible label.
- The CTA must keep an accessible name equivalent to “Request Access,” including during loading if a loading state is introduced.
- The layout should tolerate text resizing and zoom/reflow without losing content, overlapping controls, or requiring unnecessary horizontal scrolling.
- Platform marks are decorative reinforcement: they remain visible, are hidden from assistive technology, and never receive focus or accessible names.
- The hero photograph and dot pattern should be ignored by assistive technology if confirmed decorative. If the photograph conveys necessary information, meaningful alternative text is required.
- No motion is observed. If motion is introduced later, reduced-motion preferences must be respected.

## Content and assets

### Required copy

| Content | Current value | Status |
|---|---|---|
| Heading | “Publish your podcasts everywhere.” | Observed; final approval unresolved. |
| Supporting text | “Upload your audio to Pod with a single click. We’ll then distribute your podcast to Spotify, Apple Podcasts, Google Podcasts, Pocket Casts and more!” | Observed; platform names and final approval unresolved. |
| Field prompt | “Email address” | Observed; must not serve as the only accessible label. |
| CTA | “Request Access” | Observed. |
| Invalid feedback | “Oops! Please check your email” | Observed; applies after an empty or invalid submission. |
| Submitting feedback | Not defined | Required to communicate progress; exact copy or indicator unresolved. |
| Service-error feedback | Not defined | Must state that the request was not completed and may be retried; exact wording unresolved. |
| Success confirmation | Not defined | Must clearly confirm receipt of the request; exact wording unresolved. |
| Filled example | `john@mail.com` | State demonstration only, not production content. |
| Invalid example | `john#mail.com` | State demonstration only, not production content. |

### Required assets

- Pod waveform symbol and wordmark lockup.
- Recording-session hero photograph.
- Green dot-pattern decoration.
- Spotify mark.
- Apple Podcasts mark.
- Google Podcasts mark.
- Pocket Casts mark.
- Chivo Light (`300`) and Bold (`700`) font resources.

### Asset decisions still needed

- Source-of-truth files and export formats.
- Raster resolutions and responsive image crops.
- Whether any vector marks require separate mobile exports.
- Decorative versus informative alternative-text treatment.
- Licensing and brand-guideline approval.
- Confirmation that the named platform list remains intentional and current.

The short-lived asset URLs returned by Figma inspection are evidence references, not durable production assets.

## Assumptions, open questions, and risks

### Assumptions

| ID | Assumption | Impact if false |
|---|---|---|
| A-01 | The selected scope represents one landing page with no navigation or secondary journey. | Information architecture and page scope would need revision. |
| A-02 | The email surface is a real form control and “Request Access” submits it. | The interaction model and accessibility intent would change. |
| A-03 | The mobile order—platform marks before form—is intentional. | Mobile hierarchy and focus/reading order would need revision. |
| A-04 | The photograph and dot pattern have no interaction or motion. | Interaction, accessibility, and reduced-motion requirements would expand. |
| A-05 | The three viewport frames represent composition modes, not exact breakpoints. | Responsive planning could use the wrong transition thresholds. |

### Approved decisions applied during reconciliation

| ID | Decision | Design consequence |
|---|---|---|
| D-01 | Successful submission stays on the page and replaces the form with inline confirmation. | Success occupies the form’s content slot and preserves the surrounding hierarchy. |
| D-02 | Validation first occurs on submission; correction clears the error; failures preserve the email and allow retry. | Validation, submitting, service-error, and success are independent normal-flow states. |
| D-03 | Platform marks are non-interactive decorative reinforcement. | Marks remain visible but have no focus, interaction, or accessibility-tree presence. |
| D-04 | Long email content stays in a single-line field; longer copy and feedback grow vertically. | The page scrolls instead of clipping, while the field uses internal horizontal text navigation. |

### Open questions

| ID | Question | Impact | Blocking stage |
|---|---|---|---|
| OQ-01 | Are `375`, `768`, and `1440px` representative examples, or should any be exact transition thresholds? | Determines responsive mode transitions and intermediate-width behavior. | Must resolve by Stage 5. |
| OQ-05 | What exact visual treatments and production copy should be used for focus, pressed, submitting, recoverable service-error, and success states? | Affects final state styling, layout verification, and content approval. | Must resolve before Stage 5 is finalized. |
| OQ-06 | Are the hero image, platform marks, platform list, and distribution copy final, licensed, and approved? | May change content, assets, layout, and release readiness. | Must resolve before release. |
| OQ-07 | Is the hero photograph informative or decorative? | Determines alternative-text treatment. | Must resolve before Stage 5. |
| OQ-11 | What request-service, privacy, consent, retention, and confirmation-email requirements apply? | Determines integration, legal, data, security, and release work outside the present visual evidence. | Must resolve before a real submission integration. |
| OQ-12 | Which browsers and device range must be supported beyond the three reference widths and accessibility reflow requirements? | Determines compatibility testing and fallback needs. | Must resolve before Stage 5 is finalized. |

### Risks

| Risk | Evidence | Impact | Design response |
|---|---|---|---|
| Intermediate-width collision | Only three static viewport examples exist. | Content, image, and ornament may overlap incorrectly. | Select transitions from content fit during implementation planning; verify widths between examples. |
| Ambiguous “hover-active” state | Filled field and lightened CTA appear together. | Focus, hover, and filled state logic may be conflated. | Treat filled and CTA hover as independent concepts until clarified. |
| Missing Figma feedback states | No submitting, success, or service-error frames. | Final styling could diverge from the visual system even though behavior and hierarchy are defined. | Use the reconciled state direction and approve exact copy and treatments before Stage 5 is finalized. |
| Small, low-contrast platform marks | Blue 600 on Blue 950 is about `3.15:1`; mobile marks are small. | Marks may be difficult to perceive. | Confirm their informational role and test legibility at rendered size. |
| Asset and copy uncertainty | Licensing, final platform list, and export requirements are not recorded. | Late changes could affect layout and release readiness. | Confirm durable assets and approved content before implementation completion. |
| Fixed sample dimensions | Forms are shown at `448px` and `303px`. | Narrow widths or long values may overflow. | Preserve visual proportions while allowing fluid limits and contained single-line input navigation. |
| Viewport-height dependency | Mobile example fits within `812px`; error feedback adds height. | Short viewports or virtual keyboards may hide content. | Permit vertical scrolling and keep feedback in normal content flow. |

## Evidence traceability

| Design claim | Classification | Figma evidence |
|---|---|---|
| The scope contains Main page, States, Style Guide, and Components sections. | Observed | Selected node `102:145`; section nodes `102:704`, `102:1348`, `102:1682`, `102:1683`. |
| Mobile, tablet, and desktop are distinct representative layouts. | Observed | `102:203`, `102:486`, `102:326`. |
| Desktop and tablet use left-aligned content overlapping a right-side image. | Observed | `102:326`, `102:486`; content groups `102:328`, `102:488`; image groups `102:446`, `102:606`. |
| Mobile uses a centered single column over subdued full-page imagery. | Observed | `102:203`; image group `102:204`; content group `102:209`. |
| Mobile places platform marks before the form. | Observed | Mobile content descendants `102:215` followed by the mobile form instance. |
| Desktop/tablet place the form before platform marks. | Observed | Desktop `102:335`; tablet `102:495`; respective form instances precede those groups. |
| The visual system uses Chivo, the seven documented colors, and the recorded spacing scale. | Observed | Style Guide `102:1682` / `102:1353`; variables from `102:203`, `102:326`, and `102:1111`. |
| Forms provide empty, filled, and invalid variants. | Observed | Desktop set `102:1606`; mobile set `102:1595`. |
| CTA components provide default and hover variants. | Observed | Desktop set `102:1628`; mobile set `102:1646`. |
| Invalid feedback uses both a red outline and message and increases layout height. | Observed | `102:1611`, `102:1602`, `102:1111`, `102:828`. |
| The email surface is intended to be editable and submitted by the CTA. | Inferred | Form naming, field copy, CTA copy, and state examples within `102:1606` and `102:1595`. |
| Platform marks are visible, non-interactive decorative reinforcement. | Approved product decision grounded in observed non-interactive presentation | No interaction states in groups `102:215`, `102:495`, `102:335`; supporting copy already names the platforms. |
| Validation begins on submission and preserves the email for correction. | Approved product decision | Invalid presentations `102:828`, `102:1111`; observed message and normal-flow layout. |
| Success replaces the form; service failure preserves it for retry. | Approved product decision; exact visual treatment unresolved | No direct Figma state; reconciled from the approved Stage 3 behavior. |
| Long email values remain single-line; longer content increases page height. | Approved overflow decision | Fixed-width forms `102:1595`, `102:1606`; normal-flow invalid feedback in `102:828`, `102:1111`. |
| The photograph is decorative. | Unresolved; likely decorative | Image groups `102:204`, `102:606`, `102:446`. |
