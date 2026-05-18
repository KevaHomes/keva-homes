export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Home,
  Building2,
  Wrench,
  Zap,
  Paintbrush,
  ClipboardCheck,
} from "lucide-react";
import { getServices, getSiteSettings, getProjects } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Services",
  description:
    "KEVA Homes offers complete construction services including interior & exterior renovations, structural repairs, energy efficiency upgrades, and custom renovations across North NJ.",
};

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-10 h-10" />,
  Building2: <Building2 className="w-10 h-10" />,
  Wrench: <Wrench className="w-10 h-10" />,
  Zap: <Zap className="w-10 h-10" />,
  Paintbrush: <Paintbrush className="w-10 h-10" />,
  ClipboardCheck: <ClipboardCheck className="w-10 h-10" />,
};

export default async function ServicesPage() {
  const [services, settings, allProjects] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getProjects(),
  ]);
  const additionalServices = settings?.additionalServices ?? [];

  // Build a set of categories that actually have projects tagged to them
  const categoriesWithProjects = new Set<string>();
  for (const project of allProjects) {
    for (const cat of project.categories ?? []) {
      categoriesWithProjects.add(cat);
    }
  }
  return (
    <>
      {/* Hero */}
      <section className="bg-keva-black text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            Services: We Do It{" "}
            <span className="text-keva-orange">All</span>
          </h1>
          <p className="text-keva-gray-400 text-lg max-w-2xl mx-auto">
            From minor repairs to complete home transformations, KEVA Homes has
            the expertise and dedication to bring your project to life.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service: { _id: string; slug: string; icon: string; title: string; description: string }) => (
              <div
                key={service._id}
                className="bg-keva-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="w-16 h-16 bg-keva-orange/10 rounded-2xl flex items-center justify-center text-keva-orange mb-6 group-hover:bg-keva-orange group-hover:text-white transition-colors">
                  {iconMap[service.icon] ?? <Wrench className="w-10 h-10" />}
                </div>
                <h2 className="font-heading text-2xl font-bold text-keva-black mb-3">
                  {service.title}
                </h2>
                <p className="text-keva-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 sm:py-24 bg-keva-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-keva-black mb-4">
              Plain and Simple:{" "}
              <span className="text-keva-orange">We&apos;ve Got You Covered</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalServices.map((service: string) => {
              const hasProjects = categoriesWithProjects.has(service);
              return hasProjects ? (
                <Link
                  key={service}
                  href={`/projects?category=${encodeURIComponent(service)}`}
                  className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-keva-gray-700 border border-keva-gray-200 hover:border-keva-orange hover:text-keva-orange hover:bg-keva-orange/5 transition-colors"
                >
                  {service}
                </Link>
              ) : (
                <span
                  key={service}
                  className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-keva-gray-400 border border-keva-gray-100 cursor-default"
                >
                  {service}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-keva-black rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              Serving North New Jersey
            </h2>
            <p className="text-keva-gray-400 mb-2">
              {settings?.serviceAreas ?? "Essex, Union, Morris, Bergen, Passaic & surrounding counties"}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-keva-orange py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Contact us now to discuss your project and get a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-keva-orange px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-gray-100 transition-colors"
            >
              Contact Us Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9734444996"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {settings?.phone ?? "(973) 444-4996"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
