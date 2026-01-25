import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { AlertCircle, Heart } from "lucide-react";
import { Link } from "wouter";

/**
 * Donation Cancel Page
 * Post-checkout cancellation with dignity-first, no-guilt messaging.
 * Design: Rococo white, slate grey, gilded accents.
 * Accessibility: Semantic structure, clear hierarchy, keyboard navigation.
 */
export default function DonateCancel() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Cancel Hero */}
        <section className="py-20 md:py-32">
          <div className="container max-w-2xl text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center border-2 border-accent">
                <AlertCircle className="w-10 h-10 text-accent" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-foreground">No Pressure</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your donation was not processed. That's okay. We're here whenever you're ready—or
                not at all. There's no obligation, only opportunity.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-accent" />

            {/* Message */}
            <div className="space-y-6 bg-secondary/30 border-2 border-accent rounded-lg p-8">
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h2 className="text-foreground font-serif font-bold text-lg mb-2">
                    Other Ways to Help
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If financial support isn't right now, there are other meaningful ways to
                    participate in the trade-forward community.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Learn about the trade model and share with others</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Explore sponsorship opportunities for your organization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Connect with our community and offer your skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>Reach out directly—we'd love to hear from you</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Explore what Shine in the Darkness is building.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/trade">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Learn About the Trade
                  </Button>
                </Link>
                <Link href="/sponsors">
                  <Button
                    variant="outline"
                    className="border-2 border-accent text-foreground hover:bg-secondary"
                  >
                    Sponsor Opportunities
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border-2 border-accent text-foreground hover:bg-secondary"
                  >
                    Back Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* Contact Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container max-w-2xl text-center space-y-6">
            <h2 className="text-foreground">Questions?</h2>
            <p className="text-muted-foreground">
              If you'd like to discuss sponsorship, partnership, or just want to learn more about
              our work, we'd love to hear from you.
            </p>
            <a
              href="mailto:hello@shineinthedarkness.org"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
