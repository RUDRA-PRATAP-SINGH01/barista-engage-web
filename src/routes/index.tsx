import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AudienceBuilderPage } from "@/pages/ai/AudienceBuilderPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { CampaignsPage } from "@/pages/campaigns/CampaignsPage";
import { LandingPage } from "@/pages/landing/LandingPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { CampaignStudioPage } from "@/pages/campaign-studio/CampaignStudioPage";
import { SegmentsPage } from "@/pages/segments/SegmentsPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: "/ai/audience-builder", element: <AudienceBuilderPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/segments", element: <SegmentsPage /> },
      { path: "/campaigns", element: <CampaignsPage /> },
      {
        path: "/campaigns/:id",
        element: <PlaceholderPage title="Campaign Detail" />,
      },
      { path: "/analytics", element: <PlaceholderPage title="Analytics" /> },
      {
        path: "/analytics/:campaignId",
        element: <PlaceholderPage title="Campaign Analytics" />,
      },
      {
        path: "/campaign-studio",
        element: <CampaignStudioPage />,
      },
    ],
  },
]);
