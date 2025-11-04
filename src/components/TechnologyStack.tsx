import { motion } from "framer-motion";
import { Brain, Video, Cloud, TrendingUp, Shield, Zap } from "lucide-react";

const TechnologyStack = () => {
  const technologies = [
    {
      icon: Brain,
      title: "AI Models",
      description: "Google Gemini 2.5 Pro/Flash for intelligent tutoring assistance and personalized learning",
      color: "text-primary"
    },
    {
      icon: Video,
      title: "Video Conferencing",
      description: "Google Meet integration for seamless, high-quality virtual classes",
      color: "text-red-500"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable, secure backend powered by Lovable Cloud and Supabase",
      color: "text-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description: "Live class scheduling, enrollment tracking, and instant notifications",
      color: "text-green-500"
    },
    {
      icon: Zap,
      title: "Data Analytics",
      description: "Student performance insights, predictive modeling, and progress visualization",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "End-to-end encrypted user data with industry-standard security protocols",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built on Cutting-Edge Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We leverage the latest innovations to deliver a world-class learning experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card p-6 rounded-lg border border-border shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className={`${tech.color} mb-4 transform group-hover:scale-110 transition-transform`}>
                <tech.icon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
              <p className="text-muted-foreground">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 rounded-lg border border-primary/20"
        >
          <h3 className="text-2xl font-bold mb-4">Performance You Can Trust</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">&lt;100ms</div>
              <div className="text-sm text-muted-foreground">Average Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">256-bit</div>
              <div className="text-sm text-muted-foreground">SSL Encryption</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyStack;
