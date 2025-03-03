"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

const initialProducts = [
  { id: 1, name: "Product A", category: "Electronics", sales: 1234, revenue: 12340, profit: 2468 },
  { id: 2, name: "Product B", category: "Clothing", sales: 987, revenue: 9870, profit: 1974 },
  { id: 3, name: "Product C", category: "Home & Garden", sales: 765, revenue: 7650, profit: 1530 },
  { id: 4, name: "Product D", category: "Beauty", sales: 543, revenue: 5430, profit: 1086 },
  { id: 5, name: "Product E", category: "Sports", sales: 321, revenue: 3210, profit: 642 },
]

interface Product {
  id: number
  name: string
  category: string
  sales: number
  revenue: number
  profit: number
}

export function ProductPerformanceTable() {
  const [products] = useState(initialProducts)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)

  const sortedProducts = [...products].sort((a: Product, b: Product) => {
    if (!sortConfig) return 0
    const key = sortConfig.key as keyof typeof a
    if (a[key] < b[key]) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Category", "Sales", "Revenue", "Profit"].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(header.toLowerCase())}
              >
                {header}
                {sortConfig?.key === header.toLowerCase() &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUp size={14} className="inline ml-1" />
                  ) : (
                    <ArrowDown size={14} className="inline ml-1" />
                  ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.revenue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

