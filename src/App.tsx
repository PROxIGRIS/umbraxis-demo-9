import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import StartTrial from "./pages/StartTrial";
import MeetTutors from "./pages/MeetTutors";
import Mathematics from "./pages/Mathematics";
import Science from "./pages/Science";
import Languages from "./pages/Languages";
import ComputerScience from "./pages/ComputerScience";
import DiagnosticQuiz from "./pages/DiagnosticQuiz";
import QuizResults from "./pages/QuizResults";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";
import OnlineClasses from "./pages/OnlineClasses";
import AboutV3 from "./components/AboutV3";
import Admin from "./pages/Admin";
import Driver from "./pages/Driver";
import Tracking from "./pages/Tracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="tutoring-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/online-classes" element={<OnlineClasses />} />
              {/* Tracking System Routes */}
              <Route path="/admin-tracking" element={<Admin />} />
              <Route path="/driver" element={<Driver />} />
              <Route path="/tracking/:driverId" element={<Tracking />} />
              {/* New Routes */}
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/start-trial" element={<StartTrial />} />
              <Route path="/tutors" element={<MeetTutors />} />
              <Route path="/about" element={<AboutV3 />} />
              {/* Subject Routes */}
              <Route path="/mathematics" element={<Mathematics />} />
              <Route path="/science" element={<Science />} />
              <Route path="/languages" element={<Languages />} />
              <Route path="/computer-science" element={<ComputerScience />} />
              <Route path="/diagnostic-quiz" element={<DiagnosticQuiz />} />
              <Route path="/quiz-results" element={<QuizResults />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
