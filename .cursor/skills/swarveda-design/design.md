# Design

Visual reference: [Shotbase](https://shotbase.com/). Tokens below are what this site implements. They describe the system. They are not a copy of Shotbase's copy or assets.

## Type

Display and interface: Geist. It stands in for their geometric display face and UI face.

Captions and meta: Inter. Use the `font-meta` class. Do not set Inter on headlines or navigation.

| Role | Size | Weight | Line height | Tracking | Color |
| --- | --- | --- | --- | --- | --- |
| Hero | 56px, clamp from 40px | 500 | 1.18 | -0.03em | white |
| Section title | 48px, clamp from 32px | 500 | 1.18 | -0.03em | `#18181b` |
| Story title | 28–34px | 400 | 1.2 | -0.04em | `#18181b` |
| Statement | 24–36px | 400 | 1.25 | -0.03em | white |
| Body | 16px | 400 | 24px | -0.02em | `#18181b` or white at 90% |
| Nav | 15px | 500 | 1.4 | -0.02em | white |
| Caption | 12px | 400 | 18px | 0 | Inter |

Headlines break into short lines. Section titles are medium. Story titles are regular.

## Color

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#ffffff` | Page |
| Ink | `#18181b` | Text |
| Nav | `#1e1e1f` | Pill, dark statement, closing bands |
| Night | `#09090b` | Spotlight |
| Plan | `#27272a` | Featured plan card |
| Accent | `#00a7f5` | Primary buttons. Hover `#0096de` |
| Accent deep | `#0084d1` | Eyebrows |
| Mist | `#f4f4f5` | Quiet cards |
| Secondary button | `#fafafa` | Secondary actions |
| Mute | `#71717a` | Supporting text |
| Blue wash | `#dff2fe` | Feature stage |
| Peach wash | `#ffedd4` | Feature stage |
| Violet wash | `#ece9fe` | Feature stage |
| Orange label | `#c2410c` on peach | Warm badges |

The page stays light. Dark sections are bands.

## Chrome

- Nav is fixed, centered, `top: 18px`, fill `#1e1e1f`, radius 22px, white links.
- Primary buttons are 45px tall, padding 16px, radius 16px, fill `#00a7f5`. Shadow is `inset 0 3px 0 rgba(255, 255, 255, 0.2), 0 2px 4px rgba(6, 147, 255, 0.25)`. No border. Content is centered with a 7px gap.
- Media frames are radius 16px with a wide soft shadow.
- Inner page heroes are white, with the eyebrow in accent deep and the title at hero size in ink.
- Phone widths collapse the links into a menu on the same pill.

## Motion

- Hero words rise and fade, staggered.
- The hero sky drifts a little with scroll.
- The media frame eases up after the headline.
- Route changes fade and rise about 12px.
- Logo, quote, and phrase rows use a linear marquee and pause on hover.
- Sections reveal once, from about 28px below.
- The compare frame is a drag between original and finished.
- FAQ rows animate height.
- The phone menu fades and rises.
- `prefers-reduced-motion` removes drift, marquees, and entrance animation.

## Home order

1. Pill navigation
2. Layered hero, same plates as the reference: sky, cloud film at 14% opacity, then three mountain cutouts pinned to the bottom of a full-viewport clip. On open, those layers rise 40px (2s, 3s, and 4s). Words, the line, the button, and the notes fade up on a stagger. The frame scales from 1.2 after one second. No pointer parallax
3. Rounded photographic frame overlapping the bottom of the hero, with a centered play control
4. Name row
5. Full-width dark band, corners rounded into the page, with the two-line statement and a row of icon links
6. Alternating stories: color badge, regular title, quote or checklist
7. Before / after compare
8. Six-up library
9. Dark spotlight
10. Three numbered steps
11. Two-row quote marquee
12. Two plans, one dark, then feature pills
13. Two contact cards
14. FAQ
15. Phrase ribbon
16. Closing band and footer

## Components

- `src/components/site-header.tsx` — pill nav
- `src/components/hero.tsx` — sky, headline, media frame
- `src/components/home-sections.tsx` — the long scroll after the hero
- `src/components/compare.tsx` — drag compare
- `src/components/page-hero.tsx` — inner heroes and closing bands
- `src/components/ui.tsx` — button, reveal, heading, mark
