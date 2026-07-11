"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";
import SectionTitle from "./SectionTitle";

/** Contact info items rendered via map() */
const contactItems = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "georgenageh2004@gmail.com",
    href: "mailto:georgenageh2004@gmail.com",
    color: "#D75600",
  },
  {
    id: "phone",
    icon: Phone,
    label: "Phone",
    value: "+20 1234 567 890",
    href: "tel:+201234567890",
    color: "#007AFF",
  },
  {
    id: "location",
    icon: MapPin,
    label: "Location",
    value: "Cairo, Egypt",
    href: "https://maps.google.com/?q=Cairo,Egypt",
    color: "#5977B1",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/georgenageh",
    href: "https://linkedin.com/in/georgenageh",
    color: "#0A66C2",
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    value: "github.com/georgenageh2004",
    href: "https://github.com/georgenageh2004",
    color: "#0F172A",
  },
];

/**
 * Contact section with:
 * - useState for form fields and submission state
 * - Contact info items rendered via map()
 * - Simple contact form with validation feedback
 */
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission delay
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1.5px solid var(--border-strong)",
    borderRadius: "12px",
    padding: "0.75rem 1rem",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "inherit",
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      aria-label="Contact section"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,122,255,0.06) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionTitle
          label="Get In Touch"
          title="Let's Work Together"
          highlight="Together"
          subtitle="I'm currently looking for Frontend or Software Engineering internship opportunities. Feel free to reach out!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
          {/* ── LEFT: CONTACT INFO ── */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Intro */}
            <div
              className="glass rounded-2xl p-6 mb-6"
              style={{ borderColor: "rgba(0,122,255,0.15)" }}
            >
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Whether you have a project in mind, want to collaborate, or just want to say hello —
                my inbox is always open. I&apos;ll get back to you as soon as possible!
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#22c55e" }}
                />
                <span className="text-sm font-medium" style={{ color: "#22c55e" }}>
                  Available for opportunities
                </span>
              </div>
            </div>

            {/* Contact Items — rendered via map() */}
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="contact-item group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  aria-label={`${item.label}: ${item.value}`}
                  id={`contact-${item.id}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.color}18` }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>
                      {item.label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* ── RIGHT: CONTACT FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              // Success state
              <motion.div
                className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-4 h-full min-h-[400px] text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle size={56} style={{ color: "#22c55e" }} />
                </motion.div>
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  Message Sent! 🎉
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                  className="btn-outline text-sm mt-2"
                  id="send-another-btn"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              // Form
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 md:p-8 space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  Send Me a Message
                </h3>

                {/* Name field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="George Nageh"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007AFF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,122,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-strong)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007AFF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,122,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-strong)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi George, I wanted to reach out about..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007AFF";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,122,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-strong)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  id="contact-submit-btn"
                  aria-label="Send message"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
