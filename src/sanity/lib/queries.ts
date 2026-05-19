import { client } from "./client";

export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(orderRank asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      location,
      season,
      status,
      isFeatured,
      coverImage,
      "categories": categories[]->title,
      youtubeUrls
    }
  `);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      location,
      season,
      status,
      isFeatured,
      coverImage,
      milestones[] {
        _key,
        title,
        gallery[] {
          asset,
          caption
        },
        videos[] {
          url,
          caption
        },
        youtubeUrls
      },
      gallery[] {
        asset,
        caption,
        phase
      },
      "categories": categories[]->title,
      youtubeUrls
    }
  `,
    { slug },
  );
}

export async function getProjectSlugs() {
  return client.fetch(`
    *[_type == "project"].slug.current
  `);
}

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current
    }
  `);
}

export async function getServices() {
  return client.fetch(`
    *[_type == "service"] | order(orderRank asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      icon
    }
  `);
}

export async function getFaqItems() {
  return client.fetch(`
    *[_type == "faqItem"] | order(orderRank asc) {
      _id,
      question,
      answer
    }
  `);
}

export async function getApprovedReviews() {
  return client.fetch(`
    *[_type == "review" && status == "approved"] | order(orderRank asc) {
      _id,
      author,
      rating,
      content,
      date,
      source
    }
  `);
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      companyName,
      tagline,
      phone,
      tollFree,
      email,
      address,
      serviceAreas,
      aboutSections,
      additionalServices,
      socialLinks
    }
  `);
}
