import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Sparkles, BookOpen, Globe, ArrowRight } from "lucide-react";

// Re-using a compact spiral animation (keeps bundle small) — you can swap with a real JSON.
const spiralAnimation = {
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
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle1",
      sr: 1,
      ks: {
        o: { a: 0, k: 80 },
        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 120 }] },
        p: { a: 0, k: [100, 100, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [50, 0] }, s: { a: 0, k: [20, 20] } },
            { ty: "fl", c: { a: 0, k: [0.07, 0.62, 0.95, 1] }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
    },
  ],
};

const Stat = ({ value, label }: { value: React.ReactNode; label: string }) => (
  <div className="space-y-1">
    <div className="text-3xl md:text-4xl font-extrabold text-primary">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

const About: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-background via-secondary to-background overflow-hidden">
      {/* subtle cursor glow */}
      <div
        aria-hidden
        className="fixed w-80 h-80 rounded-full bg-primary/6 blur-3xl pointer-events-none transition-all duration-300 ease-out -z-10"
        style={{ left: mouse.x - 160, top: mouse.y - 160 }}
      />

      {/* decorative Lotties */}
      <div className="absolute top-10 right-8 w-36 h-36 opacity-30 pointer-events-none animate-spin-slow">
        <Lottie animationData={spiralAnimation} loop />
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-20">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10" ref={headerRef}>
            <Badge className="gap-2" variant="orange">
              <Sparkles className="w-4 h-4" /> About Us
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              We build learning systems that actually work
            </h1>

            <p className="text-lg md:text-xl text-foreground/85 max-w-xl leading-relaxed">
              A pragmatic team of educators, designers, and engineers. We combine human-first tutoring
              with AI-driven tools to accelerate learning. No gimmicks. Just measurable progress and
              ruthless focus on outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/start-trial" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full px-8 py-5 shadow-lg hover:scale-105">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full rounded-full px-8 py-5">
                  Get In Touch
                </Button>
              </Link>
            </div>

            {/* Core stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-md">
              <Stat value={<span>5000+</span>} label="Students Taught" />
              <Stat value={<span>98%</span>} label="Avg. Course Completion" />
              <Stat value={<span>50+</span>} label="Expert Tutors" />
            </div>

            {/* Values cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-background/60 border border-primary/10 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <div className="font-semibold">Outcome First</div>
                </div>
                <div className="text-sm text-muted-foreground">Design decisions are judged by results.</div>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-primary/10 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div className="font-semibold">Human + AI</div>
                </div>
                <div className="text-sm text-muted-foreground">Tutors augmented by AI, never replaced.</div>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-primary/10 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <div className="font-semibold">Accessible</div>
                </div>
                <div className="text-sm text-muted-foreground">High quality learning for any budget.</div>
              </div>
            </div>
          </div>

          {/* Right column: Team card + timeline + visual */}
          <aside className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-primary/10 transition-transform hover:scale-[1.01]">
              <div className="p-6 bg-gradient-to-br from-primary/8 to-secondary/6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Meet the team</h3>
                    <p className="text-sm text-muted-foreground">A small group of specialists obsessed with impact.</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {/* sample team members — replace with real data */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">AK</div>
                    <div>
                      <div className="font-semibold">A.K.</div>
                      <div className="text-sm text-muted-foreground">Founder & CEO</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold">ML</div>
                    <div>
                      <div className="font-semibold">M.L.</div>
                      <div className="text-sm text-muted-foreground">Head of Product</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-foreground to-primary flex items-center justify-center text-white font-bold">SS</div>
                    <div>
                      <div className="font-semibold">S.S.</div>
                      <div className="text-sm text-muted-foreground">Curriculum Lead</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-foreground flex items-center justify-center text-white font-bold">RK</div>
                    <div>
                      <div className="font-semibold">R.K.</div>
                      <div className="text-sm text-muted-foreground">Engineering</div>
                    </div>
                  </div>
                </div>

                {/* timeline */}
                <div className="mt-6 border-t border-primary/10 pt-4">
                  <h4 className="text-sm font-semibold">Our story</h4>

                  <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
                    <li>
                      <span className="inline-block mr-2 w-2 h-2 rounded-full bg-primary/80" />
                      2019 — Founded with a single classroom and one mission.
                    </li>
                    <li>
                      <span className="inline-block mr-2 w-2 h-2 rounded-full bg-primary/80" />
                      2021 — Launched 1:1 tutoring and first AI study helper.
                    </li>
                    <li>
                      <span className="inline-block mr-2 w-2 h-2 rounded-full bg-primary/80" />
                      2024 — 5,000+ students taught and growing.
                    </li>
                  </ol>
                </div>
              </div>

              {/* visual area (video fallback) */}
              <div className="relative">
                <video
                  className="w-full h-56 object-cover"
                  src="/videos/about-hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                <div className="absolute left-6 bottom-6">
                  <Badge className="bg-primary text-primary-foreground shadow-xl px-4 py-2">Learn Smarter. Achieve Faster.</Badge>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold">Ready to level up?</h5>
                  <p className="text-sm text-muted-foreground">Start with a free diagnostic and a personalized roadmap.</p>
                </div>
                <Link to="/diagnostic-quiz">
                  <Button size="sm" className="rounded-full px-4 py-2">Try Quiz</Button>
                </Link>
              </div>
            </div>

            {/* decorative blobs */}
            <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
          </aside>
        </section>

        {/* Vision / Mission section */}
        <section className="mt-20 grid lg:grid-cols-3 gap-8 items-start">
          <div className="rounded-xl p-6 bg-background/60 border border-primary/8 shadow-sm">
            <h3 className="text-lg font-bold mb-2">Our Mission</h3>
            <p className="text-sm text-muted-foreground">To democratize high-quality education with precise tutoring and practical tools that move the needle.</p>
          </div>

          <div className="rounded-xl p-6 bg-background/60 border border-primary/8 shadow-sm">
            <h3 className="text-lg font-bold mb-2">How we work</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Personalized 1:1 instruction</li>
              <li>Data-driven progress tracking</li>
              <li>AI-enhanced lesson planning</li>
            </ul>
          </div>

          <div className="rounded-xl p-6 bg-background/60 border border-primary/8 shadow-sm">
            <h3 className="text-lg font-bold mb-2">What we measure</h3>
            <p className="text-sm text-muted-foreground">Retention, time-to-mastery, and real exam outcomes — not vanity metrics.</p>
          </div>
        </section>

        {/* FAQ-ish / trust badges */}
        <section className="mt-14 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-3">Why students choose us</h3>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">We pair expert humans with automation so learning is faster and cheaper. Parents love predictable progress. Students love results.</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border border-primary/8">
                <div className="font-semibold">Verified tutors</div>
                <div className="text-sm text-muted-foreground">Background checks and teaching demos.</div>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border border-primary/8">
                <div className="font-semibold">Money-back guarantee</div>
                <div className="text-sm text-muted-foreground">If you don't see improvement in 30 days.</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">Partners & recognition</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">Top School Partners</Badge>
              <Badge variant="secondary">EdTech Awards 2023</Badge>
              <Badge variant="secondary">5-star Reviews</Badge>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Contact</h4>
              <p className="text-sm text-muted-foreground">hello@yourdomain.com · +91 99999 99999</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/6 to-secondary/6 border border-primary/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Join thousands of students seeing measurable progress</h3>
            <p className="text-sm text-muted-foreground">Start with a free diagnostic and a tailored learning plan.</p>
          </div>

          <div className="flex gap-4">
            <Link to="/start-trial">
              <Button size="lg" className="rounded-full px-8 py-4">Start Free Trial</Button>
            </Link>
            <Link to="/tutors">
              <Button size="lg" variant="outline" className="rounded-full px-8 py-4">Meet Tutors</Button>
            </Link>
          </div>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </main>
  );
};

export default About;
