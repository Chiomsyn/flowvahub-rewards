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
      <h2 className="text-lg font-semibold mb-4">Refer & Earn</h2>
      <div className="rounded-2xl bg-primary-50 p-6">
        <p className="font-medium mb-6">Share Your Link</p>

        <div className="mb-6 flex gap-2">
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

        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold text-primary-600">
              {pendingReferrals}
            </p>
            <p className="text-sm text-gray-500">Pending Referrals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">
              {(pendingReferrals * 50).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Potential Points</p>
          </div>
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
