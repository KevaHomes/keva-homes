export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/CtaBand";
import { getBusiness, telHref } from "@/lib/business";
import { breadcrumbJsonLd, openGraphFor } from "@/lib/seo";
import { getProjects, getServiceAreas } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Areas We Serve in North Jersey",
  description:
    "KEVA Homes works throughout Essex, Bergen, Morris, Passaic and Union counties, from Montclair and Ridgewood to Morristown and Summit. See the towns we serve.",
  alternates: { canonical: "/service-areas" },
  openGraph: openGraphFor("/service-areas"),
};

type Project = { _id: string; title: string; slug: string; location?: string };
type Area = { _id: string; title: string; slug: string };

const townOf = (location?: string) => (location ?? "").split(",")[0].trim().toLowerCase();

export default async function ServiceAreasPage() {
  const [business, projects, areas]: [Awaited<ReturnType<typeof getBusiness>>, Project[], Area[]] =
    await Promise.all([getBusiness(), getProjects(), getServiceAreas()]);

  const areaPageFor = (town: string) => areas.find((a) => townOf(a.title) === town.toLowerCase());

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/service-areas" },
        ])}
      />

      <section className="bg-keva-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-black mb-3">
            Areas We Serve in <span className="text-keva-orange">North Jersey</span>
          </h1>
          <p className="text-keva-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            KEVA Homes is based in {business.city} and works throughout{" "}
            {business.serviceAreasSummary}. These are the towns where we work most
            often. Don&apos;t see yours? Give us a call at{" "}
            <a href={telHref(business.phone)} className="text-white hover:text-keva-orange">
              {business.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {business.counties.map((county) => {
            const towns = county.towns.map((t) => t.toLowerCase());
            const countyProjects = projects.filter((p) => towns.includes(townOf(p.location)));
            return (
              <div key={county.county} className="bg-keva-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
                <h2 className="font-heading text-2xl font-bold text-keva-black flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-keva-orange" />
                  {county.county}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {county.towns.map((town) => {
                    const page = areaPageFor(town);
                    return (
                      <li key={town}>
                        {page ? (
                          <Link
                            href={`/service-areas/${page.slug}`}
                            className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold bg-keva-orange text-white hover:bg-keva-orange-600 transition-colors"
                          >
                            {town}
                          </Link>
                        ) : (
                          <span className="inline-block px-3 py-1.5 rounded-full text-sm bg-white border border-keva-gray-200 text-keva-gray-700">
                            {town}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {countyProjects.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-keva-gray-500 mb-2">
                      Our projects in {county.county}
                    </h3>
                    <ul className="space-y-1.5">
                      {countyProjects.map((p) => (
                        <li key={p._id}>
                          <Link
                            href={`/projects/${p.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-keva-gray-700 hover:text-keva-orange transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 text-keva-orange" />
                            {p.title} · {p.location}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand
        heading="Planning a Project in Your Town?"
        text="Contact KEVA Homes for a free in-home consultation anywhere in North Jersey."
        phone={business.phone}
      />
    </>
  );
}
