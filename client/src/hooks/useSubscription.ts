/**
 * Subscription State Hook
 * Manages subscription status and premium access.
 */

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getSupabaseClient } from "@/lib/supabaseClient";

export interface SubscriptionState {
  isPremium: boolean;
  status: string | null;
  loading: boolean;
  error: Error | null;
}

export function useSubscription(): SubscriptionState {
  const { user, loading: authLoading } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setIsPremium(false);
      setStatus(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const client = getSupabaseClient();
        const { data, error: err } = await client
          .from("subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .single();

        if (err && err.code !== "PGRST116") {
          // PGRST116 = no rows found (expected for free users)
          throw err;
        }

        const subscriptionStatus = (data as any)?.status || "free";
        setStatus(subscriptionStatus);
        setIsPremium(subscriptionStatus === "active");
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Subscription error"));
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user, authLoading]);

  return { isPremium, status, loading, error };
}
