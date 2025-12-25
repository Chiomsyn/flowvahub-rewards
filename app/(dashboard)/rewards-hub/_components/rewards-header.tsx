import { Bell } from "lucide-react";

export default function RewardsHeader() {
  return (
    <header className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Rewards Hub</h1>
        <p className="text-sm text-gray-500">
          Earn points, unlock rewards, and celebrate your progress!
        </p>
      </div>
      <button className="relative rounded-full bg-white p-2 shadow">
        <Bell className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
          3
        </span>
      </button>
    </header>
  );
}
