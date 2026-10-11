import { defineType, defineField, defineArrayMember } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "card", title: "Service Card", default: true },
    { name: "page", title: "Service Page" },
    { name: "seo", title: "Search Results" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "card",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "card",
      description: "The page address, e.g. kevahomes.com/services/home-additions",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "card",
      description: "One or two sentences shown on the service cards.",
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      group: "card",
      description:
        "Lucide icon name: Home, HousePlus, Bath, Layers, Building2, Fence, Hammer, Store, Wrench, Siren, Zap, Paintbrush, ClipboardCheck",
    }),
    defineField({
      name: "hidden",
      title: "Hide from website",
      type: "boolean",
      group: "card",
      description: "Turn on to remove this service from the website without deleting it.",
      initialValue: false,
    }),
    defineField({
      name: "headline",
      title: "Page Headline",
      type: "string",
      group: "page",
      description: 'The big headline at the top of the page, e.g. "Home Additions in North Jersey"',
    }),
    defineField({
      name: "intro",
      title: "Page Introduction",
      type: "text",
      rows: 8,
      group: "page",
      description: "A few short paragraphs about this service. Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "includes",
      title: "What's Included",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "timeline",
      title: "Typical Timeline",
      type: "string",
      group: "page",
      description: 'e.g. "Most kitchens take 6–8 weeks."',
    }),
    defineField({
      name: "relatedProjects",
      title: "Example Projects",
      type: "array",
      group: "page",
      description: "Projects that show this service. They appear on the service page.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "faqs",
      title: "Questions & Answers",
      type: "array",
      group: "page",
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceFaq",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Search Result Title",
      type: "string",
      group: "seo",
      description: 'Shown as the headline in Google. "| KEVA Homes" is added automatically. Aim for under 60 characters.',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Search Result Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Shown under the headline in Google. Aim for 120–160 characters.",
      validation: (rule) => rule.max(180),
    }),
    orderRankField({ type: "service" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title", hidden: "hidden" },
    prepare({ title, hidden }: { title?: string; hidden?: boolean }) {
      return { title, subtitle: hidden ? "Hidden from website" : undefined };
    },
  },
});
