"use client";

import { useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useSetState } from "@/hooks/use-set-state";

import { AuthContext } from "./auth-context";

import { AuthState } from "./types";
import { getSessionDatas, removeAllSessions } from "@/actions/auth";
import { isValidToken } from "@/lib/utils";
import { paths } from "@/static";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const router = useRouter();

  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const { accessToken, userInfo } = await getSessionDatas();

      if (accessToken && isValidToken(accessToken) && userInfo) {
        const user = {
          idx: userInfo.idx,
          name: userInfo.name,
          email: userInfo.email,
        };
        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
        await removeAllSessions();
      }
    } catch (error) {
      setState({ user: null, loading: false });
      router.push(paths.auth.signIn);
    }
  }, [router, setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? "admin",
          }
        : null,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [checkUserSession, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
