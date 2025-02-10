import { api } from "@/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AllCsutomersResponse } from "@/types/types";

const getAllCustomers = async (): Promise<AllCsutomersResponse> => {
  const response = await api.get(`${import.meta.env.VITE_API_URL}customers`);
  return response.data;
};

export const useGetAllCustomers = () => {
  const query = useQuery({
    queryKey: ["allCustomers"],
    queryFn: () => getAllCustomers(),
  });
  return query;
};
