import { Toaster } from "@/components/ui/sonner";

import { Footer } from "./footer";
import { TopMenu } from "./top-menu";

type Props = {
  children: React.ReactNode;
};

export function SimpleLayout({ children }: Props) {
  return (
    <>
      <div className="grid grid-rows-[40px_1fr] items-center justify-items-center min-h-screen gap-4 font-[family-name:var(--font-geist-sans)]">
        <div className="row-start-1 flex items-center justify-between w-full px-3 max-w-[1400px]">
          <TopMenu />
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
