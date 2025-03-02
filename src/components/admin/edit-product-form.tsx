"use client";

import { useState, useEffect } from "react";
import { Upload, X, Check } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categories: string[];
  stock: number;
  images: string[];
  status: "draft" | "published";
};

interface EditProductFormProps {
  productId: string;
}


// Simulate an API call to fetch product data
const fetchProduct = async (id: string): Promise<Product> => {
  return {
    id,
    name: "Sample Product",
    description: "This is a sample product description.",
    price: 99.99,
    categories: ["Electronics"],
    stock: 100,
    images: ["/placeholder.svg?height=200&width=200&text=Product+Image+1"],
    status: "draft",
  };
};

export function EditProductForm({ productId }: EditProductFormProps) {
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    categories: [],
    stock: 0,
    images: [],
    status: "draft",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data on component mount
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(productId);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load product.");
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  // List of available categories
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Beauty",
    "Sports",
    "Toys",
    "Books",
    "Automotive",
  ];

  // Add a new image to the product
  const handleAddImage = () => {
    const newImage = prompt("Enter image URL:");
    if (newImage && /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(newImage)) {
      setProduct((prevProduct) => {
        if (!prevProduct) return prevProduct; // Return null if prevProduct is null
        return {
          ...prevProduct,
          images: [...prevProduct.images, newImage],
        };
      });
    } else {
      alert("Please enter a valid image URL.");
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setProduct((prevProduct) => {
      if (!prevProduct) return prevProduct; // Return null if prevProduct is null
      return {
        ...prevProduct,
        images: prevProduct.images.filter((_, i) => i !== index),
      };
    });
  };
  
  const toggleCategory = (category: string) => {
    setProduct((prevProduct) => {
      if (!prevProduct) return prevProduct; // Return null if prevProduct is null
      return {
        ...prevProduct,
        categories: prevProduct.categories.includes(category)
          ? prevProduct.categories.filter((c) => c !== category) // Remove category
          : [...prevProduct.categories, category], // Add category
      };
    });
  };
  
  const handleStatusChange = (status: "draft" | "published") => {
    setProduct((prevProduct) => {
      if (!prevProduct) return prevProduct; // Return null if prevProduct is null
      return {
        ...prevProduct,
        status,
      };
    });
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      // Simulate API call to update product
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to update product");
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  // Product not found
  if (!product) return <div>Product not found.</div>;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Product Information and Media */}
      <div className="lg:col-span-2 space-y-6">
        {/* Product Information */}
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

        {/* Media */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.map((image, index) => (
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
              type="button"
              onClick={handleAddImage}
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-[#4f507f] hover:border-[#4f507f] transition-colors"
            >
              <Upload size={24} />
              <span className="mt-2 text-sm">Add Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Organization and Actions */}
      <div className="space-y-6">
        {/* Organization */}
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
                      product.categories.includes(category) ? "bg-[#edeefc] text-[#4f507f]" : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        product.categories.includes(category) ? "bg-[#4f507f] text-white" : "border border-gray-300"
                      }`}
                    >
                      {product.categories.includes(category) && <Check size={14} />}
                    </div>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={product.status}
                onChange={(e) => handleStatusChange(e.target.value as "draft" | "published")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
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
    </form>
  );
}