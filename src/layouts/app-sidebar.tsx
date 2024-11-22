"use client";

import { usePathname } from "next/navigation";
import {
  Calendar,
  AppWindow,
  User,
  LogOut,
  House,
  Building,
  ChevronRight,
  Tally1,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { SidebarCustomHeader } from "./app-sidebar-header";

import { paths } from "@/static";

import "./style.css";

// Menu items.
const menu1 = [
  {
    title: "Dashboard",
    url: paths.dashboard,
    icon: AppWindow,
  },
  {
    title: "Room",
    url: paths.room.root,
    icon: House,
  },
  {
    title: "Site",
    url: paths.site.root,
    icon: Building,
  },
  {
    title: "Contract",
    url: paths.contract.root,
    icon: Calendar,
    items: [
      {
        title: "List",
        url: paths.contract.list,
        icon: Tally1,
      },
      {
        title: "Calendar",
        url: paths.contract.calendar,
        icon: Tally1,
      },
    ],
  },
];

const menu2 = [
  /*
  {
    title: "Account",
    url: paths.account,
    icon: User,
  },
  */
];

export function AppSidebar() {
  const { open } = useSidebar();

  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarCustomHeader />
      <SidebarContent className="z-30">
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Overview - Stay
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu1.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  {menu.items && open ? (
                    <Collapsible
                      key={"test"}
                      title={"test"}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuButton
                        asChild
                        className={
                          pathname.startsWith(menu.url)
                            ? "mb-1 nav-active"
                            : "mb-1"
                        }
                      >
                        <CollapsibleTrigger className="text-sidebar-foreground/100">
                          <menu.icon />
                          <span className="text-sm">{menu.title}</span>
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </CollapsibleTrigger>
                      </SidebarMenuButton>
                      <CollapsibleContent className="pl-4">
                        {menu.items.map((subMenu) => {
                          return (
                            <SidebarMenuButton key={subMenu.title} asChild>
                              <a
                                href={subMenu.url}
                                className={
                                  pathname === subMenu.url ? "nav-active" : ""
                                }
                              >
                                <div className="p-[6px] flex items-center w-full">
                                  <span>{subMenu.title}</span>
                                </div>
                              </a>
                            </SidebarMenuButton>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={pathname === menu.url ? "nav-active" : ""}
                    >
                      <a href={menu.url}>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
