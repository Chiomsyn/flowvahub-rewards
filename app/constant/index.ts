import { Shield, Zap, Users } from "lucide-react";

export const features = [
  {
    icon: Zap,
    title: "Instant Rewards",
    description:
      "No waiting periods. Claim rewards instantly with your points.",
    benefits: [
      "Instant redemption processing",
      "No hidden fees",
      "Digital delivery within minutes",
    ],
  },
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "Your data and transactions are always protected.",
    benefits: [
      "Bank-level security",
      "Real-time transaction tracking",
      "No personal data selling",
    ],
  },
  {
    icon: Users,
    title: "Community Powered",
    description: "Join a growing community of engaged users.",
    benefits: [
      "Exclusive community rewards",
      "Referral bonus program",
      "Member-only events",
    ],
  },
];

export const rewards = [
  {
    title: "$50 Amazon Gift Card",
    description: "Redeemable anywhere on Amazon",
    points: "5,000",
    category: "Gift Cards",
    redeemed: "142",
    stock: 24,
  },
  {
    title: "Premium Subscription",
    description: "1 month of premium features",
    points: "2,500",
    category: "Subscriptions",
    redeemed: "89",
    stock: 156,
  },
  {
    title: "Wireless Earbuds",
    description: "Latest noise-cancelling technology",
    points: "15,000",
    category: "Electronics",
    redeemed: "32",
    stock: 8,
  },
  {
    title: "Coffee Voucher",
    description: "$10 Starbucks gift card",
    points: "1,000",
    category: "Food & Drink",
    redeemed: "214",
    stock: 128,
  },
];

export const stats = [
  {
    value: "10K+",
    label: "Active Users",
    description: "Growing community",
  },
  {
    value: "$50K+",
    label: "Rewards Redeemed",
    description: "Total value",
  },
  {
    value: "4.8/5",
    label: "User Rating",
    description: "Based on reviews",
  },
  {
    value: "99.9%",
    label: "Uptime",
    description: "Reliable service",
  },
];
