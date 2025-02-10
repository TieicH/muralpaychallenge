import { api } from "@/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { CustomerResponse } from "@/types/types";

const getCustomer = async (customerId: string): Promise<CustomerResponse> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}customers/${customerId}`
  );
  return response.data;
};

export const useGetCustomer = (customerId: string) => {
  const query = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomer(customerId),
    enabled: !!customerId,
  });
  return query;
};
