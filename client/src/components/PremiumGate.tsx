/**
 * Premium Gate Component
 * Conditionally renders content based on subscription status.
 */

import { ReactNode } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

export interface PremiumGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function PremiumGate({ children, fallback }: PremiumGateProps) {
  const { isPremium, subscriptionLoading } = useAuthContext();

  if (subscriptionLoading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (!isPremium) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

/**
 * Requires authentication
 */
export function AuthGate({ children, fallback }: PremiumGateProps) {
  const { user, authLoading } = useAuthContext();

  if (authLoading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (!user) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
