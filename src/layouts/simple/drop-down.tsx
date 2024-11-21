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
import { User } from "lucide-react";
import { paths } from "@/static";
import { removeAllSessions } from "@/actions/auth";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";

export function SimpleDropdownMenu({ isLogin }: { isLogin: boolean }) {
  const router = useRouter();

  const pathname = usePathname();

  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await removeAllSessions();

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User />
          {auth?.user?.email && (
            <>
              <Separator />
              <span>{auth.user.email}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {isLogin ? "My Account" : "Guest"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isLogin && (
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

        {isLogin ? (
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
}
