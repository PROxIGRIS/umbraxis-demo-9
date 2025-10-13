import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Cpu, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ComputerScience = () => {
  return (
    <main className="min-h-screen">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-6 lg:px-16 py-24 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <Badge variant="orange" className="gap-2">
                <Code className="w-4 h-4" />
                Expert Computer Science Tutoring
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Code Your Future
                </span>
                <span className="block mt-2 text-primary">with Expert Programmers</span>
              </h1>

              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Learn programming, algorithms, and computer science fundamentals from industry experts. Build real projects and develop skills for the digital age.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/start-trial">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 rounded-full group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/tutors">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 rounded-full border-2 hover:border-primary hover:text-primary hover:scale-105 transition-all"
                  >
                    Meet Our CS Tutors
                  </Button>
                </Link>
              </div>

              {/* Stats showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12"
              >
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:scale-105">
                  <Code className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">1200+</div>
                  <div className="text-sm text-muted-foreground">Coders Trained</div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:scale-105">
                  <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">94%</div>
                  <div className="text-sm text-muted-foreground">Project Success Rate</div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:scale-105">
                  <Cpu className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Languages & Tools</div>
                </div>
              </motion.div>

              {/* Topics Covered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="pt-12"
              >
                <h2 className="text-2xl font-bold mb-6">Topics We Cover</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Python", "JavaScript", "Java", "C++", "Web Development", "Data Structures", "Algorithms", "Machine Learning", "Mobile Apps", "Databases", "Cloud Computing", "Cybersecurity"].map((topic, index) => (
                    <div key={index} className="p-4 rounded-xl bg-secondary border border-border text-center hover:border-primary transition-all hover:scale-105">
                      {topic}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </section>
    </main>
  );
};

export default ComputerScience;
