import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Loader2 } from "lucide-react";

const ContactUmbraxis = () => {
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

  const submit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setStatus("sending");
    const to = "umbraxis.dev@gmail.com";
    const subject = encodeURIComponent(form.subject || "Contact from Umbraxis site");
    const bodyContent = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const body = encodeURIComponent(bodyContent);

    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    try {
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        window.location.href = mailto;
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
    <section className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#12121a] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#7d4cff]/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-[#4cf0a0]/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
          Contact <span className="text-[#7d4cff]">Umbraxis</span>
        </h1>
        <p className="text-gray-300 text-center mb-10">
          Have a question, idea, or collaboration? Send us a message — we’d love to hear from you.
        </p>

        <form onSubmit={submit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-black/30 text-white border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#7d4cff] transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-black/30 text-white border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#7d4cff] transition"
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-black/30 text-white border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#7d4cff] transition"
            />
          </div>

          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-black/30 text-white border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#7d4cff] transition min-h-[150px]"
          />

          {errorMsg && <p className="text-red-400 text-sm text-center">{errorMsg}</p>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "sending"}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7d4cff] to-[#4cf0a0] text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-[#7d4cff]/30 transition"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Sending...
              </>
            ) : status === "sent" ? (
              "Open Mail App / Gmail"
            ) : (
              "Send Message"
            )}
          </motion.button>

          {status === "sent" && (
            <p className="text-green-400 text-center text-sm mt-2">
              Opening your mail client... If nothing happens, check popup permissions or copy message manually.
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default ContactUmbraxis;

