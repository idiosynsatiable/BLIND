/**
 * Backend Environment Variable Validation
 * Ensures all required server env vars are present at startup.
 * NEVER logs secret values.
 */

export interface BackendEnvConfig {
  stripe: {
    secretKey: string;
    expectedAccountId: string;
    webhookSecret?: string;
  };
  supabase: {
    url: string;
    serviceRoleKey: string;
  };
  app: {
    url: string;
  };
}

function validateEnvVar(key: string, optional: boolean = false): string | undefined {
  const value = process.env[key];
  if (!value && !optional) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function validateBackendEnv(): BackendEnvConfig {
  const config: BackendEnvConfig = {
    stripe: {
      secretKey: validateEnvVar("STRIPE_SECRET_KEY")!,
      expectedAccountId: validateEnvVar("STRIPE_EXPECTED_ACCOUNT_ID")!,
      webhookSecret: validateEnvVar("STRIPE_WEBHOOK_SECRET", true),
    },
    supabase: {
      url: validateEnvVar("SUPABASE_URL")!,
      serviceRoleKey: validateEnvVar("SUPABASE_SERVICE_ROLE_KEY")!,
    },
    app: {
      url: validateEnvVar("APP_URL") || "http://localhost:3000",
    },
  };

  return config;
}

// Lazy-load config on first access
let config: BackendEnvConfig | null = null;

export function getBackendConfig(): BackendEnvConfig {
  if (!config) {
    config = validateBackendEnv();
  }
  return config;
}
