"use client"

import { useState } from "react"
import { Upload, X, Check } from "lucide-react"

export function AddProductForm() {
  const [images, setImages] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["Electronics", "Clothing", "Home & Garden", "Beauty", "Sports", "Toys", "Books", "Automotive"]

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    const newImage = `/placeholder.svg?height=200&width=200&text=Product+Image+${images.length + 1}`
    setImages([...images, newImage])
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Product Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                  placeholder="Enter SKU"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                  placeholder="Enter barcode"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Media</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md border border-gray-200"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <button
              onClick={handleAddImage}
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-[#4f507f] hover:border-[#4f507f] transition-colors"
            >
              <Upload size={24} />
              <span className="mt-2 text-sm">Add Image</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Organization</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                      selectedCategories.includes(category) ? "bg-[#edeefc] text-[#4f507f]" : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        selectedCategories.includes(category) ? "bg-[#4f507f] text-white" : "border border-gray-300"
                      }`}
                    >
                      {selectedCategories.includes(category) && <Check size={14} />}
                    </div>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="Enter tags separated by commas"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Inventory</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="track-inventory"
                className="w-4 h-4 text-[#4f507f] rounded focus:ring-[#4f507f]"
              />
              <label htmlFor="track-inventory" className="text-sm text-gray-700">
                Track inventory
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="continue-selling"
                className="w-4 h-4 text-[#4f507f] rounded focus:ring-[#4f507f]"
              />
              <label htmlFor="continue-selling" className="text-sm text-gray-700">
                Continue selling when out of stock
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#4f507f] text-white py-2 px-4 rounded-md hover:bg-[#3e3f63] transition-colors"
          >
            Save Product
          </button>
          <button
            type="button"
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

