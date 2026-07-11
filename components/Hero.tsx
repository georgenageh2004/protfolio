"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowDown, ChevronRight, GraduationCap, Code2 } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

/** Rotating subtitle texts for the typing effect */
const subtitles = [
  "Frontend Angular Developer",
  "Next.js Enthusiast",
  "Full Stack Explorer",
  "UI/UX Craftsman",
];

interface SocialLink {
  id: string;
  icon: React.ElementType;
  href: string;
  label: string;
  hoverColor: string; // static hover color
  darkColor?: string; // optional alternate for dark mode
}

/** Social links data — colors are plain strings; dark-mode logic handled inline */
const socialLinks: SocialLink[] = [
  {
    id: "github",
    icon: Github,
    href: "https://github.com/georgenageh2004",
    label: "GitHub",
    hoverColor: "#6e7681",
    darkColor: "#ffffff",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    href: "https://linkedin.com/in/georgenageh",
    label: "LinkedIn",
    hoverColor: "#0A66C2",
  },
  {
    id: "email",
    icon: Mail,
    href: "mailto:georgenageh2004@gmail.com",
    label: "Send Email",
    hoverColor: "#D75600",
  },
];

interface HeroProps {
  darkMode: boolean;
}

/**
 * Hero section with:
 * - useState for typing effect
 * - useEffect for subtitle rotation
 * - Split layout: text left, profile image right
 * - Floating animated shapes
 * - Social icons
 */
export default function Hero({ darkMode }: HeroProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typing effect — types out and erases subtitle text
  useEffect(() => {
    const current = subtitles[subtitleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 60);
      } else {
        // Pause at end before erasing
        timeout = setTimeout(() => setIsTyping(false), 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 35);
      } else {
        // Move to next subtitle
        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, subtitleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
      aria-label="Hero section"
    >
      {/* ── DECORATIVE BACKGROUND SHAPES ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Large blurred primary blob */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #007AFF 0%, transparent 70%)" }}
        />
        {/* Secondary blob */}
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-8 animate-float-delayed"
          style={{ background: "radial-gradient(circle, #5977B1 0%, transparent 70%)" }}
        />
        {/* Floating geometric shapes */}
        <div
          className="absolute top-32 left-[8%] w-12 h-12 rounded-xl border-2 opacity-20 animate-float"
          style={{ borderColor: "#007AFF", transform: "rotate(15deg)" }}
        />
        <div
          className="absolute top-48 right-[12%] w-8 h-8 rounded-full opacity-20 animate-float-delayed"
          style={{ background: "#5977B1" }}
        />
        <div
          className="absolute bottom-32 left-[20%] w-6 h-6 opacity-15 animate-float"
          style={{ background: "#D75600", borderRadius: "3px", transform: "rotate(45deg)" }}
        />
        <div
          className="absolute bottom-24 right-[25%] w-10 h-10 rounded-full border-2 opacity-15 animate-float-delayed"
          style={{ borderColor: "#D75600" }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="section-container w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: TEXT CONTENT ── */}
          <motion.div
            className="flex flex-col gap-6 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(0,122,255,0.06)",
                  border: "1px solid rgba(0,122,255,0.15)",
                  color: "var(--primary)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                Available for Internships
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              className="text-lg font-medium"
              style={{ color: "var(--text-secondary)" }}
              variants={itemVariants}
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              className="hero-title"
              variants={itemVariants}
            >
              <span style={{ color: "var(--text-primary)" }}>George </span>
              <span className="gradient-text-blue">Nageh</span>
            </motion.h1>

            {/* Typing Subtitle */}
            <motion.div
              className="text-xl md:text-2xl font-semibold h-8 flex items-center"
              style={{ color: "var(--primary)" }}
              variants={itemVariants}
            >
              <span className="cursor-blink">{displayText}</span>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p
              className="text-base leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
              variants={itemVariants}
            >
              Computer Science student passionate about building modern, responsive web
              applications using <strong style={{ color: "var(--text-primary)" }}>Angular</strong>,{" "}
              <strong style={{ color: "var(--text-primary)" }}>Next.js</strong>, and{" "}
              <strong style={{ color: "var(--text-primary)" }}>.NET</strong>. I enjoy creating
              clean user experiences and solving real-world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                id="hero-view-projects"
              >
                View Projects
                <ChevronRight size={16} />
              </a>
              <a
                href="#contact"
                className="btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                id="hero-contact-me"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="flex items-center gap-3 mt-2"
              variants={itemVariants}
            >
              <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Find me on
              </span>
              <div className="h-px w-12 bg-[var(--border-strong)]" aria-hidden="true" />
              <div className="flex gap-3">
                {socialLinks.map(({ id, icon: Icon, href, label, hoverColor, darkColor }) => {
                  // For GitHub, swap color based on dark mode
                  const resolvedColor =
                    id === "github" && darkMode && darkColor ? darkColor : hoverColor;
                  return (
                    <motion.a
                      key={id}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border"
                      style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text-secondary)",
                      }}
                      whileHover={{
                        scale: 1.15,
                        y: -2,
                        borderColor: resolvedColor,
                        color: resolvedColor,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                      id={`hero-social-${id}`}
                    >
                      <Icon size={17} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: PROFILE IMAGE ── */}
          <motion.div
            className="relative flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {/* Glowing ring behind image */}
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl animate-pulse-glow"
              style={{
                background: "radial-gradient(circle, #007AFF 0%, #5977B1 50%, transparent 80%)",
                transform: "scale(0.9)",
              }}
              aria-hidden="true"
            />

            {/* Profile container with floating animation */}
            <motion.div
              className="relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              {/* Decorative rotating ring */}
              <div
                className="absolute -inset-4 rounded-full border-2 border-dashed opacity-20 animate-spin"
                style={{
                  borderColor: "#007AFF",
                  animationDuration: "20s",
                }}
                aria-hidden="true"
              />

              {/* Gradient backdrop circle */}
              <div
                className="absolute -inset-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(0,122,255,0.2) 0%, rgba(89,119,177,0.1) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Profile Image */}
              {/* <div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 shadow-2xl"
                style={{
                  borderColor: "rgba(0, 122, 255, 0.3)",
                  boxShadow: "0 20px 60px rgba(0, 122, 255, 0.25), 0 0 0 1px rgba(0,122,255,0.1)",
                }}
              >
                <Image */}
              {/* src="/profile.png"
                  alt="George Nageh - Frontend Angular Developer"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div> */}

              {/* Floating experience badge */}
              <motion.div
                className="absolute -bottom-4 -left-8 glass rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={20} className="text-[#007AFF]" />
                  <div>
                    <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      CS Student
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      El Shorouk Academy
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating tech badge */}
              <motion.div
                className="absolute -top-4 -right-8 glass rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-2.5">
                  <Code2 size={20} className="text-[#007AFF]" />
                  <div>
                    <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      Angular Dev
                    </div>
                    <div className="text-xs" style={{ color: "var(--primary)" }}>
                      Frontend
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── SCROLL DOWN INDICATOR ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to About section"
        >
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} style={{ color: "var(--primary)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
