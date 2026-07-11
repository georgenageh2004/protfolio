"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";

/**
 * Main page — composes all portfolio sections.
 * Manages global dark mode state via useState + useEffect (persists to localStorage).
 */
export default function Home() {
  // ── DARK MODE STATE ──
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("portfolio-dark-mode");
    if (stored !== null) {
      setDarkMode(stored === "true");
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply dark class to <html> element whenever darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-dark-mode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div
      id="app-root"
      style={{
        background: "var(--bg)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ── LOADING SCREEN ── */}
      <LoadingScreen />

      {/* ── SCROLL PROGRESS BAR ── */}
      <ScrollProgress />

      {/* ── NAVBAR ── */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* ── MAIN CONTENT ── */}
      <main id="main-content">
        {/* Hero */}
        <Hero darkMode={darkMode} />

        {/* About Me */}
        <About />

        {/* Skills */}
        <Skills />

        {/* Projects */}
        <Projects />

        {/* Contact */}
        <Contact />
      </main>

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── SCROLL TO TOP ── */}
      <ScrollToTop />
    </div>
  );
}
