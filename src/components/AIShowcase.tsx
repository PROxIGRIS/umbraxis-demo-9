import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Sparkles, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const AIShowcase = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "Computer Science", "English Literature", "History",
    "Spanish", "French", "Economics"
  ];

  const analyzeSubject = async () => {
    if (!selectedSubject) {
      toast({
        title: "Please select a subject",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('learning-assistant', {
        body: { action: 'analyze-subject', subject: selectedSubject }
      });

      if (error) throw error;
      setAnalysis(data);
      toast({
        title: "Analysis Complete!",
        description: "AI has analyzed your subject",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze subject. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="analyzer" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="analyzer" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Subject Analyzer</span>
            <span className="sm:hidden">Analyzer</span>
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Learning Style</span>
            <span className="sm:hidden">Style</span>
          </TabsTrigger>
          <TabsTrigger value="matcher" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Tutor Match</span>
            <span className="sm:hidden">Match</span>
          </TabsTrigger>
          <TabsTrigger value="planner" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Study Planner</span>
            <span className="sm:hidden">Planner</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-primary/20 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">AI Subject Analyzer</h3>
                <p className="text-muted-foreground">Get instant insights into any subject</p>
              </div>
            </div>

            <div className="space-y-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subject to analyze" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={analyzeSubject} 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    AI is analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 space-y-4"
                >
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-24 w-full" />
                </motion.div>
              )}

              {!loading && analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 space-y-6"
                >
                  <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                    <h4 className="font-bold text-lg mb-3">Key Topics Breakdown</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {analysis.topics?.map((topic: any, i: number) => (
                        <div key={i} className="bg-card/50 p-4 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{topic.name}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              topic.difficulty === 'easy' ? 'bg-green-500/20 text-green-600' :
                              topic.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-600' :
                              'bg-red-500/20 text-red-600'
                            }`}>
                              {topic.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
                    <h4 className="font-bold text-lg mb-3">Recommended Learning Path</h4>
                    <div className="space-y-3">
                      {analysis.learningPath?.map((step: any, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-semibold">{step.phase}</p>
                            <p className="text-sm text-muted-foreground">{step.duration} • {step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-lg border border-border">
                    <h4 className="font-bold text-lg mb-3">Matched Tutors for {selectedSubject}</h4>
                    <div className="grid gap-3">
                      {analysis.tutors?.map((tutor: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                            {tutor.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{tutor.name}</p>
                            <p className="text-sm text-muted-foreground">{tutor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">{tutor.match}%</div>
                            <div className="text-xs text-muted-foreground">Match</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </TabsContent>

        <TabsContent value="style">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-secondary/20 shadow-lg text-center"
          >
            <Sparkles className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Learning Style Assessment</h3>
            <p className="text-muted-foreground mb-6">
              Coming soon: Take our AI-powered 3-question quiz to discover your optimal learning style and get matched with compatible tutors.
            </p>
            <Button variant="secondary" size="lg" disabled>
              Start Assessment (Coming Soon)
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="matcher">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-primary/20 shadow-lg text-center"
          >
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">AI Tutor Matching</h3>
            <p className="text-muted-foreground mb-6">
              Coming soon: Our AI analyzes 300+ factors to find your perfect tutor match based on learning style, goals, and schedule.
            </p>
            <Button size="lg" disabled>
              Find My Match (Coming Soon)
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="planner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-secondary/20 shadow-lg text-center"
          >
            <Calendar className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Smart Study Planner</h3>
            <p className="text-muted-foreground mb-6">
              Coming soon: AI-generated personalized 4-week study plans with weekly milestones, time allocations, and tutor session recommendations.
            </p>
            <Button variant="secondary" size="lg" disabled>
              Generate Plan (Coming Soon)
            </Button>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIShowcase;
