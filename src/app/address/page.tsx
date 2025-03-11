"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface AddressFormData {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptNumber: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  phoneNumber: string;
  addressName: string;
  district: string;
}

const AddAddressForm: React.FC = () => {
  const [formData, setFormData] = useState<AddressFormData>({
    firstName: "",
    lastName: "",
    streetAddress: "",
    aptNumber: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    phoneNumber: "",
    addressName: "",
    district: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("Save button clicked: Form data will be saved");
    console.log("Form data:", formData);
  };

  const handleCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert("Cancel button clicked: Operation cancelled");
  };

  const handleBack = () => {
    alert("Back button clicked: Navigating back");
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden py-5">
      {/* Blurred circle in background */}
      <div className="absolute w-[80vw] h-[40vw] rounded-full bg-lime-500/20 blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1"></div>

      <button
        onClick={handleBack}
        className="relative ml-4 bg-lime-400 text-black font-bold py-1 px-4 rounded"
      >
        Back
      </button>

      {/* Form container */}

      <div className="w-full px-4 sm:px-10 flex flex-col relative z-10 mt-6 sm:mt-10">
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
                Address Name
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

            {/* Street Address */}
            <div>
              <label
                htmlFor="streetAddress"
                className="text-gray-400 text-sm sm:text-base"
              >
                Street Address
              </label>
              <div className="mb-3 sm:mb-4 rounded-sm border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Street and Number"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
                />
              </div>
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
            </div>

            {/*  District*/}
            <div>
              <label
                htmlFor="district"
                className="text-gray-400 text-sm sm:text-base"
              >
                District
              </label>
              <div className="mb-3 sm:mb-4 rounded-sm border-2 border-lime-400 bg-gradient-to-r from-[#2e470fb4] via-[#3a5b0bc9] to-[#3a5b0b49]">
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="District"
                  className="w-full p-3 sm:p-4 text-white bg-transparent outline-none text-sm sm:text-base"
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
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-10 w-full sm:w-3/4 md:w-1/2 mt-3 sm:mt-5">
            <button
              className="relative w-full py-2 sm:py-3 text-black font-bold text-base sm:text-lg rounded-xl bg-lime-400 shadow-[0_4px_20px_rgba(255,255,255,0.6)]"
              onClick={handleSubmit}
            >
              Save
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
    </div>
  );
};

export default AddAddressForm;
