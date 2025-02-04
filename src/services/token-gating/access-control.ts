export interface AccessTier {
  name: string;
  requiredTokens: number;
  features: string[];
  maxAlerts: number;
  refreshRate: number; // in seconds
}

export const ACCESS_TIERS: AccessTier[] = [
  {
    name: "Basic",
    requiredTokens: 100,
    features: ["basic_alerts", "standard_charts"],
    maxAlerts: 5,
    refreshRate: 300, // 5 minutes
  },
  {
    name: "Premium",
    requiredTokens: 1000,
    features: ["instant_alerts", "advanced_analytics", "api_access"],
    maxAlerts: 50,
    refreshRate: 60, // 1 minute
  },
  {
    name: "Enterprise",
    requiredTokens: 10000,
    features: ["custom_analytics", "direct_api", "white_label"],
    maxAlerts: -1, // unlimited
    refreshRate: 10, // 10 seconds
  },
];
