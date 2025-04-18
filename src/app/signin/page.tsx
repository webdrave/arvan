/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "@/components/Sections/PhoneInput.module.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/types/types";
import { loginFunction } from "./actions/action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to homepage or dashboard
    }
  }, [status, router]);

  if (session?.user) {
    router.push("/profile");
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      mobileNumber: "",
      password: "",
    },
  });

  if (status === "loading") {
    return (
      <div className="text-center text-white">Checking authentication...</div>
    );
  }

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      setIsLoading(true);
      const data: any = await loginFunction(values);
      if (data === "Login successful") {
        toast.success("Login successful");
        setTimeout(() => {
          router.refresh();
        }, 500);
        router.push("/");
      } else {
        toast.error(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <>
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-1">Hello User</h1>
          <p className="text-gray-400 text-lg sm:text-xl">
            Welcome Back to Arvan
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-transparent space-y-4"
          >
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <div className={` ${styles.phoneContainer} rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49] `}>
                      <PhoneInput
                        country={"in"}
                        value={field.value}
                        onChange={(phone) => onChange(phone)}
                        disabled={isLoading}
                        inputClass="!w-full !p-5 !px-10 !sm:p-5 !text-white !bg-transparent !border-0 !rounded-xl !outline-none !ring-0"
                        containerClass="!bg-transparent"
                        buttonClass="!bg-transparent !border-0"
                        dropdownClass="!bg-[#1a1a1a] !text-white text-black"
                        searchClass="!bg-[#1a1a1a] !text-white"
                        inputProps={{
                          required: true,
                          placeholder: "Mobile Number",
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm ml-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                      <Input
                        type="password"
                        placeholder="Password"
                        className="w-full p-4 sm:p-5 text-white bg-transparent border-0 rounded-xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm ml-2" />
                </FormItem>
              )}
            />

            <div className="text-end mt-3 mb-6">
              <Link href="/forgot-password" className="text-sm text-lime-400">
                Forget Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="relative w-full p-3 text-black font-bold text-lg sm:text-xl rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)] hover:bg-lime-500"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6 text-sm text-lime-400">
          Don{"'"}t have an account?
          <Button
            variant="link"
            className="text-gray-400 font-bold p-0"
            type="button"
            onClick={() => router.push("/signup")}
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </div>
      </>
    </AuthLayout>
  );
};

export default Signin;
