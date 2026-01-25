/**
 * Auth State Hook
 * Manages authentication state and user session.
 */

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import {
  getCurrentUser,
  getCurrentSession,
  onAuthStateChange,
} from "@/lib/supabaseClient";

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
    const {
      data: { subscription },
    } = onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { user, session, loading, error };
}
