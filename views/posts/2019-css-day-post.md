---
slug: css-day-post
hero:
    main: /assets/img/posts/2019-css-day-post/amsterdam.jpg
    sml_jpeg: /assets/img/posts/2019-css-day-post/amsterdam_sml.jpg
    lrg_jpeg: /assets/img/posts/2019-css-day-post/amsterdam.jpg
    sml_webp: /assets/img/posts/2019-css-day-post/amsterdam_sml.webp
    lrg_webp: /assets/img/posts/2019-css-day-post/amsterdam.webp
    card_webp: /assets/img/posts/2019-css-day-post/amsterdam@card.webp
alt: Amsterdam, home of CSS Day 2019
title: What I took from <strong>CSS Day</strong>
date: 14 June 2019
excerpt: "CSS Day in Amsterdam was two days of talks that challenged how I think about design, code, and the craft behind both."
published: true
category: tech
---

> *To learn something you have to do a lot of repetition and learn it yourself. There are no shortcuts.*

CSS Day in Amsterdam was two days of talks that challenged how I think about design, code, and the relationship between the two.

![CSS Day Amsterdam 2019](/assets/img/posts/2019-css-day-post/amsterdam-css-day.jpg)

These are the ideas that stuck.

## Design is a way of thinking

Several talks came back to the same point from different angles: design isn't decoration. It's a way of problem solving. The best design work starts long before anyone opens a design tool.

Getting from good to great comes down to process. Understanding how an organisation works, what its constraints are, and who it actually serves. Thoroughly understanding the user isn't a nice-to-have; it is what great design is built on.

## The detail is where it lives

A lot of the practical sessions were about the small decisions that add up to a seamless experience.

Loading states that feel anchored to the element they belong to. Ladda-style spinners that give feedback without getting in the way. Hover menus with a 0.3 second delay so they don't snap closed the moment your cursor moves. These things seem minor. But they're the difference between an interface that feels polished and one that just works.

The throughline: always think about user flow. Every interaction is a step in a journey. Make it seamless.

## Animations should not get in the way

There was a clear consensus on animation: it should support the experience, not perform. Focus on how elements come into view. A drop or zoom-in that indicates something is happening, informative rather than decorative.

If the animation is the first thing someone notices, it's doing the wrong job.

## Go vanilla

One of the more provocative takes of the conference: stay away from frameworks. Go vanilla.

The argument is one I've come around to. Frameworks can abstract away understanding. If you rely on a tool to do something, you may not truly know how it works. And when it breaks, or when you need to step outside it, you're stuck.

To really learn something, you have to do the repetition yourself. There's no shortcut.

## Core components and accessibility

Investing time in your component library pays off long-term. But the point that landed hardest was about keyboard accessibility: build it within the required experience, not just as a default afterthought. Accessibility built into the design from the start is a different thing to accessibility bolted on at the end.

## Rachel Andrew on CSS display

Rachel Andrew's session on understanding `display` was one of the most clarifying talks I've seen on the topic. The key insight: `display` has two values working together. The outer display type controls how the element behaves in the flow. The inner display type controls how its children are laid out.

Paired with writing modes and logical properties, it reframes how you think about layout entirely. `inline-size` and `block-size` instead of `width` and `height`. Properties that respond to writing direction rather than assuming left-to-right.

It's a mental model shift, and one worth making.

## Is CSS a programming language?

The closing provocation: algorithms in CSS. The argument is that CSS has always had logic in it: cascade, specificity, inheritance. These are not styling rules; they are decisions. Understanding CSS as a system of algorithms rather than a list of properties changes how you write it.

Worth checking out notlaura.com/algorithms if this is new territory.

## The books and people worth following

A few names came up repeatedly across the two days: Harry Roberts, Dan Mall, Jared Spool, Rachel Andrew. If you work in frontend and you're not across their work, that's where I'd start.

---

CSS Day is worth attending if you get the chance. Two days, deep focus, no fluff.
