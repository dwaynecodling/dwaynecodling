---
description: Proofread all blog posts in views/posts/ and fix grammar and punctuation. Does not change meaning, structure, or voice. Reports all changes made for review.
---

Proofread every markdown file in `views/posts/` and fix any grammar, punctuation, and spelling issues.

## Rules

- Fix grammar, punctuation, spelling, and capitalisation errors only
- Do NOT restructure sentences or paragraphs
- Do NOT change the meaning of anything
- Do NOT alter Dwayne's voice — keep it direct, personal, and first-person
- Do NOT change frontmatter fields (slug, title, date, excerpt, hero, published, alt)
- Do NOT change `<strong>` tags in titles
- Preserve all `##` headers, `**bold**`, `>` blockquotes, and markdown formatting exactly as-is
- If a post looks correct already, leave it untouched

## Steps

1. List all `.md` files in `views/posts/`
2. Read each file one at a time
3. Identify and fix any grammar, punctuation, or spelling issues in the body content only
4. Save the corrected file
5. After all posts are done, print a summary of every change made, grouped by file — so the user can review what was corrected before committing
