export const revalidate = 60;

import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjects, getCategories } from "@/sanity/lib/queries";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse KEVA Homes portfolio of completed and ongoing construction projects across North New Jersey.",
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
    <Suspense>
      <ProjectsClient projects={projects} categories={categories} />
    </Suspense>
  );
}
