"use client";

import { useState } from "react";

const CHAR_LIMIT = 200;

export default function TruncatedText({
  text,
  limit = CHAR_LIMIT,
  className,
}: {
  text: string;
  limit?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > limit;

  return (
    <div>
      <p className={className}>
        &ldquo;{expanded || !needsTruncation ? text : `${text.slice(0, limit).trimEnd()}...`}&rdquo;
      </p>
      {needsTruncation && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-keva-orange text-sm font-semibold mt-1 hover:underline"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
