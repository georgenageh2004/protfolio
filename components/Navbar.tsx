"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Moon, Sun } from "lucide-react";

/** Navigation link item type */
interface NavLink {
  id: string;
  label: string;
  href: string;
}

/** Nav link data — drives the menu via map() */
const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/**
 * Responsive Navbar with:
 * - useState for mobile menu open/close and dark mode
 * - useEffect for scroll detection (active section + bg blur)
 * - Active section highlight
 * - Download CV button
 * - Hamburger menu on mobile
 */
export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Detect scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = navLinks.map((link) => link.id);
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const closeMobile = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", closeMobile, { passive: true });
    return () => window.removeEventListener("scroll", closeMobile);
  }, [isMenuOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setIsMenuOpen(false);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <>
      {/* ── DESKTOP & MOBILE NAVBAR ── */}
      <motion.header
        id="navbar"
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? darkMode
              ? "rgba(10, 15, 30, 0.85)"
              : "rgba(248, 250, 252, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${darkMode ? "rgba(148, 163, 184, 0.1)" : "rgba(148, 163, 184, 0.15)"}`
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ── LOGO ── */}
            <motion.a
              href="#home"
              className="relative font-black text-2xl tracking-tight select-none"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              aria-label="George Nageh - Back to top"
            >
              <span className="gradient-text-blue">George</span>
              <span
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full"
                style={{ background: "linear-gradient(90deg, #007AFF, #5977B1)" }}
              />
            </motion.a>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden md:flex items-center gap-2" aria-label="Desktop navigation">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  id={`nav-${link.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="relative px-5 py-2.5 rounded-full text-[15px] font-semibold tracking-wide transition-colors duration-300 select-none group"
                  style={{
                    color: activeSection === link.id ? "var(--primary)" : "var(--text-secondary)",
                  }}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Sliding Active Pill Background */}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[rgba(0,122,255,0.06)] dark:bg-[rgba(0,122,255,0.12)] border border-[rgba(0,122,255,0.08)] dark:border-[rgba(0,122,255,0.15)] z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover effect */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "rgba(0, 122, 255, 0.04)" }}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>

            {/* ── RIGHT ACTIONS ── */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                  color: "var(--text-secondary)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                id="dark-mode-toggle"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={darkMode ? "sun" : "moon"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Download CV Button */}
              <motion.a
                href="/cv.pdf"
                download
                className="hidden md:flex btn-primary text-sm py-2 px-4"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="download-cv-btn"
                aria-label="Download George Nageh's CV"
              >
                <Download size={15} />
                Download CV
              </motion.a>

              {/* Mobile Hamburger */}
              <motion.button
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                  color: "var(--text-primary)",
                }}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                id="hamburger-btn"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="md:hidden glass-strong border-t"
              style={{ borderColor: "var(--border)" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <div className="section-container py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                    style={{
                      color: activeSection === link.id ? "var(--primary)" : "var(--text-secondary)",
                      background: activeSection === link.id ? "rgba(0, 122, 255, 0.08)" : "transparent",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {activeSection === link.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
                    )}
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile Download CV */}
                <motion.a
                  href="/cv.pdf"
                  download
                  className="btn-primary mt-2 justify-center text-sm py-2.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  id="mobile-download-cv"
                >
                  <Download size={15} />
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
