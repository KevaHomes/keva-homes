export const revalidate = 60;

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { getProjectBySlug, getProjectSlugs, getProjects } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ProjectContent from "@/components/ProjectContent";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} - ${project.location}`,
    description: project.description,
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

  return (
    <>
      {/* Hero */}
      <section className="relative bg-keva-black text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-keva-gray-400 hover:text-keva-orange transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="flex items-start gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white uppercase ${project.status === "current" ? "bg-green-500" : "bg-keva-gray-600"}`}>
                  {project.status}
                </span>
                {project.isFeatured && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-keva-orange text-white uppercase">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-keva-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-5 h-5" />
                  {project.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-5 h-5" />
                  {project.season}
                </span>
              </div>
            </div>
            {project.coverImage && (
              <div className="hidden md:block flex-shrink-0 w-48 lg:w-56 aspect-[4/3] rounded-xl overflow-hidden border-2 border-white/10">
                <Image
                  src={urlFor(project.coverImage).width(400).height(300).url()}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
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

              {/* Milestone Timeline (new) or Legacy Gallery/Videos (fallback) */}
              {project.milestones && project.milestones.length > 0 ? (
                <div>
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
                        videos?: { url: string; caption?: string }[];
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
                    projectTitle={project.title}
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
                        alt={rp.title}
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
