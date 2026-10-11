"use client";

import { useEffect, useRef, useState } from "react";

// The full text is always in the page (so search engines and AI tools can read it);
// it's only clamped visually until "Read More" is clicked.
export default function TruncatedText({
  text,
  lines = 4,
  className,
  showQuotes = true,
}: {
  text: string;
  lines?: number;
  className?: string;
  showQuotes?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  // Rough first guess so the button doesn't pop in after load; corrected by measuring below.
  const [overflowing, setOverflowing] = useState(text.length > lines * 55);

  useEffect(() => {
    const el = ref.current;
    if (!el || expanded) return;
    const measure = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, lines, expanded]);

  return (
    <div>
      <p
        ref={ref}
        className={className}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: lines,
                overflow: "hidden",
              }
        }
      >
        {showQuotes && "“"}
        {text}
        {showQuotes && "”"}
      </p>
      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="text-keva-orange text-sm font-semibold mt-1 hover:underline"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
