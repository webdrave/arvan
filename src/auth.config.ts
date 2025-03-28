/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/types/types";
import { prisma } from "@/lib/prisma-client";
import { CredentialsSignin } from "next-auth";
import { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";





export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        mobileNumber: { label: "Mobile Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials:any) => {
        console.log("🟢 Credentials Received:", credentials);

        const { mobileNumber, password } = credentials;
        const { data, success } = LoginSchema.safeParse({
          mobileNumber,
          password,
        });

        if (!success) {
          console.error("❌ Validation Failed:", data);
          throw new CredentialsSignin({ cause: "Required fields missing" });
        }

        // console.log("✅ Validation Passed:", data);

        const user = await prisma.user.findUnique({
          where: { mobile_no: data.mobileNumber },
        });

        // console.log("🔍 User Found:", user);

        if (!user) {
          console.error("❌ User Not Found");
          throw new CredentialsSignin({
            cause: "Invalid credentials or user not found",
          });
        }
        // if (!user?.isPhoneNoVerified) {
        //   console.error("❌ User Not Verified");
        //   throw new CredentialsSignin({ cause: "User not verified" });
        // }

        if (!user.password) {
          console.error("❌ User Signed Up with Social Media");
          throw new CredentialsSignin({
            cause: "User signed up with social media",
          });
        }

        const isPasswordValid = await bcryptjs.compare(data.password, user.password);
        // console.log("🔐 Password Check:", isPasswordValid);

        if (!isPasswordValid) {
          console.error("❌ Invalid Password");
          throw new CredentialsSignin({
            cause: "Invalid credentials or user not found",
          });
        }

        // console.log("✅ Authentication Successful");
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    // authorized({ request: { nextUrl }, auth }: any) {
    //   const isLoggedIn = !!auth?.user;
    //   const { pathname } = nextUrl;
    //   console.log("Authorize callback called with:");
    //   console.log("Pathname:", pathname);
    //   console.log("Auth:", auth);
    //   console.log("isLoggedIn:", isLoggedIn);
    
    //   // 1. Admin routes: if the URL starts with "/admin"
    //   if (pathname.startsWith("/admin")) {
    //     console.log("Route starts with /admin");
    //     if (!isLoggedIn) {
    //       console.log("User not logged in; redirecting to /signIn");
    //       return Response.redirect(new URL("/signIn", nextUrl));
    //     }
    //     if (auth.user.role !== "admin") {
    //       console.log("User logged in but not admin; redirecting to /");
    //       return Response.redirect(new URL("/", nextUrl));
    //     }
    //     console.log("Admin access granted");
    //     return true; // Allow admin access
    //   }
    
    //   // 2. Public routes: Allow routes like "/", "/contact", "/product", "/about"
    //   if (
    //     publicRoute.some((route) =>
    //       pathname === route || pathname.startsWith(`${route}/`)
    //     )
    //   ) {
    //     console.log("Route is public; access granted");
    //     return true;
    //   }
    
    //   // 3. Auth routes: accessible to non–logged-in users.
    //   if (
    //     authRoute.some((route) =>
    //       pathname === route || pathname.startsWith(`${route}/`)
    //     )
    //   ) {
    //     if (isLoggedIn) {
    //       console.log("Logged-in user trying to access an auth route; redirecting to /");
    //       return Response.redirect(new URL("/", nextUrl));
    //     } else {
    //       console.log("Auth route accessible to non-logged-in user; access granted");
    //       return true;
    //     }
    //   }
    
    //   // 4. For all other routes, require user to be logged in.
    //   if (!isLoggedIn) {
    //     console.log("User not logged in; redirecting to /signIn for protected route");
    //     return Response.redirect(new URL("/signIn", nextUrl));
    //   }
    //   console.log("User logged in; access granted");
    //   return true;
    // }
   

    jwt({ token, user }: any) {

      if (user) {
        token.id = user.id;
        token.picture = user.image;
        token.mobile_no = user.mobile_no;
        token.role = user.role; // Store user role
      }
      return token;
    },

    session({ session, token }: any) {
      console.log("🔄 Creating Session...");
      console.log("🔹 Token Data:", token);

      if (session.user) {
        session.user.id = token.id;
        session.user.image = token.picture;
        session.user.mobile_no = token.mobile_no;
        session.user.role = token.role as "admin" | "user"; 
      }
      console.log("✅ Session Created:", session);

      return session;

      // 🚀 Redirect users to "/" after signing in
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  }
} satisfies NextAuthConfig;