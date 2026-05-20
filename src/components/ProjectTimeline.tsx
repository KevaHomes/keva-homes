"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";

type MilestoneImage = {
  url: string;
  fullUrl?: string;
  caption?: string;
};

type Video = {
  url: string;
  caption?: string;
};

type Milestone = {
  _key: string;
  title: string;
  gallery?: MilestoneImage[];
  videos?: Video[];
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
  onImageClick,
}: {
  milestones: Milestone[];
  projectTitle: string;
  onImageClick?: (milestoneIndex: number, imageIndex: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isStuck, setIsStuck] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stickyTriggerRef = useRef<HTMLDivElement>(null);
  const stickyEndRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barHeightRef = useRef(0);
  const isScrollingTo = useRef(false);

  const scrollActiveIntoView = useCallback((index: number) => {
    const scrollContainer = timelineRef.current;
    const buttons = scrollContainer?.querySelectorAll("button");
    const btn = buttons?.[index];
    if (btn && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const scrollLeft = scrollContainer.scrollLeft + btnRect.left - containerRect.left - containerRect.width / 2 + btnRect.width / 2;
      scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, []);

  // Measure bar height on mount (before it can become fixed)
  useEffect(() => {
    if (barRef.current) {
      barHeightRef.current = barRef.current.offsetHeight;
    }
  }, [milestones]);

  // Sticky detection: when sentinel scrolls above viewport, fix the bar
  useEffect(() => {
    const sentinel = stickyTriggerRef.current;
    if (!sentinel) return;

    const handleScroll = () => {
      const pastStart = sentinel.getBoundingClientRect().top < 0;
      const endEl = stickyEndRef.current;
      const headerHeight = window.innerWidth >= 640 ? 80 : 64;
      const beforeEnd = endEl
        ? endEl.getBoundingClientRect().top > headerHeight + barHeightRef.current
        : true;
      const shouldStick = pastStart && beforeEnd;
      setIsStuck((prev) => (prev === shouldStick ? prev : shouldStick));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveIndex(index);
              scrollActiveIntoView(index);
            }
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [milestones, scrollActiveIntoView]);

  const scrollToMilestone = (index: number) => {
    setActiveIndex(index);
    scrollActiveIntoView(index);
    isScrollingTo.current = true;
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      isScrollingTo.current = false;
    }, 800);
  };

  return (
    <div>
      {/* Sentinel marks where the bar naturally sits */}
      <div ref={stickyTriggerRef} className="h-px" />

      {/* Placeholder prevents layout jump when bar becomes fixed */}
      {isStuck && (
        <div style={{ height: barHeightRef.current }} className="mb-8" />
      )}

      {/* Timeline bar — switches between in-flow and fixed */}
      <div
        ref={barRef}
        className={clsx(
          "z-40 bg-white border-b border-keva-gray-100",
          isStuck
            ? "fixed top-16 sm:top-20 left-0 right-0 px-4 sm:px-6 lg:px-8 shadow-sm"
            : "-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8",
        )}
      >
        <div
          ref={timelineRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="relative flex items-center min-w-max px-2 py-4">
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
      </div>

      {/* Milestone Content Sections */}
      <div className="space-y-16">
        {milestones.map((milestone, i) => {
          const photos = milestone.gallery ?? [];
          const newVideos: Video[] = milestone.videos ?? [];
          const legacyVideos: Video[] = (milestone.youtubeUrls ?? []).map(
            (url) => ({ url }),
          );
          const allVideos = newVideos.length > 0 ? newVideos : legacyVideos;
          const hasAny = photos.length > 0 || allVideos.length > 0;

          if (!hasAny) return null;

          return (
            <div
              key={milestone._key}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="scroll-mt-40"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-keva-orange flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {i + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-keva-black">
                  {milestone.title}
                </h3>
              </div>

              {allVideos.length > 0 && (
                <div
                  className={clsx(
                    "grid gap-4 mb-6",
                    allVideos.length === 1
                      ? "grid-cols-1 max-w-2xl"
                      : "grid-cols-1 sm:grid-cols-2",
                  )}
                >
                  {allVideos.map((video, vi) => {
                    const videoId = getYouTubeId(video.url);
                    if (!videoId) return null;
                    return (
                      <div key={vi}>
                        <div className="aspect-video rounded-xl overflow-hidden bg-keva-gray-100">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={
                              video.caption ??
                              `${projectTitle} - ${milestone.title} video ${vi + 1}`
                            }
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                        {video.caption && (
                          <p className="mt-2 text-base text-keva-gray-600 italic">
                            {video.caption}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((img, pi) => (
                    <button
                      key={pi}
                      type="button"
                      onClick={() => onImageClick?.(i, pi)}
                      className="aspect-[4/3] bg-keva-gray-100 rounded-xl relative overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src={img.url}
                        alt={
                          img.caption ??
                          `${projectTitle} - ${milestone.title} photo ${pi + 1}`
                        }
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6">
                          <span className="text-white text-xs">
                            {img.caption}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                          <svg className="w-5 h-5 text-keva-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* End sentinel — bar detaches when this reaches the bar position */}
      <div ref={stickyEndRef} className="h-px" />
    </div>
  );
}
