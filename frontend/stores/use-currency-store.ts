import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

type Set<T> = (fn: (state: T) => Partial<T>) => void;

type StateCurrencyStore = {
  currency: string;
};

type ActionsCurrencyStore = {
  setCurrency: (newCurrency: string) => void;
};

type CurrencyStore = StateCurrencyStore & ActionsCurrencyStore;

const initialSate: StateCurrencyStore = {
  currency: "PLN",
};

export const currencyStore = (set: Set<CurrencyStore>): CurrencyStore => ({
  ...initialSate,

  setCurrency: (newCurrency: string) => {
    set(() => ({
      currency: newCurrency,
    }));
  },
});

export const useCurrencyStore = create(
  persist(devtools(currencyStore), {
    name: "currency",
    storage: createJSONStorage(() => sessionStorage),
  }),
);
