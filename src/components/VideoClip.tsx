"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function VideoClip({
  src,
  caption,
  title,
}: {
  src: string;
  caption?: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {});
  };

  return (
    <div>
      <div className="aspect-video rounded-xl overflow-hidden bg-black relative">
        {/* #t=0.001 nudges mobile Safari into showing the first frame as a preview */}
        <video
          ref={videoRef}
          src={`${src}#t=0.001`}
          preload="metadata"
          playsInline
          controls={started}
          title={title}
          className="w-full h-full object-contain"
        />
        {!started && (
          <button
            type="button"
            onClick={handleStart}
            aria-label={`Play video: ${caption ?? title}`}
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          >
            <span className="w-16 h-16 rounded-full bg-keva-orange group-hover:scale-110 transition-transform flex items-center justify-center shadow-lg">
              <Play className="w-7 h-7 text-white fill-current ml-1" />
            </span>
          </button>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-base text-keva-gray-600 italic">{caption}</p>
      )}
    </div>
  );
}
