import { api } from "@/axiosInstance";
import {
  TransferRequestProps,
  TransferRequestResponse,
} from "@/types/transferType";
import { useMutation } from "@tanstack/react-query";

interface TransferRequest {
  transferRequest: TransferRequestProps;
  accountId: string;
}

const createTransferRequest = async ({
  transferRequest,
  accountId,
}: TransferRequest): Promise<TransferRequestResponse> => {
  console.log({ transferRequest, accountId });
  const response = await api.post(
    `${import.meta.env.VITE_API_URL}transfer-requests`,
    {
      recipientsInfo: transferRequest.recipientsInfo,
      payoutAccountId: accountId,
    }
  );
  return response.data;
};

export const useCreateTransferRequest = () => {
  const query = useMutation({
    mutationFn: (data: TransferRequest) => createTransferRequest(data),
  });
  return query;
};
