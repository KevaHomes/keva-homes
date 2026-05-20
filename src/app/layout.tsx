import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { getSiteSettings } from "@/sanity/lib/queries";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const tagline = settings?.tagline ?? "Building Dreams into Reality";

  return {
    title: {
      default: `KEVA Homes | ${tagline}`,
      template: "%s | KEVA Homes",
    },
    description:
      "Family owned construction company in Bloomfield, NJ. Expert building contractor providing quality interior & exterior renovations, structural repairs, and custom construction services across North Jersey.",
    keywords: [
      "contractor",
      "home renovation",
      "construction",
      "Bloomfield NJ",
      "home improvement",
      "KEVA Homes",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "KEVA Homes",
      images: [{ url: "/images/logos/keva-logo.png", width: 800, height: 600 }],
    },
  };
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "KEVA Homes",
  url: "https://kevahomes.com",
  telephone: "(973) 444-4996",
  email: "kevahomesllc@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bloomfield",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "State",
    name: "New Jersey",
  },
  description:
    "Family owned construction company providing quality interior & exterior renovations, structural repairs, and custom construction services across North Jersey.",
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/kevahomesllc",
    "https://www.instagram.com/kevahomes",
    "https://www.youtube.com/@kevahomes",
    "https://www.yelp.com/biz/keva-homes-bloomfield",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
