/**
 * Auth Context
 * Provides authentication and subscription state to the app.
 */

import React, { createContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

export interface AuthContextType {
  user: any | null;
  session: any | null;
  authLoading: boolean;
  authError: Error | null;
  isPremium: boolean;
  subscriptionStatus: string | null;
  subscriptionLoading: boolean;
  subscriptionError: Error | null;
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
