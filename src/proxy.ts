import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export function proxy (request: NextRequest) {
    const session = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/chat") && !session) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (pathname === "/login" || pathname === "/register") {
        if(session) {
            return NextResponse.redirect(new URL("/chat", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/chat/:path", "/login", "/register"]
}