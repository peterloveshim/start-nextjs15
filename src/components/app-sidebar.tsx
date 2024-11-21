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
import { useEffect } from "react";
import { removeAllSessions } from "@/actions/auth";
import { useAuthContext } from "@/hooks/use-auth-context";

// Menu items.
const menu1 = [
  {
    title: "대시보드",
    url: paths.dashboard,
    icon: AppWindow,
  },
  {
    title: "방 관리",
    url: paths.room.root,
    icon: House,
  },
  {
    title: "사이트관리",
    url: paths.site.root,
    icon: Building,
  },
  {
    title: "계약관리",
    url: paths.contract.root,
    icon: Calendar,
    items: [
      {
        title: "리스트",
        url: paths.contract.list,
        icon: Tally1,
      },
      {
        title: "캘린더",
        url: paths.contract.calendar,
        icon: Tally1,
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
];

export function AppSidebar() {
  const { open, state, isMobile } = useSidebar();

  const { checkUserSession } = useAuthContext();

  const pathname = usePathname();

  const signOut = async () => {
    await removeAllSessions();
    checkUserSession?.();
    // 쿠키 데이터 삭제 => 미들웨어에서 리다이렉트 처리
  };

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
                            ? "mb-1 bg-blue-50"
                            : "mb-1"
                        }
                      >
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
                                className={
                                  pathname === subMenu.url ? "bg-blue-50" : ""
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
                      className={pathname === menu.url ? "bg-blue-50" : ""}
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

        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">user</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={pathname === item.url ? "bg-blue-50" : ""}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem key={"logout"}>
                <SidebarMenuButton asChild>
                  <div onClick={signOut}>
                    <LogOut />
                    <span>Sign out</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
