# Evaluation Criteria — Angular-to-React Conversion

Full rubric for each of the 8 dimensions. Use these to calibrate scores consistently.

---

## Table of Contents
1. [Angular Anti-Patterns Removed](#1-angular-anti-patterns-removed)
2. [Idiomatic React Patterns](#2-idiomatic-react-patterns)
3. [State Management](#3-state-management)
4. [Side Effects & Lifecycle](#4-side-effects--lifecycle)
5. [TypeScript Quality](#5-typescript-quality)
6. [Component Structure](#6-component-structure)
7. [Routing & Navigation](#7-routing--navigation)
8. [Performance Considerations](#8-performance-considerations)

---

## 1. Angular Anti-Patterns Removed

**Weight: 20%** — The most critical dimension. Angular and React are philosophically different; leftover Angular patterns break React's model.

### Score guide

| Score | Meaning |
|-------|---------|
| 9–10 | Zero Angular patterns. Code looks like it was written in React from scratch. |
| 7–8 | Minor remnants (e.g., a misplaced interface name ending in `Component`, a comment referencing `ngOnInit`) — no functional impact |
| 5–6 | Some patterns present but not breaking (e.g., a service-style class that isn't used as a class, lifecycle method names as regular functions) |
| 3–4 | Functional Angular patterns remain (class-based component, `@Input` decorator, `ngOnInit` as a method name with wrong call pattern) |
| 0–2 | Code is essentially Angular translated line-by-line. Class components with lifecycle methods, decorators, NgModule-style imports still present. |

### Common Angular anti-patterns to flag

**Decorators carried over (❌ blocking)**
```ts
// BAD — Angular decorators have no meaning in React
@Component({ selector: 'app-user', template: '...' })
export class UserComponent { }

@Injectable({ providedIn: 'root' })
export class UserService { }

@Input() name: string = '';
@Output() clicked = new EventEmitter();
```

**NgModule / barrel patterns**
```ts
// BAD — NgModule concept doesn't exist in React
@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule],
})
export class UserModule { }
```

**Angular template syntax in JSX**
```tsx
// BAD — Angular-style binding syntax leaking into JSX
<input [(ngModel)]="name" />          // two-way binding
<div *ngIf="show">...</div>           // structural directive
<li *ngFor="let item of items">...</li>
<p [class.active]="isActive">...</p>  // property binding
```

**Service-as-class pattern (not converted to hook or context)**
```ts
// BAD — a service that wasn't converted
export class UserService {
  private users: User[] = [];
  getUsers() { return this.users; }
}
// Used directly: new UserService().getUsers() — wrong in React
```

**RxJS subjects not converted**
```ts
// BAD — raw Observables/Subjects left in React code
private subject = new Subject<string>();
this.subject.next('value');
// Should be: useState, useRef, or custom hook
```

**Pipe classes**
```ts
// BAD — Angular Pipe as class
@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(value: Date): string { ... }
}
// Should be: a plain utility function
```

**`ngOnInit` / `ngOnDestroy` as class methods**
```ts
// BAD — Angular lifecycle as class methods
class MyComponent {
  ngOnInit() { this.loadData(); }
  ngOnDestroy() { this.subscription.unsubscribe(); }
}
```

### What good looks like

```tsx
// GOOD — clean functional React component
interface UserCardProps {
  userId: string;
  onSelect: (id: string) => void;
}

export function UserCard({ userId, onSelect }: UserCardProps) {
  const { data: user } = useUser(userId); // custom hook, not service
  return <div onClick={() => onSelect(userId)}>{user?.name}</div>;
}
```

---

## 2. Idiomatic React Patterns

**Weight: 20%** — React has a distinct philosophy: composition, hooks, unidirectional data flow. This dimension checks whether the code *thinks* in React.

### Score guide

| Score | Meaning |
|-------|---------|
| 9–10 | Reads like idiomatic React written by an experienced dev. Custom hooks for logic, proper composition, clean props API. |
| 7–8 | Mostly idiomatic with minor style preferences (e.g., could extract a hook but didn't) |
| 5–6 | Functional but awkward — e.g., passing many props that should be context, not using hooks correctly |
| 3–4 | Multiple non-idiomatic patterns — class components, manual DOM manipulation, missing hooks |
| 0–2 | Component model not understood. State mutated directly, class-only components, no hook usage. |

### Key checks

**Functional components (not class-based)**
```tsx
// BAD — class component (Angular conversion often lands here)
class Counter extends React.Component<Props, State> {
  state = { count: 0 };
  render() { return <div>{this.state.count}</div>; }
}

// GOOD
function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);
  return <div>{count}</div>;
}
```

**Custom hooks for reusable logic**
```tsx
// BAD — logic duplicated across components or inlined everywhere
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => { fetch('/api/users').then(...).then(setUsers); }, []);
  // ... same pattern in 3 other components
}

// GOOD — extracted to a custom hook
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => { ... }, []);
  return users;
}
```

**Event handling**
```tsx
// BAD — Angular-style event object usage
<button onClick={(e) => { this.handleClick(e); }}>Click</button>

// GOOD
<button onClick={handleClick}>Click</button>
// or inline for simple cases:
<button onClick={() => setCount(c => c + 1)}>+</button>
```

**Composition over prop-drilling or inheritance**
```tsx
// BAD — deeply passing props (prop drilling)
<A user={user} onUpdate={onUpdate} theme={theme} locale={locale} />
// A passes to B passes to C...

// BETTER — context or component composition
<ThemeProvider><A /></ThemeProvider>
// or render props / children composition
```

**No direct DOM manipulation**
```tsx
// BAD — jQuery-style or Angular Renderer2 style
document.getElementById('myEl').style.display = 'none';

// GOOD — React state drives the DOM
const [visible, setVisible] = useState(true);
return visible ? <div>...</div> : null;
```

---

## 3. State Management

**Weight: 15%**

### Score guide

| Score | Meaning |
|-------|---------|
| 9–10 | Right tool for each state scenario. Local state local, shared state in context or store, derived state computed. |
| 7–8 | Correct tools used but minor over/under-engineering |
| 5–6 | Works but misses obvious improvements (e.g., `useState` for complex state that needs `useReducer`) |
| 3–4 | State issues that cause bugs or stale reads |
| 0–2 | State mutated directly, class-based state, no React state system used |

### Key checks

**`useState` correctness**
```tsx
// BAD — state mutation (doesn't trigger re-render)
const [items, setItems] = useState<Item[]>([]);
items.push(newItem); // direct mutation!

// GOOD
setItems(prev => [...prev, newItem]);
```

**`useReducer` for complex state**
```tsx
// BAD — many interdependent useState calls (common Angular service translation)
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);
// These 3 change together — error-prone

// GOOD — useReducer for related state
const [state, dispatch] = useReducer(fetchReducer, { loading: false, data: null, error: null });
```

**Derived state (not duplicated state)**
```tsx
// BAD — storing derived data in state
const [items, setItems] = useState<Item[]>([]);
const [filteredItems, setFilteredItems] = useState<Item[]>([]); // derived!

// GOOD
const [items, setItems] = useState<Item[]>([]);
const [filter, setFilter] = useState('');
const filteredItems = useMemo(() => items.filter(i => i.name.includes(filter)), [items, filter]);
```

**No stale closure bugs**
```tsx
// BAD — stale state in async callback
const [count, setCount] = useState(0);
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // stale: always reads initial count
  }, 1000);
  return () => clearInterval(id);
}, []); // missing dep, or should use functional update

// GOOD
setCount(prev => prev + 1); // functional update avoids stale closure
```

---

## 4. Side Effects & Lifecycle

**Weight: 15%**

### Score guide

| Score | Meaning |
|-------|---------|
| 9–10 | All `useEffect`s have correct deps, cleanup functions present where needed, no memory leaks |
| 7–8 | Minor dep array issues that don't cause visible bugs |
| 5–6 | Missing cleanup or stale deps that could cause bugs under certain conditions |
| 3–4 | Clear bugs: missing deps, no cleanup for subscriptions/timers, effects on every render |
| 0–2 | Effects not used at all where needed, or used incorrectly everywhere |

### Key checks

**Dependency array correctness**
```tsx
// BAD — missing dependency (stale closure bug)
useEffect(() => {
  fetchUser(userId); // userId changes but effect won't re-run
}, []); // should be [userId]

// BAD — missing dep on function
useEffect(() => {
  loadData(); // loadData is defined outside and changes
}, []); // should include loadData or stabilize it with useCallback
```

**Cleanup functions**
```tsx
// BAD — memory leak: no cleanup
useEffect(() => {
  const subscription = someObservable.subscribe(handler);
  // no return — subscription lives forever
}, []);

// GOOD
useEffect(() => {
  const subscription = someObservable.subscribe(handler);
  return () => subscription.unsubscribe(); // cleanup
}, []);

// BAD — no abort for fetch
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData);
  // component might unmount before fetch completes
}, [id]);

// GOOD
useEffect(() => {
  const controller = new AbortController();
  fetch('/api/data', { signal: controller.signal })
    .then(r => r.json()).then(setData)
    .catch(e => { if (e.name !== 'AbortError') setError(e); });
  return () => controller.abort();
}, [id]);
```

**Effects not used for synchronous derived state**
```tsx
// BAD — effect for derived state (common Angular service subscription translation)
const [count, setCount] = useState(0);
const [doubled, setDoubled] = useState(0);
useEffect(() => { setDoubled(count * 2); }, [count]); // unnecessary effect

// GOOD
const doubled = count * 2; // or useMemo if expensive
```

**`ngOnInit` equivalent**
```tsx
// BAD — common pattern when translator sees ngOnInit
const MyComponent = () => {
  useEffect(() => {
    // everything dumped in here without thinking about deps
  }); // missing [] — runs on every render!
```

---

## 5. TypeScript Quality

**Weight: 10%**

### Key checks

- No `any` types (especially common in Angular-to-React where the translator gives up)
- Props interface/type defined for every component
- No Angular-specific types left (`EventEmitter<T>`, `Observable<T>` used as React state, `Subject`)
- Generics used correctly where applicable
- Return types on functions that return JSX (optional but good)
- No `@ts-ignore` or `@ts-expect-error` without explanation

```tsx
// BAD
const handleData = (data: any) => { ... };
const [value, setValue] = useState<any>(null);

// GOOD
interface User { id: string; name: string; email: string; }
const [user, setUser] = useState<User | null>(null);
```

---

## 6. Component Structure

**Weight: 10%**

### Key checks

- **Single responsibility**: each component does one thing
- **Reasonable size**: aim for <150 lines per component; flag if >300
- **Props API design**: minimal, well-named props; boolean props for flags; callback props named `on[Event]`
- **No prop drilling** beyond 2 levels without context
- **Consistent export style**: named vs default (pick one, be consistent)

```tsx
// BAD — component doing too much
function UserDashboard() {
  // fetches data, manages form state, handles routing, renders 3 unrelated sections
}

// GOOD — decomposed
function UserDashboard() {
  return (
    <>
      <UserHeader />
      <UserStats />
      <UserActivity />
    </>
  );
}
```

---

## 7. Routing & Navigation

**Weight: 5%**

### Key checks

- Uses React Router (`useNavigate`, `useParams`, `<Link>`) OR Next.js conventions (file routing, `useRouter`)
- No Angular Router remnants (`RouterModule`, `ActivatedRoute` as class)
- Route guards converted to React patterns (loader functions, wrapper components, or middleware)
- Lazy loading done with `React.lazy` + `Suspense` (not Angular's `loadChildren`)

```tsx
// BAD — Angular Router pattern
import { ActivatedRoute } from '@angular/router';
const route = new ActivatedRoute();
const id = route.snapshot.paramMap.get('id');

// GOOD — React Router
import { useParams } from 'react-router-dom';
const { id } = useParams<{ id: string }>();

// GOOD — Next.js App Router
// app/users/[id]/page.tsx — params passed as props
export default function UserPage({ params }: { params: { id: string } }) { ... }
```

---

## 8. Performance Considerations

**Weight: 5%**

### Key checks

- List items have stable `key` props (not array index unless list is static)
- `useMemo` used for expensive computations (not for everything)
- `useCallback` used for functions passed as props to memoized children
- No unnecessary `React.memo` wrapping
- No re-creating objects/arrays on every render in JSX props

```tsx
// BAD — new object on every render (breaks memo/deps)
<Component style={{ color: 'red' }} />  // new object each render
<Component onClick={() => doThing()} /> // new function each render (if Component is memoized)

// GOOD
const style = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback(() => doThing(), []);

// BAD — index as key on dynamic list
{items.map((item, i) => <Item key={i} {...item} />)}

// GOOD
{items.map(item => <Item key={item.id} {...item} />)}
```

---

## Grade Scale

| Score | Grade | Meaning |
|-------|-------|---------|
| 90–100 | A | Excellent conversion. Production-ready. |
| 80–89 | B | Good conversion with minor issues. |
| 70–79 | C | Functional but needs improvement before production. |
| 60–69 | D | Several issues. Significant rework needed. |
| <60 | F | Fundamental problems. Consider re-doing conversion from scratch. |