# Pod Request Access Landing Page — Product Specification

## Document status and scope

- **Status:** Complete — Stage 3 product specification
- **Last reviewed:** 2026-07-31
- **Figma source:** <https://www.figma.com/design/3QpvW7LouEu2K1bNwzICoD/pod-request-access-landing-page?node-id=102-145>
- **Selected node:** `102:145` — `🧪 Pod request access landing page`
- **Design definition:** [DESIGN.md](./DESIGN.md)
- **Workflow record:** [WORKFLOW.md](./WORKFLOW.md)
- **Source scope:** The selected node and its Main page, States, Style Guide, and Components sections, plus the product decisions recorded below.

### Included behavior

- A single-page request-access experience.
- Presentation of Pod branding, value-proposition copy, podcast imagery, distribution-platform marks, an email field, and a primary submission control.
- Empty, populated, hover, focus, invalid, submitting, service-error, and success behavior.
- Responsive composition corresponding to the mobile, tablet, and desktop Figma examples.
- Keyboard, screen-reader, zoom/reflow, contrast, and error-recovery requirements.

### Excluded or unresolved behavior

- Navigation, authentication, account creation, or secondary pages.
- Confirmation-email behavior, a redirect, or a post-success account flow.
- The request-processing service, API contract, storage model, or delivery mechanism.
- Analytics, tracking, consent, privacy notice, retention policy, and legal copy.
- Exact responsive breakpoints and a browser-support matrix.
- Exact approved copy and visual treatment for submitting, success, and service-error states.
- Final asset licensing, export formats, and platform-list approval.

### Approved product decisions

1. A successful request keeps the visitor on the page and replaces the form with an inline confirmation.
2. Email validation first occurs on submission. An invalid value is preserved, and its validation error clears once the edited value becomes valid.
3. Network or service failure produces an inline, recoverable error while preserving the email for retry.
4. The distribution-platform marks are visible, non-interactive decorative reinforcement because the same platforms are named in the supporting copy.

### Definitions

| Term | Definition |
|---|---|
| Visitor | A person who opens the landing page and may request access. No authenticated role is implied. |
| Request form | The email field, “Request Access” submission control, and related feedback. |
| Valid email | One non-empty email address that passes the web platform’s standard single-email syntax validation after leading and trailing whitespace are removed. No domain allow-list or proof of mailbox ownership is required by this specification. |
| Validation error | Local feedback shown when the submitted value is empty or not a valid email. |
| Submitting | The interval after a valid submission is accepted by the page and before the request-processing service reports success or failure. |
| Service error | A network failure, timeout, unavailable service, or unsuccessful service response that means the request was not confirmed. |
| Success confirmation | Inline content that clearly confirms the request was received and replaces the request form. |
| Platform marks | The visible Spotify, Apple Podcasts, Google Podcasts, and Pocket Casts brand marks. |
| Layout mode | A composition selected because the content fits that viewport, not an exact breakpoint inferred from a Figma sample width. |

## Actors and preconditions

### Actor

- **Visitor:** Can read the page, enter one email address, submit a request, correct invalid input, retry a failed request, and receive an inline confirmation.

### Preconditions

- The landing page has loaded sufficiently to expose its primary content and request form.
- No account or prior session is required.
- A request-processing service is required for a real successful submission, but its technical contract is outside this specification.

## Functional requirements

