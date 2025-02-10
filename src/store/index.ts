import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BankState {
  usersTable: {
    [key: string]: string;
  };
  currentUser: string;
  addUser: (newUser: { [key: string]: string }) => void;
  setCurrentUser: (userId: string) => void;
}

export const useBankStore = create<BankState>()(
  devtools(
    persist(
      (set) => ({
        usersTable: {},
        currentUser: "",
        addUser: (newUser) =>
          set((state) => {
            const id = Object.values(newUser)[0];
            return {
              usersTable: { ...state.usersTable, ...newUser },
              currentUser: id,
            };
          }),
        setCurrentUser: (userId) => set({ currentUser: userId }),
      }),
      { name: "bank-state" }
    )
  )
);

// export const useUserStore = create<UserState>()(
//   devtools(
//     persist(
//       (set) => ({
//         userID: "",
//         accountID: "",
//         updateUser: (userID, accountID) => set({ userID, accountID }),
//       }),
//       { name: "user-store" }
//     )
//   )
// );
