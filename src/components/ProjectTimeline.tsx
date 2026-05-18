"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type MilestoneImage = {
  asset: { _ref: string };
  caption?: string;
};

type Milestone = {
  _key: string;
  title: string;
  gallery?: MilestoneImage[];
  youtubeUrls?: string[];
};

function getYouTubeId(url: string) {
  return url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
  )?.[1];
}

export default function ProjectTimeline({
  milestones,
  projectTitle,
  urlFor,
}: {
  milestones: Milestone[];
  projectTitle: string;
  urlFor: (source: { asset: { _ref: string } }) => string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToMilestone = (index: number) => {
    setActiveIndex(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const activeMilestone = milestones[activeIndex];
  const hasContent =
    (activeMilestone?.gallery?.length ?? 0) > 0 ||
    (activeMilestone?.youtubeUrls?.length ?? 0) > 0;

  return (
    <div>
      {/* Horizontal Timeline */}
      <div className="mb-8 overflow-x-auto scrollbar-hide">
        <div className="relative flex items-center min-w-max px-2 py-4">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-keva-gray-200 -translate-y-1/2" />

          {milestones.map((milestone, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;

            return (
              <button
                key={milestone._key}
                onClick={() => scrollToMilestone(i)}
                className={clsx(
                  "relative flex flex-col items-center gap-2 px-6 group transition-all",
                  "focus:outline-none",
                )}
              >
                {/* Node */}
                <div
                  className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all z-10 border-2",
                    isActive
                      ? "bg-keva-orange border-keva-orange text-white scale-110"
                      : isPast
                        ? "bg-keva-orange/20 border-keva-orange text-keva-orange"
                        : "bg-white border-keva-gray-300 text-keva-gray-400 group-hover:border-keva-orange group-hover:text-keva-orange",
                  )}
                >
                  {i + 1}
                </div>
                {/* Label */}
                <span
                  className={clsx(
                    "text-xs font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "text-keva-orange font-bold"
                      : isPast
                        ? "text-keva-gray-600"
                        : "text-keva-gray-400 group-hover:text-keva-gray-600",
                  )}
                >
                  {milestone.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestone Content Sections */}
      <div className="space-y-16">
        {milestones.map((milestone, i) => {
          const photos = milestone.gallery ?? [];
          const videos = milestone.youtubeUrls ?? [];
          const hasAny = photos.length > 0 || videos.length > 0;

          if (!hasAny) return null;

          return (
            <div
              key={milestone._key}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="scroll-mt-28"
            >
              {/* Milestone header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-keva-orange flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {i + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-keva-black">
                  {milestone.title}
                </h3>
              </div>

              {/* Videos */}
              {videos.length > 0 && (
                <div className={clsx("grid gap-4 mb-4", videos.length === 1 ? "grid-cols-1 max-w-2xl" : "grid-cols-1 sm:grid-cols-2")}>
                  {videos.map((url, vi) => {
                    const videoId = getYouTubeId(url);
                    if (!videoId) return null;
                    return (
                      <div
                        key={vi}
                        className="aspect-video rounded-xl overflow-hidden bg-keva-gray-100"
                      >
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`${projectTitle} - ${milestone.title} video ${vi + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Photos */}
              {photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((img, pi) => (
                    <div
                      key={pi}
                      className="aspect-[4/3] bg-keva-gray-100 rounded-xl relative overflow-hidden"
                    >
                      <Image
                        src={urlFor(img)}
                        alt={
                          img.caption ??
                          `${projectTitle} - ${milestone.title} photo ${pi + 1}`
                        }
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6">
                          <span className="text-white text-xs">
                            {img.caption}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
