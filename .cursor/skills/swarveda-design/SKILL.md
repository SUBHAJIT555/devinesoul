---
name: swarveda-design
description: >-
  Build and edit the Swarveda marketing site so it keeps the Shotbase look:
  type, color, motion, and long-scroll layout. Use when changing pages,
  sections, navigation, animation, or visual design in this project, or when
  the user mentions Shotbase, the design system, or the site routes.
---

# Swarveda design

Match the feel of [Shotbase](https://shotbase.com/). Keep Swarveda's own words and purpose. Do not copy Shotbase headlines, testimonials, logos, or product screenshots.

Read [design.md](design.md) before changing layout, type, color, or motion.

## Stack

Next.js App Router, Yarn, Tailwind, Motion. Geist for display and interface. Inter for captions only.

## Routes

`/` Home, `/about`, `/courses`, `/services`, `/products`, `/contacts`.

Home is the long scroll. Inner pages use a white page hero, the same nav, the same buttons, and the same reveal.

## Copy

Page copy lives in `src/data/*.json`. There is no content folder. When the brief arrives, replace the words in those files. Leave prices, quotes, and logo names as labeled samples until they are real.

## When editing

1. Reuse `src/components/ui.tsx` for buttons, reveals, and headings.
2. Keep the floating pill nav. Do not replace it with a full-width bar.
3. Add motion only when it leads the eye. Honor `prefers-reduced-motion`.
4. Keep the page light. Use dark bands for emphasis.
5. After a visual change, check the affected route in the browser, including the phone menu if the nav or layout changed.
