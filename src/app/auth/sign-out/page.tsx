"use client";

import { useContext, useEffect } from "react";

import { AuthContext } from "@/context/auth/auth-context";
import { removeAllSessions } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { paths } from "@/static";

export default function Page() {
  const router = useRouter();

  const logout = async () => {
    await removeAllSessions();

    router.push(paths.home);
  };

  useEffect(() => {
    logout();
  }, []);

  return null;
}
