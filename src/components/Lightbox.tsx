"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxImage = {
  url: string;
  caption?: string;
};

export default function Lightbox({
  images,
  initialIndex = 0,
  onClose,
}: {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      if (newIndex < 0 || newIndex >= images.length) return;
      setDirection(dir);
      setIndex(newIndex);
    },
    [images.length],
  );

  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80) {
      if (info.offset.x > 0) prev();
      else next();
    }
    if (info.offset.y > 120) {
      onClose();
    }
  };

  const current = images[index];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 z-10 text-white/70 text-sm font-medium">
            {index + 1} / {images.length}
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            {index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {index < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </>
        )}

        {/* Image */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90vw] h-[70vh] sm:w-[80vw] sm:h-[75vh] max-w-5xl cursor-grab active:cursor-grabbing touch-none"
          >
            <Image
              src={current.url}
              alt={current.caption ?? ""}
              fill
              className="object-contain select-none pointer-events-none"
              sizes="90vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        {current.caption && (
          <div className="mt-4 px-4 text-center">
            <p className="text-white/80 text-sm max-w-lg">{current.caption}</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
