import { apiClient } from "../axiosClient";

export interface OrderItems {
    productVariantId: string;
    quantity: number;
    priceAtOrder: number;
}

export interface Order {
    addressId: string;
    paid?: boolean;
    userId: string;
    items: OrderItems[];
    total: number;
}

export const orderApi = {
  getOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get("/api/orders");
    return response.data.orders;
  },
  getOrderById: async (id: string): Promise<Order> => { 
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data.order;
  },
  createOrder: async (order: Order): Promise<Order> => {
    const response = await apiClient.post("/api/orders", order);
    return response.data.order;
  },
  updateOrder: async (id: string, order: Order): Promise<Order> => {
    const response = await apiClient.put(`/api/orders/${id}`, order);
    return response.data.order;
  },
  deleteOrder: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/orders/${id}`);
  },
};