"use client";

import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { clsx } from "clsx";
import { LuChevronRight, LuLoader } from "react-icons/lu";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { checkout } from "@/checkout";

gsap.registerPlugin(useGSAP);

/**
 * Props for `PurchaseCtaButton`.
 */
export type PurchaseCtaButtonProps =
  SliceComponentProps<Content.PurchaseCtaButtonSlice>;

/**
 * Component for "PurchaseCtaButton" Slices.
 */
const PurchaseCtaButton: FC<PurchaseCtaButtonProps> = ({ slice }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handlePurchaseClick = async () => {
    setIsPressed(true);
    await checkout();
    setIsPressed(false);
  };

  useGSAP(() => {
    if (!buttonRef.current || !textRef.current) return;
    const handleMouseMove = (event: MouseEvent) => {
      if (!buttonRef.current || !textRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = event.clientX - buttonRect.left;
      const buttonWidth = buttonRect.width;

      const normalizedX = Math.max(0, Math.min(mouseX / buttonWidth));

      const newWdth = 120 - normalizedX * 70; // 120 = thinner, 50 = wider
      const newWgth = 700 + normalizedX * 300; // 700 = lighter, 1000 = bolder

      gsap.to(textRef.current, {
        "--wdth": newWdth,
        "--wght": newWgth,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;
      gsap.to(textRef.current, {
        "--wdth": 85,
        "--wght": 850,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    buttonRef.current.addEventListener("mousemove", handleMouseMove);
    buttonRef.current.addEventListener("mouseleave", handleMouseLeave);

    gsap.set(textRef.current, {
      "--wdth": 85,
      "--wght": 850,
    });

    return () => {
      if (buttonRef.current) {
        buttonRef.current?.removeEventListener("mousemove", handleMouseMove);
        buttonRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn
        className="relative mx-auto max-w-7xl px-4 text-center"
        targetChildren
      >
        <p className="mb-6 text-base sm:text-lg font-medium text-gray-700 md:text-2xl">
          {slice.primary.eyebrow}
        </p>

        <h2 className="font-bold-slanted mb-8 scroll-pt-6 text-3xl sm:text-4xl text-gray-900 uppercase md:text-7xl lg:text-8xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <button
          ref={buttonRef}
          onClick={handlePurchaseClick}
          disabled={isPressed}
          className={clsx(
            // Reduced border thickness and increased padding on mobile for more breathing room;
            // keep large border and padding at md+ to preserve the original desktop look.
            "group relative w-full overflow-hidden rounded-full border-2 sm:border-4 md:border-12 border-gray-900 bg-linear-to-r from-[#FF2ECF] via-[#FF8F2A] to-[#FFC933] px-6 sm:px-8 md:px-20 py-3 sm:py-4 md:py-16 ease-out focus:ring-24 focus:ring-[#FF8F2A]/50 focus:outline-none motion-safe:transition-all motion-safe:duration-300",
            "hover:scale-105 hover:shadow-2xl hover:shadow-[#FF8F2A]/40",
            "active:scale-95",
            isPressed
              ? "scale-95 cursor-not-allowed opacity-80"
              : "cursor-pointer",
          )}
        >
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent ease-out group-hover:translate-x-full motion-safe:transition-transform motion-safe:duration-1000" />

          <div className="relative z-10 flex items-center justify-center gap-6 md:gap-8">
            <span
              ref={textRef}
              style={{ "--wdth": 85, "--wght": 850 } as React.CSSProperties}
              // Reduce font-size on small screens to add breathing room; keep
              // larger sizes at md+ to preserve desktop appearance.
              className="font-black-slanted text-lg sm:text-2xl tracking-wide whitespace-nowrap text-black uppercase group-hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300 md:text-5xl lg:text-6xl"
            >
              {isPressed ? (
                <span className="flex items-center gap-2 sm:gap-4 md:gap-6">
                  <LuLoader className="size-6 sm:size-10 md:size-16 animate-spin text-black" />
                  Loading...
                </span>
              ) : (
                slice.primary.purchase_cta_button_text
              )}
            </span>
            {!isPressed && (
              <div className="hidden group-hover:translate-x-2 group-hover:scale-125 motion-safe:transition-all motion-safe:duration-300 md:block">
                <LuChevronRight className="size-8 text-black md:size-16" />
              </div>
            )}
          </div>
        </button>

        <div className="mt-12 space-y-3 text-base text-gray-600 md:text-lg">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </FadeIn>
    </Bounded>
  );
};

export default PurchaseCtaButton;
