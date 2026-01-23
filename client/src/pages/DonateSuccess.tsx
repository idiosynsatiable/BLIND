import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Check, Heart } from "lucide-react";
import { Link } from "wouter";

/**
 * Donation Success Page
 * Post-checkout confirmation with dignity-first messaging.
 * Design: Rococo white, slate grey, gilded accents.
 * Accessibility: Semantic structure, clear hierarchy, keyboard navigation.
 */
export default function DonateSuccess() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Success Hero */}
        <section className="py-20 md:py-32">
          <div className="container max-w-2xl text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center border-2 border-accent">
                <Check className="w-10 h-10 text-accent" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-foreground">Thank You</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your donation has been received. You've just joined a community of supporters
                committed to dignity, access, and opportunity.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-accent" />

            {/* Impact Message */}
            <div className="space-y-6 bg-secondary/30 border-2 border-accent rounded-lg p-8">
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h2 className="text-foreground font-serif font-bold text-lg mb-2">
                    What Happens Next
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your contribution directly funds training programs, accessibility resources,
                    and community support for blind and low-vision participants. Every dollar
                    strengthens the trade-forward chain.
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Details */}
            <div className="text-left space-y-4 p-6 bg-background border-2 border-accent rounded-lg">
              <h3 className="text-foreground font-serif font-bold">Confirmation Details</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>A receipt has been sent to your email address.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Your donation is secure and processed through Stripe.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>We'll share impact updates as the work unfolds.</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Want to learn more about the work?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/about">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Our Story
                  </Button>
                </Link>
                <Link href="/trade">
                  <Button
                    variant="outline"
                    className="border-2 border-accent text-foreground hover:bg-secondary"
                  >
                    The Trade Model
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

        {/* Share Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container max-w-2xl text-center space-y-6">
            <h2 className="text-foreground">Spread the Word</h2>
            <p className="text-muted-foreground">
              Know someone who believes in dignity and access? Share Shine in the Darkness with
              your network.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://twitter.com/intent/tweet?text=I%20just%20supported%20Shine%20in%20the%20Darkness%20—%20empowering%20blind%20and%20low-vision%20individuals%20through%20trade%20and%20community.%20Join%20me.&url=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-background border-2 border-accent rounded-lg text-foreground hover:bg-secondary transition-colors font-semibold text-sm"
              >
                Share on Twitter
              </a>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Shine in the Darkness",
                      text: "Support blind and low-vision individuals through trade and community.",
                      url: typeof window !== 'undefined' ? window.location.origin : '',
                    });
                  }
                }}
                className="px-6 py-3 bg-background border-2 border-accent rounded-lg text-foreground hover:bg-secondary transition-colors font-semibold text-sm"
              >
                Share
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
