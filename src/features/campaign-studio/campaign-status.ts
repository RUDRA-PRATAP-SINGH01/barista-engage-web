/** Human-readable labels for backend campaign status values. */
export function formatCampaignStatus(status: string): string {
  if (status === "Not saved") return status;

  switch (status) {
    case "DRAFT":
      return "Draft";
    case "SENDING":
    case "ACTIVE":
    case "SCHEDULED":
      return "Active";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
}
