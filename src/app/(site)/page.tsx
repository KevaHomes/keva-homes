export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  Home,
  Building2,
  Wrench,
  Zap,
  Paintbrush,
  ClipboardCheck,
  Star,
  MapPin,
  Users,
  Target,
  Handshake,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import FadeIn from "@/components/FadeIn";
import SectionNav from "@/components/SectionNav";
import {
  getProjects,
  getServices,
  getApprovedReviews,
  getSiteSettings,
} from "@/sanity/lib/queries";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Paintbrush: <Paintbrush className="w-8 h-8" />,
  ClipboardCheck: <ClipboardCheck className="w-8 h-8" />,
};

const aboutIconMap: Record<string, React.ReactNode> = {
  "Who We Are": <Users className="w-8 h-8" />,
  "What We're About": <Target className="w-8 h-8" />,
  "Client Satisfaction": <Handshake className="w-8 h-8" />,
};

export default async function HomePage() {
  const [allProjects, allServices, reviews, settings] = await Promise.all([
    getProjects(),
    getServices(),
    getApprovedReviews(),
    getSiteSettings(),
  ]);

  const featuredProjects = allProjects
    .filter(
      (p: { status: string }) =>
        p.status === "featured" || p.status === "completed",
    )
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-keva-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-keva-black via-keva-gray-900 to-keva-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-keva-orange rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-keva-orange rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-keva-orange/10 border border-keva-orange/20 rounded-full text-keva-orange text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Serving North New Jersey
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Building Dreams
              <span className="text-keva-orange"> into Reality</span>
            </h1>
            <p className="text-lg sm:text-xl text-keva-gray-400 mb-8 max-w-2xl">
              Expert building contractor providing quality construction services.
              From interior renovations to complete home transformations — we do it
              all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-keva-orange text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-orange-600 transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:9734444996"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-bold hover:border-keva-orange hover:text-keva-orange transition-colors"
              >
                <Phone className="w-5 h-5" />
                {settings?.phone ?? "(973) 444-4996"}
              </a>
            </div>
            <p className="mt-4 text-keva-gray-500 text-sm">
              Or call toll-free: {settings?.tollFree ?? "833-KEVA-HOME"}
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Section Nav */}
      <SectionNav />

      {/* About Us */}
      <section id="about" className="py-16 sm:py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-keva-black mb-4">
              About <span className="text-keva-orange">Us</span>
            </h2>
            <p className="text-keva-gray-600 max-w-2xl mx-auto">
              A family owned and operated construction business dedicated to
              quality and customer satisfaction.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(settings?.aboutSections ?? []).map(
              (section: { _key: string; title: string; content: string }, i: number) => (
                <FadeIn key={section._key} delay={i * 0.1}>
                  <div className="bg-keva-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow h-full group">
                    <div className="w-14 h-14 bg-keva-orange/10 rounded-xl flex items-center justify-center text-keva-orange mb-4 group-hover:bg-keva-orange group-hover:text-white transition-colors">
                      {aboutIconMap[section.title] ?? <Users className="w-8 h-8" />}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-keva-black mb-4">
                      {section.title}
                    </h3>
                    <p className="text-keva-gray-600 text-sm leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </FadeIn>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-16 sm:py-24 bg-keva-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-keva-black mb-4">
              Our <span className="text-keva-orange">Services</span>
            </h2>
            <p className="text-keva-gray-600 max-w-2xl mx-auto">
              Plain and simple: we&apos;ve got you covered. From minor repairs to
              complete home transformations.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map(
              (service: {
                _id: string;
                slug: string;
                icon: string;
                title: string;
                description: string;
              }, i: number) => (
                <FadeIn key={service._id} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group h-full">
                    <div className="w-14 h-14 bg-keva-orange/10 rounded-xl flex items-center justify-center text-keva-orange mb-4 group-hover:bg-keva-orange group-hover:text-white transition-colors">
                      {iconMap[service.icon] ?? <Wrench className="w-8 h-8" />}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-keva-black mb-2">
                      {service.title}
                    </h3>
                    <p className="text-keva-gray-600 text-sm leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </FadeIn>
              ),
            )}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-keva-orange font-semibold hover:gap-3 transition-all"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-16 sm:py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-keva-black mb-4">
              Featured <span className="text-keva-orange">Projects</span>
            </h2>
            <p className="text-keva-gray-600 max-w-2xl mx-auto">
              Take a look at some of our proudest work across North New Jersey.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProjects.map(
              (project: {
                slug: string;
                status: string;
                season: string;
                title: string;
                location: string;
                coverImage?: { asset: { _ref: string } };
              }) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group relative bg-keva-gray-900 rounded-2xl overflow-hidden aspect-[4/3] flex items-end"
                >
                  {project.coverImage && (
                    <Image
                      src={urlFor(project.coverImage).width(800).height(600).url()}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-keva-black/80 via-keva-black/20 to-transparent z-10" />
                  <div className="relative z-20 p-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-keva-orange text-white uppercase">
                        {project.status}
                      </span>
                      <span className="text-xs text-keva-gray-300">
                        {project.season}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-keva-orange transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-keva-gray-300 text-sm">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-keva-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-keva-gray-900 transition-colors"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 sm:py-24 bg-keva-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-keva-black mb-4">
              What People Are{" "}
              <span className="text-keva-orange">Saying</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(
              (review: {
                _id: string;
                author: string;
                rating: number;
                content: string;
                date: string;
              }) => (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-keva-orange text-keva-orange"
                      />
                    ))}
                  </div>
                  <p className="text-keva-gray-600 text-sm leading-relaxed mb-4">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-keva-orange flex items-center justify-center text-white font-bold text-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-keva-black">
                        {review.author}
                      </p>
                      <p className="text-xs text-keva-gray-500">
                        {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-keva-orange font-semibold hover:gap-3 transition-all"
            >
              Read More Reviews
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-keva-orange py-16">
        <FadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. Let&apos;s bring your vision
            to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-keva-orange px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-gray-100 transition-colors"
            >
              Get a Free Quote
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
        </FadeIn>
      </section>
    </>
  );
}
