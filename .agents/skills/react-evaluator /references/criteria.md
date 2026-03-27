# Evaluation Criteria — Full Rubric

## 1. Semantic HTML (0–10)

| Score | Criteria |
|-------|----------|
| 9–10  | Perfect landmark usage, correct heading hierarchy, all interactive elements are native HTML, meaningful use of `<article>`, `<section>`, `<figure>`, `<time>`, etc. |
| 7–8   | Good landmark usage with minor missed opportunities (e.g., `<section>` without a heading, `<div>` where `<article>` fits) |
| 5–6   | Basic structure present but significant semantic gaps (e.g., `<header>` and `<main>` used but content semantics are mostly divs) |
| 3–4   | Mostly `<div>` soup. Only very basic semantic elements used. |
| 0–2   | No semantic HTML. Everything is `<div>` and `<span>`. |

**Key checks:**
- `<html lang="en">` present
- Single `<h1>` per page
- Heading levels not skipped (h1 → h2 → h3, not h1 → h3)
- Interactive controls are native elements (`<button>`, `<a>`, `<input>`) not `<div>` pretenders
- Lists use `<ul>`/`<ol>`/`<li>` not repetitive `<div>`s
- Images in content use `<figure>`/`<figcaption>` when captioned

---

## 2. Accessibility / A11y (0–10)

| Score | Criteria |
|-------|----------|
| 9–10  | Passes WCAG AA. All images have appropriate alt text. Full keyboard navigability. Visible focus styles. ARIA used sparingly and correctly. Color contrast passing. |
| 7–8   | Minor contrast issues or a few missing aria attributes, but functionally accessible |
| 5–6   | Some accessibility present but notable issues (missing alts, poor focus, some contrast failures) |
| 3–4   | Multiple serious issues. Hard to navigate without a mouse. |
| 0–2   | No accessibility consideration. Would fail a basic audit. |

**Key checks:**
- `alt=""` on decorative images, meaningful alt text on informative images
- `:focus-visible` styles NOT suppressed globally
- Color contrast: use mental model of WCAG AA (4.5:1 normal text, 3:1 large text)
- Buttons have accessible names (text or `aria-label`)
- Forms: `<label for="id">` paired with `<input id="id">`
- No positive tabindex values
- Skip-to-content link for longer pages
- Motion respects `prefers-reduced-motion`

---

## 3. CSS / Styling Quality (0–10)

| Score | Criteria |
|-------|----------|
| 9–10  | DRY, uses custom properties, logical layout techniques (flexbox/grid), no magic numbers, clean cascade |
| 7–8   | Mostly clean with minor redundancy or a few unexplained values |
| 5–6   | Works but has notable redundancy, inconsistency, or fragility |
| 3–4   | Hacky fixes, lots of `!important`, brittle layout |
| 0–2   | Disorganized, duplicated, broken |

**Key checks:**
- CSS custom properties used for colors, spacing, typography
- No `!important` unless justified
- No magic pixel values without comment
- `box-sizing: border-box` applied
- Logical grouping of properties (position → box model → typography → visual → misc)
- No inline styles for styling (only layout if unavoidable)
- No unused rules

---

## 4. Tailwind Usage (0–10)

*Skip and redistribute weight if Tailwind not used.*

| Score | Criteria |
|-------|----------|
| 9–10  | Idiomatic Tailwind. Responsive prefixes used. `@layer components` for repeated patterns. No arbitrary values when tokens exist. Config extended properly. |
| 7–8   | Good usage with minor anti-patterns (few magic arbitrary values, slight mixing) |
| 5–6   | Works but leans on arbitrary values, inline styles, or raw CSS too much |
| 3–4   | Tailwind is installed but barely used or constantly overridden |
| 0–2   | Tailwind misused (fighting the framework) |

