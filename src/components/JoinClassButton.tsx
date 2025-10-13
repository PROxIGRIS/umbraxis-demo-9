import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface JoinClassButtonProps {
  meetingLink: string | null;
  scheduledAt: string;
  durationMinutes: number;
  isEnrolled: boolean;
}

export const JoinClassButton = ({
  meetingLink,
  scheduledAt,
  durationMinutes,
  isEnrolled,
}: JoinClassButtonProps) => {
  const now = new Date();
  const startTime = new Date(scheduledAt);
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
  const fifteenMinsBefore = new Date(startTime.getTime() - 15 * 60000);

  const canJoin = isEnrolled && meetingLink && now >= fifteenMinsBefore && now <= endTime;

  if (!isEnrolled) return null;

  const handleJoin = () => {
    if (meetingLink) {
      window.open(meetingLink, "_blank");
    }
  };

  return (
    <Button
      onClick={handleJoin}
      disabled={!canJoin}
      className="w-full"
    >
      <Video className="mr-2 h-4 w-4" />
      {canJoin ? "Join Class" : "Available 15 mins before class"}
    </Button>
  );
};
