"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { galleryImages } from "@/lib/data";
import { Reveal } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";
import { EASE } from "./motion/Reveal";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length)),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    []
  );

  // keyboard control for lightbox
  useEffect(() => {
    if (active === null) return;
    document.body.classList.add("no-scroll");
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, prev, next]);

  const item = active === null ? null : galleryImages[active];

  return (
    <section id="gallery" className="relative overflow-hidden bg-ink-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-2">Gallery</span>
              </div>
            </Reveal>
            <SplitHeading
              words={["The", "valley,", "frame", "by", "frame."]}
              className="font-display text-display-l font-light leading-[1.04] tracking-[-0.012em] text-ivory"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-[22rem] text-[0.88rem] leading-relaxed text-ivory/65">
              Glimpses of unhurried mornings, mountain mist, illuminated pool decks and quiet evenings beneath the Western Ghats.
            </p>
          </Reveal>
        </div>

        {/* editorial grid */}
        <div className="gal-grid mt-14 md:mt-16">
          {galleryImages.map((img, i) => (
            <Reveal
              key={img.src}
              as="figure"
              delay={(i % 3) * 0.08}
              className={cn(
                "group relative m-0 h-full",
                img.span === "wide" && "wide",
                img.span === "tall" && "tall"
              )}
            >
              <button
                type="button"
                className="gal-tile relative block h-full w-full cursor-zoom-in overflow-hidden"
                onClick={() => setActive(i)}
                aria-label={`Open image: ${img.caption}`}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    img.span === "tall"
                      ? "aspect-[3/4.6] lg:aspect-auto lg:h-full lg:min-h-[520px]"
                      : img.span === "wide"
                        ? "aspect-[16/8.2]"
                        : "aspect-[4/3.15]"
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 40vw"
                    className="object-cover transition-transform duration-[1.25s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/28" />
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-ivory/0 bg-ink/0 text-ivory opacity-0 transition-all duration-500 group-hover:border-ivory/40 group-hover:bg-ink/40 group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-left text-[0.78rem] tracking-[0.06em] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </figcaption>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {item && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={close}
              className="absolute inset-0 cursor-default bg-ink/92 backdrop-blur-md"
            />

            <motion.figure
              key={active}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative z-10 mx-4 flex max-h-[86svh] w-full max-w-[1100px] flex-col items-center"
            >
              <div className="relative max-h-[72svh] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1600}
                  height={1066}
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className="mx-auto max-h-[72svh] w-auto object-contain"
                />
              </div>
              <figcaption className="mt-5 text-center">
                <p className="font-display text-xl text-ivory">{item.caption}</p>
                <p className="mt-1.5 text-[0.72rem] uppercase tracking-[0.26em] text-ivory/50">
                  {String((active ?? 0) + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                </p>
              </figcaption>
            </motion.figure>

            {/* controls */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/10"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/10 md:left-8"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/10 md:right-8"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
