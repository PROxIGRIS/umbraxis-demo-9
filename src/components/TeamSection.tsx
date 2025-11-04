import { motion } from "framer-motion";
import { allTutors } from "@/data/tutors";
import { Star } from "lucide-react";

const TeamSection = () => {
  const leadership = [
    {
      name: "Dr. Emily Stevens",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Former Harvard professor passionate about democratizing education through technology",
      vision: "Every student deserves world-class instruction tailored to their unique needs"
    },
    {
      name: "Prof. Marcus Johnson",
      role: "Head of Curriculum",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
      bio: "20+ years designing innovative learning programs for diverse student populations",
      philosophy: "Education is not one-size-fits-all; it's a journey of personal discovery"
    },
    {
      name: "Dr. Aisha Patel",
      role: "AI Technology Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "MIT PhD in Machine Learning, pioneering adaptive education algorithms",
      focus: "Building AI that amplifies human teaching, not replaces it"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Leadership Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Passionate educators and innovators driving our mission
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-primary font-semibold mb-3">{leader.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">{leader.bio}</p>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs italic">"{leader.vision || leader.philosophy || leader.focus}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tutor Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Expert Tutors
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Top 5% of educators, rigorously selected for excellence
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {allTutors.slice(0, 6).map((tutor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-lg overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">{tutor.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-2">{tutor.subject}</p>
                  <p className="text-xs text-muted-foreground mb-3">{tutor.education}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{tutor.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tutor.students}+ students
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tutor.specialties.slice(0, 2).map((specialty, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.a
              href="/meet-tutors"
              whileHover={{ scale: 1.05 }}
              className="inline-block text-primary hover:underline font-semibold"
            >
              View All Tutors →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
