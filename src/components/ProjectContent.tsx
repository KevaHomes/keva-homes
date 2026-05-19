"use client";

import { useState } from "react";
import ProjectTimeline from "./ProjectTimeline";
import Lightbox from "./Lightbox";

type MilestoneImage = {
  url: string;
  fullUrl?: string;
  caption?: string;
};

type Milestone = {
  _key: string;
  title: string;
  gallery?: MilestoneImage[];
  videos?: { url: string; caption?: string }[];
  youtubeUrls?: string[];
};

export default function ProjectContent({
  milestones,
  projectTitle,
}: {
  milestones: Milestone[];
  projectTitle: string;
}) {
  const [lightbox, setLightbox] = useState<{
    images: MilestoneImage[];
    index: number;
  } | null>(null);

  const handleImageClick = (milestoneIndex: number, imageIndex: number) => {
    const images = (milestones[milestoneIndex]?.gallery ?? []).map((img) => ({
      url: img.fullUrl ?? img.url,
      caption: img.caption,
    }));
    if (images.length > 0) {
      setLightbox({ images, index: imageIndex });
    }
  };

  return (
    <>
      <ProjectTimeline
        milestones={milestones}
        projectTitle={projectTitle}
        onImageClick={handleImageClick}
      />
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
