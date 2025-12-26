"use client";

import { useState } from "react";

type TabType = "earn" | "redeem";

interface RewardsTabsProps {
  onTabChange?: (tab: TabType) => void;
}

export default function RewardsTabs({ onTabChange }: RewardsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("earn");

  const tabs = [
    { id: "earn" as TabType, label: "Earn Points" },
    { id: "redeem" as TabType, label: "Redeem Rewards" },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex gap-6 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`pb-2 transition-colors cursor-pointer ${
            activeTab === tab.id
              ? "text-primary-600 font-medium border-b-2 p-2 bg-primary-50 border-primary-600"
              : "text-gray-500 hover:bg-primary-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
