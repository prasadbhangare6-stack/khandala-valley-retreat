"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Check, MessageCircle } from "lucide-react";
import Image from "next/image";
import type { Room } from "@/lib/data";
import { createWhatsAppBookingUrl } from "@/lib/utils";
import { EASE } from "./motion/Reveal";

export function RoomModal({
  room,
  onClose,
}: {
  room: Room | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!room) return;
    document.body.classList.add("no-scroll");
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [room, onClose]);

  return (
    <AnimatePresence>
      {room && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="room-modal-title"
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close room details"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink/72 backdrop-blur-md"
          />

          {/* panel */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 64, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 44, scale: 0.985 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative z-10 max-h-[92svh] w-full max-w-[1020px] overflow-y-auto bg-ivory shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center border border-ivory/40 bg-ink/35 text-ivory backdrop-blur-sm transition-colors hover:bg-ink/60"
            >
              <X className="h-4.5 w-4.5" strokeWidth={1.5} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[260px] md:min-h-full">
                <Image
                  src={room.image}
                  alt={room.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-ink/70 to-transparent p-6 md:block">
                  <span className="eyebrow text-champagne">{room.badge}</span>
                </div>
              </div>

              <div className="p-7 md:p-10">
                <span className="inline-block border border-brass/45 px-3 py-1.5 text-[0.56rem] uppercase tracking-[0.26em] text-brass-3">
                  {room.badge}
                </span>
                <h3
                  id="room-modal-title"
                  className="mt-5 font-display text-[2.15rem] font-light leading-tight text-ink md:text-[2.55rem]"
                >
                  {room.name}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ink/75">{room.description}</p>

                <div className="mt-7">
                  <h4 className="text-[0.62rem] uppercase tracking-[0.28em] text-stone">
                    Features
                  </h4>
                  <ul className="mt-4 grid gap-2.5">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[0.92rem] text-ink/80">
                        <Check className="h-3.5 w-3.5 text-brass-3" strokeWidth={1.8} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-ink/10 pt-5">
                  <p className="text-[0.84rem] leading-relaxed text-ink/75">{room.note}</p>
                  <p className="mt-2 text-[0.8rem] text-brass-3 font-medium">
                    Best Tariff Guaranteed on direct reservations · Complimentary Wi-Fi &amp; parking included
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={createWhatsAppBookingUrl({ roomName: room.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn !bg-emerald-700 text-ivory hover:!bg-emerald-800"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Enquire on WhatsApp
                    </span>
                  </a>
                  <a href="#book" onClick={onClose} className="btn btn-brass">
                    <span>Reserve Online</span>
                  </a>
                  <a href="#contact" onClick={onClose} className="btn btn-ghost-dark group">
                    <span className="flex items-center gap-2">
                      General Enquiry
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
