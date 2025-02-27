"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"

const initialCategories = [
  { id: 1, name: "Electronics", productCount: 120 },
  { id: 2, name: "Clothing", productCount: 85 },
  { id: 3, name: "Home & Garden", productCount: 65 },
  { id: 4, name: "Beauty", productCount: 40 },
  { id: 5, name: "Sports", productCount: 30 },
]

export function CategoriesList() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory, productCount: 0 }])
      setNewCategory("")
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-[#4f507f] text-white rounded-r-md hover:bg-[#3e3f63] transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200 last:border-b-0"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.productCount} products</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-indigo-600 hover:text-indigo-900">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

