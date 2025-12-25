import { Card, CardHeader } from "@/app/components/ui/card";
import { Star, Gift } from "lucide-react";

interface PointsBalanceProps {
  userPoints: number;
  nextReward?: any;
}

export default function PointsBalance({
  userPoints,
  nextReward,
}: PointsBalanceProps) {
  return (
    <Card>
      <CardHeader
        icon={<Star className="h-5 w-5 text-primary-600" />}
        title="Points Balance"
      />
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-primary-600">
            {userPoints.toLocaleString()}
          </span>
          <div className="h-10 w-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
            <Gift className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Progress to {nextReward?.name || "$5 Gift Card"}
        </p>
        <div className="mt-2">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-primary-600 transition-all duration-300"
              style={{
                width: `${
                  nextReward?.progress_percent || (userPoints > 0 ? 1 : 0)
                }%`,
              }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            {userPoints} / {nextReward?.points_required || 5000}
          </p>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          {userPoints < 100
            ? "🚀 Just getting started — keep earning points!"
            : userPoints < 1000
            ? "📈 Making progress — you're on your way!"
            : "🎉 Amazing progress — keep it up!"}
        </p>
      </div>
    </Card>
  );
}
