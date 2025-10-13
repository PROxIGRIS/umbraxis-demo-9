import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { allTutors } from "@/data/tutors";

const MeetTutors = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-secondary to-background py-20 px-6 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="orange" className="mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            Expert Educators
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Meet Our <span className="text-primary">Expert Tutors</span>
          </h1>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            Learn from the best. Our tutors are carefully selected experts with proven track records 
            of helping students achieve their academic dreams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {allTutors.map((tutor, index) => (
            <motion.div
              key={tutor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 h-full">
                <div className="relative mb-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {tutor.rating}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-center mb-1">{tutor.name}</h3>
                <p className="text-primary text-center font-medium mb-3">{tutor.subject}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-foreground/70">
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Experience
                    </span>
                    <span className="font-medium">{tutor.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-foreground/70">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      Students
                    </span>
                    <span className="font-medium">{tutor.students}+</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-foreground/60 mb-2">
                    <GraduationCap className="w-4 h-4 inline mr-1" />
                    {tutor.education}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-foreground/60 mb-2 font-semibold">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {tutor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 mt-2">
                  Book Session
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-foreground/70 mb-6">
            Begin your journey with a free trial session. Experience personalized learning with our expert tutors.
          </p>
          <Link to="/start-trial">
            <Button size="lg" className="rounded-full px-8">
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTutors;
