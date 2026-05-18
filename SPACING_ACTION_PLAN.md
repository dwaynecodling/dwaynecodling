# Spacing Consistency Action Plan

**Priority:** Grouped by impact and effort  
**Goal:** Improve visual consistency and maintainability

---

## Phase 1: Quick Wins (30 minutes) ✅ START HERE

Low-risk fixes that clean up technical debt and document decisions.

### Action 1.1: Remove Unused Margin Variables

**File:** `scss/abstracts/_variables.scss` (lines 36-38)

**Current:**
```scss
$margin-default: 24rem;
$margin-medium: calc(#{$margin-default} / 2);
$margin-small: calc(#{$margin-default} / 3);
```

**Remove these 3 lines.** They're never used in the codebase.

**Why:** Reduces clutter in variable definitions. Unused variables create confusion for future developers ("should I use this?").

**Risk:** ✅ Zero — these variables are not referenced anywhere

**Effort:** 2 minutes

---

### Action 1.2: Document Hero Asymmetrical Padding

**File:** `scss/components/_hero.scss` (line 10)

**Current:**
```scss
.hero {
  // ...
  padding: 12rem 2rem 8rem;
```

**Add comment above:**
```scss
.hero {
  // Intentional asymmetry: tall vertical padding (12rem top + 8rem bottom = 20rem total)
  // for visual impact, but narrow horizontal (2rem) to maximize content width on mobile
  padding: 12rem 2rem 8rem;
```

**Why:** Explains a non-obvious design decision. Future you (or teammates) will understand why it's asymmetrical instead of "fixing" it to be symmetric.

**Risk:** ✅ Zero — just documentation

**Effort:** 2 minutes

---

### Action 1.3: Document Post Content Spacing Rationale

**File:** `scss/pages/_post-template.scss` (line 41)

**Add comment above `.post-template__content`:**
```scss
// Post content uses tighter spacing (2.4-3.2rem) than page sections (8-12rem)
// This is intentional for readability: narrow max-width (68rem) + larger line-heights
// create natural breathing room without needing aggressive margins
.post-template__content {
  max-width: 68rem;
  margin: 0 auto;
  // ...
}
```

**Why:** Same rationale as 1.2—documents the intentional design choice.

**Risk:** ✅ Zero — documentation only

**Effort:** 2 minutes

---

## Phase 2: Medium Effort — Responsive Fixes (2-3 hours) ⭐ RECOMMENDED

These fixes improve the layout feel across breakpoints without restructuring the entire spacing system.

### Action 2.1: Make Hero Padding Responsive

**File:** `scss/components/_hero.scss` (line 10)

**Current (all breakpoints):**
```scss
padding: 12rem 2rem 8rem;
```

**Change to:**
```scss
// Mobile: narrow sides to preserve content width
padding: 12rem 2rem 8rem;

@media screen and (min-width: map-get($breakpoints, 'breakpoint-4')) {
  // Desktop: increase horizontal padding for visual balance
  padding: 12rem 4rem 8rem;
}

@media screen and (min-width: map-get($breakpoints, 'breakpoint-7')) {
  // Large desktop: additional breathing room
  padding: 12rem 6rem 8rem;
}
```

**Why:** On mobile, 2rem padding is tight but necessary. On desktop (992px+), you can afford more horizontal breathing room without cramping the content.

**Visual Impact:** Hero will feel more spacious on large screens, tighter on mobile (appropriate for each).

**Risk:** ⚠️ Low — affects only hero, but touches visual hierarchy. Test on multiple screens.

**Effort:** 15 minutes

---

### Action 2.2: Make Post Content Spacing Responsive

**File:** `scss/pages/_post-template.scss` (lines 54-59)

**Current (all breakpoints):**
```scss
p {
  font-size: 1.8rem;
  line-height: 3.2rem;
  color: rgba(244, 237, 224, 0.8);
  margin-bottom: 2.4rem;
}
```

**Change to:**
```scss
p {
  font-size: 1.8rem;
  line-height: 3.2rem;
  color: rgba(244, 237, 224, 0.8);
  margin-bottom: 2.4rem; // Mobile: tight spacing works with narrow content

  @media screen and (min-width: map-get($breakpoints, 'breakpoint-7')) {
    margin-bottom: 3.2rem; // Desktop: more breathing room for wide screens
  }
}
```

**Also update first paragraph:**
```scss
> p:first-of-type {
  font-size: 2rem;
  line-height: 3.6rem;
  color: $color-cream;
  font-weight: 400;
  margin-bottom: 3.2rem; // Mobile

  @media screen and (min-width: map-get($breakpoints, 'breakpoint-7')) {
    margin-bottom: 4rem; // Desktop
  }
}
```

**And headings in post content:**
```scss
h2, h3, h4 {
  font-family: 'Playfair Display', Georgia, serif;
  color: $color-cream;
  margin-top: 5.6rem;
  margin-bottom: 1.6rem;
  line-height: 1.25;

  @media screen and (min-width: map-get($breakpoints, 'breakpoint-7')) {
    margin-top: 7.2rem; // More space before headings on large screens
  }
}
```

**Why:** Post content feels cramped on 1200px+ screens with 2.4rem paragraph spacing. Responsive scaling makes it breathe on desktop while keeping mobile compact.

**Visual Impact:** Reads better on large screens, doesn't change mobile experience.

**Risk:** ⚠️ Low — only affects post content, isolated component.

**Effort:** 20 minutes (multiple changes in same file)

---

### Action 2.3: Consolidate Breakpoint Transitions to bp-4

