"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";

type Section = {
  id: string;
  label: string;
  shortLabel: string;
};

const sections: Section[] = [
  { id: "about", label: "About Us", shortLabel: "About" },
  { id: "services", label: "Our Services", shortLabel: "Services" },
  { id: "projects", label: "Featured Projects", shortLabel: "Projects" },
  { id: "reviews", label: "What People Are Saying", shortLabel: "Reviews" },
];

export default function SectionNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Use IntersectionObserver on the "about" section to reliably detect
  // when the user has scrolled past the hero — works on all mobile browsers
  useEffect(() => {
    const aboutEl = document.getElementById("about");
    if (!aboutEl) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Show nav when the about section starts entering the viewport
          // or when user has scrolled past it
          const rect = aboutEl.getBoundingClientRect();
          setVisible(rect.top < window.innerHeight * 0.8);
        }
      },
      { threshold: [0, 0.1, 0.5, 1] },
    );

    observerRef.current.observe(aboutEl);
    return () => observerRef.current?.disconnect();
  }, []);

  // Track which section is active via scroll position
  const handleScroll = useCallback(() => {
    // Also update visibility based on scroll position as a fallback
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      const rect = aboutEl.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight * 0.8);
    }

    // Determine which section is currently in view
    let current = "";
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section.id;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={clsx(
        "fixed top-16 sm:top-20 left-0 right-0 z-40 transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none",
      )}
    >
      <div className="bg-white/95 backdrop-blur-md border-b border-keva-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={clsx(
                  "whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all flex-shrink-0",
                  activeSection === section.id
                    ? "bg-keva-orange text-white"
                    : "text-keva-gray-600 hover:text-keva-orange hover:bg-keva-orange/5",
                )}
              >
                <span className="sm:hidden">{section.shortLabel}</span>
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
