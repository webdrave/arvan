import { apiClient } from "../axiosClient";

interface TopProducts {
    id: string;
    name: string;
    sales: number;
    revenue: number;
}

interface BestSellers {
    productId: string;
    name: string;
    price: number;
    discount?: number;
    category: string;
    img : string
}

export const analyticApi = {
    getTopProducts: async (): Promise<TopProducts[]> => {
        const response = await apiClient.get("/api/analytics/top-products");
        return response.data.products;
    },
    getBestSellers: async (): Promise<BestSellers[]> => {
        const response = await apiClient.get(`/api/analytics/best-sellers/?limit=10`);
        return response.data.products;
    },
    }