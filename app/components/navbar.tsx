"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Award } from "lucide-react";
import { useAuth } from "../provider/auth-provider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: "Rewards", href: "/rewards" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FlowvaHub</span>
              <span className="text-primary-600 font-semibold">Rewards</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  pathname === item.href ? "text-primary-600" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/rewards-hub"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  <Award className="w-4 h-4" />
                  My Rewards
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 font-medium hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-primary-500 to-primary-600 text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    pathname === item.href
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-100 space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/rewards"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-primary-500 to-primary-600 text-white font-semibold"
                    >
                      <Award className="w-4 h-4" />
                      My Rewards
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:border-gray-300"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:border-gray-300 text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg bg-linear-to-r from-primary-500 to-primary-600 text-white font-semibold text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
