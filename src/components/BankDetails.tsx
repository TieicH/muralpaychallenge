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

interface BankDetailsProps {
  account: Account;
}

export const BankDetails = (account: BankDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Bank Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Account Details</DialogTitle>
          <DialogDescription>
            Internal account details for deposits.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[1fr_1px_1fr] gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-bold">Bank Account</h3>
            <div>
              <p>Beneficiary name</p>
              <p>{account.account.depositAccount.bankBeneficiaryName}</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Beneficiary Address</p>
              <p>{account.account.depositAccount.bankBeneficiaryAddress}</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Routing Number</p>
              <p>{account.account.depositAccount.bankRoutingNumber}</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Account Number</p>
              <p>{account.account.depositAccount.bankAccountNumber}</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Account Type</p>
              <p>Cheking</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Bank Name</p>
              <p>{account.account.depositAccount.bankName}</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Bank Address</p>
              <p>{account.account.depositAccount.bankAddress}</p>
              <Button variant="outline">Copy</Button>
            </div>
          </div>
          <div className="bg-gray-300 w-[1px]"></div>
          <div className="flex flex-col">
            <h3 className="mb-4 text-lg font-bold">Digital Wallet</h3>
            <div>
              <p>Address</p>
              <p>{truncateWallet(account.account.address)}</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Network</p>
              <p>{account.account.blockchain}</p>
              <Button variant="outline">Copy</Button>
            </div>
            <div>
              <p>Currency</p>
              <p>{account.account.balance.tokenSymbol}</p>
              <Button variant="outline">Copy</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
