import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ArrowRight, Heart, Users, Zap } from "lucide-react";
import { Link } from "wouter";

/**
 * Home Page
 * Hero section with mission statement, key value props, and CTAs.
 * Design: Luxury-minimal with asymmetric layout, generous whitespace, and accessibility.
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="space-y-6">
                <h1 className="text-foreground leading-tight">
                  Shine in the Darkness
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  Empowering blind and low-vision individuals through meaningful trade,
                  community support, and dignified opportunity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/donate">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      Support Our Mission <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                  <Link href="/trade">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-accent text-foreground hover:bg-secondary"
                    >
                      Learn About The Trade
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="hidden md:flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  {/* Decorative gilded frame */}
                  <div className="absolute inset-0 border-2 border-accent rounded-lg" />
                  <div className="absolute inset-4 border border-accent/50 rounded-lg" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-32 h-32 text-accent/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* Value Props Section */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container">
            <h2 className="text-center text-foreground mb-16">How We Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Skill Development",
                  description:
                    "Hands-on training in meaningful trades that build confidence and independence.",
                },
                {
                  icon: Users,
                  title: "Community",
                  description:
                    "Connect with peers, mentors, and supporters who share your vision for growth.",
                },
                {
                  icon: Heart,
                  title: "Dignity First",
                  description:
                    "Every program is designed with respect, accessibility, and real opportunity at its core.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 bg-background border-2 border-accent rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-8 h-8 text-accent mb-4" />
                    <h3 className="text-foreground mb-3 font-serif font-bold text-lg">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="bg-secondary/50 border-2 border-accent rounded-lg p-12 text-center space-y-6">
              <h2 className="text-foreground">Ready to Make a Difference?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your support directly funds training programs, accessibility resources, and
                community initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/donate">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    Donate Now
                  </Button>
                </Link>
                <Link href="/sponsors">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-accent text-foreground hover:bg-background"
                  >
                    Become a Sponsor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
