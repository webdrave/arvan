import { apiClient } from "@/lib/axiosClient";
import {ReviewsResponse} from "@/components/Sections/ProductDetails";

export const productReviewApi = {
    // fetch all reviews
  getAll: async (productId: string): Promise<ReviewsResponse[]> => {
    const response = await apiClient.get("/api/reviews");
    return response.data.reviews;
  },

    // fetch review by product id
    getById: async (productId: string): Promise<ReviewsResponse> => {
        const response = await apiClient.get(`/api/reviews/${productId}`);
        return response.data;
    },

    // create a new review by product id
    create: async (id: string , review: Omit<ReviewsResponse, "id" | "date">): Promise<ReviewsResponse> => {
        const response = await apiClient.post(`/api/reviews/${id}`, review);
        return response.data;
    },

    // update a review
    update: async (id: string, review: Partial<ReviewsResponse>): Promise<ReviewsResponse> => {
        const response = await apiClient.put(`/api/reviews/${id}`, review);
        return response.data;
    },

    // delete
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/reviews/${id}`);
    }

};