"use client";

import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  const title = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title == "" ? "Home" : title}</h1>
      <hr className="border-t-2 border-gray-200 mb-6" />
    </div>
  );
}
