import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  topic: string;
  difficulty?: string;
}

interface BehavioralData {
  answerChanges: { questionIndex: number; from: string; to: string; timestamp: number }[];
  timePerQuestion: { questionIndex: number; timeSpent: number }[];
  answerPattern: string[];
  hesitationCount: number;
  quickAnswers: number;
}

const SUBJECTS = [
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "english", label: "English" },
  { value: "history", label: "History" },
];

const LEVELS = [
  { value: "beginner", label: "Beginner (Elementary)" },
  { value: "intermediate", label: "Intermediate (Middle School)" },
  { value: "advanced", label: "Advanced (High School)" },
];

const DiagnosticQuiz = () => {
  const [step, setStep] = useState<"select" | "generating" | "quiz" | "analyzing">("select");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [behavioralData, setBehavioralData] = useState<BehavioralData>({
    answerChanges: [],
    timePerQuestion: [],
    answerPattern: [],
    hesitationCount: 0,
    quickAnswers: 0,
  });
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    if (!subject || !level) {
      toast({
        title: "Please select subject and level",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setStep("generating");

    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: { subject, level }
      });

      if (error) throw error;

      setQuestions(data.questions);
      setStep("quiz");
    } catch (error) {
      console.error("Quiz generation error:", error);
      toast({
        title: "Failed to Generate Quiz",
        description: "Please try again.",
        variant: "destructive",
      });
      setStep("select");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    const previousAnswer = answers[currentQuestion];
    
    // Track answer changes (hesitation)
    if (previousAnswer && previousAnswer !== answer) {
      setBehavioralData(prev => ({
        ...prev,
        answerChanges: [
          ...prev.answerChanges,
          {
            questionIndex: currentQuestion,
            from: previousAnswer,
            to: answer,
            timestamp: Date.now(),
          }
        ],
        hesitationCount: prev.hesitationCount + 1,
      }));
    }
    
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    // Track time spent on question
    const timeSpent = (Date.now() - questionStartTime) / 1000; // in seconds
    setBehavioralData(prev => ({
      ...prev,
      timePerQuestion: [
        ...prev.timePerQuestion,
        { questionIndex: currentQuestion, timeSpent }
      ],
      quickAnswers: timeSpent < 5 ? prev.quickAnswers + 1 : prev.quickAnswers,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
    } else {
      analyzeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const analyzeQuiz = async () => {
    setIsLoading(true);
    setStep("analyzing");

    try {
      const answersWithCorrectness = questions.map((q, idx) => ({
        question: q.question,
        topic: q.topic,
        userAnswer: answers[idx],
        correctAnswer: q.correct,
        isCorrect: answers[idx] === q.correct,
        difficulty: q.difficulty || "medium"
      }));

      // Calculate behavioral patterns
      const avgTimePerQuestion = behavioralData.timePerQuestion.reduce((sum, item) => sum + item.timeSpent, 0) / behavioralData.timePerQuestion.length;
      const consistencyPattern = questions.map((_, idx) => answers[idx] ? '1' : '0').join('');

      const { data, error } = await supabase.functions.invoke("analyze-quiz", {
        body: { 
          answers: answersWithCorrectness, 
          subject, 
          level,
          behavioralData: {
            ...behavioralData,
            avgTimePerQuestion,
            consistencyPattern,
          }
        }
      });

      if (error) throw error;

      // Store results and navigate to results page
      sessionStorage.setItem("quizResults", JSON.stringify({
        subject,
        level,
        analysis: data,
        answers: answersWithCorrectness
      }));

      navigate("/quiz-results");
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze quiz. Please try again.",
        variant: "destructive",
      });
      setStep("quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="bg-primary/10 p-4 rounded-full">
                  <Brain className="w-16 h-16 text-primary" />
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Free AI Diagnostic Quiz
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get a personalized quiz tailored to your level - AI will analyze your results
              </p>

              <Card className="max-w-md mx-auto p-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Select Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="w-full h-12 text-base">
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((subj) => (
                          <SelectItem key={subj.value} value={subj.value} className="text-base">
                            {subj.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Select Level</Label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="w-full h-12 text-base">
                        <SelectValue placeholder="Choose your level" />
                      </SelectTrigger>
                      <SelectContent>
                        {LEVELS.map((lvl) => (
                          <SelectItem key={lvl.value} value={lvl.value} className="text-base">
                            {lvl.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleStartQuiz} 
                    disabled={!subject || !level || isLoading}
                    className="w-full h-12 text-base"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate My Quiz
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Brain className="w-16 h-16 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Creating Your Custom Quiz</h2>
              <p className="text-muted-foreground mb-8">
                AI is generating {subject} questions tailored to your {level} level...
              </p>
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </motion.div>
          )}

          {step === "quiz" && questions[currentQuestion] && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-primary h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <Card className="p-8">
                <div className="mb-6">
                  <span className="text-sm text-primary font-medium">
                    {questions[currentQuestion].topic}
                  </span>
                  <h2 className="text-2xl font-bold mt-2">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                <RadioGroup
                  value={answers[currentQuestion] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Label
                        htmlFor={`option-${idx}`}
                        className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer hover:border-primary transition-colors"
                      >
                        <RadioGroupItem value={option} id={`option-${idx}`} />
                        <span className="text-lg">{option}</span>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNext}>
                    {currentQuestion === questions.length - 1 ? "Analyze Results" : "Next"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-16 h-16 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Analyzing Your Results</h2>
              <p className="text-muted-foreground mb-8">
                Our AI is mapping your knowledge and creating a personalized roadmap...
              </p>
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiagnosticQuiz;
