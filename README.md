# dwaynecodling.com

[![Deployed on Railway](https://img.shields.io/badge/Deployed_on-Railway-blueviolet?logo=railway&logoColor=white)](https://railway.app/project/9c74e6cf-4f5b-4224-a75a-a28923646656) ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white) ![EJS](https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=black) ![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown&logoColor=white)

Personal blog and portfolio site for Dwayne Codling. Built with Express, TypeScript, and EJS, hosted on Railway behind Cloudflare.

## Stack

- **Server**: Node.js + Express
- **Templates**: EJS
- **Language**: TypeScript (compiled JS committed alongside source)
- **Styles**: SCSS → compiled to `assets/css/style.min.css`
- **Content**: Markdown files with gray-matter frontmatter
- **Deployment**: Railway (auto-deploy on push) behind Cloudflare

## Getting started

```bash
npm install
npm start
```

`npm start` runs the Express server and SCSS watcher in parallel. The site will be available at `http://localhost:3000`.

## Commands

| Command | Description |
|---|---|
| `npm start` | Start dev server + watch SCSS |
| `npm run build` | Full local build (SCSS → TS → remove node_modules) |
| `npm run build:railway` | Railway deploy build (SCSS only) |
| `npm run build:css` | Compile SCSS only |
| `npm run watch:sass` | Watch SCSS only |
| `tsc -p tsconfig.json` | Compile TypeScript only |

## Writing a post

Posts live in `views/posts/*.md` as Markdown with gray-matter frontmatter. Required fields:

```yaml
---
slug: my-post-slug
title: My <strong>Post</strong>
date: 05 February 2025
hero:
    main: /assets/img/posts/my-post/hero.jpg
    sml_jpeg: /assets/img/posts/my-post/hero@720w.jpg
    lrg_jpeg: /assets/img/posts/my-post/hero.jpg
    sml_webp: /assets/img/posts/my-post/hero@720w.webp
    lrg_webp: /assets/img/posts/my-post/hero.webp
    card_webp: /assets/img/posts/my-post/hero@card.webp
    position: center 30%
alt: Image alt text
excerpt: "Short description shown in post listings."
published: true
category: leadership
---
```

Set `published: false` to hide a post without deleting it. HTML is allowed in `title`.

## Images

Post images live in `assets/img/posts/<post-folder>/`. Every post needs **four image files** — all in WebP with JPEG fallbacks.

### Required files per post

| File | Dimensions | Notes |
|---|---|---|
| `hero.jpg` | 1440×810px | Full-size JPEG fallback |
| `hero.webp` | 1440×810px | Full-size WebP |
| `hero@720w.jpg` | 720×405px | Mobile JPEG (used below 62em) |
| `hero@720w.webp` | 720×405px | Mobile WebP (used below 62em) |
| `hero@card.webp` | 720×320px | Card thumbnail — cropped to this exact ratio |

The `position` frontmatter field sets the `object-position` CSS property for the hero image. Use values like `center top`, `center 30%`, `left 40%` to control which part of the image shows as the focal point in cards and hero banners.

### Generating images with sharp

```js
const sharp = require('sharp');

// Full-size WebP
await sharp('source.jpg').rotate().resize(1440).webp({ quality: 82 }).toFile('hero.webp');

// Mobile WebP
await sharp('source.jpg').rotate().resize(750).webp({ quality: 82 }).toFile('hero@720w.webp');

// Card thumbnail (720×320 crop — adjust extract values for focal point)
await sharp('source.jpg').rotate().resize(1440)
  .extract({ left: 0, top: 200, width: 1440, height: 640 })
  .resize(720, 320)
  .webp({ quality: 82 })
  .toFile('hero@card.webp');
```

Always call `.rotate()` before `.resize()` to bake in EXIF orientation so the image displays correctly in all browsers.

### Inline post images

Inside post Markdown, reference JPEG files — `MarkdownTool` auto-generates a `<picture>` element with a WebP source. Place both files alongside the hero images:

```md
![Alt text](/assets/img/posts/my-post/photo.jpg "Caption")
```

Requires `photo.jpg`, `photo.webp`, and `photo@720w.webp` to exist.

### On-the-fly resizing

Requesting any image URL with an `@WxH` or `@Nw`/`@Nh` suffix (e.g. `/assets/img/photo@400x300.jpg`) resizes it on the fly and caches the result to disk for subsequent static serving.

## TypeScript

All source is in `.ts` files. The compiled `.js` and `.js.map` files are committed to the repo — the production server runs the compiled JS directly with no build step on the host. **Never edit `.js` files directly.**

## Deployment

| Branch | Environment |
|---|---|
| `live` | dwaynecodling.com |
| `dev` | dev.dwaynecodling.com |

The app is hosted on Railway. Pushing to either branch triggers an automatic build and deploy via `npm run build:railway`. TypeScript is pre-compiled and committed to the repo — Railway only needs to compile the SCSS on deploy.
