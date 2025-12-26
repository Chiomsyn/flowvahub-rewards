import { Card, CardHeader } from "@/app/components/ui/card";
import { Calendar, Zap } from "lucide-react";
import StreakCalendar from "./streak-caledar";

interface DailyStreakProps {
  currentStreak: number;
  lastCheckinDate: string | null | undefined;
  canClaimToday: boolean;
  claiming: boolean;
  onClaimDaily: () => void;
}

export default function DailyStreak({
  currentStreak,
  lastCheckinDate,
  canClaimToday,
  claiming,
  onClaimDaily,
}: DailyStreakProps) {
  return (
    <Card>
      <CardHeader
        className="bg-blue-50"
        icon={<Calendar className="h-5 w-5 text-primary-600" />}
        title="Daily Streak"
      />
      <div className="mt-6 p-6">
        <p className="text-3xl font-bold text-primary-600">
          {currentStreak} day{currentStreak !== 1 ? "s" : ""}
        </p>

        <StreakCalendar lastCheckinDate={lastCheckinDate} />

        <p className="mt-3 text-xs text-gray-500">
          Check in daily to earn +5 points
        </p>

        <button
          onClick={onClaimDaily}
          disabled={!canClaimToday || claiming}
          className={`mt-5 w-full rounded-full text-white py-3 font-medium flex items-center justify-center gap-2 transition-all ${
            canClaimToday && !claiming
              ? "bg-primary-600 hover:bg-primary-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {claiming ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Claiming...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              {canClaimToday ? "Claim Today's Points" : "Already Claimed"}
            </>
          )}
        </button>
      </div>
    </Card>
  );
}
