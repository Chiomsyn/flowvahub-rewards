export default function FeaturedTool() {
  return (
    <div className="rounded-2xl bg-linear-to-r from-primary-600 to-blue-500 text-white p-6 flex flex-col justify-between">
      <div>
        <span className="inline-block text-xs bg-white/20 px-3 py-1 rounded-full mb-3">
          Featured
        </span>
        <h3 className="text-xl font-semibold">Top Tool Spotlight</h3>
        <p className="mt-2 text-sm opacity-90">Reclaim</p>
      </div>

      <div className="mt-6 bg-white text-gray-900 rounded-xl p-4">
        <p className="text-sm font-medium mb-1">
          Automate and Optimize Your Schedule
        </p>
        <p className="text-xs text-gray-500 mb-4">
          Reclaim.ai is an AI-powered calendar assistant that automatically
          schedules your tasks, meetings, and breaks.
        </p>
        <div className="flex items-center justify-between">
          <button className="text-sm text-primary-600 font-medium">
            + Sign up
          </button>
          <button className="rounded-full bg-primary-600 text-white px-4 py-2 text-sm">
            Claim 50 pts
          </button>
        </div>
      </div>
    </div>
  );
}
