import { AddressFormData } from "@/app/address/page";
import { apiClient } from "../axiosClient";

type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
};

export const AddressApi = {
  getAddress: async (): Promise<Address[]> => {
    const response = await apiClient.get("api/customers/customer");
    return response.data.address;
  },
  addAddress: async (formData: AddressFormData): Promise<void> => {
    const response = await apiClient.post(
      "api/customers/customer/address",
      formData
    );
  },
};
