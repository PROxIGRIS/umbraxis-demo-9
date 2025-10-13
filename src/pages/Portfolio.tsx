import React, { useState, useEffect, useRef } from "react"; import { ArrowRight, ExternalLink, Sparkles, Volume2, VolumeX } from "lucide-react"; import Lottie from "lottie-react"; import { Button } from "@/components/ui/button"; import { Badge } from "@/components/ui/badge";

// NOTE: This is a single-file React component intended for a Next.js / Create React App project. // Requirements: tailwindcss, lottie-react, lucide-react, and your UI Button/Badge components.

const spiralAnimation = { v: "5.7.4", fr: 60, ip: 0, op: 120, w: 200, h: 200, nm: "Spiral", ddd: 0, assets: [], layers: [ { ddd: 0, ind: 1, ty: 4, nm: "Circle1", sr: 1, ks: { o: { a: 0, k: 80 }, r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 120 }] }, p: { a: 0, k: [100, 100, 0] }, s: { a: 0, k: [100, 100, 100] }, }, ao: 0, shapes: [ { ty: "gr", it: [ { ty: "el", p: { a: 0, k: [50, 0] }, s: { a: 0, k: [20, 20] } }, { ty: "fl", c: { a: 0, k: [1, 0.42, 0.33, 1] }, o: { a: 0, k: 100 } }, ], }, ], ip: 0, op: 120, st: 0, }, ], };

const projects = [ { id: "ravenius", title: "Ravenius", tagline: "E‑commerce Website", url: "https://ravenius.com", preview: "https://image.thum.io/get/width/1920/https://ravenius.com", highlights: ["Premium product pages", "Clean checkout UX", "Mobile-first layout"], }, { id: "school", title: "School Web Demo • Advanced", tagline: "3D models, mini-game & performance toggles", url: "https://school-demo-v8.vercel.app/", preview: "https://image.thum.io/get/width/1920/https://school-demo-v8.vercel.app/", highlights: ["3D models & effects", "Custom 404 with mini-game", "Disable effects for low-end devices"], }, { id: "tution", title: "Tuition Web Demo", tagline: "Affordable site — premium UI", url: "https://tution-demo.vercel.app/", preview: "https://image.thum.io/get/width/1920/https://tution-demo.vercel.app/", highlights: ["Polished landing & CTA", "Mobile-optimised visuals", "Fast-to-deploy template"], }, { id: "restaurant", title: "Restaurant Web", tagline: "Premium website for restaurants", url: "https://restaurant-demo-v1.vercel.app/", preview: "https://image.thum.io/get/width/1920/https://restaurant-demo-v1.vercel.app/", highlights: ["Menu-first layout", "Reservation CTA", "Visual-first hero sections"], }, { id: "dj", title: "DJ & Events", tagline: "Sites for DJs & event agencies", url: "https://umbraxisd2.vercel.app/", preview: "https://image.thum.io/get/width/1920/https://umbraxisd2.vercel.app/", highlights: ["Gig listings & booking", "Audio-friendly layouts", "Bold visual identity"], }, ];

export default function UmbraxisPortfolio() { const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); const [mutedMap, setMutedMap] = useState({});

useEffect(() => { const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", handleMouseMove); return () => window.removeEventListener("mousemove", handleMouseMove); }, []);

return ( <div className="min-h-screen relative bg-gradient-to-br from-background via-secondary to-background text-foreground overflow-hidden"> {/* Mouse glow */} <div className="fixed w-96 h-96 rounded-full bg-primary/6 blur-3xl pointer-events-none transition-all duration-300 ease-out -z-10" style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }} />

{/* Lottie decorative elements */}
  <div className="absolute top-24 left-12 w-44 h-44 opacity-30 pointer-events-none animate-pulse">
    <Lottie animationData={spiralAnimation} loop />
  </div>
  <div className="absolute bottom-24 right-16 w-52 h-52 opacity-25 pointer-events-none">
    <Lottie animationData={spiralAnimation} loop />
  </div>

  <header className="container mx-auto px-6 lg:px-16 py-6 flex items-center justify-between z-20 relative">
    <div className="flex items-center gap-4">
      <div className="font-bold text-lg">Umbraxis Studio</div>
      <nav className="hidden md:flex gap-6 text-sm text-foreground/70">
        <a href="#work" className="hover:text-foreground transition">Portfolio</a>
        <a href="#services" className="hover:text-foreground transition">Services</a>
        <a href="#about" className="hover:text-foreground transition">About</a>
      </nav>
    </div>

    <div className="flex items-center gap-4">
      <a href="#start" className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow hover:shadow-lg transition">Start Project</a>
    </div>
  </header>

  {/* Hero area */}
  <section className="container mx-auto px-6 lg:px-16 py-24 z-20 relative">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <Badge variant="orange" className="gap-2 inline-flex items-center">
          <Sparkles className="w-4 h-4" />
          Portfolio — Umbraxis Studio
        </Badge>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Crafting digital
          </span>
          <span className="block mt-2">experiences that</span>
          <span className="block mt-2 text-primary">captivate & convert</span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed">
          These demos show our visual standard — premium UI, considered motion, and practical layouts ready to
          impress clients. Note: demos are showcase builds and may have limited functionality.
        </p>

        <div className="flex gap-4 mt-4">
          <Button size="lg" className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90">View Full Portfolio</Button>
          <Button size="lg" variant="outline" className="px-8 py-4 rounded-full">Start Your Project</Button>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-8">
          <div>
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Projects Delivered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>

      {/* Showcase column — hero-style cards */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((p) => (
          <article key={p.id} className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500 group bg-card">
            <div className="relative">
              <img
                src={p.preview}
                alt={`${p.title} preview`}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              <div className="absolute inset-0 rounded-3xl border-4 border-primary/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-lg">{p.title}</div>
                  <div className="text-sm text-muted-foreground">{p.tagline}</div>
                </div>
                <a href={p.url} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-2">
                  Open <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="mt-4 text-foreground/80 text-sm leading-relaxed">{p.highlights.join(' • ')}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Showcase only</div>
                <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow">
                  Open Demo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ))}

        <div className="rounded-3xl p-6 bg-gradient-to-tr from-primary/5 to-transparent border border-primary/10">
          <div className="font-semibold">Need a custom build?</div>
          <div className="text-sm text-muted-foreground mt-2">All demos can be made bug-free and production-ready for real projects.</div>
          <a href="#start" className="mt-4 inline-flex items-center gap-2 text-primary font-medium">Start Your Project <ArrowRight className="w-4 h-4" /></a>
        </div>
      </div>
    </div>

    <div className="mt-10 p-6 rounded-xl bg-accent/5 border border-accent/10 text-center max-w-3xl mx-auto">
      <h4 className="font-semibold">Note</h4>
      <p className="text-sm text-muted-foreground mt-2">These demos are for showcase only. Some features may not work properly in the demo environments. They are not final products and can be customised and made bug-free for real projects. Contact us to get a fully customised, production-ready website built for your needs.</p>
    </div>
  </section>

  <footer className="border-t border-muted-foreground/10 mt-12 relative z-20">
    <div className="container mx-auto px-6 lg:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <div className="font-bold">Umbraxis Studio</div>
        <div className="text-sm text-muted-foreground mt-1">Beautiful websites. Made simple.</div>
      </div>

      <div className="flex items-center gap-4">
        <a href="#start" className="text-sm text-muted-foreground hover:text-foreground transition">Contact</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Privacy</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Terms</a>
      </div>
    </div>
  </footer>

  {/* decorative gradients */}
  <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
  <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
</div>

); }

  
