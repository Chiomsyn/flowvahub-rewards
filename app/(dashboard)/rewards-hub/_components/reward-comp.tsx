"use client";

import { useAuth } from "@/app/provider/auth-provider";
import { useRewards } from "@/lib/hooks/use-rewards";
import { useState, useEffect } from "react";
import LoadingState from "./loading-state";
import RewardsHeader from "./rewards-header";
import ReferAndEarn from "./refer-and-earn";
import EarnMorePoints from "./earn-more-points";
import RewardsJourney from "./rewards-journey";
import RewardsTabs from "./rewards-tab";
import RedeemRewardsContent from "./redeem-reward-content";

export default function RewardsHubPage() {
  const { profile } = useAuth();
  const { data, loading, claimDailyPoints, createReferral, shareStack } =
    useRewards();

  const [referralEmail, setReferralEmail] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"earn" | "redeem">("earn");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback to auth profile if rewards data is loading
  const userPoints = data?.points ?? profile?.points ?? 0;
  const currentStreak = data?.current_streak ?? 0;
  const lastCheckinDate = data?.last_checkin_date;
  const referralCode = data?.referral_code;
  const pendingReferrals = data?.pending_referrals ?? 0;
  const nextReward = data?.next_reward;

  if (!mounted || loading) {
    return <LoadingState />;
  }

  const handleClaimDaily = async () => {
    setClaiming(true);
    const result = await claimDailyPoints();
    setClaiming(false);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleShareStack = async () => {
    setSharing(true);
    const result = await shareStack();
    setSharing(false);

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleCreateReferral = async () => {
    if (!referralEmail.trim()) {
      alert("Please enter an email address");
      return;
    }

    const result = await createReferral(referralEmail);
    if (result.success) {
      alert("Referral link created! Share: " + result.referral_link);
      setReferralEmail("");
    } else {
      alert(result.message);
    }
  };

  const canClaimToday =
    lastCheckinDate !== new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#FAFDFD] py-8 px-4 lg:px-8">
      <RewardsHeader />
      <RewardsTabs onTabChange={setActiveTab} />

      {activeTab === "earn" ? (
        <>
          <RewardsJourney
            userPoints={userPoints}
            currentStreak={currentStreak}
            lastCheckinDate={lastCheckinDate}
            nextReward={nextReward}
            canClaimToday={canClaimToday}
            claiming={claiming}
            onClaimDaily={handleClaimDaily}
          />

          <EarnMorePoints sharing={sharing} onShareStack={handleShareStack} />

          <ReferAndEarn
            referralEmail={referralEmail}
            onReferralEmailChange={setReferralEmail}
            onCreateReferral={handleCreateReferral}
            referralCode={referralCode}
            pendingReferrals={pendingReferrals}
          />
        </>
      ) : (
        <RedeemRewardsContent userPoints={userPoints} />
      )}
    </div>
  );
}
