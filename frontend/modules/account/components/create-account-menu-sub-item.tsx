import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { AccountDialog } from "./account-dialog";
import { CirclePlus } from "lucide-react";

export function CreateAccountMenuSubItem() {
  return (
    <SidebarMenuSubItem className="w-full">
      <AccountDialog>
        <SidebarMenuSubButton className="flex justify-between hover:cursor-pointer">
          Create account <CirclePlus />
        </SidebarMenuSubButton>
      </AccountDialog>
    </SidebarMenuSubItem>
  );
}
