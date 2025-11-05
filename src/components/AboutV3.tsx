import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX, Sparkles, Brain, Users, GraduationCap, TrendingUp, Zap, Award, Target, Rocket, Star, BookOpen, Clock } from "lucide-react";

// AI Brain Network Animation (Advanced Neural Network)
const aiBrainAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  nm: "AI Brain",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Core",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [70], e: [100] }, { t: 90, s: [100], e: [70] }, { t: 180 }] },
        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 180 }] },
        p: { a: 0, k: [250, 250, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100], e: [130, 130] }, { t: 90, s: [130, 130], e: [100, 100] }, { t: 180 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 90 } },
          ],
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Ring1",
      sr: 1,
      ks: {
        o: { a: 0, k: 60 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [-180] }, { t: 180 }] },
        p: { a: 0, k: [250, 250, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [120, 0] }, s: { a: 0, k: [40, 40] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 70 } },
          ],
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Ring2",
      sr: 1,
      ks: {
        o: { a: 0, k: 50 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [270] }, { t: 180 }] },
        p: { a: 0, k: [250, 250, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [-130, 80] }, s: { a: 0, k: [35, 35] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 65 } },
          ],
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
    },
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "Ring3",
      sr: 1,
      ks: {
        o: { a: 0, k: 55 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [180] }, { t: 180 }] },
        p: { a: 0, k: [250, 250, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, -140] }, s: { a: 0, k: [38, 38] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 68 } },
          ],
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
    },
  ],
};

// Timeline Glow Animation
const timelineGlowAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 100,
  h: 100,
  nm: "Glow",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Glow",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0], e: [100] }, { t: 45, s: [100], e: [0] }, { t: 90 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        s: { a: 1, k: [{ t: 0, s: [80, 80], e: [150, 150] }, { t: 90 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [40, 40] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 80 } },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
  ],
};

// Philosophy Tree/Network Animation
const philosophyTreeAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 240,
  w: 400,
  h: 400,
  nm: "Network",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Node1",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [50], e: [90] }, { t: 120, s: [90], e: [50] }, { t: 240 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 150, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100], e: [130, 130] }, { t: 120, s: [130, 130], e: [100, 100] }, { t: 240 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [50, 50] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 75 } },
          ],
        },
      ],
      ip: 0,
      op: 240,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Node2",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [60], e: [95] }, { t: 120, s: [95], e: [60] }, { t: 240 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [120, 250, 0] },
        s: { a: 1, k: [{ t: 0, s: [90, 90], e: [115, 115] }, { t: 120, s: [115, 115], e: [90, 90] }, { t: 240 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [45, 45] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 70 } },
          ],
        },
      ],
      ip: 0,
      op: 240,
      st: 0,
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Node3",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [55], e: [88] }, { t: 120, s: [88], e: [55] }, { t: 240 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [280, 280, 0] },
        s: { a: 1, k: [{ t: 0, s: [95, 95], e: [120, 120] }, { t: 120, s: [120, 120], e: [95, 95] }, { t: 240 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [48, 48] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 72 } },
          ],
        },
      ],
      ip: 0,
      op: 240,
      st: 0,
    },
  ],
};

