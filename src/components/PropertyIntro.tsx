"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { intro } from "@/lib/data";
import { Reveal, ClipReveal, Stagger, StaggerItem } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

export function PropertyIntro() {
  return (
    <section id="story" className="relative overflow-hidden bg-ivory pt-32 md:pt-40 lg:pt-48">
      {/* quiet decorative word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[22vw] leading-none text-ink/[0.035]"
      >
        Kune
      </span>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
          {/* text column */}
          <div className="lg:col-span-6 lg:pt-10">
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-3">{intro.label}</span>
              </div>
            </Reveal>

            <SplitHeading
              words={intro.heading.replace(".", "").split(" ")}
              className="font-display text-display-l font-light leading-[1.04] tracking-[-0.012em] text-ink text-balance"
            />

            <Reveal delay={0.12}>
              <p className="body-lux mt-8 max-w-[36rem] text-ink/78">
                {intro.body}
              </p>
            </Reveal>

            {/* stats row */}
            <Stagger className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-10 sm:grid-cols-4">
              {intro.stats.map((s) => (
                <StaggerItem key={s.label}>
                  <div>
                    <div className="font-display text-4xl font-light text-ink md:text-[2.6rem]">
                      {s.value}
                    </div>
                    <div className="mt-2 text-[0.62rem] uppercase tracking-[0.26em] text-stone">
                      {s.label}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.15}>
              <a href="#rooms" className="link-line group mt-12 inline-flex text-[0.72rem] font-medium uppercase tracking-[0.24em] text-ink">
                Explore the Rooms
                <ArrowRight className="h-4 w-4 text-brass-3 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.5} />
              </a>
            </Reveal>
          </div>

          {/* image column — offset editorial composition */}
          <div className="relative lg:col-span-6">
            <ClipReveal className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/5.6] lg:aspect-[4/5.1]">
                <Image
                  src="/images/intro-estate.jpg"
                  alt="Terraces and lawns of the retreat opening toward the green valley (illustrative photography)"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
            </ClipReveal>

            {/* floating detail card */}
            <Reveal
              delay={0.3}
              className="absolute -bottom-8 left-2 max-w-[16rem] border border-ink/8 bg-ivory p-6 shadow-[0_28px_70px_-30px_rgba(14,20,17,0.35)] sm:-left-10 lg:-left-16"
            >
              <div className="rule-brass mb-4">
                <span className="diamond" />
              </div>
              <p className="font-display text-[1.22rem] italic leading-snug text-ink">
                “Set among the forested ridges of the Sahyadri hills near Lonavala.”
              </p>
              <p className="mt-3 text-[0.62rem] uppercase tracking-[0.24em] text-stone">
                Kune Village · Khandala
              </p>
            </Reveal>

            {/* thin brass frame accent */}
            <div
              aria-hidden
              className="absolute -right-4 -top-4 hidden h-28 w-28 border-r border-t border-brass/45 lg:block"
            />
          </div>
        </div>
      </div>

      <div className="h-28 md:h-36" />
    </section>
  );
}
