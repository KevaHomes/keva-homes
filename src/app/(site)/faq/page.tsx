export const revalidate = 60;

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, openGraphFor } from "@/lib/seo";
import { getFaqItems } from "@/sanity/lib/queries";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about permits, timelines, warranties, insurance, estimates and the areas KEVA Homes serves across North Jersey.",
  alternates: { canonical: "/faq" },
  openGraph: openGraphFor("/faq"),
};

export default async function FaqPage() {
  const faqItems: { _id: string; question: string; answer: string }[] = await getFaqItems();

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <FaqClient faqItems={faqItems} />
    </>
  );
}
