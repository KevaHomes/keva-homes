import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import { readdir } from "fs/promises";
import path from "path";

const client = createClient({
  projectId: "nwvsvx0p",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const IMAGE_DIR = "/Users/steven/Keva/scraped-images";

const projectImageMap = {
  "project-lyndhurst-nj-renovation": {
    cover: "Screenshot_2023-11-21_at_4.37.24_PM.png",
    gallery: ["Screenshot_2023-11-21_at_4.37.24_PM.png"],
  },
  "project-west-caldwell-renovation": {
    cover: "IMG_1789.jpeg",
    gallery: [
      "IMG_1789.jpeg",
      "IMG_1790.jpeg",
      "IMG_1791.jpeg",
      "IMG_1792.jpeg",
      "IMG_1793.jpeg",
      "IMG_1796.jpeg",
    ],
  },
  "project-bloomfield-complete-renovation": {
    cover: "1-20220725_090636.jpg",
    gallery: [
      "1-20220725_090636.jpg",
      "2-20220725_090756.jpg",
      "4-20220804_125809.jpg",
      "5-20220804_130117.jpg",
      "6-20220908_104405.jpg",
      "7-20220902_171911.jpg",
      "8-20220903_172755.jpg",
      "9-20220908_172238.jpg",
    ],
  },
  "project-east-orange-renovation": {
    cover: "Screenshot_2023-10-20_at_2.03.23___PM.png",
    gallery: ["Screenshot_2023-10-20_at_2.03.23___PM.png"],
  },
  "project-hillside-church-renovation": {
    cover: "Screenshot_2023-12-10_at_7.20.46_PM.png",
    gallery: ["Screenshot_2023-12-10_at_7.20.46_PM.png"],
  },
  "project-bloomfield-exterior-renovation-2025": {
    cover: "Screenshot_2023-12-28_at_5.09.14_PM.png",
    gallery: [
      "Screenshot_2023-12-28_at_5.09.14_PM.png",
      "3-_Backyard_After-642a5cd.webp",
      "IMG_20210508_185402-0002-996378d.jpg",
    ],
  },
  "project-bloomfield-garage-deck-driveway": {
    cover: "Screenshot_2023-10-06_at_7.31.55_PM.png",
    gallery: ["Screenshot_2023-10-06_at_7.31.55_PM.png"],
  },
};

const uploadedAssets = {};

async function uploadImage(filename) {
  if (uploadedAssets[filename]) return uploadedAssets[filename];

  const filepath = path.join(IMAGE_DIR, filename);
  console.log(`  Uploading: ${filename}`);

  const asset = await client.assets.upload(
    "image",
    createReadStream(filepath),
    { filename },
  );

  uploadedAssets[filename] = asset._id;
  return asset._id;
}

async function main() {
  console.log("Uploading images to Sanity...\n");

  for (const [projectId, images] of Object.entries(projectImageMap)) {
    console.log(`\nProject: ${projectId}`);

    const coverAssetId = await uploadImage(images.cover);

    const galleryItems = [];
    for (const img of images.gallery) {
      const assetId = await uploadImage(img);
      galleryItems.push({
        _type: "image",
        _key: img.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20),
        asset: { _type: "reference", _ref: assetId },
      });
    }

    await client
      .patch(projectId)
      .set({
        coverImage: {
          _type: "image",
          asset: { _type: "reference", _ref: coverAssetId },
        },
        gallery: galleryItems,
      })
      .commit();

    console.log(
      `  Updated with cover + ${galleryItems.length} gallery images`,
    );
  }

  console.log("\nAll images uploaded and assigned!");
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
