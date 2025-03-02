export function TopSellingProducts() {
  const products = [
    { name: "Product A", sales: 1234, revenue: 12340 },
    { name: "Product B", sales: 987, revenue: 9870 },
    { name: "Product C", sales: 765, revenue: 7650 },
    { name: "Product D", sales: 543, revenue: 5430 },
    { name: "Product E", sales: 321, revenue: 3210 },
  ]

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
            {products.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

