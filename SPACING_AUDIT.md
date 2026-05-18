# Spacing Consistency Audit Report

**Date:** May 18, 2026  
**Status:** In Progress - Inventory Complete

---

## Executive Summary

Your site uses rem-based spacing (good foundation), but values are scattered across multiple variables and hardcoded throughout components. This creates inconsistency in visual flow between mobile and desktop. Some spacing decisions appear intentional (post content is tighter than page sections), while others seem arbitrary.

**Key Findings:**
- 30+ unique spacing values in use (0.5rem to 24rem)
- Spacing variables exist but aren't used consistently
- Mobile→desktop transitions happen at different breakpoints (scattered rather than unified)
- Grid gaps scale aggressively (3rem→9rem) while section margins scale moderately (8rem→12rem)
- Hero padding is asymmetrical (12rem top/bottom vs 2rem left/right)

---

## Part 1: Spacing Variables & Constants

### Defined Variables (`scss/abstracts/_variables.scss`)

| Variable | Value | Usage |
|----------|-------|-------|
| `$padding-small` | 2rem (32px) | Rarely used; appears in some calculations |
| `$padding-medium-1` | 3rem (48px) | Hero headings, container padding (mobile) |
| `$padding-medium-2` | 4rem (64px) | Container padding (tablet+) |
| `$padding-large` | 6rem (96px) | Hero intro, info-snippet, home section |
| `$margin-default` | 24rem (384px) | **UNUSED** - appears to be legacy |
| `$margin-medium` | 12rem (192px) | **UNUSED** - appears to be legacy |
| `$margin-small` | 8rem (128px) | **UNUSED** - appears to be legacy |
| `$base-spacing` | 1rem (16px) | Typography (h3, ul margins), page styles |

### CSS Custom Properties (`:root` in `_variables.scss`)

| Property | Mobile | Desktop (breakpoint-2+) | Desktop (breakpoint-7+) |
|----------|--------|------------------------|------------------------|
| `--container-padding` | 3rem (48px) | 6rem (96px) | 0 |
| `--container` | 120rem | — | — |
| `--heading-1` | 3.2rem | 4.8rem | — |
| `--heading-2` | 2.8rem | 3.8rem | — |
| `--heading-3` | 2.2rem | 2.8rem | — |
| `--body-text-main` | 1.6rem | 1.8rem | — |
| `--noOfColumns` | 1 | 2 (bp-3) | 3 (bp-7) |

### Breakpoint Definitions (`_variables.scss`)

**Mobile-First Scale:**
- `breakpoint-0`: 0
- `breakpoint-1`: 34em (544px)
- `breakpoint-2`: 40em (640px) ← **Primary transition: padding, heading sizes**
- `breakpoint-3`: 48em (768px) ← **Grid columns shift to 2**
- `breakpoint-4`: 62em (992px) ← **Major shift: grid gaps, section margins, layout**
- `breakpoint-6`: 75em (1200px) ← Grid info margins
- `breakpoint-7`: 80em (1280px) ← **Container padding drops to 0, 3-column grid**
- `breakpoint-8`: 82em (1312px) ← Grid list gaps
- Others (breakpoint-5, 9-12): defined but minimal use

---

## Part 2: Spacing Inventory by Component

### Sections (global structure)

**File:** `scss/base/_sectioning.scss`

| Element | Mobile | Desktop | Breakpoint | Purpose |
|---------|--------|---------|------------|---------|
| `section { margin-bottom }` | 8rem | 12rem | bp-4 | Vertical rhythm between major sections |

**Analysis:** Uniform across all sections. Scales 1.5× at bp-4 (from 992px).

---

### Navigation

**File:** `scss/layout/_navigation.scss`

| Element | Mobile | Desktop | Breakpoint | Notes |
|---------|--------|---------|------------|-------|
| `.navigation { margin-bottom }` | 2rem | 3rem | bp-4 | Space below nav |
| `.navigation__container { padding }` | 2rem | 4rem | bp-2 | Nav bar padding |
| `.navigation__container { gap }` | 1rem | 0 | bp-2 | Flex gap (closes at tablet) |

**Analysis:** Navigation scales uniformly with `--container-padding`.

---

### Hero Section

**File:** `scss/components/_hero.scss`

