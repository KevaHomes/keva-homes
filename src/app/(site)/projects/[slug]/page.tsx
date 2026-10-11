export const revalidate = 60;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowLeft, ArrowRight, Tag, CheckCircle2, Wrench } from "lucide-react";
import { getProjectBySlug, getProjectSlugs, getProjects } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ProjectContent from "@/components/ProjectContent";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, openGraphFor } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  const title = `${project.title} - ${project.location}`;
  const path = `/projects/${project.slug}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: openGraphFor(path, {
      title: `${title} | KEVA Homes`,
      description: project.description,
      image: project.coverImage
        ? { url: urlFor(project.coverImage).width(1200).height(630).url(), width: 1200, height: 630, alt: title }
        : undefined,
    }),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p: { slug: string }) => p.slug !== project.slug)
    .slice(0, 3);

  const scope: string[] = project.scope ?? [];
  const services: { title: string; slug: string }[] = project.services ?? [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-keva-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-keva-black via-keva-gray-900 to-keva-black" />
        <div className="absolute -top-48 -right-32 w-[44rem] h-[44rem] rounded-full bg-keva-orange/20 blur-[120px]" />
        <div className="absolute -bottom-56 -left-40 w-[34rem] h-[34rem] rounded-full bg-keva-orange/10 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-keva-orange/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-keva-gray-400 hover:text-keva-orange transition-colors text-sm mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div
            className={`grid grid-cols-1 gap-6 items-center ${project.coverImage ? "lg:grid-cols-[1fr_auto] lg:gap-12" : ""}`}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white uppercase ${project.status === "current" ? "bg-green-500" : "bg-keva-gray-600"}`}>
                  {project.status}
                </span>
                {project.isFeatured && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-keva-orange text-white uppercase">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-keva-gray-300 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-keva-orange" />
                  {project.location}
                </span>
                {project.season && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-keva-gray-300 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4 text-keva-orange" />
                    {project.season}
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {project.milestones && project.milestones.length > 0 && (
                  <a
                    href="#journey"
                    className="inline-flex items-center justify-center gap-2 bg-keva-orange text-white px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold hover:bg-keva-orange-600 transition-colors"
                  >
                    Follow the Project Journey
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold hover:border-keva-orange hover:text-keva-orange transition-colors"
                >
                  Start Your Own Project
                </Link>
              </div>
            </div>
            {project.coverImage && (
              <div className="relative order-first lg:order-none w-full sm:max-w-md sm:mx-auto lg:mx-0 lg:w-[20rem] xl:w-[23rem]">
                <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-tr from-keva-orange/25 via-keva-orange/5 to-transparent blur-xl" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/60">
                  <Image
                    src={urlFor(project.coverImage).width(960).height(720).url()}
                    alt={`${project.title} in ${project.location}`}
                    fill
                    priority
                    sizes="(min-width: 1280px) 368px, (min-width: 1024px) 320px, (min-width: 640px) 448px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-keva-black/30 via-transparent to-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-keva-black mb-4">
                About This Project
              </h2>
              <p className="text-keva-gray-600 leading-relaxed text-lg mb-8">
                {project.description}
              </p>

              {scope.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-heading text-xl font-bold text-keva-black mb-4">
                    What We Did
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scope.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-keva-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-keva-orange flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Milestone Timeline (new) or Legacy Gallery/Videos (fallback) */}
              {project.milestones && project.milestones.length > 0 ? (
                <div id="journey" className="scroll-mt-28">
                  <h3 className="font-heading text-xl font-bold text-keva-black mb-2">
                    Project Journey
                  </h3>
                  <p className="text-keva-gray-500 text-sm mb-6">
                    Follow along from start to finish. Click a milestone to jump to that phase.
                  </p>
                  <ProjectContent
                    milestones={project.milestones.map(
                      (m: {
                        _key: string;
                        title: string;
                        gallery?: { asset: { _ref: string }; caption?: string }[];
                        videos?: {
                          _key?: string;
                          _type?: string;
                          url?: string;
                          caption?: string;
                          videoUrl?: string;
                        }[];
                        youtubeUrls?: string[];
                      }) => ({
                        ...m,
                        gallery: (m.gallery ?? [])
                          .filter((img) => img.asset?._ref)
                          .map((img) => ({
                            url: urlFor(img).width(600).height(450).url(),
                            fullUrl: urlFor(img).width(1600).height(1200).url(),
                            caption: img.caption,
                          })),
                      }),
                    )}
                    projectTitle={`${project.title} in ${project.location}`}
                  />
                </div>
              ) : (
                <>
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="mb-12">
                      <h3 className="font-heading text-xl font-bold text-keva-black mb-4">
                        Project Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {project.gallery.map(
                          (
                            img: {
                              asset: { _ref: string };
                              caption?: string;
                              phase?: string;
                            },
                            i: number,
                          ) => (
                            <div
                              key={i}
                              className="aspect-[4/3] bg-keva-gray-100 rounded-xl relative overflow-hidden"
                            >
                              <Image
                                src={urlFor(img).width(600).height(450).url()}
                                alt={img.caption ?? `${project.title} photo ${i + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                              {img.phase && (
                                <span className="absolute bottom-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full bg-keva-orange text-white uppercase z-10">
                                  {img.phase}
                                </span>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {project.youtubeUrls && project.youtubeUrls.length > 0 && (
                    <div className="mb-12">
                      <h3 className="font-heading text-xl font-bold text-keva-black mb-4">
                        Project Videos
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.youtubeUrls.map((url: string, i: number) => {
                          const videoId =
                            url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/)?.[1];
                          if (!videoId) return null;
                          return (
                            <div
                              key={i}
                              className="aspect-video rounded-xl overflow-hidden bg-keva-gray-100"
                            >
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={`${project.title} video ${i + 1}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              <div className="sticky top-24 space-y-6">
                <div className="bg-keva-gray-50 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-keva-black mb-4">
                    Project Details
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-xs text-keva-gray-500 uppercase tracking-wide">
                        Location
                      </dt>
                      <dd className="text-keva-black font-medium">
                        {project.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-keva-gray-500 uppercase tracking-wide">
                        Timeline
                      </dt>
                      <dd className="text-keva-black font-medium">
                        {project.season}
                      </dd>
                    </div>
                    {project.projectSize && (
                      <div>
                        <dt className="text-xs text-keva-gray-500 uppercase tracking-wide">
                          Size
                        </dt>
                        <dd className="text-keva-black font-medium">
                          {project.projectSize}
                        </dd>
                      </div>
                    )}
                    {project.duration && (
                      <div>
                        <dt className="text-xs text-keva-gray-500 uppercase tracking-wide">
                          Duration
                        </dt>
                        <dd className="text-keva-black font-medium">
                          {project.duration}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-xs text-keva-gray-500 uppercase tracking-wide">
                        Status
                      </dt>
                      <dd className="text-keva-black font-medium capitalize">
                        {project.status}
                      </dd>
                    </div>
                  </dl>
                </div>

                {services.length > 0 && (
                  <div className="bg-keva-gray-50 rounded-2xl p-6">
                    <h3 className="font-heading font-bold text-keva-black mb-3 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-keva-orange" />
                      Services on This Project
                    </h3>
                    <ul className="space-y-2">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-keva-gray-700 hover:text-keva-orange transition-colors"
                          >
                            {s.title}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-keva-gray-50 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-keva-black mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-keva-orange" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.categories ?? []).map((cat: string) => (
                      <Link
                        key={cat}
                        href={`/projects?category=${encodeURIComponent(cat)}`}
                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-keva-gray-200 text-keva-gray-700 hover:border-keva-orange hover:text-keva-orange transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block bg-keva-orange text-white text-center px-6 py-4 rounded-2xl font-bold hover:bg-keva-orange-600 transition-colors"
                >
                  Start Your Own Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 bg-keva-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-keva-black mb-8">
            More Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProjects.map(
              (rp: { slug: string; title: string; location: string; coverImage?: { asset: { _ref: string } } }) => (
                <Link
                  key={rp.slug}
                  href={`/projects/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] bg-keva-gray-200 relative overflow-hidden">
                    {rp.coverImage && (
                      <Image
                        src={urlFor(rp.coverImage).width(600).height(450).url()}
                        alt={`${rp.title} in ${rp.location}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-keva-black group-hover:text-keva-orange transition-colors mb-1">
                      {rp.title}
                    </h3>
                    <div className="flex items-center gap-1 text-keva-gray-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      {rp.location}
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-keva-orange font-semibold hover:gap-3 transition-all"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
