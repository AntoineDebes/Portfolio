"use client";
import React, {
  CSSProperties,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
} from "react";
import "./ElectricBorder.css";

type ElectricBorderProps = {
  children: React.ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
  disableOnMobile?: boolean;
};

const ElectricBorder = ({
  children,
  color = "var(--primary)",
  speed = 1,
  chaos = 1,
  thickness = 2,
  className,
  style,
  disableOnMobile = false,
}: ElectricBorderProps) => {
  const rawId = useId().replace(/[:]/g, "");
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const strokeRef = useRef<HTMLDivElement | null>(null);

  // Mobile detection and performance optimization
  const [isMobile, setIsMobile] = React.useState(false);
  const [shouldDisable, setShouldDisable] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
      setShouldDisable(mobile && disableOnMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [disableOnMobile]);

  const updateAnim = React.useCallback(() => {
    // Skip animation updates on mobile if disabled
    if (shouldDisable) return;

    const svg = svgRef.current as unknown as SVGSVGElement & {
      querySelector: Document["querySelector"];
    };
    const host = rootRef.current;
    if (!svg || !host) return;

    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }

    const width = Math.max(
      1,
      Math.round(host.clientWidth || host.getBoundingClientRect().width || 0)
    );
    const height = Math.max(
      1,
      Math.round(host.clientHeight || host.getBoundingClientRect().height || 0)
    );

    const dyAnims = Array.from(
      svg.querySelectorAll('feOffset > animate[attributeName="dy"]')
    ) as unknown as SVGAnimateElement[];
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute("values", `${height}; 0`);
      dyAnims[1].setAttribute("values", `0; -${height}`);
    }

    const dxAnims = Array.from(
      svg.querySelectorAll('feOffset > animate[attributeName="dx"]')
    ) as unknown as SVGAnimateElement[];
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute("values", `${width}; 0`);
      dxAnims[1].setAttribute("values", `0; -${width}`);
    }

    // Reduce animation complexity on mobile for better performance
    const baseDur = isMobile ? 8 : 6; // Slower animations on mobile
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach((a: SVGAnimateElement) =>
      a.setAttribute("dur", `${dur}s`)
    );

    const disp = svg.querySelector("feDisplacementMap");
    if (disp) {
      // Reduce displacement intensity on mobile
      const scale = isMobile ? 15 * (chaos || 1) : 30 * (chaos || 1);
      disp.setAttribute("scale", String(scale));
    }

    const filterEl = svg.querySelector(
      `#${CSS.escape(filterId)}`
    ) as SVGFilterElement | null;
    if (filterEl) {
      filterEl.setAttribute("x", "-200%");
      filterEl.setAttribute("y", "-200%");
      filterEl.setAttribute("width", "500%");
      filterEl.setAttribute("height", "500%");
    }

    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach((a: SVGAnimationElement) => {
        if (typeof a.beginElement === "function") {
          try {
            a.beginElement();
          } catch {
            console.warn(
              "ElectricBorder: beginElement failed, this may be due to a browser limitation."
            );
          }
        }
      });
    });
  }, [shouldDisable, isMobile, filterId, speed, chaos]);

  useEffect(() => {
    updateAnim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, chaos]);

  useLayoutEffect(() => {
    if (!rootRef.current || shouldDisable) return;

    // Throttle resize observer on mobile
    let timeoutId: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateAnim, isMobile ? 100 : 16);
    };

    const ro = new ResizeObserver(throttledUpdate);
    ro.observe(rootRef.current);
    updateAnim();

    return () => {
      ro.disconnect();
      clearTimeout(timeoutId);
    };
  }, [shouldDisable, isMobile, updateAnim]);

  const vars: CSSProperties = {
    ["--electric-border-color" as keyof CSSProperties]: color,
    ["--eb-border-width" as keyof CSSProperties]: `${thickness}px`,
  };

  // If disabled on mobile, render a simple static border
  if (shouldDisable) {
    return (
      <div
        ref={rootRef}
        className={`z-0 electric-border-static ${className ?? ""}`}
        style={{
          border: `${thickness}px solid ${color}`,
          borderRadius: "20px",
          ...style,
        }}
      >
        <div className="eb-content">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`z-0 electric-border ${className ?? ""}`}
      style={{ ...vars, ...style }}
    >
      <svg ref={svgRef} className="eb-svg" aria-hidden focusable="false">
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency={isMobile ? "0.01" : "0.02"}
              numOctaves={isMobile ? "5" : "10"}
              result="noise1"
              seed="1"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency={isMobile ? "0.01" : "0.02"}
              numOctaves={isMobile ? "5" : "10"}
              result="noise2"
              seed="1"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency={isMobile ? "0.01" : "0.02"}
              numOctaves={isMobile ? "5" : "10"}
              result="noise1"
              seed="2"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency={isMobile ? "0.01" : "0.02"}
              numOctaves={isMobile ? "5" : "10"}
              result="noise2"
              seed="2"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className="eb-layers">
        <div ref={strokeRef} className="eb-stroke" />
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>

      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
