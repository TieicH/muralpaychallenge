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
import { Button } from "./ui/button";
import { Account } from "@/types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountType,
  SignupFormValues,
  signUpSchema,
} from "../helpers/signUpSchema";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCustomer } from "@/hooks/useCreateCustomer";
import { useBankStore } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router";
import {
  bankAccountType,
  blockchainType,
  RecipientInfoSchema,
  recipientTransferType,
  TransferRequestFormValues,
} from "@/helpers/transferRequestSchema";
import { useCreateTransferRequest } from "@/hooks/useCreateTransferRequest";
import { useQueryClient } from "@tanstack/react-query";

export const TransferForm = ({ accountId }: { accountId: string }) => {
  const { mutate: createTransferRequest } = useCreateTransferRequest();
  const queryClient = useQueryClient();

  const form = useForm<TransferRequestFormValues>({
    resolver: zodResolver(RecipientInfoSchema),
    shouldUnregister: true,
    defaultValues: {
      recipientType: "INDIVIDUAL",
      recipientTransferType: "BLOCKCHAIN",
    },
  });

  const recipientValue = form.getValues("recipientType");
  const recipientTransferTypeValue = form.getValues("recipientTransferType");

  const onSubmit = (values: TransferRequestFormValues) => {
    const newValues = { ...values };
    if (values.recipientTransferType === "FIAT") {
      if (newValues?.bankDetails) {
        newValues.bankDetails.currencyCode = "USD";
      }
    }
    createTransferRequest(
      {
        accountId,
        transferRequest: { recipientsInfo: [newValues] },
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: ["allTransfers"],
          });
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Transfer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transfer</DialogTitle>
          <DialogDescription>
            Make a transfer from your account to another account or wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[500px] overflow-y-auto">
          <Card className="p-4 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokenAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Amount" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the recipient account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accountType.map((type) => {
                            return (
                              <SelectItem value={type} key={type}>
                                {type}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {recipientValue === "INDIVIDUAL" && (
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of birth</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Date of birth"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="recipientTransferType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transfer Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Transfer type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {recipientTransferType.map((type) => {
                            return (
                              <SelectItem value={type} key={type}>
                                {type}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {recipientTransferTypeValue === "FIAT" ? (
                  <>
                    <h4>Bank Details</h4>
                    <FormField
                      control={form.control}
                      name="bankDetails.bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Bank Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.bankAccountOwnerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Account Owner Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Bank Account Owner Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.accountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Account Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Bank Account Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bankAccountType.map((type) => {
                                return (
                                  <SelectItem value={type} key={type}>
                                    {type}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.bankAccountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Account Number</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Bank Account Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.bankRoutingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Routing Number</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Routing Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <h5>Physical Address</h5>
                    <FormField
                      control={form.control}
                      name="bankDetails.physicalAddress.address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.physicalAddress.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Country"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.physicalAddress.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.physicalAddress.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bankDetails.physicalAddress.zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip code</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Zip code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <>
                    <h4>Wallet Details</h4>
                    <FormField
                      control={form.control}
                      name="walletDetails.walletAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wallet</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Wallet"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="walletDetails.blockchain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blockchain</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Blockchain" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {blockchainType.map((type) => {
                                return (
                                  <SelectItem value={type} key={type}>
                                    {type}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </form>
            </Form>
          </Card>
        </div>
        <DialogFooter>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Create Transfer Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
