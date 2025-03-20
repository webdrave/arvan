import { apiClient } from "@/lib/axiosClient";


import { Product } from "@/types/types";

interface Products extends Product {
  id: string;
}
export const productApi = {
  getAll: async (): Promise<Products[]> => {
    const response = await apiClient.get("/api/products");
    return response.data.products;
  },
  
  getById: async (id: string): Promise<Products> => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },
  addProduct: async (product: Product): Promise<Products> => {
    const response = await apiClient.post("/api/products", product);
    return response.data;
  },
  updateProduct: async (id: string, product: Product): Promise<Products> => {
    const response = await apiClient.put(`/api/products/${id}`, product);
    return response.data;
  },
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/products/${id}`);
  }
};