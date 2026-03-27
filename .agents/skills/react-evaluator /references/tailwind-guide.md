# Tailwind CSS Evaluation Guide

## Detecting Tailwind Projects

Look for these signals in the project files:
- `tailwind.config.js` or `tailwind.config.ts` in the root
- `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;` in a CSS file
- Class names like `flex`, `items-center`, `text-gray-500`, `p-4`, `rounded-lg` in HTML
- `"tailwindcss"` in `package.json` dependencies

---

## Tailwind Best Practices Checklist

### Configuration
```js
// ✅ Good: Extend theme with design tokens from the challenge
module.exports = {
  theme: {
    extend: {
      colors: {
        'soft-blue': 'hsl(215, 51%, 70%)',
        'cyan': 'hsl(178, 100%, 50%)',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      }
    }
  }
}

// ❌ Bad: Using arbitrary values for every design token
// class="text-[hsl(215,51%,70%)]" — use a config token instead
```

### Responsive Design
```html
<!-- ✅ Good: Mobile-first responsive design -->
<div class="flex flex-col md:flex-row gap-4 md:gap-8">

<!-- ❌ Bad: No responsive variants -->
<div class="flex flex-row gap-8"> <!-- breaks on mobile -->
```

### Component Extraction
```css
/* ✅ Good: Extract repeated patterns */
@layer components {
  .card {
    @apply bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow;
  }
  .btn-primary {
    @apply bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }
}

/* ❌ Bad: Repeating 8 utility classes on every card */
```

### Avoiding Common Anti-Patterns

| Anti-Pattern | Better Approach |
|---|---|
| `style="color: #1a1a2e"` | Add to `tailwind.config.js` and use `text-[color-name]` |
| `!important` classes | Restructure specificity |
| Mixing raw CSS for layout AND Tailwind for layout | Pick one approach consistently |
| `class="w-[347px]"` for fixed widths | Use `max-w-sm`, `max-w-md` or responsive containers |
| No hover/focus states | `hover:`, `focus:`, `focus-visible:` variants |
| Inline `style` for dark mode | `dark:` variant + `darkMode: 'class'` in config |

### Interactive States
```html
<!-- ✅ Good: Full interactive states -->
<button class="
  bg-blue-600 text-white px-6 py-3 rounded-lg
  hover:bg-blue-700
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
  active:scale-95
  transition-all duration-150
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Click me
</button>

<!-- ❌ Bad: No interactive states -->
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg">
  Click me
</button>
```

### Accessibility with Tailwind
```html
<!-- ✅ Good: Screen reader utilities -->
<button class="p-2 rounded hover:bg-gray-100">
  <svg aria-hidden="true">...</svg>
  <span class="sr-only">Close menu</span>
</button>

<!-- Focus visible styles — NEVER do this: -->
/* ❌ */ button { @apply outline-none; } /* kills keyboard nav */
/* ✅ */ button { @apply focus:outline-none focus-visible:ring-2 ...; }
```

---

## Red Flags to Call Out

1. **Arbitrary values for design tokens** — If the challenge provides a `style-guide.md`, those values should be in `tailwind.config.js`, not sprinkled as `text-[hsl(220,49%,15%)]` throughout the markup.

2. **No responsive prefixes** — A card component that says `class="flex flex-row"` with no `flex-col` fallback on mobile.

3. **Mixing paradigms** — A `style.css` that has `.card { display: flex; }` AND the HTML has `class="flex"` on the same element.

4. **Ignoring the `container` utility** — Using `w-full max-w-[1440px] mx-auto` repeatedly instead of configuring and using Tailwind's built-in `container`.

5. **No `transition` utilities** — Hover states that snap without `transition` or `duration-*` feel janky.
