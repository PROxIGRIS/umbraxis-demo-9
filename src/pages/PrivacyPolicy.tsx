// src/pages/PrivacyPolicy.tsx
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Umbraxis Privacy Policy Page
 * - Hero-inspired layout (based on provided Hero component)
 * - No video included
 * - Clear policy sections, download buttons, consent toggle
 *
 * Replace download hrefs with your public/pdf asset locations.
 */

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

const PrivacyPolicy: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [consent, setConsent] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("data");

  useEffect(() => {
    // only attach if device supports hover to preserve mobile perf
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      const onMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, []);

  const toggleExpand = (id: string) => setExpanded((cur) => (cur === id ? null : id));

  return (
    <section className="relative min-h-screen flex items-start overflow-hidden bg-gradient-to-br from-background via-secondary to-background py-16">
      {/* Interactive cursor glow */}
      <div
        className="fixed w-96 h-96 rounded-full bg-primary/6 blur-3xl pointer-events-none transition-all duration-300 ease-out -z-10"
        style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
        aria-hidden
      />

      {/* Decorative Lottie blobs */}
      <div className="absolute top-20 left-10 w-40 h-40 opacity-30 pointer-events-none animate-pulse -z-10">
        <Lottie animationData={spiralAnimation} loop />
      </div>
      <div className="absolute bottom-20 right-20 w-48 h-48 opacity-24 pointer-events-none -z-10">
        <Lottie animationData={spiralAnimation} loop />
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Hero-style header + summary */}
          <div className="space-y-8 relative z-10">
            <Badge variant="orange" className="gap-2 inline-flex items-center">
              <Sparkles className="w-4 h-4" />
              Umbraxis — Privacy & Data
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Umbraxis Privacy Policy
              </h1>
              <p className="text-lg text-foreground/80 max-w-xl leading-relaxed">
                We respect your privacy. This page explains how Umbraxis collects, uses, shares,
                and protects personal information in the Umbraxis learning and tracking systems.
                Read carefully to understand what we collect and how to control your data.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/downloads/umbraxis-privacy.pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full bg-primary px-6 py-3 rounded-full shadow-md hover:shadow-lg">
                  Download Policy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>

              <a
                href="/downloads/umbraxis-roadmap.pdf"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full px-6 py-3 rounded-full">
                  Download Roadmap
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-6 max-w-md">
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Transparency Goal</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-primary">Realtime</div>
                <div className="text-sm text-muted-foreground">Tracking Options</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-primary">GDPR-ready</div>
                <div className="text-sm text-muted-foreground">Data Controls</div>
              </div>
            </div>
          </div>

          {/* Right Column: Policy content card */}
          <div className="relative z-10">
            <div className="p-6 rounded-2xl bg-background/70 border border-primary/10 shadow-lg space-y-6">
              <h2 className="text-xl font-semibold">Summary</h2>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Umbraxis collects only the data necessary to provide tutoring, diagnostics,
                and optional realtime tracking (for TrackFlow). You remain in control:
                parents can view driver locations only with explicit access, students can
                download their results, and admins have role-based access.
              </p>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-muted-foreground"
                    aria-label="I consent to this privacy policy"
                  />
                  <span className="text-sm text-foreground/85">I acknowledge and accept this policy</span>
                </label>

                <div className="flex gap-3">
                  <Button size="sm" variant="ghost" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button size="sm" disabled={!consent} className="bg-primary">
                    Confirm
                  </Button>
                </div>
              </div>
            </div>

            {/* Accordion style details */}
            <div className="mt-6 space-y-4">
              <section className="bg-background/60 border border-primary/8 rounded-2xl p-4 shadow-sm">
                <header
                  className="flex items-center justify-between cursor-pointer"
                  role="button"
                  onClick={() => toggleExpand("data")}
                  tabIndex={0}
                  aria-expanded={expanded === "data"}
                >
                  <h3 className="font-semibold">1. Data We Collect</h3>
                  <div className="text-xs text-muted-foreground">{expanded === "data" ? "Hide" : "Show"}</div>
                </header>
                {expanded === "data" && (
                  <div className="mt-3 text-sm text-foreground/85 space-y-2">
                    <p>
                      <strong>Account info:</strong> name, email, phone (when provided), role.
                    </p>
                    <p>
                      <strong>Assessment data:</strong> quiz answers, performance summaries, downloadable PDF reports.
                    </p>
                    <p>
                      <strong>Realtime location (optional):</strong> driver lat/long, speed, accuracy, timestamp. Driver location is only shared when the driver enables tracking.
                    </p>
                  </div>
                )}
              </section>

              <section className="bg-background/60 border border-primary/8 rounded-2xl p-4 shadow-sm">
                <header
                  className="flex items-center justify-between cursor-pointer"
                  role="button"
                  onClick={() => toggleExpand("use")}
                  tabIndex={0}
                  aria-expanded={expanded === "use"}
                >
                  <h3 className="font-semibold">2. How We Use Data</h3>
                  <div className="text-xs text-muted-foreground">{expanded === "use" ? "Hide" : "Show"}</div>
                </header>
                {expanded === "use" && (
                  <div className="mt-3 text-sm text-foreground/85 space-y-2">
                    <ul className="list-disc pl-5">
                      <li>Provide and improve core services (quizzes, tutor matching, dashboards).</li>
                      <li>Generate personalized learning roadmaps and downloadable PDF results.</li>
                      <li>Support optional TrackFlow realtime features — only when drivers opt in.</li>
                      <li>Security, analytics, and fraud prevention.</li>
                    </ul>
                  </div>
                )}
              </section>

              <section className="bg-background/60 border border-primary/8 rounded-2xl p-4 shadow-sm">
                <header
                  className="flex items-center justify-between cursor-pointer"
                  role="button"
                  onClick={() => toggleExpand("share")}
                  tabIndex={0}
                  aria-expanded={expanded === "share"}
                >
                  <h3 className="font-semibold">3. Sharing & Third Parties</h3>
                  <div className="text-xs text-muted-foreground">{expanded === "share" ? "Hide" : "Show"}</div>
                </header>
                {expanded === "share" && (
                  <div className="mt-3 text-sm text-foreground/85 space-y-2">
                    <p>
                      We do not sell personal data. We share minimal necessary information with:
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Payment processors (if/when payments occur)</li>
                      <li>Cloud infrastructure (host, database, auth) under contract</li>
                      <li>Third-party analytics (only aggregated & anonymized)</li>
                    </ul>
                    <p className="mt-2">Driver location streams are visible only to parents/admins with permission.</p>
                  </div>
                )}
              </section>

              <section className="bg-background/60 border border-primary/8 rounded-2xl p-4 shadow-sm">
                <header
                  className="flex items-center justify-between cursor-pointer"
                  role="button"
                  onClick={() => toggleExpand("retention")}
                  tabIndex={0}
                  aria-expanded={expanded === "retention"}
                >
                  <h3 className="font-semibold">4. Retention & Deletion</h3>
                  <div className="text-xs text-muted-foreground">{expanded === "retention" ? "Hide" : "Show"}</div>
                </header>
                {expanded === "retention" && (
                  <div className="mt-3 text-sm text-foreground/85 space-y-2">
                    <p>We retain data only for as long as necessary to provide services and to comply with legal obligations. Users can request deletion via Contact.</p>
                    <p className="text-xs text-muted-foreground">Retention windows (example): assessment reports 5 years, logs 90 days, backup retention per policy.</p>
                  </div>
                )}
              </section>

              <section className="bg-background/60 border border-primary/8 rounded-2xl p-4 shadow-sm">
                <header
                  className="flex items-center justify-between cursor-pointer"
                  role="button"
                  onClick={() => toggleExpand("security")}
                  tabIndex={0}
                  aria-expanded={expanded === "security"}
                >
                  <h3 className="font-semibold">5. Security</h3>
                  <div className="text-xs text-muted-foreground">{expanded === "security" ? "Hide" : "Show"}</div>
                </header>
                {expanded === "security" && (
                  <div className="mt-3 text-sm text-foreground/85 space-y-2">
                    <p>We use industry-standard encryption (TLS) in transit and secure database controls at rest. No client-side keys are embedded in public builds; secrets are stored server-side.</p>
                    <p className="text-xs text-muted-foreground">Important: keep your password private. Report any suspected breach immediately.</p>
                  </div>
                )}
              </section>

              <section className="bg-background/60 border border-primary/8 rounded-2xl p-4 shadow-sm">
                <header
                  className="flex items-center justify-between cursor-pointer"
                  role="button"
                  onClick={() => toggleExpand("rights")}
                  tabIndex={0}
                  aria-expanded={expanded === "rights"}
                >
                  <h3 className="font-semibold">6. Your Rights & Controls</h3>
                  <div className="text-xs text-muted-foreground">{expanded === "rights" ? "Hide" : "Show"}</div>
                </header>
                {expanded === "rights" && (
                  <div className="mt-3 text-sm text-foreground/85 space-y-2">
                    <ul className="list-disc pl-5">
                      <li>Access: request a copy of your data.</li>
                      <li>Rectification: ask us to correct inaccurate data.</li>
                      <li>Deletion: request removal of personal data where applicable.</li>
                      <li>Portability: export your assessment reports as PDFs.</li>
                    </ul>
                    <p className="mt-2">To exercise rights, contact: <strong>privacy@umbraxis.com</strong></p>
                  </div>
                )}
              </section>

              <section className="bg-background/60 border border-primary/8 rounded-2xl p-4 shadow-sm">
                <header
                  className="flex items-center justify-between cursor-pointer"
                  role="button"
                  onClick={() => toggleExpand("contact")}
                  tabIndex={0}
                  aria-expanded={expanded === "contact"}
                >
                  <h3 className="font-semibold">7. Contact & Updates</h3>
                  <div className="text-xs text-muted-foreground">{expanded === "contact" ? "Hide" : "Show"}</div>
                </header>
                {expanded === "contact" && (
                  <div className="mt-3 text-sm text-foreground/85 space-y-2">
                    <p>If you have questions or want to request data access/deletion, email: <strong>privacy@umbraxis.com</strong>.</p>
                    <p>We may update this policy from time to time. Material changes will be posted on this page with an updated effective date.</p>
                  </div>
                )}
              </section>
            </div>

            {/* bottom CTA */}
            <div className="mt-6 p-4 rounded-xl bg-background/60 border border-primary/8 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">Need help with data requests?</div>
                <div className="text-xs text-muted-foreground">Our privacy team aims to respond within 5 business days.</div>
              </div>
              <div className="flex gap-3">
                <a href="mailto:privacy@umbraxis.com">
                  <Button size="sm" className="bg-primary">Email Privacy Team</Button>
                </a>
                <Link to="/">
                  <Button size="sm" variant="ghost">Return Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 6s linear infinite; }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </section>
  );
};

export default PrivacyPolicy;
