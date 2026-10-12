"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight, Info } from "lucide-react";
import { property, reviewThemes } from "@/lib/data";
import { Reveal, EASE } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % reviewThemes.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  function go(step: number) {
    setDir(step);
    setIndex((i) => (i + step + reviewThemes.length) % reviewThemes.length);
  }

  const theme = reviewThemes[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-ivory py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none font-display text-[24vw] leading-none text-ink/[0.03]"
      >
        “
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* left: heading + verified rating */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-3">Guest Impressions</span>
              </div>
            </Reveal>

            <SplitHeading
              words={["What", "guests", "remember."]}
              className="font-display text-display-l font-light leading-[1.05] tracking-[-0.012em] text-ink"
            />

            <Reveal delay={0.12}>
              <div className="mt-10 flex items-center gap-6 border border-ink/10 bg-ivory-2/60 p-6">
                <div className="text-center">
                  <div className="font-display text-5xl font-light text-ink">
                    {property.rating.value}
                  </div>
                  <div className="mt-2 flex justify-center gap-0.5" aria-label={`${property.rating.value} out of 5`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={n <= Math.round(property.rating.value) ? "h-3.5 w-3.5 text-brass-3" : "h-3.5 w-3.5 text-ink/15"}
                        strokeWidth={1.2}
                        fill={n <= Math.round(property.rating.value) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-12 w-px bg-ink/10" />
                <div>
                  <p className="text-[0.92rem] leading-relaxed text-ink/75">
                    <span className="text-ink">{property.rating.count} reviews</span> on Google
                    Maps for this property.
                  </p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-stone">
                    Source: {property.rating.source}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex gap-4 border-l border-brass/40 pl-6">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brass-3" strokeWidth={1.5} />
                <p className="text-[0.82rem] leading-relaxed text-stone">
                  Synthesized from verified guest reviews on Google Maps — highlighting consistent appreciation for the scenic swimming pool, tidy guestrooms, and warm hospitality.
                </p>
              </div>
            </Reveal>
          </div>

          {/* right: theme carousel */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[24rem] border border-ink/10 bg-ink p-8 md:min-h-[26rem] md:p-14">
              <Quote className="h-9 w-9 text-brass/50" strokeWidth={1} />

              <div className="relative mt-6 overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={index}
                    custom={dir}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -48 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <p className="eyebrow text-brass-2">Theme {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-5 font-display text-display-s font-light leading-snug text-ivory md:text-display-m">
                      {theme.title}
                    </h3>
                    <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-[1.9] text-ivory/72">
                      {theme.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* placeholder testimonial slot */}
              <div className="mt-10 border border-dashed border-ivory/18 p-5">
                <p className="text-[0.66rem] uppercase tracking-[0.28em] text-champagne/70">
                  Guest testimonial — placeholder
                </p>
                <p className="mt-2.5 text-[0.92rem] italic leading-relaxed text-ivory/50">
                  “An approved guest quote will appear here with the reviewer’s name and stay
                  date, pending reuse permission.”
                </p>
              </div>

              {/* carousel controls */}
              <div className="mt-10 flex items-center justify-between">
                <div className="flex gap-2.5" role="tablist" aria-label="Review themes">
                  {reviewThemes.map((t, i) => (
                    <button
                      key={t.title}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Show theme ${i + 1}`}
                      onClick={() => {
                        setDir(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className={`h-1 transition-all duration-500 ${
                        i === index ? "w-10 bg-brass" : "w-5 bg-ivory/22 hover:bg-ivory/45"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous theme"
                    className="flex h-11 w-11 items-center justify-center border border-ivory/22 text-ivory/80 transition-colors hover:border-brass hover:text-brass-2"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next theme"
                    className="flex h-11 w-11 items-center justify-center border border-ivory/22 text-ivory/80 transition-colors hover:border-brass hover:text-brass-2"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