| ID | Requirement | Source |
|---|---|---|
| `FR-001` | The page **must** present one coherent experience containing the Pod logo, primary heading, supporting copy, request form, platform marks, and responsive hero treatment. | Figma frames `102:203`, `102:486`, `102:326`; `DESIGN.md` Experience structure |
| `FR-002` | The request form **must** provide one editable email control and one submission control whose visible name is “Request Access.” | Form sets `102:1595`, `102:1606`; approved interpretation of the form |
| `FR-003` | The visitor **must** be able to submit with pointer or touch activation of the submission control and with the platform-standard Enter-key form action while editing the email field. | Inferred interaction intent; approved request journey |
| `FR-004` | On submission, the page **must** remove leading and trailing whitespace and validate that the result is one non-empty, syntactically valid email address. It **must not** require a specific provider, domain, or client-side mailbox-existence check. | Approved validation decision; minimal email data requirement |
| `FR-005` | Before the first submission attempt, the page **must not** show a validation error solely because the field is empty or partially edited. Local email validation **must** first run on submission. | Approved validation timing |
| `FR-006` | If the submitted value is empty or invalid, the page **must** prevent the request, preserve the visitor’s current value, apply the invalid-field presentation, and show “Oops! Please check your email”. | Invalid frames `102:828`, `102:1111`; approved preservation decision |
| `FR-007` | After a validation failure, the page **must** re-evaluate the value as the visitor edits it and remove the validation error as soon as the current value becomes valid. If the value later becomes invalid again, the page **must not** restore the error until another submission attempt. | Approved correction behavior |
| `FR-008` | A valid submission **must** enter a submitting state, preserve the submitted email until completion, and prevent additional submission attempts while that request is pending. | Required completion state; duplicate-request risk |
| `FR-009` | The page **must** show success only after the request-processing service affirmatively reports success. On success, it **must** keep the visitor on the same page and replace the complete request form with an inline success confirmation. | Approved success decision |
| `FR-010` | On a service error, the page **must** restore an operable request form, preserve the submitted email, and show an inline message that states the request was not completed and that retry is available. | Approved failure and recovery decision |
| `FR-011` | After a service error, the visitor **must** be able to retry with the preserved email or edit it before retrying; a retry **must** follow the same validation and submission rules as the first attempt. | Approved recoverability decision |
| `FR-012` | Populated-field, CTA hover, keyboard-focus, invalid, and submitting states **must** remain independent; entering an email **must not** by itself activate the CTA hover or focus presentation. | Ambiguous “hover-active” Figma states; approved state separation |
| `FR-013` | The platform marks **must not** navigate, submit, open content, receive focus, or otherwise act as controls. | Approved platform-mark decision |

## Screen and component behavior

### Page

- The page has one primary journey and no visible navigation.
- The responsive composition changes alignment, image treatment, typography, form layout, and content order as defined in the responsive requirements.
- Content may extend beyond the viewport height. The page must scroll rather than clip content or feedback.

### Email field

- The empty visual prompt is “Email address”.
- The field accepts one email address and remains a single-line control.
- The populated value remains readable and editable in default, invalid, and service-error states.
- A value wider than the available field area remains contained within the control and uses the control’s native horizontal text navigation; it must not overlap the CTA or escape the field.

### Request Access control

- The control submits the current email when enabled.
- Pointer hover may use the lighter Figma treatment.
- Keyboard focus uses a separate visible treatment and is not inferred from the hover frame.
- During submission, the control cannot initiate a duplicate request. Exact loading text or indicator is unresolved.

### Validation feedback

- The observed red outline and message appear only after an invalid submission.
- Feedback participates in normal layout and cannot cover the field, CTA, platform marks, or adjacent copy.
- Correcting the value clears the validation feedback according to `FR-007`.

### Service feedback

- Submitting, service-error, and success states are behavioral requirements even though Figma does not provide their visual designs.
- Service-error feedback is inline, preserves the form, and permits retry.
- Success feedback is inline and replaces the complete form; it does not redirect or automatically start another journey.

### Platform marks

- The four marks remain visible as credibility reinforcement.
- They are not interactive and duplicate platform information already present in the supporting sentence.
- Their responsive position and scale follow the Figma examples.

## State model

