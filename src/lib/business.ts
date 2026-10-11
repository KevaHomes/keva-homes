import { getSiteSettings } from "@/sanity/lib/queries";
import { telHref, schemaPhone } from "@/lib/phone";

export { telHref, schemaPhone };

export const SITE_URL = "https://www.kevahomes.com";
export const BUSINESS_ID = `${SITE_URL}/#business`;

export type HoursEntry = { days: string[]; opens: string; closes: string };
export type CountyEntry = { county: string; towns: string[] };

export type Business = {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  tollFree: string;
  email: string;
  city: string;
  foundedYear: number;
  hicNumber: string;
  insurance: string;
  warranty: string;
  openingHours: HoursEntry[];
  emergencyNote: string;
  serviceAreasSummary: string;
  counties: CountyEntry[];
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    yelp?: string;
    google?: string;
    houzz?: string;
  };
};

// Fallbacks for anything not filled in under Site Settings in Studio.
export const DEFAULT_BUSINESS: Business = {
  name: "KEVA Homes",
  legalName: "KEVA Homes LLC",
  tagline: "Building Dreams into Reality",
  phone: "(973) 444-4996",
  tollFree: "833-KEVA-HOME",
  email: "kevahomesllc@gmail.com",
  city: "Bloomfield, NJ",
  foundedYear: 2009,
  hicNumber: "13VH11129900",
  insurance: "General liability, workers' compensation and umbrella insurance",
  warranty:
    "1-year workmanship warranty, plus the manufacturer's warranty on products like shingles, siding and flooring.",
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "06:00",
      closes: "16:00",
    },
  ],
  emergencyNote:
    "833-KEVA-HOME is available for emergencies at any hour. Rates depend on when, where and what the emergency is. If we can't pick up, leave a voicemail with all the details and we'll call you back as soon as possible.",
  serviceAreasSummary: "Essex, Bergen, Morris, Passaic & Union counties",
  counties: [
    {
      county: "Essex County",
      towns: [
        "Bloomfield",
        "Montclair",
        "Upper Montclair",
        "Nutley",
        "Verona",
        "Livingston",
        "North Caldwell",
        "West Caldwell",
        "Essex Fells",
        "Roseland",
        "Millburn",
        "Short Hills",
        "East Orange",
      ],
    },
    {
      county: "Bergen County",
      towns: [
        "Franklin Lakes",
        "Ridgewood",
        "Paramus",
        "Upper Saddle River",
        "Woodcliff Lake",
        "Oakland",
        "Dumont",
        "Bergenfield",
        "Closter",
        "Alpine",
        "Lyndhurst",
      ],
    },
    {
      county: "Morris County",
      towns: ["Morristown", "Morris Plains", "Whippany", "Hanover", "Montville", "Lincoln Park"],
    },
    { county: "Passaic County", towns: ["Pompton Lakes", "Bloomingdale"] },
    { county: "Union County", towns: ["Summit", "Hillside"] },
  ],
  social: {
    facebook: "https://www.facebook.com/109556268138624",
    instagram: "https://www.instagram.com/kevahomes",
    youtube: "https://www.youtube.com/@KevaHomes",
    yelp: "https://www.yelp.com/biz/keva-homes-bloomfield",
    google: "https://maps.google.com/?cid=6658824963951446442",
  },
};

type SettingsDoc = Partial<{
  companyName: string;
  legalName: string;
  tagline: string;
  phone: string;
  tollFree: string;
  email: string;
  address: string;
  foundedYear: number;
  hicNumber: string;
  insurance: string;
  warranty: string;
  openingHours: HoursEntry[];
  emergencyNote: string;
  serviceAreas: string;
  serviceCounties: CountyEntry[];
  socialLinks: Business["social"];
}>;

export async function getBusiness(): Promise<Business> {
  const s: SettingsDoc = (await getSiteSettings()) ?? {};
  const d = DEFAULT_BUSINESS;
  const counties = (s.serviceCounties ?? []).filter((c) => c?.county && c.towns?.length);
  const hours = (s.openingHours ?? []).filter((h) => h?.days?.length && h.opens && h.closes);
  return {
    name: s.companyName || d.name,
    legalName: s.legalName || d.legalName,
    tagline: s.tagline || d.tagline,
    phone: s.phone || d.phone,
    tollFree: s.tollFree || d.tollFree,
    email: s.email || d.email,
    city: s.address || d.city,
    foundedYear: s.foundedYear || d.foundedYear,
    hicNumber: s.hicNumber || d.hicNumber,
    insurance: s.insurance || d.insurance,
    warranty: s.warranty || d.warranty,
    openingHours: hours.length ? hours : d.openingHours,
    emergencyNote: s.emergencyNote || d.emergencyNote,
    serviceAreasSummary: s.serviceAreas || d.serviceAreasSummary,
    counties: counties.length ? counties : d.counties,
    social: { ...d.social, ...stripEmpty(s.socialLinks) },
  };
}

function stripEmpty<T extends Record<string, string | undefined>>(obj?: T): Partial<T> {
  if (!obj) return {};
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => Boolean(v))) as Partial<T>;
}

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function to12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

function dayRange(days: string[]): string {
  const sorted = [...days].sort((a, b) => WEEK.indexOf(a) - WEEK.indexOf(b));
  const idx = sorted.map((d) => WEEK.indexOf(d));
  const consecutive = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (sorted.length > 2 && consecutive) return `${sorted[0]}–${sorted[sorted.length - 1]}`;
  return sorted.join(", ");
}

/** Human-readable hours, e.g. [{ days: "Monday–Saturday", hours: "6 AM–4 PM" }, { days: "Sunday", hours: "Closed" }] */
export function formatHours(entries: HoursEntry[]): { days: string; hours: string }[] {
  const rows = entries.map((e) => ({ days: dayRange(e.days), hours: `${to12h(e.opens)}–${to12h(e.closes)}` }));
  const open = new Set(entries.flatMap((e) => e.days));
  const closed = WEEK.filter((d) => !open.has(d));
  if (closed.length) rows.push({ days: dayRange(closed), hours: "Closed" });
  return rows;
}

export function sameAsLinks(b: Business): string[] {
  return Object.values(b.social).filter((v): v is string => Boolean(v));
}
