"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, Minus, ArrowRight, ArrowLeft, Menu, ShoppingCart, User } from "lucide-react"

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Leather",
    color: "White",
    size: "6 UK",
    quantity: 1,
    price: 599,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ARVAN_WEB_DESIGN-p2JyYr15cvjuCiJgh4uVW096O2B1l2.png",
  },
  {
    id: 2,
    name: "Leather",
    color: "White",
    size: "6 UK",
    quantity: 1,
    price: 599,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ARVAN_WEB_DESIGN-p2JyYr15cvjuCiJgh4uVW096O2B1l2.png",
  },
  {
    id: 3,
    name: "Leather",
    color: "White",
    size: "6 UK",
    quantity: 1,
    price: 599,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ARVAN_WEB_DESIGN-p2JyYr15cvjuCiJgh4uVW096O2B1l2.png",
  },
  {
    id: 4,
    name: "Leather",
    color: "White",
    size: "6 UK",
    quantity: 1,
    price: 599,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ARVAN_WEB_DESIGN-p2JyYr15cvjuCiJgh4uVW096O2B1l2.png",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [giftCode, setGiftCode] = useState("")
  const [showSummary, setShowSummary] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCharges = 5999
  const total = subtotal + shippingCharges

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Header - Only visible on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/" className="text-2xl font-bold">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0L40 40H0L20 0Z" fill="white" />
          </svg>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <User className="w-6 h-6" />
          </Link>
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <button>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Cart Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop" className="md:hidden">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left flex-1 md:mb-4">ITEMS IN CART</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Desktop Table Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-6 gap-4 border-b border-gray-800 pb-4 mb-4">
              <div className="col-span-2">ITEM</div>
              <div>COLOR</div>
              <div>SIZE</div>
              <div>QUANTITY</div>
              <div>PRICE</div>
              <div>REMOVE</div>
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex md:grid md:grid-cols-6 gap-4 items-center border-b border-gray-800 pb-6"
                  >
                    {/* Mobile Layout */}
                    <div className="flex md:hidden w-full">
                      <div className="w-24 h-24 bg-white rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between ml-4">
                        <div className="flex justify-between">
                          <span className="font-medium text-lg">{item.name}</span>
                          <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-xl font-bold">₹{item.price}</div>
                        <div className="flex items-center justify-end mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CCFF00] text-black"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center">{item.quantity.toString().padStart(2, "0")}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#CCFF00] text-black"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout - Hidden on mobile */}
                    <div className="hidden md:flex md:col-span-2 items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>

                    <div className="hidden md:block">{item.color}</div>
                    <div className="hidden md:block">{item.size}</div>

                    <div className="hidden md:flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded-l hover:bg-gray-800"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-700">
                        {item.quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded-r hover:bg-gray-800"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="hidden md:block">₹{item.price}</div>

                    <div className="hidden md:flex justify-start">
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Your cart is empty</p>
                <Link href="/shop">
                  <Button className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">Continue Shopping</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary - Desktop */}
          <div className="hidden lg:block bg-[#111111] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span>₹{shippingCharges}</span>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Enter Gift Code"
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                    className="bg-transparent border-gray-700 focus:border-[#CCFF00]"
                  />
                  <Button variant="outline" size="icon" className="border-gray-700">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-800 text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Button className="w-full h-12 mt-4 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold">
                CHECKOUT
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Summary - Fixed at bottom */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111111] p-4 z-10">
          {showSummary ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Summary</h2>
                <button onClick={() => setShowSummary(false)} className="bg-[#CCFF00] text-black p-2 rounded-md">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span>₹{shippingCharges}</span>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Enter Gift Code"
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                    className="bg-transparent border-gray-700 focus:border-[#CCFF00]"
                  />
                  <Button variant="outline" size="icon" className="border-gray-700">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-800 text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Button className="w-full h-12 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold">CHECKOUT</Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-xl font-bold">₹{total}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowSummary(true)}
                  variant="outline"
                  className="border-gray-700 h-12 w-12 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
                <Button className="h-12 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-bold px-8">CHECKOUT</Button>
              </div>
            </div>
          )}
        </div>

        {/* Add padding at the bottom to prevent content from being hidden behind the fixed summary */}
        <div className="lg:hidden h-24"></div>
      </div>
    </div>
  )
}

