"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { telHref } from "@/lib/phone";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export default function Header({
  services,
  phone,
}: {
  services: { title: string; slug: string }[];
  phone: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    {
      href: "/services",
      label: "Services",
      children: [
        { href: "/services", label: "All Services" },
        ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.title })),
        { href: "/service-areas", label: "Areas We Serve" },
      ],
    },
    {
      href: "/projects",
      label: "Projects",
      children: [
        { href: "/projects", label: "All Projects" },
        { href: "/projects?status=featured", label: "Featured Projects" },
        { href: "/projects?status=current", label: "Current Projects" },
      ],
    },
    { href: "/faq", label: "FAQ" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-keva-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logos/keva-logo.png"
              alt="KEVA Homes"
              width={160}
              height={70}
              className="h-10 sm:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-keva-gray-700 hover:text-keva-orange transition-colors"
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all">
                    <div className="bg-white rounded-lg shadow-lg border border-keva-gray-200 py-2 min-w-[240px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-keva-gray-700 hover:bg-keva-orange-50 hover:text-keva-orange transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-keva-gray-700 hover:text-keva-orange transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={telHref(phone)}
              className="hidden sm:inline-flex items-center gap-2 bg-keva-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-keva-orange-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-keva-gray-700 hover:text-keva-orange transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={clsx(
          "lg:hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-[calc(100dvh-4rem)] overflow-y-auto" : "max-h-0 overflow-hidden"
        )}
      >
        <nav className="px-4 pb-4 space-y-1 border-t border-keva-gray-200">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href}>
                <button
                  onClick={() => setOpenMenu(openMenu === link.label ? null : link.label)}
                  aria-expanded={openMenu === link.label}
                  className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-keva-gray-700 hover:text-keva-orange transition-colors"
                >
                  {link.label}
                  <ChevronDown
                    className={clsx(
                      "w-5 h-5 transition-transform",
                      openMenu === link.label && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    "overflow-hidden transition-all",
                    openMenu === link.label ? "max-h-[40rem]" : "max-h-0"
                  )}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block pl-6 pr-3 py-2 text-sm text-keva-gray-600 hover:text-keva-orange transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-base font-medium text-keva-gray-700 hover:text-keva-orange transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={telHref(phone)}
            className="flex items-center justify-center gap-2 mt-2 bg-keva-orange text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-keva-orange-600 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
