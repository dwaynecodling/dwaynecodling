# Style Guide — dwaynecodling.com

A reference for design decisions, patterns, and component rules established across the site. Update this when new patterns are introduced or existing ones change.

---

## Colours

| Token | Hex | Usage |
|---|---|---|
| `$color-forest-dark` | `#0d1a10` | Page background, button text on amber |
| `$color-forest-mid` | `#162419` | Secondary backgrounds |
| `$color-forest-card` | `#1c2b1e` | Card backgrounds, strength section |
| `$color-amber` | `#c8853a` | Primary accent — CTAs, active states, highlights |
| `$color-amber-dark` | `darken(#c8853a, 8%)` | Amber hover state |
| `$color-cream` | `#f4ede0` | Primary text, button text |
| `$color-cream-muted` | `#a89e90` | Secondary/meta text, labels |
| `$color-teal` | `#2d8070` | Accent (reserved, not currently in use) |

Borders and overlays use `rgba` variants of these tokens — never hardcoded values.

---

## Typography

Fonts are loaded via `assets/fonts/` and declared in `scss/base/_fonts.scss`.

| Role | Family | Weight |
|---|---|---|
| Headings | Playfair Display, Georgia, serif | 700 / 900 |
| Body | Inter, Roboto, sans-serif | 400 / 500 / 700 |

### Type scale (CSS custom properties)

| Property | Mobile | Desktop (≥40em) |
|---|---|---|
| `--heading-1` | `3.2rem` | `4.8rem` |
| `--heading-2` | `2.8rem` | `3.8rem` |
| `--heading-3` | `2.2rem` | `2.8rem` |
| `--body-text-main` | `1.4rem` | `1.8rem` |

### Casing rules

- Eyebrow labels (`text-transform: uppercase` via CSS): write lowercase in HTML — e.g. `"Beyond the work"`, `"About me"`
- Read time units: lowercase in source — `"min"` not `"MIN"`. CSS uppercases where needed.
- UI text (buttons, links): sentence case — e.g. `"View all posts"`, `"Get in touch"`
- Navigation: sentence case in HTML, CSS handles presentation

---

## Buttons

All buttons share the same pill shape. There are two variants.

### Primary — amber fill

Used for the main CTA on a section. White text, amber background.

```html
<a href="/contact-me" class="hero__button">Get in touch</a>
```

- Background: `$color-amber`
- Text: `$color-cream` (white)
- Border radius: `3rem`
- Padding: `1.4rem 3rem`
- Hover: `$color-amber-dark` bg, `translateY(-2px)`, amber glow shadow

### Secondary — outline

Used alongside a primary button, or as a standalone when a softer presence is needed.

```html
<a href="/posts" class="hero__button hero__button--outline">Read my posts</a>
```

- Background: transparent
- Text: `$color-cream`
- Border: `2px solid rgba(244,237,224,0.4)`
- Hover: subtle cream bg, border turns amber, `translateY(-2px)`

### Form submit — amber outline

Used for form submission actions (e.g. "Send message"). Signals action without competing with page CTAs.

- Background: transparent
- Text: `$color-cream`
- Border: `2px solid $color-amber`
- Hover: subtle cream bg, border turns `rgba(244,237,224,0.5)`, `translateY(-2px)`

### Rules

- Never use hardcoded colours on button text or borders — use the classes above
- Arrow SVGs inside buttons must use `fill="currentColor"` / `stroke="currentColor"` so they inherit text colour on hover
- Buttons that sit on a dark background section use the primary or outline variant — never invent a third
- The nav "Contact" button uses `link--alt` (amber fill, pill) with an active outlined state when on `/contact-me`

---

## Navigation

- Logo: `DwayneCodling.` — bold, white, links to `/`
- Links: "About me", "My posts" — white text, amber underline on hover/active
- Contact button: amber pill (`link--alt`) — shows amber outline with white text when active on `/contact-me`
- Active state detection runs client-side JS on page load; `/post/*` paths mark "My posts" as active

---

## Icons / Arrows

One arrow shape is used throughout. Orientation is controlled by CSS `transform: rotate()`.

**Horizontal right arrow** (20×12):
```html
<svg width="20" height="12" viewBox="0 0 20 12" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <rect fill="currentColor" x="0" y="5" width="14" height="2" rx="1"/>
    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 0l6 6-6 6"/>
</svg>
```

