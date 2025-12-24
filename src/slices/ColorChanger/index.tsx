"use client";

import { FC, useCallback, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

export const KEYCAP_TEXTURES = [
  {
    id: "goodwell",
    name: "TM Equinox Pro",
    path: "/goodwell_uv.png",
    previewPath: "/TM Equinox Pro_icon.png",
    knobColor: "#E44E21",
  },

  {
    id: "cherrynavy",
    name: "TM Horizon Studio",
    previewPath: "/TM_Horizon_Icon.png",
    path: "/cherrynavy_uv.png",
    knobColor: "#F06B7E",
  },
  {
    id: "kick",
    name: "TM Logic Retro",
    path: "/kick_uv.png",
    previewPath: "/TM_Logic_Retro.png",
    knobColor: "#FD0A0A",
  },
  {
    id: "candykeys",
    name: "TM Kandy Byte",
    path: "/candykeys_uv.png",
    // previewPath is used for the small selector icon (can be different from the UV texture)
    // The project's public folder currently contains `candykeys_uv.png`, use it as the preview.
    previewPath: "/candykeys_icon.png",
    knobColor: "#F38785",
  },
];

type KeycapTexture = (typeof KEYCAP_TEXTURES)[number];

/**
 * Props for `ColorChanger`.
 */
export type ColorChangerProps = SliceComponentProps<Content.ColorChangerSlice>;

/**
 * Component for "ColorChanger" Slices.
 */
const ColorChanger: FC<ColorChangerProps> = ({ slice }) => {
  const [selectedTextureId, setSelectedTextureId] = useState(
    KEYCAP_TEXTURES[0].id,
  );
  const [backgroundText, setBackroundText] = useState(KEYCAP_TEXTURES[0].name);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleTextureSelect(texture: KeycapTexture) {
    if (texture.id === selectedTextureId || isAnimating) return;

    setIsAnimating(true);
    setSelectedTextureId(texture.id);
    setBackroundText(
      KEYCAP_TEXTURES.find((t) => t.id === texture.id)?.name || "",
    );
  }

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  // Hard-coded layout offsets (final values provided)
  const headingOffsetX = 95;
  const headingOffsetY = 0;
  const descOffsetX = 95;
  const descOffsetY = 0;

  const optionsOffsetX = 160;
  const optionsOffsetY = 0;
  const optionsScale = 1;

  // optionsOffsetX has been set to 160 (hard-coded). Leva controls removed.

  // Per-selection background and SVG fill classes
  const sectionBgClass =
    selectedTextureId === "cherrynavy"
      ? "bg-gradient-to-br from-pink-500 to-blue-500 text-white"
      : selectedTextureId === "goodwell"
        ? "bg-gradient-to-br from-black to-white text-black"
        : selectedTextureId === "kick"
          ? "text-white"
          : selectedTextureId === "candykeys"
            ? "text-black"
            : "bg-linear-to-br from-[#0f172a] to-[#062f4a] text-white";

  const svgFillClass =
    selectedTextureId === "goodwell" ? "fill-black/10" : "fill-white/20";

  // Inline style for multi-stop gradient on the 'kick' selection
  const sectionStyle =
    selectedTextureId === "kick"
      ? {
          // softened/desaturated color stops to reduce neon intensity
          backgroundImage:
            "linear-gradient(45deg, #3178E0, #3E9B63, #E2C65A, #9A9A9A, #FFFFFF)",
        }
      : selectedTextureId === "candykeys"
        ? {
            // multi-stop pastel gradient for TM Kandy Byte (aesthetic order)
            backgroundImage:
              "linear-gradient(45deg, #E57A78 0%, #FBE1A1 20%, #8EECD2 40%, #87CBF9 60%, #B19BDD 80%, #FFFFFF 100%)",
          }
        : undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // Keep the same visual appearance but make the section far smaller on
      // mobile so it doesn't dominate the viewport. Preserve the large
      // desktop min-height.
      className={clsx(
        "relative flex h-auto min-h-[60vh] md:h-[80vh] md:min-h-[900px] flex-col overflow-hidden",
        sectionBgClass,
      )}
      style={sectionStyle}
      id="keycap-changer"
    >
      {/* SVG background */}
      <svg
        className="pointer-events-none absolute top-0 left-0 h-auto w-full mix-blend-overlay"
        viewBox="0 0 75 100"
      >
        <text
          fontSize={7}
          textAnchor="middle"
          dominantBaseline={"middle"}
          x="50%"
          y="50%"
          className={clsx(
            "font-black-slanted uppercase group-hover:fill-white/30 motion-safe:transition-all motion-safe:duration-700",
            svgFillClass,
          )}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <tspan key={i} x={`${(i + 1) * 10}%`} dy={i === 0 ? -50 : 6}>
              {Array.from({ length: 10 }, () => backgroundText).join(" ")}
            </tspan>
          ))}
        </text>
      </svg>
      {/* Canvas */}
      <Canvas
        // Move the camera slightly back and up to better frame the keyboard
        camera={{ position: [0, 0.6, 0.9], fov: 45, zoom: 1.3 }}
        // Larger canvas footprint on mobile so the keyboard appears bigger.
        // Remove the negative bottom margin on small screens so the canvas
        // doesn't visually overlap the controls below. Keep the larger
        // desktop negative offset so desktop visuals are unchanged.
        // Increase the canvas height on mobile so the keyboard appears
        // slightly bigger on phones (no desktop changes).
        className="mb-0 md:-mb-[10vh] grow h-[68vh] sm:h-[64vh] md:h-auto"
      >
        <Scene
          selectedTextureId={selectedTextureId}
          onAnimationComplete={handleAnimationComplete}
        />
      </Canvas>
      <Bounded
        // raise controls above the canvas so they aren't visually occluded
        // when the canvas has transforms / glows. Desktop visuals preserved.
        className="relative shrink-0 z-10"
        innerClassName="gap-8 lg:gap-20 flex flex-col lg:flex-row"
      >
        <div className="max-w-full md:max-w-md shrink-0">
          <h2
            className="font-bold-slanted mb-1 text-2xl sm:text-3xl md:text-4xl uppercase lg:mb-2 lg:text-6xl lg:whitespace-nowrap md:translate-x-24 transition-transform"
            style={{
              transition: "transform 120ms ease",
            }}
          >
            <PrismicText field={slice.primary.heading} />
          </h2>
          <div className="text-pretty text-xs sm:text-sm lg:text-lg md:translate-x-24 transition-transform">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
        {/* Make the options area responsive: remove the large inline translate on
            small screens so the grid doesn't overflow. We apply the offset only
            at md+ via Tailwind arbitrary translate classes. */}
        {/* On small screens show all options in a single horizontal row (scrollable).
            At `sm`+ we switch back to the grid layout so desktop remains unchanged. */}
        <ul className="flex gap-3 overflow-x-auto px-4 py-3 text-white sm:grid sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 md:translate-x-40 transition-transform snap-x snap-mandatory">
          {KEYCAP_TEXTURES.map((texture) => (
            <li key={texture.id} className="flex items-center justify-center shrink-0 snap-start px-1">
              {(() => {
                const isSelected = selectedTextureId === texture.id;
                const buttonStyle: React.CSSProperties = {
                  // no border here — outline is drawn by the .option-outline ::before pseudo-element
                  border: "none",
                  // round only the outer outline (the pseudo-element will use --outline-radius)
                  borderRadius: "0.75rem",
                  transition:
                    "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
                  // Glow colors now match the CTA gradient: #FF2ECF (pink), #FF8F2A (orange), #FFC933 (yellow)
                  boxShadow: isSelected
                    ? "0 8px 32px rgba(255,46,207,0.18), 0 0 24px rgba(255,143,42,0.14), 0 0 40px rgba(255,201,51,0.12)"
                    : "0 6px 18px rgba(2,6,23,0.25)",
                };

                // allow per-texture icon sizing (make 'cherrynavy' icon larger)
                const iconWrapperClass =
                  texture.id === "cherrynavy"
                    ? "relative w-[86%] h-[86%] sm:w-[92%] sm:h-[92%] md:w-[88%] md:h-[88%] lg:w-[84%] lg:h-[84%]"
                    : "relative w-[78%] h-[78%] sm:w-[80%] sm:h-[80%] md:w-[76%] md:h-[76%] lg:w-[72%] lg:h-[72%]";

                return (
                  <button
                    onClick={() => handleTextureSelect(texture)}
                    disabled={isAnimating}
                    className={clsx(
                      "option-outline relative flex h-16 w-16 flex-col items-center justify-center bg-transparent p-2 hover:scale-105 motion-safe:transition-all motion-safe:duration-300 sm:h-24 sm:w-24 md:h-36 md:w-36 lg:h-40 lg:w-40",
                      isAnimating && "cursor-not-allowed opacity-50",
                    )}
                    // set CSS vars to tune thickness and radius (thinner outline)
                    style={{
                      ...buttonStyle,
                      ["--outline-thickness" as any]: "2px",
                      ["--outline-radius" as any]: "10px",
                    }}
                  >
                    {/* inner area stays square; the outline on the button is rounded */}
                    <div className="relative z-0 mb-0 flex h-full w-full items-center justify-center overflow-hidden rounded-none bg-white/3">
                      {/* square-relative wrapper to enforce consistent icon sizing */}
                      {/* larger square wrapper so icons render bigger (responsive) */}
                      <div className="relative h-[80%] w-[80%] sm:h-[78%] sm:w-[78%] md:h-[76%] md:w-[76%] lg:h-[72%] lg:w-[72%]">
                        <Image
                          src={texture.previewPath ?? texture.path}
                          alt={texture.name}
                          fill
                          className={clsx("object-contain")}
                        />
                      </div>
                    </div>
                    {/* subtle inner rounded outline to emphasize shape */}
                    <span
                      aria-hidden
                      className={clsx(
                        "pointer-events-none absolute inset-0",
                        isSelected ? "opacity-100" : "opacity-60",
                      )}
                      style={{
                        boxShadow: isSelected
                          ? "0 0 24px rgba(255,46,207,0.18), 0 0 40px rgba(255,143,42,0.14)"
                          : "none",
                        // keep inner overlay square so only the outer border corners appear rounded
                        borderRadius: 0,
                      }}
                    />
                  </button>
                );
              })()}
            </li>
          ))}
        </ul>
        {/* Leva removed — layout offsets are hard-coded above */}
      </Bounded>
    </section>
  );
};

export default ColorChanger;
