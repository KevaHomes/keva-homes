"use server";

import { writeClient } from "@/sanity/lib/client";

export async function submitReview(formData: {
  name: string;
  rating: number;
  content: string;
}) {
  try {
    await writeClient.create({
      _type: "review",
      author: formData.name,
      rating: formData.rating,
      content: formData.content,
      date: new Date().toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
      source: "website",
      status: "pending",
    });

    return { success: true };
  } catch (error) {
    console.error("Review submission error:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}
