import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useBankStore } from "@/store";
import { LoginFormValues } from "@/helpers/loginSchema";

export const Login = () => {
  const setCurrentUser = useBankStore((state) => state.setCurrentUser);
  const usersTable = useBankStore((state) => state.usersTable);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    let userId = "";
    const UUID_REGEX =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!UUID_REGEX.test(values.login)) {
      const currentUSer = usersTable[values.login];
      userId = currentUSer;
      setCurrentUser(currentUSer);
      navigate(`/account/${userId}`);
    } else {
      userId = values.login;
      setCurrentUser(values.login);
      navigate(`/account/${userId}`);
    }
  };

  return (
    <Card className="p-4 w-[400px]">
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
                <FormLabel>User ID / Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="User ID / Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
        </form>
      </Form>
    </Card>
  );
};
