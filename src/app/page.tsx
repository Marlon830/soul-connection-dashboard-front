"use client";

import { useCheckAuth } from "@utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const role = useCheckAuth();

  useEffect(() => {
    if (role === "") return;
    router.push("/home");
  }, [role]);
}
