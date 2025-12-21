import { Dispatch, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Award, ChevronRight, LogOut, Menu, User, X } from "lucide-react";
import { dashboardLinks } from "@/app/constant";
import { useAuth } from "@/app/provider/auth-provider";
import toast from "react-hot-toast";

type Props = {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
};
const SideBar = ({ mobileSidebarOpen, setMobileSidebarOpen }: Props) => {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200"
      >
        {mobileSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:inset-auto lg:h-screen lg:sticky lg:top-0
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FlowvaHub</h1>
              <p className="text-xs text-primary-600 font-medium">
                Rewards Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {dashboardLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-linear-to-r from-primary-50 to-primary-100 text-primary-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                    ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{link.label}</p>
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-primary-500 shrink-0" />
                )}
              </Link>
            );
          })}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full p-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t mt-auto border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success-500 border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {profile?.full_name || "User"}
              </h3>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
