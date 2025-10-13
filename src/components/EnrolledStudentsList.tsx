import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EnrolledStudent {
  id: string;
  student: {
    full_name: string;
    avatar_url: string | null;
  };
  enrolled_at: string;
}

interface EnrolledStudentsListProps {
  students: EnrolledStudent[];
}

export const EnrolledStudentsList = ({ students }: EnrolledStudentsListProps) => {
  if (students.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No students enrolled yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-2">
        {students.map((enrollment) => (
          <div
            key={enrollment.id}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={enrollment.student.avatar_url || undefined} />
              <AvatarFallback>
                {enrollment.student.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{enrollment.student.full_name}</p>
              <p className="text-xs text-muted-foreground">
                Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
