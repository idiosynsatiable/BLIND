# Shine in the Darkness

A fast, elegant non-profit website for empowering blind and low-vision individuals through meaningful trade, community support, and dignified opportunity.

## Design Philosophy

**Luxury Minimalism with Gilded Restraint** – Every element earns its place. The design prioritizes dignity and accessibility as core aesthetic values, using a rococo-white background, slate-grey text, and gilded accents.

- **Color Palette**: Rococo white, slate grey, gilded gold accents, warm coral CTAs
- **Typography**: Playfair Display (serif, headings) + Inter (sans-serif, body)
- **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support
- **Layout**: Asymmetric sections, generous whitespace, semantic HTML

## Features

- **Home**: Mission statement and key CTAs
- **The Trade**: Explainer of trade-forward approach
- **About**: Founder story and organizational values
- **Sponsors**: Sponsorship tiers and inquiry form
- **Donate**: Stripe Checkout integration with preset amounts
- **Accessibility**: WCAG compliance statement
- **Privacy & Terms**: Legal documentation

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Routing**: Wouter (client-side)
- **UI Components**: shadcn/ui
- **Payment**: Stripe Checkout
- **Server**: Express (Node.js)
- **Build**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The site will be available at `http://localhost:3000`.

### Build for Production

```bash
# Build
pnpm build

# Start production server
NODE_ENV=production node dist/index.js
```

## Environment Variables

Create a `.env` file in the root directory:

```
# Stripe (required for donations)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000
```

See `.env.example` for all available options.

## Project Structure

```
client/
  src/
    pages/          # Page components
    components/     # Reusable UI components
    lib/            # Utility functions
    App.tsx         # Router configuration
    index.css       # Global styles & theme
  public/           # Static assets
  index.html        # HTML entry point

server/
  api/              # API routes
  index.ts          # Express server

package.json        # Dependencies and scripts
```

## Accessibility

This website is built with accessibility as a core principle:

- Semantic HTML with proper heading hierarchy
- Keyboard navigation fully supported
- High contrast colors (WCAG AA)
- Large touch targets (44px minimum)
- Screen reader friendly
- Reduced motion support
- Skip-to-content link on every page

See `/accessibility` page for detailed accessibility statement.

## Stripe Integration

### Test Mode

Use test card `4242 4242 4242 4242` with any future expiry and any 3-digit CVC.

### Production

1. Replace test keys with live Stripe keys
2. Configure webhook endpoint in Stripe dashboard
3. Verify webhook signature verification is enabled
4. Test end-to-end donation flow

See `DEPLOYMENT.md` for detailed instructions.

## Security

- No payment card information is stored (Stripe handles all payments)
- Minimal data collection (name, email, donation amount only)
- Environment variables for all secrets
- HTTPS enforced in production
- Webhook signature verification

See `DEPLOYMENT.md` for security checklist.

## Privacy

We collect minimal personal data and never sell or share it. See `/privacy` page for detailed privacy policy.

## License

MIT

## Contact

For questions or support, contact us at `hello@shineinthedarkness.org`.

---

**Built with dignity and accessibility in mind.**
