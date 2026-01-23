/**
 * Auth State Hook
 * Manages authentication state and user session.
 * Gracefully handles missing Supabase configuration.
 */

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import {
  getCurrentUser,
  getCurrentSession,
  onAuthStateChange,
} from "@/lib/supabaseClient";
import { isSupabaseConfigured } from "@/lib/env";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If Supabase not configured, skip auth initialization
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    const initAuth = async () => {
      try {
        const [currentSession, currentUser] = await Promise.all([
          getCurrentSession(),
          getCurrentUser(),
        ]);
        setSession(currentSession);
        setUser(currentUser);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Auth error"));
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen to auth state changes
    const result = onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => {
      if (result?.data?.subscription) {
        result.data.subscription.unsubscribe();
      }
    };
  }, []);

  return { user, session, loading, error };
}
