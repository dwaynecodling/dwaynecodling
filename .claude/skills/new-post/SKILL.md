---
description: Create a new blog post for dwaynecodling.com. Pass a topic, title, or paste a LinkedIn post as the argument.
---

Create a new blog post for dwaynecodling.com using this input: $ARGUMENTS

## Steps

1. Draft the post following the voice and format guidelines below.
2. Ask the user what image they want to use for the hero (they will provide the filename). If they haven't added it yet, tell them the folder to drop it into.
3. Create the image folder at `assets/img/posts/YYYY-[slug]/` where YYYY is the post year.
4. Save the post file as `views/posts/YYYY-[slug].md` with `published: false`.
5. Tell the user the filename, the image folder path, and that they can set `published: true` when ready to go live.

## Image folder convention

Every post gets its own dedicated image folder named after the post year and slug:

```
assets/img/posts/2026-my-post-slug/
  my-image.jpg
```

Use this path pattern in the frontmatter:
```
/assets/img/posts/YYYY-[slug]/IMAGENAME.jpg
```

## Voice and style

Dwayne's writing is direct, personal, and reflective. He writes from lived experience — career, leadership, D&I, personal growth, powerlifting. Key traits:
- Short paragraphs. One idea per paragraph.
- First person, honest, never corporate.
- Bold for key sentences that carry the main point.
- Blockquotes (`>`) for the central takeaway or a strong line worth standing alone.
- `##` headers to break the post into 2–4 sections with clear, punchy names.
- Ends with an insight or forward-looking thought, not a summary.
- Titles use `<strong>` around the key word: e.g. `Careers are only part of the <strong>legacy</strong> we leave`
- No em dashes (—); use semicolons where a joining punctuation is needed.
- Proofread for grammar, spelling, and punctuation before saving.

## Frontmatter format

```yaml
---
slug: the-post-slug-here
hero:
    main: /assets/img/posts/YYYY-[slug]/image.jpg
    sml_jpeg: /assets/img/posts/YYYY-[slug]/image.jpg
    lrg_jpeg: /assets/img/posts/YYYY-[slug]/image.jpg
    sml_webp: /assets/img/posts/YYYY-[slug]/image.jpg
    lrg_webp: /assets/img/posts/YYYY-[slug]/image.jpg
alt: Brief image description
title: Post title with <strong>key word</strong> wrapped
date: DD Month YYYY
excerpt: "One or two sentences that hook the reader. Should stand alone as a summary."
published: false
category: personal | leadership | fitness | tech
---
```

## Date format
Always zero-pad single-digit days: `07 April 2026` not `7 April 2026`.

## Slug rules
- Lowercase, hyphens only, no special characters.
- Should reflect the title naturally: `maximising-your-value`, `allyship-in-tech`.
- Filename prefix must match the post year: `2026-my-post-slug.md`.
