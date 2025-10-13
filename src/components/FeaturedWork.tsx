import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const FeaturedWork = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Success star animation
  const starAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 100,
    h: 100,
    nm: "Star",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Star",
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              { t: 0, s: [0], e: [100] },
              { t: 30, s: [100], e: [0] },
              { t: 60 },
            ],
          },
          p: {
            a: 1,
            k: [
              { t: 0, s: [50, 50, 0], e: [50, 20, 0] },
              { t: 60 },
            ],
          },
          s: { 
            a: 1,
            k: [
              { t: 0, s: [0, 0, 100], e: [100, 100, 100] },
              { t: 30, s: [100, 100, 100], e: [0, 0, 100] },
              { t: 60 },
            ],
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "sr",
                sy: 1,
                pt: { a: 0, k: 5 },
                p: { a: 0, k: [0, 0] },
                r: { a: 0, k: 0 },
                ir: { a: 0, k: 5 },
                or: { a: 0, k: 10 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [1, 0.84, 0.2, 1] },
                o: { a: 0, k: 100 },
              },
            ],
          },
        ],
        ip: 0,
        op: 60,
        st: 0,
      },
    ],
  };

  const successStories = [
    {
      name: "Sarah Johnson",
      grade: "Grade 10",
      subject: "Mathematics",
      achievement: "From D to A+ in 3 Months",
      testimonial: "The personalized approach helped me understand concepts I struggled with for years. Now math is my favorite subject!",
      improvement: "+3 Grade Levels",
      rating: 5,
    },
    {
      name: "Michael Chen",
      grade: "Grade 12",
      subject: "SAT Prep",
      achievement: "SAT Score: 1580/1600",
      testimonial: "The test strategies and practice sessions were invaluable. I got into my dream university thanks to this program!",
      improvement: "+280 Points",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      grade: "Grade 8",
      subject: "Science",
      achievement: "Regional Science Fair Winner",
      testimonial: "My tutor didn't just help with homework - they inspired me to pursue STEM. Now I'm winning competitions!",
      improvement: "First Place",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="work" className="py-32 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-20"
          >
            <Badge variant="orange" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Success Stories
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Real Students
              <span className="block text-primary">Real Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our personalized tutoring transforms struggling students into confident achievers.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card
                  className="group relative overflow-hidden border-0 bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer rounded-3xl h-full"
                >
                  {/* Animated stars on hover */}
                  {hoveredIndex === index && (
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 opacity-50">
                      <Lottie animationData={starAnimation} loop />
                    </div>
                  )}

                  {/* Achievement badge area */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 p-8 flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      animate={hoveredIndex === index ? { rotate: 360 } : {}}
                      transition={{ duration: 1 }}
                      className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                    >
                      <TrendingUp className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {story.achievement}
                    </h3>
                    <Badge variant="orange" className="text-xs">
                      {story.improvement}
                    </Badge>

                    {/* Gradient border animation */}
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary/30 transition-all duration-500 rounded-t-3xl" />
                  </motion.div>

                  <div className="p-8 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {story.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{story.grade}</p>
                      </div>
                      <Badge variant="orange" className="text-xs">
                        {story.subject}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-primary text-primary" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      "{story.testimonial}"
                    </p>
                  </div>

                  {/* Shine effect */}
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View all CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-2 hover:border-primary hover:text-primary transition-all"
              >
                View More Success Stories
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
