import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StartTrial = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (!form.subject.trim()) return "Please enter a subject.";
    if (!form.message.trim()) return "Please enter your message.";
    return null;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setStatus("sending");
    const to = "umbraxis.dev@gmail.com";
    const subject = encodeURIComponent(form.subject || "Free Trial Request");
    const bodyContent = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const body = encodeURIComponent(bodyContent);

    try {
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      } else {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          to
        )}&su=${subject}&body=${body}`;
        window.open(gmailUrl, "_blank");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Could not open mail client. Message copied to clipboard.");
      navigator.clipboard.writeText(`To: ${to}\nSubject: ${form.subject}\n\n${bodyContent}`);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-background/50 backdrop-blur-xl border border-border rounded-3xl shadow-2xl p-8 md:p-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Start Your <span className="text-primary">Free Trial</span>
        </h1>
        <p className="text-foreground/80 text-center mb-8">
          Experience personalized tutoring with no commitment. Get your first session absolutely free 
          and see how our expert tutors can help you achieve your academic goals.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-lg mb-3">What's Included in Your Free Trial:</h3>
          <ul className="space-y-2 text-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>One complimentary 1-hour tutoring session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Personalized learning assessment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Custom study plan tailored to your needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span>Access to our learning resources library</span>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-background/50 text-foreground border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-background/50 text-foreground border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition"
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Subject (e.g., Math Tutoring Request)"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-background/50 text-foreground border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition"
            />
          </div>

          <textarea
            placeholder="Tell us about your learning goals and what subjects you need help with..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-background/50 text-foreground border border-border rounded-xl p-4 focus:outline-none focus:border-primary transition min-h-[150px]"
          />

          {errorMsg && <p className="text-destructive text-sm text-center">{errorMsg}</p>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "sending"}
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/30 transition hover:bg-primary/90"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Sending...
              </>
            ) : status === "sent" ? (
              "Open Mail App / Gmail"
            ) : (
              "Send Free Trial Request"
            )}
          </motion.button>

          {status === "sent" && (
            <p className="text-primary text-center text-sm mt-2">
              Opening your mail client... If nothing happens, check popup permissions or copy message manually.
            </p>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-foreground/60 mb-4">Want to learn more about our tutors?</p>
          <Link to="/tutors">
            <Button variant="outline" className="rounded-full">
              Meet Our Tutors <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default StartTrial;
