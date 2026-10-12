"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CalendarCheck,
  Users,
  BedDouble,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { hero } from "@/lib/data";
import { EASE } from "./motion/Reveal";
import { Magnetic } from "./motion/Magnetic";
import { useBooking } from "@/lib/booking-context";
import { nightsBetween } from "@/lib/utils";

function MiniBookingBar() {
  const b = useBooking();
  const [open, openSet] = useState<null | "adults" | "rooms">(null);
  const nights = nightsBetween(b.checkIn, b.checkOut);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.55, duration: 1, ease: EASE }}
      className="mx-auto w-full max-w-[1240px] px-5 md:px-10"
    >
      <form
        aria-label="Check availability"
        onSubmit={(e) => {
          e.preventDefault();
          document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="grid grid-cols-2 gap-px border border-ivory/12 bg-ink/85 shadow-[0_30px_80px_-30px_rgba(8,12,10,0.85)] backdrop-blur-lux md:grid-cols-[1.15fr_1.15fr_0.9fr_0.9fr_auto]"
      >
        <label className="flex flex-col gap-1.5 bg-ink/70 px-5 py-4 transition-colors duration-500 hover:bg-ink/55 md:px-6 md:py-5">
          <span className="text-[0.58rem] uppercase tracking-[0.3em] text-champagne/70">Check in</span>
          <input
            type="date"
            value={b.checkIn}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => b.setCheckIn(e.target.value)}
            className="w-full bg-transparent font-display text-lg text-ivory outline-none [color-scheme:dark]"
          />
        </label>
        <label className="flex flex-col gap-1.5 bg-ink/70 px-5 py-4 transition-colors duration-500 hover:bg-ink/55 md:px-6 md:py-5">
          <span className="text-[0.58rem] uppercase tracking-[0.3em] text-champagne/70">Check out</span>
          <input
            type="date"
            value={b.checkOut}
            min={b.checkIn}
            onChange={(e) => b.setCheckOut(e.target.value)}
            className="w-full bg-transparent font-display text-lg text-ivory outline-none [color-scheme:dark]"
          />
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => openSet(open === "adults" ? null : "adults")}
            aria-expanded={open === "adults"}
            className="flex h-full w-full flex-col items-start gap-1.5 bg-ink/70 px-5 py-4 text-left transition-colors duration-500 hover:bg-ink/55 md:px-6 md:py-5"
          >
            <span className="flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.3em] text-champagne/70">
              <Users className="h-3 w-3" strokeWidth={1.5} /> Guests
            </span>
            <span className="font-display text-lg text-ivory">
              {b.adults} adult{b.adults > 1 ? "s" : ""}
              {b.children > 0 ? `, ${b.children} child${b.children > 1 ? "ren" : ""}` : ""}
            </span>
          </button>
          <AnimatePresence>
            {open === "adults" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute left-0 top-full z-30 w-full min-w-[230px] border border-ivory/12 bg-ink p-4 shadow-2xl"
              >
                {([
                  ["Adults", b.adults, b.setAdults, 1, 10],
                  ["Children", b.children, b.setChildren, 0, 6],
                ] as const).map(([label, val, set, min, max]) => (
                  <div key={label} className="flex items-center justify-between py-2">
                    <span className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory/75">
                      {label}
                    </span>
                    <span className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Fewer ${label.toLowerCase()}`}
                        onClick={() => set(Math.max(min, val - 1))}
                        className="flex h-7 w-7 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-brass hover:text-brass-2"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center font-display text-lg text-ivory">{val}</span>
                      <button
                        type="button"
                        aria-label={`More ${label.toLowerCase()}`}
                        onClick={() => set(Math.min(max, val + 1))}
                        className="flex h-7 w-7 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-brass hover:text-brass-2"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => openSet(open === "rooms" ? null : "rooms")}
            aria-expanded={open === "rooms"}
            className="flex h-full w-full flex-col items-start gap-1.5 bg-ink/70 px-5 py-4 text-left transition-colors duration-500 hover:bg-ink/55 md:px-6 md:py-5"
          >
            <span className="flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.3em] text-champagne/70">
              <BedDouble className="h-3 w-3" strokeWidth={1.5} /> Rooms
            </span>
            <span className="font-display text-lg text-ivory">
              {b.rooms} room{b.rooms > 1 ? "s" : ""}
            </span>
          </button>
          <AnimatePresence>
            {open === "rooms" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute right-0 top-full z-30 w-full min-w-[190px] border border-ivory/12 bg-ink p-4 shadow-2xl"
              >
                <div className="flex items-center justify-between py-2">
                  <span className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory/75">Rooms</span>
                  <span className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Fewer rooms"
                      onClick={() => b.setRooms(Math.max(1, b.rooms - 1))}
                      className="flex h-7 w-7 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-brass hover:text-brass-2"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center font-display text-lg text-ivory">{b.rooms}</span>
                    <button
                      type="button"
                      aria-label="More rooms"
                      onClick={() => b.setRooms(Math.min(6, b.rooms + 1))}
                      className="flex h-7 w-7 items-center justify-center border border-ivory/20 text-ivory/80 transition-colors hover:border-brass hover:text-brass-2"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button type="submit" className="btn btn-brass h-full !rounded-none !py-5 max-md:col-span-2">
          <span className="flex items-center justify-center gap-2">
            <CalendarCheck className="h-4 w-4" strokeWidth={1.5} />
            Search{nights > 0 ? ` · ${nights} night${nights > 1 ? "s" : ""}` : ""}
          </span>
        </button>
      </form>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "13%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.82], [1, 0]);

  return (
    <section id="top" className="relative bg-ink" aria-label="Welcome">
      {/* full-bleed visual stage */}
      <div ref={ref} className="relative min-h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: imgY, scale: imgScale }}
          initial={reduce ? { scale: 1 } : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        >
          <Image
            src="/images/hero-valley.jpg"
            alt="Misty green valley below an infinity pool at golden hour — illustrative photography for Khandala Valley Retreat"
            fill
            priority
            sizes="100vw"
            quality={86}
            className="object-cover"
          />
        </motion.div>

        <div className="scrim-hero absolute inset-0" aria-hidden />

        {!reduce && (
          <motion.div
            className="absolute inset-0 z-30 origin-bottom bg-ink"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.15, ease: EASE, delay: 0.15 }}
            aria-hidden
          />
        )}

        <motion.div
          style={{ y: textY, opacity: fade }}
          className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-end px-5 pb-36 pt-40 md:px-10 md:pb-40 lg:px-14"
        >
          <div className="max-w-[54rem]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1, ease: EASE }}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-brass" />
              <span className="eyebrow text-champagne">{hero.eyebrow}</span>
            </motion.div>

            <h1 className="font-display text-display-xl font-light leading-[0.98] tracking-[-0.015em] text-ivory">
              <span className="sr-only">{hero.headlineWords.join(" ")}</span>
              <span aria-hidden>
                {hero.headlineWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? { y: 0, opacity: 1 } : { y: "118%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ delay: 0.95 + i * 0.11, duration: 1.15, ease: EASE }}
                    >
                      {word}
                      {i < hero.headlineWords.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1, ease: EASE }}
              className="body-lux mt-8 max-w-[35rem] text-ivory/85"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 1, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a href="#book" className="btn btn-brass">
                  <span>Book Your Stay</span>
                </a>
              </Magnetic>
              <a href="#story" className="btn btn-ghost-light group">
                <span className="flex items-center gap-2">
                  Explore the Property
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 1 }}
            className="mt-14 flex items-center gap-5"
          >
            <div className="relative h-12 w-px overflow-hidden bg-ivory/20">
              <span className="scroll-dot absolute inset-x-0 top-0 h-4 bg-champagne" />
            </div>
            <span className="text-[0.6rem] uppercase tracking-[0.36em] text-ivory/55">Scroll</span>
            <ArrowDown className="h-3.5 w-3.5 text-ivory/45" strokeWidth={1.4} aria-hidden />
          </motion.div>
        </motion.div>
      </div>

      {/* booking bar overlapping the fold */}
      <div className="relative z-30 -mt-16 pb-0 md:-mt-14">
        <MiniBookingBar />
      </div>
    </section>
  );
}
