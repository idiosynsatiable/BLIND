/**
 * Health Check Endpoint
 * Returns safe status information about backend configuration and connectivity.
 * NEVER returns secret values.
 */

import { Router } from "express";
import { getBackendConfig } from "../lib/env.js";
import { inferStripeMode, getStripeClient } from "../lib/stripe.js";
import { createClient } from "@supabase/supabase-js";

const router = Router();

router.get("/api/health", async (req, res) => {
  try {
    const config = getBackendConfig();
    const stripeMode = inferStripeMode(config.stripe.secretKey);

    // Verify Stripe account
    let stripeAccountId = "unknown";
    try {
      const stripe = await getStripeClient();
      const account = await stripe.accounts.retrieve();
      stripeAccountId = account.id;
    } catch (error) {
      console.error("[Health] Stripe verification failed:", error);
    }

    // Check Supabase connectivity
    let supabaseOk = false;
    let supabaseMethod = "none";
    try {
      const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);
      const { error } = await supabase.auth.getSession();
      supabaseOk = !error;
      supabaseMethod = "auth.getSession";
    } catch (error) {
      console.error("[Health] Supabase check failed:", error);
    }

    return res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      backendEnvPresent: {
        STRIPE_SECRET_KEY: !!config.stripe.secretKey,
        STRIPE_EXPECTED_ACCOUNT_ID: !!config.stripe.expectedAccountId,
        STRIPE_WEBHOOK_SECRET: !!config.stripe.webhookSecret,
        SUPABASE_URL: !!config.supabase.url,
        SUPABASE_SERVICE_ROLE_KEY: !!config.supabase.serviceRoleKey,
      },
      stripeMode,
      stripeAccountId,
      supabaseCheck: {
        ok: supabaseOk,
        method: supabaseMethod,
      },
    });
  } catch (error) {
    console.error("[Health] Error:", error);
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export const healthRouter = router;
