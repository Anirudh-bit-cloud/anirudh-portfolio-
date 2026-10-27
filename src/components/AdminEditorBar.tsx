"use client";

import React from "react";
import Link from "next/link";
import { Settings, MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export const AdminEditorBar: React.FC = () => {
  const { messages, isAdmin } = usePortfolio();
  const unreadCount = messages.filter((m) => m.status === "new").length;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 print:hidden">
      <Link
        href="/admin"
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-bg-card/90 backdrop-blur-md hairline shadow-2xl hover:border-accent hover:shadow-accent/10 transition-all text-xs font-mono text-fg"
        title="Open Admin Dashboard & Portfolio CMS"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="font-semibold tracking-tight">Admin &amp; Editor</span>
        {unreadCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-accent text-accent-contrast text-[10px] font-bold">
            {unreadCount} {unreadCount === 1 ? "query" : "queries"}
          </span>
        )}
        <Settings className="w-3.5 h-3.5 text-fg-muted group-hover:rotate-90 transition-transform duration-300 ml-0.5" />
      </Link>
    </div>
  );
};
