import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AccountModel } from "@/types/account";
import { AccountDialog } from "./account-dialog";

type EditAccountDropdownMenuItemProps = {
  account: AccountModel;
  closeDropdownMenu: () => void;
};

export function EditAccountDropdownMenuItem({
  account,
  closeDropdownMenu,
}: EditAccountDropdownMenuItemProps) {
  return (
    <DropdownMenuItem
      className="text-left"
      onSelect={closeDropdownMenu}
      // onSelect={(e) => e.stopPropagation()}
    >
      <AccountDialog defaultValues={account}>
        <span>Edit Account</span>
      </AccountDialog>
    </DropdownMenuItem>
  );
}
