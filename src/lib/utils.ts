export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function toISODate(d: Date) {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function addDaysISO(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

export function todayISO() {
  return toISODate(new Date());
}

export function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const ms = new Date(`${b}T12:00:00`).getTime() - new Date(`${a}T12:00:00`).getTime();
  return Math.round(ms / 86400000);
}

export function createWhatsAppBookingUrl({
  roomName,
  checkIn,
  checkOut,
  nights,
  adults,
  children,
  name,
  notes,
}: {
  roomName?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  adults?: number;
  children?: number;
  name?: string;
  notes?: string;
}) {
  const parts: string[] = [
    "🌿 *Booking Enquiry — Khandala Valley Retreat*",
    "",
    name ? `• *Guest Name:* ${name.trim()}` : null,
    roomName ? `• *Room Category:* ${roomName}` : null,
    checkIn && checkOut
      ? `• *Dates:* ${formatDisplayDate(checkIn)} to ${formatDisplayDate(checkOut)}${
          nights ? ` (${nights} night${nights > 1 ? "s" : ""})` : ""
        }`
      : null,
    adults !== undefined
      ? `• *Guests:* ${adults} Adult${adults > 1 ? "s" : ""}${
          children ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""
        }`
      : null,
    notes ? `• *Special Requests:* ${notes.trim()}` : null,
    "",
    "Please let me know availability, current tariffs, and reservation confirmation details. Thank you!",
  ].filter((p): p is string => p !== null);

  const text = encodeURIComponent(parts.join("\n"));
  return `https://wa.me/919223594601?text=${text}`;
}

export function createWhatsAppContactUrl({
  name,
  subject,
  message,
}: {
  name?: string;
  subject?: string;
  message?: string;
}) {
  const parts: string[] = [
    "🌿 *Enquiry — Khandala Valley Retreat*",
    "",
    name ? `• *Name:* ${name.trim()}` : null,
    subject ? `• *Subject:* ${subject.trim()}` : null,
    message ? `• *Message:* ${message.trim()}` : null,
    "",
    "Looking forward to hearing from you. Thank you!",
  ].filter((p): p is string => p !== null);

  const text = encodeURIComponent(parts.join("\n"));
  return `https://wa.me/919223594601?text=${text}`;
}

