// hooks/useRewards.ts
import { useEffect, useState, useCallback } from "react";
import { Database } from "@/types/supabase";
import { useAuth } from "@/app/provider/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Reward = Database["public"]["Tables"]["rewards"]["Row"];
type PointsTransaction =
  Database["public"]["Tables"]["points_transactions"]["Row"];

// Define consistent return types
interface ReferralResult {
  success: boolean;
  message: string;
  referral_link?: string;
}

interface PointsResult {
  success: boolean;
  message: string;
  points_awarded?: number;
  current_streak?: number;
}

// Define the transaction type for recent transactions
type RecentTransaction = {
  description: string | null;
  points: number;
  type: Database["public"]["Enums"]["point_transaction_type"];
  created_at: string | null;
};

export interface UserRewardsData extends Profile {
  next_reward: {
    name: string;
    points_required: number;
    progress_percent: number;
  } | null;
  pending_referrals: number;
  recent_transactions: RecentTransaction[];
}

export function useRewards() {
  const { user, profile, refreshSession } = useAuth();
  const [data, setData] = useState<UserRewardsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = getSupabaseBrowserClient();

  const fetchRewardsData = useCallback(
    async (userId: string) => {
      console.log("fetchRewardsData called for user:", userId);
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching profile data...");
        const { data: extendedProfile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);
          throw profileError;
        }

        console.log("Profile data loaded:", extendedProfile);

        // Initialize base data
        const resultData: any = { ...extendedProfile };

        console.log("Fetching next reward...");
        try {
          const { data: rewardData, error: rewardError } = await supabase
            .from("rewards")
            .select("name, points_required")
            .gt("points_required", extendedProfile.points || 0)
            .eq("is_active", true)
            .order("points_required", { ascending: true })
            .limit(1)
            .maybeSingle();

          console.log("Next reward result:", { rewardData, rewardError });

          if (!rewardError && rewardData) {
            const progressPercent = extendedProfile.points
              ? Math.min(
                  Math.round(
                    (extendedProfile.points / rewardData.points_required) * 100
                  ),
                  100
                )
              : 0;

            resultData.next_reward = {
              ...rewardData,
              progress_percent: progressPercent,
            };
          } else {
            resultData.next_reward = null;
          }
        } catch (err) {
          console.log("Next reward error:", err);
          resultData.next_reward = null;
        }

        // Fetch pending referrals count
        let pendingReferrals = 0;
        try {
          const { count } = await supabase
            .from("referrals")
            .select("*", { count: "exact", head: true })
            .eq("referrer_id", userId)
            .eq("status", "pending");

          pendingReferrals = count || 0;
        } catch (err) {
          console.log("Referrals table doesn't exist yet");
        }

        // Fetch recent transactions with explicit type
        let recentTransactions: RecentTransaction[] = [];
        try {
          const { data: transactions } = await supabase
            .from("points_transactions")
            .select("description, points, type, created_at")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(5);

          if (transactions) {
            recentTransactions = transactions.map((tx) => ({
              description: tx.description,
              points: tx.points,
              type: tx.type,
              created_at: tx.created_at,
            }));
          }
        } catch (err) {
          console.log("Could not fetch transactions");
        }

        console.log("Fetching pending referrals...");
        try {
          const { count, error: countError } = await supabase
            .from("referrals")
            .select("*", { count: "exact", head: true })
            .eq("referrer_id", userId)
            .eq("status", "pending");

          console.log("Pending referrals result:", { count, countError });

          resultData.pending_referrals = count || 0;
        } catch (err) {
          console.log("Pending referrals error:", err);
          resultData.pending_referrals = 0;
        }

        console.log("Fetching recent transactions...");
        try {
          const { data: transactions, error: transactionsError } =
            await supabase
              .from("points_transactions")
              .select("description, points, type, created_at")
              .eq("user_id", userId)
              .order("created_at", { ascending: false })
              .limit(5);

          console.log("Recent transactions result", {
            transactions,
            transactionsError,
          });

          if (transactions) {
            resultData.recent_transactions = transactions.map((tx) => ({
              description: tx.description,
              points: tx.points,
              type: tx.type,
              created_at: tx.created_at,
            }));
          } else {
            resultData.recent_transactions = [];
          }
        } catch (err) {
          console.log("Recent transactions error:", err);
          resultData.recent_transactions = [];
        }

        console.log("All data collected:", resultData);
        setData(resultData);
      } catch (err) {
        console.error("Error fetching rewards data:", err);
        setError("Failed to fetch rewards data");
        if (profile) {
          console.log("Using fallback profile data");
          setData({
            ...profile,
            next_reward: null,
            pending_referrals: 0,
            recent_transactions: [],
          });
        }
      } finally {
        console.log("Loading set to false");
        setLoading(false);
      }
    },
    [profile, supabase]
  );

  useEffect(() => {
    if (user?.id) {
      fetchRewardsData(user.id);
    } else {
      setData(null);
      setLoading(false);
    }
  }, [user?.id, fetchRewardsData]);

  const claimDailyPoints = async (): Promise<PointsResult> => {
    if (!user) return { success: false, message: "Not authenticated" };

    try {
      const today = new Date().toISOString().split("T")[0];
      const tomorrow = new Date(new Date(today).getTime() + 86400000)
        .toISOString()
        .split("T")[0];

      // Check if already claimed today
      const { data: existingTransactions, error: existingError } =
        await supabase
          .from("points_transactions")
          .select("created_at")
          .eq("user_id", user.id)
          .eq("type", "daily_checkin")
          .gte("created_at", today)
          .lt("created_at", tomorrow);

      if (existingError) throw existingError;

      // Check if any transactions exist for today
      if (existingTransactions && existingTransactions.length > 0) {
        return { success: false, message: "Already claimed today's points" };
      }

      // Get current streak and points
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("current_streak, last_checkin_date, points")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError || !profileData) {
        return { success: false, message: "Profile not found" };
      }

      const pointsToAward = 5;
      let newStreak = 1;

      // Calculate streak
      if (profileData.last_checkin_date) {
        const lastDate = new Date(profileData.last_checkin_date);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          newStreak = (profileData.current_streak || 0) + 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      }

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          points: (profileData.points || 0) + pointsToAward,
          current_streak: newStreak,
          last_checkin_date: today,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Add transaction
      const { error: txError } = await supabase
        .from("points_transactions")
        .insert({
          user_id: user.id,
          points: pointsToAward,
          type: "daily_checkin",
          description: "Daily check-in",
          created_at: new Date().toISOString(),
        });

      if (txError) throw txError;

      // Refresh data
      await refreshSession();
      await fetchRewardsData(user.id);

      return {
        success: true,
        message: "Daily points claimed!",
        points_awarded: pointsToAward,
        current_streak: newStreak,
      };
    } catch (err: any) {
      console.error("Claim daily points error:", err);
      return {
        success: false,
        message: err.message || "Failed to claim points",
      };
    }
  };

  const createReferral = async (
    referredEmail: string
  ): Promise<ReferralResult> => {
    if (!user) return { success: false, message: "Not authenticated" };

    try {
      // Get referral code from profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("referral_code, id")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError || !profileData) {
        return { success: false, message: "Profile not found" };
      }

      // Generate or use existing referral code
      let referralCode = profileData.referral_code;
      if (!referralCode) {
        // Generate a simple referral code from user ID
        referralCode = `REF-${profileData.id.substring(0, 8).toUpperCase()}`;

        // Save it to profile
        await supabase
          .from("profiles")
          .update({ referral_code: referralCode })
          .eq("id", user.id);
      }

      // Try to create referral record if table exists
      try {
        // Check for existing referral
        const { data: existingReferral, error: existingError } = await supabase
          .from("referrals")
          .select("id")
          .eq("referrer_id", user.id)
          .eq("referred_email", referredEmail)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          throw existingError;
        }

        if (existingReferral) {
          return {
            success: false,
            message: "Already referred this email",
          };
        }

        // Create referral
        const { error: insertError } = await supabase.from("referrals").insert({
          referrer_id: user.id,
          referred_email: referredEmail,
          status: "pending",
          created_at: new Date().toISOString(),
        });

        if (insertError) throw insertError;
      } catch (err: any) {
        // If referrals table doesn't exist, just continue
        console.log("Referrals table doesn't exist, tracking locally only");
      }

      // Generate referral link
      const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

      // Refresh data to update referral count if table exists
      if (user.id) {
        await fetchRewardsData(user.id);
      }

      return {
        success: true,
        message: "Referral link created successfully",
        referral_link: referralLink,
      };
    } catch (err: any) {
      console.error("Create referral error:", err);
      return {
        success: false,
        message: err.message || "Failed to create referral",
      };
    }
  };

  const shareStack = async (): Promise<PointsResult> => {
    if (!user) return { success: false, message: "Not authenticated" };

    try {
      // Get current points
      const { data: currentProfile, error: currentError } = await supabase
        .from("profiles")
        .select("points")
        .eq("id", user.id)
        .maybeSingle();

      if (currentError || !currentProfile) {
        return { success: false, message: "Profile not found" };
      }

      // Update points
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          points: (currentProfile.points || 0) + 25,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Add points transaction
      const { error: txError } = await supabase
        .from("points_transactions")
        .insert({
          user_id: user.id,
          points: 25,
          type: "share_stack",
          description: "Shared your stack",
          created_at: new Date().toISOString(),
        });

      if (txError) throw txError;

      // Refresh data
      await refreshSession();
      await fetchRewardsData(user.id);

      return {
        success: true,
        message: "25 points awarded!",
        points_awarded: 25,
      };
    } catch (err: any) {
      console.error("Share stack error:", err);
      return {
        success: false,
        message: err.message || "Failed to award points",
      };
    }
  };

  return {
    data,
    loading,
    error,
    claimDailyPoints,
    createReferral,
    shareStack,
    refresh: () => user?.id && fetchRewardsData(user.id),
  };
}
