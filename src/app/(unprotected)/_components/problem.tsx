import { APP_NAME } from "@/config";
import { Check, XIcon } from "lucide-react";

export function Problem() {
  const withoutApp = [
    "You won`t know your exact monthly, yearly, or daily expenses.",
    "It`s harder to manage and save money effectively.",
    "You might not realize where your money is going.",
    // "It`s difficult to avoid unnecessary expenses.",
    // "You won`t have a complete history of your spending.",
    // "It`s tough to analyze and improve your financial habits.",
    // "You can`t set or track savings goals.",
    "Predicting long-term savings is challenging.",
    "Creating budgets for different categories isn`t possible.",
  ];

  const withApp = [
    "You`ll have a clear view of your monthly, yearly, and daily expenses.",
    "Managing and saving money becomes easier.",
    "You`ll know exactly where your money goes.",
    "Avoiding unnecessary expenses is simple.",
    "You`ll have a complete history of all your expenses.",
    // "Analyzing and improving financial habits is straightforward.",
    // "You can set and track savings goals.",
    // "Predicting long-term savings is easy.",
    // "You can create budgets for different categories.",
    // "Controlling spending on specific items is simple.",
    // "You`ll have peace of mind knowing your finances are under control.",
  ];

  return (
    <section className="flex gap-x-10">
      <div className="border border-red-700 p-6 rounded-md bg-red-700/10">
        <h1 className="font-bold text-4xl pb-4">Without {APP_NAME}</h1>
        <ul className="space-y-6">
          {withoutApp.map((item, idx) => {
            return (
              <li key={idx} className="flex items-center gap-x-4">
                <XIcon className="w-5 h-5 text-red-500" /> {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border border-green-700 p-6 rounded-md bg-green-700/10">
        <h1 className="font-bold text-4xl pb-4">With {APP_NAME}</h1>
        <ul className="space-y-6">
          {withApp.map((item, idx) => {
            return (
              <li key={idx} className="flex items-center gap-x-4">
                <Check className="w-5 h-5 text-green-500" /> {item}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
