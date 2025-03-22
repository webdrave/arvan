import { apiClient } from "../axiosClient";


interface InventoryOverview {
  totalProducts: number;
  lowStockItems: number;
  outOfStock: number;
  restockAlerts: number;
}
const getInventoryOverview = async (): Promise<InventoryOverview> => {
  const response = await apiClient.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/inventory/overview`);
  return response.data;
};

export const inventoryApi = {
  getInventoryOverview,
};