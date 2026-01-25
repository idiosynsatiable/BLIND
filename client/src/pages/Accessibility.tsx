import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

/**
 * Accessibility Page
 * WCAG compliance statement and accessibility features.
 */
export default function Accessibility() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b-2 border-accent">
          <div className="container">
            <h1 className="text-foreground mb-6">Accessibility Statement</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We are committed to ensuring our website is accessible to everyone, including
              people with disabilities.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl space-y-12">
            {/* Commitment */}
            <div className="space-y-4">
              <h2 className="text-foreground">Our Commitment</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Accessibility is not an afterthought for us—it is foundational to who we are.
                We design and build with accessibility in mind from day one. This website is
                built to meet WCAG 2.1 Level AA standards.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-foreground">Accessibility Features</h2>
              <ul className="space-y-3 text-lg text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">Semantic HTML:</strong> Proper heading
                  hierarchy and landmark regions for screen reader navigation.
                </li>
                <li>
                  <strong className="text-foreground">Keyboard Navigation:</strong> Full
                  keyboard accessibility with visible focus states.
                </li>
                <li>
                  <strong className="text-foreground">High Contrast:</strong> Text and
                  interactive elements meet WCAG AA contrast ratios.
                </li>
                <li>
                  <strong className="text-foreground">Descriptive Links:</strong> Link text
                  clearly describes the destination.
                </li>
                <li>
                  <strong className="text-foreground">Form Labels:</strong> All form inputs
                  have associated labels.
                </li>
                <li>
                  <strong className="text-foreground">Reduced Motion:</strong> Animations
                  respect user preferences for reduced motion.
                </li>
                <li>
                  <strong className="text-foreground">Skip Links:</strong> Skip-to-content
                  link available on every page.
                </li>
                <li>
                  <strong className="text-foreground">Large Touch Targets:</strong> Buttons
                  and links are at least 44x44 pixels.
                </li>
              </ul>
            </div>

            {/* Screen Readers */}
            <div className="space-y-4">
              <h2 className="text-foreground">Screen Reader Support</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This website has been tested with popular screen readers including NVDA,
                JAWS, and VoiceOver. All content is accessible and navigable using assistive
                technologies.
              </p>
            </div>

            {/* Known Issues */}
            <div className="space-y-4">
              <h2 className="text-foreground">Known Issues</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We continuously test and improve our accessibility. If you encounter any
                barriers or issues, please let us know so we can address them immediately.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-4 p-8 bg-secondary/30 border-2 border-accent rounded-lg">
              <h2 className="text-foreground">Report Accessibility Issues</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you experience any accessibility barriers on this website, please contact
                us. We take accessibility seriously and will work to resolve any issues.
              </p>
              <a
                href="mailto:accessibility@shineinthedarkness.org?subject=Accessibility%20Issue"
                className="inline-block font-semibold text-primary hover:text-primary/90 transition-colors"
              >
                accessibility@shineinthedarkness.org
              </a>
            </div>

            {/* Standards */}
            <div className="space-y-4 border-t-2 border-accent pt-8">
              <h2 className="text-foreground">Standards & Guidelines</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This website aims to comply with the Web Content Accessibility Guidelines
                (WCAG) 2.1 Level AA. We also follow best practices from the Web Accessibility
                Initiative (WAI) and the Americans with Disabilities Act (ADA).
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
