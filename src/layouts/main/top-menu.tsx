import { SidebarTrigger } from "@/components/ui/sidebar";
import { RightMenu } from "./right-menu";

export const TopMenu = () => {
  return (
    <header className="flex items-center justify-between h-12 pl-2 pr-4 shadow-sm sticky w-full">
      <SidebarTrigger />
      <RightMenu />
    </header>
  );
};
