import { apiClient } from "@/lib/axiosClient";
import {Product} from "@/components/Sections/ProductDetails";

export const productApi = {
  getAll: async (productId: string): Promise<Product[]> => {
    const response = await apiClient.get("/api/products");
    return response.data.products;
  },
  
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  }
};