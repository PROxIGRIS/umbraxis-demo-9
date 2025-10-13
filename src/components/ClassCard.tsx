import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users } from "lucide-react";
import { ClassStatusBadge } from "./ClassStatusBadge";
import { JoinClassButton } from "./JoinClassButton";
import { format } from "date-fns";

interface ClassCardProps {
  classData: {
    id: string;
    title: string;
    description: string;
    subject: string;
    scheduled_at: string;
    duration_minutes: number;
    meeting_link: string | null;
    status: string;
    max_students: number;
    tutor: {
      full_name: string;
      avatar_url: string | null;
    };
    enrollmentCount: number;
    isEnrolled: boolean;
  };
  onEnroll?: (classId: string) => void;
  onEdit?: (classId: string) => void;
  onCancel?: (classId: string) => void;
  isTutor?: boolean;
}

export const ClassCard = ({ classData, onEnroll, onEdit, onCancel, isTutor }: ClassCardProps) => {
  const isClassFull = classData.enrollmentCount >= classData.max_students;
  const canEnroll = !classData.isEnrolled && !isClassFull && classData.status === "scheduled";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle>{classData.title}</CardTitle>
            <CardDescription className="line-clamp-2">{classData.description}</CardDescription>
          </div>
          <ClassStatusBadge
            status={classData.status}
            scheduledAt={classData.scheduled_at}
            durationMinutes={classData.duration_minutes}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={classData.tutor.avatar_url || undefined} />
            <AvatarFallback>{classData.tutor.full_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{classData.tutor.full_name}</p>
            <p className="text-muted-foreground">{classData.subject}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {format(new Date(classData.scheduled_at), "PPP")}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {format(new Date(classData.scheduled_at), "p")} ({classData.duration_minutes} mins)
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {classData.enrollmentCount}/{classData.max_students} students
            {isClassFull && <span className="ml-2 text-destructive font-medium">Full</span>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {isTutor ? (
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onEdit?.(classData.id)}>
              Edit
            </Button>
            <Button variant="destructive" className="flex-1" onClick={() => onCancel?.(classData.id)}>
              Cancel
            </Button>
          </div>
        ) : (
          <>
            {classData.isEnrolled ? (
              <JoinClassButton
                meetingLink={classData.meeting_link}
                scheduledAt={classData.scheduled_at}
                durationMinutes={classData.duration_minutes}
                isEnrolled={classData.isEnrolled}
              />
            ) : (
              <Button
                onClick={() => onEnroll?.(classData.id)}
                disabled={!canEnroll}
                className="w-full"
              >
                {isClassFull ? "Class Full" : "Enroll Now"}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};