| State | Entry condition | Required presentation and behavior | Exit |
|---|---|---|---|
| Default empty | Initial page load with no entered value | Empty email control, default CTA, no feedback | Visitor enters text or submits |
| Populated | Visitor enters text before a failed request | Entered value is visible; no state is implied for the CTA | Visitor edits or submits |
| CTA hover | Pointer rests over enabled CTA | Lighter green hover treatment; no field-state change | Pointer leaves or submission begins |
| Field or CTA focus | Keyboard or programmatic focus reaches a control | A distinct visible focus indicator identifies the focused control | Focus moves |
| Validation error | Submission value is empty or invalid | Request is blocked; value is preserved; red outline and observed validation message appear | Value becomes valid or another state replaces it |
| Submitting | A valid submission begins | Submitted value is preserved; duplicate submission is prevented; progress is conveyed accessibly | Affirmative success or service error |
| Service error | The pending request is not confirmed | Form is operable; value is preserved; recoverable inline failure feedback appears | Visitor edits or retries |
| Success | The service affirmatively confirms the request | Form is replaced by inline confirmation; visitor remains on the page | No further action is defined |

**Not applicable:** There is no collection empty state, selected state, expanded/collapsed state, or authenticated state in the selected scope.

## Content and data requirements

| ID | Requirement | Source |
|---|---|---|
| `CONTENT-001` | The initial page **must** use the observed heading, supporting text, field prompt, CTA label, and invalid-feedback text unless approved product copy supersedes them. | Figma `102:203`, `102:486`, `102:326`, `102:828`, `102:1111` |
| `CONTENT-002` | The visible platform group **must** contain Spotify, Apple Podcasts, Google Podcasts, and Pocket Casts in the order shown for the active Figma layout until an approved platform list supersedes it. | Mark groups `102:215`, `102:495`, `102:335` |
| `CONTENT-003` | Success copy **must** clearly confirm receipt of the request, and service-error copy **must** clearly state that the request was not completed and can be retried. Exact wording **must** be approved before implementation planning is finalized. | Approved success/failure decisions; missing Figma states |

### Conceptual data

- The page collects one email string.
- Leading and trailing whitespace are ignored for validation and the submitted value.
- No other visitor profile data is required by this scope.
- The request service may return pending, affirmative success, or failure from the page’s perspective.
- Storage, deduplication across separate visits, confirmation emails, retention, deletion, and consent are not specified.

## Validation and error handling

1. The visitor may type freely without an initial error.
2. Submission normalizes leading and trailing whitespace and validates one email address.
3. Empty or invalid input does not initiate a request.
4. Invalid feedback preserves the entered value and uses the observed field outline and message.
5. After validation failure, a corrected valid value clears the local error during editing.
6. Valid input initiates one pending request.
7. Pending behavior prevents duplicate submission and exposes progress to assistive technology.
8. Affirmative service success replaces the form with inline confirmation.
9. Network, timeout, or unsuccessful service outcomes restore the form, preserve the email, and provide retry.
10. A missing, ambiguous, or unrecognized response must be treated as a service error, not success.

## Responsive requirements

| ID | Requirement | Source |
|---|---|---|
| `RESP-001` | At the desktop reference width (`1440px`), the experience **must** preserve the centered maximum-width composition, left-aligned dark content surface overlapping a right-side image, inline form, platform marks after the form, and visible dot decoration. | Desktop `102:326` |
| `RESP-002` | At the tablet reference width (`768px`), the experience **must** preserve the left-aligned desktop-like hierarchy, inline form, platform marks after the form, and overlap with a narrower right-side image rather than switching to the centered mobile composition. | Tablet `102:486` |
| `RESP-003` | At the mobile reference width (`375px`), the experience **must** use a centered single column, subdued full-page image treatment, mobile typography, platform marks before the form, stacked full-width field and CTA, and no dot decoration. | Mobile `102:203` |
| `RESP-004` | Between and around the reference widths, layout-mode transitions **must** be selected by content fit and **must not** cause text, controls, feedback, marks, or imagery to collide, clip, or create page-level horizontal scrolling. The sample widths **must not** be treated as exact breakpoints without further evidence. | Three representative frames; `DESIGN.md` Responsive intent |
| `RESP-005` | Hero imagery **must** crop without distortion. Its crop, tint, and opacity **must not** reduce the legibility or operability of foreground content. | Image groups `102:204`, `102:606`, `102:446` |
| `RESP-006` | Longer copy, validation feedback, service feedback, text resizing, short viewports, and the virtual keyboard **must** be allowed to increase page height and use vertical scrolling; content **must not** be clipped to preserve a sample-frame height. | `DESIGN.md` Density and overflow; error frames |
| `RESP-007` | Above the desktop reference width, the principal composition **must** remain centered and constrained rather than expanding content measures indefinitely. | Desktop max-width evidence in `102:326` |

