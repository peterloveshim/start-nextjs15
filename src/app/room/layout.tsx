import { MainLayout } from "@/layouts/main";
import { CONFIG } from "@/static";

export const metadata = { title: `Room | ${CONFIG.site.name}` };

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
