import Image from "next/image";
import { Bell } from "lucide-react";
import StatCard from "./_components/stat-card";
import ToolCard from "./_components/tool-card";
import EmptyState from "./_components/empty-state";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-[#FAFDFD] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Good afternoon, <span className="text-primary-700">Chiomsyn</span>
        </h1>

        <button className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
            1
          </span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary-600 to-primary-800 text-white p-6 flex gap-6">
        <div className="w-56 border-8 border-primary-300 rounded-xl bg-white/20 flex items-center justify-center">
          <Image
            src="/banner.png"
            alt="Bravo app"
            width={2000}
            height={2000}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="">
          <h2 className="text-3xl font-bold mb-2">
            Big News: We’re Becoming Bravoo! 🎉
          </h2>
          <p className="text-sm text-white/90 leading-relaxed">
            Bravoo a platform designed to make learning fun, simple, and truly
            rewarding. With Bravoo, you’ll complete quick, engaging missions
            that help you build real digital skills while earning coins, prizes,
            gadgets, and more. Explore what’s coming on our brand-new website:
            www.joinbravoo.com You’ll get a sneak peek of the experience and
            learn how to join the growing Bravoo community. We officially launch
            on January 10, and we’re excited to have you on this journey with
            us.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Tools" value={1} />
        <StatCard title="My Tech Stack" value={0} />
        <StatCard title="Subscriptions" value={0} />
        <StatCard title="Rewards" value={5} />
      </div>

      {/* Top Picks */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Top Picks for You</h3>
          <button className="text-primary-600 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            "Reclaim",
            "Campaigner",
            "Keeper",
            "Clickup",
            "Brevo",
            "Fiverr",
          ].map((tool) => (
            <ToolCard key={tool} name={tool} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      <EmptyState />
    </div>
  );
}
