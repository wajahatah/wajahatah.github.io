# Spec: Portfolio Visual Redesign (iPortfolio-inspired)

Status: DRAFT — awaiting approval
Scope: non-minor, cross-file (Rule 9 spec gate)

## 1. Goal

Re-skin the existing multi-page portfolio with the visual language of the
iPortfolio/MyResume template family (hero banner, animated reveals, card
gallery, warmer/more interactive palette), while keeping the site's current
multi-page architecture — no collapse to a single scrolling page.

Decisions already confirmed with the user:
- Keep multi-page structure (not a single-scroll site).
- Merge the Projects and Activities listings into one page, **named
  "Projects"**, with **no filter tabs** — all project cards first, activity
  cards below, in the same grid.
- Add an iPortfolio-style **hero section** to the homepage (name, photo,
  rotating typed tagline).
- **Defer** stats counters and numeric skill-proficiency bars to a backlog —
  not built in this pass; revisit after the user previews the new look.
- New color palette and fonts — user asked for "something more interactive,"
  not a fixed hex; proposal below needs sign-off.
- OK to add new CDN dependencies (AOS, GLightbox, Typed.js) as needed.

## 2. Proposed palette & fonts (needs sign-off before implementation)

| Token | Value | Use |
|---|---|---|
| `--accent` | `#6C5CE7` (indigo-violet) | links, buttons, active nav, card hover borders |
| `--accent-2` | `#17C3B2` (teal) | secondary hover states, tags, icon accents |
| `--surface-dark` | `#0B1120` | hero background, dark-mode surface |
| `--surface-light` | `#F8F9FC` | page background (light mode) |
| Headings font | Poppins (Google Fonts) | h1–h4, nav brand |
| Body font | Inter (Google Fonts) | paragraphs, lists, nav links |

This replaces the current ad hoc Arial/Bootstrap-default styling and the
`#00b4d9` cyan accent. Implemented as CSS custom properties in a new
`assets/css/theme-variables.css`, consumed by the existing per-page
stylesheets (`main.css`, `index.css`, `resume.css`, `publication.css`,
`projects.css`, `nav.css`, `nav-index.css`, `dark-theme.css`) rather than a
rewrite of each file from scratch.

**If you want a different palette/fonts, say so before I start — this is the
one part of the spec that's a proposal, not a decision already made.**

## 3. Before / after

### Before
- Pages: `index.html` (About), `project.html` (Projects), `activities.html`
  (Activities), `publication.html`, `resume.html`, plus 14 pages under
  `projects/*.html` and 6 pages under `activity/*.html`.
- Nav (index/project/activities/publication/resume) lists both "Projects" and
  "Activities" as separate items.
- `index.html` has no hero section — starts directly with the photo+bio
  "About" block.
- No scroll-reveal animation library, no lightbox, no typed-text effect.
- Accent color `#00b4d9`, default Bootstrap/Arial typography.

### After
- **`index.html`**: new hero section added above the existing About content —
  name, photo, rotating typed tagline (job titles, e.g. "AI Engineer" /
  "Robotics Engineer" / "Computer Vision Engineer" — exact list to confirm
  wording with user before going live). Existing bio/social-icons block
  restyled with new palette/fonts + AOS fade-in reveals. Content/copy
  unchanged.
- **`project.html`** (title: "Projects"): becomes the single listing page.
  Current project cards stay in place; the current `activities.html` cards
  (Conferences & Workshops, Robotic Arm, Projects Expo, Student Societies
  Events, Industrial Visits, Social Work) are appended below them in the same
  grid, each still linking to its existing `activity/*.html` detail page. No
  filter/tab UI. Card sizing: **since project/activity thumbnail images vary
  in aspect ratio, cards will use a masonry-style grid (CSS columns or
  auto-flow grid) sized per image rather than a fixed uniform crop**, so tall
  or wide images aren't squeezed — this directly addresses "make sure image
  sizes don't get compromised."
- **`activities.html` deleted** (content now lives in `project.html`). The 6
  files under `activity/*.html` are **not changed** beyond inheriting the new
  shared color/font variables — their own layout/content stays as-is.
- **Nav update**: "Activities" link removed from `index.html`,
  `project.html`, `publication.html`, `resume.html`. Each nav goes from 5
  items (About / Publications / Projects / Activities / Resume) to 4 (About /
  Publications / Projects / Resume).
- **`publication.html`**: restyled (palette, fonts, card spacing, animations,
  GLightbox on award images) — content/copy unchanged.
- **`resume.html`**: restyled (palette, fonts, timeline visual polish,
  animations) — content/copy unchanged. No skill bars added in this pass.
- **`projects/*.html`** (14 detail pages, already reworked earlier in this
  project): light-touch only — inherit new accent color/fonts through shared
  CSS variables (`nav.css`, `styles.css`). No layout restructuring; the
  existing back-button + title nav and text/image/video container patterns
  stay exactly as built.
- **New dependencies**, loaded via CDN only on the pages that use them:
  - AOS (scroll-reveal) — index, project, publication, resume, project detail
    pages.
  - GLightbox (image popups) — project.html cards, publication.html award
    images.
  - Typed.js (animated hero tagline) — index.html only.
  - No Isotope (no filtering wanted), no Swiper (no testimonial carousel
    requested), no PureCounter (stats deferred).
- Existing dark/light theme toggle (`theme-switcher.js` + `dark-theme.css`)
  preserved and updated to read the new CSS variables in both modes.

## 4. Explicitly out of scope for this pass

- Stats counters (years of experience / projects / publications) — backlog.
- Numeric skill-proficiency bars — backlog.
- Any change to `activity/*.html` content or layout beyond color/font
  inheritance.
- Any change to `resume.html`/`publication.html` copy — visual only.
- Collapsing the site into a single scrolling page.
- Isotope-style category filtering on the Projects page.

## 5. Rollout / risk notes

- `activities.html` deletion is safe: it's linked from live nav on 4 pages
  (those links get removed in the same change) and from nowhere else.
- Because 14 project detail pages + 6 activity detail pages depend on shared
  CSS files (`nav.css`, `styles.css`, `mobile-project-responsive.css`),
  palette changes there must be verified across a sample of both project and
  activity detail pages, not just the main nav pages, to catch regressions
  (Rule 10 — no regressions).
- Card-grid rework on `project.html` touches `assets/css/projects.css`, which
  is also loaded by `activities.html` today (soon-to-be-deleted) — confirm no
  other page depends on `projects.css`'s current `.box` rules before changing
  them.

---

**Waiting on:** sign-off on the palette/font proposal in §2 (or your own
choice), and the exact hero tagline wording, before implementation starts.
