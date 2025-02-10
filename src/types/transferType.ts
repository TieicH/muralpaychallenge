import { BlockChainType, CustomerType } from "./types";

type TransferType = "BLOCKCHAIN" | "FIAT";
type BankAccountType = "CHECKING" | "SAVINGS";
export type TransferStatus =
  | "IN_REVIEW"
  | "CANCELLED"
  | "PENDING"
  | "EXECUTED"
  | "FAILED";

export interface TransferRequestProps {
  recipientsInfo: RecipientInfo[];
}

interface RecipientInfo {
  name: string;
  tokenAmount: number;
  email: string;
  recipientType: CustomerType;
  dateOfBirth?: string; // required only if the recipientType is INDIVIDUAL
  recipientTransferType: TransferType;
  bankDetails?: {
    bankName: string;
    bankAccountOwnerName: string;
    accountType: BankAccountType;
    bankAccountNumber: string;
    bankRoutingNumber: string;
    currencyCode?: string;
    physicalAddress: {
      address1: string;
      country: string;
      state: string;
      city: string;
      zip: string;
    };
  };
  walletDetails?: {
    walletAddress: string;
    blockchain: BlockChainType;
  };
}

interface TransferRecipientInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  recipientTransferType: TransferType;
  blockchainDetails?: {
    blockchain: BlockChainType;
    walletAddress: string;
  };
  tokenAmount: number;
}

export interface TransferRequestResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  payoutAccountId: string;
  status: TransferStatus;
  recipientsInfo: TransferRecipientInfo[];
}

export interface AllTransfersResponse {
  total: number;
  nextId: string;
  results: TransferRequestResponse[];
}
