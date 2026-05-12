import type { Metadata } from "next";
import { getApprovedReviews } from "@/sanity/lib/queries";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what customers are saying about KEVA Homes construction services. Share your own experience.",
};

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
      : 5;

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "KEVA Homes",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <ReviewsClient reviews={reviews} />
    </>
  );
}
