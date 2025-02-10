import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../helpers/loginSchema";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { LoginFormValues } from "@/helpers/loginSchema";
import { useEffect, useState } from "react";
import { useGetCustomer } from "@/hooks/useGetCustomer";
import { AxiosError } from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState<string | undefined>(undefined);
  const {
    data: customer,
    error,
    isError,
    isLoading,
    refetch,
  } = useGetCustomer(customerId!);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
    },
  });

  useEffect(() => {
    if (customer?.id) {
      navigate(`/account/${customer.id}`);
    }
  }, [customer, navigate]);

  useEffect(() => {
    if (isError && error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        form.setError("login", {
          message: "Not user was found with this ID",
        });
        return;
      }
      form.setError("login", {
        message: "An error occurred while trying to login",
      });
    } else {
      form.clearErrors("login");
    }
  }, [isError, error, form.setError, form.clearErrors, form]);

  const onSubmit = (values: LoginFormValues) => {
    setCustomerId(values.login);
    if (values.login === customerId) {
      // just a retry if the use wants to try it
      refetch();
    }
  };

  return (
    <Card className="p-4 w-[300px] md:w-[400px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="User ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Log in"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
