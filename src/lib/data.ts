/**
 * Property data — Khandala Valley Retreat
 *
 * VERIFIED sources (accessed 2026-10-12):
 *  - Google Maps listing: "Khandala Valley Retreat", resort hotel, 3.8 rating
 *    address: plot no. 2, behind lokegaonkar society, Dukes Den Colony, Kune Village,
 *    Khandala, Kune N.m., Maharashtra 410302, India · +91 81491 43728 · Plus code Q9GJ+57 Kune N.m.
 *  - Trip.com: opened 2024 · 13 rooms · outdoor pool · restaurant · free parking · airport transfer
 *  - tiket.com / Goibibo / MakeMyTrip / Klook / Justdial / GuestReservations listings
 *
 * ILLUSTRATIVE content (room category names, some copy) is clearly marked in the UI
 * and must be replaced with approved property content before production use.
 */

export const property = {
  name: "Khandala Valley Retreat",
  nameHi: "खंडाला वाली रिट्रीट",
  tagline: "A small retreat in the Sahyadri hills",
  category: "Resort hotel",
  opened: 2024,
  roomsCount: 13,
  phone: "+91 81491 43728",
  phoneHref: "tel:+918149143728",
  phoneAlt: "+91 84858 87965",
  /** Published by the property's booking desk on its MTDC partner listing — confirm ownership before launch. */
  whatsapp: "+91 922359 4601",
  whatsappHref: "https://wa.me/919223594601",
  address: {
    line1: "Plot No. 2, Behind Lokegaonkar Society",
    line2: "Dukes Den Colony, Kune Village, Khandala",
    line3: "Kune N.m., Maharashtra 410302, India",
    plusCode: "Q9GJ+57 Kune N.m., Maharashtra",
  },
  geo: { lat: 18.7754558, lng: 73.3806377 },
  mapsUrl:
    "https://www.google.com/maps/place/Khandala+Valley+Retreat/@18.7754558,73.3626133,15z/data=!4m10!3m9!1s0x3be801350072fb1d:0x339ad2b6ec2f8ad5!5m2!4m1!1i2!8m2!3d18.7754558!4d73.3806377",
  mapsEmbed:
    "https://maps.google.com/maps?q=18.7754558,73.3806377&z=15&output=embed",
  checkIn: "1:30 PM",
  checkOut: "10:30 AM",
  rating: { value: 3.8, count: 131, source: "Google Maps (Oct 2026)" },
  /** Observed OTA listing rate on Google Maps, Oct 2026 — for display as an indicative figure only. */
  observedRate: "from about USD 258 per night (Google hotel listings, Oct 2026)",
} as const;

export const hero = {
  eyebrow: "Kune · Khandala · Sahyadri Hills",
  headlineWords: ["Where", "the", "hills", "hold", "the", "clouds."],
  sub: "Thirteen guestrooms in the green valley above Kune — an outdoor pool, long mountain light, and Kune Falls five minutes away.",
};

export const intro = {
  label: "The Property",
  heading: "A small retreat in a wide, green valley.",
  body: "Khandala Valley Retreat sits in Kune Village, Khandala, among the forested ridges of the Sahyadri hills near Lonavala. Opened in 2024, the retreat gathers thirteen guestrooms around an outdoor swimming pool, an on-site restaurant, lawns and terraces that open toward the valley — a short drive from Kune Falls and the trail country around Duke's Nose.",
  stats: [
    { value: "13", label: "Guestrooms" },
    { value: "2024", label: "Opened" },
    { value: "5 min", label: "To Kune Falls" },
    { value: "60 km", label: "From Pune Airport" },
  ],
};

export type Room = {
  id: string;
  name: string;
  badge: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  note: string;
};

/**
 * Room categories below are ILLUSTRATIVE design placeholders.
 * Verified inventory facts: 13 guestrooms · double-bed rooms · private furnished patios ·
 * en-suite bath or shower · certain rooms with seating areas · air conditioning · free Wi-Fi.
 */