## Accessibility requirements

| ID | Requirement | Source |
|---|---|---|
| `A11Y-001` | The page **must** expose one main content region, one coherent primary heading, and one form with a submission control. | Design hierarchy and inferred semantic intent |
| `A11Y-002` | The green and white visual phrases in the heading **must** retain one continuous accessible name and reading order. | Heading groups `102:213`, `102:492`, `102:332` |
| `A11Y-003` | The email control **must** have a persistent programmatic label. “Email address” may appear as a prompt, but a placeholder **must not** be its only accessible label. | `DESIGN.md` Accessibility intent |
| `A11Y-004` | The email control **must** expose its email input purpose and accept one address so browsers and assistive technology can provide appropriate input support. | Request-form purpose |
| `A11Y-005` | The field and CTA **must** be operable by keyboard without a trap; Enter from the field and activation of the CTA **must** initiate the same guarded submission behavior. | Approved request journey |
| `A11Y-006` | Keyboard focus **must** be visibly distinguishable on the email field and CTA, must not rely on the pointer-hover treatment alone, and **must** meet non-text contrast requirements. | Missing Figma focus state; `FR-012` |
| `A11Y-007` | Reading and focus order **must** follow the visible content order of the active responsive layout. Responsive reordering **must not** create a misleading assistive-technology sequence. | Observed mobile versus desktop/tablet order |
| `A11Y-008` | Invalid feedback **must** be programmatically associated with the email field, expose the field as invalid, be announced when it appears, retain the user’s value, and use text in addition to color. | Error frames `102:828`, `102:1111` |
| `A11Y-009` | Submitting, service-error, and success changes **must** be communicated programmatically without requiring the visitor to discover them visually. Replacing the form on success **must** place focus on the confirmation or provide an equivalently immediate announcement. | Approved feedback behavior; missing Figma states |
| `A11Y-010` | The platform marks **must** be hidden from the accessibility tree, must not be focusable, and must not duplicate the platform names already present in supporting copy. | Approved decorative-mark decision |
| `A11Y-011` | The dot pattern **must** be ignored by assistive technology. The hero photograph **must** be ignored if confirmed decorative; if product owners identify information that the copy does not convey, it **must** instead receive concise equivalent text. | Decorative inference; unresolved image role |
| `A11Y-012` | Normal-size text **must** meet at least `4.5:1` contrast, large text at least `3:1`, and meaningful control boundaries and focus indicators at least `3:1` against adjacent colors. | WCAG-aware project goal; observed token contrasts |
| `A11Y-013` | At `200%` text resizing and at reflow equivalent to `400%` zoom on a `1280px` viewport, content and operation **must** remain available without page-level horizontal scrolling; horizontal movement inside the single-line email control is permitted. | WCAG-aware project goal; `RESP-004`, `RESP-006` |
| `A11Y-014` | The email field and CTA **must** retain a minimum target height of `44px` and sufficient width for their labels across layout modes. | Observed mobile and desktop control height |
| `A11Y-015` | No motion is required. If motion is later added to state or layout transitions, it **must** respect reduced-motion preferences and must not delay access to status information. | No motion observed in selected Figma scope |

## Non-functional requirements

