"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { rooms, type Room } from "@/lib/data";
import { Reveal, ClipReveal } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";
import { RoomModal } from "./RoomModal";
import { cn } from "@/lib/utils";

function RoomRow({ room, index }: { room: Room; index: number }) {
  const [open, setOpen] = useState(false);
  const flipped = index % 2 === 1;

  return (
    <>
      <article
        className={cn(
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          flipped && "lg:[&>*:first-child]:order-2"
        )}
      >
        {/* image */}
        <ClipReveal className="group relative">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`View details for ${room.name}`}
            className="relative block w-full cursor-pointer overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10.5] lg:aspect-[5/3.6]">
              <Image
                src={room.image}
                alt={room.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
              />
            </div>
            {/* hover overlay */}
            <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex items-center gap-2 border border-ivory/50 px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.24em] text-ivory backdrop-blur-sm">
                View Room Details
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </span>
          </button>
          {/* index label */}
          <span className="absolute -top-6 left-0 text-[0.62rem] uppercase tracking-[0.32em] text-champagne/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </ClipReveal>

        {/* text */}
        <Reveal delay={0.1} className={flipped ? "lg:pr-6" : "lg:pl-6"}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-brass/50 px-3 py-1.5 text-[0.56rem] uppercase tracking-[0.26em] text-brass-2">
              {room.badge}
            </span>
          </div>

          <h3 className="mt-6 font-display text-display-m font-light leading-[1.06] text-ivory">
            {room.name}
          </h3>

          <p className="mt-5 max-w-[30rem] text-[1.01rem] leading-[1.85] text-ivory/72">
            {room.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2.5">
            {room.features.map((f) => (
              <li
                key={f}
                className="border border-ivory/14 px-3.5 py-1.5 text-[0.7rem] tracking-[0.08em] text-ivory/70"
              >
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="link-line group text-[0.72rem] font-medium uppercase tracking-[0.24em] text-ivory"
            >
              View Room Details
              <ArrowRight className="h-4 w-4 text-brass-2 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.5} />
            </button>
            <a
              href="#book"
              className="btn btn-ghost-light !px-6 !py-3 text-[0.64rem]"
            >
              <span>Enquire</span>
            </a>
          </div>

          <p className="mt-6 text-[0.72rem] leading-relaxed text-ivory/40">
            Tariff on request · {room.note}
          </p>
        </Reveal>
      </article>

      <RoomModal room={open ? room : null} onClose={() => setOpen(false)} />
    </>
  );
}

export function Rooms() {
  return (
    <section id="rooms" className="relative overflow-hidden bg-ink py-28 md:py-36">
      {/* subtle background tone */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_82%_-10%,rgba(185,143,90,0.10),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        {/* section head */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-brass" />
                <span className="eyebrow text-brass-2">Rooms &amp; Suites</span>
              </div>
            </Reveal>
            <SplitHeading
              words={["Rooms", "that", "open", "to", "the", "valley."]}
              className="font-display text-display-l font-light leading-[1.04] tracking-[-0.012em] text-ivory"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="flex gap-4 border-l border-brass/35 pl-6">
              <Info className="mt-1 h-4 w-4 shrink-0 text-brass-2" strokeWidth={1.5} />
              <p className="text-[0.86rem] leading-relaxed text-ivory/65">
                The retreat offers <span className="text-ivory font-medium">13 exclusive guestrooms</span> —
                each designed with private outdoor seating, calm natural materials, and scenic hill vistas.
                Book directly for best seasonal tariffs and bespoke requests.
              </p>
            </div>
          </Reveal>
        </div>

        {/* room rows */}
        <div className="mt-20 space-y-24 md:mt-24 md:space-y-32">
          {rooms.map((room, i) => (
            <RoomRow key={room.id} room={room} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-center gap-6 border-t border-ivory/10 pt-16 text-center">
            <p className="max-w-[34rem] font-display text-display-s font-light italic leading-snug text-champagne">
              Every stay begins with a quiet room, a valley view, and time that finally slows.
            </p>
            <a href="#book" className="btn btn-brass">
              <span>Check Availability</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
