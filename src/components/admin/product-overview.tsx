"use client";
import { productApi } from "@/lib/api/productdetails";
import { useQuery } from "@tanstack/react-query";
import { Package, DollarSign, TrendingUp, Users, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react";



export function ProductOverview() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);


  const { data, isLoading, error } = useQuery({
    queryKey: ["inventoryOverview"],
    queryFn: productApi.getDashBoardOverview,
  });

  useEffect(() => {
    if (data) {
      setTotalCustomers(data.usersCount);
      setTotalProducts(data.totalProducts);
      setTotalSales(data.growth);
      setTotalRevenue(data.revenue);
    }
  }, [data]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 text-[#4f507f]">Product Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#edeefc] rounded-full">
            <Package size={24} className="text-[#4f507f]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-xl font-semibold">{totalProducts}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#e6f1fd] rounded-full">
            <DollarSign size={24} className="text-[#7094f4]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-semibold">{totalRevenue}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#e6fdf1] rounded-full">
            {totalSales >= 0 ? (
              <TrendingUp size={24} className="text-[#4fc48a]" />
            ) : (
              <TrendingDown size={24} className="text-[#ff4d4d]" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Growth</p>
            <p className="text-xl font-semibold">{totalSales}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#fdf1e6] rounded-full">
            <Users size={24} className="text-[#f4a970]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Users</p>
            <p className="text-xl font-semibold">{totalCustomers}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

