"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { apiClient } from "@/lib/axiosClient";
import { toast } from "react-hot-toast";

// Define the type for the form data
interface FormData {
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
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await apiClient.post("/api/send", {...formData , phone: formData.mobile});
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
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
            alt="Star SVG"
            className="absolute -top-6 sm:-top-5 right-0 animate-[spin_3s_linear_infinite]"
          />
        </span>
      </h2>

      <div className="relative max-w-5xl p-6 sm:p-8 text-white flex flex-col md:flex-row">
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/border.svg"
            alt="Border"
            fill
            className="object-fill"
            priority
          />
        </div>
        <div className="absolute inset-0 z-0 block md:hidden scale-105">
          <Image
            src="/border_mobile.svg"
            alt="Border"
            fill
            className="object-fill"
            priority
          />
        </div>

        <div className="absolute inset-0 z-0 opacity-50 md:opacity-70 blur-md scale-125 hidden md:block">
          <Image
            src="/background.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Background blur effect - Mobile */}
        <div className="absolute inset-0 z-0 opacity-50 md:opacity-70 blur-md block md:hidden">
          <Image
            src="/background_mobile.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row w-full pb-6 sm:p-4 md:p-6">
          {/* Left Side - Form */}
          <div className="relative md:w-1/2 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-700">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              ANY <span className="text-[#C2E53A]">QUERIES</span>
              <span className="text-white">?</span>
            </h2>
            <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
              Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem
              Ipsum Dolor Sit Amet.
            </p>
            <form
              className="mt-6 space-y-4 sm:space-y-6"
              onSubmit={handleSubmit}
            >
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quod, temporibus!
                </p>
              </div>

              {/* Wrapper for Follow Us and Phone No Sections */}
              <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-8">
                {/* Follow Us Section */}
                <div className="w-1/2 md:w-full">
                  <h3 className="text-[#C2E53A] font-semibold text-lg">
                    FOLLOW US ON
                  </h3>
                  <div className="flex space-x-4 mt-4">
                    <FaInstagram className="text-white text-3xl sm:text-4xl cursor-pointer" />
                    <FaInstagram className="text-white text-3xl sm:text-4xl cursor-pointer" />
                    <FaInstagram className="text-white text-3xl sm:text-4xl cursor-pointer" />
                    <FaFacebook className="text-white text-3xl sm:text-4xl cursor-pointer" />
                    {/* Phone No Section */}
                    <div className="w-1/2 md:w-full">
                      <h3 className="text-[#C2E53A] font-semibold text-lg">
                        PHONE NO.
                      </h3>
                      <p className="text-gray-300 mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
                        +91 90391 XXXXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Text */}
              <p className="text-xs sm:text-sm md:text-base leading-relaxed mt-6 hidden md:block">
                Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem
                Ipsum Dolor Sit Amet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
