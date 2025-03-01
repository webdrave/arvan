import { Package, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"

export function ProductOverview() {
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
            <p className="text-xl font-semibold">1,234</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#e6f1fd] rounded-full">
            <DollarSign size={24} className="text-[#7094f4]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-semibold">$45,678</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#e6fdf1] rounded-full">
            <TrendingUp size={24} className="text-[#4fc48a]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Growth</p>
            <p className="text-xl font-semibold">+12.5%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#fdf1e6] rounded-full">
            <AlertTriangle size={24} className="text-[#f4a970]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Low Stock</p>
            <p className="text-xl font-semibold">23</p>
          </div>
        </div>
      </div>
    </div>
  )
}

