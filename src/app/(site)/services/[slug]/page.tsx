export const revalidate = 60;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Clock,
  FileCheck,
  ShieldCheck,
  BadgeCheck,
  MapPin,
  ChevronDown,
} from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import ProjectCardGrid, { type ProjectCard } from "@/components/ProjectCardGrid";
import { BUSINESS_ID, getBusiness, telHref } from "@/lib/business";
import { absoluteUrl, areaServedJsonLd, breadcrumbJsonLd, faqJsonLd, openGraphFor } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getServiceBySlug, getServiceSlugs, getServices } from "@/sanity/lib/queries";

type Service = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  headline?: string;
  intro?: string;
  includes?: string[];
  timeline?: string;
  faqs?: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
  relatedProjects?: ProjectCard[];
};

export async function generateStaticParams() {
  const slugs: string[] = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service: Service | null = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  const title = service.seoTitle || `${service.title} in North Jersey`;
  const description = service.seoDescription || service.description;
  const cover = service.relatedProjects?.find((p) => p?.coverImage)?.coverImage;
  const path = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: openGraphFor(path, {
      title: `${title} | KEVA Homes`,
      description,
      image: cover
        ? { url: urlFor(cover).width(1200).height(630).url(), width: 1200, height: 630, alt: title }
        : undefined,
    }),
  };
}

function paragraphs(text?: string): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, allServices, business]: [Service | null, Service[], Awaited<ReturnType<typeof getBusiness>>] =
    await Promise.all([getServiceBySlug(slug), getServices(), getBusiness()]);

  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ];
  const projects = service.relatedProjects ?? [];
  const faqs = service.faqs ?? [];
  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.seoDescription || service.description,
          url: absoluteUrl(path),
          provider: { "@id": BUSINESS_ID },
          areaServed: areaServedJsonLd(business),
        }}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      {/* Hero */}
      <section className="bg-keva-black text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} />
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="hidden sm:flex w-12 h-12 flex-shrink-0 bg-keva-orange/15 rounded-xl items-center justify-center text-keva-orange">
                <ServiceIcon name={service.icon} className="w-6 h-6" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-black leading-tight">
                {service.headline || service.title}
              </h1>
            </div>
            {service.description && (
              <p className="text-keva-gray-400 text-base sm:text-lg mb-6">{service.description}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-keva-orange text-white px-6 py-3 rounded-xl text-base font-bold hover:bg-keva-orange-600 transition-colors"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={telHref(business.phone)}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-6 py-3 rounded-xl text-base font-bold hover:border-keva-orange hover:text-keva-orange transition-colors"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 min-w-0 space-y-12">
              {paragraphs(service.intro).length > 0 && (
                <div className="space-y-5">
                  {paragraphs(service.intro).map((p, i) => (
                    <p key={i} className="text-keva-gray-700 text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {service.includes && service.includes.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-keva-black mb-5">
                    What&apos;s Included
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-keva-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-keva-orange flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {faqs.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-bold text-keva-black mb-5">
                    {service.title}: Common Questions
                  </h2>
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <details
                        key={faq.question}
                        className="group bg-keva-gray-50 rounded-xl px-5 py-4 open:pb-5"
                      >
                        <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-keva-black [&::-webkit-details-marker]:hidden">
                          {faq.question}
                          <ChevronDown className="w-5 h-5 flex-shrink-0 text-keva-gray-400 transition-transform group-open:rotate-180 group-open:text-keva-orange" />
                        </summary>
                        <p className="mt-3 text-keva-gray-600 leading-relaxed">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 text-keva-orange font-semibold mt-5 hover:gap-3 transition-all"
                  >
                    More questions and answers
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Quick facts */}
            <aside className="min-w-0">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-keva-gray-50 rounded-2xl p-6">
                  <h2 className="font-heading font-bold text-keva-black mb-5">Good to Know</h2>
                  <dl className="space-y-5 text-sm">
                    {service.timeline && (
                      <div className="flex gap-3">
                        <Clock className="w-5 h-5 text-keva-orange flex-shrink-0" />
                        <div>
                          <dt className="font-semibold text-keva-black">Typical timeline</dt>
                          <dd className="text-keva-gray-600">{service.timeline}</dd>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <FileCheck className="w-5 h-5 text-keva-orange flex-shrink-0" />
                      <div>
                        <dt className="font-semibold text-keva-black">Permits</dt>
                        <dd className="text-keva-gray-600">
                          KEVA files the permits for you. Your town&apos;s permit fees are paid by the property owner.
                        </dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <BadgeCheck className="w-5 h-5 text-keva-orange flex-shrink-0" />
                      <div>
                        <dt className="font-semibold text-keva-black">Warranty</dt>
                        <dd className="text-keva-gray-600">{business.warranty}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-keva-orange flex-shrink-0" />
                      <div>
                        <dt className="font-semibold text-keva-black">Licensed &amp; insured</dt>
                        <dd className="text-keva-gray-600">
                          NJ HIC Reg. #{business.hicNumber}. {business.insurance}.
                        </dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-keva-orange flex-shrink-0" />
                      <div>
                        <dt className="font-semibold text-keva-black">Service area</dt>
                        <dd className="text-keva-gray-600">
                          {business.serviceAreasSummary}.{" "}
                          <Link href="/service-areas" className="text-keva-orange font-medium hover:underline">
                            See towns
                          </Link>
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <Link
                  href="/contact"
                  className="block bg-keva-orange text-white text-center px-6 py-4 rounded-2xl font-bold hover:bg-keva-orange-600 transition-colors"
                >
                  Get a Free In-Home Consultation
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Example projects */}
      {projects.length > 0 && (
        <section className="py-16 bg-keva-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-keva-black mb-8">
              {service.title} Projects
            </h2>
            <ProjectCardGrid projects={projects} />
          </div>
        </section>
      )}

      {/* Other services */}
      {otherServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-keva-black mb-6">Other Services</h2>
            <div className="flex flex-wrap gap-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-keva-gray-50 rounded-full text-sm font-medium text-keva-gray-700 border border-keva-gray-200 hover:border-keva-orange hover:text-keva-orange transition-colors"
                >
                  <ServiceIcon name={s.icon} className="w-4 h-4" />
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand phone={business.phone} />
    </>
  );
}
