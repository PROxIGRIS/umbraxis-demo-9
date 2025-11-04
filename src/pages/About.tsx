import { motion } from "framer-motion";
import AboutHero from "@/components/AboutHero";
import MissionVision from "@/components/MissionVision";
import AIShowcase from "@/components/AIShowcase";
import OurApproach from "@/components/OurApproach";
import TechnologyStack from "@/components/TechnologyStack";
import TeamSection from "@/components/TeamSection";
import CommitmentSection from "@/components/CommitmentSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About Us - Umbraxis Studio | AI-Enhanced Online Tutoring</title>
        <meta 
          name="description" 
          content="Discover how Umbraxis Studio combines expert tutors with cutting-edge AI to deliver personalized, world-class education. Founded in 2020, we've helped 5,000+ students succeed." 
        />
        <meta 
          name="keywords" 
          content="AI tutoring, online education, personalized learning, expert tutors, adaptive learning, educational technology" 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AboutHero />
        
        <MissionVision />
        
        {/* AI WOW Factor Section - Main Highlight */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-secondary/5 to-background" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Experience AI-Powered Learning
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how our intelligent technology transforms your educational journey
              </p>
            </div>
            <AIShowcase />
          </motion.div>
        </section>

        <OurApproach />
        
        <TechnologyStack />
        
        <TeamSection />
        
        {/* Student Success Stories */}
        <section className="py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Real Students, Real Results
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover how AI-enhanced tutoring transformed their learning
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Sarah M.",
                  grade: "B → A+",
                  subject: "Calculus",
                  quote: "The AI study planner helped me organize my time better than any app. My tutor was amazing, and having 24/7 AI support between sessions kept me on track!",
                  improvement: "+23%"
                },
                {
                  name: "James T.",
                  grade: "C → A",
                  subject: "Physics",
                  quote: "Getting instant AI explanations between tutor sessions was a game-changer. I never felt stuck, and my confidence soared.",
                  improvement: "+31%"
                },
                {
                  name: "Emily R.",
                  grade: "B- → A",
                  subject: "Chemistry",
                  quote: "The AI matched me with the perfect tutor for my learning style. The personalized approach made complex concepts finally click!",
                  improvement: "+27%"
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{story.name}</h3>
                      <p className="text-sm text-muted-foreground">{story.subject}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{story.improvement}</div>
                      <div className="text-sm text-muted-foreground">{story.grade}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{story.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CommitmentSection />
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Experience the perfect blend of expert tutoring and AI innovation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/start-trial")}
                  className="text-lg px-8"
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/diagnostic-quiz")}
                  className="text-lg px-8"
                >
                  Take AI Diagnostic Quiz
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/meet-tutors")}
                  className="text-lg px-8"
                >
                  Browse Tutors
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
