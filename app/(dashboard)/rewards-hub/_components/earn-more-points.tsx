import { Card, CardHeader } from "@/app/components/ui/card";
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
      <h2 className="text-xl pl-2 border-l-3 border-primary-600 font-semibold mb-4">
        Earn More Points
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            className="bg-white"
            icon={<Star className="h-5 w-5 text-primary-600" />}
            title="Refer and win 10,000 points!"
          />
          <div className="flex gap-3 bg-gray-50 p-6">
            <div>
              <p className="text-sm text-gray-500 mt-1">
                Invite 3 friends and earn a chance to be one of 5 winners.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            className="bg-white"
            icon={<Share2 className="h-5 w-5 text-primary-600" />}
            title="Share Your Stack"
          />
          <div className="flex items-center bg-gray-50 p-6 justify-between">
            <div>
              <p className="font-medium">Share Your Stack</p>
              <p className="text-sm text-gray-500">Earn +25 pts</p>
            </div>
            <button
              onClick={onShareStack}
              disabled={sharing}
              className="rounded-full bg-primary-100 cursor-pointer text-primary-600 px-4 py-2 text-sm hover:bg-primary-200 disabled:opacity-50"
            >
              {sharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
