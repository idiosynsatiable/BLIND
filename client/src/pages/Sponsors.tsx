import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { sponsorNotifications } from "@/lib/notifications";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

/**
 * Sponsors Page
 * Sponsor tiers and inquiry form with notifications.
 */
export default function Sponsors() {
  const tiers = [
    {
      name: "Pinstripe Support",
      amount: "$25/month",
      description: "Monthly supporter",
      features: [
        "Monthly impact updates",
        "Supporter recognition (optional)",
        "Direct access to our community",
      ],
    },
    {
      name: "Gilded Step",
      amount: "$100/month",
      description: "Committed partner",
      features: [
        "Everything in Pinstripe Support",
        "Quarterly impact reports",
        "Exclusive sponsor events",
        "Logo placement on website",
      ],
      featured: true,
    },
    {
      name: "Patron Lift",
      amount: "$250/month",
      description: "Premium partner",
      features: [
        "Everything in Gilded Step",
        "Monthly one-on-one updates",
        "Custom sponsorship opportunities",
        "VIP event access",
        "Strategic partnership discussions",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b-2 border-accent">
          <div className="container">
            <h1 className="text-foreground mb-6">Become a Sponsor</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Partner with us to empower blind and low-vision individuals. Every sponsorship
              directly funds training, community, and opportunity.
            </p>
          </div>
        </section>

        {/* Sponsor Tiers */}
        <section className="py-20 md:py-28">
          <div className="container">
            <h2 className="text-foreground mb-12 text-center">Sponsorship Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-lg border-2 transition-all ${
                    tier.featured
                      ? "border-primary bg-primary/5 shadow-lg scale-105"
                      : "border-accent bg-background hover:shadow-lg"
                  }`}
                >
                  {tier.featured && (
                    <div className="mb-4 inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-foreground font-serif font-bold text-xl mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-accent font-bold text-2xl mb-1">{tier.amount}</p>
                  <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.featured
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "border-2 border-accent text-foreground hover:bg-secondary"
                    }`}
                    variant={tier.featured ? "default" : "outline"}
                  >
                    {tier.featured ? "Get Started" : "Learn More"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* Custom Sponsorship Form */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container max-w-2xl">
            <h2 className="text-foreground mb-6">Custom Sponsorship</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Looking for a tailored partnership? We work with organizations of all sizes to
              create sponsorships that align with your values and goals.
            </p>
            <SponsorInquiryForm />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* Why Sponsor */}
        <section className="py-20 md:py-28 border-t-2 border-accent">
          <div className="container">
            <h2 className="text-foreground mb-12 text-center">Why Sponsor Shine?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Direct Impact",
                  description: "100% of sponsorship funds go directly to programs and participants.",
                },
                {
                  title: "Transparency",
                  description:
                    "Regular updates on how your support is making a difference in real lives.",
                },
                {
                  title: "Community",
                  description: "Join a network of organizations committed to accessibility and dignity.",
                },
                {
                  title: "Values Alignment",
                  description:
                    "Partner with an organization that puts accessibility and dignity first.",
                },
              ].map((reason, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-foreground font-serif font-bold text-lg">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
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

/**
 * Sponsor Inquiry Form Component
 */
function SponsorInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setLoading(false);
        sponsorNotifications.inquiryError();
        return;
      }

      sponsorNotifications.inquirySent();
      setFormData({ name: "", organization: "", email: "", message: "" });
      setLoading(false);
    } catch (error) {
      console.error("Inquiry error:", error);
      setLoading(false);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        sponsorNotifications.networkError();
      } else {
        sponsorNotifications.inquiryError();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full px-4 py-3 border-2 border-accent rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="organization"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Organization (Optional)
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 border-2 border-accent rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          placeholder="Your Company"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full px-4 py-3 border-2 border-accent rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Tell Us About Your Interest
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={loading}
          required
          rows={4}
          className="w-full px-4 py-3 border-2 border-accent rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 resize-none"
          placeholder="Tell us about your organization and sponsorship interests..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !formData.name || !formData.email || !formData.message}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Inquiry"
        )}
      </Button>
    </form>
  );
}
