export const revalidate = 60;

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBusiness } from "@/lib/business";
import { breadcrumbJsonLd, openGraphFor } from "@/lib/seo";
import { getApprovedReviews } from "@/sanity/lib/queries";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read what North Jersey homeowners say about working with KEVA Homes on renovations, bathrooms, kitchens, decks and more. Share your own experience.",
  alternates: { canonical: "/reviews" },
  openGraph: openGraphFor("/reviews"),
};

export default async function ReviewsPage() {
  const [reviews, business] = await Promise.all([getApprovedReviews(), getBusiness()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <ReviewsClient reviews={reviews} googleUrl={business.social.google} yelpUrl={business.social.yelp} />
    </>
  );
}
