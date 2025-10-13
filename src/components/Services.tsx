import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Video, Calculator, Globe2, FlaskConical, ArrowRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const Services = () => {
  // Book opening animation
  const bookAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 100,
    h: 100,
    nm: "Book",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Page",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [-20], e: [20] },
              { t: 60, s: [20], e: [-20] },
              { t: 120 },
            ],
          },
          p: { a: 0, k: [50, 50, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [30, 40] },
                r: { a: 0, k: 3 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [1, 0.42, 0.33, 1] },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 120,
        st: 0,
      },
    ],
  };

  const services = [
    {
      icon: BookOpen,
      title: "Subject Tutoring",
      description: "Comprehensive support in Math, Science, English, and more with expert guidance",
      features: ["All Grade Levels", "Curriculum Aligned", "Progress Tracking"],
    },
    {
      icon: Users,
      title: "Group Classes",
      description: "Interactive group sessions that encourage collaboration and peer learning",
      features: ["Small Groups", "Live Sessions", "Affordable Rates"],
    },
    {
      icon: Video,
      title: "Online Learning",
      description: "High-quality virtual tutoring sessions from the comfort of your home",
      features: ["HD Video", "Screen Sharing", "Recorded Sessions"],
    },
    {
      icon: Calculator,
      title: "Test Prep",
      description: "Specialized preparation for SAT, ACT, GRE, and other standardized tests",
      features: ["Practice Tests", "Strategy Tips", "Score Improvement"],
    },
    {
      icon: Globe2,
      title: "Language Learning",
      description: "Master new languages with native speakers and immersive techniques",
      features: ["20+ Languages", "Conversational", "Cultural Context"],
    },
    {
      icon: FlaskConical,
      title: "STEM Focus",
      description: "Advanced tutoring in Science, Technology, Engineering, and Mathematics",
      features: ["Lab Support", "Projects", "Competition Prep"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Lottie animations */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-30 pointer-events-none">
        <Lottie animationData={bookAnimation} loop />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-30 pointer-events-none">
        <Lottie animationData={bookAnimation} loop />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-20"
          >
            <Badge variant="orange" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Our Tutoring Services
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Comprehensive Learning
              <span className="block text-primary">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From elementary to advanced levels, we provide expert tutoring across all subjects and formats.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
                  />
                  
                  <div className="relative z-10 space-y-5">
                    {/* Icon */}
                    <div className="flex items-start justify-between">
                      <motion.div 
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300"
                      >
                        <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 pt-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 text-center space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Ready to boost your grades?
            </h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all group"
              >
                Book Your Free Session
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
