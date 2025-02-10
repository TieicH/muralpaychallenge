import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signup } from "@/components/Signup";
import { Login } from "@/components/Login";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full rounded-md p-4 w-full mt-10">
      <h1 className="text-4xl font-bold">
        Welcome to the most amazing bank platform you'll ever see
      </h1>
      <h2 className="text-2xl font-bold">Edison's Bank powered by Mural Pay</h2>

      <div className="mt-10">
        <Tabs defaultValue="signup" className="w-[500px]">
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
