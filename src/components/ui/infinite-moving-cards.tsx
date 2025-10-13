"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Direction = "left" | "right";
type Speed = "slow" | "normal" | "fast";

type InfiniteMovingCardsProps = {
  items: React.ReactNode[];
  direction?: Direction;
  speed?: Speed;
  className?: string;
  gapClassName?: string; // allow custom gaps between items
};

const speedToDuration: Record<Speed, number> = {
  slow: 40,
  normal: 25,
  fast: 15,
};

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  className,
  gapClassName = "gap-8",
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    // const container = containerRef.current;
    const scroller = scrollerRef.current;
    const duration = speedToDuration[speed];

    // duplicate items for seamless loop
    const children = Array.from(scroller.children);
    children.forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      scroller.appendChild(clone);
    });

    const keyframes = [
      direction === "left"
        ? { transform: "translateX(0%)" }
        : { transform: "translateX(-50%)" },
      direction === "left"
        ? { transform: "translateX(-50%)" }
        : { transform: "translateX(0%)" },
    ];

    const anim = scroller.animate(keyframes, {
      duration: duration * 1000,
      iterations: Infinity,
      easing: "linear",
    });

    animationRef.current = anim;

    return () => anim.cancel();
  }, [direction, speed]);

  useEffect(() => {
    if (animationRef.current) {
      if (isHovered) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-x-hidden pt-[32px] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollerRef}
        className={cn("flex w-max items-center", gapClassName)}
      >
        {items.map((item, idx) => (
          <div key={idx} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