| Element | Mobile | Desktop | Breakpoint | Notes |
|---------|--------|---------|------------|-------|
| `.hero { padding }` | **12rem 2rem 8rem** | (same) | — | **Asymmetrical: tall vertically, narrow horizontally** |
| `.hero__subheading { margin-bottom }` | 1.6rem | (same) | — | Consistent |
| `.hero__heading { margin }` | 0 auto 3rem | (same) | — | Uses `$padding-medium-1` |
| `.hero__intro { margin }` | 0 auto 6rem | (same) | — | Uses `$padding-large` |
| `.hero__cta-group { gap }` | 1.6rem | (same) | — | Flex gap (fallback margin 0.8rem) |
| `.hero__button { padding }` | 2rem 3rem | 2.2rem 3.6rem | bp-2 | CTA button |
| `.hero__down-arrow { margin-top }` | 6rem | (same) | — | Arrow below hero |
| `.hero__social-link { margin-right }` | — | 3rem | — | Social icons (not last) |

**Analysis:** Hero is the only major section with **asymmetrical padding**. Vertical spacing is generous (12rem top + 8rem bottom = 20rem total), horizontal is tight (2rem). This appears intentional for visual hierarchy, but isn't documented.

---

### Cards

**File:** `scss/components/_cards.scss`

| Element | Mobile | Desktop | Breakpoint | Notes |
|---------|--------|---------|------------|-------|
| `.card__content { padding }` | 2rem | (same) | — | Consistent |
| `.card__date { margin-bottom }` | 1rem | (same) | — | Tight |
| `.card__header { margin-bottom }` | 1rem | (same) | — | Tight |
| `.card__text { margin-bottom }` | 3rem | (same) | — | Push text away from footer |
| `.card__read-time { padding }` | 1.6rem 0 | (same) | — | Top border with padding |

**Analysis:** Card spacing is consistent across breakpoints—good.

---

### Grid Layout

**File:** `scss/layout/_grid.scss`

| Element | Mobile | Desktop | Breakpoint | Scale |
|---------|--------|---------|------------|-------|
| `.grid--list-of-3 { grid-gap }` | 4rem | 9rem | bp-8 | **+125% increase** |
| `.grid--card-list { grid-gap }` | 3rem | 6rem | bp-4 | **+100% increase** |
| `.grid__info:last-child { margin-bottom }` | 6rem | 12rem | bp-6 | **+100% increase** |

**Analysis:** Grid gaps scale **aggressively** (roughly 2-2.25×). This is much more dramatic than section spacing (1.5×) or padding (3rem→6rem = 2×). This may be intentional for card layouts, but worth verifying.

---

### Post Template (Blog Content)

**File:** `scss/pages/_post-template.scss`

| Element | Mobile | Desktop | Breakpoint | Notes |
|---------|--------|---------|------------|-------|
| `.post-template__img-wrapper { margin-bottom }` | 6rem | (same) | — | Hero image spacing |
| `> p:first-of-type { margin-bottom }` | 3.2rem | (same) | — | **Opening paragraph is bolder** |
| `p { margin-bottom }` | 2.4rem | (same) | — | **Tighter than page sections** |
| `h2, h3, h4 { margin-top }` | 5.6rem | (same) | — | Large top margin before headings |
| `h2, h3, h4 { margin-bottom }` | 1.6rem | (same) | — | Small bottom margin after headings |
| `ul, ol { margin-bottom }` | 2.8rem | (same) | — | List spacing |
| `ul li { margin-bottom }` | 1rem | (same) | — | List item spacing |
| `blockquote { margin }` | 5rem 0 | (same) | — | Large margin around quotes |
| `blockquote { padding }` | 2.4rem 3rem | (same) | — | Internal quote padding |
| `hr { margin }` | 5.6rem 0 | (same) | — | Divider spacing |
| `img { margin }` | 3rem 0 | (same) | — | Inline image spacing |

**Analysis:** Post content spacing is **intentionally tighter** than page sections (2.4rem vs 8rem section margins). This is good for content readability/line-length. **No responsive changes** in post spacing—it's identical on mobile and desktop. This works but may feel cramped on large screens.

---

### Home Page Sections

**File:** `scss/pages/_home.scss`

| Element | Mobile | Desktop | Breakpoint | Notes |
|---------|--------|---------|------------|-------|
| `.info-snippet { padding }` | 3rem 0 6rem | (same) | — | Uses variables: `$padding-medium-1` and `$padding-large` |
| `.strength-section { margin-bottom }` | 12rem | (same) | — | **Large block separation** |
| `.strength-section__content { padding }` | 4rem 3rem | 6rem | bp-4 | **Increases on larger screens** |
| `.strength-section__heading { margin-bottom }` | 2rem | (same) | — | |
| `.strength-section__text { margin-bottom }` | 3rem | (same) | — | |
| `.strength-section__stats { padding-top }` | 2rem | (same) | — | Divider before stats |
| `.strength-section__stats { gap }` | 3rem | (same) | — | Flex gap between stat items |
| `.open-badge { margin-bottom }` | 2.4rem | (same) | — | |

**Analysis:** Home page uses consistent spacing, scales appropriately at bp-4.

