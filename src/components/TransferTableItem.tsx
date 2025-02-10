import { TableCell, TableRow } from "@/components/ui/table";
import {
  tranformCurrency,
  tranformDate,
  truncateWallet,
} from "@/helpers/utils";
import { useToast } from "@/hooks/use-toast";
import { useExecuteTransferRequest } from "@/hooks/useExecuteTransfer";
import { TransferRequestResponse } from "@/types/transferType";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useState } from "react";

export const TransferTableItem = ({
  transferItem,
}: {
  transferItem: TransferRequestResponse;
}) => {
  const { mutate: executeTransferRequest } = useExecuteTransferRequest();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const onExecuteTransfer = (transferId: string) => {
    setLoading(true);
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
        queryClient.invalidateQueries({
          queryKey: ["customer"],
        });
        setLoading(false);
      },
      onError(error) {
        toast({
          duration: 2000,
          variant: "error",
          title: "Sadly, something went wrong!",
          description: error.message,
        });
        setLoading(false);
      },
    });
  };

  return (
    <TableRow key={transferItem.id}>
      <TableCell className="font-medium">
        {tranformDate(transferItem.createdAt)}
      </TableCell>
      <TableCell>
        {truncateWallet(
          transferItem.recipientsInfo?.[0].blockchainDetails?.walletAddress
        )}
      </TableCell>
      <TableCell>
        {transferItem.recipientsInfo?.[0].blockchainDetails?.blockchain}
      </TableCell>
      <TableCell>
        {transferItem.recipientsInfo?.[0]?.recipientTransferType}
      </TableCell>
      <TableCell>{transferItem.status}</TableCell>
      <TableCell>
        {tranformCurrency(transferItem.recipientsInfo?.[0]?.tokenAmount)}
      </TableCell>
      <TableCell className="text-right">
        {transferItem.status === "IN_REVIEW" ? (
          <Button
            disabled={loading}
            onClick={() => onExecuteTransfer(transferItem.id)}
          >
            {loading ? "Loading..." : "Execute"}
          </Button>
        ) : null}
      </TableCell>
    </TableRow>
  );
};
