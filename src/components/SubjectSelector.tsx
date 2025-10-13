import { motion } from 'framer-motion';
import { Calculator, Beaker, Book, Globe, Code, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const subjects = [
  {
    name: 'Mathematics',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    tutors: 25,
    description: 'Algebra, Calculus, Geometry & More',
  },
  {
    name: 'Science',
    icon: Beaker,
    color: 'from-green-500 to-emerald-500',
    tutors: 20,
    description: 'Physics, Chemistry, Biology',
  },
  {
    name: 'English',
    icon: Book,
    color: 'from-purple-500 to-pink-500',
    tutors: 18,
    description: 'Literature, Writing, Grammar',
  },
  {
    name: 'Languages',
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    tutors: 15,
    description: 'Spanish, French, Mandarin',
  },
  {
    name: 'Programming',
    icon: Code,
    color: 'from-indigo-500 to-blue-500',
    tutors: 12,
    description: 'Python, Java, Web Development',
  },
  {
    name: 'Arts',
    icon: Music,
    color: 'from-pink-500 to-rose-500',
    tutors: 10,
    description: 'Music, Drawing, Creative Writing',
  },
];

export const SubjectSelector = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Book className="w-5 h-5" />
              <span className="font-semibold">Subjects We Teach</span>
            </div>
          </motion.div>
          
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Find Your Perfect Subject
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert tutors ready to help you excel in any subject
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subjects.map((subject, idx) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl group cursor-pointer">
                  <div className={`h-2 bg-gradient-to-r ${subject.color}`}></div>
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{subject.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background"
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {subject.tutors}+ tutors
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate('/tutors')}
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:border-transparent"
                    >
                      View Tutors
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => navigate('/start-trial')}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:shadow-xl"
          >
            Start Your Free Trial
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
