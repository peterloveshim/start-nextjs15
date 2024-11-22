"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/use-auth-context";
import { SplashScreen } from "@/components/splash-screen/index";

type Props = {
  children: React.ReactNode;
};

/* 
  레이아웃 등에 사용자 이름이나 이메일 정보 출력시 아래 가드로 반드시 값이 있음을 보장한다.
  이 과정에서 pending 하는 동안은 SplashScreen 처리
*/
export function AuthGuard({ children }: Props) {
  const { user, authenticated, loading, checkUserSession } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async () => {
    if (user) {
      setIsChecking(false);
    } else {
      await checkUserSession?.();
    }

    if (!loading && authenticated) {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
