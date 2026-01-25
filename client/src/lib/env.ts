/**
 * Environment Variable Validation
 * Ensures all required env vars are present and valid at runtime.
 */

export interface EnvConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  stripe: {
    publicKey: string;
    priceId: string;
  };
  app: {
    url: string;
  };
}

function getEnv(key: string, isPublic: boolean = false): string {
  const prefix = isPublic ? "VITE_" : "";
  const value = import.meta.env[`${prefix}${key}`];

  if (!value) {
    throw new Error(
      `Missing environment variable: ${prefix}${key}. Check your .env file.`
    );
  }

  return value;
}

export function validateEnv(): EnvConfig {
  try {
    return {
      supabase: {
        url: getEnv("SUPABASE_URL", true),
        anonKey: getEnv("SUPABASE_ANON_KEY", true),
      },
      stripe: {
        publicKey: getEnv("STRIPE_PUBLIC_KEY", true),
        priceId: getEnv("STRIPE_PRICE_ID", true),
      },
      app: {
        url: getEnv("APP_URL", true),
      },
    };
  } catch (error) {
    console.error("Environment validation failed:", error);
    throw error;
  }
}

// Lazy-load config on first access
let config: EnvConfig | null = null;

export function getConfig(): EnvConfig {
  if (!config) {
    config = validateEnv();
  }
  return config;
}
