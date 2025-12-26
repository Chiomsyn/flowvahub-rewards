import { Gift, UserPlus } from "lucide-react";

export default function FeaturedTool() {
  return (
    <div className="rounded-2xl text-white flex hover:scale-[103%] hover:shadow-md transition-all flex-col ">
      <div className=" bg-linear-to-r from-primary-600  p-6 rounded-t-2xl  to-blue-500">
        <span className="inline-block text-xs bg-white/20 px-3 py-1 rounded-full mb-3">
          Featured
        </span>
        <h3 className="text-xl font-bold">Top Tool Spotlight</h3>
        <p className="mt-2 text-sm font-bold opacity-90 ">Reclaim</p>
      </div>

      <div className=" bg-white p-6  text-gray-900 rounded-xl">
        <p className="text-xl font-medium mb-1">
          Automate and Optimize Your Schedule
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Reclaim.ai is an AI-powered calendar assistant that automatically
          schedules your tasks, meetings, and breaks.
        </p>
        <div className="flex items-center  p-6 justify-between">
          <button className="text-sm flex items-center gap-1 text-white cursor-pointer bg-primary-600 py-2 px-4 font-medium rounded-full">
            <UserPlus className="w-5 h-5" /> Sign up
          </button>
          <button className="rounded-full flex items-center gap-1 bg-linear-to-r cursor-pointer from-primary-600 via-rd-300 to-red-400 text-white px-4 py-2 text-sm">
            <Gift className="w-5 h-5" /> Claim 50 pts
          </button>
        </div>
      </div>
    </div>
  );
}
