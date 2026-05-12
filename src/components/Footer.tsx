import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/109556268138624",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kevahomes",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@KevaHomes",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Yelp",
    href: "https://www.yelp.com/biz/TgNJywvkz6maUagVmAUhww",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 011.596-.206 7.15 7.15 0 012.182 3.108c.27.79-.42 1.357-.512 1.603zm-7.4 5.17l1.107-5.063c.21-.96 1.532-1.1 1.96-.205l2.167 4.543a1.072 1.072 0 01-.57 1.517 7.15 7.15 0 01-3.753.614c-.832-.1-1.107-.684-1.107-.684l.196-2.722zm-2.853-2.282l-4.47-2.607c-.86-.502-.536-1.87.49-2.066l5.255-.997c.96-.182 1.548 1.025.87 1.796l-2.785 3.077c-.293.323-.84.472-1.36.797zm-.72-7.16L12.34 3.2c.63-.718 1.833-.17 1.818.83l-.077 5.125c-.015.975-1.29 1.37-1.886.584l-3.065-4.03c-.243-.32-.243-.823 0-1.387zM5.7 13.263l5.14-.93c.962-.174 1.417 1.132.672 1.928l-3.83 4.088c-.455.486-1.27.296-1.55-.362a7.15 7.15 0 01-.422-3.77c.075-.535.434-.737.99-.954z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/faq", label: "FAQ" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-keva-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div>
            <Image
              src="/images/logos/keva-black-logo.webp"
              alt="KEVA Homes"
              width={200}
              height={85}
              className="h-16 w-auto mb-4"
            />
            <p className="text-keva-gray-400 text-sm leading-relaxed mb-6">
              Building Dreams into Reality. Family owned and operated construction
              business serving North New Jersey.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-keva-gray-400 hover:bg-keva-orange hover:text-white transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-keva-gray-400 hover:text-keva-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-heading text-lg font-bold mt-6 mb-3">Service Areas</h3>
            <p className="text-keva-gray-400 text-sm leading-relaxed">
              Essex, Union, Morris, Bergen, Passaic &amp; surrounding counties in North NJ
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:9734444996"
                  className="flex items-center gap-3 text-keva-gray-400 hover:text-keva-orange transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 text-keva-orange" />
                  <div>
                    <span className="block text-sm">(973) 444-4996</span>
                    <span className="block text-xs text-keva-gray-500">833-KEVA-HOME</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kevahomesllc@gmail.com"
                  className="flex items-center gap-3 text-keva-gray-400 hover:text-keva-orange transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 text-keva-orange" />
                  kevahomesllc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-keva-gray-400 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0 text-keva-orange" />
                Bloomfield, NJ
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-keva-gray-500 text-xs">
            &copy; {new Date().getFullYear()} KEVA Homes LLC. All Rights Reserved.
          </p>
          <p className="text-keva-gray-600 text-xs">
            Bloomfield, NJ &middot; Licensed &amp; Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
