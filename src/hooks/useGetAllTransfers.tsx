import { api } from "@/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { AllTransfersResponse } from "@/types/transferType";

const getAllTransfers = async (): Promise<AllTransfersResponse> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}transfer-requests`
  );
  return response.data;
};

export const useGetAllTransfers = () => {
  const query = useQuery({
    queryKey: ["allTransfers"],
    queryFn: () => getAllTransfers(),
  });
  return query;
};
