"use client"
import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("7");
  const [selectedImage, setSelectedImage] = useState("/images/shoe5.avif");

  const product = {
    name: "LEATHER",
    price: 599,
    originalPrice: 1199,
    currency: "₹",
    rating: 4.3,
    totalRatings: 1265,
    colors: ["White", "Black"],
    sizes: ["6", "7", "8", "9", "10"],
    images: [
      "/images/shoe1.png",
      "/images/shoe2.png",
      "/images/shoe3.png",
      "/images/shoe4.png",
      "/images/shoe5.avif",

    ],
    details: {
      material: "Leather",
      name: "Leather (White)",
      color: "White",
      size: "7 UK",
    },
  };

  return (
    <div className="bg-black text-white min-h-screen p-4 sm:p-6 md:p-10 lg:p-16 w-full">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-6 lg:gap-8">
        {/* Left Section - Image Gallery */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="Thumbnail"
                height={200}
                width={200}
                className={`h-12 w-14 cursor-pointer border-2 transition-all duration-200 ${
                  selectedImage === img ? "border-[#c2e53a]" : "border-white"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="w-full order-1 sm:order-2">
            <Image
              src={selectedImage}
              height={500}
              width={500}
              alt="Product"
              className="w-full h-auto rounded-md shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="pt-4 lg:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{product.name}</h2>
              <div className="flex items-center gap-2 sm:gap-5 my-2 flex-wrap">
                <p className="text-white text-lg sm:text-xl font-bold">{product.currency}{product.price}</p>
                <p className="text-[#858585] text-lg sm:text-xl font-bold line-through">{product.currency}{product.originalPrice}</p>
                <div className="text-black text-xs border rounded-md bg-[#C2E53A] font-bold px-1">50%</div>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-center gap-1 mt-2 sm:mt-0">
              <div className="border border-[#c2e53a] px-2 py-1 rounded-md flex items-center gap-1">
                <Star className="text-[#c2e53a] h-4 w-4" />
                <span className="text-sm">{product.rating}</span>
                <span className="text-sm">(1245)</span>
              </div>
              <button className="text-[#bababa] text-sm underline">Write a Review</button>
            </div>
          </div>
          <hr className="border-gray-600 my-4"/>

          {/* Color Selection */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3">
            <div className="w-full sm:w-auto">
              <p className="text-base mb-4">Select Color: {selectedColor}</p>
              <div className="flex gap-3 mb-4">
                {product.colors.map((color, index) => (
                  <Image
                    key={color}
                    src={product.images[index]}
                    width={200}
                    height={200}
                    alt={color}
                    className={`w-12 h-12 rounded-sm border-2 cursor-pointer transition-all duration-200 ${
                      selectedColor === color ? "border-[#c2e53a]" : "border-white"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>

              {/* Size Selection */}
              <p className="text-base mb-4">Select Size (UK):</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 rounded-sm border-2 ${
                      selectedSize === size ? "border-[#c2e53a]" : "border-white"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Chart Button */}
            <button className="text-white underline text-sm font-bold px-4 py-2 w-full sm:w-48 h-12 uppercase mt-4 sm:mt-0">
              Size Chart
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="w-full h-10 bg-[#c2e53a] rounded-lg text-black text-xl font-bold">
              Buy Now
            </button>
            <button className="w-full h-10 border border-[#c2e53a] text-white text-xl font-bold flex items-center justify-center gap-2 rounded-lg">
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </button>
          </div>

          {/* Product Details */}
          <div className="mt-4 border-t border-white pt-4">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold">Product Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-base lg:text-lg">
              <p className="text-[#b3b3b3]">Material</p> <p className="text-white">{product.details.material}</p>
              <p className="text-[#b3b3b3]">Color</p> <p className="text-white">{product.details.color}</p>
              <p className="text-[#b3b3b3]">Name</p> <p className="text-white">{product.details.name}</p>
              <p className="text-[#b3b3b3]">Size</p> <p className="text-white">{product.details.size}</p>
            </div>
          </div>

          {/* Ratings & Reviews */}
          <div className="mt-8 border-t border-white pt-4">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold">Ratings & Review</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-3 sm:m-5 gap-4 sm:gap-0">
              <div className="flex items-center gap-1">
                <div className="border border-[#c2e53a] px-2 py-1 mr-4 rounded-md flex items-center gap-1">
                  <Star className="text-[#c2e53a] h-4 w-4" />
                  <span className="text-sm">{product.rating}</span>
                </div>
                <span className="text-[#bababa] text-sm">{product.totalRatings} of Total Ratings</span>
              </div>
              <button className="text-base px-4 py-2 rounded-lg border border-[#C2E53A] w-full sm:w-48 h-10"
                style={{
                  background: 'linear-gradient(90deg, #C2E53A 0%, rgba(107, 127, 32, 0) 100%)'
                }}>
                Rate Product
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 sm:gap-6">
              {["Color", "Comfort", "Perfect Fit", "Value for Money"].map((filter) => (
                <button key={filter} className="border border-[#c2e53a] px-3 sm:px-6 py-1 rounded-sm text-sm sm:text-base">
                  {filter}
                </button>
              ))}
            </div>

            <hr className="opacity-50 my-4" />
            <div className="mt-4 text-gray-400">
              <div className="flex items-center gap-4">
                <p className="font-semibold text-sm">Abhishek Choudhary</p>
                <div className="border border-[#c2e53a] px-2 py-1 rounded-md flex items-center gap-1">
                  <Star className="text-[#c2e53a] h-3 w-3" />
                  <span className="text-xs">{product.rating}</span>
                </div>
              </div>
              <p className="text-base text-white mt-2">
                It{"'"}s is not very comfortable but ok ok product, not much good as we thought (bekar hain pesa barbaad) 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;