"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  Users,
  BedDouble,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MessageCircle,
  Phone,
} from "lucide-react";
import { property, rooms } from "@/lib/data";
import { useBooking } from "@/lib/booking-context";
import {
  formatDisplayDate,
  nightsBetween,
  todayISO,
  addDaysISO,
  cn,
  createWhatsAppBookingUrl,
} from "@/lib/utils";
import { Reveal, EASE } from "./motion/Reveal";
import { SplitHeading } from "./motion/SplitHeading";

type Errors = Partial<Record<"checkIn" | "checkOut" | "guests", string>>;

export function BookingSection() {
  const b = useBooking();
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Errors>({});
  const [stage, setStage] = useState<"form" | "results" | "enquiry" | "done">("form");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [enquiry, setEnquiry] = useState({ name: "", email: "", phone: "", notes: "" });
  const [enquiryErrors, setEnquiryErrors] = useState<Record<string, string>>({});

  const nights = nightsBetween(b.checkIn, b.checkOut);
  const currentRoom = rooms.find((r) => r.id === selectedRoom) || rooms[0];

  function validate(): Errors {
    const e: Errors = {};
    if (!b.checkIn) e.checkIn = "Please choose a check-in date.";
    if (!b.checkOut) e.checkOut = "Please choose a check-out date.";
    if (b.checkIn && b.checkOut && nights <= 0) e.checkOut = "Check-out must be after check-in.";
    if (b.checkIn && b.checkOut && b.checkIn < todayISO()) e.checkIn = "Check-in cannot be in the past.";
    if (b.adults + b.children < 1) e.guests = "At least one guest is required.";
    return e;
  }

  function validateEnquiry(): boolean {
    const errs: Record<string, string> = {};
    if (!enquiry.name.trim()) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) errs.email = "Please enter a valid email.";
    if (enquiry.phone.replace(/\D/g, "").length < 8) errs.phone = "Please enter a valid phone number.";
    setEnquiryErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStage("results");
    }
  }

  function onEnquiry(e: FormEvent) {
    e.preventDefault();
    if (validateEnquiry()) {
      setStage("done");
    }
  }

  function onWhatsAppEnquiry() {
    if (validateEnquiry()) {
      const url = createWhatsAppBookingUrl({
        roomName: currentRoom?.name,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        nights,
        adults: b.adults,
        children: b.children,
        name: enquiry.name,
        notes: enquiry.notes,
      });
      window.open(url, "_blank", "noopener,noreferrer");
      setStage("done");
    }
  }

  const activeWhatsAppUrl = createWhatsAppBookingUrl({
    roomName: currentRoom?.name,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    nights,
    adults: b.adults,
    children: b.children,
    name: enquiry.name,
    notes: enquiry.notes,
  });

  return (
    <section id="book" className="relative overflow-hidden bg-ivory-2 py-28 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_88%_0%,rgba(185,143,90,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-10">
        {/* heading */}
        <div className="text-center">
          <Reveal>
            <div className="mb-8 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-brass" />
              <span className="eyebrow text-brass-3">Reservations</span>
              <span className="h-px w-10 bg-brass" />
            </div>
          </Reveal>
          <SplitHeading
            words={["Reserve", "your", "stay."]}
            className="font-display text-display-l font-light leading-[1.05] text-ink"
            once
          />
          <Reveal delay={0.15}>
            <p className="body-lux mx-auto mt-6 max-w-[34rem] text-ink/70">
              Select your dates to request live availability or connect directly with our reservations team.
            </p>
          </Reveal>
        </div>

        {/* direct booking assurance banner */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 flex max-w-[46rem] items-center gap-4 border border-brass/40 bg-brass/10 px-5 py-4">
            <ShieldCheck className="h-5 w-5 shrink-0 text-brass-3" strokeWidth={1.5} />
            <p className="text-[0.84rem] leading-relaxed text-ink/80">
              <span className="font-medium uppercase tracking-[0.14em] text-brass-3">Direct Reservation Desk</span>{" "}
              — Guaranteed best tariffs, flexible check-in assistance, and personalized stay arrangements when booking directly with the retreat.
            </p>
          </div>
        </Reveal>

        {/* stage panel */}
        <div className="mt-12 border border-ink/12 bg-ivory shadow-[0_40px_100px_-40px_rgba(14,20,17,0.35)]">
          <AnimatePresence mode="wait">
            {stage === "form" && (
              <motion.form
                key="form"
                onSubmit={onSearch}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="p-7 md:p-12"
                noValidate
              >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="field-label" htmlFor="bk-in">Check-in</label>
                    <input
                      id="bk-in"
                      type="date"
                      min={todayISO()}
                      value={b.checkIn}
                      onChange={(e) => {
                        b.setCheckIn(e.target.value);
                        if (e.target.value >= b.checkOut) b.setCheckOut(addDaysISO(e.target.value, 1));
                      }}
                      className={cn("field", errors.checkIn && "field-error")}
                      aria-invalid={!!errors.checkIn}
                    />
                    {errors.checkIn && (
                      <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                        <AlertCircle className="h-3 w-3" /> {errors.checkIn}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="bk-out">Check-out</label>
                    <input
                      id="bk-out"
                      type="date"
                      min={addDaysISO(b.checkIn, 1)}
                      value={b.checkOut}
                      onChange={(e) => b.setCheckOut(e.target.value)}
                      className={cn("field", errors.checkOut && "field-error")}
                      aria-invalid={!!errors.checkOut}
                    />
                    {errors.checkOut && (
                      <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                        <AlertCircle className="h-3 w-3" /> {errors.checkOut}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="bk-adults">Adults</label>
                    <select
                      id="bk-adults"
                      value={b.adults}
                      onChange={(e) => b.setAdults(Number(e.target.value))}
                      className="field"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="bk-rooms">Rooms</label>
                    <select
                      id="bk-rooms"
                      value={b.rooms}
                      onChange={(e) => b.setRooms(Number(e.target.value))}
                      className="field"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Room{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8 border-t border-ink/10 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-brass-3" strokeWidth={1.5} />
                      <p className="text-[0.88rem] text-ink/75">
                        {b.adults + b.children} guest{b.adults + b.children > 1 ? "s" : ""} ·{" "}
                        {nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "select valid dates"} ·{" "}
                        {b.rooms} room{b.rooms > 1 ? "s" : ""}
                      </p>
                    </div>
                    <p className="text-[0.78rem] text-stone">
                      Check-in from {property.checkIn} · Check-out by {property.checkOut}
                    </p>
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <button type="submit" className="btn btn-brass">
                    <span className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" strokeWidth={1.5} />
                      Check Availability
                    </span>
                  </button>
                  <a
                    href={activeWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-dark group"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-emerald-600" />
                      Quick WhatsApp Enquiry
                    </span>
                  </a>
                </div>
              </motion.form>
            )}

            {stage === "results" && (
              <motion.div
                key="results"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="p-7 md:p-12"
              >
                <div className="flex flex-wrap items-start justify-between gap-6 border-b border-ink/10 pb-6">
                  <div>
                    <p className="eyebrow text-brass-3">Selected Dates</p>
                    <h3 className="mt-2 font-display text-display-s font-light text-ink">
                      {formatDisplayDate(b.checkIn)} — {formatDisplayDate(b.checkOut)}
                    </h3>
                    <p className="mt-1 text-[0.9rem] text-ink/65">
                      {b.adults + b.children} guests · {nights} night{nights > 1 ? "s" : ""} ·{" "}
                      {b.rooms} room{b.rooms > 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStage("form")}
                    className="link-line text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink"
                  >
                    Modify Dates
                  </button>
                </div>

                <div className="mt-8 space-y-5">
                  {rooms.map((r) => {
                    const selected = selectedRoom === r.id;
                    const roomWaUrl = createWhatsAppBookingUrl({
                      roomName: r.name,
                      checkIn: b.checkIn,
                      checkOut: b.checkOut,
                      nights,
                      adults: b.adults,
                      children: b.children,
                    });

                    return (
                      <div
                        key={r.id}
                        className={cn(
                          "flex flex-wrap items-center justify-between gap-6 border p-6 transition-all duration-300",
                          selected ? "border-brass bg-brass/8 shadow-sm" : "border-ink/12 hover:border-ink/28"
                        )}
                      >
                        <div className="min-w-[220px] flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <BedDouble className="h-4.5 w-4.5 text-brass-3" strokeWidth={1.4} />
                            <h4 className="font-display text-[1.45rem] font-light text-ink">
                              {r.name}
                            </h4>
                            <span className="border border-brass/45 px-2.5 py-0.5 text-[0.55rem] uppercase tracking-[0.22em] text-brass-3">
                              {r.badge}
                            </span>
                          </div>
                          <p className="mt-2 text-[0.85rem] text-ink/65">
                            {r.features.slice(0, 4).join(" · ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-stone">
                            Direct Tariff on Request
                          </p>
                          <p className="mt-1 text-[0.8rem] text-brass-3 font-medium">
                            Best Rate Guaranteed
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <a
                            href={roomWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn !px-4 !py-2.5 text-[0.62rem] border-emerald-600/30 text-emerald-800 hover:bg-emerald-50"
                          >
                            <span className="flex items-center gap-1.5">
                              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                              WhatsApp
                            </span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRoom(r.id);
                              setStage("enquiry");
                            }}
                            className={cn(
                              "btn !px-6 !py-2.5 text-[0.64rem]",
                              selected ? "btn-brass" : "btn-ghost-dark"
                            )}
                          >
                            <span>Select &amp; Enquire</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
                  <p className="text-[0.8rem] text-stone">
                    Need customized assistance or planning a group celebration?
                  </p>
                  <a
                    href={property.phoneHref}
                    className="flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.14em] text-brass-3 hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call front desk: {property.phone}
                  </a>
                </div>
              </motion.div>
            )}

            {stage === "enquiry" && (
              <motion.form
                key="enquiry"
                onSubmit={onEnquiry}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="p-7 md:p-12"
                noValidate
              >
                <div className="flex flex-wrap items-start justify-between gap-6 border-b border-ink/10 pb-6">
                  <div>
                    <p className="eyebrow text-brass-3">Reservation Enquiry</p>
                    <h3 className="mt-2 font-display text-display-s font-light text-ink">
                      {currentRoom?.name || "Selected Room"}
                    </h3>
                    <p className="mt-1 text-[0.9rem] text-ink/65">
                      {formatDisplayDate(b.checkIn)} — {formatDisplayDate(b.checkOut)} · {nights} night{nights > 1 ? "s" : ""} · {b.adults + b.children} guests
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStage("results")}
                    className="link-line text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink"
                  >
                    Back to Rooms
                  </button>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="enq-name">Full name *</label>
                    <input
                      id="enq-name"
                      className={cn("field", enquiryErrors.name && "field-error")}
                      value={enquiry.name}
                      onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                    />
                    {enquiryErrors.name && (
                      <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                        <AlertCircle className="h-3 w-3" /> {enquiryErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="enq-email">Email address *</label>
                    <input
                      id="enq-email"
                      type="email"
                      className={cn("field", enquiryErrors.email && "field-error")}
                      value={enquiry.email}
                      onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                      placeholder="you@domain.com"
                    />
                    {enquiryErrors.email && (
                      <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                        <AlertCircle className="h-3 w-3" /> {enquiryErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="enq-phone">Phone / WhatsApp number *</label>
                    <input
                      id="enq-phone"
                      type="tel"
                      className={cn("field", enquiryErrors.phone && "field-error")}
                      value={enquiry.phone}
                      onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                    {enquiryErrors.phone && (
                      <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-terracotta">
                        <AlertCircle className="h-3 w-3" /> {enquiryErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="enq-notes">Special requests (optional)</label>
                    <input
                      id="enq-notes"
                      className="field"
                      value={enquiry.notes}
                      onChange={(e) => setEnquiry({ ...enquiry, notes: e.target.value })}
                      placeholder="Early check-in, dietary preferences, extra bed…"
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-8">
                  <button
                    type="button"
                    onClick={onWhatsAppEnquiry}
                    className="btn !bg-emerald-700 text-ivory hover:!bg-emerald-800"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Send via WhatsApp (Instant)
                    </span>
                  </button>

                  <button type="submit" className="btn btn-brass">
                    <span className="flex items-center gap-2">
                      Submit Direct Request
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </button>

                  <p className="max-w-[20rem] text-[0.75rem] leading-relaxed text-stone">
                    Our reservations desk will confirm room allocation and send payment instructions directly.
                  </p>
                </div>
              </motion.form>
            )}

            {stage === "done" && (
              <motion.div
                key="done"
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="p-8 text-center md:p-14"
              >
                <motion.span
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
                  className="inline-flex"
                >
                  <CheckCircle2 className="h-14 w-14 text-brass-3" strokeWidth={1.2} />
                </motion.span>
                <h3 className="mt-6 font-display text-display-m font-light text-ink">
                  Enquiry Prepared Successfully
                </h3>
                <p className="mx-auto mt-3 max-w-[32rem] text-[0.96rem] leading-relaxed text-ink/75">
                  Thank you, {enquiry.name ? enquiry.name.split(" ")[0] : "Guest"}. Your stay request has been prepared for the Khandala Valley Retreat reservations desk.
                </p>

                {/* Summary Voucher Card */}
                <div className="mx-auto mt-8 max-w-md border border-ink/12 bg-ivory-2/70 p-6 text-left">
                  <div className="border-b border-ink/10 pb-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-brass-3">Stay Details</p>
                    <p className="mt-1 font-display text-xl text-ink font-light">
                      {currentRoom?.name || "Selected Room"}
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-[0.84rem]">
                    <div>
                      <span className="text-stone block text-[0.7rem] uppercase tracking-wider">Dates</span>
                      <span className="font-medium text-ink">{formatDisplayDate(b.checkIn)}</span>
                      <span className="text-stone block text-xs">to {formatDisplayDate(b.checkOut)} ({nights} nights)</span>
                    </div>
                    <div>
                      <span className="text-stone block text-[0.7rem] uppercase tracking-wider">Party</span>
                      <span className="font-medium text-ink">{b.adults} Adults{b.children ? `, ${b.children} Children` : ""}</span>
                      <span className="text-stone block text-xs">{b.rooms} Room</span>
                    </div>
                  </div>
                  {enquiry.name && (
                    <div className="mt-4 border-t border-ink/10 pt-3 text-[0.82rem] text-ink/75">
                      <span>Guest: {enquiry.name}</span>
                      {enquiry.phone && <span className="block text-stone">{enquiry.phone}</span>}
                    </div>
                  )}
                </div>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <a
                    href={activeWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn !bg-emerald-700 text-ivory hover:!bg-emerald-800"
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Open &amp; Send on WhatsApp
                    </span>
                  </a>
                  <a href={property.phoneHref} className="btn btn-brass">
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Front Desk
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setStage("form");
                      setEnquiry({ name: "", email: "", phone: "", notes: "" });
                    }}
                    className="btn btn-ghost-dark"
                  >
                    <span>Plan Another Date</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
