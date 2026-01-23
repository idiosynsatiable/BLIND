import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

/**
 * About Page
 * Founder story and organization mission.
 */
export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b-2 border-accent">
          <div className="container">
            <h1 className="text-foreground mb-6">About Shine in the Darkness</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Founded on the belief that blind and low-vision individuals deserve opportunity,
              dignity, and community.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 md:py-28">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower blind and low-vision individuals through meaningful trade, accessible
                community, and real economic opportunity. We believe that everyone deserves the
                chance to build a career, contribute to their community, and live with dignity.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-foreground">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where blindness and low vision are not barriers to success. Where
                accessibility is the default, not an accommodation. Where every person has the
                skills, support, and community they need to thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* Founder Story */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container max-w-3xl">
            <h2 className="text-foreground mb-8">The Founder Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Shine in the Darkness was born from a simple observation: blind and low-vision
                individuals are often told what they cannot do, rather than shown what they can
                achieve.
              </p>
              <p>
                Our founder experienced this firsthand. After losing sight in their early
                twenties, they were offered sympathy instead of opportunity. But they discovered
                something powerful: with the right tools, the right community, and the right
                mindset, blindness becomes just another variable in an equation that solves for
                success.
              </p>
              <p>
                That realization sparked a mission. If one person could build a career and find
                community, why not thousands? Why not create a model where trade-forward
                learning becomes the norm, where accessibility is built in from day one, and
                where blind and low-vision individuals don't just participate in their
                communities—they lead them?
              </p>
              <p>
                Today, Shine in the Darkness is a growing community of participants, mentors,
                sponsors, and supporters united by a single belief: that dignity, opportunity,
                and community are not luxuries—they are rights.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 border-t-2 border-accent">
          <div className="container">
            <h2 className="text-foreground mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Dignity",
                  description: "Every person deserves respect, agency, and the chance to lead.",
                },
                {
                  title: "Accessibility",
                  description: "Inclusion is not an afterthought. It is the foundation.",
                },
                {
                  title: "Community",
                  description: "We grow stronger together. Mutual support is our superpower.",
                },
              ].map((value, idx) => (
                <div key={idx} className="p-8 bg-background border-2 border-accent rounded-lg">
                  <h3 className="text-foreground font-serif font-bold text-lg mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
