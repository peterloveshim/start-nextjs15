"use client";

import { useContext, useEffect, useState } from "react";

import { CustomMenuBar } from "@/components/ui/custom-menu-bar";

import { DrawerContent } from "@/components/app-drawer";
import { useSidebar } from "@/components/ui/sidebar";
import { AuthContext } from "@/context/auth/auth-context";
import { useAuthContext } from "@/hooks/use-auth-context";

export const RightMenu = () => {
  const { isMobile } = useSidebar();

  //return isMobile ? <DrawerContent /> : <CustomMenuBar />;
  return isMobile ? <DrawerContent /> : <DrawerContent />;
};
