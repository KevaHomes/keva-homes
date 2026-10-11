import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "serviceArea",
  title: "Service Area Page",
  type: "document",
  groups: [
    { name: "page", title: "Page", default: true },
    { name: "seo", title: "Search Results" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Town",
      type: "string",
      group: "page",
      description: 'e.g. "Bloomfield, NJ"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "page",
      description: "The page address, e.g. kevahomes.com/service-areas/bloomfield-nj",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "county",
      title: "County",
      type: "string",
      group: "page",
      options: {
        list: ["Essex County", "Bergen County", "Morris County", "Passaic County", "Union County"],
      },
    }),
    defineField({
      name: "headline",
      title: "Page Headline",
      type: "string",
      group: "page",
      description: 'e.g. "General Contractor in Bloomfield, NJ"',
    }),
    defineField({
      name: "intro",
      title: "Page Introduction",
      type: "text",
      rows: 8,
      group: "page",
      description: "A few short paragraphs about KEVA's work in this town. Leave a blank line between paragraphs.",
    }),
    defineField({
      name: "nearbyTowns",
      title: "Nearby Towns",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "relatedProjects",
      title: "Projects in This Area",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "seoTitle",
      title: "Search Result Title",
      type: "string",
      group: "seo",
      description: '"| KEVA Homes" is added automatically. Aim for under 60 characters.',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Search Result Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Aim for 120–160 characters.",
      validation: (rule) => rule.max(180),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "county" },
  },
});
