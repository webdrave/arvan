"use client";
import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Track Order",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if scrolled more than 50 pixels
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
      fixed top-0 flex p-6 w-full z-30 
      transition-all duration-300 
      ${isScrolled ? "bg-black/30 backdrop-blur-md" : "bg-transparent"}
    `}
    >
      <div className="w-full hidden md:flex bg-transparent justify-between items-center uppercase z-30">
        <Image
          src={"/logo.svg"}
          width={20}
          height={80}
          alt="logo"
          className={`${isScrolled ? "block" : "hidden"} duration-200 ease-in-out`}
        />
        <div className="w-full flex justify-end gap-6 uppercase">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="relative font-montserrat font-normal text-md xl:text-lg transition-colors duration-300
               after:content-[''] after:absolute after:left-0 after:bottom-0
               after:h-[2.5px] after:bg-[#CCFF00] after:transform-gpu after:w-0 hover:after:w-full
               after:transition-all after:duration-300"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/cart" className="relative">
            <IoCartOutline className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
            <div className="absolute bg-[#c2e53a] w-4 h-4 -top-2 -right-2 text-xs text-black flex justify-center items-center rounded-full p-1">
              {cart.length > 0 ? cart.length : 0}
            </div>
          </Link>
          {session?.user ? (
            <Link href={session.user?.role === "admin" ? "/admin" : "/profile"}>
              <FiUser className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
            </Link>
          ) : (
            <Link href="/signin">
              <FiUser className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Menu (unchanged) */}
      <div className="md:hidden flex w-full items-center justify-between p-2">
      <Image
          src={"/logo.svg"}
          width={20}
          height={80}
          alt="logo"
          className={`${isScrolled ? "block" : "hidden"} duration-200 ease-in-out`}
        />
        <div className="flex w-full items-center justify-end">
          <div className="flex gap-4">
            <Link href="/cart" className="relative">
              <IoCartOutline className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
              <div className="absolute bg-[#c2e53a] w-full h-full -top-2 -right-3 text-xs text-black flex justify-center items-center rounded-full p-1">
                {cart.length > 0 ? cart.length : 0}
              </div>
            </Link>
            {session ? (
              <Link href="/profile">
                <FiUser className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
              </Link>
            ) : (
              <Link href="/signin">
                <FiUser className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none ml-auto"
            >
              <IoMenu className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (unchanged) */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-transparent p-4 z-40 backdrop-blur-lg">
          <div className="flex flex-col space-y-4">
            {navItems.map((navItem, idx) => (
              <Link
                key={idx}
                href={navItem.href}
                className="px-4 py-2 text-sm font-medium rounded-full transition-all text-white hover:text-[#CCFF00]"
                onClick={() => setIsMenuOpen(false)}
              >
                {navItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
