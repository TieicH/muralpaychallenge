import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Signup } from "@/components/Signup";
import { Login } from "@/components/Login";
import { Book, Github, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <Tabs defaultValue="signup" className="w-full">
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

      <div className="m-8 flex justify-center gap-4">
        <Button variant="outline">
          <a
            className="flex items-center"
            target="_blank"
            href="https://github.com/TieicH/muralpaychallenge/blob/master/README.md"
          >
            <Book /> <span className="ml-2">Documentation</span>
          </a>
        </Button>
        <Button variant="outline">
          <a
            className="flex items-center"
            target="_blank"
            href="https://github.com/TieicH/muralpaychallenge"
          >
            <Github /> <span className="ml-2">Github</span>
          </a>
        </Button>
        <Button variant="outline">
          <a className="flex items-center" target="_blank" href="/admin">
            <ShieldCheck /> <span className="ml-2">Admin</span>
          </a>
        </Button>
      </div>
    </div>
  );
};
