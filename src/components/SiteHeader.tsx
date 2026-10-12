"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { navLinks, property } from "@/lib/data";
import { cn } from "@/lib/utils";
import { EASE } from "./motion/Reveal";

function Wordmark({ light }: { light: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3.5" aria-label={`${property.name} — home`}>
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500",
          light
            ? "border-champagne/50 text-champagne group-hover:border-brass-2"
            : "border-ink/25 text-ink group-hover:border-brass-3"
        )}
      >
        <svg viewBox="0 0 40 40" className="h-5 w-5" aria-hidden>
          <path
            d="M8 30 C 12 18, 16 12, 20 8 C 24 12, 28 18, 32 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M8 30 H 32" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.02rem] leading-tight tracking-[0.02em] transition-colors duration-500 sm:text-[1.22rem]",
            light ? "text-ivory" : "text-ink"
          )}
          style={{ fontWeight: 500 }}
        >
          Khandala Valley Retreat
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.56rem] font-normal uppercase tracking-[0.42em] transition-colors duration-500 sm:block",
            light ? "text-champagne/75" : "text-stone"
          )}
        >
          Khandala · Sahyadri Hills
        </span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const light = !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-ink/8 bg-ivory/88 backdrop-blur-lux"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* scroll progress hairline */}
        <motion.div
          className="absolute inset-x-0 top-0 h-px origin-left bg-brass"
          style={{ scaleX: progress }}
          aria-hidden
        />
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 lg:px-14 lg:py-5">
          <Wordmark light={light} />

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative py-1 text-[0.7rem] font-normal uppercase tracking-[0.22em] transition-colors duration-400",
                  light ? "text-ivory/85 hover:text-ivory" : "text-ink/75 hover:text-ink"
                )}
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href={property.phoneHref}
              className={cn(
                "flex items-center gap-2 text-[0.7rem] font-normal uppercase tracking-[0.22em] transition-colors duration-400",
                light ? "text-champagne/85 hover:text-champagne" : "text-stone hover:text-ink"
              )}
              aria-label={`Call ${property.name} on ${property.phone}`}
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.4} />
              <span className="hidden xl:inline">{property.phone}</span>
            </a>
            <a
              href="#book"
              className={cn("btn btn-brass !px-6 !py-3 text-[0.66rem]", light && "shadow-[0_10px_40px_-12px_rgba(185,143,90,0.55)]")}
            >
              <span>Reserve</span>
            </a>
          </nav>

          {/* mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "flex h-11 w-11 items-center justify-center border transition-colors duration-400 lg:hidden",
              light
                ? "border-ivory/35 text-ivory"
                : "border-ink/20 text-ink"
            )}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.4} /> : <Menu className="h-5 w-5" strokeWidth={1.4} />}
          </button>
        </div>
      </header>

      {/* mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-28">
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 + i * 0.06, duration: 0.65, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between border-b border-ivory/10 py-4"
                      >
                        <span className="font-display text-3xl text-ivory">
                          {link.label}
                        </span>
                        <span className="text-[0.62rem] uppercase tracking-[0.28em] text-champagne/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="mt-10 space-y-5"
              >
                <a href="#book" onClick={() => setOpen(false)} className="btn btn-brass w-full">
                  <span className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4" strokeWidth={1.5} />
                    Book Your Stay
                  </span>
                </a>
                <a href={property.phoneHref} className="btn btn-ghost-light w-full">
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" strokeWidth={1.5} />
                    {property.phone}
                  </span>
                </a>
                <p className="pt-2 text-[0.78rem] leading-relaxed text-ivory/55">
                  {property.address.line2}
                  <br />
                  {property.address.line3}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
