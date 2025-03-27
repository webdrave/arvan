/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axiosClient';

// --- ADD ADDRESS ---
const addAddress = async (addressData:any) => {
  const response = await apiClient.post('/customer/address', addressData);
  return response.data;
};

export const useAddAddress = () => {
  return useMutation({
    mutationFn: addAddress,
    mutationKey: ['add-address'],
  });
};

// --- UPDATE ADDRESS ---


const updateAddress = async ({ addressId, addressData }: any) => {
  const response = await apiClient.put(`/customer/address/${addressId}`, addressData);
  return response.data;
};

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: updateAddress,
    mutationKey: ['update-address'],
  });
};

// --- DELETE ADDRESS ---
const deleteAddress = async (addressId: string) => {
  const response = await apiClient.delete(`/customer/address/${addressId}`);
  return response.data;
};

export const useDeleteAddress = () => {
  return useMutation({
    mutationFn: deleteAddress,
    mutationKey: ['delete-address'],
  });
};

// --- GET ADDRESSES ---
const getAddresses = async () => {
  const response = await apiClient.get('/customer/address');
  return response.data;
};

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });
};
