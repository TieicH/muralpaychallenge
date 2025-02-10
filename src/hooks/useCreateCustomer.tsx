import { api } from "@/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { Customer, CustomerResponse } from "@/types/types";

const createCustomer = async ({
  name,
  type,
}: Customer): Promise<CustomerResponse> => {
  const response = await api.post(`${import.meta.env.VITE_API_URL}customers`, {
    name,
    organizationType: type,
  });
  return response.data;
};

export const useCreateCustomer = () => {
  const query = useMutation({
    mutationFn: (data: Customer) => createCustomer(data),
  });
  return query;
};
