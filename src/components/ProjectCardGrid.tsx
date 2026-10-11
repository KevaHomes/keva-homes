import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  season?: string;
  status?: string;
  coverImage?: { asset: { _ref: string } };
};

export default function ProjectCardGrid({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link
          key={project._id}
          href={`/projects/${project.slug}`}
          className="group bg-white rounded-2xl overflow-hidden border border-keva-gray-100 hover:shadow-lg transition-all"
        >
          <div className="aspect-[4/3] bg-keva-gray-200 relative overflow-hidden">
            {project.coverImage && (
              <Image
                src={urlFor(project.coverImage).width(600).height(450).url()}
                alt={`${project.title}${project.location ? ` in ${project.location}` : ""}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {project.status && (
              <span
                className={`absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full uppercase text-white ${
                  project.status === "current" ? "bg-green-500" : "bg-keva-gray-700"
                }`}
              >
                {project.status}
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-heading font-bold text-keva-black group-hover:text-keva-orange transition-colors mb-1">
              {project.title}
            </h3>
            {project.location && (
              <div className="flex items-center gap-1 text-keva-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                {project.location}
                {project.season ? ` · ${project.season}` : ""}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
