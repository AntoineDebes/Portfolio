"use client";
import React from "react";
import Image from "next/image";

type LinkPreviewProps = {
  url?: string;
  imageSrc?: string;
  children: React.ReactNode;
};

export default function LinkPreview({
  url,
  imageSrc,
  children,
}: LinkPreviewProps) {
  return (
    <span className="relative inline-block ">
      <span className="group/title relative inline-block ">
        {children}
        {url ? (
          <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 opacity-0 -translate-x-1/2 select-none whitespace-nowrap rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/90 p-2 text-xs text-gray-700 dark:text-white/80 shadow-xl ring-1 ring-gray-200 dark:ring-white/10 transition-opacity duration-300 ease-out group-hover/title:opacity-100">
            <span className="block w-64 overflow-hidden rounded-lg">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Link preview"
                  width={512}
                  height={288}
                  className="h-36 w-full object-cover opacity-90 transition-opacity duration-300 ease-out group-hover/title:opacity-100"
                />
              ) : null}
            </span>
            <span className="mt-2 block max-w-[16rem] truncate opacity-80">
              {url}
            </span>
          </span>
        ) : null}
      </span>
    </span>
  );
}
