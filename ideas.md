# Design Philosophy: Shine in the Darkness

## Selected Approach: Luxury Minimalism with Gilded Restraint

**Design Movement:** Contemporary Luxury Minimalism with Art Deco accents

**Core Principles:**
1. **Dignity Through Restraint** – Every element earns its place; no decoration without purpose
2. **Accessibility as Elegance** – Large typography, high contrast, semantic structure are beautiful, not compromises
3. **Gilded Accents** – Subtle gold/brass pinstripes and borders signal premium craftsmanship without overwhelming
4. **Generous Whitespace** – Breathing room between sections creates visual hierarchy and reduces cognitive load

**Color Philosophy:**
- **Rococo White** (primary background): `oklch(0.98 0.001 0)` – warm, inviting, never harsh
- **Slate Grey** (primary text): `oklch(0.235 0.015 65)` – deep, readable, sophisticated
- **Gilded Accent** (pinstripes/borders): `oklch(0.7 0.08 70)` – warm gold, used sparingly
- **Soft Muted** (secondary elements): `oklch(0.92 0.004 286)` – light grey for dividers and backgrounds
- **Purpose-Driven Color** (CTAs): `oklch(0.577 0.245 27)` – warm coral/rust for donation CTAs (accessible, warm)

**Layout Paradigm:**
- **Asymmetric Sections** – Alternate image/text placement to avoid grid monotony
- **Vertical Rhythm** – Consistent spacing scale (8px, 16px, 24px, 32px, 48px) creates visual harmony
- **Landmark Regions** – Semantic HTML with clear sections: header, hero, content blocks, footer
- **Pinstripe Dividers** – Thin gold lines separate sections without harsh breaks

**Signature Elements:**
1. **Gilded Pinstripe Borders** – 2px gold borders on key cards and section dividers
2. **Serif Display Font** – Elegant serif headings (e.g., Playfair Display) for hero and section titles
3. **Generous Padding** – Sections breathe with 48px+ padding; components have clear internal spacing

**Interaction Philosophy:**
- **Subtle Feedback** – Hover states use gentle color shifts and soft shadows, never jarring
- **Accessible Focus States** – Clear, visible focus rings (gold outline) for keyboard navigation
- **Smooth Transitions** – 200-300ms easing for all interactive elements
- **Reduced Motion Respect** – Animations disabled for users with `prefers-reduced-motion`

**Animation Guidelines:**
- **Entrance Animations** – Fade-in + subtle upward slide (200ms) for sections as they enter viewport
- **Hover Effects** – Slight scale (1.02x) and shadow depth increase on interactive elements
- **Loading States** – Gentle spinner with gold accent color
- **No Auto-play** – All animations are user-triggered or scroll-based, never auto-playing

**Typography System:**
- **Display Font:** Playfair Display (serif, bold) – hero titles, section headings
- **Body Font:** Inter (sans-serif, regular/medium) – body text, navigation, UI labels
- **Hierarchy:**
  - H1: Playfair Display, 48px, slate-grey
  - H2: Playfair Display, 36px, slate-grey
  - H3: Playfair Display, 24px, slate-grey
  - Body: Inter, 16px, slate-grey
  - Small: Inter, 14px, muted-foreground
- **Line Height:** 1.6 for body (readability), 1.2 for headings (elegance)

---

## Implementation Notes

This design prioritizes **dignity and accessibility** as core aesthetic values. The luxury comes from restraint, not excess. Every design decision serves both beauty and usability.

**Key Commitments:**
- ✅ Semantic HTML with proper heading hierarchy
- ✅ WCAG AA contrast ratios throughout
- ✅ Large touch targets (44px minimum)
- ✅ Keyboard navigation fully supported
- ✅ Screen reader friendly with descriptive link text
- ✅ No auto-playing media or distracting animations
