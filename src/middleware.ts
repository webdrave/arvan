import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

// Define paths that require admin access
const adminRoutes = ["/admin", "/api/admin"];

export async function middleware(req: NextRequest) {
    try {
        console.log("🟢 Middleware Executed")
        console.log(" cookie: ", req.cookies)

        const sessionToken = process.env.NODE_ENV === "production" ? req.cookies.get("__Secure-next-auth.session-token")?.value : req.cookies.get("authjs.session-token")?.value;
        
        console.log("🟢 Session Token Received:", sessionToken);

        if (!sessionToken) {
            return NextResponse.redirect(new URL("/api/auth/signin", req.url));
        }

        console.log("🟢 Session Token Received:", sessionToken);

        const token = await decode({
            token: sessionToken,
            secret: process.env.NEXTAUTH_SECRET as string,
            salt: process.env.NODE_ENV === "production"
                ? "__Secure-authjs.session-token"
                : "authjs.session-token",
        });
        
        console.log("🟢 Token Received:", token);

        // If no token after decode, redirect to login page
        if (!token) {
            return NextResponse.redirect(new URL("/api/auth/signin", req.url));
        }

        // Check if the route requires admin access
        const isAdminRoute = adminRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

        if (isAdminRoute) {
            // Ensure the user is an admin
            if (!token.role || token.role !== "admin") {
                // Redirect unauthorized users to the home page
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return NextResponse.next(); // Allow the request to proceed
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
}

// Apply middleware to specific paths
export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"], // Apply to all admin routes
};
