"use client";

import { useAccountsStore } from "@/stores/use-accounts-store";
import { useCategoriesStore } from "@/stores/use-categories-store";
import { useCurrencyStore } from "@/stores/use-currency-store";
import { AccountModel } from "@/types/account";
import { Category } from "@/types/category";
import { useEffect } from "react";

type StoresProviderProps = {
  children: React.ReactNode;
  accounts: AccountModel[] | undefined;
  categories: Category[] | undefined;
  currency: string | undefined;
};

export function StoresProvider({
  children,
  accounts,
  categories,
  currency,
}: StoresProviderProps) {
  const setAccounts = useAccountsStore((state) => state.setAccounts);
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  useEffect(() => {
    setAccounts(accounts ?? []);
    setCategories(categories ?? []);
    setCurrency(currency ?? "PLN");
  });

  return <>{children}</>;
}
