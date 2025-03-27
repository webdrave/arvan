"use client"
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axiosClient';

const oldproducts = [
  { name: "Product A", sales: 1234, revenue: 12340 },
]
export function TopSellingProducts() {

  const [products, setProducts] = React.useState(oldproducts);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.get("/api/analytics/top-products"),
    refetchInterval: 5000,
  })

  useEffect(() => {
    if (data) {
      setProducts(data.data.products);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Top Selling Products</h2>
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Top Selling Products</h2>
        <div className="text-center py-8 text-red-500">
          Error loading products data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Top Selling Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading || products.length === 0 && (
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
            {!isLoading && products.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
