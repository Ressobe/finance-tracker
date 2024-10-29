import { AccountModel } from "@/types/account";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type Set<T> = (fn: (state: T) => Partial<T>) => void;

type StateAccountsStore = {
  accounts: AccountModel[];
};

type ActionsAccountsStore = {
  setAccounts: (newAccounts: AccountModel[]) => void;
};

type AccountsStore = StateAccountsStore & ActionsAccountsStore;

const initialSate: StateAccountsStore = {
  accounts: [],
};

export const accountsStore = (set: Set<AccountsStore>): AccountsStore => ({
  ...initialSate,

  setAccounts: (newAccounts: AccountModel[]) => {
    set(() => ({
      accounts: [...newAccounts],
    }));
  },
});

export const useAccountsStore = create(
  persist(devtools(accountsStore), {
    name: "accounts",
    storage: createJSONStorage(() => sessionStorage),
  }),
);
