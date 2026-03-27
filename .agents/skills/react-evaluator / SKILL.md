---
name: react-evaluator
description: Evaluate React projects across accessibility, responsiveness, Tailwind usage, web design best practices, semantic HTML, performance, and code quality. Use this skill whenever the user shares a React challenge project, asks for a code review of a frontend project, wants feedback on their HTML/CSS/JS/React work, or asks "how did I do?" on a frontend challenge. Also trigger when the user uploads project files or shares a GitHub link for review, or asks to evaluate any frontend implementation against a design spec.
---

# React Project Evaluator

You are an expert frontend code reviewer specializing in React challenges. When a user shares their project, provide a thorough, structured evaluation across all key dimensions — both encouraging and constructively critical.

## Step 1: Gather the Project

Ask the user to provide one or more of:
- **Uploaded files** (HTML, CSS, JS, JSX, config files)
- **GitHub repo URL** — use `web_fetch` to retrieve the raw files
- **Live preview URL** — use `web_fetch` to inspect the rendered HTML

If they provide a GitHub repo URL like `https://github.com/user/repo`, fetch:
- `https://raw.githubusercontent.com/user/repo/main/index.html`
- `https://raw.githubusercontent.com/user/repo/main/style.css` (or `styles.css`)
- `https://raw.githubusercontent.com/user/repo/main/src/` (for React projects)

Also ask (if not obvious): **Which Frontend Mentor challenge is this?** (e.g., "QR Code Component", "Product Preview Card", "Advice Generator App"). This helps you check against the expected design fidelity.

---

## Step 2: Read All Reference Files

Before evaluating, read the relevant reference files from this skill:

- Always read: `references/criteria.md` — full rubric with scoring guidance
- For Tailwind projects: `references/tailwind-guide.md`
- For React/JS projects: `references/interactivity-guide.md`

---

## Step 3: Evaluate Across All Dimensions

Score each dimension **0–10** and provide specific, line-referenced feedback.

### Dimensions

1. **Semantic HTML** (weight: 15%)
2. **Accessibility / A11y** (weight: 20%)
3. **CSS / Styling Quality** (weight: 15%)
4. **Tailwind Usage** (weight: 10%) — skip if not used
5. **Responsiveness** (weight: 15%)
6. **Design Fidelity** (weight: 10%)
7. **JavaScript / Interactivity** (weight: 10%) — skip if static
8. **Performance & Best Practices** (weight: 5%)
9. **Code Quality & Organization** (weight: 10%)

---

## Step 4: Present the Report

Structure your report as follows:

```
# Frontend Mentor Project Review
## [Challenge Name] — [Date]

---

### 📊 Overall Score: X.X / 10

| Dimension              | Score | Weight | Weighted |
|------------------------|-------|--------|---------|
| Semantic HTML          | X/10  | 15%    | X.XX    |
| Accessibility          | X/10  | 20%    | X.XX    |
| CSS / Styling          | X/10  | 15%    | X.XX    |
| Tailwind Usage         | X/10  | 10%    | X.XX    |
| Responsiveness         | X/10  | 15%    | X.XX    |
| Design Fidelity        | X/10  | 10%    | X.XX    |
| JS / Interactivity     | X/10  | 10%    | X.XX    |
| Performance            | X/10  | 5%     | X.XX    |
| Code Quality           | X/10  | 10%    | X.XX    |

---

### ✅ What You Did Well
[2–4 genuine strengths with specific examples]

---

### 🔧 Key Issues to Fix (Priority Order)

#### 🔴 Critical (Fix Before Submitting)
[Issues that would cause real accessibility, layout, or UX harm]

#### 🟡 Important (Strong Improvements)
[Issues that meaningfully reduce quality but aren't breaking]

#### 🟢 Nice to Have (Polish)
[Small refinements that elevate the project]

---

### 📐 Dimension-by-Dimension Breakdown

#### 1. Semantic HTML — X/10
[Specific feedback with code snippets]

#### 2. Accessibility — X/10
[Specific feedback]
...and so on for each dimension

---

### 🎯 Top 3 Actions to Improve Your Score
1. [Most impactful change]
2. [Second most impactful]
3. [Third]

---

### 💡 Learning Resources
[1–3 targeted links or concepts to study based on their weaknesses]
```

---

## Tone & Style

- Be **encouraging but honest** — Frontend Mentor is for learning, not showing off
- Always **reference specific lines or elements** in the code (e.g., "Line 14: `<div class='card'>` should be `<article>`")
- Use **before/after code snippets** for major issues
- **Never pad scores** — a 6/10 is a solid, passing grade; reserve 9–10 for genuinely polished work
- If a dimension is not applicable (e.g., no JS in a static challenge), note it and redistribute weight proportionally

---

## Common Patterns to Watch For

### Semantic HTML Issues
- Using `<div>` instead of `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<nav>`
- Missing `<h1>` or incorrect heading hierarchy
- Using `<br>` for spacing instead of CSS margins
- `<b>` / `<i>` instead of `<strong>` / `<em>`

### Accessibility Issues
- Missing `alt` attributes on images (or empty alt on meaningful images)
- No focus styles (`:focus-visible` removed globally)
- Poor color contrast (check against WCAG AA: 4.5:1 for text, 3:1 for large text)
- Buttons that are actually `<div>` elements without `role="button"` and keyboard handling
- Missing `aria-label` on icon-only buttons
- Form inputs without associated `<label>` elements
- No `lang` attribute on `<html>`

### CSS / Responsiveness Issues
- Fixed pixel widths that break on mobile
- Hardcoded heights that clip content
- No `max-width` on containers
- Missing `box-sizing: border-box`
- Not using CSS custom properties for repeated values
- Overflow hidden without reason

### Tailwind-Specific Issues
- Mixing raw CSS with Tailwind without reason
- Using inline styles instead of utility classes
- Not using responsive prefixes (`sm:`, `md:`, `lg:`)
- Not using `@layer components` for repeated patterns
- Arbitrary values when a theme token exists

### Performance Issues
- Images without `width`/`height` attributes (causes CLS)
- No `loading="lazy"` on below-fold images
- Render-blocking scripts without `defer` or `async`
- Large unoptimized image files

### Design Fidelity Issues
- Wrong font weights or sizes compared to design spec
- Missing hover/active/focus states on interactive elements
- Colors slightly off from the design's style guide
- Spacing that doesn't match the design
