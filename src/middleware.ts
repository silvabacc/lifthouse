import { createServerClient, type CookieOptions } from "@supabase/ssr";
import Joi from "joi";
import { NextResponse, type NextRequest } from "next/server";

async function AuthMiddleware(request: NextRequest, response: NextResponse) {
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
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
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
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && request.nextUrl.pathname === "/") {
    response = NextResponse.redirect(new URL("/lifthouse", request.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && request.nextUrl.pathname !== "/") {
    response = NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

async function validateWorkoutBody(body: any, response: NextResponse) {
  try {
    const schema = Joi.object({
      userId: Joi.string().uuid().required(),
    });

    await schema.validateAsync(body);
  } catch (e: any) {
    response = NextResponse.json({ error: e.message }, { status: 400 });
  }

  return response;
}

async function validateWorkoutCreateBody(body: any, response: NextResponse) {
  try {
    const schema = Joi.object({
      userId: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().optional(),
    });

    await schema.validateAsync(body);
  } catch (e: any) {
    response = NextResponse.json({ error: e.message }, { status: 400 });
  }

  return response;
}

export async function middleware(request: NextRequest) {
  let next = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (request.nextUrl.pathname.startsWith("/lifthouse")) {
    next = await AuthMiddleware(request, next);
  }

  /**
   * Requests with bodies are validated here
   */
  if (request.bodyUsed === false) {
    return next;
  }
  const body = await request.json();

  if (
    request.nextUrl.pathname === "/api/workouts" &&
    request.method === "POST"
  ) {
    next = await validateWorkoutBody(body, next);
  }

  if (
    request.nextUrl.pathname === "/api/workouts/create" &&
    request.method === "POST"
  ) {
    next = await validateWorkoutCreateBody(body, next);
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
