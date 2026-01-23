import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

/**
 * Terms Page
 * Terms of service and usage agreement.
 */
export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-24 border-b-2 border-accent">
          <div className="container">
            <h1 className="text-foreground mb-6">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-foreground">Acceptance of Terms</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                By using this website, you agree to these terms. If you do not agree, please
                do not use our site.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Use License</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Permission is granted to temporarily download one copy of the materials
                (information or software) on Shine in the Darkness website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a
                transfer of title, and under this license you may not:
              </p>
              <ul className="space-y-2 text-lg text-muted-foreground leading-relaxed ml-4">
                <li>• Modify or copy the materials</li>
                <li>• Use the materials for any commercial purpose or for any public display</li>
                <li>• Attempt to decompile or reverse engineer any software contained on the site</li>
                <li>• Remove any copyright or other proprietary notations from the materials</li>
                <li>• Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Donation Terms</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                All donations are final and non-refundable. Donations are processed securely
                through Stripe. By making a donation, you authorize us to charge your payment
                method. Recurring donations can be cancelled at any time through your Stripe
                account or by contacting us.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Disclaimer</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The materials on Shine in the Darkness website are provided on an "as is"
                basis. We make no warranties, expressed or implied, and hereby disclaim and
                negate all other warranties including, without limitation, implied warranties
                or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Limitations</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In no event shall Shine in the Darkness or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data or profit, or
                due to business interruption) arising out of the use or inability to use the
                materials on the Shine in the Darkness website.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Accuracy of Materials</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The materials appearing on Shine in the Darkness website could include
                technical, typographical, or photographic errors. We do not warrant that any
                of the materials on our website are accurate, complete, or current.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-secondary/30 border-2 border-accent rounded-lg">
              <h2 className="text-foreground">Contact</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you have questions about these terms, contact us at{" "}
                <a
                  href="mailto:hello@shineinthedarkness.org"
                  className="text-primary hover:text-primary/90"
                >
                  hello@shineinthedarkness.org
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
