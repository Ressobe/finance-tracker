import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { AccountModel } from "@/types/account";
import { EditAccountDropdownMenuItem } from "./edit-account-dropdown-menu-item";
import { DeleteAccountDropdownMenuItem } from "./delete-account-dropdown-menu-item";

type DropdownMenuContentAccountProps = {
  account: AccountModel;
};

export function DropdownMenuContentAccount({
  account,
}: DropdownMenuContentAccountProps) {
  return (
    <DropdownMenuContent side="right" align="start">
      <EditAccountDropdownMenuItem account={account} />
      <DeleteAccountDropdownMenuItem account={account} />
    </DropdownMenuContent>
  );
}
