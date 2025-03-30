/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/axiosClient';

// --- ADD ADDRESS ---
const addAddress = async (addressData: any) => {
  const response = await apiClient.post('/api/customers/address', addressData);
  return response.data;
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    mutationKey: ['add-address'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] }); // Refresh addresses after adding
    },
  });
};

// --- UPDATE ADDRESS ---
const updateAddress = async ({ addressId, addressData }: any) => {
  const response = await apiClient.put(`/api/customers/address/${addressId}`, addressData);
  return response.data;
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAddress,
    mutationKey: ['update-address'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] }); // Refresh addresses after update
    },
  });
};

// --- DELETE ADDRESS ---
const deleteAddress = async (addressId: string) => {
  const response = await apiClient.delete(`/api/customers/address/${addressId}`);
  return response.data;
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    mutationKey: ['delete-address'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] }); // Refresh addresses after deletion
    },
  });
};

// --- GET ADDRESSES ---
const getAddresses = async () => {
  const response = await apiClient.get('/api/customers/address');
  return response.data;
};

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });
};

// --- GET CUSTOMER ---
const getCustomer = async () => {
  const response = await apiClient.get('/customers');
  return response.data;
};

export const useGetCustomer = () => {
  return useQuery({
    queryKey: ['customer'],
    queryFn: getCustomer,
  });
};

// --- UPDATE CUSTOMER ---
const updateCustomer = async (customerData: any) => {
  const response = await apiClient.put('/customers', customerData);
  return response.data;
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomer,
    mutationKey: ['update-customer'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer'] }); // Refresh customer data after update
    },
  });
};

async function getAddressById(id: string) {
  return (await apiClient.get(`/api/customers/address/${id}`)).data;
}

export const useGetAddressById = (id: string) => {
  return useQuery({
    queryKey: ['address', id], // Include id in queryKey to keep data fresh per ID
    queryFn: () => getAddressById(id), // Pass id to queryFn
    enabled: !!id, // Ensures the query only runs if id is provided
  });
};

