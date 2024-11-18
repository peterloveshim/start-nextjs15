"use client";

import { DrawerContent } from "@/components/app-drawer";
import { CustomMenuBar } from "@/components/ui/custom-menu-bar";
import { useSidebar } from "@/components/ui/sidebar";

export const RightMenu = () => {
  const { isMobile } = useSidebar();
  return isMobile ? <DrawerContent /> : <CustomMenuBar />;
};
