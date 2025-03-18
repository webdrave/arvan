import { Products } from "@/components/admin/products-table";
import { apiClient } from "@/lib/axiosClient";
import { Product } from "@/types/types";

export const productApi = {
  getAll: async (): Promise<Products[]> => {
    const response = await apiClient.get("/api/products");
    return response.data.products;
  },
  getProducts: async (currentPage:number, itemsPerPage:number,debouncedSearchTerm:string): Promise<{products:Products[], pagination: {totalPages: number}}> => {
    const response = await apiClient.get("/api/products", {
      params: {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchTerm,
      },
    });
    return response.data;
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
  },
  updateStatus: async (id: string, status: string): Promise<Products> => {
    const response = await apiClient.put(`/api/products/status/${id}`, {
      status,
    });
    return response.data;
  },
};