No numeric performance target, browser matrix, analytics contract, privacy policy, or service-level objective is approved in the current sources. Resilience requirements that are supported by the approved product decisions are captured in `FR-008` through `FR-011`; responsive and accessibility quality requirements are captured in their dedicated sections. Unsupported targets must not be invented during implementation planning.

## Acceptance criteria

| ID | Given / When / Then | Requirements |
|---|---|---|
| `AC-001` | **Given** the page has loaded, **then** the visitor sees the Pod logo, heading, supporting copy, email request form, four platform marks, and the appropriate hero treatment in one main experience. | `FR-001`, `FR-002`, `CONTENT-001`, `CONTENT-002`, `A11Y-001`, `A11Y-002` |
| `AC-002` | **Given** no submission has been attempted, **when** the visitor leaves the field empty or types a partial address, **then** no validation error appears solely because of that editing. | `FR-005` |
| `AC-003` | **Given** an empty or syntactically invalid value, **when** the visitor submits with the CTA or Enter, **then** no request begins, the value remains, and the red invalid presentation and observed error copy appear. | `FR-003`, `FR-004`, `FR-006`, `A11Y-005`, `A11Y-008` |
| `AC-004` | **Given** a displayed validation error, **when** the visitor edits the value into a valid email, **then** the validation error clears; **when** the value becomes invalid again without submission, **then** the error stays hidden. | `FR-007` |
| `AC-005` | **Given** a value with only leading or trailing whitespace around one valid address, **when** it is submitted, **then** validation uses the trimmed address and does not reject it because of that surrounding whitespace. | `FR-004` |
| `AC-006` | **Given** a valid email, **when** submission begins, **then** one request is pending, the submitted value is retained, progress is conveyed, and repeated activation cannot create a second concurrent request. | `FR-008`, `A11Y-009` |
| `AC-007` | **Given** a pending request, **when** the service affirms success, **then** the visitor stays on the page, the complete form is replaced by an announced inline confirmation, and no redirect occurs. | `FR-009`, `CONTENT-003`, `A11Y-009` |
| `AC-008` | **Given** a pending request, **when** a network, timeout, unsuccessful, missing, or unrecognized response occurs, **then** success is not shown; the operable form and email are preserved, an announced recoverable message appears, and retry remains available. | `FR-010`, `FR-011`, `CONTENT-003`, `A11Y-009` |
| `AC-009` | **Given** a populated field, **when** neither the CTA nor field is hovered or focused, **then** no hover or focus treatment is implied; **when** keyboard focus moves between controls, **then** the focused control alone has a visible focus indicator. | `FR-012`, `A11Y-006` |
| `AC-010` | **Given** the desktop reference viewport, **then** the centered overlapping composition, inline form, marks-after-form order, image treatment, and dot decoration correspond to the desktop Figma frame. | `RESP-001`, `RESP-005`, `RESP-007` |
| `AC-011` | **Given** the tablet reference viewport, **then** the layout preserves the left-aligned overlapping composition, inline form, and marks-after-form order shown in the tablet Figma frame. | `RESP-002`, `RESP-005` |
| `AC-012` | **Given** the mobile reference viewport, **then** the centered single column, subdued background image, mobile type, marks-before-form order, stacked controls, and omitted dots correspond to the mobile Figma frame. | `RESP-003`, `RESP-005`, `A11Y-007` |
| `AC-013` | **Given** widths between the reference frames or a viewport wider than desktop, **when** the page reflows, **then** content does not collide, clip, or create page-level horizontal scrolling, and content measures do not expand indefinitely. | `RESP-004`, `RESP-007` |
| `AC-014` | **Given** a short viewport, visible feedback, longer copy, or an open virtual keyboard, **then** the page can scroll vertically and all content and controls remain reachable. | `RESP-006` |
| `AC-015` | **Given** a long email value, **when** it exceeds the visible field width, **then** it remains inside the single-line control, can be reviewed with normal caret navigation, and never overlaps the CTA or surrounding content. | `FR-002`, `RESP-004`, `A11Y-013` |
| `AC-016` | **Given** keyboard-only or screen-reader use, **then** the email field has a persistent label and input purpose, the CTA is operable, errors are associated and announced, and focus and reading order remain logical. | `A11Y-003`, `A11Y-004`, `A11Y-005`, `A11Y-007`, `A11Y-008`, `A11Y-009` |
| `AC-017` | **Given** assistive-technology navigation, **then** platform marks and dots are absent from the accessibility tree and platform marks expose no links or controls; the hero follows its confirmed decorative or informative classification. | `FR-013`, `A11Y-010`, `A11Y-011` |
| `AC-018` | **Given** text resized to `200%` or content reflow at the equivalent of `400%` zoom, **then** content and operations remain available without page-level horizontal scrolling, clipping, or overlap. | `RESP-004`, `RESP-006`, `A11Y-013` |
| `AC-019` | **Given** automated and manual visual checks, **then** text, control boundaries, and focus indicators meet their stated contrast targets, and the email field and CTA retain at least `44px` target height. | `A11Y-012`, `A11Y-014` |
| `AC-020` | **Given** motion is added after this specification, **when** reduced motion is requested, **then** nonessential motion is removed or reduced and status information remains immediate. | `A11Y-015` |

