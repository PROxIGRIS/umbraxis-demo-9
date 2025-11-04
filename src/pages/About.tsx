import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX, Sparkles, Brain } from "lucide-react";

// About.tsx — premium, spacious, responsive — styled like the Hero section.
// Video wired to /videos/New Project 23 [3C86411].mp4

const spiralAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 240,
  w: 200,
  h: 200,
  nm: "Spiral",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle1",
      sr: 1,
      ks: {
        o: { a: 0, k: 60 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 240 }] },
        p: { a: 0, k: [100, 100, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [50, 0] }, s: { a: 0, k: [26, 26] } },
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 80 } },
          ],
        },
      ],
      ip: 0,
      op: 240,
      st: 0,
    },
  ],
};

const About: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background py-12">
      {/* Interactive cursor glow (hidden on small screens) */}
      <div
        className="hidden md:block fixed w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none transition-all duration-300 ease-out -z-10"
        style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
      />

      {/* Decorative Lotties placed like hero */}
      <div className="absolute top-16 left-8 w-40 h-40 opacity-25 pointer-events-none animate-pulse">
        <Lottie animationData={spiralAnimation} loop />
      </div>
      <div className="absolute bottom-16 right-12 w-48 h-48 opacity-20 pointer-events-none">
        <Lottie animationData={spiralAnimation} loop />
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: spacious copy similar to Hero */}
          <div className="space-y-8 relative z-10">
            <Badge variant="orange" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Premium Tuition
            </Badge>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient">
                  Premium, Focused
                </span>
                <span className="block mt-2">Tuition That Delivers</span>
                <span className="block mt-2 text-primary">One-to-one. Data-driven. Fast.</span>
              </h1>

              <p className="text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed">
                We combine seasoned tutors with intelligent study-planning tools. Placeholder details below describe the tuition offering. Replace with real content when ready.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/start-trial" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full text-base px-8 py-6 rounded-full group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/tutors" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-base px-8 py-6 rounded-full border-2 hover:border-primary hover:text-primary hover:scale-105 transition-all"
                >
                  Meet Our Tutors
                </Button>
              </Link>
            </div>

            {/* Stats showcase */}
            <div className="grid grid-cols-3 gap-8 pt-8 max-w-md">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Students Taught</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Expert Tutors</div>
              </div>
            </div>

            {/* Placeholder tuition details */}
            <div className="mt-8 max-w-xl space-y-4">
              <h3 className="text-lg font-semibold">What we teach (placeholder)</h3>
              <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-2">
                <li>One-on-one subject tutoring (Maths, Physics, Chemistry, Biology, English)</li>
                <li>Exam-focused coaching (boards, entrance tests)</li>
                <li>Personalized study plans and weekly mentor reviews</li>
                <li>Adaptive practice engine and progress dashboard</li>
                <li>Routine & accountability builtin — no fluff</li>
              </ul>

              <p className="text-xs text-muted-foreground">Note: These are placeholder features used for presentation only and not real product details.</p>
            </div>
          </div>

          {/* Right: video panel styled exactly like hero */}
          <div className="relative animate-scale-in space-y-6">
            {/* Diagnostic CTA card (keeps structure from Hero) */}
            <Link to="/diagnostic-quiz">
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02] cursor-pointer group shadow-lg hover:shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Take Free Diagnostic</h3>
                    <p className="text-sm text-muted-foreground">A quick assessment to design your first 30-day plan</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI-Powered
                  </Badge>
                  <Badge variant="secondary">Personal Roadmap</Badge>
                  <Badge variant="secondary">Tutor Match</Badge>
                </div>
              </div>
            </Link>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500 group">
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              >
                <source src={'/videos/New Project 23 [3C86411].mp4'} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-6 right-6 flex gap-3">
                <Button
                  size="icon"
                  onClick={toggleMute}
                  className="rounded-full w-12 h-12 bg-background/90 backdrop-blur-sm hover:bg-background text-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl border-4 border-primary/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 animate-bounce">
              <Badge className="bg-primary text-primary-foreground shadow-xl px-4 py-2">Learn Smarter. Achieve Faster.</Badge>
            </div>

            {/* Decorative gradient blobs */}
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Large decorative gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default About;