**Vertical down arrow** (12×20, used for hero scroll prompt and pagination):
```html
<svg width="12" height="20" viewBox="0 0 12 20" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">
    <rect fill="currentColor" x="5" y="0" width="2" height="14" rx="1"/>
    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M0 10l6 6 6-6"/>
</svg>
```

Rotate for pagination: `style="transform:rotate(90deg)"` = left (prev), `style="transform:rotate(-90deg)"` = right (next).

Always use `currentColor` — never hardcode `#FFF` or `#c8853a` on SVG paths. This ensures the arrow inherits hover colour automatically.

---

## Cards

Used on the posts listing and homepage latest posts section.

- Background: `$color-forest-card`
- Border: `1px solid rgba(200,133,58,0.1)` — turns `rgba(200,133,58,0.35)` on hover
- Hover: `translateY(-3px)`, darker box shadow
- Date: uppercase, amber, `1.2rem`
- Read time: lowercase in source (`"5 min read"`), CSS applies `text-transform: uppercase` → displays as `"5 MIN READ"`
- Card images use `<picture>` with `sml_jpeg`/`lrg_jpeg` srcset variants; small variant uses `@720w` suffix

---

## Images

### Responsive images

The middleware (`Middleware.CheckForImageRequest`) generates resized variants on demand and caches to disk. Append a suffix to any image URL:

| Suffix | Result |
|---|---|
| `@720w` | 720px wide |
| `@400x300` | 400×300px |

**Card/content images:** use `@720w` suffix for `sml_jpeg` / `sml_webp` frontmatter fields.

**Background images:** serve `@720w` by default (mobile-first), switch to full at `62em`:
```scss
background-image: url('/assets/img/pages/hero@720w.jpg');

@media screen and (min-width: map-get($breakpoints, 'breakpoint-4')) {
    background-image: url('/assets/img/pages/hero.jpg');
}
```

**Post content images:** handled automatically by the markdown renderer — outputs `srcset` with `@720w` and full size variants.

---

## Blog Posts

Frontmatter required fields:

```yaml
slug: my-post-slug
title: My <strong>Post</strong>    # HTML allowed
date: 05 February 2025             # DD MMMM YYYY
hero:
  main: /assets/img/pages/image.jpg
  sml_jpeg: /assets/img/pages/image@720w.jpg
  lrg_jpeg: /assets/img/pages/image.jpg
  sml_webp: /assets/img/pages/image@720w.jpg
  lrg_webp: /assets/img/pages/image.jpg
  position: center 40%             # optional object-position
alt: Descriptive alt text
excerpt: "Short description shown on cards"
published: true
category: leadership               # leadership | fitness | personal | tech
```

---

## Spacing & Layout

### 9-Tier Standardized Spacing Scale

All spacing uses semantic variables defined in `scss/abstracts/_variables.scss`. This enables global adjustability and future-proof design:

| Tier | Variable | Value | Usage |
|------|----------|-------|-------|
| 1 | `$spacing-xs` | 0.5rem (8px) | Micro-spacing, rare edge cases |
| 2 | `$spacing-sm` | 1rem (16px) | Small gaps, inline spacing, base unit |
| 3 | `$spacing-md` | 1.5rem (24px) | Fine-tuning, optional adjustments |
| 4 | `$spacing-lg` | 2.4rem (38px) | Standard vertical spacing, paragraphs, lists |
| 5 | `$spacing-xl` | 3.2rem (51px) | Larger gaps, card text, first paragraph |
| 6 | `$spacing-2xl` | 4.8rem (77px) | Major sections, form controls |
| 7 | `$spacing-3xl` | 6.4rem (102px) | Top-level separation, post images, blockquotes |
| 8 | `$spacing-4xl` | 8rem (128px) | Hero sections, large content gaps |
| 9 | `$spacing-5xl` | 12rem (192px) | Major layout breaks, section margins (desktop) |

**Usage:** Use these variables for all spacing instead of hardcoded values. Example:
```scss
margin-bottom: $spacing-xl;
padding: $spacing-lg $spacing-md;
gap: $spacing-2xl;
```

