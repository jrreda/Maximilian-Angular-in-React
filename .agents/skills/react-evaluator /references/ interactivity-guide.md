# JavaScript & Interactivity Evaluation Guide

## Detecting Project Type

| Signal | Type |
|--------|------|
| `.jsx` / `.tsx` files, `react` in `package.json` | React |
| `vue` in `package.json`, `.vue` files | Vue |
| Plain `<script>` tags, `app.js`, `main.js` | Vanilla JS |
| `next` in `package.json` | Next.js |

---

## Vanilla JavaScript Checklist

### Script Loading
```html
<!-- ✅ Good: deferred scripts -->
<script src="app.js" defer></script>

<!-- ❌ Bad: render-blocking -->
<script src="app.js"></script> <!-- in <head> without defer -->
```

### DOM Manipulation Safety
```js
// ✅ Good: Safe DOM updates
element.textContent = userInput;

// ❌ Bad: XSS vulnerability
element.innerHTML = userInput; // Never do this with user/API data
```

### Error Handling for API Calls
```js
// ✅ Good: Full error handling
async function fetchAdvice() {
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    displayAdvice(data.slip.advice);
  } catch (err) {
    displayError('Failed to fetch advice. Please try again.');
    console.error(err);
  } finally {
    setLoading(false);
  }
}

// ❌ Bad: No error handling
async function fetchAdvice() {
  const data = await fetch('...').then(r => r.json());
  document.querySelector('.advice').textContent = data.slip.advice;
}
```

### Loading States
```js
// ✅ Good: Visual feedback during async operations
button.disabled = true;
button.textContent = 'Loading...';
// ... fetch ...
button.disabled = false;
button.textContent = 'Get Advice';
```

### Accessible Dynamic Updates
```html
<!-- ✅ Good: Announce updates to screen readers -->
<div role="status" aria-live="polite" id="advice-text">
  Your advice will appear here
</div>

<!-- For aggressive announcements (errors): -->
<div role="alert" aria-live="assertive" id="error-msg"></div>
```

---

## React Checklist

### Hooks Best Practices
```jsx
// ✅ Good: Proper useEffect with cleanup
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setData(data);
  });
  return () => { cancelled = true; };
}, []);

// ❌ Bad: Missing dependency array (infinite loop)
useEffect(() => {
  fetchData();
}); // no []
```

### State Management
```jsx
// ✅ Good: Derived state instead of redundant state
const [items, setItems] = useState([]);
const filteredItems = items.filter(item => item.active); // derived

// ❌ Bad: Redundant state
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]); // keep in sync manually?
```

### Accessibility in React
```jsx
// ✅ Good: Accessible interactive elements
<button
  onClick={handleToggle}
  aria-expanded={isOpen}
  aria-controls="menu-content"
>
  Menu
</button>

// ✅ Good: Focus management after modal open
useEffect(() => {
  if (isOpen) modalRef.current?.focus();
}, [isOpen]);

// ❌ Bad: Using div as button
<div onClick={handleClick} className="btn">Click me</div>
// Missing: keyboard handler, role, tabIndex
```

### Key Props
```jsx
// ✅ Good: Stable, unique keys
{items.map(item => <Card key={item.id} {...item} />)}

// ❌ Bad: Index as key (causes issues with reordering)
{items.map((item, i) => <Card key={i} {...item} />)}
```

---

## Common Frontend Mentor JS Challenge Patterns

### Tip Calculator / Form Input
- Validate inputs (non-negative, non-zero divisor)
- Show error states with accessible error messages
- Reset button clears all fields

### Age Calculator / Date Apps
- Handle invalid dates
- Handle future dates
- Edge cases: Feb 29 in non-leap years

### Advice Generator / API Apps
- Debounce or disable button during fetch
- Handle API rate limiting
- Show loading spinner
- Display error state

### Kanban / Todo Apps
- Local storage persistence
- Drag-and-drop with keyboard fallback
- Filter states (all / active / completed)
- Empty states

### Memory Game
- Prevent clicking matched cards
- Prevent double-clicking same card
- Track moves and time
- Accessible turn announcements

---

## Red Flags in JS Code

1. **No error handling on fetch calls** — The most common issue on API challenge solutions
2. **`innerHTML` with external data** — Security vulnerability
3. **`console.log` left in production code** — Shows unfinished cleanup
4. **Event listeners added multiple times** — Common in vanilla JS without proper cleanup
5. **No loading/disabled state on async triggers** — Users can spam-click and get race conditions
6. **Missing `aria-live` for dynamic regions** — Screen readers won't announce updates
