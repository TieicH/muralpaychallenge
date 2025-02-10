import { api } from "@/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { KYCLinkResponse } from "@/types/types";

const getKYC = async (customerId: string): Promise<KYCLinkResponse> => {
  const response = await api.get(
    `${import.meta.env.VITE_API_URL}customers/${customerId}/kyc-link`
  );
  return response.data;
};

export const useGetKYC = (customerId: string) => {
  const query = useQuery({
    queryKey: ["kyc", customerId],
    queryFn: () => getKYC(customerId),
    enabled: !!customerId,
  });
  return query;
};
