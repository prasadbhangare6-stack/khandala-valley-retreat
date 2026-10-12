"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp, Phone, MessageCircle, MapPin, Navigation } from "lucide-react";
import { navLinks, property } from "@/lib/data";
import { Reveal, EASE } from "./motion/Reveal";

function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 800));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: EASE }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="group fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center border border-ivory/25 bg-ink/85 text-champagne backdrop-blur-md transition-colors duration-500 hover:border-brass hover:text-brass-2 md:bottom-8 md:right-8"
        >
          <ArrowUp
            className="h-4.5 w-4.5 transition-transform duration-500 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink">
      {/* brass hairline top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brass/50 to-transparent" />

      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-24 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40">
                  <svg viewBox="0 0 40 40" className="h-6 w-6 text-champagne" aria-hidden>
                    <path
                      d="M8 30 C 12 18, 16 12, 20 8 C 24 12, 28 18, 32 30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path d="M8 30 H 32" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[1.6rem] font-medium leading-none text-ivory">
                    {property.name}
                  </p>
                  <p className="mt-1.5 text-[0.85rem] text-champagne/70">{property.nameHi}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[26rem] text-[0.95rem] leading-[1.9] text-ivory/62">
                A small resort in the Sahyadri hills near Lonavala — thirteen guestrooms, an
                outdoor pool, an on-site restaurant, and the green Kune valley at every window.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={property.phoneHref} className="btn btn-ghost-light !px-5 !py-2.5 !text-[0.62rem]">
                  <span className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {property.phone}
                  </span>
                </a>
                <a
                  href={property.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost-light !px-5 !py-2.5 !text-[0.62rem]"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                    WhatsApp
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* nav */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <Reveal delay={0.1}>
              <p className="eyebrow text-brass-2">Explore</p>
              <ul className="mt-7 space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-3 text-[0.95rem] text-ivory/65 transition-colors duration-400 hover:text-ivory"
                    >
                      <span className="h-px w-4 bg-brass/60 transition-all duration-500 group-hover:w-7 group-hover:bg-brass" />
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#book"
                    className="group inline-flex items-center gap-3 text-[0.95rem] text-champagne transition-colors duration-400 hover:text-ivory"
                  >
                    <span className="h-px w-4 bg-brass transition-all duration-500 group-hover:w-7" />
                    Book Your Stay
                  </a>
                </li>
              </ul>
            </Reveal>
          </nav>

          {/* location + policies */}
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <p className="eyebrow text-brass-2">Find Us</p>
              <address className="mt-7 not-italic text-[0.95rem] leading-[1.9] text-ivory/62">
                {property.address.line1}
                <br />
                {property.address.line2}
                <br />
                {property.address.line3}
              </address>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={property.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-[0.72rem] font-medium uppercase tracking-[0.22em] text-champagne"
                >
                  <Navigation className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Directions
                </a>
                <a href={property.phoneHref} className="link-line text-[0.72rem] font-medium uppercase tracking-[0.22em] text-champagne">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {property.address.plusCode.split(" ")[0]}
                </a>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                <a href="#book" className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory/45 transition-colors hover:text-champagne">
                  Privacy Policy
                </a>
                <a href="#book" className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory/45 transition-colors hover:text-champagne">
                  Terms
                </a>
                <a href="#contact" className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory/45 transition-colors hover:text-champagne">
                  Cancellation Policy
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-ivory/10 pt-8 md:flex-row md:items-center">
          <p className="text-[0.72rem] tracking-[0.12em] text-ivory/50">
            © {new Date().getFullYear()} {property.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={property.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory/45 transition-colors hover:text-champagne"
            >
              Google Maps
            </a>
            <span className="text-ivory/20">|</span>
            <span className="text-[0.72rem] tracking-[0.12em] text-ivory/35">
              Designed for {property.name} · {property.nameHi}
            </span>
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
