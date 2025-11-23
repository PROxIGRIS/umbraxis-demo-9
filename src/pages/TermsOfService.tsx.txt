import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { FileText, Scale, Users, Shield, AlertCircle, CheckCircle2, Gavel, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TermsOfService = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Legal document animation
  const documentAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Document",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Paper",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 1, k: [{ t: 0, s: [-5], e: [5] }, { t: 60, s: [5], e: [-5] }, { t: 120 }] },
          p: { a: 0, k: [100, 100, 0] },
          s: { a: 1, k: [{ t: 0, s: [95, 95], e: [100, 100] }, { t: 60, s: [100, 100], e: [95, 95] }, { t: 120 }] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [70, 90] },
                r: { a: 0, k: 5 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [1, 0.42, 0.33, 1] },
                o: { a: 0, k: 80 },
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
        op: 120,
        st: 0,
      },
    ],
  };

  // Spiral decoration
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
          o: { a: 0, k: 80 },
          r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 120 }] },
          p: { a: 0, k: [100, 100, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                p: { a: 0, k: [50, 0] },
                s: { a: 0, k: [20, 20] },
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

  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using our tutoring services, you agree to be bound by these Terms of Service",
        "You must be at least 13 years old to use our services independently",
        "For users under 18, parent or guardian consent is required",
        "These terms may be updated periodically, and continued use constitutes acceptance",
      ],
    },
    {
      icon: Shield,
      title: "User Responsibilities",
      content: [
        "Provide accurate and current information during registration",
        "Maintain the confidentiality of your account credentials",
        "Use the platform in a respectful and lawful manner",
        "Not share your account access with others",
        "Attend scheduled sessions on time or provide advance notice for cancellations",
      ],
    },
    {
      icon: Gavel,
      title: "Service Availability",
      content: [
        "We strive to maintain 24/7 platform availability",
        "Scheduled maintenance may temporarily interrupt services",
        "We reserve the right to modify or discontinue services with notice",
        "Session recordings may be stored for quality assurance",
        "Technical issues will be addressed promptly by our support team",
      ],
    },
    {
      icon: Scale,
      title: "Payment Terms",
      content: [
        "All fees are listed in USD unless otherwise specified",
        "Subscription fees are charged in advance on a recurring basis",
        "Refunds are available within 14 days of initial purchase",
        "Cancellations must be made 24 hours before scheduled sessions",
        "Unauthorized chargebacks may result in account suspension",
      ],
    },
    {
      icon: AlertCircle,
      title: "Intellectual Property",
      content: [
        "All course materials and content remain our intellectual property",
        "You may use materials for personal learning purposes only",
        "Reproduction or distribution of materials without permission is prohibited",
        "Tutors retain rights to their original teaching methods",
        "User-generated content may be used for platform improvement",
      ],
    },
    {
      icon: FileText,
      title: "Limitation of Liability",
      content: [
        "Services are provided 'as is' without warranties of any kind",
        "We are not liable for indirect or consequential damages",
        "Total liability is limited to the amount paid in the last 6 months",
        "We do not guarantee specific academic outcomes",
        "Users are responsible for their own learning progress",
      ],
    },
    {
      icon: Shield,
      title: "Termination Policy",
      content: [
        "You may terminate your account at any time",
        "We reserve the right to suspend accounts for violations",
        "Unused credits may be forfeited upon termination",
        "Data will be retained per our privacy policy",
        "Outstanding balances must be settled before account closure",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background relative overflow-hidden">
      {/* Interactive cursor glow */}
      <div
        className="fixed w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none transition-all duration-300 ease-out -z-10"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Decorative animated elements */}
      <div className="absolute top-32 right-10 w-40 h-40 opacity-20 pointer-events-none animate-pulse">
        <Lottie animationData={spiralAnimation} loop />
      </div>
      <div className="absolute bottom-32 left-20 w-48 h-48 opacity-15 pointer-events-none">
        <Lottie animationData={spiralAnimation} loop />
      </div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 opacity-10 pointer-events-none animate-bounce">
        <Lottie animationData={spiralAnimation} loop />
      </div>

      {/* Large decorative gradient blobs */}
      <div className="absolute -top-64 -left-64 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary/15 to-transparent rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-8 rounded-full hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="w-32 h-32 mx-auto mb-8"
            >
              <Lottie animationData={documentAnimation} loop />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Terms of Service
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto"
            >
              Please read these terms carefully before using our services. They establish the rules and guidelines for our platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium"
            >
              <Scale className="w-5 h-5" />
              Effective Date: January 2025
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-6xl mx-auto space-y-20">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <Icon className="w-10 h-10 text-primary" />
                    </motion.div>

                    <div className="flex-1">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {section.title}
                      </h2>

                      <div className="space-y-4">
                        {section.content.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 group"
                          >
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                            <p className="text-lg text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {index < sections.length - 1 && (
                    <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-32 max-w-4xl mx-auto text-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl blur-2xl" />
            <div className="relative bg-background/50 backdrop-blur-sm p-12 md:p-16 rounded-3xl border border-primary/20">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Need Clarification?
              </h3>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Have questions about our terms? Our legal team is available to provide assistance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/contact")}
                  className="rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Agreement Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center text-muted-foreground max-w-3xl mx-auto"
          >
            <p className="text-lg leading-relaxed">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
