import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX, Sparkles, Brain, Users, GraduationCap, TrendingUp } from "lucide-react";

// Placeholder Lottie imports - replace with actual JSON files
// import aiBrainAnimation from "@/assets/lottie/aiBrain.json";
// import timelineGlowAnimation from "@/assets/lottie/timelineGlow.json";
// import philosophyTreeAnimation from "@/assets/lottie/philosophyTree.json";

// AI Brain Network Animation (Neural Network)
const aiBrainAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 180,
  w: 400,
  h: 400,
  nm: "AI Brain",
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
        o: { a: 1, k: [{ t: 0, s: [60], e: [100] }, { t: 90, s: [100], e: [60] }, { t: 180 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        s: { a: 1, k: [{ t: 0, s: [100, 100], e: [120, 120] }, { t: 90, s: [120, 120], e: [100, 100] }, { t: 180 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [30, 30] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 80 } },
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
      nm: "Node2",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [40], e: [90] }, { t: 90, s: [90], e: [40] }, { t: 180 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 150, 0] },
        s: { a: 1, k: [{ t: 0, s: [80, 80], e: [100, 100] }, { t: 90, s: [100, 100], e: [80, 80] }, { t: 180 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [25, 25] } },
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
      nm: "Node3",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [50], e: [85] }, { t: 90, s: [85], e: [50] }, { t: 180 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [300, 250, 0] },
        s: { a: 1, k: [{ t: 0, s: [90, 90], e: [110, 110] }, { t: 90, s: [110, 110], e: [90, 90] }, { t: 180 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [28, 28] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 75 } },
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
        s: { a: 1, k: [{ t: 0, s: [80, 80], e: [130, 130] }, { t: 90 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [40, 40] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 60 } },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
  ],
};

// Philosophy Tree Animation
const philosophyTreeAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 240,
  w: 300,
  h: 300,
  nm: "Tree",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Branch",
      sr: 1,
      ks: {
        o: { a: 0, k: 80 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [10] }, { t: 120, s: [10], e: [0] }, { t: 240 }] },
        p: { a: 0, k: [150, 200, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "rc", p: { a: 0, k: [0, -50] }, s: { a: 0, k: [8, 100] }, r: { a: 0, k: 4 } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 100 } },
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
      nm: "Leaves",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [60], e: [100] }, { t: 120, s: [100], e: [60] }, { t: 240 }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 100, 0] },
        s: { a: 1, k: [{ t: 0, s: [95, 95], e: [105, 105] }, { t: 120, s: [105, 105], e: [95, 95] }, { t: 240 }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [60, 60] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 70 } },
          ],
        },
      ],
      ip: 0,
      op: 240,
      st: 0,
    },
  ],
};

