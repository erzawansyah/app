import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const host = process.env.NEXT_PUBLIC_HOST;
  const protectedRoutes = ["/dashboard", "/vouchers", "/settings", "/events"];
  const publicRoutes = ["/", "/login", "/register"];

  // Route yang bisa diakses oleh user yang sudah login
  // Jika user sudah login, maka user bisa mengakses route yang ada di dalam array protectedRoutes beserta route childnya
  if (user) {
    if (
      protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      ) ||
      request.nextUrl.pathname === "/"
    ) {
      return response;
    }

    // Redirect ke halaman dashboard jika user sudah login
    return NextResponse.redirect(`${host}/dashboard`);
  }

  // Route yang bisa diakses oleh user yang belum login
  // Jika user belum login, maka user bisa mengakses route yang ada di dalam array publicRoutes
  if (!user && publicRoutes.includes(request.nextUrl.pathname)) {
    return response;
  }

  // Redirect ke halaman login jika user belum login
  return NextResponse.redirect(`${host}/login`);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