---

### Filter & Pagination

**File:** `scss/components/_my-posts__filter.scss`

| Element | Mobile | Desktop | Breakpoint | Notes |
|---------|--------|---------|------------|-------|
| `.my-posts__filter { margin-bottom }` | 3rem | (same) | — | Mobile filter dropdown |
| `.my-posts__filter--desktop { margin-bottom }` | — | 12rem | bp-3+ | Desktop filter bar (large space below) |
| `.my-posts__item { margin-right }` | — | 4rem | — | Filter item spacing (not last) |
| `.my-posts__item { padding-bottom }` | — | 2rem | — | Underline animation space |
| `.posts-pagination { margin-top }` | 6rem | (same) | — | Space above pagination |
| `.posts-pagination { margin-bottom }` | 2rem | (same) | — | Space below pagination |
| `.posts-pagination { gap }` | 2rem | (same) | — | Space between page buttons |

**Analysis:** Filter/pagination spacing is moderate and consistent.

---

### Footer

**File:** `scss/layout/_footer.scss`

| Element | Mobile | Desktop | Breakpoint | Notes |
|---------|--------|---------|------------|-------|
| `.footer__top { height }` | 50vh | (same) | — | Variable height based on viewport |
| `.footer__bottom { padding }` | 2rem | 4rem | bp-2 | Scales with breakpoint-2 |
| `.footer__social-link { margin-right }` | — | 3rem | — | Social icons (not last) |

**Analysis:** Footer uses breakpoint-2 for padding, consistent with container padding.

---

## Part 3: Breakpoint Transition Analysis

### Where Spacing Changes (Mobile → Desktop)

| Breakpoint | Value | What Changes | Components Affected |
|-----------|-------|--------------|-------------------|
| **bp-2** (40em / 640px) | Primary transition | Container padding (3rem→6rem), nav padding | nav, footer |
| **bp-4** (62em / 992px) | Major layout shift | Section margins (8rem→12rem), grid gaps increase, strength section padding | sections, grids, strength section, filter |
| **bp-6** (75em / 1200px) | Fine-tuning | Grid info margins increase | grid |
| **bp-8** (82em / 1312px) | Minor adjustment | List-of-3 grid gaps increase | grid |
| **bp-7** (80em / 1280px) | Desktop cleanup | Container padding drops to 0 | container |

### Consistency Score

