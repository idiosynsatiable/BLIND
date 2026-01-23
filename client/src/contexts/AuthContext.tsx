/**
 * Auth Context
 * Provides authentication and subscription state to the app.
 * Gracefully handles missing Supabase/Stripe configuration.
 */

import React, { createContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { isSupabaseConfigured, isStripeConfigured } from "@/lib/env";

export interface AuthContextType {
  user: any | null;
  session: any | null;
  authLoading: boolean;
  authError: Error | null;
  isPremium: boolean;
  subscriptionStatus: string | null;
  subscriptionLoading: boolean;
  subscriptionError: Error | null;
  supabaseConfigured: boolean;
  stripeConfigured: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, session, loading: authLoading, error: authError } = useAuth();
  const {
    isPremium,
    status: subscriptionStatus,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useSubscription();

  const supabaseConfigured = isSupabaseConfigured();
  const stripeConfigured = isStripeConfigured();

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        authLoading,
        authError,
        isPremium,
        subscriptionStatus,
        subscriptionLoading,
        subscriptionError,
        supabaseConfigured,
        stripeConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
