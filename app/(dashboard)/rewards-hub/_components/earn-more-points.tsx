import { Card } from "@/app/components/ui/card";
import { Star, Share2 } from "lucide-react";

interface EarnMorePointsProps {
  sharing: boolean;
  onShareStack: () => void;
}

export default function EarnMorePoints({
  sharing,
  onShareStack,
}: EarnMorePointsProps) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4">Earn More Points</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex gap-3">
            <Star className="h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium">Refer and win 10,000 points!</p>
              <p className="text-sm text-gray-500 mt-1">
                Invite 3 friends and earn a chance to be one of 5 winners.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Share2 className="h-5 w-5 text-primary-600" />
              <div>
                <p className="font-medium">Share Your Stack</p>
                <p className="text-sm text-gray-500">Earn +25 pts</p>
              </div>
            </div>
            <button
              onClick={onShareStack}
              disabled={sharing}
              className="rounded-full bg-primary-100 text-primary-600 px-4 py-2 text-sm hover:bg-primary-200 disabled:opacity-50"
            >
              {sharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
