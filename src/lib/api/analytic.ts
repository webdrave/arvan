import { apiClient } from "../axiosClient";

interface TopProducts {
    id: string;
    name: string;
    sales: number;
    revenue: number;
}

export const analyticApi = {
    getTopProducts: async (): Promise<TopProducts[]> => {
        const response = await apiClient.get("/api/analytics/top-products");
        return response.data.products;
    },
    }