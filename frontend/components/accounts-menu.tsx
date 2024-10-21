import { CirclePlus, MoreHorizontal, Wallet } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Account } from "@/types/account";
import { AccountDialog } from "@/features/account/components/create-account-dialog";
import { DeleteAccountAlertDialog } from "@/features/account/components/delete-account-alert-dialog";

// FIX: spacja zamyka dialog
export function AccountsMenu() {
  return (
    <SidebarMenu>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Wallet />
              <span>Accounts</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <CreateAccountMenuSubItem />
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>
                  Savings
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContentAccount
                      account={{ name: "Savings", currentBalance: 39933 }}
                    />
                  </DropdownMenu>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>
                  Checking
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContentAccount
                      account={{ name: "Checking", currentBalance: 69669 }}
                    />
                  </DropdownMenu>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>
                  Investments
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <EditAccountDropdownMenuItem
                        account={{ name: "Investments", currentBalance: 33321 }}
                      />
                      <DeleteAccountDropdownMenuItem
                        account={{ name: "Investments", currentBalance: 33321 }}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}

type DropdownMenuContentAccountProps = {
  account: Account;
};

function DropdownMenuContentAccount({
  account,
}: DropdownMenuContentAccountProps) {
  return (
    <DropdownMenuContent side="right" align="start">
      <EditAccountDropdownMenuItem account={account} />
      <DeleteAccountDropdownMenuItem account={account} />
    </DropdownMenuContent>
  );
}

function CreateAccountMenuSubItem() {
  return (
    <SidebarMenuSubItem className="w-full">
      <AccountDialog>
        <SidebarMenuSubButton className="flex justify-between">
          Create account <CirclePlus />
        </SidebarMenuSubButton>
      </AccountDialog>
    </SidebarMenuSubItem>
  );
}

type DeleteAccountDropdownMenuItemProps = {
  account: Account;
};

function DeleteAccountDropdownMenuItem({
  account,
}: DeleteAccountDropdownMenuItemProps) {
  return (
    <DropdownMenuItem onSelect={(e) => e.stopPropagation()}>
      <DeleteAccountAlertDialog account={account}>
        <span>Delete Account</span>
      </DeleteAccountAlertDialog>
    </DropdownMenuItem>
  );
}

type EditAccountDropdownMenuItemProps = {
  account: Account;
};

function EditAccountDropdownMenuItem({
  account,
}: EditAccountDropdownMenuItemProps) {
  return (
    <DropdownMenuItem
      className="text-left"
      onSelect={(e) => e.stopPropagation()}
    >
      <AccountDialog defaultValues={account}>
        <span>Edit Account</span>
      </AccountDialog>
    </DropdownMenuItem>
  );
}
