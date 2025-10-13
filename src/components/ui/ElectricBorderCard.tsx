"use client";
import React from "react";
import LinkPreview from "@/components/ui/LinkPreview";
import ElectricBorder from "@/components/ui/ElectricBorder";

type ElectricBorderCardProps = {
  title: string;
  description?: string;
  href?: string;
  previewSrc?: string; // local static preview image path under /public
  className?: string;
  children?: React.ReactNode;
};

export default function ElectricBorderCard({
  title,
  description,
  href,
  previewSrc,
  className,
  children,
}: ElectricBorderCardProps) {
  const content = (
    <ElectricBorder
      className={`rounded-[20px] h-full ${className ?? ""}`}
      disableOnMobile={true}
    >
      <div className="rounded-[20px] bg-white dark:bg-white/10 p-6 text-gray-900 dark:text-white/90 backdrop-blur transition-colors hover:bg-gray-50 dark:hover:bg-white/20 shadow-sm dark:shadow-none h-full flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {href ? (
            <LinkPreview url={href} imageSrc={previewSrc}>
              <span className="underline decoration-gray-300 dark:decoration-white/30 underline-offset-4 hover:decoration-gray-500 dark:hover:decoration-white/50">
                {title}
              </span>
            </LinkPreview>
          ) : (
            title
          )}
        </h3>
        {description ? (
          <p className="mt-2 text-sm text-gray-600 dark:text-white/80">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </ElectricBorder>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group block no-underline h-full"
      >
        {content}
      </a>
    );
  }

  return <div className="group h-full">{content}</div>;
}
