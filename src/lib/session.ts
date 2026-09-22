"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { demoUsers } from "@/lib/data/users";
import type { DemoUser } from "@/lib/types";

/**
 * DEMO SESSION — NOT real authentication.
 *
 * There is no password, no server-side session store, and no verification of
 * identity here. Choosing a persona on /login sets a plain, readable cookie
 * naming which fixture user to render as. This exists purely to demonstrate
 * role-based UI/navigation for the portfolio demo. See docs/SECURITY.md for
 * what a real implementation would require (hashed credentials, JWT/session
 * store, MFA for sensitive roles, etc.).
 */
const COOKIE_NAME = "meridian_demo_user";

export async function getDemoUser(): Promise<DemoUser | null> {
  const store = await cookies();
  const id = store.get(COOKIE_NAME)?.value;
  if (!id) return null;
  return demoUsers.find((u) => u.id === id) ?? null;
}

export async function requireDemoUser(): Promise<DemoUser> {
  const user = await getDemoUser();
  if (!user) redirect("/login");
  return user;
}

export async function setDemoSession(userId: string) {
  const user = demoUsers.find((u) => u.id === userId);
  if (!user) throw new Error("Unknown demo persona");
  const store = await cookies();
  store.set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/dashboard");
}

export async function clearDemoSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/");
}
