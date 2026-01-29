"use client";

import Image from "next/image";
import { useState } from "react";

interface ExpandableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: React.ReactNode;
  borderColor?: "natural-sage" | "blue" | "purple";
  bgColor?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
}

export default function ExpandableImage({
  src,
  alt,
  width,
  height,
  caption,
  borderColor = "blue",
  bgColor = "blue-50",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px",
  quality = 75,
  priority = false,
}: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const borderColorClass =
    borderColor === "natural-sage"
      ? "border-natural-sage"
      : borderColor === "blue"
        ? "border-blue-200"
        : "border-purple-200";

  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 shadow-medium ${borderColorClass}`}
    >
      <div className="relative">
        {/* Image container with conditional max-height */}
        <div
          className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-none" : "max-h-[200px] md:max-h-[300px]"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto"
            sizes={sizes}
            quality={quality}
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />

          {/* Gradient overlay when collapsed */}
          {!isExpanded && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 pointer-events-none" />
          )}
        </div>

        {/* Expand/Collapse button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`absolute transition-all duration-300 ${
            isExpanded
              ? "top-4 right-4 bg-white/90 hover:bg-white"
              : "bottom-4 left-1/2 -translate-x-1/2 bg-lokka-primary hover:bg-natural-forest"
          } rounded-full px-6 py-2.5 text-sm font-medium shadow-lg backdrop-blur-sm ${
            isExpanded ? "text-lokka-primary" : "text-white"
          } flex items-center gap-2 hover:scale-105 transition-transform`}
          aria-label={isExpanded ? "Komprimer bilde" : "Utvid bilde"}
        >
          {isExpanded ? (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <span>Komprimer</span>
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span>Klikk for å utvide</span>
            </>
          )}
        </button>
      </div>

      {/* Caption */}
      {caption && <div className={`bg-${bgColor} p-4`}>{caption}</div>}
    </div>
  );
}
