// Publishes ONLY the drafts staged by scripts/seo-content-drafts.mjs (listed in seo-drafts-manifest.json).
// Run at launch, right after the seo-ai-search branch is merged:
//   node --env-file=.env.local scripts/publish-seo-drafts.mjs           (dry run: lists what would publish)
//   node --env-file=.env.local scripts/publish-seo-drafts.mjs --confirm (publishes)
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";

const client = createClient({
  projectId: "nwvsvx0p",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const ids = JSON.parse(readFileSync(new URL("./seo-drafts-manifest.json", import.meta.url), "utf8"));
const confirm = process.argv.includes("--confirm");

const tx = client.transaction();
let count = 0;
for (const id of ids) {
  const draft = await client.getDocument(`drafts.${id}`);
  if (!draft) {
    console.log(`  skip  ${id} (no draft; already published or never staged)`);
    continue;
  }
  const { _rev, _createdAt, _updatedAt, ...doc } = draft;
  console.log(`  ${confirm ? "publish" : "would publish"}  ${id}  (${doc._type}: ${doc.title ?? doc.question ?? ""})`);
  tx.createOrReplace({ ...doc, _id: id });
  tx.delete(`drafts.${id}`);
  count++;
}

if (!confirm) {
  console.log(`\nDry run: ${count} drafts would be published. Re-run with --confirm to publish.`);
} else if (count) {
  const res = await tx.commit();
  console.log(`\nPublished ${count} documents (transaction ${res.transactionId}).`);
} else {
  console.log("\nNothing to publish.");
}
