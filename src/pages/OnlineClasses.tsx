import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassCard } from "@/components/ClassCard";
import { ClassFilters } from "@/components/ClassFilters";
import { CreateClassDialog } from "@/components/CreateClassDialog";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnlineClasses = () => {
  const { user, userRole, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user]);

  const fetchClasses = async () => {
    setLoading(true);

    // Fetch all classes with tutor info
    const { data: classesData, error: classesError } = await supabase
      .from("online_classes")
      .select(`
        *,
        tutor:profiles!tutor_id (
          full_name,
          avatar_url
        )
      `)
      .eq("status", "scheduled")
      .order("scheduled_at", { ascending: true });

    if (classesError) {
      toast({
        title: "Error",
        description: "Failed to load classes",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Fetch enrollment counts
    const { data: enrollmentsData } = await supabase
      .from("class_enrollments")
      .select("class_id");

    // Fetch user's enrollments
    const { data: userEnrollments } = await supabase
      .from("class_enrollments")
      .select("class_id")
      .eq("student_id", user?.id || "");

    const enrollmentCounts = enrollmentsData?.reduce((acc: any, enrollment: any) => {
      acc[enrollment.class_id] = (acc[enrollment.class_id] || 0) + 1;
      return acc;
    }, {});

    const userEnrolledClassIds = new Set(
      userEnrollments?.map((e: any) => e.class_id) || []
    );

    const enrichedClasses = classesData?.map((classItem: any) => ({
      ...classItem,
      enrollmentCount: enrollmentCounts?.[classItem.id] || 0,
      isEnrolled: userEnrolledClassIds.has(classItem.id),
    }));

    setClasses(enrichedClasses || []);
    setLoading(false);
  };

  const handleEnroll = async (classId: string) => {
    if (!user) return;

    const { error } = await supabase.from("class_enrollments").insert({
      class_id: classId,
      student_id: user.id,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Successfully enrolled in class!",
    });

    fetchClasses();
  };

  const handleCancelClass = async (classId: string) => {
    const { error } = await supabase
      .from("online_classes")
      .update({ status: "cancelled" })
      .eq("id", classId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Class cancelled successfully",
    });

    fetchClasses();
  };

  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch = classItem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "All Subjects" || classItem.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const studentClasses = filteredClasses;
  const tutorClasses = filteredClasses.filter(
    (classItem) => classItem.tutor_id === user?.id
  );
  const enrolledClasses = filteredClasses.filter(
    (classItem) => classItem.isEnrolled
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Online Classes</h1>
          <p className="text-muted-foreground">
            {userRole === "tutor"
              ? "Manage your classes and connect with students"
              : "Browse and enroll in live online classes"}
          </p>
        </div>

        <Tabs defaultValue={userRole === "tutor" ? "my-classes" : "browse"} className="space-y-6">
          <TabsList>
            {userRole !== "tutor" && (
              <>
                <TabsTrigger value="browse">Browse Classes</TabsTrigger>
                <TabsTrigger value="enrolled">My Enrolled Classes</TabsTrigger>
              </>
            )}
            {userRole === "tutor" && <TabsTrigger value="my-classes">My Classes</TabsTrigger>}
          </TabsList>

          {userRole !== "tutor" && (
            <TabsContent value="browse" className="space-y-6">
              <ClassFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentClasses.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    classData={classItem}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
              {studentClasses.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No classes found matching your criteria
                </div>
              )}
            </TabsContent>
          )}

          {userRole !== "tutor" && (
            <TabsContent value="enrolled" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledClasses.map((classItem) => (
                  <ClassCard key={classItem.id} classData={classItem} />
                ))}
              </div>
              {enrolledClasses.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  You haven't enrolled in any classes yet
                </div>
              )}
            </TabsContent>
          )}

          {userRole === "tutor" && (
            <TabsContent value="my-classes" className="space-y-6">
              <div className="flex justify-between items-center">
                <ClassFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                />
                <CreateClassDialog tutorId={user?.id || ""} onClassCreated={fetchClasses} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorClasses.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    classData={classItem}
                    onCancel={handleCancelClass}
                    isTutor
                  />
                ))}
              </div>
              {tutorClasses.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  You haven't created any classes yet
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default OnlineClasses;
