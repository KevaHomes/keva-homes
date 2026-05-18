import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "season",
      title: "Season / Timeline",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Current", value: "current" },
          { title: "Completed", value: "completed" },
          { title: "Featured", value: "featured" },
        ],
      },
      initialValue: "current",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "milestones",
      title: "Project Milestones",
      description:
        "Add milestones to tell the story of this project from start to finish. Each milestone can have its own photos and videos.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          title: "Milestone",
          fields: [
            defineField({
              name: "title",
              title: "Milestone Title",
              type: "string",
              description:
                'Choose a preset or type your own (e.g. "Kitchen Remodel", "Foundation Work")',
              options: {
                list: [
                  { title: "Demolition", value: "Demolition" },
                  { title: "Construction", value: "Construction" },
                  { title: "Framing", value: "Framing" },
                  { title: "Electrical & Plumbing", value: "Electrical & Plumbing" },
                  { title: "Finishing Touches", value: "Finishing Touches" },
                  { title: "Completed", value: "Completed" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "gallery",
              title: "Photos",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: "caption",
                      type: "string",
                      title: "Caption",
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: "youtubeUrls",
              title: "YouTube Video URLs",
              type: "array",
              of: [defineArrayMember({ type: "url" })],
            }),
          ],
          preview: {
            select: {
              title: "title",
              gallery: "gallery",
              youtubeUrls: "youtubeUrls",
            },
            prepare({
              title,
              gallery,
              youtubeUrls,
            }: {
              title?: string;
              gallery?: unknown[];
              youtubeUrls?: unknown[];
            }) {
              const photos = gallery?.length ?? 0;
              const videos = youtubeUrls?.length ?? 0;
              const parts = [];
              if (photos) parts.push(`${photos} photo${photos > 1 ? "s" : ""}`);
              if (videos) parts.push(`${videos} video${videos > 1 ? "s" : ""}`);
              return {
                title: title ?? "Untitled Milestone",
                subtitle: parts.join(", ") || "No content yet",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery (Legacy)",
      description:
        "Legacy field — use Milestones above instead. Photos here will still display if no milestones exist.",
      type: "array",
      hidden: true,
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "phase",
              type: "string",
              title: "Phase",
              options: {
                list: [
                  { title: "Before", value: "before" },
                  { title: "During", value: "during" },
                  { title: "After", value: "after" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "youtubeUrls",
      title: "YouTube Video URLs (Legacy)",
      description:
        "Legacy field — use Milestones above instead. Videos here will still display if no milestones exist.",
      type: "array",
      hidden: true,
      of: [{ type: "url" }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "coverImage",
    },
  },
});
