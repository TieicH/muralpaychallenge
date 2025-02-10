import { Card } from "@/components/ui/card";
import { tranformCurrency } from "@/helpers/utils";
import { useGetAllCustomers } from "@/hooks/useGetAllCustomers";

export const Admin = () => {
  const { data: customers, isError, isLoading } = useGetAllCustomers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md p-4 w-full">
        <Card className="p-4 w-[80%]">
          <div>Loading...</div>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md p-4 w-full">
        <Card className="p-4 w-[80%]">
          <div>Something went wrong</div>
        </Card>
      </div>
    );
  }

  if (!customers) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md p-4 w-full">
        <Card className="p-4 w-[80%]">
          <div>Customer not found</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-md p-4 w-full">
      <Card className="p-4 w-[80%] flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Admin</h1>
        {customers.results.map((customer) => {
          return (
            <Card className="p-4" key={customer.id}>
              <p className="text-lg font-bold">
                Name: <span className="font-normal">{customer.name}</span>
              </p>
              <p className="text-lg font-bold">
                ID: <span className="font-normal">{customer.id}</span>
              </p>
              <p className="text-lg font-bold">
                Type:{" "}
                <span className="font-normal">{customer.customerType}</span>
              </p>
              <p className="text-lg font-bold">
                Status: <span className="font-normal">{customer.status}</span>
              </p>
              <p className="text-lg font-bold">
                Wallet:{" "}
                <span className="font-normal">
                  {customer?.account?.address}
                </span>
              </p>
              <p className="text-lg font-bold">
                Blockchain:{" "}
                <span className="font-normal">
                  {customer?.account?.blockchain}
                </span>
              </p>
              <p className="text-lg font-bold">
                Balance:{" "}
                <span className="font-normal">
                  {tranformCurrency(customer?.account?.balance?.balance)}
                </span>
              </p>
            </Card>
          );
        })}
      </Card>
    </div>
  );
};
