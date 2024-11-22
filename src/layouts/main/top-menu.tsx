import { SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

import { SimpleDropdownMenu } from "../simple/drop-down";
import { SessionPayload } from "@/types";

export const TopMenu = ({ userInfo }: { userInfo: SessionPayload | null }) => {
  return (
    <header className="flex items-center justify-between h-12 pl-2 pr-3 shadow-sm sticky w-full">
      <div className="flex items-center justify-start space-x-2 h-5">
        <SidebarTrigger />
        <Separator orientation="vertical" />
      </div>
      <SimpleDropdownMenu userInfo={userInfo} />
    </header>
  );
};
