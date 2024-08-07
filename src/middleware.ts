import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import getConfig from "./config";

const { pageUrl } = getConfig();

async function AuthMiddleware(
  request: NextRequest,
  response: NextResponse,
  supabase: SupabaseClient
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && request.nextUrl.pathname === "/") {
    response = NextResponse.redirect(new URL(pageUrl, request.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (
    !user &&
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/_next/")
  ) {
    response = NextResponse.redirect(new URL("/", request.url));
  }

  // Checks if the user is requesting their own workout plan, and not someone else's
  if (
    user &&
    new RegExp(`^\/${pageUrl}\/workouts\/(\\d+)$`).test(
      request.nextUrl.pathname
    ) &&
    request.method === "GET"
  ) {
    const workoutId = request.nextUrl.pathname.split("/").pop();

    if (workoutId) {
      const { error } = await supabase
        .from("workouts")
        .select("*")
        .eq("workout_id", workoutId)
        .eq("user_id", user?.id)
        .single();

      if (error) {
        response = NextResponse.redirect(
          `${request.nextUrl.origin}${pageUrl}/workouts`
        );
      }
    }
  }

  return response;
}

export async function middleware(request: NextRequest) {
  let next = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          next = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          next.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          next = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          next.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  if (request.nextUrl.pathname === "/") {
    next = await AuthMiddleware(request, next, supabase);
  }

  if (request.nextUrl.pathname.startsWith(pageUrl)) {
    next = await AuthMiddleware(request, next, supabase);
  }

  return next;
}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     // "/((?!_next/static|_next/image|favicon.ico|account/|auth/).*)",
//     "/",
//     "/lifthouse/:path*",
//     "/api/:path*",
//   ],
// };
