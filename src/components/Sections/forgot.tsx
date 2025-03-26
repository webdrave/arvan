/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AuthLayout from "@/components/AuthLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/app/forgot-password/hooks/hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define a simple schema for the mobile number field
const ForgotPasswordSchema = z.object({
  mobileNumber: z
      .string()
      .min(1, "Mobile number is required")
      .regex(
        /^(\+?\d{1,3})?\d{10}$/,
        "Invalid mobile number format"
      ),
});

const ForgotPassword = ({id}:{id:string}) => {
  const router = useRouter();
  const { mutate } = useForgotPassword();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    
  });

  async function handleSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    // Handle the forgot password logic (e.g., sending an OTP)
    mutate(values.mobileNumber,{
        onSuccess: (data:any) => {
          toast.success("an otp was sent to your email");
          console.log(data);
          // Navigate to the OTP screen with the JWT token
          router.push(`/otp/${data.jwt}`);
        }
        ,
        onError: (error) => {
          toast.error(error.message);
        }
    });

    // You might call your API here...
  }

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-1">
          Forgot Password?
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl">
          Enter Your Mobile Number
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="rounded-xl border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                    <Input
                      placeholder="Mobile Number"
                      className="w-full p-4 sm:p-5 text-white bg-transparent border-0 rounded-xl outline-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-sm ml-2" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full p-3 text-black font-bold text-lg rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]"
          >
            Send OTP
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
