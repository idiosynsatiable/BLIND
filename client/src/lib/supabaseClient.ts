/**
 * Supabase Browser Client
 * Initializes Supabase client for auth and database access.
 * Server-side operations use service role key (via API routes).
 */

import { createClient } from "@supabase/supabase-js";
import { getConfig } from "./env";

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    const config = getConfig();
    supabaseClient = createClient(config.supabase.url, config.supabase.anonKey);
  }
  return supabaseClient;
}

/**
 * Get current user session
 */
export async function getCurrentSession() {
  const client = getSupabaseClient();
  const {
    data: { session },
  } = await client.auth.getSession();
  return session;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const client = getSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
}

/**
 * Sign up with email
 */
export async function signUpWithEmail(email: string, password: string) {
  const client = getSupabaseClient();
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
  return client.auth.signOut();
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: any) => void
) {
  const client = getSupabaseClient();
  return client.auth.onAuthStateChange(callback);
}
