"use client";

import {
  Calendar,
  Home,
  AppWindow,
  User,
  LogOut,
  House,
  Building,
  ChevronRight,
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

// Menu items.
const menu1 = [
  {
    title: "대시보드",
    url: "/dashboard",
    icon: AppWindow,
  },
  {
    title: "방 관리",
    url: "#",
    icon: House,
  },
  {
    title: "사이트관리",
    url: "#",
    icon: Building,
  },
  {
    title: "계약관리",
    icon: Calendar,
    items: [
      {
        title: "리스트",
        url: "#",
      },
      {
        title: "캘린더",
        url: "#",
      },
    ],
  },
];

const menu2 = [
  {
    title: "Account",
    url: paths.account,
    icon: User,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

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
                      <SidebarMenuButton asChild>
                        <CollapsibleTrigger className="uppercase text-sidebar-foreground/100">
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
                                className="rounded-none border-s-2 border-gray-200"
                              >
                                <div className="p-[6px]">
                                  <span>{subMenu.title}</span>
                                </div>
                              </a>
                            </SidebarMenuButton>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
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

        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
