import { NextResponse } from "next/server";

/**
 * Wraps a route handler so unexpected errors (Supabase failures, bugs)
 * return a clean JSON 500 instead of leaking a stack trace, and are logged
 * server-side for Vercel's log drain.
 *
 * Usage:
 *   export const GET = apiRoute(async (request) => { ... });
 */
export function apiRoute<Args extends unknown[]>(
  handler: (...args: Args) => Promise<NextResponse | Response>
) {
  return async (...args: Args): Promise<NextResponse | Response> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("[api]", error);
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}
