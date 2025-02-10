import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tranformDate, truncateWallet } from "@/helpers/utils";
import { TransferRequestResponse } from "@/types/transferType";
import { Button } from "./ui/button";
import { useExecuteTransferRequest } from "@/hooks/useExecuteTransfer";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const TransferTable = ({
  transfers,
}: {
  transfers: TransferRequestResponse[];
}) => {
  const { mutate: executeTransferRequest } = useExecuteTransferRequest();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onExecuteTransfer = (transferId: string) => {
    executeTransferRequest(transferId, {
      onSuccess() {
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
    });
  };

  return (
    <div className="mt-5">
      <h3 className="text-2xl font-bold mb-2">Transfer History</h3>
      {transfers.length === 0 ? (
        <p>No transfers found</p>
      ) : (
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
            {transfers.map((transferItem) => {
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
                        onClick={() => onExecuteTransfer(transferItem.id)}
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
      )}
    </div>
  );
};
