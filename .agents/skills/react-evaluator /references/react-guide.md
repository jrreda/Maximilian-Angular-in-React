# React Evaluation Guide

## Detecting a React Project

| Signal | Notes |
|--------|-------|
| `react` in `package.json` dependencies | Core signal |
| `.jsx` or `.tsx` file extensions | Component files |
| `import React from 'react'` or `import { useState } from 'react'` | Hook/API imports |
| `ReactDOM.createRoot(...)` in `main.jsx` / `index.jsx` | Vite/CRA entry point |
| `next` in `package.json` | Next.js (React superset) |

For Vite + React projects, key files to fetch from GitHub:
- `src/App.jsx`, `src/main.jsx`
- `src/components/` directory
- `tailwind.config.js` / `vite.config.js`

---

## Component Architecture

### Component Responsibility
```jsx
// ✅ Good: Single responsibility, focused components
function RatingCard({ onSubmit }) { ... }
function ThankYouCard({ rating }) { ... }
function App() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(null);
  return submitted
    ? <ThankYouCard rating={rating} />
    : <RatingCard onSubmit={(r) => { setRating(r); setSubmitted(true); }} />;
}

// ❌ Bad: Monolithic App component with all logic and markup
function App() {
  // 200 lines of everything mixed together
}
```

### Props & PropTypes
```jsx
// ✅ Good: Clear prop interfaces
function Card({ title, description, imageUrl, onSelect, isSelected = false }) { ... }

// ✅ Better: TypeScript or PropTypes for shared components
Card.propTypes = {
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

// ❌ Bad: Prop drilling 3+ levels deep without context
<App>
  <Parent theme={theme}>
    <Child theme={theme}>
      <GrandChild theme={theme} /> {/* use Context instead */}
    </Child>
  </Parent>
</App>
```

---

## Hooks Best Practices

### useState
```jsx
// ✅ Good: Related state grouped logically
const [formData, setFormData] = useState({ name: '', email: '' });

// ✅ Good: Functional updates for derived state
setCount(prev => prev + 1); // safe with closures

// ❌ Bad: Unnecessary state for derived values
const [fullName, setFullName] = useState(''); // if it's just `${first} ${last}`
const fullName = `${firstName} ${lastName}`; // derive it instead
```

### useEffect
```jsx
// ✅ Good: Proper cleanup and dependency array
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => { if (err.name !== 'AbortError') setError(err); });
  return () => controller.abort();
}, [url]); // url in deps because it's used inside

// ❌ Bad: Missing dependencies (stale closure)
useEffect(() => {
  fetchUser(userId); // userId used but not in deps
}, []); // will use stale userId

// ❌ Bad: No cleanup on subscriptions/timers
useEffect(() => {
  const id = setInterval(tick, 1000);
  // missing: return () => clearInterval(id);
}, []);
```

### useCallback / useMemo
```jsx
// ✅ Good: Stabilize callbacks passed to child components
const handleSelect = useCallback((id) => {
  setSelected(id);
}, []); // stable reference

// ✅ Good: Memoize expensive computations
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// ❌ Bad: Premature optimization — don't wrap everything
const add = useCallback((a, b) => a + b, []); // pointless
```

### Custom Hooks
```jsx
// ✅ Good: Extract reusable stateful logic
function useAdvice() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      setAdvice(data.slip.advice);
    } catch {
      setError('Could not fetch advice.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAdvice(); }, [fetchAdvice]);
  return { advice, loading, error, refetch: fetchAdvice };
}
```

---

## Accessibility in React

### Event Handling
```jsx
// ✅ Good: Native button — keyboard works automatically
<button onClick={handleClick}>Submit</button>

// ❌ Bad: div/span as interactive element
<div onClick={handleClick}>Submit</div>
// Missing: role="button", tabIndex={0}, onKeyDown handler

// If you must use a non-button:
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleClick() : null}
>
  Submit
</div>
```

### Dynamic Content & ARIA
```jsx
// ✅ Good: Announce dynamic updates to screen readers
<div role="status" aria-live="polite">
  {loading ? 'Loading advice...' : advice}
</div>

// ✅ Good: Toggle aria-expanded for accordions/menus
<button aria-expanded={isOpen} aria-controls="panel-1" onClick={toggle}>
  FAQ Item
</button>
<div id="panel-1" hidden={!isOpen}>...</div>
```

### Focus Management
```jsx
// ✅ Good: Restore focus after modal close
const triggerRef = useRef(null);
function closeModal() {
  setIsOpen(false);
  triggerRef.current?.focus(); // return focus to trigger
}

// ✅ Good: Trap focus inside modal
// Use a library like focus-trap-react, or implement manually
```

### Images & Icons
```jsx
// ✅ Good: Meaningful alt text
<img src={avatar} alt={`${user.name}'s avatar`} />

// ✅ Good: Decorative image
<img src={divider} alt="" role="presentation" />

// ✅ Good: Icon-only button
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

---

## Performance Patterns

### Avoiding Unnecessary Re-renders
```jsx
// ✅ Good: Memoize pure components
const RatingButton = memo(({ value, selected, onClick }) => (
  <button
    className={selected ? 'selected' : ''}
    onClick={() => onClick(value)}
  >
    {value}
  </button>
));

// ✅ Good: Key prop placed correctly
{items.map(item => <Item key={item.id} {...item} />)}

// ❌ Bad: Object/array literals as props (new reference each render)
<Component style={{ margin: 0 }} /> // new object every render
<Component options={['a', 'b']} />  // new array every render
```

### Code Splitting
```jsx
// ✅ Good: Lazy load heavy or conditionally rendered components
const HeavyChart = lazy(() => import('./HeavyChart'));
<Suspense fallback={<Spinner />}>
  <HeavyChart />
</Suspense>
```

---

## Common React Mistakes in Frontend Mentor Projects

| Mistake | Fix |
|---------|-----|
| Everything in `App.jsx` | Split into focused components |
| State mutation (`arr.push(item)`) | Immutable updates: `[...arr, item]` |
| Missing `key` props on lists | Always use stable `id` as key |
| `useEffect` with missing deps | Follow exhaustive-deps eslint rule |
| No loading/error states on fetch | Three-state model: loading / success / error |
| Inline event handlers causing re-renders | `useCallback` for stable references |
| CSS modules ignored in favor of inline styles | Use CSS modules or Tailwind consistently |
| No `aria-live` on dynamic output | Wrap in `role="status"` div |
| Direct DOM manipulation with `document.querySelector` | Use `useRef` instead |
| Setting state in render (not in effect/handler) | Move to `useEffect` or event handler |

---

## React-Specific Scoring Adjustments

When evaluating a React project, adjust these dimension checks:

**Semantic HTML**: JSX compiles to HTML, so the same rules apply. Check the rendered output. `Fragment` usage (`<>`) to avoid unnecessary `<div>` wrappers is a plus.

**Code Quality**: React projects get extra credit for:
- Logical component decomposition
- Custom hooks for reusable logic
- Consistent file/folder naming (`PascalCase` for components, `camelCase` for hooks)
- No prop drilling beyond 2 levels

**Performance**: Check for unnecessary re-renders (missing `memo`, unstable prop references), and whether images use `<img>` with proper attributes or a framework image component.
