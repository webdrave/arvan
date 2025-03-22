import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Navigation() {
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

  const {cart} = useCart();

  return (
    <nav className="bg-black text-white py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <Image
            src={"/logo.svg"}
            width={30}
            height={80}
            alt="logo"
            className="object-cover"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="relative font-montserrat font-normal text-md transition-colors duration-300
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:h-[2px] after:bg-[#CCFF00] after:transform-gpu  after:w-0 hover:after:w-full
             after:transition-all after:duration-300
             "
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <button className="hover:text-[#CCFF00]">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/cart" className="hover:text-[#CCFF00] relative">
            <ShoppingCart className="w-5 h-5" />
            <div className="absolute bg-[#c2e53a]  w-full h-full -top-2 -right-3 text-xs text-black  flex justify-center items-center rounded-full p-1">
              {cart.length > 0 ? cart.length : 0}
            </div>
          </Link>
          <Link href="/profile" className="hover:text-[#CCFF00]">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
