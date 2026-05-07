---
description: Create a new blog post for dwaynecodling.com. Pass a topic, title, or paste a LinkedIn post as the argument.
---

Create a new blog post for dwaynecodling.com using this input: $ARGUMENTS

## Steps

1. Draft the post following the voice and format guidelines below.
2. Ask the user to pick a hero image from the available options (show the list).
3. Save the file to `views/posts/[slug].md` with `published: false`.
4. Tell the user the filename and that they can set `published: true` when ready to go live.

## Voice and style

Dwayne's writing is direct, personal, and reflective. He writes from lived experience — career, leadership, D&I, personal growth, powerlifting. Key traits:
- Short paragraphs. One idea per paragraph.
- First person, honest, never corporate.
- Bold for key sentences that carry the main point.
- Blockquotes (`>`) for the central takeaway or a strong line worth standing alone.
- `##` headers to break the post into 2–4 sections with clear, punchy names.
- Ends with an insight or forward-looking thought, not a summary.
- Titles use `<strong>` around the key word: e.g. `Careers are only part of the <strong>legacy</strong> we leave`

## Frontmatter format

```yaml
---
slug: the-post-slug-here
hero:
    main: /assets/img/pages/CHOSEN_IMAGE
    sml_jpeg: /assets/img/pages/CHOSEN_IMAGE
    lrg_jpeg: /assets/img/pages/CHOSEN_IMAGE
    sml_webp: /assets/img/pages/CHOSEN_IMAGE
    lrg_webp: /assets/img/pages/CHOSEN_IMAGE
alt: Brief image description
title: Post title with <strong>key word</strong> wrapped
date: DD Month YYYY
excerpt: "One or two sentences that hook the reader. Should stand alone as a summary."
published: false
---
```

## Available hero images

| File | Best used for |
|------|--------------|
| `dwayne-profile.jpg` | General / professional topics |
| `dwayne-bw.jpg` | Reflective or personal posts |
| `dwayne-community-1.jpg` | Community, D&I, allyship topics |
| `dwayne-community-2.jpg` | Community, events, speaking |
| `dwayne-competition.jpg` | Powerlifting, personal challenge, resilience |
| `hero-beach.jpg` | Legacy, reflection, life outside work |
| `amsterdam.jpg` | Travel, conferences, broader perspective |
| `map.jpg` | Journey, career path, direction |

## Slug rules
- Lowercase, hyphens only, no special characters
- Should reflect the title naturally: `maximising-your-value`, `allyship-in-tech`