## Assumptions, open questions, and risks

### Assumptions

| ID | Assumption | Impact if false |
|---|---|---|
| `S-A01` | The page submits one email to an asynchronous request-processing service. | Submitting, service-error, retry, and success behavior would require revision. |
| `S-A02` | Standard single-email syntax validation is sufficient; product rules do not ban providers or require client-side mailbox proof. | Validation and error copy would need additional states. |
| `S-A03` | The observed mobile content order is intentional. | Mobile reading order and responsive requirements would need revision. |
| `S-A04` | Page-height growth and vertical scrolling are acceptable. | Short-viewport, feedback, and localization behavior would need a new design. |

### Open questions

| ID | Question | Impact | Must resolve |
|---|---|---|---|
| `S-OQ01` | At which content-fit thresholds should the mobile, tablet-like, and desktop layout modes transition? | Determines implementation breakpoints and intermediate-width QA. | Before Stage 5 is finalized |
| `S-OQ02` | What exact visual treatments and approved copy should represent submitting, inline success, and recoverable service error? | Affects component states, layout, announcements, and visual acceptance. | During Stage 4 and before Stage 5 is finalized |
| `S-OQ03` | Is the hero photograph purely decorative, or does it convey information not present in the copy? | Determines alternative-text behavior. | Before Stage 5 is finalized |
| `S-OQ04` | Are the photograph, font, platform marks, platform list, and distribution copy final, licensed, and brand-approved? | May change assets, layout, content, and release readiness. | Before release |
| `S-OQ05` | What request-service contract, privacy notice, consent behavior, retention policy, and confirmation-email behavior apply? | Determines integration, legal, data, security, and release work outside the present UI evidence. | Before implementation of a real submission flow |
| `S-OQ06` | Which browsers and device range are supported beyond the accessibility reflow requirement and three Figma reference widths? | Determines compatibility testing and any fallbacks. | Before Stage 5 is finalized |

### Risks

| Risk | Evidence | Impact | Required response |
|---|---|---|---|
| Missing feedback designs | Figma shows no submitting, success, or service-error frame. | Behavior could be implemented with inconsistent visual hierarchy or inaccessible announcements. | Reconcile and define these states before implementation planning is finalized. |
| Ambiguous responsive transitions | Only `375`, `768`, and `1440px` examples exist. | Intermediate widths may collide or switch modes poorly. | Select breakpoints from content-fit tests; verify intermediate widths. |
| Ambiguous combined state | Filled field and CTA hover appear together in “hover-active” examples. | Populated, hover, and focus logic could be incorrectly coupled. | Preserve the state independence required by `FR-012`. |
| Service integration unknown | No endpoint, response, privacy, or retention contract is supplied. | A visually complete UI could still have no safe production submission path. | Keep service work explicit and resolve `S-OQ05` before real integration. |
| Platform content may be outdated | The copy and marks include Google Podcasts. | Brand accuracy and approved assets may change late. | Confirm the platform list and copy before release. |
| Low-contrast visible marks | Blue 600 on Blue 950 is approximately `3.15:1`; mobile marks are small. | Decorative reinforcement may be difficult to perceive even though information is duplicated in text. | Verify rendered legibility and do not rely on marks to convey platform information. |
| Long-content growth | Figma uses fixed sample copy and field widths. | Long email values or localized copy may overflow. | Enforce contained single-line input behavior and vertical page growth. |

