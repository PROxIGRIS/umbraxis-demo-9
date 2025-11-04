import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Sparkles, BookOpen, Globe, ArrowRight, Play } from "lucide-react";

// Clean, premium, responsive About page for a tuition site.
// Uses the ad/video at: /videos/New Project 23 [3C86411].mp4

const subtleSpiral = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: "Subtle",
  ddd: 0,
  assets: [],
  layers: [
    { ddd: 0, ind: 1, ty: 4, nm: "c", sr: 1, ks: { o: { a: 0, k: 60 }, r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 120 }] }, p: { a: 0, k: [100, 100, 0] }, s: { a: 0, k: [90, 90, 100] } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "el", p: { a: 0, k: [50, 0] }, s: { a: 0, k: [28, 28] } }, { ty: "fl", c: { a: 0, k: [0.07, 0.62, 0.95, 0.08] }, o: { a: 0, k: 100 } }] }], ip: 0, op: 120, st: 0 }
  ],
};

const AnimatedNumber: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = "" }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 900;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(progress * to);
      setValue(current);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{value}{suffix}</span>;
};

const StatCard: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-start gap-1">
    <div className="text-3xl md:text-4xl font-extrabold text-primary">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const About: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    // only attach on devices that support hover
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  return (
    <main className="relative bg-background/50 min-h-screen text-foreground">
      {/* Subtle cursor glow for non-touch devices */}
      <div
        aria-hidden
        className="hidden md:block fixed w-64 h-64 rounded-full bg-primary/8 blur-3xl pointer-events-none -z-10 transition-all"
        style={{ left: mouse.x - 160, top: mouse.y - 160 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: clean spacious copy */}
          <div className="space-y-6 md:pr-8">
            <Badge variant="orange" className="px-3 py-2 text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" /> Premium Tuition
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-2xl">
              Tailored tuition that feels premium — simple, calm, and effective.
            </h1>

            <p className="text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              One-to-one mentoring, AI-backed study plans, and a system designed to build mastery with minimal chaos. Clean learning, visible progress — for students who want real results.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link to="/start-trial" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-6 py-3 shadow-md bg-gradient-to-r from-primary to-secondary">Start Free Trial</Button>
              </Link>
              <Link to="/tutors" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-6 py-3">See Tutors</Button>
              </Link>
            </div>

            {/* Stats row - compact and responsive */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl">
              <StatCard value={<AnimatedNumber to={5000} suffix="+" />} label="Students taught" />
              <StatCard value={<AnimatedNumber to={98} suffix="%" />} label="Avg. score increase" />
              <StatCard value={<AnimatedNumber to={50} />} label="Expert mentors" />
              <StatCard value={<AnimatedNumber to={1200} />} label="Hours of content" />
            </div>
          </div>

          {/* Right: video ad + soft cards */}
          <div className="w-full flex flex-col gap-6 items-stretch">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-primary/10">
              {/* Video ad: responsive and accessible */}
              <video
                ref={videoRef}
                className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover"
                src={'/videos/New Project 23 [3C86411].mp4'}
                poster="/images/video-poster.jpg"
                muted
                loop
                playsInline
                aria-label="Promo video"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

              {/* Controls */}
              <div className="absolute left-4 top-4">
                <button onClick={toggleVideo} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 hover:scale-105 transition">
                  <Play className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">{playing ? 'Pause' : 'Preview'}</span>
                </button>
              </div>

              <div className="absolute right-4 bottom-4">
                <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-3 py-1 shadow">Learn smarter. Achieve faster.</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/60 border border-primary/8 shadow-sm">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">Outcome focused</div>
                    <div className="text-sm text-muted-foreground">We measure what matters: mastery.</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-primary/8 shadow-sm">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">Human-led</div>
                    <div className="text-sm text-muted-foreground">Tutors use tech, tech doesn't replace tutors.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacious mission / values */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 rounded-2xl p-8 bg-background/50 border border-primary/8 shadow-md">
            <h2 className="text-2xl font-bold">Our mission</h2>
            <p className="mt-3 text-sm text-foreground/80 max-w-3xl leading-relaxed">
              To provide calm, effective, and measurable tuition. We remove noise and focus on practice, feedback, and consistent coaching.
              This is placeholder text — update with your story and tone.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background/60 border border-primary/6">
                <div className="font-semibold">Clarity</div>
                <div className="text-sm text-muted-foreground">Clear goals, clear plans.</div>
              </div>
              <div className="p-4 rounded-lg bg-background/60 border border-primary/6">
                <div className="font-semibold">Consistency</div>
                <div className="text-sm text-muted-foreground">Stable schedules, measured gains.</div>
              </div>
              <div className="p-4 rounded-lg bg-background/60 border border-primary/6">
                <div className="font-semibold">Care</div>
                <div className="text-sm text-muted-foreground">Real human mentors who listen.</div>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl p-6 bg-background/50 border border-primary/8 shadow-md">
            <h3 className="text-lg font-bold">Contact</h3>
            <p className="text-sm text-muted-foreground mt-2">hello@tutors.example · +91 90000 00000</p>
            <div className="mt-4">
              <Link to="/book">
                <Button size="sm" className="w-full rounded-full">Book a free call</Button>
              </Link>
            </div>
          </aside>
        </section>

        {/* Team & timeline compact */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-xl p-6 bg-background/50 border border-primary/8 shadow-sm">
            <h3 className="text-lg font-bold mb-3">Meet the team</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'A. Kumar', role: 'Founder' },
                { name: 'M. Lal', role: 'Head Mentor' },
                { name: 'S. Shah', role: 'Curriculum' },
                { name: 'R. Khan', role: 'Engineering' }
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">{m.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-sm text-muted-foreground">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl p-6 bg-background/50 border border-primary/8 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Timeline</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-primary/90 mt-2" />
                <div>
                  <div className="font-semibold">2018</div>
                  <div>Started with a single classroom.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-primary/90 mt-2" />
                <div>
                  <div className="font-semibold">2021</div>
                  <div>Launched online classes and mentor program.</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-primary/90 mt-2" />
                <div>
                  <div className="font-semibold">2024</div>
                  <div>5,000+ students taught.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* final CTA */}
        <section className="mt-16 py-10 px-6 rounded-2xl bg-gradient-to-r from-primary/6 to-secondary/6 border border-primary/8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Start with a free diagnostic</h3>
            <p className="text-sm text-muted-foreground">Free 20-minute mentor call to plan the first 30 days.</p>
          </div>

          <div className="flex gap-3">
            <Link to="/start-trial">
              <Button size="lg" className="rounded-full px-6 py-3 bg-gradient-to-r from-primary to-secondary">Start Free Trial</Button>
            </Link>
            <Link to="/book">
              <Button size="lg" variant="outline" className="rounded-full px-6 py-3">Book Call</Button>
            </Link>
          </div>
        </section>

      </div>

      {/* subtle bottom glow */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-primary/6 to-transparent pointer-events-none" />

      <style>{`
        /* keep animations subtle and safe for mobile */
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 6s linear infinite; }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @media (max-width: 640px) {
          .animate-marquee { display:none; }
        }
      `}</style>
    </main>
  );
};

export default About;
    
