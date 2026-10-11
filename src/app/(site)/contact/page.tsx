export const revalidate = 60;

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { formatHours, getBusiness } from "@/lib/business";
import { breadcrumbJsonLd, openGraphFor } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us for a Free Consultation",
  description:
    "Contact KEVA Homes for a free in-home consultation. Call (973) 444-4996 or 833-KEVA-HOME, open Monday–Saturday 6 AM–4 PM, with emergency calls answered at any hour.",
  alternates: { canonical: "/contact" },
  openGraph: openGraphFor("/contact"),
};

export default async function ContactPage() {
  const business = await getBusiness();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactClient
        info={{
          phone: business.phone,
          tollFree: business.tollFree,
          email: business.email,
          city: business.city,
          areas: business.serviceAreasSummary,
          hours: formatHours(business.openingHours),
          emergencyNote: business.emergencyNote,
          hicNumber: business.hicNumber,
          insurance: business.insurance,
        }}
      />
    </>
  );
}
