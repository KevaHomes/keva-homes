import { defineType, defineField } from "sanity";
import { PROJECT_TYPES, REFERRAL_SOURCES } from "../../lib/contactOptions";

export default defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: { list: PROJECT_TYPES.map((o) => ({ title: o.label, value: o.value })) },
    }),
    defineField({
      name: "referralSource",
      title: "How They Heard About Us",
      type: "string",
      options: { list: REFERRAL_SOURCES.map((o) => ({ title: o.label, value: o.value })) },
    }),
    defineField({
      name: "referralDetail",
      title: "Referral Details",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
    defineField({
      name: "read",
      title: "Read",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "submittedAt",
      read: "read",
    },
    prepare({ title, subtitle, read }) {
      return {
        title: `${read ? "" : "🔴 "}${title}`,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString()
          : "No date",
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
