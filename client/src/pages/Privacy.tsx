import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

/**
 * Privacy Page
 * Privacy policy and data handling practices.
 */
export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        <section className="py-16 md:py-24 border-b-2 border-accent">
          <div className="container">
            <h1 className="text-foreground mb-6">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-foreground">Data We Collect</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We collect minimal personal data. When you make a donation or contact us, we
                collect only what is necessary: name, email, and donation amount. We do not
                collect or store payment card information—Stripe handles all payment processing
                securely.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">How We Use Your Data</h2>
              <ul className="space-y-2 text-lg text-muted-foreground leading-relaxed">
                <li>• To process and confirm your donation</li>
                <li>• To send you receipts and impact updates (if you opt in)</li>
                <li>• To respond to inquiries and support requests</li>
                <li>• To improve our website and services</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Data Protection</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We use industry-standard security practices to protect your data. All data is
                encrypted in transit and at rest. We do not sell or share your personal
                information with third parties.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Your Rights</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You have the right to access, correct, or delete your personal data. Contact
                us at{" "}
                <a
                  href="mailto:privacy@shineinthedarkness.org"
                  className="text-primary hover:text-primary/90"
                >
                  privacy@shineinthedarkness.org
                </a>{" "}
                to exercise these rights.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-foreground">Cookies</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We use privacy-respecting analytics to understand how visitors use our site.
                We do not use tracking cookies or sell data to advertisers.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-secondary/30 border-2 border-accent rounded-lg">
              <h2 className="text-foreground">Questions?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you have questions about our privacy practices, contact us at{" "}
                <a
                  href="mailto:privacy@shineinthedarkness.org"
                  className="text-primary hover:text-primary/90"
                >
                  privacy@shineinthedarkness.org
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
