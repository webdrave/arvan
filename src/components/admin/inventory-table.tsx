"use client"

import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"

const initialInventory = [
  { id: 1, name: "Product A", sku: "SKU001", category: "Electronics", inStock: 50, lowStockThreshold: 10 },
  { id: 2, name: "Product B", sku: "SKU002", category: "Clothing", inStock: 100, lowStockThreshold: 20 },
  { id: 3, name: "Product C", sku: "SKU003", category: "Home & Garden", inStock: 5, lowStockThreshold: 15 },
  { id: 4, name: "Product D", sku: "SKU004", category: "Beauty", inStock: 200, lowStockThreshold: 50 },
  { id: 5, name: "Product E", sku: "SKU005", category: "Sports", inStock: 0, lowStockThreshold: 10 },
]

export function InventoryTable() {
  const [inventory, setInventory] = useState(initialInventory)

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit product with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id))
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.inStock}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.inStock === 0 ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Out of Stock
                  </span>
                ) : item.inStock <= item.lowStockThreshold ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Low Stock
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    In Stock
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleEdit(item.id)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

