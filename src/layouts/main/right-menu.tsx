"use client";

import { DrawerContent } from "@/layouts/app-drawer";
import { useSidebar } from "@/components/ui/sidebar";

export const RightMenu = () => {
  const { isMobile } = useSidebar();

  //return isMobile ? <DrawerContent /> : <CustomMenuBar />;
  return isMobile ? <DrawerContent /> : <DrawerContent />;
};
