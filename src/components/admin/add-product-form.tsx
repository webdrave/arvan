"use client";

import { useEffect, useState } from "react";
import { Upload, X, Check, Plus, Trash2, ChevronRight } from "lucide-react";
import { addProduct } from "@/app/admin/products/add/page";

export function AddProductForm() {
  const [images, setImages] = useState<string[]>([]);
  // const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  interface Variant {
    isOpen: any;
    id: string;
    color: string;
    images: string[];
    sizes: {
      id: string;
      name: string;
      quantity: number;
    }[];
  }
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category_id: "", // ✅ UUID format
    material: selectedCategories.join(","),
    assets: [] as { url: string; alt: string; type: string }[],
  });
  useEffect(() => {
    setProductData((prev) => ({
      ...prev,
      material: selectedCategories.join(","),
    }));
  }, [selectedCategories]);

  const [variants, setVariants] = useState<Variant[]>([]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: crypto.randomUUID(),
        color: "",
        images: [],
        sizes: [],
        isOpen: true,
      },
    ]);
  };

  const addSize = (variantId: string) => {
    setVariants(
      variants.map((variant) => {
        if (variant.id === variantId) {
          return {
            ...variant,
            sizes: [
              ...variant.sizes,
              { id: crypto.randomUUID(), name: "", quantity: 0 },
            ],
          };
        }
        return variant;
      })
    );
  };

  const removeVariant = (variantId: string) => {
    setVariants(variants.filter((v) => v.id !== variantId));
  };

  const removeSize = (variantId: string, sizeId: string) => {
    setVariants(
      variants.map((variant) => {
        if (variant.id === variantId) {
          return {
            ...variant,
            sizes: variant.sizes.filter((size) => size.id !== sizeId),
          };
        }
        return variant;
      })
    );
  };

  const handleAddVariantImage = (variantId: string) => {
    // In a real app, this would open a file picker
    setVariants(
      variants.map((variant) => {
        if (variant.id === variantId) {
          const newImage = `/placeholder.svg?height=200&width=200&text=Variant+Image+${
            variant.images.length + 1
          }`;
          return {
            ...variant,
            images: [...variant.images, newImage],
          };
        }
        return variant;
      })
    );
  };

  const handleRemoveVariantImage = (variantId: string, imageIndex: number) => {
    setVariants(
      variants.map((variant) => {
        if (variant.id === variantId) {
          const newImages = [...variant.images];
          newImages.splice(imageIndex, 1);
          return {
            ...variant,
            images: newImages,
          };
        }
        return variant;
      })
    );
  };
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

 
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setImages([...images, previewURL]); // 👈 तुरंत frontend में दिखाएगा

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setImages((prev) => prev.map((img) => (img === previewURL ? data.url : img)));
      setProductData({
        ...productData,
        assets: [
          ...productData.assets,
          { url: data.url, alt: productData.name, type: "IMAGE" },
        ],
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">
            Product Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="Enter product name"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="Enter product description"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                  placeholder="Enter SKU"
                  value={productData.category_id}
                  onChange={(e) =>
                    setProductData({ ...productData, category_id: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Barcode
                </label>
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
              <div
                key={index}
                className="relative group border border-gray-300 rounded-md overflow-hidden"
              >
                {/* ✅ Uncommented img tag */}
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-32 object-cover"
                />

                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200"
                >
                  <X size={14} className="text-gray-600" />
                </button>
              </div>
            ))}

            <label
              htmlFor="product-image"
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-[#4f507f] hover:border-[#4f507f] transition-colors cursor-pointer"
            >
              <input
                type="file"
                accept="image/*"
                id="product-image"
                className="hidden"
                onChange={handleUpload}
              />
              <Upload size={24} className="mb-1" />
              <span className="text-sm">Add Image</span>
            </label>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base Price
              </label>
                <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                  placeholder="0.00"
                  value={productData.price}
                  onChange={(e) =>
                  setProductData({ ...productData, price: parseFloat(e.target.value) || 0 })
                  }
                />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discounted Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="0"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#4f507f]">
              Product Variants
            </h2>
            <button
              onClick={addVariant}
              className="px-4 py-2 text-sm bg-[#4f507f] text-white rounded-md hover:bg-[#3e3f63] transition-colors duration-200 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Color Variant
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Add different color variants and their corresponding sizes and
            quantities for your product.
          </p>
          <div className="grid gap-6">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-[#4f507f] transition-colors duration-200"
              >
                <div
                  className="flex justify-between items-center mb-6 cursor-pointer"
                  onClick={() => {
                    setVariants(
                      variants.map((v) =>
                        v.id === variant.id ? { ...v, isOpen: !v.isOpen } : v
                      )
                    );
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`transform transition-transform ${
                        variant.isOpen ? "rotate-90" : ""
                      }`}
                    >
                      <ChevronRight size={20} />
                    </div>
                    <div className="w-64">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color Variant
                      </label>
                      <select
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f507f] focus:border-[#4f507f] bg-white shadow-sm"
                        value={variant.color}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          setVariants(
                            variants.map((v) =>
                              v.id === variant.id
                                ? { ...v, color: e.target.value }
                                : v
                            )
                          );
                        }}
                      >
                        <option value="">Select Color</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVariant(variant.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                    title="Remove Color Variant"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {variant.isOpen && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Variant Images
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {variant.images?.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`${variant.color} variant image ${
                                index + 1
                              }`}
                              className="w-full h-28 object-cover rounded-md border border-gray-200"
                            />
                            <button
                              onClick={() =>
                                handleRemoveVariantImage(variant.id, index)
                              }
                              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={() => handleAddVariantImage(variant.id)}
                          className="w-full h-28 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:text-[#4f507f] hover:border-[#4f507f] transition-colors"
                        >
                          <Upload size={20} />
                          <span className="mt-2 text-sm">Add Image</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Size Options
                      </label>
                      <div className="grid gap-4">
                        {variant.sizes.map((size) => (
                          <div
                            key={size.id}
                            className="flex gap-6 items-center bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="w-48">
                              <label className="block text-xs text-gray-500 mb-1.5">
                                Size
                              </label>
                              <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f507f] focus:border-[#4f507f] bg-white shadow-sm"
                                value={size.name}
                                onChange={(e) => {
                                  setVariants(
                                    variants.map((v) => {
                                      if (v.id === variant.id) {
                                        return {
                                          ...v,
                                          sizes: v.sizes.map((s) =>
                                            s.id === size.id
                                              ? { ...s, name: e.target.value }
                                              : s
                                          ),
                                        };
                                      }
                                      return v;
                                    })
                                  );
                                }}
                              >
                                <option value="">Select Size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                              </select>
                            </div>
                            <div className="w-48">
                              <label className="block text-xs text-gray-500 mb-1.5">
                                Stock Quantity
                              </label>
                              <input
                                type="number"
                                placeholder="Enter quantity"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4f507f] focus:border-[#4f507f] bg-white shadow-sm"
                                value={size.quantity}
                                onChange={(e) => {
                                  setVariants(
                                    variants.map((v) => {
                                      if (v.id === variant.id) {
                                        return {
                                          ...v,
                                          sizes: v.sizes.map((s) =>
                                            s.id === size.id
                                              ? {
                                                  ...s,
                                                  quantity:
                                                    parseInt(e.target.value) ||
                                                    0,
                                                }
                                              : s
                                          ),
                                        };
                                      }
                                      return v;
                                    })
                                  );
                                }}
                              />
                            </div>
                            <button
                              onClick={() => removeSize(variant.id, size.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-red-50 mt-6"
                              title="Remove Size Option"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addSize(variant.id)}
                        className="mt-4 text-sm text-[#4f507f] hover:text-[#3e3f63] flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#edeefc] transition-colors duration-200"
                      >
                        <Plus size={16} />
                        Add Size Option
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>{" "}
      </div>{" "}
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-[#4f507f]">
            Categories
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                      selectedCategories.includes(category)
                        ? "bg-[#edeefc] text-[#4f507f]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        selectedCategories.includes(category)
                          ? "bg-[#4f507f] text-white"
                          : "border border-gray-300"
                      }`}
                    >
                      {selectedCategories.includes(category) && (
                        <Check size={14} />
                      )}
                    </div>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Low Stock Threshold
              </label>
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
              <label
                htmlFor="track-inventory"
                className="text-sm text-gray-700"
              >
                Track inventory
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="continue-selling"
                className="w-4 h-4 text-[#4f507f] rounded focus:ring-[#4f507f]"
              />
              <label
                htmlFor="continue-selling"
                className="text-sm text-gray-700"
              >
                Continue selling when out of stock
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#4f507f] text-white py-2 px-4 rounded-md hover:bg-[#3e3f63] transition-colors"
            onClick={() => addProduct(productData)} // ✅ Passing `productData`
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
  );
}
