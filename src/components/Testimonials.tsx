import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Johnson',
    grade: 'Grade 10',
    subject: 'Mathematics',
    beforeGrade: 'C',
    afterGrade: 'A',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    quote: 'My math grades improved dramatically! The personalized attention and clear explanations made all the difference.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    grade: 'Grade 11',
    subject: 'Physics',
    beforeGrade: 'B-',
    afterGrade: 'A+',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    quote: 'The tutors here are amazing! They made physics fun and easy to understand. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    grade: 'Grade 9',
    subject: 'English',
    beforeGrade: 'B',
    afterGrade: 'A',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    quote: 'My writing skills improved so much! The feedback was always helpful and encouraging.',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
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
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">Success Stories</span>
            </div>
          </motion.div>
          
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Student Transformations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real students who transformed their academic journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.grade}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-destructive/10 to-primary/10 p-4 rounded-xl mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-destructive">{testimonial.beforeGrade}</div>
                        <div className="text-xs text-muted-foreground">Before</div>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary animate-pulse" />
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{testimonial.afterGrade}</div>
                        <div className="text-xs text-muted-foreground">After</div>
                      </div>
                    </div>
                    <div className="text-center mt-2 text-sm font-semibold text-primary">
                      {testimonial.subject}
                    </div>
                  </div>

                  <p className="text-muted-foreground italic leading-relaxed group-hover:text-foreground transition-colors">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
