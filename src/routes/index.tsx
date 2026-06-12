import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { CampaignsPage } from "@/pages/campaigns/CampaignsPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { SegmentsPage } from "@/pages/segments/SegmentsPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
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
        path: "/ai/audience-builder",
        element: <PlaceholderPage title="AI Audience Builder" />,
      },
      {
        path: "/ai/campaign-analyst",
        element: <PlaceholderPage title="AI Campaign Analyst" />,
      },
    ],
  },
]);
