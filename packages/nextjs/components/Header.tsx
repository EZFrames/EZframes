"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { HelpCircle, Home, LayoutDashboard, Menu, X } from "lucide-react";
import { FaucetButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const menuLinks: HeaderMenuLink[] = [
  { label: "Home", href: "/", icon: <Home size={18} /> },
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "FAQS", href: "/faqs", icon: <HelpCircle size={18} /> },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            passHref
            className={`${
              isActive ? "bg-secondary shadow-md" : ""
            } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        );
      })}
    </>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image alt="EZ_Frames logo" className="rounded-full" fill src="/EzSvg.svg" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">EZframes</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">Best No Code Frame Builder</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-4">
            <HeaderMenuLinks />
          </nav>

          <div className="flex items-center gap-4">
            <DynamicWidget />
            <FaucetButton />
            <div className="md:hidden" ref={burgerMenuRef}>
              <button
                className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isDrawerOpen ? "block" : "hidden"} bg-white dark:bg-gray-900 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <HeaderMenuLinks />
        </div>
      </div>
    </header>
  );
};
