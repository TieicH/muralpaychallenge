import { Card } from "@/components/ui/card";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import { useParams } from "react-router";
import { useGetKYC } from "@/hooks/useGetKYC";
import { Button } from "@/components/ui/button";
import { BankDetails } from "@/components/BankDetails";
import { TransferForm } from "@/components/TransferForm";
import { useGetAllTransfers } from "@/hooks/useGetAllTransfers";
import { getTransfersByAccountId, tranformCurrency } from "@/helpers/utils";
import { useMemo } from "react";
import { TransferTable } from "@/components/TransferTable";

export const Account = () => {
  const { customerId } = useParams();
  const { data: customer, isError, isLoading } = useGetCustomer(customerId!);
  const { data: kycLink } = useGetKYC(customerId!);
  const { data: transfers } = useGetAllTransfers();

  const transfersByAccountId = useMemo(() => {
    if (transfers && transfers?.results?.length > 0 && customer?.accountId) {
      return getTransfersByAccountId(
        transfers?.results || [],
        customer?.accountId
      );
    }
    return [];
  }, [customer?.accountId, transfers]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center border rounded-md p-4 border-red-200 w-full">
        <Card className="p-4 w-[80%]">
          <div>Loading...</div>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center border rounded-md p-4 border-red-200 w-full">
        <Card className="p-4 w-[80%]">
          <div>Something went wrong</div>
        </Card>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center border rounded-md p-4 border-red-200 w-full">
        <Card className="p-4 w-[80%]">
          <div>Customer not found</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-md p-4 w-full mt-6">
      <Card className="p-4 w-[80%]">
        <h1 className="text-4xl font-bold">Account</h1>
        <Card className="p-4 mt-5">
          <div className="flex gap-4 w-full justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-2">Account Details</h3>
              <p className="text-lg">
                Name: <span>{customer.name}</span>
              </p>
              <p className="text-lg">
                Status: <span>{customer.status}</span>
              </p>
              <p className="text-lg">
                Account Type: <span>{customer.customerType}</span>
              </p>
            </div>

            <div>
              <div className="flex gap-4">
                <BankDetails account={customer.account!} />
                <TransferForm accountId={customer.accountId!} />
              </div>
              <div className=" flex mt-2 justify-end">
                <h3 className="text-2xl font-bold mr-2">Balance</h3>
                <p className="text-2xl font-bold">
                  {`${tranformCurrency(customer?.account?.balance?.balance)}`}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {customer.status === "PENDING" && (
          <Card className="p-4 mt-5">
            <p>
              We need to verify your account before you can use it, please
              verify your account by clicking on this link{" "}
              <a
                target="_blank"
                className="underline text-blue-500"
                href={kycLink?.kycLink}
              >
                Verify Account
              </a>
            </p>
            <p className="text-xs text-gray-700">
              NOTEL: If you already verified your account, please wait a few
              minutes to complete the account creation.
            </p>
          </Card>
        )}

        <TransferTable transfers={transfersByAccountId}></TransferTable>
      </Card>
    </div>
  );
};
