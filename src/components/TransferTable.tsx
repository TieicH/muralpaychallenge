import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransferRequestResponse } from "@/types/transferType";
import { TransferTableItem } from "./TransferTableItem";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const TransferTable = ({
  transfers,
}: {
  transfers: TransferRequestResponse[];
}) => {
  const queryClient = useQueryClient();
  const [spin, setSpin] = useState(false);
  const { toast } = useToast();

  const onRefreshTransfers = () => {
    setSpin(true);
    queryClient.invalidateQueries({
      queryKey: ["allTransfers"],
    });
    queryClient.invalidateQueries({
      queryKey: ["customer"],
    });
    setTimeout(() => {
      setSpin(false);
      toast({
        duration: 1000,
        variant: "success",
        title: "Transfers History Updated!",
      });
    }, 1000);
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold mb-2">Transfer History</h3>
        <Button onClick={onRefreshTransfers} variant="outline" size="icon">
          <RotateCcw className={spin ? "spin" : ""} />
        </Button>
      </div>
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
                <TransferTableItem
                  transferItem={transferItem}
                ></TransferTableItem>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
