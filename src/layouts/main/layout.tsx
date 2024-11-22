import { cookies } from "next/headers";

import { AppSidebar } from "@/layouts/app-sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Sheet } from "@/components/ui/sheet";

import { TopMenu } from "./top-menu";
import { USER_INFO } from "@/static";
import { decrypt } from "@/lib/session";
import { SessionPayload } from "@/types";

export async function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const userInfo: SessionPayload | null = await decrypt(
    cookieStore.get(USER_INFO)?.value
  );

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <Sheet>
        <div className="flex flex-col min-h-screen w-full">
          <TopMenu userInfo={userInfo} />
          <main className="flex-1">{children}</main>
        </div>
      </Sheet>
    </SidebarProvider>
  );
}
