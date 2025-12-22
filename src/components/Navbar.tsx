"use client";

import { useRef, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuChevronRight, LuMenu, LuX } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { Logo } from "./Logo";
import clsx from "clsx";
import { checkout } from "@/checkout";

const DialogContext = createContext<
  [open: boolean, setOpen: (open: boolean) => void]
>([false, () => {}]);

export function Navbar() {
  const button = useRef<HTMLButtonElement>(null);
  const state = useState(false);
  const [open, setOpen] = state;
  const pathname = usePathname();

  // Hide the navbar on the purchase success page
  if (pathname && pathname.startsWith("/success")) return null;

  async function handleCheckout() {
    if (button.current) button.current.disabled = true;
    await checkout();
    if (button.current) button.current.disabled = false;
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-3 md:p-6">
      <Link
        href="/"
        className="shrink-0 hover:scale-105 motion-safe:transition"
      >
        <Logo width={200} height={64} className="h-10 w-auto md:h-12" />
      </Link>
      <div className="flex gap-3 md:gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="group relative flex size-12 cursor-pointer items-center justify-center rounded bg-white/50 text-gray-900 backdrop-blur-sm hover:bg-white/60 motion-safe:transition">
            {/* subtle gradient halo on hover */}
            <span className="pointer-events-none absolute -inset-1 rounded-lg bg-gradient-to-r from-[#FF2ECF]/20 via-[#FF8F2A]/20 to-[#FFC933]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {/* refined hamburger: thin crisp white lines with a soft shadow */}
            <svg
              className="relative z-10 h-6 w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="6"
                width="16"
                height="1.8"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="4"
                y="11"
                width="16"
                height="1.8"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="4"
                y="16"
                width="16"
                height="1.8"
                rx="1"
                fill="currentColor"
              />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
            <DialogContent className="motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:slide-out-to-right motion-safe:data-[state=open]:slide-in-from-right fixed inset-y-0 right-0 z-50 h-full w-3/4 bg-white p-4 shadow-lg ease-in-out motion-safe:transition motion-safe:data-[state=closed]:duration-300 motion-safe:data-[state=open]:duration-500 sm:max-w-sm">
              <DialogTitle className="sr-only" />
              <DialogDescription className="sr-only" />
              <DialogClose className="ml-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:text-black motion-safe:transition">
                <LuX className="size-5" />
                <span className="sr-only">Close menu</span>
              </DialogClose>
              <DialogContext.Provider value={state}>
                <nav>
                  <ul>
                    <NavbarLink
                      href="#features"
                      title="Features"
                      description="Learn more about our features"
                    />
                    <NavbarLink
                      href="#switch-playground"
                      title="Switch Playground"
                      description="Choose your perfect switch"
                    />
                    <NavbarLink
                      href="#keycap-changer"
                      title="Keycaps"
                      description="Choose your perfect keycap set"
                    />
                  </ul>
                </nav>
              </DialogContext.Provider>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </header>
  );
}

type NavbarLinkProps = {
  href: string;
  title: string;
  description: string;
};

function NavbarLink({ href, title, description }: NavbarLinkProps) {
  const [, setOpen] = useContext(DialogContext);

  return (
    <li>
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className="group flex items-center rounded-xl p-4 hover:bg-linear-to-r hover:from-[#FF2ECF]/10 hover:via-[#FF8F2A]/10 hover:to-[#FFC933]/10 motion-safe:transition"
      >
        <div className="flex grow flex-col gap-1">
          <span className="text-xl font-semibold text-gray-900 group-hover:bg-linear-to-r group-hover:from-[#FF2ECF] group-hover:via-[#FF8F2A] group-hover:to-[#FFC933] group-hover:bg-clip-text group-hover:text-transparent motion-safe:transition">
            {title}
          </span>
          <span className="text-sm text-gray-500">{description}</span>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 group-hover:bg-linear-to-r group-hover:from-[#FF2ECF] group-hover:via-[#FF8F2A] group-hover:to-[#FFC933] group-hover:text-white motion-safe:transition">
          <LuChevronRight className="size-5 translate-x-px" />
        </div>
      </Link>
    </li>
  );
}