**Key checks:**
- No mixing Tailwind + raw CSS for the same properties without reason
- Responsive variants used: `sm:`, `md:`, `lg:`, `xl:`
- `dark:` variants if dark mode is part of the design
- `hover:`, `focus:`, `active:` states implemented
- Component extraction with `@apply` or `@layer components` for repeated patterns
- `tailwind.config.js` extended with custom colors/fonts from the design system
- No `style=""` attributes for things Tailwind can handle

---

## 5. Responsiveness (0–10)

| Score | Criteria |
|-------|----------|
| 9–10  | Flawless across all viewports. Mobile-first. No overflow. Images scale correctly. Typography scales. |
| 7–8   | Works at main breakpoints, minor issues at edge sizes |
| 5–6   | Mobile or desktop works but not both; overflow issues |
| 3–4   | Layout breaks at mobile or has significant overflow |
| 0–2   | Fixed-width, no responsive consideration |

**Key checks:**
- `<meta name="viewport" content="width=device-width, initial-scale=1">` present
- Mobile-first CSS (min-width breakpoints) or at least functional at 375px
- No horizontal scroll at any viewport
- Images use responsive techniques: `max-width: 100%`, `srcset`, or Tailwind `w-full`
- Text doesn't overflow containers
- Touch targets ≥ 44×44px
- Flexbox/Grid wrap correctly

---

## 6. Design Fidelity (0–10)

| Score | Criteria |
|-------|----------|
| 9–10  | Pixel-perfect or near-perfect match to the design spec. All states implemented. |
| 7–8   | Very close with minor deviations in spacing or color |
| 5–6   | General layout correct but notable differences in typography, color, or spacing |
| 3–4   | Recognizable but significant departures from the design |
| 0–2   | Barely resembles the design |

**Key checks:**
- Font family, weight, and size match the style guide
- Colors from the design's style guide (check `style-guide.md` from the challenge)
- Spacing values consistent with the design
- Hover/active/focus states match the design spec
- Component states (empty, loading, error) if specified
- Attribution link present (required by Frontend Mentor)

---

## 7. JavaScript / Interactivity (0–10)

*Skip and redistribute weight if the challenge is purely static.*

| Score | Criteria |
|-------|----------|
| 9–10  | Clean, functional JS. Proper error handling. Accessible dynamic updates. Good state management. |
| 7–8   | Works correctly with minor issues (no error handling, minor edge cases missed) |
| 5–6   | Core functionality works but fragile or missing features |
| 3–4   | Partial implementation, bugs present |
| 0–2   | Non-functional or broken |

**Key checks:**
- API calls have error handling and loading states
- DOM updates use proper techniques (not `innerHTML` with user data — XSS risk)
- `aria-live` regions for dynamic content updates
- No console errors
- Event listeners cleaned up if component unmounts
- Vanilla JS: `defer` on scripts; React: hooks used correctly

---

## 8. Performance & Best Practices (0–10)

| Score | Criteria |
|-------|----------|
| 9–10  | Optimized images, deferred scripts, no render-blocking resources, semantic meta tags |
| 7–8   | Minor issues (one un-lazy image, slightly large asset) |
| 5–6   | Some obvious missed optimizations |
| 3–4   | Multiple performance issues |
| 0–2   | No performance consideration |

**Key checks:**
- `<meta name="description">` present
- Images have explicit `width` and `height` (prevents layout shift)
- `loading="lazy"` on below-fold images
- Scripts have `defer` or placed before `</body>`
- No unused CSS libraries loaded
- Favicon present
- `<title>` is descriptive

---

## 9. Code Quality & Organization (0–10)

| Score | Criteria |
|-------|----------|
| 9–10  | Consistent formatting, meaningful class names, logical file structure, no dead code |
| 7–8   | Mostly clean with minor inconsistencies |
| 5–6   | Functional but inconsistent naming, some dead code |
| 3–4   | Hard to follow, inconsistent, messy |
| 0–2   | Chaotic, unreadable |

**Key checks:**
- Consistent indentation (2 or 4 spaces, not mixed)
- Meaningful class names (BEM, utility, or component-based — consistently applied)
- No commented-out dead code
- Files organized logically
- README updated or present
- No debug `console.log` statements left in
