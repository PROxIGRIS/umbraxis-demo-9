import { motion } from "framer-motion";
import { CheckCircle, Shield, Award, HeadphonesIcon } from "lucide-react";

const CommitmentSection = () => {
  const guarantees = [
    {
      icon: CheckCircle,
      title: "100% Satisfaction Guarantee",
      description: "Not happy with your first session? Get a full refund, no questions asked",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Tutor Replacement Anytime",
      description: "Switch tutors at any point if you feel it's not the right fit",
      color: "text-blue-500"
    },
    {
      icon: Award,
      title: "Progress Guarantee",
      description: "See measurable improvement or receive free additional sessions",
      color: "text-yellow-500"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Technical Support",
      description: "Round-the-clock assistance for any technical issues or questions",
      color: "text-purple-500"
    }
  ];

  const certifications = [
    { name: "GDPR Compliant", badge: "🇪🇺" },
    { name: "FERPA Certified", badge: "🎓" },
    { name: "SOC 2 Type II", badge: "🔒" },
    { name: "ISO 27001", badge: "✓" },
    { name: "BBB Accredited", badge: "⭐" },
    { name: "TrustPilot 4.9★", badge: "💎" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Commitment to Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your success and satisfaction are our top priorities
          </p>
        </motion.div>

        {/* Quality Guarantees */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg border border-border shadow-lg text-center hover:shadow-xl transition-all"
            >
              <guarantee.icon className={`w-12 h-12 mx-auto mb-4 ${guarantee.color}`} />
              <h3 className="text-lg font-bold mb-2">{guarantee.title}</h3>
              <p className="text-sm text-muted-foreground">{guarantee.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications & Accreditations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Accreditations & Certifications
          </h3>
          <div className="bg-card p-8 rounded-lg border border-border shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2">{cert.badge}</div>
                  <p className="text-xs text-muted-foreground font-semibold">{cert.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto text-center bg-primary/5 p-8 rounded-lg border border-primary/20"
        >
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Your Data is Safe with Us</h3>
          <p className="text-muted-foreground">
            We employ bank-level encryption, regular security audits, and strict data privacy protocols. 
            Your personal information and learning data are never shared with third parties without your explicit consent. 
            All video sessions are encrypted end-to-end, and we comply with international education privacy standards.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommitmentSection;