- **Navigation/Footer:** ✅ Uses `--container-padding`, scales at bp-2
- **Sections:** ✅ Uniform `8rem→12rem` at bp-4
- **Grids:** ⚠️ Multiple different breakpoints (bp-4, bp-6, bp-8) — scattered
- **Post Content:** ⚠️ No responsive changes (same spacing mobile→desktop)
- **Hero:** ⚠️ No responsive changes (asymmetrical, doesn't adapt)

---

## Part 4: Spacing Value Distribution

### All Unique Spacing Values Found (sorted)

```
0.25rem  (4px)    - calc minimum
0.5rem   (8px)    - tight spacing
0.8rem   (13px)   - fallback for gaps
1rem     (16px)   - base unit, typography
1.2rem   (19px)   - small button arrow
1.5rem   (24px)   - nav gap
1.6rem   (26px)   - hero subheading, card date, CTA, hero button text gap
2rem     (32px)   - hero padding left/right, nav padding, footer, pagination margin
2.2rem   (35px)   - CTA button padding (desktop)
2.4rem   (38px)   - post paragraph, blockquote padding, open-badge margin
2.6rem   (42px)   - line-height for quote text
2.8rem   (45px)   - list margin-bottom
3rem     (48px)   - hero heading margin, grid gap, filter margin, many component margins
3.2rem   (51px)   - first paragraph, hero line-height
3.6rem   (58px)   - CTA button padding
4rem     (64px)   - nav padding (desktop), strength section padding, grid gap
4.5rem   (72px)   - filter pseudo-element height
5rem     (80px)   - blockquote margin
5.6rem   (90px)   - heading top margin, hr margin
6rem     (96px)   - hero padding top/bottom, image margin, hero arrow, pagination margin-top
8rem     (128px)  - section margin-bottom (mobile)
9rem     (144px)  - grid gap (large screens)
12rem    (192px)  - section margin-bottom (desktop), strength section margin, filter desktop margin
24rem    (384px)  - legacy variable (unused)
```

**Total: 30+ unique values**

---

## Part 5: Observations & Patterns

### What Works Well ✅

1. **Rem-based system** — no px hardcoding, scales with base font size
2. **Container padding** — uses CSS variable, responds to breakpoints
3. **Section rhythm** — `8rem→12rem` is consistent across pages
4. **Component consistency** — cards, buttons, filters maintain uniform spacing
5. **Navigation** — scales appropriately with container padding

### What's Inconsistent ⚠️

1. **Grid gaps** — scale differently than sections (9rem vs 12rem at largest)
2. **Breakpoint scatter** — spacing changes happen at bp-2, bp-4, bp-6, bp-8 (no unified pattern)
3. **Post content** — uses completely different spacing scale, no responsive changes
4. **Hero section** — asymmetrical padding (12rem/2rem) with no documentation of intent
5. **Unused variables** — `$margin-default`, `$margin-medium`, `$margin-small` sit unused

### Why Post Content Differs (Likely Intentional)

Post content spacing (2.4-3.2rem between paragraphs) is **much tighter** than page section spacing (8-12rem). This is likely intentional for:
- **Readability** — tighter line-length (68rem max-width) requires tighter spacing
- **Content focus** — readers should focus on the article, not white space
- **Typography** — larger line-heights (3.2rem) in post text provide natural breathing room

**But:** Post spacing doesn't change from mobile to desktop, which could feel cramped on 4K displays.

### Why Hero is Asymmetrical (Likely Intentional)

Hero padding `12rem 2rem 8rem` (top/right/bottom/left):
- **Tall** (12rem top + 8rem bottom = 20rem) for dramatic hero section
- **Narrow** (2rem sides) to maximize content width on mobile
- **Intentional?** Probably yes, but not documented

**But:** Doesn't adapt responsively—horizontal padding could increase on larger screens.

---

## Part 6: Issues Identified

### 1. **Spacing not unified at breakpoints**

Components transition at different breakpoints:
- `--container-padding` changes at **bp-2**
- Sections change at **bp-4**
- Grids change at **bp-4, bp-6, bp-8** (scattered)

**Impact:** Layout feels disconnected—some elements expand while others don't.

### 2. **Grid gaps scale more aggressively than other spacing**

- Section margins: `8rem → 12rem` (1.5×)
- Container padding: `3rem → 6rem` (2×)
- Grid gaps: `3rem → 9rem` (3×) and `4rem → 9rem` (2.25×)

**Impact:** Card grids feel disproportionately spacious compared to text sections.

### 3. **Post content doesn't respond to screen size**

Post paragraph spacing (2.4rem) is the same on mobile (375px width) and desktop (1200px+).

**Impact:** Content feels tight on large screens where you'd expect more breathing room.

### 4. **Hero padding doesn't scale**

Hero keeps `12rem 2rem 8rem` on all screen sizes.

**Impact:** On mobile, 2rem side padding eats into content width. On desktop with 1200px+ screens, asymmetry is more pronounced.

### 5. **Unused margin variables**

`$margin-default`, `$margin-medium`, `$margin-small` are defined but never used.

**Impact:** Technical debt—clutters the variable definitions.

---

## Part 7: Recommendations

### Quick Wins (Low Risk)

1. **Remove unused margin variables** from `_variables.scss`
   - Delete `$margin-default`, `$margin-medium`, `$margin-small`
   - Clean up the codebase

2. **Unify breakpoint transitions**
   - Consider moving all spacing changes to `bp-4` (62em) where possible
   - Currently scattered across bp-2, bp-4, bp-6, bp-8

### Medium Effort (Moderate Risk)

3. **Document hero asymmetry** in code comments
   - Is `12rem 2rem 8rem` intentional for visual hierarchy?
   - If yes, add a comment explaining the design decision

4. **Test post content spacing at different screen sizes**
   - Does 2.4rem feel right on mobile (narrow content)?
   - Does 2.4rem feel cramped on desktop (wide viewport)?
   - Consider responsive post spacing if needed

5. **Investigate grid gap scaling**
   - Is `3rem → 9rem` (3× increase) intentional?
   - Could be proportional to total content width

### Major Work (Requires Design Review)

6. **Create a standardized spacing scale** (if you decide to unify everything)
   - Define tiers: `xs` (0.5rem), `sm` (1rem), `md` (1.5rem), `lg` (2.4rem), `xl` (3.2rem), `2xl` (4.8rem), `3xl` (6.4rem), `4xl` (8rem), `5xl` (12rem)
   - Replace hardcoded values with semantic variables
   - Would be a significant refactor

---

## Next Steps

1. **Visual inspection:** Open the site at multiple screen sizes (mobile, tablet, desktop, 4K) and note where spacing feels off
2. **Document decisions:** For each inconsistency above, decide: "intentional" or "needs fixing"
3. **Prioritize:** Some issues (unused variables) are quick; others (responsive post spacing) need design input
4. **Consider unified scale:** If you want full consistency, define a spacing tier system and systematically replace values

---

**This audit is complete. Ready for visual testing and design decisions.**
