"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticApi } from "@/lib/api/analytic";

export function TopSellingProducts() {
  // Fetch products using React Query
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["productPerformance"],
    queryFn: async () => {
      try {
        const data = await analyticApi.getTopProducts();
        if (!data) throw new Error("No data returned");
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    },
  });

  if (isError) {
    return (
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-[#4f507f]">
          Top Selling Products
        </h2>
        <div className="text-center py-6 md:py-8 text-red-500">
          Error loading products data. Please try again later.
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-[#4f507f]">
          Top Selling Products
        </h2>
        <div className="text-center py-6 md:py-8 text-gray-500">
          Loading products data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-[#4f507f]">
        Top Selling Products
      </h2>
      
      {/* Desktop Table - Hidden on small screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-3 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sales}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.revenue}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-3 sm:px-4 md:px-6 py-2 md:py-4 text-center text-sm text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards - Visible only on small screens */}
      <div className="sm:hidden">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="mb-4 p-3 rounded-md shadow-sm hover:bg-gray-50 transition-colors duration-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 font-medium">Sales:</span>
                  <span className="ml-2 text-gray-700">{product.sales}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Revenue:</span>
                  <span className="ml-2 text-gray-700">₹{product.revenue}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}