"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

// Define the type for the form data
export interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

export default function ContactForm() {
  // Initialize state with the FormData type
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // Handle input change with proper typing
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate email format
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate mobile number format (10 digits)
  const validateMobile = (mobile: string) => {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  };


  // Handle form submission with proper typing
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Check if any field is empty
    if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
      setError("All fields are required. Please fill out the form completely.");
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate mobile number format
    if (!validateMobile(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Clear any previous errors
    setError(null);

    // If all fields are filled and valid, proceed with the mutation
   console.log(formData);
   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send/contactform`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(formData),

   })
   .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })

    // Clear the form after submission
    setFormData({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-12">
      <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold pb-6">
        Contact{" "}
        <span className="relative">
          Us
          <Image
            src="/Star.svg"
            width={40}
            height={40}
            alt="Star decoration"
            className="absolute -top-6 sm:-top-5 right-0 animate-[spin_3s_linear_infinite]"
          />
        </span>
      </h2>

      <div className="relative max-w-5xl w-full p-6 sm:p-8 text-white shadow-lg rounded-xl flex flex-col md:flex-row border border-gray-600 bg-transparent">
        <div className="absolute inset-0 z-0 opacity-50 md:opacity-70 blur-md scale-125">
          <Image
            src="/background.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Left Side - Form */}
        <div className="relative w-full md:w-1/2 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            ANY <span className="text-[#C2E53A]">QUERIES</span>
            <span className="text-white">?</span>
          </h2>
          <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
            Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum
            Dolor Sit Amet.
          </p>
          <form className="mt-6 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile No."
              className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none"
              onChange={handleChange}
              value={formData.mobile}
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none"
              onChange={handleChange}
              value={formData.message}
            ></textarea>
            <button
              type="submit"
              className="relative text-lg sm:text-xl font-light px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#c3e53a8a] to-[#b3d2343e] text-white uppercase shadow-[0px_0px_2px_#c3e53a] hover:shadow-[0px_0px_5px_#c3e53a] transition-all duration-300 mt-4 sm:mt-5"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side - Contact Details */}
        <div className="relative w-full md:w-1/2 p-4 sm:p-6 pl-6 md:pl-16 flex flex-col justify-between">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-right leading-tight mb-6">
            GET IN <span className="text-[#C2E53A]">TOUCH</span>
          </h2>

          <div className="flex flex-col space-y-8">
            {/* Email */}
            <div>
              <h3 className="text-[#C2E53A] font-semibold text-lg">EMAIL</h3>
              <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod,
                temporibus!
              </p>
            </div>

            {/* Follow Us Section */}
            <div className="w-full">
              <h3 className="text-[#C2E53A] font-semibold text-lg">
                FOLLOW US ON
              </h3>
              <div className="flex space-x-4 mt-4">
                <FaInstagram className="text-white text-3xl sm:text-4xl cursor-pointer" />
                <FaTwitter className="text-white text-3xl sm:text-4xl cursor-pointer" />
                <FaFacebook className="text-white text-3xl sm:text-4xl cursor-pointer" />
              </div>
            </div>

            {/* Phone No Section */}
            <div className="w-full">
              <h3 className="text-[#C2E53A] font-semibold text-lg">
                PHONE NO.
              </h3>
              <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
                +91 90391 XXXXX
              </p>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-xs sm:text-sm md:text-base leading-relaxed mt-6">
            Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum
            Dolor Sit Amet.
          </p>
        </div>
      </div>
    </div>
  );
}