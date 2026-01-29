/**
 * Stripe Client Initialization with Account Verification
 * Verifies that the configured Stripe account matches expectations.
 */

import Stripe from "stripe";
import { getBackendConfig } from "./env.js";

let stripeClient: Stripe | null = null;

export async function getStripeClient(): Promise<Stripe> {
  if (stripeClient) {
    return stripeClient;
  }

  const config = getBackendConfig();
  stripeClient = new Stripe(config.stripe.secretKey);

  // Verify account correctness on first initialization
  try {
    const account = await stripeClient.accounts.retrieve();
    if (account.id !== config.stripe.expectedAccountId) {
      throw new Error(
        `Wrong Stripe account configured: expected ${config.stripe.expectedAccountId}, got ${account.id}`
      );
    }
    console.log(`[Stripe] Account verified: ${account.id}`);
  } catch (error) {
    console.error("[Stripe] Account verification failed:", error);
    throw error;
  }

  return stripeClient;
}

/**
 * Infer Stripe mode from secret key prefix
 * sk_test_* = test mode
 * sk_live_* = live mode
 */
export function inferStripeMode(secretKey: string): "test" | "live" {
  if (secretKey.startsWith("sk_test_")) return "test";
  if (secretKey.startsWith("sk_live_")) return "live";
  return "test"; // Default to test for safety
}
