import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Volume2, VolumeX, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Purple hero — preserves the orange layout and behaviour,
 * but tuned for dark/purple visuals: safer contrasts, gradient accents,
 * better card separation, responsive spacing, and accessible text.
 */

const Hero: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handler);
      return () => window.removeEventListener("mousemove", handler);
    }
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#06060a] via-[#0c0b12] to-[#0f0f17] py-20 px-6">
      {/* interactive glow following cursor (subtle) */}
      <div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-br from-[#7d4cff]/20 to-[#4cf0a0]/8 blur-3xl pointer-events-none transition-all duration-500 -z-10"
        style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {/* left purple bloom */}
        <div className="absolute left-1/6 top-1/6 w-[650px] h-[650px] rounded-full bg-[#7d4cff]/18 blur-[120px] -z-20" />
        {/* right mint bloom */}
        <div className="absolute right-1/6 bottom-0 w-[520px] h-[520px] rounded-full bg-[#4cf0a0]/8 blur-[100px] -z-20" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            <Badge className="inline-flex items-center gap-2 bg-[#7d4cff]/12 text-[#cfc3ff] border border-[#7d4cff]/30 px-4 py-1 rounded-full">
              <Sparkles className="w-4 h-4 text-[#cfc3ff]" />
              Expert Online Tutoring
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
              <span className="block">Unlock Your</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#9b6bff] via-[#7d4cff] to-[#56f7c2]">
                Academic Potential
              </span>
              <span className="block">With Umbraxis</span>
            </h1>

            <p className="text-lg md:text-xl text-[#cbd0df] max-w-xl">
              Personalized one-on-one tutoring designed to improve grades, boost confidence,
              and help students learn smarter with AI-enhanced insights.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/start-trial" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#7d4cff] to-[#4cf0a0] shadow-lg hover:shadow-2xl transition transform-gpu"
                >
                  Start Free Trial
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>

              <Link to="/tutors" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full px-8 py-4 text-lg font-medium border border-white/10 text-white/90 bg-white/3 hover:border-[#7d4cff]/40 transition"
                >
                  Meet Our Tutors
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-6 max-w-lg">
              <div>
                <div className="text-3xl font-bold text-[#c9b7ff]">5000+</div>
                <div className="text-sm text-[#9aa0b3]">Students Taught</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-[#c9b7ff]">98%</div>
                <div className="text-sm text-[#9aa0b3]">Success Rate</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-[#c9b7ff]">50+</div>
                <div className="text-sm text-[#9aa0b3]">Expert Tutors</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8 relative">
            {/* CTA card (dark glass with subtle top gradient like orange's) */}
            <Link to="/diagnostic-quiz" className="block">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-black/25 to-white/2 border border-white/6 backdrop-blur-md shadow-2xl hover:shadow-2xl transition transform-gpu">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#7d4cff]/20 to-[#7d4cff]/6 p-3 rounded-xl">
                    <Brain className="w-8 h-8 text-[#d9c7ff]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">Take Free AI Quiz</h3>
                    <p className="text-sm text-[#9aa0b3]">Know your level in 5 minutes</p>
                  </div>

                  <ArrowRight className="w-6 h-6 text-[#9aa0b3]" />
                </div>

                <div className="mt-4 flex gap-2">
                  <span className="inline-flex items-center gap-2 text-xs bg-[#ffffff0a] px-3 py-1 rounded-full border border-white/6 text-[#d4cfff]">
                    <Sparkles className="w-3 h-3" /> AI-Powered
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs bg-[#ffffff06] px-3 py-1 rounded-full border border-white/6 text-[#d4cfff]">
                    Personalized Roadmap
                  </span>
                </div>
              </div>
            </Link>

            {/* Video card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* video placeholder / media */}
              <div className="relative w-full aspect-video bg-gradient-to-b from-[#0b0b0f] to-[#15131a]">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/tution-intro.mp4" type="video/mp4" />
                </video>

                {/* top rim highlight to mimic orange theme light on top */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7d4cff] via-[#7d4cff]/60 to-transparent opacity-60" />

                {/* mute control: darker, high-contrast button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 bg-black/60 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
                  aria-label="Toggle sound"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              {/* subtle inner border and glow (keeps separation from background) */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/4" />
            </div>
          </div>
        </div>
      </div>

      {/* bottom decorative gradient bar */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#08060a] via-[#0b0a12]/40 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
