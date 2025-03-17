import { apiClient } from "@/lib/axiosClient";
import {Product} from "@/components/Sections/ProductDetails";

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get("/api/products");
    return response.data.products;
  },
  
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },
  addProduct: async (product: Product): Promise<Product> => {
    const response = await apiClient.post("/api/products", product);
    return response.data;
  },
  updateProduct: async (id: string, product: Product): Promise<Product> => {
    const response = await apiClient.put(`/api/products/${id}`, product);
    return response.data;
  },
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/products/${id}`);
  }
};