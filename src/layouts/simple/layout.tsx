import { cookies } from "next/headers";

import { Toaster } from "@/components/ui/sonner";

import { USER_INFO } from "@/static";

import { Footer } from "./footer";
import { TopMenu } from "./top-menu";
import { SessionPayload } from "@/types";
import { decrypt } from "@/lib/session";

type Props = {
  children: React.ReactNode;
};

export async function SimpleLayout({ children }: Props) {
  const cookieStore = await cookies();
  const userInfo: SessionPayload | null = await decrypt(
    cookieStore.get(USER_INFO)?.value
  );

  return (
    <>
      <div className="grid grid-rows-[50px_1fr] items-center justify-items-center min-h-screen gap-4 font-[family-name:var(--font-geist-sans)]">
        <div className="row-start-1 flex items-center justify-between w-full px-3 max-w-[1400px]">
          <TopMenu userInfo={userInfo} />
        </div>
        <main className="flex flex-col gap-8 md:row-start-2 justify-center items-center w-full h-full">
          {children}
        </main>
      </div>
      <Footer />
      <Toaster />
    </>
  );
}
