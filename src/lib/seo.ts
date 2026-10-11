import {
  BUSINESS_ID,
  SITE_URL,
  schemaPhone,
  sameAsLinks,
  type Business,
} from "@/lib/business";

export const DEFAULT_DESCRIPTION =
  "Family-owned general contractor in Bloomfield, NJ. Renovations, additions, kitchens, baths, roofing and new homes across North Jersey. Free in-home consultation.";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

const DEFAULT_OG_IMAGE = { url: "/images/logos/keva-logo.png", width: 800, height: 600, alt: "KEVA Homes" };

/**
 * Complete Open Graph block for a page. Next.js replaces (not merges) a parent's openGraph,
 * so every page passes the shared fields through here.
 */
export function openGraphFor(
  path: string,
  opts: {
    title?: string;
    description?: string;
    image?: { url: string; width: number; height: number; alt: string };
  } = {},
) {
  return {
    type: "website" as const,
    locale: "en_US",
    siteName: "KEVA Homes",
    url: path,
    ...(opts.title ? { title: opts.title } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    images: [opts.image ?? DEFAULT_OG_IMAGE],
  };
}

/** Serialize JSON-LD safely for a <script> tag (escapes "<" so content can't close the tag). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function areaServedJsonLd(b: Business) {
  return b.counties.map((c) => ({
    "@type": "AdministrativeArea",
    name: `${c.county}, NJ`,
  }));
}

export function businessJsonLd(b: Business, services: { title: string; slug: string }[]) {
  const [city, region = "NJ"] = b.city.split(",").map((s) => s.trim());
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: b.name,
    legalName: b.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logos/keva-logo.png"),
    image: absoluteUrl("/images/logos/keva-logo.png"),
    description: `${b.name} is a family-owned general contractor based in ${b.city}, serving ${b.serviceAreasSummary} in North Jersey since ${b.foundedYear}.`,
    slogan: b.tagline,
    foundingDate: String(b.foundedYear),
    telephone: schemaPhone(b.phone),
    email: b.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: region,
      addressCountry: "US",
    },
    areaServed: areaServedJsonLd(b),
    openingHoursSpecification: b.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: schemaPhone(b.tollFree),
        contactType: "emergency service",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "New Jersey Home Improvement Contractor Registration",
      identifier: b.hicNumber,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "New Jersey Division of Consumer Affairs",
      },
    },
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Remodeling Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
    sameAs: sameAsLinks(b),
  };
}