**Currently:** Spacing changes scatter across bp-2, bp-4, bp-6, bp-8  
**Goal:** Unify most transitions at a single breakpoint for cleaner responsive behavior

**Key changes:**

**File:** `scss/layout/_grid.scss` (lines 9-10)

Change grid gap transition from bp-8 (82em) to bp-4 (62em):
```scss
.grid--list-of-3 {
  border-bottom: .1rem solid rgba(200,133,58,0.15);
  grid-gap: 4rem;

  @media screen and (min-width: map-get($breakpoints, 'breakpoint-4')) {  // Changed from bp-8
    grid-gap: 9rem;
  }
}
```

Change grid info margins from bp-6 (75em) to bp-4 (62em):
```scss
.grid__info {
  &:last-child {
    margin-bottom: 6rem;

    @media screen and (min-width: map-get($breakpoints, 'breakpoint-4')) {  // Changed from bp-6
      margin-bottom: 12rem;
    }
  }
}
```

**Why:** All major layout shifts happen at bp-4. Consolidating here creates a unified breakpoint where:
- Grid gaps increase
- Section margins increase
- Grid columns shift to 2-column layout
- Everything scales together

**Visual Impact:** Layout feels more coordinated at breakpoints. Less scattered transitions.

**Risk:** ⚠️ Medium — grid gaps change at different point, could affect card layout spacing on tablets. Test at breakpoint-4 (992px).

**Effort:** 15 minutes (2 file edits)

---

## Phase 3: Major Refactoring (Not Recommended Yet) 🚀

If you want full standardization across the entire site.

### Action 3.1: Create Standardized Spacing Scale

Define semantic spacing tiers to replace all hardcoded values:

```scss
// In _variables.scss, add:
$spacing-xs:   0.5rem;  // 8px — tight spacing
$spacing-sm:   1rem;    // 16px — small gaps
$spacing-md:   1.5rem;  // 24px — breathing room
$spacing-lg:   2.4rem;  // 38px — standard vertical
$spacing-xl:   3.2rem;  // 51px — larger gaps
$spacing-2xl:  4.8rem;  // 77px — major sections
$spacing-3xl:  6.4rem;  // 102px — section separation
$spacing-4xl:  8rem;    // 128px — hero, large sections
$spacing-5xl:  12rem;   // 192px — top-level breaks
```

Then systematically replace:
- `2rem` → `$spacing-sm` (1rem) or `$spacing-sm * 2`
- `3rem` → `$spacing-xl` 
- `6rem` → `$spacing-4xl / 1.33` or new `$spacing-lg-xl`
- etc.

**Impact:** Global consistency, easier to adjust spacing universally

**Risk:** ⚠️ High — affects entire site, extensive refactoring required

**Effort:** 8+ hours (systematic replacement + testing)

**Recommendation:** ⏸️ **Skip for now.** The audit shows your spacing is mostly intentional. Full standardization isn't necessary unless you're redesigning the entire site.

---

## Recommended Execution Order

### Week 1: Quick Wins (Phase 1) — Do These
```
[ ] 1.1: Remove unused margin variables (2 min)
[ ] 1.2: Document hero asymmetry (2 min)
[ ] 1.3: Document post spacing rationale (2 min)
```
**Time:** 6 minutes  
**Impact:** Cleans up codebase, documents decisions  
**Risk:** Zero

---

### Week 1-2: Responsive Improvements (Phase 2) — Recommended
```
[ ] 2.1: Make hero padding responsive (15 min)
[ ] 2.2: Make post content spacing responsive (20 min)
[ ] 2.3: Consolidate breakpoint transitions (15 min)
[ ] Visual testing across all breakpoints (30 min)
```
**Time:** ~80 minutes  
**Impact:** Improved visual flow on mobile and desktop  
**Risk:** Low (isolated changes)

---

### Future: Full Standardization (Phase 3) — Only if Redesigning
Do this if you decide to redesign the entire site or restructure the spacing system.

---

## Testing Checklist (After Each Phase)

### Phase 1 (Quick Wins)
- [ ] No compiler errors
- [ ] No visual changes expected

### Phase 2 (Responsive Fixes)
- [ ] Hero spacing looks good at 375px (mobile)
- [ ] Hero spacing looks good at 992px (bp-4)
- [ ] Hero spacing looks good at 1280px (bp-7)
- [ ] Post content reads well on mobile
- [ ] Post content reads well on desktop (1200px+)
- [ ] Grid transitions look smooth at bp-4
- [ ] No spacing inconsistencies between pages

### Visual Breakpoints to Test
- **Mobile:** 375px (iPhone)
- **Tablet:** 768px (iPad)
- **Desktop:** 992px (bp-4, major transition)
- **Large:** 1280px (bp-7, full desktop)
- **4K:** 1920px (ultra-wide)

---

## Summary

| Phase | Changes | Time | Risk | Do Now? |
|-------|---------|------|------|---------|
| 1: Quick Wins | Remove unused vars, add comments | 6 min | None | ✅ YES |
| 2: Responsive | Hero, post content, breakpoints | 80 min | Low | ✅ YES |
| 3: Full Standardization | Create spacing scale, refactor all | 8+ hrs | High | ❌ Later |

**Recommendation:** Do Phase 1 + 2 now (total ~90 minutes). This improves the layout without major refactoring. Revisit Phase 3 if you redesign the site.

---

## Ready to Implement?

Let me know if you want me to:
1. **Implement Phase 1** (quick wins) — takes 5 minutes
2. **Implement Phase 1 + 2** (responsive improvements) — takes ~90 minutes
3. **Start with visual testing** first to confirm issues before implementing
4. **Something else** — adjust the plan based on your priorities
