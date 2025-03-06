"use client";
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";

import Link from "next/link";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navitems = ["Home", "Shop", "track order", "about", "contact"];
  return (
    <nav className="fixed top-0 flex p-6 w-full z-30">
      <div className="w-full hidden md:flex  bg-transparent justify-end  gap-6 uppercase  z-30">
        {navitems.map((item, i) => (
          <a
            key={i}
            href=""
            className="hover:underline underline-offset-1 font-montserrat font-normal text-md hover:text-[#CCFF00]"
          >
            {item}
          </a>
        ))}
        <IoCartOutline className="text-lg text-white cursor-pointer hover:text-[#CCFF00]"></IoCartOutline>
        <FiUser className="text-lg text-white cursor-pointer hover:text-[#CCFF00]"></FiUser>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex w-full items-center p-2 justify-end">
        <div className="flex gap-4">
          <IoCartOutline className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
          <FiUser className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none ml-auto" // Added ml-auto
          >
            <IoMenu className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-transparent p-4 z-40  backdrop-blur-lg">
          <div className="flex flex-col space-y-4">
            {navitems.map((navItem, idx) => (
              <Link
                key={idx}
                href={"/"}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all`}
                onClick={() => setIsMenuOpen(false)}
              >
                {navItem}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;