**Computed values:** For intermediate sizes, use math expressions:
```scss
padding: $spacing-sm * 2;  // 2rem
margin: $spacing-3xl - 1rem;  // 5.4rem
```

### Container & breakpoints

- Container max-width: `120rem`
- Container padding: `3rem` (mobile), `6rem` (≥40em), `0` (≥80em)
- Primary responsive breakpoint: `breakpoint-4` (62em / 992px) — all major spacing transitions happen here
- Secondary breakpoint: `breakpoint-7` (80em / 1280px) — large screen refinements

### Section spacing

| Element | Mobile | Desktop (≥62em) |
|---------|--------|-----------------|
| `section { margin-bottom }` | `$spacing-4xl` (8rem) | `$spacing-5xl` (12rem) |
| `.contact-form { padding-bottom }` | `$spacing-4xl` (8rem) | `$spacing-5xl` (12rem) |

### Hero section spacing

Hero padding is **intentionally asymmetrical** for visual hierarchy:

| Breakpoint | Vertical | Horizontal | Variable |
|-----------|----------|-----------|----------|
| Mobile | `$spacing-5xl` top, `$spacing-4xl` bottom | `$spacing-sm * 2` (2rem) | Narrow sides preserve content |
| Tablet+ (≥62em) | `$spacing-5xl` top, `$spacing-4xl` bottom | 4rem | More breathing room |
| Desktop+ (≥80em) | `$spacing-5xl` top, `$spacing-4xl` bottom | 6rem | Maximum spaciousness |

### Post content spacing

Post content uses **intentionally tighter** spacing than page sections for readability (narrow max-width 68rem + large line-heights create natural breathing room):

| Element | Mobile (< 80em) | Desktop (≥80em) | Variable |
|---------|-----------------|-----------------|----------|
| Paragraphs | `$spacing-lg` (2.4rem) | `$spacing-xl` (3.2rem) | Tight → breathing room |
| First paragraph | `$spacing-xl` (3.2rem) | `$spacing-2xl` (4.8rem) | More prominent |
| Headings | `$spacing-3xl - 0.8rem` (5.6rem) top | `$spacing-3xl + 0.8rem` (7.2rem) top | Extra space before headings on large screens |
| Lists | `$spacing-lg + 0.4rem` (2.8rem) bottom | Same | Consistent spacing |
| Blockquotes | `$spacing-3xl - 1rem` (5rem) margin, `$spacing-lg` padding | Same | Consistent styling |

### Card & grid spacing

| Component | Mobile | Desktop (≥62em) | Variable |
|-----------|--------|-----------------|----------|
| Card list gap | `$spacing-xl` (3rem) | `$spacing-3xl` (6.4rem) | Scales with breakpoint |
| List-of-3 gap | 4rem | 9rem | Legacy values (fit to nearest tiers) |
| Card content padding | `$spacing-sm * 2` (2rem) | Same | Consistent |

### Typography in forms

Links within body text (e.g. WhatsApp in contact form) inherit parent font size: `font-size: inherit` instead of the global link size. Ensures visual consistency.

### Adding new components

When creating new components, **always use the spacing scale**:

✅ **Good:**
```scss
.component {
  padding: $spacing-lg;
  margin-bottom: $spacing-xl;
  gap: $spacing-md;
}
```

❌ **Avoid:**
```scss
.component {
  padding: 2.4rem;       // Use $spacing-lg instead
  margin-bottom: 3.2rem; // Use $spacing-xl instead
  gap: 1.5rem;           // Use $spacing-md instead
}
```

### Adjusting global spacing

To adjust spacing site-wide, modify the variable values in `scss/abstracts/_variables.scss`. All components using the scale will automatically update.

**Example:** Make spacing more generous:
```scss
$spacing-lg: 2.6rem;  // was 2.4rem
$spacing-xl: 3.6rem;  // was 3.2rem
$spacing-2xl: 5.2rem; // was 4.8rem
```

All components using these variables will recompile with the new values.

### Global styling

- Global transition: `$transition: all .2s`
- Border accents: `rgba(200,133,58,0.15)` for subtle dividers, `rgba(200,133,58,0.35)` for hover states
- Links: Global base is `1.4rem` (mobile) or `1.6rem` (tablet+), but context-specific overrides apply
