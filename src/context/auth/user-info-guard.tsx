"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/use-auth-context";
import { SplashScreen } from "@/components/splash-screen/index";

type Props = {
  children: React.ReactNode;
};

/* 사용자 정보 */
export function UserInfoGuard({ children }: Props) {
  const { authenticated, loading, checkUserSession } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async () => {
    checkUserSession?.();
    console.log("authenticated : ", authenticated);
    console.log("loading : ", loading);

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
