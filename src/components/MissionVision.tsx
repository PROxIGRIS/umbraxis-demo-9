import { motion } from "framer-motion";
import { Target, Eye, Award, Lightbulb, Users, TrendingUp } from "lucide-react";

const MissionVision = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Rigorous tutor selection, only top 5% accepted",
      color: "text-yellow-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "AI-powered learning paths and real-time insights",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Personalization",
      description: "Every lesson tailored to individual needs",
      color: "text-secondary"
    },
    {
      icon: Target,
      title: "Integrity",
      description: "Transparent progress tracking and honest feedback",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      title: "Results",
      description: "Data-driven approach with measurable outcomes",
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg border border-border shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-10 h-10 text-primary" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To empower every student with personalized, expert-led education that builds confidence, ignites curiosity, and unlocks their full potential.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg border border-border shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-10 h-10 text-secondary" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                A world where quality education is accessible to all, combining the irreplaceable value of human expertise with the power of artificial intelligence to create transformative learning experiences.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card p-6 rounded-lg border border-border text-center hover:shadow-xl transition-all cursor-pointer"
              >
                <value.icon className={`w-12 h-12 mx-auto mb-3 ${value.color}`} />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;
