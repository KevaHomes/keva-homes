import { defineType, defineField, defineArrayMember } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

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
      name: "scope",
      title: "What We Did",
      type: "array",
      description:
        'A short list of the work on this job, e.g. "Gutted and rebuilt the first floor", "New kitchen with quartz countertops".',
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "projectSize",
      title: "Project Size",
      type: "string",
      description: 'Optional, e.g. "1,800 sq ft"',
    }),
    defineField({
      name: "duration",
      title: "How Long It Took",
      type: "string",
      description: 'Optional, e.g. "About 4 months"',
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
        ],
      },
      initialValue: "current",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Project",
      description: "Show this project in the Featured Projects section on the home page",
      type: "boolean",
      initialValue: false,
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
                'Type any name — e.g. "Demolition", "Framing", "Kitchen Remodel", "Foundation Work", "Electrical & Plumbing", "Finishing Touches", "Completed"',
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
              name: "videos",
              title: "Videos",
              description:
                "Add a YouTube link or upload a short video clip straight from your phone or computer.",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "video",
                  title: "YouTube Video",
                  fields: [
                    defineField({
                      name: "url",
                      title: "YouTube URL",
                      type: "url",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "caption",
                      title: "Caption",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: { title: "caption", subtitle: "url" },
                    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
                      return {
                        title: title || subtitle || "Untitled video",
                        subtitle: title ? subtitle : undefined,
                      };
                    },
                  },
                }),
                defineArrayMember({
                  type: "object",
                  name: "videoFile",
                  title: "Video Upload",
                  fields: [
                    defineField({
                      name: "video",
                      title: "Video File",
                      type: "file",
                      description:
                        "MP4 or iPhone (MOV) videos work best. Short clips under ~100MB are ideal so they load quickly for visitors.",
                      options: { accept: "video/*" },
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "caption",
                      title: "Caption",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "caption",
                      fileName: "video.asset.originalFilename",
                    },
                    prepare({ title, fileName }: { title?: string; fileName?: string }) {
                      return {
                        title: title || fileName || "Uploaded video",
                        subtitle: title && fileName ? fileName : "Video upload",
                      };
                    },
                  },
                }),
              ],
            }),
            // Legacy field — kept for backward compat with milestones that used plain URL arrays
            defineField({
              name: "youtubeUrls",
              title: "YouTube URLs (Legacy)",
              type: "array",
              hidden: true,
              of: [defineArrayMember({ type: "url" })],
            }),
          ],
          preview: {
            select: {
              title: "title",
              gallery: "gallery",
              videos: "videos",
              youtubeUrls: "youtubeUrls",
            },
            prepare({
              title,
              gallery,
              videos,
              youtubeUrls,
            }: {
              title?: string;
              gallery?: unknown[];
              videos?: unknown[];
              youtubeUrls?: unknown[];
            }) {
              const photos = gallery?.length ?? 0;
              const videoCount = (videos?.length ?? 0) || (youtubeUrls?.length ?? 0);
              const parts = [];
              if (photos) parts.push(`${photos} photo${photos > 1 ? "s" : ""}`);
              if (videoCount) parts.push(`${videoCount} video${videoCount > 1 ? "s" : ""}`);
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
      validation: (rule) => rule.unique(),
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
    orderRankField({ type: "project" }),
  ],
  orderings: [
    orderRankOrdering,
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "coverImage",
    },
  },
});