export const rooms: Room[] = [
  {
    id: "valley-view-deluxe",
    name: "Valley View Deluxe",
    badge: "Valley View",
    description:
      "Wake to the ridgelines of the Kune valley from a private furnished patio. A calm, contemporary room with a plush double bed and an en-suite bathroom — designed for long, unhurried mornings.",
    features: [
      "Double bed with premium linen",
      "Private furnished valley-facing patio",
      "En-suite bath or shower",
      "Air conditioning",
      "High-speed Wi-Fi",
    ],
    image: "/images/room-valley.jpg",
    imageAlt:
      "Valley-view bedroom with ivory linen and a window opening onto misty green mountains",
    note: "Private furnished patio overlooking the Kune valley · Double occupancy · In-room dining available",
  },
  {
    id: "valley-suite",
    name: "Valley Suite",
    badge: "Signature Suite",
    description:
      "Certain rooms at the retreat open into an expansive separate seating area — space to read, linger and watch the light move across the hills. Warm materials, soft lamps and room service on request.",
    features: [
      "Separate lounge & seating area",
      "Double bed with plush mattress",
      "Spacious en-suite bathroom",
      "Air conditioning",
      "High-speed Wi-Fi",
      "Personalized room service",
    ],
    image: "/images/room-suite.jpg",
    imageAlt:
      "Suite living area with ivory sofa, cane chairs and mountain views through a large window",
    note: "Spacious living & sitting area with mountain light · Double occupancy · Room service available",
  },
  {
    id: "patio-room",
    name: "Patio Garden Room",
    badge: "Garden & Pool Access",
    description:
      "Ground-level rooms with furnished patios that open directly toward the lawn — steps from the pool deck, the fire pit and the garden. Simple, quiet, close to everything.",
    features: [
      "Direct lawn & pool deck access",
      "Furnished private patio",
      "En-suite bath or shower",
      "Air conditioning",
      "High-speed Wi-Fi",
    ],
    image: "/images/room-patio.jpg",
    imageAlt:
      "Private furnished patio with cane chairs overlooking a misty green valley",
    note: "Ground floor terrace opening directly onto lush lawns and pool deck · Double occupancy",
  },
];

export const experiencePanels = [
  {
    title: "The Pool",
    copy: "The outdoor pool is the most-mentioned feature in guest reviews — a clean, quiet deck with the valley falling away below.",
    image: "/images/pool.jpg",
    imageAlt: "Outdoor swimming pool with teak loungers and misty mountains behind",
  },
  {
    title: "Evenings by the Fire",
    copy: "Bonfire evenings on the lawn are a listed favourite at the retreat — gather close as the valley cools and the sky opens.",
    image: "/images/bonfire.jpg",
    imageAlt: "Glowing bonfire on a resort lawn at dusk with mountains silhouetted behind",
  },
  {
    title: "Lawns & Terraces",
    copy: "Sun decks, lawns and terrace seating for slow mornings and long afternoons — the valley is never more than a glance away.",
    image: "/images/intro-estate.jpg",
    imageAlt: "Resort terraces and lawn overlooking a green valley in the Western Ghats",
  },
];

export const services = [
  { icon: "waves", label: "Outdoor swimming pool" },
  { icon: "utensils", label: "On-site restaurant" },
  { icon: "concierge", label: "24-hour front desk" },
  { icon: "wifi", label: "Free Wi-Fi" },
  { icon: "car", label: "Free private parking" },
  { icon: "roomService", label: "Room service" },
  { icon: "plane", label: "Airport transfers" },
  { icon: "key", label: "Car hire" },
  { icon: "gamepad", label: "Indoor games" },
  { icon: "fire", label: "Bonfire evenings" },
  { icon: "pawPrint", label: "Pet friendly" },
  { icon: "stethoscope", label: "Doctor on call" },
] as const;

