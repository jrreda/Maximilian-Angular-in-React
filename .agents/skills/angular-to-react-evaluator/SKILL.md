---
name: angular-to-react-evaluator
description: >
  Evaluates the quality of Angular-to-React project conversions. Use this skill whenever the user
  asks to evaluate, review, score, grade, or check a React project that was converted or migrated
  from Angular. Also trigger when the user says things like "did I convert this correctly",
  "review my React migration", "is this idiomatic React", "check my conversion", or "evaluate my
  Angular-to-React project". The skill produces a structured scorecard across 8 weighted dimensions
  covering correctness, idiomatic React patterns, TypeScript quality, and Angular anti-patterns.
  Always use this skill — even for partial code snippets or single components — when Angular-to-React
  evaluation is implied.
---

# Angular-to-React Evaluator

Evaluate React projects/components that were converted from Angular. Produce a structured scorecard
with dimension scores, specific findings, and actionable fixes.

## Input

The user may provide:
- A React component or file (pasted code or uploaded file)
- The original Angular source (optional but helpful for deeper comparison)
- A GitHub repo or file path
- Partial code (single component, a service conversion, etc.)

Always evaluate what's provided. If original Angular isn't supplied, infer what patterns were likely
present based on the React output.

---

## Evaluation Dimensions

Score each dimension 0–10. Read `references/criteria.md` for detailed rubrics.

| # | Dimension | Weight | What to check |
|---|-----------|--------|---------------|
| 1 | **Angular anti-patterns removed** | 20% | No leftover decorators, NgModules, services as classes with `this`, `ngOnInit`, `ngOnDestroy` in wrong form, `[(ngModel)]`, pipes as classes |
| 2 | **Idiomatic React patterns** | 20% | Correct hook usage, functional components, composition over inheritance, lifting state, proper event handling |
| 3 | **State management** | 15% | `useState`/`useReducer` used correctly, no unnecessary class-based state, derived state with `useMemo`, context used appropriately |
| 4 | **Side effects & lifecycle** | 15% | `useEffect` with correct deps array, cleanup functions, no memory leaks, data fetching patterns |
| 5 | **TypeScript quality** | 10% | Proper interfaces/types, no `any`, props typed, generics used correctly, no Angular-specific types leftover |
| 6 | **Component structure** | 10% | Single responsibility, reasonable size, props API design, children/composition, no prop drilling without context |
| 7 | **Routing & navigation** | 5% | React Router (or Next.js) used correctly, no Angular Router remnants, route params via hooks |
| 8 | **Performance considerations** | 5% | `useMemo`/`useCallback` where appropriate (not overused), keys on lists, no unnecessary re-renders |

---

## Scoring Process

1. Read `references/criteria.md` for full rubric details before scoring
2. For each dimension:
   - Identify specific code evidence (quote or reference the relevant lines)
   - Assign a score 0–10
   - List findings: ✅ good, ⚠️ improvable, ❌ wrong/missing
3. Calculate weighted total: `Σ(score × weight)`
4. Assign a letter grade: 90–100 = A, 80–89 = B, 70–79 = C, 60–69 = D, <60 = F

---

## Output Format

Always output in this exact structure:

```
## Angular-to-React Conversion Scorecard

**Project / Component:** [name]
**Overall Score:** [weighted total]/100 — Grade: [letter]

---

### Dimension Scores

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|---------|
| 1. Angular anti-patterns removed | X/10 | 20% | X.X |
| 2. Idiomatic React patterns | X/10 | 20% | X.X |
| 3. State management | X/10 | 15% | X.X |
| 4. Side effects & lifecycle | X/10 | 15% | X.X |
| 5. TypeScript quality | X/10 | 10% | X.X |
| 6. Component structure | X/10 | 10% | X.X |
| 7. Routing & navigation | X/10 | 5% | X.X |
| 8. Performance considerations | X/10 | 5% | X.X |
| **Total** | — | 100% | **XX.X** |

---

### Findings by Dimension

#### 1. Angular anti-patterns removed (X/10)
[✅/⚠️/❌ findings with specific code references]

#### 2. Idiomatic React patterns (X/10)
...

[continue for all 8 dimensions]

---

### Critical Issues (must fix)
[List only ❌ findings that score below 5 — the blocking issues]

### Top Recommendations
1. [Most impactful fix]
2. [Second most impactful fix]
3. [Third most impactful fix]

### What's Done Well
[Positive observations — be specific, not generic]
```

---

## Special Cases

**Partial code / single component**: Score all 8 dimensions but note which ones have insufficient
evidence. Don't penalize for things you can't see (e.g., routing score is N/A if no routing code
is present — mark as `N/A` and exclude from weighted total).

**No original Angular provided**: Note this at the top. Evaluate purely based on React output.
Flag patterns that *look like* direct Angular translations even without the source.

**Next.js project**: Treat Next.js file-based routing as correct for dimension 7. Note SSR
considerations if `getServerSideProps` or App Router patterns are present.

---

## Reference Files

- `references/criteria.md` — Full rubric for each dimension with examples of good/bad code
- Read it at the start of every evaluation
