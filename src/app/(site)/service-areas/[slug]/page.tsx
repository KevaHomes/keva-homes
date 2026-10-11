export const revalidate = 60;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import ServiceIcon from "@/components/ServiceIcon";
import ProjectCardGrid, { type ProjectCard } from "@/components/ProjectCardGrid";
import { BUSINESS_ID, getBusiness, telHref } from "@/lib/business";
import { absoluteUrl, breadcrumbJsonLd, openGraphFor } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getServiceAreaBySlug, getServiceAreas, getServices } from "@/sanity/lib/queries";

type Area = {
  _id: string;
  title: string;
  slug: string;
  county?: string;
  headline?: string;
  intro?: string;
  nearbyTowns?: string[];
  seoTitle?: string;
  seoDescription?: string;
  relatedProjects?: ProjectCard[];
};

export async function generateStaticParams() {
  const areas: { slug: string }[] = await getServiceAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area: Area | null = await getServiceAreaBySlug(slug);
  if (!area) return { title: "Area Not Found" };
  const title = area.seoTitle || area.headline || `General Contractor in ${area.title}`;
  const path = `/service-areas/${area.slug}`;
  const cover = area.relatedProjects?.find((p) => p?.coverImage)?.coverImage;
  return {
    title,
    description: area.seoDescription,
    alternates: { canonical: path },
    openGraph: openGraphFor(path, {
      title: `${title} | KEVA Homes`,
      description: area.seoDescription,
      image: cover
        ? { url: urlFor(cover).width(1200).height(630).url(), width: 1200, height: 630, alt: title }
        : undefined,
    }),
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [area, services, business]: [
    Area | null,
    { title: string; slug: string; icon?: string }[],
    Awaited<ReturnType<typeof getBusiness>>,
  ] = await Promise.all([getServiceAreaBySlug(slug), getServices(), getBusiness()]);
  if (!area) notFound();

  const path = `/service-areas/${area.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas We Serve", path: "/service-areas" },
    { name: area.title, path },
  ];
  const paragraphs = (area.intro ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const projects = area.relatedProjects ?? [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: area.headline || `General Contractor in ${area.title}`,
          url: absoluteUrl(path),
          about: { "@id": BUSINESS_ID },
          spatialCoverage: { "@type": "City", name: area.title },
        }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="bg-keva-black text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-keva-orange/10 border border-keva-orange/20 rounded-full text-keva-orange text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {area.county ? `${area.county}, NJ` : "North Jersey"}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black leading-tight mb-6">
              {area.headline || `General Contractor in ${area.title}`}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-keva-orange text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-orange-600 transition-colors"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={telHref(business.phone)}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-bold hover:border-keva-orange hover:text-keva-orange transition-colors"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 min-w-0 space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-keva-gray-700 text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <aside className="min-w-0 space-y-6">
            <div className="bg-keva-gray-50 rounded-2xl p-6">
              <h2 className="font-heading font-bold text-keva-black mb-4">Our Services</h2>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-keva-gray-700 hover:text-keva-orange transition-colors"
                    >
                      <ServiceIcon name={s.icon} className="w-4 h-4 text-keva-orange" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {area.nearbyTowns && area.nearbyTowns.length > 0 && (
              <div className="bg-keva-gray-50 rounded-2xl p-6">
                <h2 className="font-heading font-bold text-keva-black mb-3">Also Serving Nearby</h2>
                <p className="text-sm text-keva-gray-600">{area.nearbyTowns.join(" · ")}</p>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-1 text-keva-orange text-sm font-semibold mt-3 hover:underline"
                >
                  All areas we serve
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="py-16 bg-keva-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-keva-black mb-8">
              Our Projects in {area.title}
            </h2>
            <ProjectCardGrid projects={projects} />
          </div>
        </section>
      )}

      <CtaBand
        heading={`Planning a Project in ${area.title.split(",")[0]}?`}
        text="Contact KEVA Homes to schedule a free in-home consultation and talk through your project."
        phone={business.phone}
      />
    </>
  );
}
