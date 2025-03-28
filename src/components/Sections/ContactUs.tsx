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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/send", {
        ...formData,
        phone: formData.mobile,
      });
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-12 mb-10">
      <h2 className="contact text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold pb-6">
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
        {/* Border for tablet and desktop - Increased scale only for md: */}
        <div className="absolute inset-0 z-0 hidden md:block md:scale-110 lg:scale-100">
          <Image
            src="/border.svg"
            alt="Border"
            fill
            className="object-fill"
            priority
          />
        </div>
        {/* Border for mobile */}
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
            <h2 className="text-lg sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              ANY <span className="text-[#C2E53A]">QUERIES</span>
              <span className="text-white">?</span>
            </h2>
            <p className="text-gray-300 mt-2 text-[10px] sm:text-sm md:text-sm lg:text-base leading-relaxed">
              Got a question or need assistance? We&apos;re here to help!
            </p>
            <form
              className="mt-6 space-y-4 sm:space-y-6"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none text-sm sm:text-base md:text-sm lg:text-base"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none text-sm sm:text-base md:text-sm lg:text-base"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile No."
                className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none text-sm sm:text-base md:text-sm lg:text-base"
                onChange={handleChange}
                value={formData.mobile}
              />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full bg-transparent border-b border-gray-500 p-2 focus:outline-none text-sm sm:text-base md:text-sm lg:text-base"
                onChange={handleChange}
                value={formData.message}
              ></textarea>
              <button
                type="submit"
                className="relative text-base sm:text-xl md:text-lg lg:text-xl font-light px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#c3e53a8a] to-[#b3d2343e] text-white uppercase shadow-[0px_0px_2px_#c3e53a] hover:shadow-[0px_0px_5px_#c3e53a] transition-all duration-300 mt-4 sm:mt-5 md:ml-10 lg:ml-0"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side - Contact Details */}
          <div className="relative w-full md:w-1/2 p-4 sm:p-6 pl-6 md:pl-10 lg:pl-16 flex flex-col justify-between">
            <h2 className="text-lg sm:text-3xl md:text-3xl lg:text-4xl font-bold text-right leading-tight mb-6">
              GET IN <span className="text-[#C2E53A]">TOUCH</span>
            </h2>

            <div className="flex flex-col space-y-8">
              {/* Email */}
              <div>
                <h3 className="text-[#C2E53A] font-semibold text-base sm:text-lg md:text-base lg:text-lg">
                  EMAIL
                </h3>
                <p className="text-gray-300 mt-2 text-[10px] sm:text-sm md:text-sm lg:text-base leading-relaxed">
                  Reach out to us via email for any inquiries, support, or
                  collaborations. We’re just a message away and
                  ready to assist you!
                </p>
              </div>

              {/* Wrapper for Follow Us and Phone No Sections */}
              <div className="flex flex-row md:flex-row lg:flex-col space-x-4 md:space-x-6 lg:space-x-0 lg:space-y-8">
                {/* Follow Us Section */}
                <div className="w-1/2 md:w-1/2 lg:w-full">
                  <h3 className="text-[#C2E53A] font-semibold text-base sm:text-lg md:text-base lg:text-lg">
                    FOLLOW US ON
                  </h3>
                  <div className="flex space-x-4 mt-4">
                    <FaInstagram className="text-white text-2xl sm:text-4xl md:text-3xl lg:text-4xl cursor-pointer" />
                    <FaInstagram className="text-white text-2xl sm:text-4xl md:text-3xl lg:text-4xl cursor-pointer" />
                    <FaInstagram className="text-white text-2xl sm:text-4xl md:text-3xl lg:text-4xl cursor-pointer" />
                    <FaFacebook className="text-white text-2xl sm:text-4xl md:text-3xl lg:text-4xl cursor-pointer" />
                  </div>
                </div>

                {/* Phone No Section */}
                <div className="w-1/2 md:w-1/2 lg:w-full">
                  <h3 className="text-[#C2E53A] font-semibold text-base sm:text-lg md:text-base lg:text-lg">
                    PHONE NO.
                  </h3>
                  <p className="text-gray-300 mt-2 text-[10px] sm:text-sm md:text-sm lg:text-base leading-relaxed">
                    +91 90391 XXXXX
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[10px] sm:text-sm md:text-sm lg:text-base leading-relaxed mt-6 md:mb-5 hidden md:block">
              We’d love to hear from you! Whether you have questions, or just want to say hello, feel free to reach out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
