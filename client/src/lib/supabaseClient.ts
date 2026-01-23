/**
 * Supabase Browser Client
 * Gracefully handles missing Supabase credentials.
 * Returns null client if not configured, allowing app to render.
 */

import { createClient } from "@supabase/supabase-js";
import { getConfig, isSupabaseConfigured } from "./env";

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseClient) {
    const config = getConfig();
    if (config.supabase.url && config.supabase.anonKey) {
      supabaseClient = createClient(config.supabase.url, config.supabase.anonKey);
    }
  }
  return supabaseClient;
}

/**
 * Get current user session
 */
export async function getCurrentSession() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const {
      data: { session },
    } = await client.auth.getSession();
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const {
      data: { user },
    } = await client.auth.getUser();
    return user;
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
}

/**
 * Sign up with email
 */
export async function signUpWithEmail(email: string, password: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase not configured");
  }

  return client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getConfig().app.url}/auth/callback`,
    },
  });
}

/**
 * Sign in with email
 */
export async function signInWithEmail(email: string, password: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase not configured");
  }

  return client.auth.signInWithPassword({
    email,
    password,
  });
}

/**
 * Sign in with magic link
 */
export async function signInWithMagicLink(email: string) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase not configured");
  }

  return client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getConfig().app.url}/auth/callback`,
    },
  });
}

/**
 * Sign out
 */
export async function signOut() {
  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  return client.auth.signOut();
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: any) => void
) {
  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  return client.auth.onAuthStateChange(callback);
}
