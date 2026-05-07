# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs Express server + SCSS watcher in parallel)
npm start

# Full production build (compiles SCSS pipeline, compiles TypeScript, then removes node_modules)
npm run build

# Compile SCSS only (outputs to assets/css/style.min.css via compile → concat → prefix → compress)
npm run build:css

# Watch SCSS during development
npm run watch:sass

# Compile TypeScript only
tsc -p tsconfig.json
```

There is no test suite.

## Architecture

This is a personal blog/portfolio site built with **Express + TypeScript + EJS**, deploying to a shared hosting environment via FTP.

### TypeScript compilation

All source is in `.ts` files. The compiled `.js` and `.js.map` files are committed to the repo alongside the source — the production server runs the compiled JS directly (no build step on the host). **Never edit `.js` files directly**; always edit the `.ts` source and recompile.

### Request lifecycle

```
app.ts → Middleware (helmet, multer, static) → controllers/mainController.ts → views/pages/*.ejs
```

- `app.ts` wires up global middleware and mounts the single router (`mainController`)
- `controllers/mainController.ts` defines all routes; async routes delegate to `PostRepository`
- `views/partials/` contains shared EJS partials (nav, footer, links)
- `views/pages/` contains full page templates
- `views/posts/` contains blog posts as Markdown files

### Blog post system

Posts live in `views/posts/*.md` as Markdown with gray-matter frontmatter. `PostRepository` (`repository/PostRepository.ts`) reads, parses, and renders them on request with a 3-second in-memory cache.

Required frontmatter fields per post:
```yaml
---
slug: my-post-slug          # URL: /post/my-post-slug
title: My <strong>Post</strong>  # HTML allowed in title
date: 05 February 2025      # Format: DD MMMM YYYY
hero:
  main: /assets/img/...
alt: image alt text
excerpt: "Short description"
published: true             # set false to hide without deleting
---
```

`MarkdownTool` (`internal_scripts/MarkdownTool.ts`) wraps `markdown-it` with plugins (emoji, abbreviation, task-checkbox) and injects CSS classes onto rendered elements.

### Image resizing middleware

Requesting an image URL with an `@WxH` or `@Nw`/`@Nh` suffix (e.g. `/assets/img/photo@400x300.jpg`) triggers `Middleware.CheckForImageRequest`, which resizes the image on the fly using `ImageResizer` and optionally saves the result to disk for subsequent static serving.

### SCSS structure

```
scss/
  main.scss          # imports everything
  abstracts/         # variables, mixins
  base/              # reset, typography
  components/        # cards, hero, nav, about-me, etc.
  layout/            # grid, footer, navigation
  pages/             # page-specific overrides
```

### Deployment

GitHub Actions (`.github/workflows/node.js.yml`) runs `npm run build` then deploys via FTP on push to either branch:
- `dev` branch → dev.dwaynecodling.com
- `live` branch → dwaynecodling.com (production)

The build script removes `node_modules` at the end (`npm run clean`) so only compiled output is deployed.
