import { z } from "zod";
import { CustomerType } from "./signUpSchema";

const TransferType = z.enum(["BLOCKCHAIN", "FIAT"]);
const BankAccountType = z.enum(["CHECKING", "SAVINGS"]);
const BlockChainType = z.enum(["ETHEREUM", "POLYGON", "BASE", "CELO"]);

const PhysicalAddressSchema = z.object({
  address1: z.string().min(1, "Address1 is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "ZIP is required"),
});

const BankDetailsSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  bankAccountOwnerName: z.string().min(1, "Account owner name is required"),
  accountType: BankAccountType,
  currencyCode: z.string().optional(),
  bankAccountNumber: z.string().min(1, "Bank account number is required"),
  bankRoutingNumber: z.string().min(1, "Bank routing number is required"),
  physicalAddress: PhysicalAddressSchema,
});

const WalletDetailsSchema = z.object({
  walletAddress: z.string().min(1, "Wallet address is required"),
  blockchain: BlockChainType,
});

export const RecipientInfoSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    tokenAmount: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), { message: "Must be a valid number" })
      .refine((val) => val > 0, { message: "Must be greater than 0" }),
    email: z.string().email("Invalid email address"),
    recipientType: CustomerType,
    dateOfBirth: z.string().optional(),
    recipientTransferType: TransferType,
    bankDetails: BankDetailsSchema.optional(),
    walletDetails: WalletDetailsSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.recipientType === "INDIVIDUAL") {
        return data.dateOfBirth !== undefined && data.dateOfBirth.trim() !== "";
      }
      return true;
    },
    {
      message: "Date of birth is required for INDIVIDUAL recipient type",
      path: ["dateOfBirth"],
    }
  );

export const recipientTransferType = ["BLOCKCHAIN", "FIAT"];
export const bankAccountType = ["CHECKING", "SAVINGS"];
export const blockchainType = ["ETHEREUM", "POLYGON", "BASE", "CELO"];

export type TransferRequestFormValues = z.infer<typeof RecipientInfoSchema>;
