import { Routes, Route } from "react-router";
import { Account } from "./pages/Account";
import { Transfer } from "./pages/Transfer";
import { Home } from "./pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account/:customerId" element={<Account />} />
      <Route path="/transfer/:accountId" element={<Transfer />} />
    </Routes>
  );
};
