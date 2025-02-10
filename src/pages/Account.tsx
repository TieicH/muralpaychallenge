import { Card } from "@/components/ui/card";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import { useParams } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetKYC } from "@/hooks/useGetKYC";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BankDetails } from "@/components/BankDetails";
import { TransferForm } from "@/components/TransferForm";
import { useGetAllTransfers } from "@/hooks/useGetAllTransfers";
import {
  getTransfersByAccountId,
  tranformDate,
  truncateWallet,
} from "@/helpers/utils";
import { useMemo } from "react";
import { useExecuteTransferRequest } from "@/hooks/useExecuteTransfer";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const Account = () => {
  const { customerId } = useParams();
  const { data: customer, isError, isLoading } = useGetCustomer(customerId!);
  const { data: kycLink } = useGetKYC(customerId!);
  const { data: transfers } = useGetAllTransfers();
  const { mutate: executeTransferRequest } = useExecuteTransferRequest();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center border rounded-md p-4 border-red-200 w-full">
      <Card className="p-4 w-[80%]">
        <h1>Account</h1>
        <div className="flex gap-4 w-full justify-between items-start">
          <div>
            <h3>Account Details</h3>
            <p>Name: {customer.name}</p>
            <p>Status: {customer.status}</p>
            <p>Account Type: {customer.customerType}</p>
          </div>

          <div>
            <BankDetails account={customer.account!} />
            <TransferForm accountId={customer.accountId!} />
          </div>
        </div>

        {customer.status === "PENDING" && (
          <>
            <p>
              We need to verify your account before you can use it, please
              verify your account by clicking on the link below
            </p>
            <Button variant="link" asChild>
              <a target="_blank" href={kycLink?.kycLink}>
                Verify Account
              </a>
            </Button>
          </>
        )}

        <h3>Transfer History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Blockchain</TableHead>
              <TableHead>Transfer type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfersByAccountId.map((transferItem) => {
              console.log({ transferItem: transferItem });
              return (
                <TableRow key={transferItem.id}>
                  <TableCell className="font-medium">
                    {tranformDate(transferItem.createdAt)}
                  </TableCell>
                  <TableCell>
                    {truncateWallet(
                      transferItem.recipientsInfo?.[0].blockchainDetails
                        ?.walletAddress
                    )}
                  </TableCell>
                  <TableCell>
                    {
                      transferItem.recipientsInfo?.[0].blockchainDetails
                        ?.blockchain
                    }
                  </TableCell>
                  <TableCell>
                    {transferItem.recipientsInfo?.[0]?.recipientTransferType}
                  </TableCell>
                  <TableCell>{transferItem.status}</TableCell>
                  <TableCell>
                    {transferItem.recipientsInfo?.[0]?.tokenAmount}
                  </TableCell>
                  <TableCell className="text-right">
                    {transferItem.status === "IN_REVIEW" ? (
                      <Button
                        onClick={() =>
                          executeTransferRequest(transferItem.id, {
                            onSuccess(data, variables, context) {
                              toast({
                                duration: 3000,
                                variant: "success",
                                title: "Transfer Executed!",
                                description: "Great job!",
                              });
                              queryClient.invalidateQueries({
                                queryKey: ["allTransfers"],
                              });
                            },
                            onError(error) {
                              toast({
                                duration: 2000,
                                variant: "error",
                                title: "Sadly, something went wrong!",
                                description: error.message,
                              });
                            },
                          })
                        }
                      >
                        Execute
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

// {
//     "id": "6c1ade49-a38e-4f22-a0c2-c326db8a35fe",
//     "createdAt": "2025-02-10T00:53:14.603Z",
//     "updatedAt": "2025-02-10T00:53:14.603Z",
//     "name": "Edison",
//     "customerType": "INDIVIDUAL",
//     "status": "PENDING",
//     "currenciesInfo": []
// }
