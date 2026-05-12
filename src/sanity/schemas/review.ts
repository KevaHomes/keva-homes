import { defineType, defineField } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "content",
      title: "Review Text",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "Website", value: "website" },
          { title: "Yelp", value: "yelp" },
        ],
      },
      initialValue: "website",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "pending",
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "status",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `${subtitle === "pending" ? "⏳" : subtitle === "approved" ? "✅" : "❌"} ${subtitle}`,
      };
    },
  },
});
