"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Copy, Eye, EyeOff } from "lucide-react"

const sampleProducts = [
  { id: 1, name: "Product 1", category: "Electronics", price: 99.99, stock: 50, status: "published" },
  { id: 2, name: "Product 2", category: "Clothing", price: 49.99, stock: 100, status: "draft" },
  { id: 3, name: "Product 3", category: "Home & Garden", price: 29.99, stock: 75, status: "published" },
  { id: 4, name: "Product 4", category: "Beauty", price: 19.99, stock: 200, status: "draft" },
  { id: 5, name: "Product 5", category: "Sports", price: 79.99, stock: 30, status: "published" },
]

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: string
}

export function ProductsTable() {
  const [products, setProducts] = useState(sampleProducts)

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleCopy = (product: Product) => {
    const newProduct = { ...product, id: Date.now(), name: `${product.name} (Copy)`, status: "draft" }
    setProducts([...products, newProduct])
  }

  const toggleStatus = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, status: product.status === "published" ? "draft" : "published" } : product,
      ),
    )
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{product.stock}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  <Edit size={18} />
                </Link>
                <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 mr-2">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => handleCopy(product)} className="text-blue-600 hover:text-blue-900 mr-2">
                  <Copy size={18} />
                </button>
                <button onClick={() => toggleStatus(product.id)} className="text-gray-600 hover:text-gray-900">
                  {product.status === "published" ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

