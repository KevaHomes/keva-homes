"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Mail, ArrowRight } from "lucide-react";
import clsx from "clsx";

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-keva-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start justify-between gap-4 w-full py-5 text-left group"
      >
        <span className="font-heading font-semibold text-keva-black group-hover:text-keva-orange transition-colors">
          {question}
        </span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 flex-shrink-0 text-keva-gray-400 transition-transform mt-0.5",
            open && "rotate-180 text-keva-orange",
          )}
        />
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-96 pb-5" : "max-h-0",
        )}
      >
        <p className="text-keva-gray-600 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqClient({
  faqItems,
}: {
  faqItems: { _id: string; question: string; answer: string }[];
}) {
  const [search, setSearch] = useState("");

  const filtered = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <section className="bg-keva-black text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            Frequently Asked{" "}
            <span className="text-keva-orange">Questions</span>
          </h1>
          <p className="text-keva-gray-400 text-lg max-w-2xl mx-auto">
            Have a question? Find answers to the most common questions about our
            services, process, and pricing below.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all text-keva-black placeholder:text-keva-gray-400"
            />
          </div>

          <div className="bg-keva-gray-50 rounded-2xl px-6 sm:px-8">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <FAQItem
                  key={item._id}
                  question={item.question}
                  answer={item.answer}
                />
              ))
            ) : (
              <div className="py-12 text-center text-keva-gray-500">
                No questions match your search. Try a different term or{" "}
                <Link href="/contact" className="text-keva-orange underline">
                  contact us directly
                </Link>
                .
              </div>
            )}
          </div>

          <div className="mt-12 bg-keva-gray-50 rounded-2xl p-8 text-center">
            <h2 className="font-heading text-xl font-bold text-keva-black mb-2">
              Still have questions?
            </h2>
            <p className="text-keva-gray-600 mb-6">
              Don&apos;t hesitate to reach out — we&apos;re happy to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:kevahomesllc@gmail.com"
                className="inline-flex items-center gap-2 text-keva-orange font-semibold"
              >
                <Mail className="w-5 h-5" />
                kevahomesllc@gmail.com
              </a>
              <span className="hidden sm:block text-keva-gray-300">|</span>
              <a
                href="tel:9734444996"
                className="inline-flex items-center gap-2 text-keva-orange font-semibold"
              >
                <Phone className="w-5 h-5" />
                (973) 444-4996
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-keva-orange py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-keva-orange px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-gray-100 transition-colors"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
