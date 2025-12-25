import DailyStreak from "./daily-streak";
import FeaturedTool from "./featured-tool";
import PointsBalance from "./points-balance";

interface RewardsJourneyProps {
  userPoints: number;
  currentStreak: number;
  lastCheckinDate: string | null | undefined;
  nextReward?: any;
  canClaimToday: boolean;
  claiming: boolean;
  onClaimDaily: () => void;
}

export default function RewardsJourney({
  userPoints,
  currentStreak,
  lastCheckinDate,
  nextReward,
  canClaimToday,
  claiming,
  onClaimDaily,
}: RewardsJourneyProps) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4">Your Rewards Journey</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PointsBalance userPoints={userPoints} nextReward={nextReward} />

        <DailyStreak
          currentStreak={currentStreak}
          lastCheckinDate={lastCheckinDate}
          canClaimToday={canClaimToday}
          claiming={claiming}
          onClaimDaily={onClaimDaily}
        />

        <FeaturedTool />
      </div>
    </section>
  );
}
