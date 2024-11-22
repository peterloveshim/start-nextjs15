"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/use-auth-context";
import { SplashScreen } from "@/components/splash-screen/index";

type Props = {
  children: React.ReactNode;
};

// 로그인 상태와 상관없이 user 정보 set
// user 정보 상태에 따라 UI 깜빡거림 방지
// 대신에 SplashScreen 처리
export function SessionStateGuard({ children }: Props) {
  const { loading, checkUserSession } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async () => {
    await checkUserSession?.();

    if (!loading) {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
