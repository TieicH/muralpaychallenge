export type CustomerType = "INDIVIDUAL" | "BUSINESS";
type AccountStatus = "INACTIVE" | "PENDING" | "COMPLETE" | "ERROR" | "REJECTED";
type DepositAccountStatus = "ACTIVATED" | "DEACTIVATED";
export type BlockChainType = "ETHEREUM" | "POLYGON" | "BASE" | "CELO";
type StageType = "TOS" | "AWAITING_KYC" | "COMPLETED" | "REJECTED";
type Currency =
  | "USD"
  | "COP"
  | "ARS"
  | "EUR"
  | "MXN"
  | "BRL"
  | "CLP"
  | "PEN"
  | "BOB"
  | "CRC"
  | "ZAR";

export interface Customer {
  name: string;
  type: CustomerType;
  email: string;
}

interface Balance {
  balance: number;
  tokenSymbol: string;
}

interface CurrencyInfo {
  currencyCode: Currency;
  stage: StageType;
  isRestricted: boolean;
  message: string;
}

interface DespositAccount {
  id: string;
  status: DepositAccountStatus;
  currency: Currency;
  bankBeneficiaryName: string;
  bankBeneficiaryAddress: string;
  bankName: string;
  bankAddress: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  paymentRails: string[];
}

export interface Account {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  blockchain: BlockChainType;
  address: string;
  balance: Balance;
  isApiEnabled: boolean;
  isPending: boolean;
  depositAccount: DespositAccount;
}

export interface CustomerResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  currenciesInfo: CurrencyInfo[];
  customerType: CustomerType;
  name: string;
  status: AccountStatus;
  accountId?: string;
  account?: Account;
}

export interface KYCLinkResponse {
  kycLink: string;
}
