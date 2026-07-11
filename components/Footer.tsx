"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

const footerLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const socialLinks = [
  { id: "github", icon: Github, href: "https://github.com/georgenageh2004", label: "GitHub" },
  { id: "linkedin", icon: Linkedin, href: "https://linkedin.com/in/georgenageh", label: "LinkedIn" },
  { id: "email", icon: Mail, href: "mailto:georgenageh2004@gmail.com", label: "Email" },
];

/**
 * Footer component with navigation links, social icons, and copyright.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
      aria-label="Site footer"
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #007AFF, #5977B1, #D75600, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* ── LOGO & TAGLINE ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#home"
              className="text-2xl font-black gradient-text-blue mb-2 inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Back to top"
            >
              George.
            </a>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Frontend Angular Developer
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Cairo, Egypt 🇪🇬
            </p>
          </motion.div>

          {/* ── NAV LINKS ── */}
          <motion.nav
            className="flex flex-wrap justify-center gap-x-4 gap-y-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:text-[#007AFF]"
                style={{ color: "var(--text-muted)" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* ── SOCIAL LINKS ── */}
          <motion.div
            className="flex justify-center md:justify-end gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map(({ id, icon: Icon, href, label }) => (
              <motion.a
                key={id}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border-strong)",
                  color: "var(--text-muted)",
                }}
                whileHover={{
                  scale: 1.15,
                  borderColor: "#007AFF",
                  color: "#007AFF",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
                id={`footer-social-${id}`}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="my-8 h-px"
          style={{ background: "var(--border)" }}
          aria-hidden="true"
        />

        {/* ── BOTTOM ROW ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          <p>
            © {currentYear} George Nageh. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <Heart size={12} className="text-red-500 animate-pulse" aria-hidden="true" />
            using{" "}
            <span className="font-semibold gradient-text-blue">Next.js</span>
            {" & "}
            <span className="font-semibold" style={{ color: "#61DAFB" }}>React</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
