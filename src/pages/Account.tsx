import { Card } from "@/components/ui/card";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import { useParams } from "react-router";

export const Account = () => {
  const { customerId } = useParams();
  const { data: customer, isError } = useGetCustomer(customerId!);

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
        <div>
          <p>Name: {customer.name}</p>
        </div>
      </Card>
    </div>
  );
};
