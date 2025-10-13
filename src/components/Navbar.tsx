import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Umbraxis Studio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/tutors"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Our Tutors
            </Link>
            <a
              href="#services"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
          </div>

          {/* Right Side - Always Visible */}
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Shield className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {user ? (
              <Button 
                variant="outline" 
                className="rounded-full px-4 md:px-6 text-sm"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="rounded-full px-4 md:px-6 text-sm">
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/start-trial" className="hidden sm:block">
              <Button className="rounded-full px-4 md:px-6 text-sm bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                Start Free Trial
              </Button>
            </Link>
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-6 mt-8">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      to="/tutors"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Our Tutors
                    </Link>
                    <a
                      href="#services"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Services
                    </a>
                    <a
                      href="#about"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      About
                    </a>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <Shield className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <Link to="/start-trial" onClick={() => setIsOpen(false)} className="sm:hidden">
                      <Button className="w-full rounded-full px-6 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                        Start Free Trial
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
