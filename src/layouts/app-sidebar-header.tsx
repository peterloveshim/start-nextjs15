"use client";

import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { ChevronDown } from "lucide-react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useBoolean } from "@/hooks/use-boolean";
import { LogoSquare } from "@/components/icon";

export const SidebarCustomHeader = () => {
  const { state, isMobile } = useSidebar();
  const dropdown = useBoolean(false);

  return (
    <SidebarHeader
      className={`z-40 h-12 ${
        state === "collapsed" || isMobile ? "hidden" : "flex"
      } `}
    >
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu onOpenChange={dropdown.onToggle}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="whitespace-nowrap">
                <LogoSquare />
                Select Workspace
                <ChevronDown
                  className={`ml-auto transition duration-150 ease-in-out ${
                    dropdown.value ? "rotate-180" : "rotate-0"
                  }`}
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width] flex flex-col gap-1 shadow-md bg-white p-1">
              <DropdownMenuItem className="p-1 pl-2 hover:bg-gray-100 rounded-md focus-visible:outline-none cursor-pointer">
                <span className="text-xs">Drop Down 1</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-1 pl-2 hover:bg-gray-100 rounded-md focus-visible:outline-none cursor-pointer">
                <span className="text-xs">Drop Down 2</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
