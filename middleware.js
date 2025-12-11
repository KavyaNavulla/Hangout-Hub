import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Allow public routes
    if (
        pathname === "/" ||
        pathname.startsWith("/api/auth") // login/register routes
    ) {
        return NextResponse.next();
    }

    // Block protected routes
    if (!token) {
        const loginUrl = new URL("/", req.url);
        loginUrl.searchParams.set("message", "Please login first");
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Protect these paths:
export const config = {
    matcher: [
        "/home",
        "/profile/:path*",
        "/plan/:path*",
        "/api/:path*", // if token needed for API too
    ],
};
