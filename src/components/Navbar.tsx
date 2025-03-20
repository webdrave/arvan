"use client";
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Shop",
      href: "/product",
    },
    {
      name: "Track Order",
      href: "/",
    },
    {
      name: "About",
      href: "/",
    },
    {
      name: "Contact",
      href: "/",
    },
  ];

  return (
    <nav className="fixed top-0 flex p-6 w-full z-30">
      <div className="w-full hidden md:flex  bg-transparent justify-end  gap-6 uppercase  z-30">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="relative font-montserrat font-normal text-md transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:h-[2.5px] after:bg-[#CCFF00] after:transform-gpu  after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             "
            //  hover:text-[#CCFF00]
          >
            {item.name}
          </Link>
        ))}
        <Link href="/cart">
          <IoCartOutline className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
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

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex w-full items-center p-2 justify-end">
        <div className="flex gap-4">
          <Link href="/cart">
            <IoCartOutline className="text-lg text-white cursor-pointer hover:text-[#CCFF00]" />
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
