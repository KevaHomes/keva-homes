import { createClient } from "next-sanity";

// Preview deployments (and local dev with SANITY_PREVIEW_DRAFTS=true) show unpublished
// drafts so content can be reviewed before it goes live. Production only sees published content.
const showDrafts =
  Boolean(process.env.SANITY_API_TOKEN) &&
  (process.env.VERCEL_ENV === "preview" || process.env.SANITY_PREVIEW_DRAFTS === "true");

export const client = showDrafts
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2025-02-19",
      useCdn: false,
      perspective: "drafts",
      token: process.env.SANITY_API_TOKEN,
    })
  : createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: "2024-01-01",
      useCdn: false,
    });

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
