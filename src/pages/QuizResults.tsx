import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Lottie from "lottie-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { allTutors } from "@/data/tutors";
import confetti from "canvas-confetti";
import { ShareResults } from "@/components/ShareResults";
import { useGamification } from "@/hooks/useGamification";
import { LevelUpModal } from "@/components/gamification/LevelUpModal";
import { XPBar } from "@/components/gamification/XPBar";
import { LevelDisplay } from "@/components/gamification/LevelDisplay";
import { Theme } from "@/types/gamification";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Calendar, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Award,
  Rocket,
  Star,
  ChevronDown,
  Clock,
  GraduationCap,
  User,
  Users,
  TrendingDown,
  Zap,
  Trophy,
  Flame,
  Crown,
  Volume2,
  Eye,
  Lightbulb,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Area,
  AreaChart
} from "recharts";

interface QuizAnalysis {
  proficiency: string;
  overallScore: number;
  knowledgeMap: Array<{ topic: string; score: number; description: string }>;
  strengths: string[];
  improvements: string[];
  roadmap: Array<{ week: number; goal: string; activities: string[] }>;
  tutorMatch: { style: string; focus: string[]; sessionFrequency: string };
}

interface MatchedTutor {
  name: string;
  image: string;
  specialty: string[];
  teachingStyle: string;
  availability: string;
  rating: number;
  matchScore: number;
  education: string;
  matchReason: string;
}

// Benchmark data for comparison
const BENCHMARKS = {
  beginner: { avg: 45, description: "Typical beginner score" },
  intermediate: { avg: 65, description: "Average intermediate score" },
  advanced: { avg: 85, description: "Advanced learner average" },
};

