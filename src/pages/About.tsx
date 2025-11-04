import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Sparkles, BookOpen, Globe, ArrowRight, Play } from "lucide-react";

// NOTE: This is a very flashy placeholder About page for a tutoring site.
// Replace /assets/lottie and /videos placeholders with real files when ready.

const spiral = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: "Spiral",
  ddd: 0,
  assets: [],
  layers: [
    { ddd: 0, ind: 1, ty: 4, nm: "c", sr: 1, ks: { o: { a: 0, k: 80 }, r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 120 }] }, p: { a: 0, k: [100, 100, 0] }, s: { a: 0, k: [100, 100, 100] } }, ao: 0, shapes: [{ ty: "gr", it: [{ ty: "el", p: { a: 0, k: [50, 0] }, s: { a: 0, k: [30, 30] } }, { ty: "fl", c: { a: 0, k: [0.07, 0.62, 0.95, 1] }, o: { a: 0, k: 100 } }] }], ip: 0, op: 120, st: 0 }
  ],
};

const sparkles = spiral; // quick reuse for placeholders

const Counter = ({ end, label }: { end: number; label: string }) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / 30);
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else setValue(start);
    }, Math.max(10, stepTime));
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="bg-gradient-to-br from-background/60 to-primary/5 p-4 rounded-xl text-center shadow-xl border border-primary/10">
      <div className="text-4xl md:text-5xl font-extrabold text-primary">{value}{end >= 1000 ? '+' : ''}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const About: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  return (
    <main className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-background via-secondary to-background overflow-hidden">
      {/* chunky neon cursor glow */}
      <div
        aria-hidden
        className="fixed w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none transition-all duration-300 ease-out -z-10"
        style={{ left: mouse.x - 240, top: mouse.y - 240 }}
      />

      {/* animated corner Lotties */}
      <div className="absolute top-10 left-8 w-44 h-44 opacity-30 pointer-events-none animate-spin-slow">
        <Lottie animationData={spiral} loop />
      </div>
      <div className="absolute bottom-10 right-8 w-56 h-56 opacity-25 pointer-events-none animate-pulse">
        <Lottie animationData={sparkles} loop />
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-16">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left hero content */}
          <div className="space-y-6 z-20">
            <Badge variant="orange" className="px-3 py-2 text-sm font-medium shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              Tution | Live & Online
            </Badge>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary animate-gradient">
                We don't teach, we forge champions.
              </span>
              <span className="block mt-2 text-primary">Fast. Focused. Unforgivingly Effective.</span>
            </h1>

            <p className="text-lg text-foreground/80 max-w-2xl leading-relaxed">
              Hyper-personalized one-on-one tutoring with a heavy dose of tech. AI-backed study plans, live mentor accountability, and results you can measure in weeks — not years. Placeholder content: swap this with your mission statement.
            </p>

            <div className="flex gap-4 flex-col sm:flex-row mt-4">
              <Link to="/start-trial" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4 rounded-full shadow-2xl hover:scale-105 transform transition-all bg-gradient-to-r from-primary to-secondary">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link to="/curriculum" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 rounded-full">
                  View Curriculum
                </Button>
              </Link>
            </div>

            {/* flashy stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Counter end={5000} label="Students Taught" />
              <Counter end={98} label="Average Score Increase" />
              <Counter end={50} label="Expert Mentors" />
              <Counter end={1200} label="Hours of Content" />
            </div>

            {/* marquee testimonials */}
            <div className="mt-6 overflow-hidden rounded-lg border border-primary/8 bg-background/50 py-3">
              <div className="whitespace-nowrap animate-marquee text-sm text-foreground/80 px-6">
                “I improved my math score by 32% in 6 weeks” — Student A • “Never seen tutoring like this” — Parent B • “Finally, tutors who actually plan.” — Student C • placeholder testimonial • placeholder testimonial •
              </div>
            </div>
          </div>

          {/* Right media + interactive panel */}
          <aside className="relative">
            {/* floating interactive card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary/10 transition-transform hover:scale-[1.01] transform-gpu">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-72 object-cover group"
                  src="/videos/about-flashy.mp4"
                  muted
                  loop
                  playsInline
                />

                {/* glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                {/* play toggle */}
                <button
                  onClick={toggleVideo}
                  className="absolute left-6 top-6 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform border border-white/10"
                >
                  <Play className="w-5 h-5 text-white" />
                  <span className="text-sm text-white">{playing ? 'Pause' : 'Preview'}</span>
                </button>

                {/* glowing badge */}
                <div className="absolute right-6 bottom-6">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 shadow-2xl">Learn Smarter. Achieve Faster.</Badge>
                </div>
              </div>

              {/* 3D tilt card row */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-background/5">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/6 to-secondary/6 border border-primary/8 transform hover:-translate-y-2 transition-all shadow-lg">
                  <div className="font-bold">AI-Powered Roadmaps</div>
                  <div className="text-sm text-muted-foreground mt-1">Custom study paths that adapt with your performance.</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/6 to-secondary/6 border border-primary/8 transform hover:-translate-y-2 transition-all shadow-lg">
                  <div className="font-bold">Live Mentor Sessions</div>
                  <div className="text-sm text-muted-foreground mt-1">Scheduled accountability with personal feedback.</div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/6 to-secondary/6 border border-primary/8 transform hover:-translate-y-2 transition-all shadow-lg">
                  <div className="font-bold">Practice Engine</div>
                  <div className="text-sm text-muted-foreground mt-1">Adaptive drills that zero in on weakness.</div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/6 to-secondary/6 border border-primary/8 transform hover:-translate-y-2 transition-all shadow-lg">
                  <div className="font-bold">Progress Dashboard</div>
                  <div className="text-sm text-muted-foreground mt-1">Live metrics parents and students can trust.</div>
                </div>
              </div>
            </div>

            {/* floating CTA */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow-lg flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/20">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-bold">Ready to crush exams?</div>
                <div className="text-sm text-muted-foreground">Book a free 20-minute mentor call — placeholder booking flow.</div>
              </div>
              <Link to="/book">
                <Button size="sm" className="rounded-full px-5 py-2">Book Now</Button>
              </Link>
            </div>

            {/* neon blob */}
            <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-gradient-to-br from-primary/40 to-secondary/20 rounded-full blur-3xl -z-10 animate-pulse" />
          </aside>
        </section>

        {/* Mission / Vision extra flashy section */}
        <section className="mt-16">
          <div className="rounded-2xl p-8 bg-gradient-to-r from-primary/6 to-secondary/6 border border-primary/10 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold">Mission</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl">To turn average students into confident, exam-ready winners by combining brutal clarity, relentless practice, and smart tech. This is placeholder mission copy — replace with your real mission.</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-background/60 border border-primary/8">
                    <div className="font-semibold">Outcome First</div>
                    <div className="text-sm text-muted-foreground">We judge every decision by measurable student gains.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-background/60 border border-primary/8">
                    <div className="font-semibold">Human-Led</div>
                    <div className="text-sm text-muted-foreground">Technology supports tutors, tutors support students.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-background/60 border border-primary/8">
                    <div className="font-semibold">Cheap, Not Cheapened</div>
                    <div className="text-sm text-muted-foreground">High-quality results for accessible prices.</div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3">
                <div className="rounded-xl overflow-hidden border border-primary/8 shadow-lg">
                  <img src="/images/placeholder-classroom.jpg" alt="classroom" className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <div className="font-bold">Hands-on sessions</div>
                    <div className="text-sm text-muted-foreground">Placeholder: real session snapshots go here.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team + Timeline */}
        <section className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="rounded-xl p-6 bg-background/60 border border-primary/8 shadow-sm">
            <h3 className="text-lg font-bold mb-3">Meet the Team</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'A. Kumar', role: 'Founder' },
                { name: 'M. Lal', role: 'Head Mentor' },
                { name: 'S. Shah', role: 'Curriculum' },
                { name: 'R. Khan', role: 'Engineering' }
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">{m.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-sm text-muted-foreground">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl p-6 bg-background/60 border border-primary/8 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-primary/90 mt-2" />
                <div>
                  <div className="font-semibold">2018</div>
                  <div className="text-sm text-muted-foreground">Started with a single classroom and one stubborn teacher.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-primary/90 mt-2" />
                <div>
                  <div className="font-semibold">2021</div>
                  <div className="text-sm text-muted-foreground">Launched online live classes and first mentor program.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-primary/90 mt-2" />
                <div>
                  <div className="font-semibold">2024</div>
                  <div className="text-sm text-muted-foreground">5,000+ students taught. Placeholder — congratulate us.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ + trust */}
        <section className="mt-12 grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">Why trust us?</h3>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">Because we show the numbers, share the methods, and fix what doesn't work. Also: free diagnostics and a refund if we don't improve scores in 30 days — placeholder policy.</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border border-primary/8">
                <div className="font-semibold">Verified mentors</div>
                <div className="text-sm text-muted-foreground">Trials, demos, and checks for every tutor.</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-primary/8">
                <div className="font-semibold">Transparent pricing</div>
                <div className="text-sm text-muted-foreground">No sneaky auto-charges. Placeholder plans.</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">Partners</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">Top Schools</Badge>
              <Badge variant="secondary">Regional Awards</Badge>
              <Badge variant="secondary">5-star Reviews</Badge>
              <Badge variant="secondary">Trusted by Parents</Badge>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Contact</h4>
              <p className="text-sm text-muted-foreground">hello@tutors.example · +91 90000 00000</p>
            </div>
          </div>
        </section>

        {/* final CTA full width */}
        <section className="mt-16 py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/8 to-secondary/8 border border-primary/8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Get a free diagnostic call</h3>
            <p className="text-sm text-muted-foreground">Placeholder CTA: Free 20 minute mentor call to size up needs and plan the first 30 days.</p>
          </div>

          <div className="flex gap-4">
            <Link to="/start-trial">
              <Button size="lg" className="rounded-full px-8 py-4 bg-gradient-to-r from-primary to-secondary">Start Free Trial</Button>
            </Link>
            <Link to="/book">
              <Button size="lg" variant="outline" className="rounded-full px-8 py-4">Book Call</Button>
            </Link>
          </div>
        </section>

      </div>

      {/* bottom glow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-primary/6 to-transparent pointer-events-none" />

      {/* small utility styles (make sure Tailwind includes these in your build) */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-block; animation: marquee 18s linear infinite; }
        .animate-spin-slow { animation: spin 18s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 6s linear infinite; }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </main>
  );
};

export default About;
