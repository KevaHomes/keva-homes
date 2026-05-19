import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "keva-homes",
  title: "KEVA Homes",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S, context) => {
        const orderableTypes = [
          { type: "project", title: "Projects" },
          { type: "service", title: "Services" },
          { type: "faqItem", title: "FAQ Items" },
          { type: "review", title: "Reviews" },
        ];
        return S.list()
          .title("Content")
          .items([
            ...orderableTypes.map((t) =>
              orderableDocumentListDeskItem({
                type: t.type,
                title: t.title,
                S,
                context,
              }),
            ),
            ...S.documentTypeListItems().filter(
              (item) =>
                !orderableTypes.some((t) => t.type === item.getId()),
            ),
          ]);
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
