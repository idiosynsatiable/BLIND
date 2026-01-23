import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { donationNotifications } from "@/lib/notifications";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";

/**
 * Donate Page
 * Stripe Checkout integration with notifications for success/error/info states.
 * Design: Luxury-minimal with clear CTA and accessibility.
 * Notifications: Toast-only, theme-aligned, accessible.
 */
export default function Donate() {
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const donationTiers = [
    { label: "Pinstripe Support", amount: 25 },
    { label: "Gilded Step", amount: 100 },
    { label: "Patron Lift", amount: 250 },
  ];

  const handleDonate = async (amount: number) => {
    setLoading(true);
    setSelectedAmount(amount);

    try {
      donationNotifications.checkoutRedirect();

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        setLoading(false);
        setSelectedAmount(null);
        donationNotifications.paymentFailed();
        return;
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Donation error:", error);
      setLoading(false);
      setSelectedAmount(null);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        donationNotifications.networkError();
      } else {
        donationNotifications.unexpectedError();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 border-b-2 border-accent">
          <div className="container">
            <h1 className="text-foreground mb-6">Support Our Mission</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Every donation directly funds training programs, accessibility resources, and
              community initiatives. Thank you for believing in dignity and opportunity.
            </p>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="py-20 md:py-28">
          <div className="container">
            <h2 className="text-foreground mb-12 text-center">Choose Your Support Level</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {donationTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => handleDonate(tier.amount)}
                  disabled={loading}
                  className={`p-8 rounded-lg border-2 transition-all text-left ${
                    selectedAmount === tier.amount
                      ? "border-primary bg-primary/5"
                      : "border-accent bg-background hover:shadow-lg"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label={`Donate ${tier.amount} dollars - ${tier.label}`}
                >
                  <h3 className="text-foreground font-serif font-bold text-lg mb-2">
                    {tier.label}
                  </h3>
                  <p className="text-accent font-bold text-2xl mb-4">${tier.amount}</p>
                  <p className="text-muted-foreground text-sm mb-6">One-time donation</p>

                  <div className="flex items-center gap-2">
                    {loading && selectedAmount === tier.amount ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <span className="text-sm text-foreground">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 text-accent" />
                        <span className="text-sm font-semibold text-foreground">
                          Donate Now
                        </span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* Custom Amount */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container max-w-2xl">
            <h2 className="text-foreground mb-6 text-center">Custom Amount</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Want to give a different amount? Enter your custom donation below.
            </p>
            <CustomDonationForm onDonate={handleDonate} isLoading={loading} />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-accent" />

        {/* Impact Section */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl">
            <h2 className="text-foreground mb-12 text-center">Your Impact</h2>
            <div className="space-y-6">
              {[
                {
                  amount: "$25",
                  impact: "Funds one hour of accessibility consulting training",
                },
                {
                  amount: "$100",
                  impact: "Provides audio equipment for one participant",
                },
                {
                  amount: "$250",
                  impact: "Supports one month of mentorship for a participant",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-secondary/30 border-l-4 border-accent rounded">
                  <div className="font-bold text-accent text-lg min-w-fit">{item.amount}</div>
                  <p className="text-muted-foreground">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Note */}
        <section className="py-12 bg-background border-t-2 border-accent">
          <div className="container text-center">
            <p className="text-sm text-muted-foreground">
              All donations are processed securely through Stripe. We never store your payment
              information. Your privacy is protected.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Custom Donation Form Component
 */
function CustomDonationForm({
  onDonate,
  isLoading,
}: {
  onDonate: (amount: number) => void;
  isLoading: boolean;
}) {
  const [customAmount, setCustomAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customAmount, 10);

    if (!amount || amount < 1) {
      return;
    }

    onDonate(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-foreground">$</span>
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Enter amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3 border-2 border-accent rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          aria-label="Custom donation amount in dollars"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !customAmount}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Heart className="mr-2 w-4 h-4" />
            Donate
          </>
        )}
      </Button>
    </form>
  );
}
