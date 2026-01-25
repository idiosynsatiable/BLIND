import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

/**
 * Trade Page
 * Explains the core mission and trade-forward approach.
 */
export default function Trade() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b-2 border-accent">
          <div className="container">
            <h1 className="text-foreground mb-6">The Trade Forward Approach</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We believe in the power of meaningful work. Our trade-forward model connects
              blind and low-vision individuals with real skills, real income, and real dignity.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-20 md:py-28">
          <div className="container space-y-16">
            {[
              {
                title: "What is Trade-Forward?",
                content:
                  "Trade-forward is a community-driven model where individuals learn practical skills in accessible trades. Rather than relying solely on donations, participants develop expertise that creates sustainable income and independence.",
              },
              {
                title: "Our Core Trades",
                content:
                  "We focus on trades that are naturally accessible: audio production, digital accessibility consulting, content creation, and community coordination. Each program is designed with accessibility at its foundation, not as an afterthought.",
              },
              {
                title: "Community Impact",
                content:
                  "Participants become mentors, teachers, and leaders within our community. Success is measured not just in income, but in confidence, independence, and the ability to give back.",
              },
              {
                title: "Accessibility First",
                content:
                  "Every tool, every process, every training module is built with accessibility in mind. We partner with participants to understand their needs and adapt our approach accordingly.",
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-foreground">{section.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {section.content}
                </p>
                {idx < 3 && <div className="border-t-2 border-accent/30 pt-8" />}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-secondary/30 border-t-2 border-accent">
          <div className="container text-center space-y-6">
            <h2 className="text-foreground">Support Trade-Forward Learning</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your donation directly funds training programs, mentorship, and tools that empower
              participants to build sustainable careers.
            </p>
            <Link href="/donate">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Make a Donation
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
