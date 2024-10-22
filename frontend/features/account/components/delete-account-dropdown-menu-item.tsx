import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AccountModel } from "@/types/account";
import { DeleteAccountAlertDialog } from "./delete-account-alert-dialog";

type DeleteAccountDropdownMenuItemProps = {
  account: AccountModel;
  closeDropdownMenu: () => void;
};

export function DeleteAccountDropdownMenuItem({
  account,
  closeDropdownMenu,
}: DeleteAccountDropdownMenuItemProps) {
  return (
    <DropdownMenuItem
      onClick={closeDropdownMenu}
      onSelect={(e) => e.stopPropagation()}
    >
      <DeleteAccountAlertDialog account={account}>
        <span>Delete Account</span>
      </DeleteAccountAlertDialog>
    </DropdownMenuItem>
  );
}
