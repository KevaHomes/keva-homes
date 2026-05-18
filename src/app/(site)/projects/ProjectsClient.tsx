"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Filter, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { urlFor } from "@/sanity/lib/image";

type Project = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  status: string;
  season: string;
  description: string;
  categories: string[];
  coverImage?: { asset: { _ref: string } };
};

const statusFilters = [
  { value: "all", label: "All" },
  { value: "current", label: "Current" },
  { value: "completed", label: "Completed" },
  { value: "featured", label: "Featured" },
];

export default function ProjectsClient({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const searchParams = useSearchParams();

  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Read initial filters from URL search params
  useEffect(() => {
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    if (status && statusFilters.some((f) => f.value === status)) {
      setStatusFilter(status);
    }
    if (category) {
      setCategoryFilter(category);
      setShowFilters(true);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (categoryFilter && !p.categories?.includes(categoryFilter))
        return false;
      return true;
    });
  }, [projects, statusFilter, categoryFilter]);

  return (
    <>
      <section className="bg-keva-black text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            Our <span className="text-keva-orange">Projects</span>
          </h1>
          <p className="text-keva-gray-400 text-lg max-w-2xl mx-auto">
            Browse our portfolio of completed and ongoing projects across North
            New Jersey. Filter by category to find projects similar to yours.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  statusFilter === f.value
                    ? "bg-keva-orange text-white"
                    : "bg-keva-gray-100 text-keva-gray-600 hover:bg-keva-gray-200",
                )}
              >
                {f.label}
              </button>
            ))}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-keva-gray-100 text-keva-gray-600 hover:bg-keva-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter by Category
            </button>
          </div>

          {showFilters && (
            <div className="mb-8 p-4 bg-keva-gray-50 rounded-xl">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter("")}
                  className={clsx(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    !categoryFilter
                      ? "bg-keva-orange text-white"
                      : "bg-white text-keva-gray-600 border border-keva-gray-200 hover:border-keva-orange",
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setCategoryFilter(cat === categoryFilter ? "" : cat)
                    }
                    className={clsx(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      categoryFilter === cat
                        ? "bg-keva-orange text-white"
                        : "bg-white text-keva-gray-600 border border-keva-gray-200 hover:border-keva-orange",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug}`}
                  className="group bg-keva-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-keva-gray-200 relative overflow-hidden">
                    {project.coverImage && (
                      <Image
                        src={urlFor(project.coverImage).width(600).height(450).url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-keva-black/60 to-transparent z-10" />
                    <div className="absolute top-3 left-3 z-20">
                      <span
                        className={clsx(
                          "text-xs font-bold px-2.5 py-1 rounded-full uppercase",
                          project.status === "current"
                            ? "bg-green-500 text-white"
                            : project.status === "featured"
                              ? "bg-keva-orange text-white"
                              : "bg-keva-gray-700 text-white",
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-keva-black mb-1 group-hover:text-keva-orange transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-keva-gray-500 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {project.location} &middot; {project.season}
                    </div>
                    <p className="text-keva-gray-600 text-sm line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.categories ?? []).slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs px-2 py-0.5 rounded-full bg-keva-orange/10 text-keva-orange font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-keva-gray-500 text-lg mb-4">
                No projects match your filters.
              </p>
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setCategoryFilter("");
                }}
                className="text-keva-orange font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-keva-orange py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Like What You See?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Contact us now to talk about your next project!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-keva-orange px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-gray-100 transition-colors"
          >
            Let&apos;s Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
