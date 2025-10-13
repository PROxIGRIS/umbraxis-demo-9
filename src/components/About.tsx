import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import Lottie from "lottie-react";

const About = () => {
  // Wave animation
  const waveAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 150,
    h: 150,
    nm: "Wave",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Wave",
        sr: 1,
        ks: {
          o: { a: 0, k: 60 },
          p: { a: 0, k: [75, 75, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [50, 50, 100], e: [150, 150, 100] },
              { t: 90 },
            ],
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [80, 80] },
              },
              {
                ty: "st",
                c: { a: 0, k: [1, 0.42, 0.33, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 3 },
              },
            ],
          },
        ],
        ip: 0,
        op: 90,
        st: 0,
      },
    ],
  };

  const capabilities = [
    {
      icon: Code2,
      title: "Expert Instruction",
      description: "Our certified tutors bring years of teaching experience and deep subject knowledge to every session.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Palette,
      title: "Personalized Learning",
      description: "Custom-tailored lesson plans designed around your unique learning style and academic goals.",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Rocket,
      title: "Proven Results",
      description: "Students improve by an average of 2 grade levels within 6 months of consistent tutoring.",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: Zap,
      title: "Flexible Scheduling",
      description: "Learn on your schedule with 24/7 availability and sessions that fit your busy lifestyle.",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ];

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      {/* Animated decorations */}
      <div className="absolute top-20 right-10 w-40 h-40 opacity-10 pointer-events-none">
        <Lottie animationData={waveAnimation} loop />
      </div>
      <div className="absolute bottom-20 left-10 w-40 h-40 opacity-10 pointer-events-none">
        <Lottie animationData={waveAnimation} loop />
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="orange" className="gap-2">
              <Zap className="w-4 h-4" />
              Why Choose Us
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Excellence in
              <span className="block text-primary">Every Lesson</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't just teach. We inspire, empower, and transform students into confident learners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary text-sm font-medium animate-pulse">
              <Zap className="w-4 h-4" />
              Ready to excel in your studies?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
