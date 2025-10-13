import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: '49',
    period: 'per month',
    description: 'Perfect for students starting their journey',
    features: [
      '4 tutoring sessions per month',
      'Access to resource library',
      'Email support',
      'Session recordings',
      'Progress tracking',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    icon: Crown,
    price: '89',
    period: 'per month',
    description: 'Most popular for serious students',
    features: [
      '8 tutoring sessions per month',
      'Priority scheduling',
      'All Starter features',
      '24/7 chat support',
      'Personalized study plans',
      'Practice worksheets',
      'Monthly progress reports',
    ],
    popular: true,
  },
  {
    name: 'Elite',
    icon: Rocket,
    price: '149',
    period: 'per month',
    description: 'Ultimate support for top achievers',
    features: [
      'Unlimited tutoring sessions',
      'All Pro features',
      'Dedicated tutor',
      'Parent portal access',
      'College prep guidance',
      'SAT/ACT prep materials',
      'Weekly check-ins',
      'Guaranteed results',
    ],
    popular: false,
  },
];

export const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
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
              <Crown className="w-5 h-5" />
              <span className="font-semibold">Pricing Plans</span>
            </div>
          </motion.div>
          
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Choose Your Path to Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible plans designed to fit every student's needs and budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </motion.div>
                )}
                
                <Card 
                  className={`h-full transition-all duration-300 hover:shadow-2xl ${
                    plan.popular 
                      ? 'border-4 border-primary scale-105' 
                      : 'border-2 hover:border-primary/50'
                  }`}
                >
                  <CardHeader className="text-center pb-8">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                        plan.popular
                          ? 'bg-gradient-to-br from-primary to-accent'
                          : 'bg-muted'
                      }`}
                    >
                      <Icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                    </motion.div>
                    
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm">/{plan.period.split(' ')[1]}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIdx) => (
                        <motion.li
                          key={featureIdx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + featureIdx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => navigate('/start-trial')}
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-primary to-accent hover:shadow-xl'
                          : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            All plans include a <span className="text-primary font-semibold">14-day free trial</span>. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
