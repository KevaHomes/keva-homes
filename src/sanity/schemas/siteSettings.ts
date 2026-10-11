import { defineType, defineField, defineArrayMember } from "sanity";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "business", title: "Business Info", default: true },
    { name: "areas", title: "Service Areas" },
    { name: "content", title: "Home Page" },
    { name: "links", title: "Profiles & Links" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      group: "business",
    }),
    defineField({
      name: "legalName",
      title: "Legal Name",
      type: "string",
      group: "business",
      description: 'e.g. "KEVA Homes LLC"',
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "business",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "business",
    }),
    defineField({
      name: "tollFree",
      title: "Toll Free",
      type: "string",
      group: "business",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "business",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      group: "business",
      description: 'Town only, e.g. "Bloomfield, NJ"',
    }),
    defineField({
      name: "foundedYear",
      title: "Year Founded",
      type: "number",
      group: "business",
    }),
    defineField({
      name: "hicNumber",
      title: "NJ Home Improvement Contractor Registration #",
      type: "string",
      group: "business",
      description: "Shown in the footer and contact page. Required by New Jersey on all advertising.",
    }),
    defineField({
      name: "insurance",
      title: "Insurance",
      type: "string",
      group: "business",
      description: 'e.g. "General liability, workers\' compensation and umbrella insurance"',
    }),
    defineField({
      name: "warranty",
      title: "Warranty",
      type: "text",
      rows: 2,
      group: "business",
    }),
    defineField({
      name: "openingHours",
      title: "Business Hours",
      type: "array",
      group: "business",
      description: "Days not listed show as Closed.",
      of: [
        defineArrayMember({
          type: "object",
          name: "hoursEntry",
          fields: [
            defineField({
              name: "days",
              title: "Days",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { list: DAYS },
            }),
            defineField({ name: "opens", title: "Opens (24-hour, e.g. 06:00)", type: "string" }),
            defineField({ name: "closes", title: "Closes (24-hour, e.g. 16:00)", type: "string" }),
          ],
          preview: {
            select: { days: "days", opens: "opens", closes: "closes" },
            prepare({ days, opens, closes }: { days?: string[]; opens?: string; closes?: string }) {
              return { title: (days ?? []).join(", "), subtitle: `${opens ?? "?"}–${closes ?? "?"}` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "emergencyNote",
      title: "Emergency Calls Note",
      type: "text",
      rows: 3,
      group: "business",
    }),
    defineField({
      name: "serviceAreas",
      title: "Service Areas (summary)",
      type: "string",
      group: "areas",
    }),
    defineField({
      name: "serviceCounties",
      title: "Counties & Towns",
      type: "array",
      group: "areas",
      of: [
        defineArrayMember({
          type: "object",
          name: "countyEntry",
          fields: [
            defineField({ name: "county", title: "County", type: "string" }),
            defineField({
              name: "towns",
              title: "Towns",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: {
            select: { title: "county", towns: "towns" },
            prepare({ title, towns }: { title?: string; towns?: string[] }) {
              return { title, subtitle: `${towns?.length ?? 0} towns` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "aboutSections",
      title: "About Sections",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "content", type: "text", title: "Content" },
          ],
        },
      ],
    }),
    defineField({
      name: "additionalServices",
      title: "Additional Services",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      group: "links",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "youtube", type: "url", title: "YouTube" },
        { name: "yelp", type: "url", title: "Yelp" },
        { name: "google", type: "url", title: "Google Business Profile (Maps link)" },
        { name: "houzz", type: "url", title: "Houzz" },
        { name: "twitter", type: "url", title: "X / Twitter" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
