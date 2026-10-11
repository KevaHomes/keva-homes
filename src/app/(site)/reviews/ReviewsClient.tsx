"use client";

import { useState } from "react";
import { Star, Send, MessageSquare, Globe, ExternalLink } from "lucide-react";
import { submitReview } from "@/app/actions/review";
import TruncatedText from "@/components/TruncatedText";

type Review = {
  _id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  source: string;
};

function StarRating({
  rating,
  onRate,
  interactive = false,
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`w-6 h-6 ${
              star <= (hover || rating)
                ? "fill-keva-orange text-keva-orange"
                : "text-keva-gray-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function YelpIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#D32323" aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 7.15 7.15 0 012.182 3.108c.27.79-.42 1.357-.512 1.603zm-7.4 5.17l1.107-5.063c.21-.96 1.532-1.1 1.96-.205l2.167 4.543a1.072 1.072 0 01-.57 1.517 7.15 7.15 0 01-3.753.614c-.832-.1-1.107-.684-1.107-.684l.196-2.722zm-2.853-2.282l-4.47-2.607c-.86-.502-.536-1.87.49-2.066l5.255-.997c.96-.182 1.548 1.025.87 1.796l-2.785 3.077c-.293.323-.84.472-1.36.797zm-.72-7.16L12.34 3.2c.63-.718 1.833-.17 1.818.83l-.077 5.125c-.015.975-1.29 1.37-1.886.584l-3.065-4.03c-.243-.32-.243-.823 0-1.387zM5.7 13.263l5.14-.93c.962-.174 1.417 1.132.672 1.928l-3.83 4.088c-.455.486-1.27.296-1.55-.362a7.15 7.15 0 01-.422-3.77c.075-.535.434-.737.99-.954z" />
    </svg>
  );
}

// Shows where each review came from, based on the Source picked in Studio.
function SourceBadge({ source }: { source?: string }) {
  if (source === "google") {
    return (
      <>
        <GoogleIcon />
        Google Review
      </>
    );
  }
  if (source === "yelp") {
    return (
      <>
        <YelpIcon />
        Yelp Review
      </>
    );
  }
  return (
    <>
      <Globe className="w-4 h-4 text-keva-orange" />
      Website Review
    </>
  );
}

export default function ReviewsClient({
  reviews,
  googleUrl,
  yelpUrl,
}: {
  reviews: Review[];
  googleUrl?: string;
  yelpUrl?: string;
}) {
  const [formState, setFormState] = useState({
    name: "",
    rating: 0,
    content: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formState.rating === 0) return;
    setSubmitting(true);
    const result = await submitReview({
      name: formState.name,
      rating: formState.rating,
      content: formState.content,
    });
    setSubmitting(false);
    if (result.success) setSubmitted(true);
  }

  return (
    <>
      <section className="bg-keva-black text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            What People Are{" "}
            <span className="text-keva-orange">Saying</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            <StarRating rating={Math.round(avgRating)} />
            <span className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-keva-gray-400">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="font-heading text-2xl font-bold text-keva-black">
              Customer Reviews
            </h2>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              {googleUrl && (
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-keva-gray-700 hover:text-keva-orange transition-colors"
                >
                  <GoogleIcon />
                  See us on Google
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {yelpUrl && (
                <a
                  href={yelpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-keva-gray-700 hover:text-keva-orange transition-colors"
                >
                  <YelpIcon />
                  See us on Yelp
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-keva-gray-50 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-keva-orange flex items-center justify-center text-white font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-keva-black">
                      {review.author}
                    </p>
                    <p className="text-xs text-keva-gray-500">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <TruncatedText
                  text={review.content}
                  className="text-keva-gray-600 leading-relaxed mt-3"
                />
                <p className="text-xs text-keva-gray-400 mt-3 flex items-center gap-1">
                  <SourceBadge source={review.source} />
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-keva-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-keva-orange" />
                <h2 className="font-heading text-2xl font-bold text-keva-black">
                  Share Your Experience
                </h2>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-green-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-green-700">
                    Your review has been submitted and will appear after
                    approval.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="review-name"
                      className="block text-sm font-medium text-keva-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="review-name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-keva-gray-700 mb-2">
                      Rating *
                    </label>
                    <StarRating
                      rating={formState.rating}
                      onRate={(r) => setFormState({ ...formState, rating: r })}
                      interactive
                    />
                    {formState.rating === 0 && (
                      <p className="text-xs text-keva-gray-500 mt-1">
                        Click a star to rate
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="review-content"
                      className="block text-sm font-medium text-keva-gray-700 mb-1"
                    >
                      Your Review *
                    </label>
                    <textarea
                      id="review-content"
                      required
                      rows={4}
                      value={formState.content}
                      onChange={(e) =>
                        setFormState({ ...formState, content: e.target.value })
                      }
                      placeholder="Tell us about your experience with KEVA Homes..."
                      className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-keva-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-keva-orange-600 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
