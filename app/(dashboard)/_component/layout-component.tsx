"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Award, Bell } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/app/provider/auth-provider";
import { dashboardLinks } from "@/app/constant";
import SideBar from "./side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <SideBar
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {dashboardLinks.find((link) => pathname === link.href)
                    ?.label || "Dashboard"}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></div>
                </button>

                {/* Points Display */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-primary-500 to-primary-600 text-white">
                  <Award className="w-4 h-4" />
                  <span className="font-bold">
                    {profile?.points?.toLocaleString() || "0"}
                  </span>
                  <span className="text-xs opacity-90">Points</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}
