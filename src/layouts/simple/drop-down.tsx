"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserRound } from "lucide-react";
import { paths } from "@/static";
import { removeAllSessions } from "@/actions/auth";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/use-auth-context";
import { SessionPayload } from "@/types";
import { Separator } from "@/components/ui/separator";

export const SimpleDropdownMenu = ({
  userInfo,
}: {
  userInfo: SessionPayload | null;
}) => {
  const router = useRouter();

  const pathname = usePathname();

  const { checkUserSession } = useAuthContext();

  const handleLogout = async () => {
    await removeAllSessions();
    checkUserSession?.();

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <UserRound />
          {userInfo?.email && (
            <div className="flex items-center space-x-3">
              <Separator orientation="vertical" className="h-5" />
              <span className="font-normal">{userInfo.email}</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>
          {userInfo ? "My Account" : "Guest"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {userInfo && (
          <>
            <DropdownMenuGroup>
              <Link href={paths.dashboard}>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        <div className="flex flex-col md:hidden ">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Getting started</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Components</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
        </div>

        {userInfo ? (
          <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
        ) : (
          <Link href={paths.auth.signIn}>
            <DropdownMenuItem disabled={pathname === paths.auth.signIn}>
              Sign in
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
