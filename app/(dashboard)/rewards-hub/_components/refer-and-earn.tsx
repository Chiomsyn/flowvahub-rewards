import { Users } from "lucide-react";

interface ReferAndEarnProps {
  referralEmail: string;
  onReferralEmailChange: (email: string) => void;
  onCreateReferral: () => void;
  referralCode: string | null | undefined;
  pendingReferrals: number;
}

export default function ReferAndEarn({
  referralEmail,
  onReferralEmailChange,
  onCreateReferral,
  referralCode,
  pendingReferrals,
}: ReferAndEarnProps) {
  const copyReferralLink = () => {
    if (referralCode) {
      navigator.clipboard.writeText(
        `${window.location.origin}/signup?ref=${referralCode}`
      );
      alert("Link copied to clipboard!");
    }
  };

  return (
    <section>
      <h2 className="text-xl pl-2 border-l-3 border-primary-600 font-semibold mb-4">
        Refer & Earn
      </h2>
      <div className="rounded-xl bg-blue-50 p-4">
        <div className="flex items-center gap-2">
          <Users className="text-primary-600" />
          <div>
            <p className="font-medium ">Share Your Link</p>
            <span className="text-gray-500 text-sm">
              Invite friends and earn 25 points when they join!
            </span>
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="flex justify-between max-w-[800px] mx-auto gap-10">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-primary-600">
              {pendingReferrals}
            </p>
            <p className="text-sm text-gray-500"> Referrals</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold text-primary-600">
              {(pendingReferrals * 50).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Points Earned</p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <input
            type="email"
            value={referralEmail}
            onChange={(e) => onReferralEmailChange(e.target.value)}
            placeholder="Enter friend's email"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={onCreateReferral}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Send Invite
          </button>
        </div>

        {referralCode && (
          <div className="mt-6 p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Your referral code:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm font-mono">
                {referralCode}
              </code>
              <button
                onClick={copyReferralLink}
                className="px-3 py-2 bg-primary-100 text-primary-600 rounded text-sm hover:bg-primary-200"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
