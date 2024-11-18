import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Sheet } from "@/components/ui/sheet";
import { RightMenu } from "./right-menu";
import { TopMenu } from "./top-menu";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <Sheet>
        <div className="flex flex-col min-h-screen w-full">
          <TopMenu />
          <main className="flex-1 bg-blue-50">{children}</main>
        </div>
      </Sheet>
    </SidebarProvider>
  );
}
