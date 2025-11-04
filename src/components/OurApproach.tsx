import { motion } from "framer-motion";
import { GraduationCap, Brain, Rocket } from "lucide-react";

const OurApproach = () => {
  const approaches = [
    {
      icon: GraduationCap,
      title: "Expert Tutors",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Certified educators with advanced degrees",
        "Average 8+ years teaching experience",
        "Specialized in subject mastery",
        "Personalized teaching methods"
      ]
    },
    {
      icon: Brain,
      title: "AI Enhancement",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      features: [
        "Real-time progress tracking",
        "Adaptive learning algorithms",
        "24/7 AI assistant chatbot",
        "Predictive performance analytics",
        "Automated practice generation"
      ]
    },
    {
      icon: Rocket,
      title: "Proven Methodology",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Diagnostic assessment",
        "Personalized learning path",
        "Regular progress reviews",
        "AI-generated practice problems",
        "Mock test simulations"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Human Expertise + AI Intelligence = 
            <span className="block text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
              Extraordinary Results
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`${approach.bgColor} p-8 rounded-lg border border-border shadow-lg hover:shadow-xl transition-all`}
            >
              <approach.icon className={`w-16 h-16 ${approach.color} mx-auto mb-4`} />
              <h3 className="text-2xl font-bold text-center mb-6">{approach.title}</h3>
              <ul className="space-y-3">
                {approach.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`${approach.color} text-xl`}>✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            Why AI Makes Us Different
          </h3>
          <div className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 divide-x divide-border">
              <div className="p-8">
                <h4 className="text-xl font-bold mb-6 text-center">Traditional Tutoring</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span>📚</span>
                    <span>Fixed curriculum</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span>📊</span>
                    <span>Weekly progress reports</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span>⏰</span>
                    <span>Limited availability</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span>📝</span>
                    <span>Generic homework help</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span>📅</span>
                    <span>Manual scheduling</span>
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                <h4 className="text-xl font-bold mb-6 text-center">Umbraxis Studio (AI-Enhanced)</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <span>✨</span>
                    <span className="font-semibold">Adaptive learning paths</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📊</span>
                    <span className="font-semibold">Real-time analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🤖</span>
                    <span className="font-semibold">24/7 AI assistant support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🎯</span>
                    <span className="font-semibold">AI-generated practice problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📅</span>
                    <span className="font-semibold">Smart calendar optimization</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-6 text-center">
              <p className="text-lg font-semibold">
                🚀 Students learn <span className="text-primary">40% faster</span> and retain knowledge <span className="text-secondary">60% better</span> with AI enhancement
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurApproach;
