"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { paths } from "@/static";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push(paths.contract.list);
  }, []);
  return null;
}
