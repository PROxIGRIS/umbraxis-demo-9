import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedWork from "@/components/FeaturedWork";
import Services from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { SubjectSelector } from "@/components/SubjectSelector";
import { ChatWidget } from "@/components/ChatWidget";
import { UrgencyBanner } from "@/components/UrgencyBanner";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <UrgencyBanner />
      <main>
        <Hero />
        
        {/* AI Quiz CTA Banner */}
        <section className="py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                🎯 FREE AI Diagnostic Quiz - Know Your Level in 5 Minutes!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get instant AI-powered analysis, personalized roadmap, and tutor matching
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate("/diagnostic-quiz")}
                className="text-lg px-8"
              >
                Take Free Quiz Now
              </Button>
            </div>
          </div>
        </section>

        <About />
        <SubjectSelector />
        <Testimonials />
        <FeaturedWork />
        <Services />
        <Pricing />
      </main>
      <ChatWidget />
    </div>
  );
};

export default Index;
