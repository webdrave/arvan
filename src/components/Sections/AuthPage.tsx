"use client";
import React, { useState } from "react";
import Image from "next/image";
import GridLogin from "../GridLogin";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", mobileNumber, password);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up with:", mobileNumber, password, confirmPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white relative overflow-hidden">
      {/* Back button */}
      <button className="absolute top-4 left-4 bg-lime-400 text-black font-bold py-1 px-4 rounded">
        Back
      </button>

      {/* Grid Background Effect */}
      <div className="absolute inset-0 hidden lg:block">
        <GridLogin />
      </div>

      <Image
        src={"/logo.svg"}
        width={40}
        height={80}
        alt="logo"
        className="object-cover absolute top-4 right-0 -translate-x-1/2"
      />

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row justify-center gap-10 w-full z-10 max-w-6xl h-auto rounded-lg overflow-hidden p-4">
        <div
          className="hidden lg:block w-1/2 h-[80vh] rounded-lg bg-cover bg-center border-2 border-lime-400"
          style={{
            backgroundImage: "url('/bgslides/bg-1.png')",
            filter: "brightness(1.1) contrast(1.1)",
          }}
        />

        {/* Login & SignUp Container */}
        <div className="w-full lg:w-1/2  sm:p-10 flex flex-col justify-start">
          {isSignUp ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-4xl sm:text-6xl font-bold mb-1">
                  Create Account
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl">
                  Welcome to Arvan
                </p>
              </div>

              <form onSubmit={handleSignUp} className="bg-transparent">
                <div className="rounded-xl mb-4 border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>

                <div className="mb-4 rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4 rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-4 sm:p-5 text-white bg-transparent rounded-xl outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button className="relative w-full p-3 text-black font-bold text-lg sm:text-xl rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]">
                  Sign Up
                </button>

                <div className="text-center mt-6 text-sm text-lime-400">
                  Already have an account?{"  "}
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="text-gray-400 font-bold"
                  >
                    Login
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-4xl sm:text-6xl font-bold mb-1">
                  Hello User
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl">
                  Welcome Back to Arvan
                </p>
              </div>

              <form onSubmit={handleLogin} className="bg-transparent">
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

                <button className="relative w-full p-3 text-black font-bold text-lg sm:text-xl rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]">
                  Login
                </button>

                <div className="text-center mt-6 text-sm text-lime-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="text-gray-400 font-bold"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
