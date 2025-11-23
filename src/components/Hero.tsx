import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Volume2, VolumeX, Brain } from "lucide-react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Purple spiral glow animation
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
          o: { a: 0, k: 40 },
          r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 120 }] },
          p: { a: 0, k: [100, 100, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                p: { a: 0, k: [50, 0] },
                s: { a: 0, k: [18, 18] },
              },
              {
                ty: "fl",
                c: { a: 0, k: [0.49, 0.29, 1, 1] }, // purple glow
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#12121a] flex items-center overflow-hidden py-20 px-6">

      {/* Purple + Mint Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[20%] w-[700px] h-[700px] bg-[#7d4cff]/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-[15%] w-[500px] h-[500px] bg-[#4cf0a0]/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            <Badge className="bg-[#7d4cff]/20 text-[#7d4cff] px-4 py-1 backdrop-blur-xl border border-[#7d4cff]/40 rounded-full">
              Expert Online Tutoring
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              <span className="block">Unlock Your</span>
              <span className="block text-[#7d4cff]">Academic Potential</span>
              <span className="block">With Umbraxis</span>
            </h1>

            <p className="text-gray-300 text-lg max-w-xl">
              Personalized one-on-one tutoring designed to improve grades, boost confidence,
              and help students learn smarter with AI-enhanced insights.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/start-trial">
                <Button
                  size="lg"
                  className="rounded-xl bg-gradient-to-r from-[#7d4cff] to-[#4cf0a0] text-white px-8 py-6 shadow-lg hover:shadow-[#7d4cff]/30 transition-all"
                >
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/tutors">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border border-white/20 text-white px-8 py-6 hover:border-[#7d4cff] transition-all"
                >
                  Meet Our Tutors
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-6">
              <div>
                <div className="text-3xl font-bold text-[#7d4cff]">5000+</div>
                <div className="text-sm text-gray-400">Students Taught</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-[#7d4cff]">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-[#7d4cff]">50+</div>
                <div className="text-sm text-gray-400">Expert Tutors</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – VIDEO + QUIZ CTA */}
          <div className="space-y-8 relative">

            {/* FREE QUIZ CTA CARD */}
            <Link to="/diagnostic-quiz">
              <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:border-[#7d4cff]/40 transition cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-[#7d4cff]/20 p-3 rounded-xl">
                    <Brain className="text-[#7d4cff] w-8 h-8" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">Take Free AI Quiz</h3>
                    <p className="text-sm text-gray-400">Know your level in 5 minutes</p>
                  </div>

                  <ArrowRight className="text-[#7d4cff] w-6 h-6" />
                </div>
              </div>
            </Link>

            {/* Video */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/tution-intro.mp4" type="video/mp4" />
              </video>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
              >
                {isMuted ? <VolumeX /> : <Volume2 />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
