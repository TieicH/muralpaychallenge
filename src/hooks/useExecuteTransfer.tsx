import { api } from "@/axiosInstance";
import { TransferRequestResponse } from "@/types/transferType";
import { useMutation } from "@tanstack/react-query";

const executeTransferRequest = async (
  transferRequestId: string
): Promise<TransferRequestResponse> => {
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}transfer-requests/execute`,
    {
      transferRequestId,
    },
    {
      headers: {
        "mural-account-api-key": import.meta.env.VITE_TRANSFER_API_KEY,
      },
    }
  );
  return response.data;
};

export const useExecuteTransferRequest = () => {
  const query = useMutation({
    mutationFn: (transferRequestId: string) =>
      executeTransferRequest(transferRequestId),
  });
  return query;
};
