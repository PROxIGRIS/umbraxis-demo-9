import { Badge } from "@/components/ui/badge";

interface ClassStatusBadgeProps {
  status: string;
  scheduledAt: string;
  durationMinutes: number;
}

export const ClassStatusBadge = ({ status, scheduledAt, durationMinutes }: ClassStatusBadgeProps) => {
  const now = new Date();
  const startTime = new Date(scheduledAt);
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

  let displayStatus = status;
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";

  if (status === "cancelled") {
    displayStatus = "Cancelled";
    variant = "destructive";
  } else if (now >= startTime && now <= endTime) {
    displayStatus = "Live Now";
    variant = "default";
  } else if (now > endTime) {
    displayStatus = "Completed";
    variant = "secondary";
  } else {
    displayStatus = "Upcoming";
    variant = "outline";
  }

  return (
    <Badge variant={variant} className="capitalize">
      {displayStatus}
    </Badge>
  );
};