// Floating particles component
const FloatingParticle = ({ delay, x, duration }: { delay: number; x: string; duration: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary/40 rounded-full"
    initial={{ y: "100vh", opacity: 0 }}
    animate={{
      y: "-20vh",
      opacity: [0, 1, 1, 0],
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

// Timeline milestone component
interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TimelineMilestone = ({ milestone, index, isInView }: { milestone: Milestone; index: number; isInView: boolean }) => (
  <motion.div
    className="relative flex items-center gap-6"
    initial={{ opacity: 0, x: -50 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.2 }}
  >
    {/* Animated glow */}
    <div className="absolute -left-6 w-12 h-12">
      {isInView && <Lottie animationData={timelineGlowAnimation} loop />}
    </div>
    
    {/* Icon container */}
    <motion.div
      className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {milestone.icon}
    </motion.div>

    {/* Content */}
    <div className="flex-1 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
      <div className="text-sm font-semibold text-primary mb-1">{milestone.year}</div>
      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
      <p className="text-muted-foreground">{milestone.description}</p>
    </div>
  </motion.div>
);

const AboutV3: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" });

  // Scroll progress for AI brain animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const brainRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const brainScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const milestones: Milestone[] = [
    {
      year: "2018",
      title: "Founded with a Vision",
      description: "Started by passionate educators committed to personalized learning",
      icon: <Sparkles className="w-7 h-7 text-white" />,
    },
    {
      year: "2020",
      title: "50+ Expert Tutors",
      description: "Assembled a team of certified educators across all subjects",
      icon: <GraduationCap className="w-7 h-7 text-white" />,
    },
    {
      year: "2023",
      title: "5,000+ Students Taught",
      description: "Reached milestone of transforming thousands of lives",
      icon: <Users className="w-7 h-7 text-white" />,
    },
    {
      year: "2024",
      title: "AI-Enhanced Learning",
      description: "Integrated cutting-edge AI for personalized education paths",
      icon: <Brain className="w-7 h-7 text-white" />,
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Parallax gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10"
        style={{ y: parallaxY }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            x={`${Math.random() * 100}%`}
            duration={10 + Math.random() * 10}
          />
        ))}
      </div>

      {/* Hero Section with AI Brain */}
      <section className="relative min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content with Stagger Animation */}
            <motion.div
              className="space-y-8 relative z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
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
                <Badge variant="orange" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  About Our Mission
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Since 2018,
                </span>
                <span className="block mt-2">We've Been Redefining</span>
                <span className="block mt-2 text-primary">Online Education</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-foreground/80 leading-relaxed"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                What began as a small group of passionate educators has evolved into a leading AI-powered tutoring platform. 
                We believe every student deserves access to world-class instruction tailored to their unique learning style.
              </motion.p>

              <motion.div
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">98% Success Rate</div>
                    <div className="text-sm text-muted-foreground">Students achieve their goals</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">AI-Powered Insights</div>
                    <div className="text-sm text-muted-foreground">Personalized learning paths</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link to="/start-trial" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full text-base px-8 py-6 rounded-full group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/tutors" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-base px-8 py-6 rounded-full border-2 hover:border-primary hover:bg-primary/5 hover:scale-105 transition-all"
                  >
                    Meet Our Tutors
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: 3D Floating Card with Video */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {/* AI Brain Lottie - responds to scroll */}
              <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 opacity-30 pointer-events-none -z-10"
                style={{
                  rotate: brainRotate,
                  scale: brainScale,
                }}
              >
                <Lottie animationData={aiBrainAnimation} loop />
              </motion.div>

              {/* Floating video card with 3D tilt effect */}
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary/20"
                whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />

                <video
                  ref={videoRef}
                  className="w-full aspect-video object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/New Project 23 [3C86411].mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video controls */}
                <div className="absolute bottom-6 right-6">
                  <Button
                    size="icon"
                    onClick={toggleMute}
                    className="rounded-full w-12 h-12 bg-background/90 backdrop-blur-sm hover:bg-background text-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                </div>

                {/* Animated top border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </motion.div>

              {/* Decorative gradient blobs */}
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-20 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative py-20 md:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="orange" className="gap-2 mb-4">
              <Sparkles className="w-4 h-4" />
              Our Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Milestones That Matter
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small team to a thriving community of learners and educators
            </p>
          </motion.div>

          {/* Timeline with connecting line */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical connecting line */}
            <motion.div
              className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent"
              initial={{ height: 0 }}
              animate={isTimelineInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <div className="space-y-12">
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

      {/* Philosophy Section with Interactive Lottie */}
      <section ref={philosophyRef} className="relative py-20 md:py-32 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Interactive Philosophy Tree Lottie */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Glow effect behind Lottie */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl -z-10 animate-pulse" />
                
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Lottie animationData={philosophyTreeAnimation} loop className="w-full h-full" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Philosophy Content */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
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
                <Badge variant="orange" className="gap-2">
                  <Brain className="w-4 h-4" />
                  Our Philosophy
                </Badge>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold"
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Human Expertise
                </span>
                <span className="block mt-2">Meets AI Innovation</span>
              </motion.h2>

              <motion.p
                className="text-lg text-foreground/80 leading-relaxed"
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                We saw talented students struggling—not because they lacked ability, but because traditional 
                one-size-fits-all teaching methods didn't match their unique learning styles.
              </motion.p>

              <motion.p
                className="text-lg text-foreground/80 leading-relaxed"
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                By combining the irreplaceable value of expert human tutors with the revolutionary capabilities 
                of artificial intelligence, we created something extraordinary: a learning platform that adapts 
                to each student in real-time.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-4 pt-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
                  <div className="text-3xl font-bold text-primary mb-1">40%</div>
                  <div className="text-sm text-muted-foreground">Faster Learning</div>
                </div>
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all">
                  <div className="text-3xl font-bold text-primary mb-1">60%</div>
                  <div className="text-sm text-muted-foreground">Better Retention</div>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link to="/diagnostic-quiz">
                  <Button
                    size="lg"
                    className="mt-4 px-8 py-6 rounded-full group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
                  >
                    Experience AI Learning
                    <Brain className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Ready to Transform Your Learning?
              </span>
            </h2>
            <p className="text-xl text-foreground/80">
              Join 5,000+ students who've already discovered the power of AI-enhanced personalized tutoring
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/start-trial">
                <Button
                  size="lg"
                  className="px-8 py-6 rounded-full group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/tutors">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 rounded-full border-2 hover:border-primary hover:bg-primary/5 hover:scale-105 transition-all"
                >
                  Browse Expert Tutors
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutV3;