const QuizResults = () => {
  const [results, setResults] = useState<any>(null);
  const [celebrationAnimation, setCelebrationAnimation] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState<string[]>([]);
  const [showAchievements, setShowAchievements] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number; newlyUnlockedThemes: Theme[] } | null>(null);
  const navigate = useNavigate();
  const radarChartRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const { awardQuizXP, levelInfo, userGamification } = useGamification();

  // Advanced confetti with multiple effects
  const triggerConfetti = useCallback(() => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return;

      const particleCount = 50 * (timeLeft / duration);

      // Fire from multiple points
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe']
      });

      requestAnimationFrame(frame);
    };

    frame();

    // Fireworks effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347']
      });
    }, 1000);
  }, []);

  // Mouse trail particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create particle trail
      if (Math.random() > 0.9) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY
        };
        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.slice(-10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check achievements
  const checkAchievements = useCallback((analysis: QuizAnalysis) => {
    const achievements: string[] = [];
    
    if (analysis.overallScore >= 90) achievements.push('🏆 Master Scholar');
    if (analysis.overallScore >= 80) achievements.push('⭐ Excellence Award');
    if (analysis.overallScore >= 70) achievements.push('🎯 High Achiever');
    if (analysis.strengths.length >= 3) achievements.push('💪 Multi-Talented');
    if (analysis.knowledgeMap.some(k => k.score >= 95)) achievements.push('🔥 Perfect Topic Score');
    if (analysis.proficiency === 'Advanced') achievements.push('👑 Advanced Learner');
    
    setAchievementsUnlocked(achievements);
    if (achievements.length > 0) {
      setTimeout(() => setShowAchievements(true), 2000);
    }
  }, []);

  // Play achievement sound
  const playSound = useCallback((type: 'achievement' | 'unlock' | 'success') => {
    if (!soundEnabled) return;
    
    const frequencies = {
      achievement: [523.25, 659.25, 783.99],
      unlock: [440, 554.37, 659.25],
      success: [523.25, 587.33, 659.25]
    };

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    frequencies[type].forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.5);
      
      oscillator.start(audioContext.currentTime + i * 0.1);
      oscillator.stop(audioContext.currentTime + i * 0.1 + 0.5);
    });
  }, [soundEnabled]);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("quizResults");
    if (!storedResults) {
      navigate("/diagnostic-quiz");
      return;
    }
    const parsedResults = JSON.parse(storedResults);
    setResults(parsedResults);

    // Trigger confetti for scores above 70%
    if (parsedResults.analysis.overallScore >= 70) {
      setTimeout(() => {
        triggerConfetti();
        playSound('achievement');
      }, 500);
    }

    // Check achievements
    checkAchievements(parsedResults.analysis);

    // Award XP for quiz completion
    const awardXP = async () => {
      if (awardQuizXP && parsedResults.level && parsedResults.answers) {
        const difficulty = parsedResults.level.toLowerCase();
        const questionsCount = parsedResults.answers.length;
        
        const result = await awardQuizXP(
          parsedResults.analysis.overallScore,
          difficulty,
          questionsCount
        );

        if (result && result.leveledUp) {
          // Show level up modal
          setTimeout(() => {
            setLevelUpData({
              newLevel: result.newLevel,
              newlyUnlockedThemes: result.newlyUnlockedThemes || []
            });
            setShowLevelUpModal(true);
          }, 2000);
        }
      }
    };

    setTimeout(awardXP, 1000);

    // Load celebration animation with error handling
    fetch('https://lottie.host/4a834279-2b1b-4b6f-9c29-891d6c84aaed/OJ6nELQYXM.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load animation');
        return res.json();
      })
      .then(data => setCelebrationAnimation(data))
      .catch(err => console.warn('Could not load celebration animation:', err));

    // Voice announcement (optional)
    if ('speechSynthesis' in window && soundEnabled) {
      const utterance = new SpeechSynthesisUtterance(
        `Congratulations! You scored ${parsedResults.analysis.overallScore}% and achieved ${parsedResults.analysis.proficiency} proficiency level.`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      setTimeout(() => window.speechSynthesis.speak(utterance), 3000);
    }
  }, [navigate, triggerConfetti, checkAchievements, playSound, soundEnabled, awardQuizXP]);

  // Match real tutors from database based on subject and results
  const matchedTutors = useMemo((): MatchedTutor[] => {
    if (!results) return [];
    
    const analysis = results.analysis;
    const subject = results?.subject?.toLowerCase() || '';
    const baseAvailability = ["Tue/Thu evenings", "Mon/Wed afternoons", "Weekend mornings"];
    
    // Generate match reasons based on results
    const getMatchReason = (tutor: typeof allTutors[0], idx: number) => {
      const reasons: string[] = [];
      
      if (idx === 0) {
        reasons.push(`Specializes in ${analysis.tutorMatch.focus[0] || tutor.specialties[0]}`);
      }
      
      if (analysis.proficiency === "Beginner") {
        reasons.push("Patient approach for building fundamentals");
      } else if (analysis.proficiency === "Advanced") {
        reasons.push("Advanced expertise in complex topics");
      } else {
        reasons.push("Balanced teaching for intermediate learners");
      }
      
      if (tutor.rating >= 4.8) {
        reasons.push(`${tutor.rating} ★ highly rated by ${tutor.students}+ students`);
      }
      
      const weakAreas = analysis.improvements.slice(0, 1);
      if (weakAreas.length > 0 && tutor.specialties.some(spec => 
        weakAreas[0].toLowerCase().includes(spec.toLowerCase())
      )) {
        reasons.push(`Expert in your growth area: ${weakAreas[0].split(' ').slice(0, 3).join(' ')}`);
      }
      
      return reasons.join(" • ");
    };
    
    // Find tutors that match the subject
    const relevantTutors = allTutors.filter(tutor => 
      tutor.subject.toLowerCase().includes(subject) ||
      subject.includes(tutor.subject.toLowerCase().split(' ')[0]) ||
      tutor.specialties.some(spec => 
        spec.toLowerCase().includes(subject) || 
        subject.includes(spec.toLowerCase())
      )
    );
    
    // If no direct match, use top-rated tutors
    const tutorsToUse = relevantTutors.length > 0 ? relevantTutors : allTutors.slice(0, 3);
    
    // Create matched tutors with score and reasoning
    return tutorsToUse.slice(0, 3).map((tutor, idx) => ({
      name: tutor.name,
      image: tutor.image,
      specialty: tutor.specialties.slice(0, 2),
      teachingStyle: idx === 0 ? analysis.tutorMatch.style : 
                     analysis.proficiency === "Beginner" ? "Patient and Encouraging" : "Structured and Rigorous",
      availability: baseAvailability[idx % 3],
      rating: tutor.rating,
      matchScore: 98 - (idx * 3),
      education: tutor.education,
      matchReason: getMatchReason(tutor, idx)
    }));
  }, [results]);

  // Memoize circle calculations to prevent glitches
  const circleProps = useMemo(() => {
    if (!results) return { radius: 70, dashArray: '0 440' };
    
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const overallScore = results.analysis.overallScore;
    const dashArray = `${(overallScore / 100) * circumference} ${circumference}`;
    return { radius, dashArray };
  }, [results]);

  if (!results) return null;

  const analysis: QuizAnalysis = results.analysis;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  // Generate Results PDF - Advanced single page layout
  const generateResultsPDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Gradient Header Background
      pdf.setFillColor(99, 102, 241);
      pdf.rect(0, 0, pageWidth, 50, 'F');
      
      // Decorative accent bar
      pdf.setFillColor(139, 92, 246);
      pdf.rect(0, 48, pageWidth, 2, 'F');
      
      // Header content
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Diagnostic Results Report', pageWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${results.subject} Assessment`, pageWidth / 2, 30, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, 42, { align: 'center' });
      
      // Overall Score Circle - Large and centered
      const centerX = pageWidth / 2;
      let yPos = 70;
      
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(8);
      pdf.circle(centerX, yPos, 25, 'S');
      
      const scorePercentage = analysis.overallScore / 100;
      const endAngle = scorePercentage * 360 - 90;
      
      pdf.setDrawColor(99, 102, 241);
      pdf.setLineWidth(8);
      
      for (let i = 0; i <= endAngle + 90; i += 2) {
        const rad = (i * Math.PI) / 180;
        const x1 = centerX + 25 * Math.cos(rad);
        const y1 = yPos + 25 * Math.sin(rad);
        if (i > 0) {
          pdf.line(prevX, prevY, x1, y1);
        }
        var prevX = x1;
        var prevY = y1;
      }
      
      pdf.setTextColor(99, 102, 241);
      pdf.setFontSize(36);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${analysis.overallScore}%`, centerX, yPos + 3, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(107, 114, 128);
      pdf.text(analysis.proficiency, centerX, yPos + 35, { align: 'center' });
      
      yPos = 120;
      
      // Capture and add radar chart
      if (radarChartRef.current) {
        const canvas = await html2canvas(radarChartRef.current, { 
          scale: 2.5,
          backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        const chartSize = 80;
        pdf.addImage(imgData, 'PNG', (pageWidth - chartSize) / 2, yPos, chartSize, chartSize);
        yPos += chartSize + 8;
      }
      
      // Two column layout for Strengths and Growth
      yPos += 5;
      const colWidth = (pageWidth - 40) / 2;
      
      // Strengths Column
      pdf.setFillColor(236, 253, 245);
      pdf.roundedRect(15, yPos, colWidth - 2, 50, 3, 3, 'F');
      
      pdf.setTextColor(5, 150, 105);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('✓ Key Strengths', 20, yPos + 8);
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      let strengthY = yPos + 16;
      analysis.strengths.slice(0, 3).forEach((strength: string) => {
        const lines = pdf.splitTextToSize(strength, colWidth - 12);
        pdf.text(lines, 20, strengthY);
        strengthY += lines.length * 4;
      });
      
      // Growth Opportunities Column
      pdf.setFillColor(254, 243, 199);
      pdf.roundedRect(pageWidth / 2 + 1, yPos, colWidth - 2, 50, 3, 3, 'F');
      
      pdf.setTextColor(217, 119, 6);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('→ Growth Areas', pageWidth / 2 + 6, yPos + 8);
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      let growthY = yPos + 16;
      analysis.improvements.slice(0, 3).forEach((improvement: string) => {
        const lines = pdf.splitTextToSize(improvement, colWidth - 12);
        pdf.text(lines, pageWidth / 2 + 6, growthY);
        growthY += lines.length * 4;
      });
      
      yPos += 58;
      
      // Tutor Recommendations Section
      pdf.setFillColor(249, 250, 251);
      pdf.roundedRect(15, yPos, pageWidth - 30, 28, 3, 3, 'F');
      
      pdf.setTextColor(99, 102, 241);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.text('🎓 Recommended Tutors', 20, yPos + 8);
      
      pdf.setTextColor(55, 65, 81);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      let tutorX = 20;
      matchedTutors.slice(0, 3).forEach((tutor, idx) => {
        const tutorWidth = (pageWidth - 45) / 3;
        pdf.setFont('helvetica', 'bold');
        pdf.text(tutor.name, tutorX, yPos + 16);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${tutor.rating} ⭐ | ${tutor.matchScore}% match`, tutorX, yPos + 20);
        const specialties = tutor.specialty.join(', ');
        pdf.text(pdf.splitTextToSize(specialties, tutorWidth - 5), tutorX, yPos + 24);
        tutorX += tutorWidth;
      });
      
      // Footer
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.5);
      pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
      
      pdf.setTextColor(156, 163, 175);
      pdf.setFontSize(8);
      pdf.text('© Umbraxis - Premium Tutoring Services', pageWidth / 2, pageHeight - 8, { align: 'center' });
      pdf.text('umbraxis.com', pageWidth / 2, pageHeight - 4, { align: 'center' });
      
      pdf.save(`umbraxis-results-${results.subject}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating results PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Generate 90-Day Roadmap PDF
  const generateRoadmapPDF = async () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Header with gradient effect
      pdf.setFillColor(99, 102, 241);
      pdf.rect(0, 0, pageWidth, 45, 'F');
      
      pdf.setFillColor(139, 92, 246);
      pdf.rect(0, 43, pageWidth, 2, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(26);
      pdf.setFont('helvetica', 'bold');
      pdf.text('90-Day Learning Roadmap', pageWidth / 2, 18, { align: 'center' });
      
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${results.subject} | ${analysis.proficiency} Level`, pageWidth / 2, 28, { align: 'center' });
      
      pdf.setFontSize(9);
      pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, 37, { align: 'center' });
      
      let yPos = 60;
      
      // Timeline visualization
      const phaseColors = [
        { bg: [219, 234, 254], text: [37, 99, 235], name: 'Foundation' },
        { bg: [254, 243, 199], text: [217, 119, 6], name: 'Application' },
        { bg: [236, 253, 245], text: [5, 150, 105], name: 'Mastery' }
      ];
      
      roadmapPhases.forEach((phase, phaseIdx) => {
        const color = phaseColors[phaseIdx];
        
        // Phase header with colored background
        pdf.setFillColor(color.bg[0], color.bg[1], color.bg[2]);
        pdf.roundedRect(15, yPos, pageWidth - 30, 12, 2, 2, 'F');
        
        pdf.setTextColor(color.text[0], color.text[1], color.text[2]);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Phase ${phaseIdx + 1}: ${phase.phase}`, 20, yPos + 8);
        
        yPos += 15;
        
        // Phase description
        pdf.setTextColor(75, 85, 99);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.text(phase.description, 20, yPos);
        yPos += 8;
        
        // Week-by-week breakdown
        pdf.setFont('helvetica', 'normal');
        phase.weeks.forEach((week: any) => {
          if (yPos > pageHeight - 35) {
            pdf.addPage();
            yPos = 20;
          }
          
          // Week circle indicator
          pdf.setFillColor(color.text[0], color.text[1], color.text[2]);
          pdf.circle(22, yPos - 1, 2, 'F');
          
          pdf.setTextColor(31, 41, 55);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Week ${week.week}`, 28, yPos);
          
          pdf.setTextColor(55, 65, 81);
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          const goalLines = pdf.splitTextToSize(week.goal, pageWidth - 45);
          pdf.text(goalLines, 28, yPos + 5);
          
          yPos += 5 + (goalLines.length * 4) + 3;
          
          // Activities
          pdf.setFontSize(8);
          pdf.setTextColor(107, 114, 128);
          week.activities.slice(0, 2).forEach((activity: string) => {
            if (yPos > pageHeight - 30) {
              pdf.addPage();
              yPos = 20;
            }
            const activityLines = pdf.splitTextToSize(`• ${activity}`, pageWidth - 50);
            pdf.text(activityLines, 32, yPos);
            yPos += activityLines.length * 3.5;
          });
          
          yPos += 4;
        });
        
        yPos += 3;
      });
      
      // Call to action box
      if (yPos > pageHeight - 40) {
        pdf.addPage();
        yPos = 20;
      }
      
      pdf.setFillColor(249, 250, 251);
      pdf.roundedRect(15, yPos, pageWidth - 30, 20, 3, 3, 'F');
      
      pdf.setTextColor(99, 102, 241);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Ready to Begin Your Journey?', pageWidth / 2, yPos + 8, { align: 'center' });
      
      pdf.setTextColor(75, 85, 99);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Book a session with one of our expert tutors to start your transformation', pageWidth / 2, yPos + 14, { align: 'center' });
      
      // Footer
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.5);
      pdf.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
      
      pdf.setTextColor(156, 163, 175);
      pdf.setFontSize(8);
      pdf.text('© Umbraxis - Premium Tutoring Services', pageWidth / 2, pageHeight - 8, { align: 'center' });
      pdf.text('umbraxis.com', pageWidth / 2, pageHeight - 4, { align: 'center' });
      
      pdf.save(`umbraxis-roadmap-${results.subject}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating roadmap PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };


  // Organize roadmap into 3 phases
  const organizeRoadmap = () => {
    const weeks = analysis.roadmap.length;
    const phaseSize = Math.ceil(weeks / 3);
    
    return [
      {
        phase: "Foundation",
        weeks: analysis.roadmap.slice(0, phaseSize),
        description: "Build core knowledge and establish learning habits"
      },
      {
        phase: "Application",
        weeks: analysis.roadmap.slice(phaseSize, phaseSize * 2),
        description: "Apply concepts through practice and real-world examples"
      },
      {
        phase: "Mastery",
        weeks: analysis.roadmap.slice(phaseSize * 2),
        description: "Refine skills and achieve advanced proficiency"
      }
    ];
  };

  const roadmapPhases = organizeRoadmap();

  const getScoreColor = (score: number) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 40) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getActionableInsight = (topic: string, score: number) => {
    if (score >= 70) return "Keep practicing to maintain mastery";
    if (score >= 40) return "3-4 focused practice drills recommended";
    return "Priority focus area - daily practice essential";
  };

  const getOverallInsight = (score: number, proficiency: string) => {
    if (score >= 90) return `Outstanding performance! You're in the top tier of ${proficiency} learners. Consider advanced challenges to push your limits further.`;
    if (score >= 80) return `Excellent work! Your ${proficiency} level shows strong fundamentals. Focus on real-world applications to solidify your expertise.`;
    if (score >= 70) return `Great progress! You've reached ${proficiency} level. Consistent practice will help you master advanced concepts.`;
    if (score >= 60) return `Good foundation! Work on strengthening weak areas while maintaining your current ${proficiency} level.`;
    return `You're on the learning path. Focus on foundational concepts first, then gradually build up to ${proficiency} level skills.`;
  };


  return (
    <>
      {/* Mouse Trail Particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ left: particle.x, top: particle.y }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievements && achievementsUnlocked.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <Card className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
                <div>
                  <h3 className="font-bold text-lg mb-2">🎉 Achievements Unlocked!</h3>
                  <div className="space-y-1">
                    {achievementsUnlocked.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="text-sm"
                      >
                        {achievement}
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAchievements(false)}
                    className="mt-3"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Modal */}
      {levelUpData && (
        <LevelUpModal
          isOpen={showLevelUpModal}
          onClose={() => setShowLevelUpModal(false)}
          newLevel={levelUpData.newLevel}
          newlyUnlockedThemes={levelUpData.newlyUnlockedThemes}
        />
      )}

      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-4 sm:py-6 md:py-12 px-2 sm:px-3 md:px-4 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/5 rounded-full blur-2xl"
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Sound Toggle */}
      <motion.div
        className="fixed top-4 left-4 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="rounded-full backdrop-blur-xl bg-background/80"
        >
          <Volume2 className={`w-4 h-4 ${soundEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
        </Button>
      </motion.div>

      <motion.div
        className="container max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section with Enhanced Animation */}
        <motion.div variants={itemVariants} className="text-center mb-6 md:mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block mb-4 md:mb-6 relative"
          >
            {/* Holographic Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-2xl"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            />
            
            {celebrationAnimation ? (
              <div className="relative z-10">
                <Lottie animationData={celebrationAnimation} loop={true} className="w-32 h-32 md:w-48 md:h-48" />
              </div>
            ) : (
              <div className="relative z-10 bg-gradient-to-br from-primary/20 to-secondary/20 p-6 md:p-8 rounded-full">
                <Award className="w-16 h-16 md:w-24 md:h-24 text-primary" />
              </div>
            )}
          </motion.div>
          
          <motion.h1 
            className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-3 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              Your {results.subject} Mastery Level
            </span>
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge className="text-xl md:text-3xl px-6 py-2 bg-gradient-to-r from-primary to-secondary">
              {analysis.proficiency}
            </Badge>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Flame className="w-8 h-8 text-orange-500" />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {analysis.overallScore}%
            </span>
          </motion.p>
          
          <motion.p 
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ✨ Your personalized learning roadmap awaits ✨
          </motion.p>

          {/* Level Display */}
          {levelInfo && userGamification && (
            <motion.div
              className="mt-6 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <LevelDisplay levelInfo={levelInfo} size="lg" />
              <div className="w-full max-w-md">
                <XPBar levelInfo={levelInfo} />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Score Card with Multiple Visualizations */}
        <motion.div variants={itemVariants}>
          <Card className="p-4 md:p-8 lg:p-10 mb-4 md:mb-6 relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-card/80 via-card/90 to-primary/10 border-2 border-primary/20">
            {/* Animated Background Gradients */}
            <motion.div 
              className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              {/* 3D Score Display */}
              <motion.div 
                className="inline-block mb-6"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                style={{ perspective: 1000 }}
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
                  {/* Glowing Ring Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <svg className="w-full h-full transform -rotate-90">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(var(--primary))" />
                        <stop offset="50%" stopColor="rgb(var(--secondary))" />
                        <stop offset="100%" stopColor="rgb(var(--accent))" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Background Circle */}
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-muted/30"
                    />
                    
                    {/* Animated Progress Circle */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 70} ${2 * Math.PI * 70}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - analysis.overallScore / 100) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      filter="url(#glow)"
                    />
                  </svg>
                  
                  {/* Center Score Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Crown className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 mb-2" />
                    </motion.div>
                    <motion.p 
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {analysis.overallScore}%
                    </motion.p>
                    <p className="text-xs md:text-sm text-muted-foreground">Score</p>
                  </div>
                </div>
              </motion.div>

              {/* Multi-Chart Comparison Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Progress vs Benchmark */}
                <motion.div
                  className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">vs. Benchmarks</h4>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(BENCHMARKS).map(([level, data]) => (
                      <div key={level}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{level}</span>
                          <span className="font-mono">{data.avg}%</span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute left-0 top-0 h-full rounded-full ${
                              analysis.overallScore > data.avg ? 'bg-green-500' : 'bg-orange-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (analysis.overallScore / data.avg) * 100)}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Stats Panel */}
                <motion.div
                  className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <Zap className="w-5 h-5 text-yellow-500 mb-3" />
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold">{analysis.strengths.length}</p>
                      <p className="text-xs text-muted-foreground">Strong Areas</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analysis.knowledgeMap.length}</p>
                      <p className="text-xs text-muted-foreground">Topics Analyzed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analysis.roadmap.length}</p>
                      <p className="text-xs text-muted-foreground">Week Plan</p>
                    </div>
                  </div>
                </motion.div>

                {/* Achievement Progress */}
                <motion.div
                  className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <Trophy className="w-5 h-5 text-yellow-500 mb-3" />
                  <h4 className="font-semibold mb-3">Achievements</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {achievementsUnlocked.slice(0, 4).map((ach, idx) => (
                      <motion.div
                        key={idx}
                        className="text-2xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + idx * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {ach.split(' ')[0]}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button 
                  onClick={generateResultsPDF}
                  disabled={isGeneratingPDF}
                  className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Download className="w-4 h-4" />
                  {isGeneratingPDF ? "Generating..." : "Download Full Report"}
                </Button>
                
                <ShareResults
                  subject={results.subject}
                  overallScore={analysis.overallScore}
                  proficiency={analysis.proficiency}
                />
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/start-trial")}
                  className="gap-2 border-2"
                >
                  <Rocket className="w-4 h-4" />
                  Start Your Journey
                </Button>
              </div>

              {/* Actionable Insight */}
              <motion.div
                className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">💡 Quick Insight</h4>
                    <p className="text-sm text-muted-foreground">
                      {getOverallInsight(analysis.overallScore, analysis.proficiency)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Knowledge Map */}
        <motion.div variants={itemVariants}>
          <Card className="p-4 md:p-6 lg:p-8 mb-4 md:mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl opacity-40" />
            
            <motion.div 
              className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">Your Knowledge Map</h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 relative z-10">
              <motion.div
                ref={radarChartRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={analysis.knowledgeMap}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="topic" 
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
              </motion.div>

              <div className="space-y-4">
                {analysis.knowledgeMap.map((item, idx) => {
                  const benchmark = 
                    item.score >= 70 ? BENCHMARKS.advanced :
                    item.score >= 40 ? BENCHMARKS.intermediate :
                    BENCHMARKS.beginner;
                  
                  const vsAverage = item.score - benchmark.avg;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="p-4 rounded-lg hover:bg-accent/10 transition-colors border border-border/50 bg-card"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">{item.topic}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-sm font-bold ${getScoreTextColor(item.score)}`}
                          >
                            {item.score}%
                          </Badge>
                          {vsAverage > 0 ? (
                            <Badge variant="outline" className="text-xs gap-1">
                              <TrendingUp className="w-3 h-3" />
                              +{vsAverage}% vs avg
                            </Badge>
                          ) : vsAverage < 0 ? (
                            <Badge variant="outline" className="text-xs gap-1 text-orange-600">
                              <TrendingDown className="w-3 h-3" />
                              {vsAverage}% vs avg
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                      <div className="relative mb-3">
                        <div className="h-3 bg-secondary/20 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${getScoreColor(item.score)} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ delay: 0.5 + idx * 0.05, duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                        {/* Benchmark marker */}
                        <div 
                          className="absolute top-0 h-3 w-0.5 bg-muted-foreground/50"
                          style={{ left: `${benchmark.avg}%` }}
                          title={`${benchmark.description}: ${benchmark.avg}%`}
                        >
                          <Users className="w-3 h-3 absolute -top-4 -left-1.5 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 dark:text-muted-foreground">{item.description}</p>
                      <div className="flex items-start gap-2 text-xs flex-wrap">
                        <span className="font-medium text-primary dark:text-primary">💡 {getActionableInsight(item.topic, item.score)}</span>
                        <span className="text-muted-foreground dark:text-muted-foreground">• Avg: {benchmark.avg}%</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          <motion.div variants={itemVariants}>
            <Card className="p-4 md:p-6 lg:p-8 h-full relative overflow-hidden bg-gradient-to-br from-green-500/5 to-card hover:shadow-xl transition-all duration-300">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl opacity-40" />
              <motion.div 
                className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <div className="p-1.5 md:p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Your Strengths</h2>
              </motion.div>
              <ul className="space-y-3 relative z-10">
                {analysis.strengths.map((strength, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-500/5 transition-colors"
                    >
                      <div className="p-1 bg-green-500/10 rounded">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      </div>
                      <span className="text-foreground dark:text-foreground">{strength}</span>
                    </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-4 md:p-6 lg:p-8 h-full relative overflow-hidden bg-gradient-to-br from-orange-500/5 to-card hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl opacity-40" />
              <motion.div 
                className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <div className="p-1.5 md:p-2 bg-orange-500/10 rounded-lg">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Growth Opportunities</h2>
              </motion.div>
              <ul className="space-y-3 relative z-10">
                {analysis.improvements.map((improvement, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ x: -5, scale: 1.02 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-500/5 transition-colors"
                    >
                      <div className="p-1 bg-orange-500/10 rounded">
                        <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      </div>
                      <span className="text-foreground dark:text-foreground">{improvement}</span>
                    </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* 90-Day Roadmap - Phased Approach */}
        <motion.div variants={itemVariants}>
          <Card ref={roadmapRef} className="p-4 md:p-6 lg:p-8 mb-4 md:mb-6 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.div 
              className="flex items-center justify-between mb-4 md:mb-6 mt-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">Your 90-Day Roadmap</h2>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">Structured in 3 progressive phases</p>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-6">
              {roadmapPhases.map((phase, phaseIdx) => (
                <Collapsible key={phaseIdx} defaultOpen={phaseIdx === 0}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * phaseIdx }}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <CollapsibleTrigger className="w-full p-3 sm:p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold ${
                            phaseIdx === 0 ? 'bg-blue-500/20 text-blue-600' :
                            phaseIdx === 1 ? 'bg-purple-500/20 text-purple-600' :
                            'bg-green-500/20 text-green-600'
                          }`}>
                            {phaseIdx + 1}
                          </div>
                          <div className="text-left">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold">{phase.phase}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{phase.description}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                              Weeks {phase.weeks[0]?.week} - {phase.weeks[phase.weeks.length - 1]?.week}
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform ui-expanded:rotate-180 flex-shrink-0" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3 bg-background">
                        {phase.weeks.map((week, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className="border-l-4 border-primary/50 hover:border-primary pl-3 sm:pl-4 py-2 rounded-r-lg hover:bg-accent/5 transition-all"
                          >
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">Week {week.week}</Badge>
                              <h4 className="font-semibold text-xs sm:text-sm">{week.goal}</h4>
                            </div>
                            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 ml-2">
                              {week.activities.map((activity, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-2">
                                  <span className="text-primary mt-0.5">▸</span>
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </motion.div>
                </Collapsible>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <Button 
                onClick={generateRoadmapPDF} 
                variant="outline" 
                size="lg" 
                className="shadow-md hover:shadow-lg"
                disabled={isGeneratingPDF}
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Download Complete Roadmap PDF'}
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Tutor Match - Dynamic */}
        <motion.div variants={itemVariants}>
          <Card className="p-4 sm:p-6 md:p-10 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 relative overflow-hidden shadow-xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative z-10"
            >
              <div className="text-center mb-6 sm:mb-8">
                <motion.div
                  className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-2 sm:p-3 bg-primary/20 rounded-xl">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Your Perfect Tutor Matches</h2>
                </motion.div>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                  Based on your {results.subject} results and learning profile, we recommend tutors who specialize in{" "}
                  <span className="font-semibold text-foreground">
                    {analysis.tutorMatch.focus.slice(0, 2).join(" and ")}
                  </span>
                </p>
              </div>

              {/* Tutor Cards */}
              <div id="tutor-matches" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {matchedTutors.map((tutor, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative w-full"
                >
                    <Card className="p-4 sm:p-6 h-full bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all">
                      {/* Match Score Badge */}
                      <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 text-xs">
                        {tutor.matchScore}% Match
                      </Badge>

                      {/* Tutor Avatar */}
                      <div className="flex flex-col items-center mb-3 sm:mb-4">
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3 border-4 border-primary/20">
                          <AvatarImage src={tutor.image} alt={tutor.name} />
                          <AvatarFallback>
                            <User className="w-8 h-8 sm:w-10 sm:h-10" />
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-base sm:text-lg text-center">{tutor.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-medium">{tutor.rating}</span>
                        </div>
                      </div>

                      {/* Education */}
                      <div className="mb-3 sm:mb-4 text-center">
                        <p className="text-xs text-muted-foreground">{tutor.education}</p>
                      </div>
                      
                      {/* Why This Tutor - Match Reasoning */}
                      <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Why This Tutor?
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {tutor.matchReason}
                        </p>
                      </div>

                      {/* Specialty */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          Specialty
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {tutor.specialty.map((spec, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Teaching Style */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Teaching Style</p>
                        <p className="text-xs sm:text-sm font-medium">{tutor.teachingStyle}</p>
                      </div>

                      {/* Availability */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Availability
                        </p>
                        <p className="text-xs sm:text-sm">{tutor.availability}</p>
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => navigate("/start-trial")}
                      >
                        Book Free Trial
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Session Frequency Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-3 sm:p-4 bg-background/50 rounded-lg backdrop-blur-sm mb-4 sm:mb-6 text-center mx-2"
              >
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Recommended Session Frequency</p>
                <p className="font-bold text-base sm:text-lg text-foreground">{analysis.tutorMatch.sessionFrequency}</p>
              </motion.div>
              
              {/* Bottom CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" onClick={() => navigate("/tutors")} className="shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 mr-2" />
                    See All Tutors Who Match You
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" variant="outline" onClick={() => navigate("/start-trial")} className="shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base">
                    <Rocket className="w-4 h-4 mr-2" />
                    Start Free Trial Now
                  </Button>
                </motion.div>
              </motion.div>

              <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6 px-2">
                Ready to turn this roadmap into results? Your perfect tutor is waiting.
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default QuizResults;
