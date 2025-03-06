"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const images = [
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
]

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid grid-cols-[100px,1fr] gap-4">
      <div className="space-y-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "w-full aspect-square border rounded overflow-hidden",
              selectedImage === index ? "border-[#CCFF00]" : "border-gray-800",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product view ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        <button className="w-full aspect-square border border-gray-800 rounded flex items-center justify-center text-sm">
          SIZE CHART
        </button>
      </div>
      <div className="bg-white rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt="Product main view"
          width={600}
          height={600}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

