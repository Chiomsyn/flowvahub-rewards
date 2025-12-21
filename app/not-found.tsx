"use client";

import Link from "next/link";
import { Home, Search, RefreshCw, Award } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-gray-50 flex flex-col items-center justify-center px-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-success-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Code Display */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-gray-900 opacity-10 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                404
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium">
              <Award className="w-4 h-4" />
              <span>FlowvaHub Rewards</span>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          Looks like you've wandered off the rewards path. The page you're
          looking for might have been moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Back to Homepage
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
