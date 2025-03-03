"use client"

import { useState, useEffect } from "react"
import { Upload, X, Check } from "lucide-react"
import Image from "next/image"

// This would typically come from an API call
const fetchProduct = async (id: string) => {
  // Simulating API call
  return {
    id,
    name: "Sample Product",
    description: "This is a sample product description.",
    price: 99.99,
    category: "Electronics",
    stock: 100,
    images: ["/placeholder.svg?height=200&width=200&text=Product+Image+1"],
    status: "draft",
  }
}

interface Product {
  id: string 
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
  status: string
}

export function EditProductForm({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product>({} as Product)
  const [images, setImages] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProduct(productId)
      setProduct(data)
      setImages(data.images)
      setSelectedCategories([data.category])
    }
    loadProduct()
  }, [productId])

  const categories = ["Electronics", "Clothing", "Home & Garden", "Beauty", "Sports", "Toys", "Books", "Automotive"]

  const handleAddImage = () => {
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

  const handleStatusChange = (status: string) => {
    setProduct({ ...product, status })
  }

  if (!product) {
    return <div>Loading...</div>
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
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={4}
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
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
                <Image
                  src={image || "/logo.svg"}
                  alt={`Product image ${index + 1}`}
                  width={200}
                  height={200}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleStatusChange("draft")}
                  className={`px-4 py-2 rounded-md ${
                    product.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Draft
                </button>
                <button
                  onClick={() => handleStatusChange("published")}
                  className={`px-4 py-2 rounded-md ${
                    product.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Published
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#4f507f] text-white py-2 px-4 rounded-md hover:bg-[#3e3f63] transition-colors"
          >
            Update Product
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