export const dining = {
  label: "Dining",
  workingTitle: "The Valley Table",
  heading: "Fresh regional cuisine, morning light, and valley breezes.",
  body: "The retreat features an on-site restaurant serving flavourful regional specialties and contemporary Indian dishes à la carte. Enjoy local-cuisine weekend breakfasts, warm tea on the terrace, and discreet in-room dining prepared fresh on order.",
  facts: [
    "On-site restaurant · All-day à la carte dining",
    "Local cuisine breakfast · weekends · 8:30 – 10:30 AM",
    "In-room dining & tea service available",
    "Scenic outdoor terrace & poolside seating",
  ],
};

export const galleryImages = [
  {
    src: "/images/hero-valley.jpg",
    alt: "Infinity pool edge overlooking layered misty valleys at golden hour",
    caption: "Valley light, late afternoon",
    span: "tall",
  },
  {
    src: "/images/valley-view.jpg",
    alt: "Layered Sahyadri ridgelines with monsoon mist and sunbeams",
    caption: "The Sahyadri ridgelines",
    span: "wide",
  },
  {
    src: "/images/pool.jpg",
    alt: "Outdoor pool with loungers and mountains behind",
    caption: "The pool deck",
    span: "normal",
  },
  {
    src: "/images/dining.jpg",
    alt: "Set dining table on a terrace at dusk with valley backdrop",
    caption: "Dinner on the terrace",
    span: "normal",
  },
  {
    src: "/images/waterfall.jpg",
    alt: "Monsoon waterfall cascading through green cliffs",
    caption: "Kune Falls country, in the rains",
    span: "tall",
  },
  {
    src: "/images/room-valley.jpg",
    alt: "Valley-view bedroom with ivory linen",
    caption: "A room above the valley",
    span: "normal",
  },
  {
    src: "/images/bonfire.jpg",
    alt: "Bonfire glowing on a lawn at dusk",
    caption: "Evenings around the fire",
    span: "normal",
  },
  {
    src: "/images/intro-estate.jpg",
    alt: "Resort terraces and lawns against green mountains",
    caption: "Terraces toward the hills",
    span: "wide",
  },
  {
    src: "/images/room-patio.jpg",
    alt: "Private furnished patio with cane chairs",
    caption: "Private patios",
    span: "normal",
  },
  {
    src: "/images/room-suite.jpg",
    alt: "Suite living area with ivory sofa and cane chairs",
    caption: "The suite living room",
    span: "normal",
  },
];

/** Review themes summarised from public Google review snippets — no quotes reproduced. */
export const reviewThemes = [
  {
    title: "A well-kept property",
    body: "Public reviews repeatedly describe the property as well maintained, with neat, tidy rooms.",
  },
  {
    title: "The pool comes up first",
    body: "Guests mention the swimming pool more than any other feature — most often as clean and beautiful.",
  },
  {
    title: "Warm, helpful service",
    body: "Reviewers across listing platforms highlight helpful, welcoming staff during their stays.",
  },
];

export const nearby = [
  { name: "Kune Falls", detail: "1.4 km · about 5 minutes by car" },
  { name: "Monkey Hill", detail: "1.8 km" },
  { name: "Della Adventure & Shooting Point", detail: "Within a 5-minute drive" },
  { name: "Tamhini Ghat", detail: "About 5 km" },
  { name: "Ryewood Park", detail: "About 5.4 km" },
  { name: "Pawna Lake", detail: "About 12.5 km" },
  { name: "Wet N Joy Water Park", detail: "About 17 km" },
];

export const travel = [
  { label: "Pune International Airport", detail: "60 km" },
  { label: "Khandala Railway Station", detail: "4.4 km" },
  { label: "Lonavala Railway Station", detail: "5.3 km" },
  { label: "Check-in / Check-out", detail: "From 1:30 PM / by 10:30 AM" },
];

export const navLinks = [
  { href: "#story", label: "The Property" },
  { href: "#rooms", label: "Rooms" },
  { href: "#experiences", label: "Experiences" },
  { href: "#dining", label: "Dining" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];