// Floating particles component with varied colors
const FloatingParticle = ({ delay, x, duration }: { delay: number; x: string; duration: number }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full shadow-lg shadow-primary/30"
    initial={{ y: "100vh", opacity: 0 }}
    animate={{
      y: "-20vh",
      opacity: [0, 0.8, 1, 0.8, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{ left: x }}
  />
);

// Morphing blob background
const MorphingBlob = ({ index }: { index: number }) => (
  <motion.div
    className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
    style={{
      background: `radial-gradient(circle, hsl(16 100% 60% / 0.4), transparent)`,
    }}
    animate={{
      x: [0, 100, -100, 0],
      y: [0, -100, 100, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration: 20 + index * 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Timeline milestone component
interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats?: string;
}

const TimelineMilestone = ({ milestone, index, isInView }: { milestone: Milestone; index: number; isInView: boolean }) => (
  <motion.div
    className="relative flex items-center gap-6"
    initial={{ opacity: 0, x: -50 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.2 }}
  >
    {/* Animated glow */}
    <div className="absolute -left-6 w-12 h-12 z-0">
      {isInView && <Lottie animationData={timelineGlowAnimation} loop />}
    </div>
    
    {/* Icon container with pulsing effect */}
    <motion.div
      className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-xl shadow-primary/30"
      whileHover={{ scale: 1.15, rotate: 10 }}
      transition={{ type: "spring", stiffness: 400 }}
      animate={isInView ? { boxShadow: ["0 0 20px rgba(255, 107, 53, 0.3)", "0 0 40px rgba(255, 107, 53, 0.6)", "0 0 20px rgba(255, 107, 53, 0.3)"] } : {}}
    >
      {milestone.icon}
    </motion.div>

    {/* Content with gradient border */}
    <motion.div 
      className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md border-2 border-primary/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-bold text-primary tracking-wider">{milestone.year}</div>
        {milestone.stats && (
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="w-3 h-3" />
            {milestone.stats}
          </Badge>
        )}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
        {milestone.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
    </motion.div>
  </motion.div>
);

// 3D Card with mouse tracking
const Interactive3DCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const AboutV3: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Scroll progress for AI brain animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const brainRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const brainScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1.3, 1.3, 0.6]);
  const brainOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.8, 0.8, 0.2]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const milestones: Milestone[] = [
    {
      year: "2018",
      title: "Founded with Revolutionary Vision",
      description: "Born from a mission to democratize world-class education. Three passionate educators united with a dream to transform how students learn through personalized AI-enhanced instruction.",
      icon: <Rocket className="w-8 h-8 text-white" />,
      stats: "3 Founders",
    },
    {
      year: "2020",
      title: "50+ Elite Tutors Assembled",
      description: "Curated the top 5% of educators worldwide. Each tutor undergoes rigorous vetting, ensuring mastery in their subjects and excellence in teaching methodology.",
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      stats: "98% Expert Rate",
    },
    {
      year: "2022",
      title: "5,000+ Lives Transformed",
      description: "Reached a monumental milestone—helping over 5,000 students achieve academic breakthroughs, with 98% reporting significant grade improvements and renewed confidence.",
      icon: <Users className="w-8 h-8 text-white" />,
      stats: "5K+ Students",
    },
    {
      year: "2024",
      title: "AI Revolution Unleashed",
      description: "Pioneered cutting-edge AI integration: real-time learning path adaptation, predictive analytics, instant doubt resolution, and personalized study plans that evolve with each student.",
      icon: <Brain className="w-8 h-8 text-white" />,
      stats: "40% Faster Learning",
    },
  ];

  const impactStats = [
    { value: "15,000+", label: "Hours of Instruction", icon: <Clock className="w-6 h-6" />, color: "from-blue-500 to-cyan-500" },
    { value: "98%", label: "Success Rate", icon: <Award className="w-6 h-6" />, color: "from-primary to-orange-600" },
    { value: "4.9★", label: "Average Rating", icon: <Star className="w-6 h-6" />, color: "from-yellow-400 to-orange-500" },
    { value: "50+", label: "Subjects Covered", icon: <BookOpen className="w-6 h-6" />, color: "from-green-500 to-emerald-600" },
  ];

  return (
    <div ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Dynamic parallax gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10"
        style={{ y: parallaxY }}
      />

      {/* Morphing blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute" style={{ top: `${i * 30}%`, left: `${i * 25}%` }}>
            <MorphingBlob index={i} />
          </div>
        ))}
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            x={`${Math.random() * 100}%`}
            duration={8 + Math.random() * 12}
          />
        ))}
      </div>

      {/* Hero Section with AI Brain */}
      <section className="relative min-h-screen flex items-center py-20 md:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content with Advanced Stagger */}
            <motion.div
              className="space-y-8 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
              >
                <Badge variant="orange" className="gap-2 text-base px-4 py-2 shadow-lg shadow-primary/20">
                  <Sparkles className="w-5 h-5" />
                  Where AI Meets Human Excellence
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]"
                variants={{
                  hidden: { opacity: 0, x: -40, rotateX: -20 },
                  visible: { opacity: 1, x: 0, rotateX: 0 },
                }}
              >
                <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  The Future of Education
                </span>
                <span className="block mt-3 text-foreground/90">Started in 2018,</span>
                <span className="block mt-3 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
                  Perfected by AI Today
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-light"
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                What began as <span className="font-semibold text-primary">a bold vision</span> has evolved into{" "}
                <span className="font-semibold text-primary">the world's most advanced</span> AI-powered tutoring ecosystem—
                where every lesson adapts to you, every tutor is world-class, and every student thrives.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                {[
                  { icon: <Zap className="w-7 h-7 text-primary" />, title: "40% Faster Mastery", desc: "AI-optimized learning paths" },
                  { icon: <Target className="w-7 h-7 text-primary" />, title: "60% Better Retention", desc: "Adaptive reinforcement" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-md border-2 border-primary/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-lg font-bold">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link to="/start-trial" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full text-lg px-10 py-7 rounded-full group bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:scale-105 border-2 border-white/20"
                  >
                    <Rocket className="mr-2 h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:rotate-12" />
                    Start Free Trial
                    <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
                <Link to="/diagnostic-quiz" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-lg px-10 py-7 rounded-full border-2 border-primary/50 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all shadow-lg"
                  >
                    <Brain className="mr-2 h-6 w-6" />
                    Take AI Quiz
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: 3D Floating Card with Enhanced Video */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            >
              {/* Massive AI Brain Lottie - scroll-reactive */}
              <motion.div
                className="absolute -top-32 -right-32 w-96 h-96 pointer-events-none -z-10"
                style={{
                  rotate: brainRotate,
                  scale: brainScale,
                  opacity: brainOpacity,
                }}
              >
                <Lottie animationData={aiBrainAnimation} loop />
              </motion.div>

              {/* 3D Interactive Video Card */}
              <Interactive3DCard>
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Multi-layer glow effects */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-0 hover:opacity-30 blur-3xl transition-opacity duration-700 -z-10 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-orange-500/30 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                  
                  {/* Animated border gradients */}
                  <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-padding opacity-50 hover:opacity-100 transition-opacity -z-10" 
                    style={{ padding: "4px", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" }} 
                  />

                  <video
                    ref={videoRef}
                    className="w-full aspect-video object-cover relative z-10"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/videos/about-hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Enhanced video controls */}
                  <div className="absolute bottom-6 right-6 flex gap-3 z-20">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="icon"
                        onClick={toggleMute}
                        className="rounded-full w-14 h-14 bg-background/95 backdrop-blur-md hover:bg-primary text-foreground hover:text-white shadow-2xl hover:shadow-primary/50 transition-all border-2 border-primary/30 hover:border-primary"
                      >
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </Button>
                    </motion.div>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    className="absolute top-6 left-6 z-20"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Badge className="bg-primary/90 backdrop-blur-md text-white shadow-xl px-4 py-2 text-sm border-2 border-white/20">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI-Enhanced Platform
                    </Badge>
                  </motion.div>

                  {/* Animated corner accents */}
                  <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary/50 rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary/50 rounded-br-3xl" />
                </motion.div>
              </Interactive3DCard>

              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-primary/30 via-orange-500/20 to-transparent rounded-full blur-3xl -z-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section ref={statsRef} className="relative py-20 bg-gradient-to-b from-background via-primary/5 to-background">
        <motion.div
          className="container mx-auto px-6 lg:px-16"
          style={{ y: parallaxY2 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="orange" className="gap-2 mb-4">
              <TrendingUp className="w-4 h-4" />
              Real Impact, Real Results
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                By the Numbers
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 blur-xl transition-all rounded-3xl`} />
                <div className="relative p-8 rounded-3xl bg-card/80 backdrop-blur-md border-2 border-primary/20 group-hover:border-primary/50 transition-all shadow-lg group-hover:shadow-2xl">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 mx-auto text-white shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative py-20 md:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="orange" className="gap-2 mb-4 text-base px-4 py-2">
              <Sparkles className="w-5 h-5" />
              Our Evolution
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Every Milestone, A Revolution
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to AI-powered excellence—witness the journey that's transforming education
            </p>
          </motion.div>

          {/* Timeline with enhanced connecting line */}
          <div className="relative max-w-5xl mx-auto">
            {/* Glowing vertical line */}
            <motion.div
              className="absolute left-10 top-0 w-1 bg-gradient-to-b from-primary via-orange-500 to-primary rounded-full shadow-lg shadow-primary/50"
              initial={{ height: 0, opacity: 0 }}
              animate={isTimelineInView ? { height: "100%", opacity: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <TimelineMilestone
                  key={index}
                  milestone={milestone}
                  index={index}
                  isInView={isTimelineInView}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section with Enhanced Interactive Elements */}
      <section ref={philosophyRef} className="relative py-20 md:py-32 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
        {/* Background animated network */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Lottie animationData={philosophyTreeAnimation} loop />
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Enhanced Lottie with 3D effect */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -60, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Multi-layer glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-orange-500/40 to-secondary/40 blur-3xl -z-10 animate-pulse" />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-transparent to-orange-500 blur-2xl opacity-50 -z-10" />
                
                <Interactive3DCard>
                  <motion.div
                    className="relative p-8 rounded-3xl bg-card/60 backdrop-blur-xl border-2 border-primary/30 shadow-2xl"
                    whileHover={{ scale: 1.03 }}
                  >
                    <Lottie animationData={philosophyTreeAnimation} loop className="w-full h-full" />
                    
                    {/* Floating particles around Lottie */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        animate={{
                          x: [0, Math.cos(i * 45) * 60, 0],
                          y: [0, Math.sin(i * 45) * 60, 0],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 3 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                      />
                    ))}
                  </motion.div>
                </Interactive3DCard>
              </div>
            </motion.div>

            {/* Right: Enhanced Philosophy Content */}
            <motion.div
              className="space-y-8 order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Badge variant="orange" className="gap-2 text-base px-4 py-2">
                  <Brain className="w-5 h-5" />
                  The Philosophy That Drives Us
                </Badge>
              </motion.div>

              <motion.h2
                className="text-5xl md:text-6xl font-bold leading-tight"
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <span className="block bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
                  Human Brilliance,
                </span>
                <span className="block mt-2">Amplified by AI</span>
              </motion.h2>

              <motion.div
                className="space-y-6 text-lg leading-relaxed text-foreground/80"
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <p className="text-xl font-light">
                  We witnessed a fundamental problem: <span className="font-semibold text-primary">brilliant students struggling</span>—
                  not from lack of ability, but because <span className="font-semibold">traditional education couldn't adapt to their unique minds</span>.
                </p>

                <p>
                  So we asked: <span className="italic text-primary">"What if learning could be as unique as a fingerprint?"</span>
                </p>

                <p>
                  By fusing <span className="font-semibold text-primary">world-class human tutors</span> with{" "}
                  <span className="font-semibold text-primary">cutting-edge AI intelligence</span>, we created an ecosystem where:
                </p>

                <ul className="space-y-4 ml-4">
                  {[
                    "Every lesson adapts to your learning speed in real-time",
                    "AI predicts challenges before you encounter them",
                    "Tutors focus on mentoring, not just teaching",
                    "Your brain's natural patterns shape the curriculum",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-6 pt-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {[
                  { value: "40%", label: "Faster Learning", gradient: "from-blue-500 to-cyan-500" },
                  { value: "60%", label: "Better Retention", gradient: "from-primary to-orange-600" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    whileHover={{ scale: 1.05, y: -4 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 blur-xl transition-all rounded-2xl`} />
                    <div className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-md border-2 border-primary/20 group-hover:border-primary/50 transition-all shadow-lg">
                      <div className={`text-4xl font-bold mb-2 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link to="/diagnostic-quiz">
                  <Button
                    size="lg"
                    className="px-8 py-6 rounded-full group bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary shadow-xl shadow-primary/40 hover:shadow-primary/60 transition-all hover:scale-105"
                  >
                    <Brain className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    Experience AI Learning
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/tutors">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 rounded-full border-2 hover:border-primary hover:bg-primary/10 hover:scale-105 transition-all"
                  >
                    Meet Our Tutors
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Jaw-Dropping */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-orange-500/20 to-background"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        <div className="container mx-auto px-6 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="max-w-4xl mx-auto space-y-10"
          >
            {/* Animated icon */}
            <motion.div
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-2xl shadow-primary/50"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Rocket className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Ready to Unlock
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
                Your True Potential?
              </span>
            </h2>

            <p className="text-2xl md:text-3xl text-foreground/80 font-light max-w-3xl mx-auto">
              Join <span className="font-bold text-primary">5,000+ students</span> who've discovered the transformative power of{" "}
              <span className="font-bold text-primary">AI-enhanced personalized education</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link to="/start-trial">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="text-xl px-12 py-8 rounded-full group bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all border-2 border-white/20"
                  >
                    <Rocket className="mr-3 h-7 w-7 transition-transform group-hover:-translate-y-1 group-hover:rotate-12" />
                    Start Your Free Trial
                    <ArrowRight className="ml-3 h-7 w-7 transition-transform group-hover:translate-x-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/tutors">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-xl px-12 py-8 rounded-full border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all shadow-xl backdrop-blur-sm"
                  >
                    Browse Expert Tutors
                    <GraduationCap className="ml-3 h-7 w-7" />
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 pt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: <Award />, text: "98% Success Rate" },
                { icon: <Star />, text: "4.9★ Rating" },
                { icon: <Users />, text: "5,000+ Students" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5">{item.icon}</div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>
    </div>
  );
};

export default AboutV3;
