import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GraduationCap, Users, Clock, Star } from "lucide-react";

const AboutHero = () => {
  const [counts, setCounts] = useState({ students: 0, tutors: 0, hours: 0, rating: 0 });

  useEffect(() => {
    const targets = { students: 5000, tutors: 50, hours: 15000, rating: 4.9 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts({
        students: Math.floor((targets.students * step) / steps),
        tutors: Math.floor((targets.tutors * step) / steps),
        hours: Math.floor((targets.hours * step) / steps),
        rating: parseFloat(((targets.rating * step) / steps).toFixed(1)),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Users, value: `${counts.students.toLocaleString()}+`, label: "Students Taught", color: "text-primary" },
    { icon: GraduationCap, value: `${counts.tutors}+`, label: "Expert Tutors", color: "text-secondary" },
    { icon: Clock, value: `${counts.hours.toLocaleString()}+`, label: "Hours of Instruction", color: "text-primary" },
    { icon: Star, value: `${counts.rating}★`, label: "Average Rating", color: "text-yellow-500" },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Transforming Education Through Expert Tutoring & AI Innovation
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Founded in 2020, Umbraxis Studio has helped over 5,000 students achieve academic excellence through personalized, AI-enhanced learning experiences.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-border"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Our Story</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              What began as a small group of passionate educators has evolved into a leading online tutoring platform. We believe every student deserves access to world-class instruction tailored to their unique learning style.
            </p>
            <p>
              By combining expert human tutors with cutting-edge AI technology, we're revolutionizing how students learn, grow, and succeed. We saw talented students struggling—not because they lacked ability, but because traditional one-size-fits-all teaching methods didn't match their unique learning styles.
            </p>
            <p className="font-semibold text-foreground">
              Today, we've helped over 5,000 students not just improve their grades, but fall in love with learning. This is education reimagined. This is Umbraxis Studio.
            </p>
          </div>
        </motion.div>

        {/* Animated Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-card/80 backdrop-blur-sm p-6 rounded-lg text-center border border-border hover:shadow-lg transition-all"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
