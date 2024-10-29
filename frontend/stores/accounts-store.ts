import { create } from "zustand";
import { persist } from "zustand/middleware";

type Account = {
  name: string;
  id: number;
};

type AccountsStore = {
  count: number;
  inc: () => void;
};

export const useAccountsStore = create<AccountsStore>()(
  persist(
    (set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "accounts",
    },
  ),
);
