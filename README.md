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
    sml_webp: /assets/img/posts/my-post/hero@720w.jpg
    lrg_webp: /assets/img/posts/my-post/hero.jpg
    position: center center
alt: Image alt text
excerpt: "Short description shown in post listings."
published: true
category: leadership
---
```

Set `published: false` to hide a post without deleting it. HTML is allowed in `title`.

## Images

Requesting an image with an `@WxH` suffix (e.g. `/assets/img/photo@400x300.jpg`) resizes it on the fly and optionally caches the result to disk for subsequent static serving.

Post images live in `assets/img/posts/<post-folder>/`.

## TypeScript

All source is in `.ts` files. The compiled `.js` and `.js.map` files are committed to the repo — the production server runs the compiled JS directly with no build step on the host. **Never edit `.js` files directly.**

## Deployment

| Branch | Environment |
|---|---|
| `live` | dwaynecodling.com |
| `dev` | dev.dwaynecodling.com |

The app is hosted on Railway. Pushing to either branch triggers an automatic build and deploy via `npm run build:railway`. TypeScript is pre-compiled and committed to the repo — Railway only needs to compile the SCSS on deploy.
