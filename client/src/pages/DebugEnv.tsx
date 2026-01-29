/**
 * Debug Environment Page
 * Shows presence of required VITE_* environment variables.
 * Only accessible in development or when VITE_DEBUG=true.
 * NEVER shows actual values.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "wouter";

export function DebugEnv() {
  const [navigate] = useNavigate();
  const [buildInfo, setBuildInfo] = useState({
    isDev: import.meta.env.DEV,
    debugEnabled: import.meta.env.VITE_DEBUG === "true",
  });

  useEffect(() => {
    // Gate access: only allow in dev or when VITE_DEBUG=true
    const isDev = import.meta.env.DEV;
    const debugEnabled = import.meta.env.VITE_DEBUG === "true";

    if (!isDev && !debugEnabled) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const envVars = {
    "VITE_SUPABASE_URL": !!import.meta.env.VITE_SUPABASE_URL,
    "VITE_SUPABASE_ANON_KEY": !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    "VITE_STRIPE_PUBLISHABLE_KEY": !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    "VITE_APP_URL": !!import.meta.env.VITE_APP_URL,
    "VITE_ANALYTICS_ENDPOINT": !!import.meta.env.VITE_ANALYTICS_ENDPOINT,
    "VITE_ANALYTICS_WEBSITE_ID": !!import.meta.env.VITE_ANALYTICS_WEBSITE_ID,
  };

  const allPresent = Object.values(envVars).every((v) => v);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug: Environment Variables</h1>

        <div className="space-y-6">
          {/* Build Info */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Build Information</h2>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <span className="text-muted-foreground">Mode:</span>{" "}
                <span className={buildInfo.isDev ? "text-green-600" : "text-blue-600"}>
                  {buildInfo.isDev ? "development" : "production"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Debug Enabled:</span>{" "}
                <span className={buildInfo.debugEnabled ? "text-green-600" : "text-red-600"}>
                  {buildInfo.debugEnabled ? "yes" : "no"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Build Time:</span>{" "}
                <span>{new Date().toISOString()}</span>
              </div>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Frontend Environment Variables</h2>
            <div className="space-y-3">
              {Object.entries(envVars).map(([key, present]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-background rounded border border-border">
                  <span className="font-mono text-sm">{key}</span>
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      present ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {present ? "✓ Present" : "✗ Missing"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Summary */}
          <div className={`rounded-lg p-6 border-2 ${allPresent ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
            <h2 className="text-xl font-semibold mb-2">Status</h2>
            <p className={allPresent ? "text-green-800" : "text-red-800"}>
              {allPresent ? "✓ All required environment variables are present" : "✗ Some required environment variables are missing"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
