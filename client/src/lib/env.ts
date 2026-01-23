/**
 * Environment Variable Validation
 * Gracefully handles missing env vars with fallback state.
 * Allows app to render even without Supabase/Stripe configured.
 */

export interface EnvConfig {
  supabase: {
    url: string | null;
    anonKey: string | null;
    configured: boolean;
  };
  stripe: {
    publicKey: string | null;
    priceId: string | null;
    configured: boolean;
  };
  app: {
    url: string | null;
  };
}

function getEnv(key: string, isPublic: boolean = false): string | null {
  const prefix = isPublic ? "VITE_" : "";
  const value = import.meta.env[`${prefix}${key}`];
  return value || null;
}

export function validateEnv(): EnvConfig {
  const supabaseUrl = getEnv("SUPABASE_URL", true);
  const supabaseAnonKey = getEnv("SUPABASE_ANON_KEY", true);
  const stripePublicKey = getEnv("STRIPE_PUBLIC_KEY", true);
  const stripePriceId = getEnv("STRIPE_PRICE_ID", true);
  const appUrl = getEnv("APP_URL", true);

  const config: EnvConfig = {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
      configured: !!(supabaseUrl && supabaseAnonKey),
    },
    stripe: {
      publicKey: stripePublicKey,
      priceId: stripePriceId,
      configured: !!(stripePublicKey && stripePriceId),
    },
    app: {
      url: appUrl || "http://localhost:3000",
    },
  };

  if (!config.supabase.configured) {
    console.warn(
      "Supabase not configured. Auth features will be unavailable. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable."
    );
  }

  if (!config.stripe.configured) {
    console.warn(
      "Stripe not configured. Donation features will be unavailable. Set VITE_STRIPE_PUBLIC_KEY and VITE_STRIPE_PRICE_ID to enable."
    );
  }

  return config;
}

// Lazy-load config on first access
let config: EnvConfig | null = null;

export function getConfig(): EnvConfig {
  if (!config) {
    config = validateEnv();
  }
  return config;
}

export function isSupabaseConfigured(): boolean {
  return getConfig().supabase.configured;
}

export function isStripeConfigured(): boolean {
  return getConfig().stripe.configured;
}
