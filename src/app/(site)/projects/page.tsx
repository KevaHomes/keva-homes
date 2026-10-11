export const revalidate = 60;

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, openGraphFor } from "@/lib/seo";
import { getProjects, getCategories } from "@/sanity/lib/queries";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Renovation & Construction Projects in North Jersey",
  description:
    "See KEVA Homes' completed and current projects across North Jersey: whole-home renovations, additions, exteriors, decks and new homes in Bloomfield, Whippany, Woodcliff Lake and more.",
  alternates: { canonical: "/projects" },
  openGraph: openGraphFor("/projects"),
};

export default async function ProjectsPage() {
  const [projects, categoryDocs] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);
  const categories = categoryDocs.map(
    (c: { title: string }) => c.title,
  );
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <ProjectsClient projects={projects} categories={categories} />
    </>
  );
}
