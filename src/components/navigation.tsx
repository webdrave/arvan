import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="bg-black text-white py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ARVAN
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-[#CCFF00]">
            HOME
          </Link>
          <Link href="/shop" className="hover:text-[#CCFF00]">
            SHOP
          </Link>
          <Link href="/track-order" className="hover:text-[#CCFF00]">
            TRACK ORDER
          </Link>
          <Link href="/about" className="hover:text-[#CCFF00]">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-[#CCFF00]">
            CONTACT
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <button className="hover:text-[#CCFF00]">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/cart" className="hover:text-[#CCFF00]">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link href="/profile" className="hover:text-[#CCFF00]">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

