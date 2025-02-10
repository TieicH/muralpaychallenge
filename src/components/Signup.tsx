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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCustomer } from "@/hooks/useCreateCustomer";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export const Signup = () => {
  const { mutate: createCustomer } = useCreateCustomer();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      type: "INDIVIDUAL",
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    createCustomer(values, {
      onSuccess(data) {
        const { id } = data;
        toast({
          duration: 3000,
          variant: "success",
          title: "Account Created!",
          description: "You will be recieving an email to verify your account",
        });
        navigate(`/account/${id}`);
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
    <Card className="p-4 w-[300px] md:w-[400px]">
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account type" />
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

          <Button type="submit">Create Account</Button>
        </form>
      </Form>
    </Card>
  );
};
