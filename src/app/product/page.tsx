"use client";
import { productApi } from "@/lib/api/productdetails";
import { useQueries } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductPage() {
  const [{ data: products = [] }] = useQueries({
    queries: [
      {
        queryKey: ["products"],
        queryFn: () => productApi.getAll(),
      },
    ],
  });

  const router = useRouter();

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Products</h1>
    
    {products ? (
      products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white hover:bg-gray-50 p-5 text-left"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <p className="text-lg font-medium text-indigo-600">Price: ${product.price}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )
    ) : (
      <p className="text-center text-gray-500"><Loader/></p>
    )}
  </div>
  
  );
}
