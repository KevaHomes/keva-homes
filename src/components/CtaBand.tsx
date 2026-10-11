import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { telHref } from "@/lib/phone";

export default function CtaBand({
  heading = "Ready to Start Your Project?",
  text = "Contact us today for a free in-home consultation. Let's bring your vision to life.",
  phone,
}: {
  heading?: string;
  text?: string;
  phone: string;
}) {
  return (
    <section className="bg-keva-orange py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{text}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-keva-orange px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-gray-100 transition-colors"
          >
            Get a Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href={telHref(phone)}
            className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
