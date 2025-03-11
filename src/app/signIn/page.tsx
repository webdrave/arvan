"use client";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Signin = () => {
  const router = useRouter();
  const handleSubmit = () => {
    alert("SignIn Page Logic Here.");
  };
  return (
    <AuthLayout>
      <>
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-1">Hello User</h1>
          <p className="text-gray-400 text-lg sm:text-xl">
            Welcome Back to Arvan
          </p>
        </div>

        <form className="bg-transparent" onSubmit={handleSubmit}>
          <div className="rounded-xl mb-4 border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
            />
          </div>

          <div className="mb-4 rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
            />
          </div>
          <p
            className="relative text-end mt-3 mb-6 text-sm text-lime-400"
            onClick={() => router.push("/forgotPassword")}
          >
            <Link href={"/forgotPassword"}>Forget Password?</Link>
          </p>

          <button className="relative w-full p-3 text-black font-bold text-lg sm:text-xl rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]">
            Login
          </button>
        </form>
        <div className="text-center mt-6 text-sm text-lime-400">
          Don't have an account?{" "}
          <button
            className="text-gray-400 font-bold"
            onClick={() => router.push("/signUp")}
          >
            Sign Up
          </button>
        </div>
      </>
    </AuthLayout>
  );
};

export default Signin;