## Traceability matrix

| Requirement | Design section or Figma evidence | Acceptance criteria |
|---|---|---|
| `FR-001` | `DESIGN.md` Experience structure; `102:203`, `102:486`, `102:326` | `AC-001` |
| `FR-002` | Request-access form; `102:1595`, `102:1606` | `AC-001`, `AC-015` |
| `FR-003` | Inferred interaction intent | `AC-003` |
| `FR-004` | Approved validation decision | `AC-003`, `AC-005` |
| `FR-005` | Approved validation timing | `AC-002` |
| `FR-006` | Error feedback; `102:828`, `102:1111` | `AC-003` |
| `FR-007` | Approved correction behavior | `AC-004` |
| `FR-008` | Required pending behavior | `AC-006` |
| `FR-009` | Approved success behavior | `AC-007` |
| `FR-010` | Approved service-failure behavior | `AC-008` |
| `FR-011` | Approved retry behavior | `AC-008` |
| `FR-012` | Ambiguous “hover-active” examples; state-separation decision | `AC-009` |
| `FR-013` | Approved platform-mark semantics | `AC-017` |
| `CONTENT-001` | Content inventory; responsive frames and error frames | `AC-001` |
| `CONTENT-002` | `102:215`, `102:495`, `102:335` | `AC-001` |
| `CONTENT-003` | Approved feedback outcomes; missing Figma states | `AC-007`, `AC-008` |
| `RESP-001` | Desktop `102:326` | `AC-010` |
| `RESP-002` | Tablet `102:486` | `AC-011` |
| `RESP-003` | Mobile `102:203` | `AC-012` |
| `RESP-004` | `DESIGN.md` Responsive intent | `AC-013`, `AC-015`, `AC-018` |
| `RESP-005` | Image groups `102:204`, `102:606`, `102:446` | `AC-010`, `AC-011`, `AC-012` |
| `RESP-006` | Density and overflow; error frames | `AC-014`, `AC-018` |
| `RESP-007` | Desktop maximum-width relationship | `AC-010`, `AC-013` |
| `A11Y-001` | Design hierarchy | `AC-001` |
| `A11Y-002` | Heading groups `102:213`, `102:492`, `102:332` | `AC-001` |
| `A11Y-003` | Accessibility intent: persistent label | `AC-016` |
| `A11Y-004` | Email-input purpose | `AC-016` |
| `A11Y-005` | Request interaction | `AC-003`, `AC-016` |
| `A11Y-006` | Missing focus evidence; state-separation decision | `AC-009` |
| `A11Y-007` | Responsive content order | `AC-012`, `AC-016` |
| `A11Y-008` | Error frames `102:828`, `102:1111` | `AC-003`, `AC-016` |
| `A11Y-009` | Approved async feedback behavior | `AC-006`, `AC-007`, `AC-008`, `AC-016` |
| `A11Y-010` | Approved decorative-mark decision | `AC-017` |
| `A11Y-011` | Dot-pattern and hero evidence | `AC-017` |
| `A11Y-012` | Observed palette; WCAG-aware project goal | `AC-019` |
| `A11Y-013` | Responsive and accessibility intent | `AC-015`, `AC-018` |
| `A11Y-014` | Observed `44px` controls | `AC-019` |
| `A11Y-015` | No motion observed | `AC-020` |
