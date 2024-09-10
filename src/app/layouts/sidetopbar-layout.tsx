"use client";

import { Sidebar } from "@components/sidebar";
import Topbar from "@components/topbar";
import Chatbot from '@components/chatbot';
import { useState } from "react";

export default function SideTopBarLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onCollapseChange={handleCollapse} />
      <div className={`flex-1 bg-white p-8 ${isCollapsed ? 'ml-20' : 'sidebar:ml-64 ml-20'} border-gray-200 shadow-md rounded-lg duration-300 ease-in-out`}>
        <Topbar />
        {children}
      </div>
      <Chatbot />
    </div>
  );
}
