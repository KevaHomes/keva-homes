export const revalidate = 60;

import type { Metadata } from "next";
import { getFaqItems } from "@/sanity/lib/queries";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about KEVA Homes construction services, estimates, permits, and project process.",
};

export default async function FaqPage() {
  const faqItems = await getFaqItems();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqClient faqItems={faqItems} />
    </>
  );
}
