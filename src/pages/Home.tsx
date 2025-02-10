import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signup } from "@/components/Signup";
import { Login } from "@/components/Login";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full rounded-md p-4 w-full mt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Welcome to the most amazing bank platform you'll ever see
      </h1>
      <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-center">
        Edison's Bank powered by Mural Pay
      </h2>

      <div className="mt-10">
        <Tabs defaultValue="signup" className="w-full md:w-[500px]">
          <TabsList>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
            <TabsTrigger value="login">Log in</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
          <TabsContent value="login">
            <Login />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
