"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, Siren } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { telHref } from "@/lib/phone";
import { CURRENT_PROJECT_TYPES, REFERRAL_SOURCES } from "@/lib/contactOptions";

const REFERRAL_DETAIL_PROMPTS: Record<string, string> = {
  "ai-assistant": "Which one? (ChatGPT, Gemini, Perplexity...)",
  referral: "Who can we thank?",
  other: "Where did you hear about us?",
};

export type ContactInfo = {
  phone: string;
  tollFree: string;
  email: string;
  city: string;
  areas: string;
  hours: { days: string; hours: string }[];
  emergencyNote: string;
  hicNumber: string;
  insurance: string;
};

export default function ContactClient({ info }: { info: ContactInfo }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    referralSource: "",
    referralDetail: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitContactForm(formState);
    setSubmitting(false);
    if (result.success) setSubmitted(true);
  }

  return (
    <>
      <section className="bg-keva-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-black mb-3">
            Contact <span className="text-keva-orange">Us</span>
          </h1>
          <p className="text-keva-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Send us a message or call us for a quote. Use our contact form to
            tell us more about your project.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-bold text-keva-black mb-6">
                Get a Quote
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-green-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-700">
                    Thank you for reaching out. We&apos;ll get back to you
                    shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-keva-gray-700 mb-1"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-keva-gray-700 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-keva-gray-700 mb-1"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium text-keva-gray-700 mb-1"
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        value={formState.projectType}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            projectType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select a project type...</option>
                        {CURRENT_PROJECT_TYPES.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="referralSource"
                        className="block text-sm font-medium text-keva-gray-700 mb-1"
                      >
                        How did you hear about us?
                      </label>
                      <select
                        id="referralSource"
                        value={formState.referralSource}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            referralSource: e.target.value,
                            referralDetail: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select one (optional)...</option>
                        {REFERRAL_SOURCES.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {REFERRAL_DETAIL_PROMPTS[formState.referralSource] && (
                    <div>
                      <label
                        htmlFor="referralDetail"
                        className="block text-sm font-medium text-keva-gray-700 mb-1"
                      >
                        {REFERRAL_DETAIL_PROMPTS[formState.referralSource]}
                      </label>
                      <input
                        type="text"
                        id="referralDetail"
                        value={formState.referralDetail}
                        onChange={(e) =>
                          setFormState({ ...formState, referralDetail: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all"
                      />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-keva-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 rounded-xl border border-keva-gray-300 focus:border-keva-orange focus:ring-2 focus:ring-keva-orange/20 outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-keva-orange text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-keva-orange-600 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-keva-black mb-6">
                Drop Us a Line
              </h2>
              <p className="text-keva-gray-600 mb-8 leading-relaxed">
                Send us a message, or call us for a quote. We&apos;re here to
                help you with your next construction project.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-keva-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-keva-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-keva-black">Phone</h3>
                    <a
                      href={telHref(info.phone)}
                      className="text-keva-gray-600 hover:text-keva-orange transition-colors"
                    >
                      {info.phone}
                    </a>
                    <br />
                    <a
                      href={telHref(info.tollFree)}
                      className="text-keva-gray-600 hover:text-keva-orange transition-colors text-sm"
                    >
                      {info.tollFree}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-keva-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-keva-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-keva-black">Email</h3>
                    <a
                      href={`mailto:${info.email}`}
                      className="text-keva-gray-600 hover:text-keva-orange transition-colors"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-keva-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-keva-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-keva-black">Location</h3>
                    <p className="text-keva-gray-600">{info.city}</p>
                    <p className="text-keva-gray-500 text-sm mt-1">
                      Serving {info.areas}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-keva-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-keva-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-keva-black">Hours</h3>
                    {info.hours.map((h) => (
                      <p key={h.days} className="text-keva-gray-600">
                        {h.days}: {h.hours}
                      </p>
                    ))}
                    <p className="text-keva-gray-500 text-sm">
                      Call for appointment availability
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-keva-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Siren className="w-6 h-6 text-keva-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-keva-black">Emergencies</h3>
                    <p className="text-keva-gray-600 text-sm leading-relaxed">
                      {info.emergencyNote}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-keva-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-keva-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-keva-black">Licensed &amp; Insured</h3>
                    <p className="text-keva-gray-600 text-sm">
                      NJ Home Improvement Contractor Reg. #{info.hicNumber}
                    </p>
                    <p className="text-keva-gray-500 text-sm mt-1">{info.insurance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
