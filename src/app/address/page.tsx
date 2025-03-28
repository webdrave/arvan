"use client";
import { AddressApi } from "@/lib/api/address";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { addressSchema, type AddressType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddAddressForm: React.FC = () => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (formData: AddressType) => AddressApi.addAddress(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      router.push("/checkout");
    },
  });

  const onSubmit = (data: AddressType) => {
    mutation.mutate(data);
  };

  const handleCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/checkout");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden py-5">
      {/* Blurred circle in background */}
      <div className="absolute w-[80vw] h-[40vw] rounded-full bg-lime-500/15 blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>

      <button
        onClick={handleBack}
        className="relative ml-4 bg-lime-400 text-black font-bold py-1 px-4 rounded"
      >
        Back
      </button>

      {/* Form container */}

      <div className="w-full px-4 sm:px-10 flex flex-col relative z-10 mt-6 sm:mt-10">
        <div className="mb-4 sm:mb-8 text-start"></div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-1 text-white">
          ADD YOUR ADDRESS
        </h1>
      </div>

      <form
        onSubmit={handleFormSubmit(onSubmit)}
        className="bg-transparent w-full sm:w-[90vw] md:w-[85vw] px-4 sm:px-10 mt-5 h-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {/* Address Name */}
          <div>
            <label
              htmlFor="addressName"
              className="text-gray-400 text-sm sm:text-base"
            >
              Address Name
            </label>
            <div
              className={`rounded-sm mb-1 sm:mb-2 border-2 ${
                errors.addressName ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("addressName")}
                placeholder="Full Name"
                className="w-full p-3 sm:p-6 text-white  bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
            {errors.addressName && (
              <p className="text-red-700 text-xs mt-1">
                {errors.addressName.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label
              htmlFor="streetAddress"
              className="text-gray-400 text-sm sm:text-base"
            >
              Street Address
            </label>
            <div
              className={`mb-1 sm:mb-2 rounded-sm border-2 ${
                errors.street ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("street")}
                placeholder="Street and Number"
                className="w-full p-3 sm:p-6 text-white bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
            {errors.street && (
              <p className="text-red-700 text-xs mt-1">
                {errors.street.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="text-gray-400 text-sm sm:text-base"
            >
              City
            </label>
            <div
              className={`mb-1 sm:mb-2 rounded-sm border-2 ${
                errors.city ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("city")}
                placeholder="City"
                className="w-full p-3 sm:p-6 text-white bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
            {errors.city && (
              <p className="text-red-700 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* PinCode */}
          <div>
            <label
              htmlFor="zipCode"
              className="text-gray-400 text-sm sm:text-base"
            >
              PINCODE
            </label>
            <div
              className={`mb-1 sm:mb-2 rounded-sm border-2 ${
                errors.zipCode ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("zipCode")}
                placeholder="000 000"
                className="w-full p-3 sm:p-6 text-white bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
            {errors.zipCode && (
              <p className="text-red-700 text-xs mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="text-gray-400 text-sm sm:text-base"
            >
              State
            </label>
            <div
              className={`mb-1 sm:mb-2 rounded-sm border-2 ${
                errors.state ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("state")}
                placeholder="State"
                className="w-full p-3 sm:p-6 text-white bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
            {errors.state && (
              <p className="text-red-700 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/*  District*/}
          <div>
            <label
              htmlFor="district"
              className="text-gray-400 text-sm sm:text-base"
            >
              District
            </label>
            <div
              className={`mb-1 sm:mb-2 rounded-sm border-2 ${
                errors.district ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("district")}
                placeholder="District"
                className="w-full p-3 sm:p-6 text-white bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
            {errors.district && (
              <p className="text-red-700 text-xs mt-1">
                {errors.district.message}
              </p>
            )}
          </div>
          {/*  Country*/}
          <div>
            <label
              htmlFor="country"
              className="text-gray-400 text-sm sm:text-base"
            >
              Country
            </label>
            <div
              className={`mb-1 sm:mb-2 rounded-sm border-2 ${
                errors.country ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("country")}
                placeholder="District"
                className="w-full p-3 sm:p-6 text-white bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
          </div>

          {/* Mobile Number  */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-gray-400 text-sm sm:text-base"
            >
              Mobile Number
            </label>
            <div
              className={`rounded-sm mb-1 sm:mb-2 border-2 ${
                errors.phoneNumber ? "border-red-700" : "border-lime-400"
              } bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]`}
            >
              <Input
                {...register("phoneNumber")}
                placeholder="Mobile Number"
                className="w-full p-3 sm:p-6 text-white bg-transparent outline-none text-sm sm:text-base border-0"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-700 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-10 w-full sm:w-3/4 md:w-1/2 mt-3 sm:mt-5">
          <button
            className="relative w-full py-2 sm:py-3 text-black flex items-center justify-center font-bold text-base sm:text-lg rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]"
            type="submit"
          >
            {mutation.isPending ? <Loader className="animate-spin" /> : "Save"}
          </button>
          <button
            className="relative w-full py-2 sm:py-3 text-white border-2 border-white font-bold text-base sm:text-lg md:text-xl rounded-xl bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
