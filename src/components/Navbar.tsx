"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sun, Moon, Menu, X, FileText, Settings } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Magnetic } from "./motion/Magnetic";

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { data, messages } = usePortfolio();
  const PERSONAL = data.personal;
  const unreadCount = messages.filter((m) => m.status === "new").length;
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Live Chennai / IST clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const istString = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setCurrentTime(istString);
      } catch {
        setCurrentTime("IST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll direction detection: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Dark/light mode toggle with smooth transition and saved preference
  useEffect(() => {
    const saved = localStorage.getItem("as_theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("as_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("as_theme", "light");
    }
  };

  const navItems = [
    { label: "Selected Work", href: "#projects", num: "01" },
    { label: "Experience", href: "#experience", num: "02" },
    { label: "System Toolkit", href: "#skills", num: "03" },
    { label: "Academics", href: "#education", num: "04" },
    { label: "Contact", href: "#contact", num: "05" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 transition-transform duration-500 ease-editorial ${
          isScrolledDown && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        } bg-bg/85 backdrop-blur-md hairline-b`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Monogram & Local Clock */}
          <div className="flex items-center gap-6">
            <a
              href="#main-content"
              className="group flex items-center gap-2 font-display font-bold text-sm tracking-tight text-fg"
            >
              <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform duration-200" />
              <span>ANIRUDH SAINI</span>
            </a>

            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-fg-muted pl-6 hairline-l">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CHENNAI, IN</span>
              <span className="text-fg font-medium">{currentTime || "IST"}</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono">
            {navItems.map((item) => (
              <Magnetic key={item.num} strength={0.2}>
                <a
                  href={item.href}
                  className="text-fg-muted hover:text-fg transition-colors flex items-center gap-1 group py-1"
                >
                  <span className="text-[10px] text-fg-faint group-hover:text-accent transition-colors">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle, Resume & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.25}>
              <Link
                href="/admin"
                aria-label="Admin Dashboard"
                className="p-2 text-fg-muted hover:text-fg hover:bg-bg-subtle rounded-md transition-colors relative"
                title="Admin Desk & Editor"
              >
                <Settings className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent animate-ping" />
                )}
              </Link>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                className="p-2 text-fg-muted hover:text-fg hover:bg-bg-subtle rounded-md transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                onClick={onOpenResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-fg border border-line hover:border-accent hover:text-accent transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>CV / Resume</span>
              </button>
            </Magnetic>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-fg hover:bg-bg-subtle rounded-md transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as const }}
            className="fixed inset-0 z-30 bg-bg text-fg flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-fg-faint">
                Navigation Index
              </span>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.num}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    className="flex items-baseline justify-between text-2xl font-display font-bold text-fg hover:text-accent transition-colors hairline-b pb-3"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-fg-muted">/{item.num}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="space-y-4 pt-6 hairline-t">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3 text-center text-xs font-mono uppercase tracking-wider bg-accent text-accent-contrast rounded-md font-semibold"
              >
                View Complete Curriculum Vitae
              </button>
              <div className="flex items-center justify-between text-xs font-mono text-fg-muted pt-2">
                <span>{PERSONAL.location}</span>
                <span>{currentTime}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
