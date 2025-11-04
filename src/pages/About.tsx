import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Volume2, VolumeX, Sparkles, Brain, Play } from "lucide-react";

// AboutV2.tsx — polished, responsive, premium About page styled like Hero

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
        o: { a: 0, k: 80 },
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
            { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 240,
      st: 0,
    },
  ],
};

const AboutV2: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background py-12">
      <div
        className="hidden md:block fixed w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none transition-all duration-300 ease-out -z-10"
        style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
      />

      <div className="absolute top-20 left-10 w-40 h-40 opacity-25 pointer-events-none animate-pulse">
        <Lottie animationData={spiralAnimation} loop />
      </div>
      <div className="absolute bottom-20 right-20 w-48 h-48 opacity-20 pointer-events-none">
        <Lottie animationData={spiralAnimation} loop />
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <Badge variant="orange" className="gap-2">
              <Sparkles className="w-4 h-4" />
              About Our Tuition
            </Badge>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient">Since 2018,</span>
                <span className="block mt-2">We’ve Redefined Learning</span>
                <span className="block mt-2 text-primary">Through AI & Human Excellence</span>
              </h1>

              <p className="text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed">
                Founded in 2018, our tuition network grew from one classroom to a nationwide learning platform. We’ve built a faculty of over 50 expert tutors and helped more than 5,000 students excel through personalized mentorship, focused strategy, and adaptive technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/start-trial" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base px-8 py-6 rounded-full group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/tutors" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-base px-8 py-6 rounded-full border-2 hover:border-primary hover:text-primary hover:scale-105 transition-all">
                  Meet Tutors
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 max-w-md">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">2018</div>
                <div className="text-sm text-muted-foreground">Founded</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Expert Tutors</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Students Taught</div>
              </div>
            </div>

            <div className="mt-8 text-sm text-foreground/80 max-w-lg leading-relaxed">
              <p>Our programs blend interactive video sessions, AI-curated practice, and personalized mentor feedback. Every student’s path is uniquely structured — never one-size-fits-all.</p>
              <p className="mt-3 text-xs text-muted-foreground">All details here are placeholder examples for presentation purposes only.</p>
            </div>
          </div>

          <div className="relative animate-scale-in space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500 group">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <video
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  src={'/videos/New Project 23 [3C86411].mp4'}
                />
              </div>

              <div className="absolute bottom-6 right-6 flex gap-3">
                <Button size="icon" onClick={toggleMute} className="rounded-full w-12 h-12 bg-background/90 backdrop-blur-sm hover:bg-background text-foreground shadow-lg hover:scale-110 transition-all">
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Button size="icon" onClick={togglePlay} className="rounded-full w-12 h-12 bg-background/90 backdrop-blur-sm hover:bg-background text-foreground shadow-lg hover:scale-110 transition-all">
                  <Play className="h-5 w-5" />
                </Button>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-background/60 border border-primary/10 shadow-md space-y-4">
              <h3 className="text-lg font-bold">Dynamic AI Quiz (Placeholder)</h3>
              <p className="text-sm text-foreground/85">Our AI quiz revolutionizes assessment. No static questions — every quiz is uniquely generated based on subject, level, and performance history. Just 8 questions reveal your strengths, weaknesses, and optimal 90-day plan.</p>

              <ul className="list-disc pl-5 text-sm space-y-2 text-foreground/85">
                <li>Personalized strength & weakness report</li>
                <li>90-day tailored learning roadmap</li>
                <li>Tutor recommendations matched by AI</li>
                <li>Downloadable result summary</li>
                <li>Each quiz is at least 30% unique even for same subject & level</li>
              </ul>

              <p className="text-sm text-primary font-semibold">Why it matters</p>
              <p className="text-sm text-foreground/85">Our AI quiz ensures every assessment feels fresh and insightful. Students gain immediate clarity — what to fix, how to learn, and who can guide them. It’s faster, smarter, and more adaptive than any static test.</p>

              <p className="mt-4 text-xs text-muted-foreground">Disclaimer: All details provided here are placeholders for presentation only.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <style>{`
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 6s linear infinite; }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </section>
  );
};

export default AboutV2;
