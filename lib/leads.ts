import { createHash } from "node:crypto";

/**
 * Lead persistence against the shared Supabase `leads` table.
 *
 * Written with a plain fetch to PostgREST rather than @supabase/supabase-js:
 * this is one authenticated INSERT, and the SDK is ~60 kB of client to do it.
 * If this file ever grows past a couple of queries, swap it for the SDK.
 *
 * SERVICE ROLE KEY. It bypasses row level security and must never reach the
 * browser. It is read here, in a server-only module imported by a route
 * handler — never prefix it with NEXT_PUBLIC_.
 */

export type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isRealtor: string;
  budget: string;
  timeline: string;
  referer: string;
  userAgent: string;
  ip: string | null;
};

/**
 * Which site this lead came from. Hard-coded rather than derived from the
 * request host so that preview deployments and localhost do not invent new
 * project slugs in the shared table.
 */
export const LEAD_PROJECT = "aura-lakeview-village";
export const LEAD_DOMAIN = "auralakeviewvillage.org";

/**
 * Raw IPs are personal data under PIPEDA and buy us nothing here — the only
 * question we ask of an IP is "did this one submit forty times today", which a
 * salted hash answers just as well.
 */
function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.LEAD_IP_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

function utm(referer: string) {
  try {
    const p = new URL(referer).searchParams;
    return {
      utm_source: p.get("utm_source"),
      utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"),
    };
  } catch {
    return { utm_source: null, utm_medium: null, utm_campaign: null };
  }
}

export function isConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Returns true if the row landed. Never throws: a failed insert must not cost
 * the visitor their download, and the caller logs the lead either way so it
 * stays recoverable from the server log.
 */
export async function saveLead(lead: LeadInput): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn("[lead] Supabase is not configured — lead not persisted");
    return false;
  }

  const row = {
    project: LEAD_PROJECT,
    domain: LEAD_DOMAIN,
    name: `${lead.firstName} ${lead.lastName}`.trim(),
    email: lead.email,
    phone: lead.phone,
    message: null,
    // Site-specific answers live here so the shared schema never has to change.
    details: {
      firstName: lead.firstName,
      lastName: lead.lastName,
      isRealtor: lead.isRealtor || null,
      budget: lead.budget || null,
      timeline: lead.timeline || null,
    },
    ...utm(lead.referer),
    referer: lead.referer || null,
    user_agent: lead.userAgent || null,
    ip_hash: hashIp(lead.ip),
  };

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        // Keep the response empty; we do not need the row echoed back.
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      console.error("[lead] Supabase insert failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] Supabase insert threw", err);
    return false;
  }
}
