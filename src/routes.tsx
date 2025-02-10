import { Routes, Route } from "react-router";
import { Account } from "./pages/Account";
import { Home } from "./pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account/:customerId" element={<Account />} />
    </Routes>
  );
};
