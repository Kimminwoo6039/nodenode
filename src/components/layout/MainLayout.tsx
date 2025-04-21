"use client";

import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-foreground flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 pl-80 flex flex-col h-full">
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
