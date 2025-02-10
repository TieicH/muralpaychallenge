import { TransferRequestResponse, TransferStatus } from "@/types/transferType";

export const getTransfersByAccountId = (
  transfers: TransferRequestResponse[],
  accountId: string
) => {
  if (transfers.length === 0) return [];
  return transfers.filter((transfer) => transfer.payoutAccountId === accountId);
};

export const getTransferByStatus = (
  transfers: TransferRequestResponse[],
  status: TransferStatus
) => {
  return transfers.filter((transfer) => transfer.status === status);
};

export const truncateWallet = (walletAddress: string | undefined) => {
  if (!walletAddress) return "";
  return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
};

export const tranformDate = (date: string) => {
  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return dateObject.toLocaleDateString("en-US", options);
};

export const tranformCurrency = (amount: number | undefined) => {
  if (!amount) return "$0.00";
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
