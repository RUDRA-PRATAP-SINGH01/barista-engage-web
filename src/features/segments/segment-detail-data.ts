export interface SegmentDNA {
  spend: number;
  frequency: number;
  recency: number;
  engagement: number;
  retention: number;
}

export interface SegmentTrendPoint {
  month: string;
  value: number;
}

export interface SegmentCampaignPerformance {
  campaignsSent: number;
  averageOpenRate: string;
  averageCtr: string;
  bestCampaign: string;
}

export interface SegmentMarketingIntel {
  bestChannel: string;
  preferredDrink: string;
  topCity: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  campaignsRun: number;
  averageSpend: string;
  recommendedAction: string;
  aiInsight: string;
  expectedImpactEngagement: string;
  expectedImpactRetention: string;
  actionTimeline: string;
  trend: SegmentTrendPoint[];
}

export interface SegmentDetailProfile {
  dna: SegmentDNA;
  rules: string[];
  marketing: SegmentMarketingIntel;
  campaignPerformance: SegmentCampaignPerformance;
}

export const segmentDetailProfiles: Record<string, SegmentDetailProfile> = {
  champion: {
    dna: { spend: 95, frequency: 92, recency: 96, engagement: 88, retention: 94 },
    rules: [
      "Spend > ₹5,000",
      "Orders > 15",
      "Last Visit < 30d",
      "Low Churn Risk",
    ],
    marketing: {
      bestChannel: "WhatsApp",
      preferredDrink: "Signature Latte",
      topCity: "Bangalore",
      riskLevel: "Low",
      campaignsRun: 8,
      averageSpend: "₹620",
      recommendedAction:
        "Reward loyalty and increase purchase frequency with exclusive early access.",
      aiInsight:
        "Champions open messages 32% more than average customers on WhatsApp.",
      expectedImpactEngagement: "+14% engagement",
      expectedImpactRetention: "+11% retention",
      actionTimeline: "Launch VIP early-access campaign within 5 days.",
      trend: [
        { month: "Jan", value: 88 },
        { month: "Feb", value: 90 },
        { month: "Mar", value: 91 },
        { month: "Apr", value: 93 },
        { month: "May", value: 94 },
        { month: "Jun", value: 95 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 8,
      averageOpenRate: "72.4%",
      averageCtr: "18.2%",
      bestCampaign: "Champion VIP Access",
    },
  },
  loyal: {
    dna: { spend: 72, frequency: 85, recency: 78, engagement: 74, retention: 82 },
    rules: [
      "RFM Segment = Loyal Customer",
      "Orders > 8 in last 90 days",
      "Lifetime Spend > ₹3,000",
      "Days Since Last Order < 45",
    ],
    marketing: {
      bestChannel: "WhatsApp",
      preferredDrink: "Cappuccino",
      topCity: "Mumbai",
      riskLevel: "Low",
      campaignsRun: 6,
      averageSpend: "₹480",
      recommendedAction:
        "Nurture with subscription-style perks and birthday rewards.",
      aiInsight:
        "Loyal customers respond best to weekday morning campaigns before 10 AM.",
      expectedImpactEngagement: "+12% engagement",
      expectedImpactRetention: "+10% retention",
      actionTimeline: "Launch loyalty milestone campaign within 7 days.",
      trend: [
        { month: "Jan", value: 74 },
        { month: "Feb", value: 76 },
        { month: "Mar", value: 78 },
        { month: "Apr", value: 79 },
        { month: "May", value: 81 },
        { month: "Jun", value: 82 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 6,
      averageOpenRate: "68.1%",
      averageCtr: "15.6%",
      bestCampaign: "Loyalty Birthday Perks",
    },
  },
  "big-spender": {
    dna: { spend: 91, frequency: 58, recency: 70, engagement: 62, retention: 68 },
    rules: [
      "RFM Segment = Big Spender",
      "Average Order Value > ₹650",
      "Lifetime Spend > ₹8,000",
      "Orders > 6 in last 180 days",
    ],
    marketing: {
      bestChannel: "Email",
      preferredDrink: "Premium Pour Over",
      topCity: "Delhi NCR",
      riskLevel: "Medium",
      campaignsRun: 4,
      averageSpend: "₹780",
      recommendedAction:
        "Upsell premium SKUs and limited-edition blends.",
      aiInsight:
        "Big spenders click 2.1× more on premium product stories than discount offers.",
      expectedImpactEngagement: "+16% engagement",
      expectedImpactRetention: "+7% retention",
      actionTimeline: "Launch premium SKU showcase via email within 4 days.",
      trend: [
        { month: "Jan", value: 64 },
        { month: "Feb", value: 65 },
        { month: "Mar", value: 66 },
        { month: "Apr", value: 67 },
        { month: "May", value: 68 },
        { month: "Jun", value: 69 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 4,
      averageOpenRate: "54.8%",
      averageCtr: "11.3%",
      bestCampaign: "Premium Pour Over Drop",
    },
  },
  "at-risk": {
    dna: { spend: 48, frequency: 38, recency: 28, engagement: 34, retention: 22 },
    rules: [
      "RFM Segment = At Risk",
      "Days Since Last Order 60–120",
      "Order Frequency declined > 30%",
      "Churn Risk = MEDIUM",
    ],
    marketing: {
      bestChannel: "WhatsApp",
      preferredDrink: "Iced Americano",
      topCity: "Pune",
      riskLevel: "High",
      campaignsRun: 5,
      averageSpend: "₹340",
      recommendedAction:
        "Trigger win-back journeys with personalised offers within 7 days.",
      aiInsight:
        "At-risk customers who receive WhatsApp nudges within 72 hours recover 18% faster.",
      expectedImpactEngagement: "+18% engagement",
      expectedImpactRetention: "+9% retention",
      actionTimeline: "Launch WhatsApp win-back campaign within 7 days.",
      trend: [
        { month: "Jan", value: 42 },
        { month: "Feb", value: 38 },
        { month: "Mar", value: 34 },
        { month: "Apr", value: 30 },
        { month: "May", value: 26 },
        { month: "Jun", value: 22 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 5,
      averageOpenRate: "61.2%",
      averageCtr: "9.8%",
      bestCampaign: "Win-back Iced Americano",
    },
  },
  lost: {
    dna: { spend: 35, frequency: 12, recency: 5, engagement: 18, retention: 8 },
    rules: [
      "Last Visit > 180d",
      "Churn Risk = HIGH",
      "No engagement 90d",
    ],
    marketing: {
      bestChannel: "SMS",
      preferredDrink: "Cold Brew",
      topCity: "Hyderabad",
      riskLevel: "Critical",
      campaignsRun: 3,
      averageSpend: "₹280",
      recommendedAction:
        "Run a high-incentive win-back campaign with a limited-time comeback offer.",
      aiInsight:
        "Lost customers re-engage 24% more when offers mention their last ordered drink.",
      expectedImpactEngagement: "+22% engagement",
      expectedImpactRetention: "+6% retention",
      actionTimeline: "Launch SMS comeback offer within 3 days.",
      trend: [
        { month: "Jan", value: 18 },
        { month: "Feb", value: 15 },
        { month: "Mar", value: 13 },
        { month: "Apr", value: 11 },
        { month: "May", value: 9 },
        { month: "Jun", value: 8 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 3,
      averageOpenRate: "48.6%",
      averageCtr: "7.4%",
      bestCampaign: "Comeback Cold Brew Offer",
    },
  },
  new: {
    dna: { spend: 42, frequency: 35, recency: 88, engagement: 56, retention: 48 },
    rules: [
      "RFM Segment = New Customer",
      "First Order within last 30 days",
      "Orders = 1–2",
      "Not yet assigned loyalty tier",
    ],
    marketing: {
      bestChannel: "WhatsApp",
      preferredDrink: "Classic Latte",
      topCity: "Bangalore",
      riskLevel: "Low",
      campaignsRun: 2,
      averageSpend: "₹320",
      recommendedAction:
        "Onboard with a second-purchase incentive within 14 days of signup.",
      aiInsight:
        "New customers who receive a welcome offer within 48 hours are 41% more likely to reorder.",
      expectedImpactEngagement: "+20% engagement",
      expectedImpactRetention: "+14% retention",
      actionTimeline: "Launch welcome offer sequence within 2 days.",
      trend: [
        { month: "Jan", value: 32 },
        { month: "Feb", value: 36 },
        { month: "Mar", value: 40 },
        { month: "Apr", value: 44 },
        { month: "May", value: 46 },
        { month: "Jun", value: 48 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 2,
      averageOpenRate: "76.3%",
      averageCtr: "21.1%",
      bestCampaign: "Welcome Classic Latte",
    },
  },
  promising: {
    dna: { spend: 55, frequency: 48, recency: 82, engagement: 60, retention: 58 },
    rules: [
      "RFM Segment = Promising",
      "Recent first or second purchase",
      "Spend trend increasing",
      "Days Since Last Order < 21",
    ],
    marketing: {
      bestChannel: "Email",
      preferredDrink: "Mocha",
      topCity: "Chennai",
      riskLevel: "Low",
      campaignsRun: 3,
      averageSpend: "₹390",
      recommendedAction:
        "Convert to loyal tier with frequency-based milestone rewards.",
      aiInsight:
        "Promising segments show highest email CTR on product education content.",
      expectedImpactEngagement: "+15% engagement",
      expectedImpactRetention: "+12% retention",
      actionTimeline: "Launch milestone rewards email within 6 days.",
      trend: [
        { month: "Jan", value: 48 },
        { month: "Feb", value: 50 },
        { month: "Mar", value: 52 },
        { month: "Apr", value: 54 },
        { month: "May", value: 56 },
        { month: "Jun", value: 58 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 3,
      averageOpenRate: "58.4%",
      averageCtr: "13.7%",
      bestCampaign: "Mocha Milestone Rewards",
    },
  },
  "need-attention": {
    dna: { spend: 44, frequency: 40, recency: 32, engagement: 36, retention: 30 },
    rules: [
      "RFM Segment = Need Attention",
      "Days Since Last Order 45–75",
      "Engagement score declining",
      "Churn Risk = MEDIUM",
    ],
    marketing: {
      bestChannel: "WhatsApp",
      preferredDrink: "Flat White",
      topCity: "Mumbai",
      riskLevel: "Medium",
      campaignsRun: 4,
      averageSpend: "₹360",
      recommendedAction:
        "Send personalised reminders tied to past order preferences.",
      aiInsight:
        "Need-attention customers respond well to store visit reminders on weekends.",
      expectedImpactEngagement: "+14% engagement",
      expectedImpactRetention: "+8% retention",
      actionTimeline: "Launch weekend visit reminder within 5 days.",
      trend: [
        { month: "Jan", value: 38 },
        { month: "Feb", value: 36 },
        { month: "Mar", value: 34 },
        { month: "Apr", value: 32 },
        { month: "May", value: 31 },
        { month: "Jun", value: 30 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 4,
      averageOpenRate: "59.7%",
      averageCtr: "10.2%",
      bestCampaign: "Weekend Flat White Reminder",
    },
  },
  "about-to-sleep": {
    dna: { spend: 38, frequency: 22, recency: 18, engagement: 24, retention: 16 },
    rules: [
      "RFM Segment = About to Sleep",
      "Days Since Last Order 90–150",
      "No campaign engagement in 60 days",
      "Churn Risk = HIGH",
    ],
    marketing: {
      bestChannel: "SMS",
      preferredDrink: "Espresso",
      topCity: "Kolkata",
      riskLevel: "High",
      campaignsRun: 2,
      averageSpend: "₹295",
      recommendedAction:
        "Deploy urgency-led reactivation before segment moves to lost.",
      aiInsight:
        "About-to-sleep customers need offers with expiry dates to drive action.",
      expectedImpactEngagement: "+19% engagement",
      expectedImpactRetention: "+5% retention",
      actionTimeline: "Launch urgency SMS reactivation within 4 days.",
      trend: [
        { month: "Jan", value: 24 },
        { month: "Feb", value: 22 },
        { month: "Mar", value: 20 },
        { month: "Apr", value: 18 },
        { month: "May", value: 17 },
        { month: "Jun", value: 16 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 2,
      averageOpenRate: "45.2%",
      averageCtr: "8.1%",
      bestCampaign: "Espresso Urgency Reactivation",
    },
  },
  "cant-lose": {
    dna: { spend: 86, frequency: 64, recency: 42, engagement: 52, retention: 38 },
    rules: [
      "RFM Segment = Can't Lose",
      "Lifetime Spend > ₹6,500",
      "Recency declining rapidly",
      "Churn Risk = HIGH",
    ],
    marketing: {
      bestChannel: "WhatsApp",
      preferredDrink: "Signature Latte",
      topCity: "Bangalore",
      riskLevel: "Critical",
      campaignsRun: 7,
      averageSpend: "₹710",
      recommendedAction:
        "Assign white-glove retention outreach with concierge-style offers.",
      aiInsight:
        "Can't-lose customers have 3× LTV — prioritise human-assisted follow-up.",
      expectedImpactEngagement: "+17% engagement",
      expectedImpactRetention: "+13% retention",
      actionTimeline: "Launch concierge retention outreach within 2 days.",
      trend: [
        { month: "Jan", value: 52 },
        { month: "Feb", value: 48 },
        { month: "Mar", value: 44 },
        { month: "Apr", value: 42 },
        { month: "May", value: 40 },
        { month: "Jun", value: 38 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 7,
      averageOpenRate: "66.8%",
      averageCtr: "14.9%",
      bestCampaign: "Concierge Signature Latte",
    },
  },
  "deal-hunter": {
    dna: { spend: 52, frequency: 68, recency: 62, engagement: 71, retention: 55 },
    rules: [
      "RFM Segment = Deal Hunter",
      "Discount redemption rate > 70%",
      "Campaign click rate > 25%",
      "Price-sensitive purchase pattern",
    ],
    marketing: {
      bestChannel: "Email",
      preferredDrink: "Seasonal Specials",
      topCity: "Pune",
      riskLevel: "Medium",
      campaignsRun: 9,
      averageSpend: "₹410",
      recommendedAction:
        "Lead with limited-time offers and bundle discounts.",
      aiInsight:
        "Deal hunters convert 28% higher on flash-sale creatives vs evergreen promos.",
      expectedImpactEngagement: "+21% engagement",
      expectedImpactRetention: "+6% retention",
      actionTimeline: "Launch flash-sale email within 3 days.",
      trend: [
        { month: "Jan", value: 48 },
        { month: "Feb", value: 50 },
        { month: "Mar", value: 52 },
        { month: "Apr", value: 53 },
        { month: "May", value: 54 },
        { month: "Jun", value: 55 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 9,
      averageOpenRate: "63.5%",
      averageCtr: "24.6%",
      bestCampaign: "Flash Sale Seasonal Bundle",
    },
  },
  "cold-brew": {
    dna: { spend: 58, frequency: 54, recency: 76, engagement: 84, retention: 72 },
    rules: [
      "Product Affinity = Cold Brew",
      "Cold Brew orders > 40% of total",
      "WhatsApp open rate > 65%",
      "Active in last 60 days",
    ],
    marketing: {
      bestChannel: "WhatsApp",
      preferredDrink: "Cold Brew",
      topCity: "Bangalore",
      riskLevel: "Low",
      campaignsRun: 5,
      averageSpend: "₹445",
      recommendedAction:
        "Promote cold brew launches and seasonal nitro variants first.",
      aiInsight:
        "Cold Brew Winback audience shows 74.5% open rate on WhatsApp.",
      expectedImpactEngagement: "+16% engagement",
      expectedImpactRetention: "+10% retention",
      actionTimeline: "Launch nitro cold brew WhatsApp blast within 5 days.",
      trend: [
        { month: "Jan", value: 62 },
        { month: "Feb", value: 65 },
        { month: "Mar", value: 68 },
        { month: "Apr", value: 69 },
        { month: "May", value: 71 },
        { month: "Jun", value: 72 },
      ],
    },
    campaignPerformance: {
      campaignsSent: 5,
      averageOpenRate: "74.5%",
      averageCtr: "19.8%",
      bestCampaign: "Nitro Cold Brew Launch",
    },
  },
};

export function getSegmentDetail(segmentId: string): SegmentDetailProfile {
  return (
    segmentDetailProfiles[segmentId] ?? segmentDetailProfiles.champion
  );
}

export const dnaDimensions = [
  { key: "spend", label: "Spend Score" },
  { key: "frequency", label: "Frequency Score" },
  { key: "recency", label: "Recency Score" },
  { key: "engagement", label: "Engagement Score" },
  { key: "retention", label: "Retention Score" },
] as const;

export function dnaToChartData(dna: SegmentDNA) {
  return dnaDimensions.map(({ key, label }) => ({
    dimension: label,
    score: dna[key],
  }));
}

export function computeSegmentHealthScore(dna: SegmentDNA): number {
  const values = dnaDimensions.map(({ key }) => dna[key]);
  return Math.round(
    values.reduce((sum, value) => sum + value, 0) / values.length,
  );
}
