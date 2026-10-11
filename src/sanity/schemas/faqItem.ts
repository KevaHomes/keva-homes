import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hidden",
      title: "Hide from website",
      type: "boolean",
      description: "Turn on to remove this question from the website without deleting it.",
      initialValue: false,
    }),
    orderRankField({ type: "faqItem" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "question", hidden: "hidden" },
    prepare({ title, hidden }: { title?: string; hidden?: boolean }) {
      return { title, subtitle: hidden ? "Hidden from website" : undefined };
    },
  },
});
