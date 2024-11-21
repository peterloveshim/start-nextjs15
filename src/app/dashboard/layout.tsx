import { UserInfoGuard } from "@/context/auth/user-info-guard";
import { MainLayout } from "@/layouts/main";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <UserInfoGuard>
      <MainLayout>{children}</MainLayout>
    </UserInfoGuard>
  );
}
