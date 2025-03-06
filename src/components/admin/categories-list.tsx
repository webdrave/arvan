"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Category } from "@/types/types"

export function CategoriesList() {
  const [newCategory, setNewCategory] = useState("")
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      return data.categories
    },
  })

  const addCategoryMutation = useMutation({
    mutationFn: async (categoryName: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }) // Refresh categories list
    },  })

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }) // Refresh categories list
    },
  })

  const handleAddCategory = () => {
    if (!newCategory.trim()) return
    addCategoryMutation.mutate(newCategory)
    setNewCategory("")
  }

  const handleDeleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id)
  }

  if (isLoading) {
    return <div>Loading...</div>
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
            className="flex-grow px-3 py-2 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4f507f]"
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
        {data?.map((category: Category) => (
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
