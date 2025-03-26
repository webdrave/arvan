"use client";
import Navbar from "@/components/Navbar";
import { AddressApi } from "@/lib/api/address";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";


import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export interface AddressFormData {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  phoneNumber: string;
  addressName: string;
}

const AddAddressForm: React.FC = () => {
  const [formData, setFormData] = useState<AddressFormData>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    phoneNumber: "",
    addressName: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (formData: AddressType) => AddressApi.addAddress(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      router.push("/checkout");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const valid = addressSchema.safeParse(formData);
    if (valid.success) {
      setErrors({});
      mutation.mutate(formData);
    } else {
      const formattedErrors: { [key: string]: string } = {};
      valid.error.errors.forEach((error) => {
        formattedErrors[error.path[0]] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  const handleCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/checkout");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden py-5">

      <Navbar />
      {/* Blurred circle in background */}
      <div className="absolute w-[80vw] h-[40vw] rounded-full bg-lime-500/15 blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>

      <button
        onClick={handleBack}
        className="relative ml-4 bg-lime-400 text-black font-bold py-1 px-4 rounded"
      >
        Back
      </button>

      {/* Form container */}

      <div className="w-full px-4 sm:px-10 flex flex-col justify-center items-center relative z-10 mt-6 sm:mt-10">
        <div className="mb-4 sm:mb-8 text-start">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-1 text-white">
            ADD YOUR ADDRESS
          </h1>
        </div>

        <form className="bg-transparent w-full sm:w-[90vw] md:w-[80vw] h-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            {/* Address Name */}
            <div>
              <label
                htmlFor="addressName"
                className="text-gray-400 text-sm sm:text-base"
              >
                Full Name
              </label>
              <div className="rounded-sm mb-3 sm:mb-4 border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="addressName"
                  value={formData.addressName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
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
                htmlFor="street"
                className="text-gray-400 text-sm sm:text-base"
              >
                Street
              </label>
              <div className="mb-3 sm:mb-4 rounded-sm border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street and Number"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
              {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}

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
              <div className="mb-3 sm:mb-4 rounded-sm border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
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
              <div className="mb-3 sm:mb-4 rounded-sm border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="000 000"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}

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
              <div className="mb-3 sm:mb-4 rounded-sm border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            {errors.state && (
              <p className="text-red-700 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

            {/*  Country */}
            <div>
              <label
                htmlFor="country"
                className="text-gray-400 text-sm sm:text-base"
              >
                Country
              </label>
              <div className="mb-3 sm:mb-4 rounded-sm border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="country" 
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>

            {/* Mobile Number  */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="text-gray-400 text-sm sm:text-base"
              >
                Mobile Number
              </label>
              <div className="rounded-sm mb-3 sm:mb-4 border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
            {errors.country && (
              <p className="text-red-700 text-xs mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 sm:gap-10 w-full sm:w-3/4 md:w-1/2 mt-3 sm:mt-5">
            <button
              className="relative justify-center items-center flex w-full py-2 sm:py-3 text-black font-bold text-base sm:text-lg rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]"
              onClick={handleSubmit}
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
