/**
 * Stripe Utility Functions
 * Client-side helpers for Stripe Checkout integration.
 * Gracefully handles missing Stripe configuration.
 */

import { loadStripe } from "@stripe/stripe-js";
import { getConfig, isStripeConfigured } from "./env";

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export async function getStripe() {
  if (!isStripeConfigured()) {
    return null;
  }

  if (!stripePromise) {
    const config = getConfig();
    if (config.stripe.publicKey) {
      stripePromise = loadStripe(config.stripe.publicKey);
    }
  }
  return stripePromise;
}

export async function startCheckout(amount: number): Promise<void> {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
}

/**
 * Create checkout session for premium subscription
 */
export async function createCheckoutSession() {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("Failed to create checkout session");
  }

  const { sessionId } = await response.json();
  return sessionId;
}

/**
 * Redirect to Stripe Checkout via session
 */
export async function redirectToCheckout(checkoutUrl: string) {
  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  }
}
