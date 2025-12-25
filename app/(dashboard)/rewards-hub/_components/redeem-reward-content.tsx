interface RedeemRewardsContentProps {
  userPoints: number;
}

export default function RedeemRewardsContent({
  userPoints,
}: RedeemRewardsContentProps) {
  const rewards = [
    {
      id: 1,
      name: "$5 Gift Card",
      points: 5000,
      description: "Amazon, Starbucks, or Uber",
    },
    {
      id: 2,
      name: "Premium Feature",
      points: 10000,
      description: "Unlock advanced analytics",
    },
    {
      id: 3,
      name: "Custom Theme",
      points: 2000,
      description: "Personalize your dashboard",
    },
    {
      id: 4,
      name: "Priority Support",
      points: 3000,
      description: "Get help faster",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Available Rewards</h2>
        <p className="text-sm text-gray-500 mb-6">
          You have{" "}
          <span className="font-semibold text-primary-600">
            {userPoints.toLocaleString()}
          </span>{" "}
          points available
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="border rounded-xl p-4 hover:border-primary-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{reward.name}</h3>
                <span className="text-primary-600 font-semibold">
                  {reward.points.toLocaleString()} pts
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{reward.description}</p>
              <button
                className={`w-full py-2 rounded-lg text-sm font-medium ${
                  userPoints >= reward.points
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                disabled={userPoints < reward.points}
              >
                {userPoints >= reward.points
                  ? "Redeem Now"
                  : "Not Enough Points"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Redeemed Rewards</h2>
        <p className="text-sm text-gray-500">
          No rewards redeemed yet. Start earning points!
        </p>
      </div>
    </div>
  );
}
