import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Firebase Auth stores tokens in IndexedDB/localStorage (client-side only),
// NOT in cookies. The proxy/edge runtime has no access to those.
// Route protection is handled client-side via onAuthStateChanged in each page.
// This proxy only exists to satisfy Next.js routing conventions.
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/my-recipes/:path*",
    "/saved-recipes/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
