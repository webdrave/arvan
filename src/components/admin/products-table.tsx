"use client";

import Link from "next/link";
import { Edit, Trash2, Copy, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/types";
import Image from "next/image";
import cuid from "cuid";

interface Products extends Product {
  stock: number;
  category: string;
  discountPrize: number;
  id: string;
  assets: {
    type: "IMAGE" | "VIDEO";
    asset_url: string;
    url: string;
  }[];
}

export function ProductsTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },  });

  const copyMutation = useMutation({
    mutationFn: async (product: Products) => {
      const newProduct = {
        ...product,
        id: cuid(),
        name: `${product.name} (Copy)`,
        status: "DRAFT",
        discountPrice: 10, 
        assets: product.assets?.map((asset) => ({
          ...asset,
          url: asset.asset_url || "", 
        })) || [],
      };
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["products"]});
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: string }) => {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["products"]});
    },
  });

  if (isLoading) return <div className="flex justify-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error loading products</div>;
  if (!data?.products?.length) return <div className="p-4">No products found</div>;

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.products.map((product: Products) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative w-20 h-20">
                  <Image src={product.assets?.[0]?.asset_url || "/placeholder.png"} alt={product.name} fill className="object-cover rounded" sizes="80px" />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
              {/* <td className={`px-6 py-4 whitespace-nowrap ${product.stock < 10 ? "text-red-500" : "text-gray-500"}`}>{product.stock}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{product.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => deleteMutation.mutate(product.id)} className="text-red-600 hover:text-red-900 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => copyMutation.mutate(product)} className="text-blue-600 hover:text-blue-900 transition-colors">
                    <Copy size={18} />
                  </button>
                  <button onClick={() => toggleStatusMutation.mutate({ id: product.id, newStatus: product.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" })} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {product.status === "PUBLISHED" ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}