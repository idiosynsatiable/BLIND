import { Link } from "wouter";

/**
 * Footer Component
 * Luxury-minimal footer with gilded pinstripe border, semantic structure, and accessibility.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t-2 border-accent mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-serif font-bold text-lg text-foreground mb-3">
              Shine in the Darkness
            </h3>
            <p className="text-sm text-muted-foreground">
              Empowering blind and low-vision individuals through trade and community.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/trade">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1">
                    The Trade
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sponsors">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1">
                    Sponsors
                  </a>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal navigation">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1">
                    Privacy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1">
                    Terms
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/accessibility">
                  <a className="text-sm text-muted-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1">
                    Accessibility
                  </a>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
            <p className="text-sm text-muted-foreground mb-2">
              <a
                href="mailto:hello@shineinthedarkness.org"
                className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
              >
                hello@shineinthedarkness.org
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent my-8" />

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            © {currentYear} Shine in the Darkness. All rights reserved. | Crafted with dignity
            and accessibility in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
