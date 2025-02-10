import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Account } from "@/types/types";
import { truncateWallet } from "@/helpers/utils";
import { DetailItem } from "./DetailItem";

interface BankDetailsProps {
  account: Account;
}

export const BankDetails = (account: BankDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Bank Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Account Details</DialogTitle>
          <DialogDescription>
            Internal account details for deposits.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-bold">Bank Account</h3>
            {!account.account?.depositAccount?.bankName ? (
              <p>No bank account created yet</p>
            ) : (
              <div className="grid gap-2">
                <DetailItem
                  title="Beneficiary name"
                  value={account.account?.depositAccount?.bankBeneficiaryName}
                />
                <DetailItem
                  title="Beneficiary Address"
                  value={
                    account.account?.depositAccount?.bankBeneficiaryAddress
                  }
                />
                <DetailItem
                  title="Routing Number"
                  value={account.account?.depositAccount?.bankRoutingNumber}
                />
                <DetailItem
                  title="Account Number"
                  value={account.account?.depositAccount?.bankAccountNumber}
                />
                <DetailItem title="Account Type" value="Cheking" />
                <DetailItem
                  title="Bank Name"
                  value={account.account?.depositAccount?.bankName}
                />
                <DetailItem
                  title="Bank Address"
                  value={account.account?.depositAccount?.bankAddress}
                />
              </div>
            )}
          </div>
          <div className="bg-gray-300 w-[1px]"></div>
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-bold">Digital Wallet</h3>
            {!account?.account?.address ? (
              <p>No wallet created yet</p>
            ) : (
              <div className="grid gap-2">
                <DetailItem
                  title="Address"
                  value={truncateWallet(account.account?.address)}
                  copyValue={account.account?.address}
                />
                <DetailItem
                  title="Network"
                  value={account.account?.blockchain}
                />
                <DetailItem
                  title="Currency"
                  value={account.account.balance?.tokenSymbol}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
