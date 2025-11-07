import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./services/server/auth-server.service";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Si l'utilisateur essaie d'accéder à /space sans token
  if (pathname.startsWith("/space") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Vérifier le token avec le backend
  if (token) {
    const isValid = await verifyToken(token);

    if (!isValid && pathname.startsWith("/space")) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }

    if (
      isValid &&
      (pathname.startsWith("/auth/login") ||
        pathname.startsWith("/auth/register"))
    ) {
      return NextResponse.redirect(new URL("/space/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/space/:path*", "/auth/:path*"],
};
