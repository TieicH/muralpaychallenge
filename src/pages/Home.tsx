import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signup } from "@/components/Signup";
import { Login } from "@/components/Login";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full border rounded-md p-4 border-red-200 w-full">
      <h1>Welcome to the most amazing bank platform you'll ever see</h1>
      <h2>Edison's Bank powered by Mural Pay</h2>
      {/* <ul>
        <li>
          <a href="/account">Account</a>
        </li>
        <li>
          <a href="/transfer">Transfer</a>
        </li>
        <li>
          <a href="/">Home</a>
        </li>
      </ul> */}

      <div className="">
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
