import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Account, AccountModel, accountSchema } from "@/types/account";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { createAccountAction } from "../actions/create-account";
import { updateAccountAction } from "../actions/update-account";
import { SucessToastMessage } from "@/components/sucess-toast-message";

type AccountFormProps = {
  closeDialog?: () => void;
  defaultValues?: AccountModel;
};

export function AccountForm({ closeDialog, defaultValues }: AccountFormProps) {
  const formType = defaultValues === undefined ? "create" : "update";

  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AccountModel>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      currentBalance: defaultValues?.currentBalance ?? 0,
    },
  });

  const onCancel = () => {
    if (closeDialog) closeDialog();
  };

  const onSubmit = async (values: Account) => {
    startTransition(async () => {
      if (formType === "create") {
        const response = await createAccountAction(values);
        if (response.sucess) {
          toast({
            description: <SucessToastMessage message={response.sucess} />,
            className: "bg-secondary opacity-90",
            duration: 2000,
          });

          router.push(`/accounts/${response.accountId}`);
          if (closeDialog) closeDialog();
        }
      }

      if (formType === "update") {
        const accountId = defaultValues?.id ?? undefined;
        if (!accountId) return;

        const response = await updateAccountAction(accountId, values);
        if (response.sucess) {
          toast({
            description: <SucessToastMessage message={response.sucess} />,
            className: "bg-secondary opacity-90",
            duration: 2000,
          });
          if (closeDialog) closeDialog();
        }
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-sm md:text-lg">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Name of your new account (required)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentBalance"
              render={({ field }) => (
                <FormItem className="text-sm md:text-lg">
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Your current balance on this account (required)
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-end gap-x-2 text-right">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {formType === "create" ? "Create" : "Update"} account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
