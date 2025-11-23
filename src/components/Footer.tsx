import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Lottie animation
  const sparkleAnimation = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 120,
    w: 100,
    h: 100,
    nm: "Sparkle",
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
          o: { a: 1, k: [{ t: 0, s: [0], e: [100] }, { t: 30, s: [100], e: [0] }, { t: 60 }] },
          r: { a: 1, k: [{ t: 0, s: [0], e: [180] }, { t: 60 }] },
          p: { a: 0, k: [50, 50, 0] },
          s: { a: 1, k: [{ t: 0, s: [0, 0], e: [100, 100] }, { t: 30, s: [100, 100], e: [0, 0] }, { t: 60 }] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "sr",
                p: { a: 0, k: [0, 0] },
                or: { a: 0, k: 15 },
                ir: { a: 0, k: 7 },
                pt: { a: 0, k: 5 },
              },
              {
                ty: "fl",
                c: { a: 0, k: [1, 0.84, 0, 1] },
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

  return (
    <footer className="py-20 bg-foreground text-background relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Top CTA */}
          <div className="text-center mb-16 pb-16 border-b border-background/10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Let's build something amazing
            </h3>
            <p className="text-background/70 text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it and bring your vision to life.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </Button>
          </div>


          {/* Grid Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Company Info */}
            <div className="space-y-4 lg:col-span-2">
              <h3 className="text-2xl font-bold">Umbraxis</h3>
              <p className="text-background/70 leading-relaxed max-w-md">
                Premium web development agency crafting exceptional digital experiences 
                for forward-thinking brands worldwide.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-background/10 hover:scale-110 transition-all">
                  <Github className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-background/10 hover:scale-110 transition-all">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-background/10 hover:scale-110 transition-all">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/" className="hover:text-background transition-colors inline-block">Home</Link></li>
                <li><Link to="/tutors" className="hover:text-background transition-colors inline-block">Our Tutors</Link></li>
                <li><Link to="/start-trial" className="hover:text-background transition-colors inline-block">Start Free Trial</Link></li>
                <li><Link to="/contact" className="hover:text-background transition-colors inline-block">Contact Us</Link></li>
              </ul>
            </div>

            {/* Subjects */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Subjects</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/mathematics" className="hover:text-background transition-colors inline-block">Mathematics</Link></li>
                <li><Link to="/science" className="hover:text-background transition-colors inline-block">Science</Link></li>
                <li><Link to="/languages" className="hover:text-background transition-colors inline-block">Languages</Link></li>
                <li><Link to="/computer-science" className="hover:text-background transition-colors inline-block">Computer Science</Link></li>
              </ul>
            </div>

          </div>


          {/* Crafted by Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 mb-12"
          >
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-3xl p-10 overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <div className="absolute top-4 right-4 w-20 h-20 opacity-50">
                <Lottie animationData={sparkleAnimation} loop />
              </div>
              <div className="absolute bottom-4 left-4 w-16 h-16 opacity-40">
                <Lottie animationData={sparkleAnimation} loop />
              </div>

              <div className="text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Crafted by <span className="text-primary">Umbraxis</span>
                </h2>
                <p className="text-background/70 text-lg mb-6">
                  Premium web development & digital experiences
                </p>
                <a
                  href="https://umbraxis.vercel.app"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Visit Umbraxis
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>


          {/* Bottom Footer Bar */}
          <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2025 Umbraxis. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-background/60">
              <Link to="/privacy-policy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>


          {/* Made by Umbraxis */}
          <div className="text-center mt-8">
            <a
              href="https://umbraxis.vercel.app"
              target="_blank"
              className="text-background/50 hover:text-background text-sm transition-colors inline-flex items-center gap-1 group"
            >
              Made with ❤️ by 
              <span className="text-primary font-semibold group-hover:underline">Umbraxis</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
