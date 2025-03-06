"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">LEATHER</h1>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">₹599</span>
          <span className="text-gray-400 line-through">₹1199</span>
          <span className="bg-[#CCFF00] text-black px-2 py-1 text-sm rounded">50% OFF</span>
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <p className="text-gray-400 mb-2">Select Color : White</p>
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded border-2 border-[#CCFF00] bg-white" />
          <button className="w-12 h-12 rounded border border-gray-800 bg-brown-500" />
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-400">Select Size (UK):</p>
          <button className="text-[#CCFF00]">SIZE CHART</button>
        </div>
        <div className="flex gap-4">
          {[6, 7, 8, 9, 10].map((size) => (
            <button
              key={size}
              className="w-12 h-12 rounded border border-gray-800 hover:border-[#CCFF00] flex items-center justify-center"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">BUY NOW</Button>
        <Button variant="outline" className="flex-1">
          ADD TO CART
        </Button>
      </div>

      {/* Product Details */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2 text-gray-400">
            <p>Material</p>
            <p>Name</p>
            <p>Color</p>
            <p>Size</p>
          </div>
          <div className="space-y-2">
            <p>Leather</p>
            <p>Leather (White)</p>
            <p>White</p>
            <p>7 UK</p>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Ratings & Review</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-[#CCFF00] text-[#CCFF00]" />
            <span>4.3</span>
          </div>
          <span className="text-gray-400">1265 of Total Ratings</span>
          <Button variant="outline" className="ml-auto">
            Rate Product
          </Button>
        </div>
        <div className="flex gap-2 mb-6">
          {["Color", "Comfort", "Perfect Fit", "Value For Money"].map((tag) => (
            <span key={tag} className="px-4 py-1 rounded-full border border-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

