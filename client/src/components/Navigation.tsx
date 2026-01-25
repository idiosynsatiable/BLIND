import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/**
 * Navigation Component
 * Luxury-minimal nav with sticky positioning, skip-to-content link, and gilded accents.
 * Accessibility: semantic nav, visible focus states, keyboard navigation, reduced-motion support.
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "The Trade", href: "/trade" },
    { label: "About", href: "/about" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Accessibility", href: "/accessibility" },
  ];

  return (
    <>
      {/* Skip to Content Link - accessibility essential */}
      <a
        href="#main-content"
        className="absolute -top-12 left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded focus:top-4 transition-all"
      >
        Skip to main content
      </a>

      <nav
        className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b-2 border-accent"
        aria-label="Main navigation"
      >
        <div className="container flex items-center justify-between py-4">
          {/* Logo / Brand */}
          <Link href="/" className="group">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center text-foreground font-bold text-lg">
                S
              </div>
              <span className="hidden sm:inline font-serif font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                Shine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/donate">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                aria-label="Go to donate page"
              >
                Support
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-accent bg-secondary/50">
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className="block px-4 py-2 text-foreground hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
