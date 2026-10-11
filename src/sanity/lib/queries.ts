import { client } from "./client";

const projectCard = `
  _id,
  title,
  "slug": slug.current,
  location,
  season,
  status,
  isFeatured,
  coverImage
`;

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
      "categories": array::unique(categories[]->title),
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
      scope,
      projectSize,
      duration,
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
          _key,
          _type,
          url,
          caption,
          "videoUrl": video.asset->url
        },
        youtubeUrls
      },
      gallery[] {
        asset,
        caption,
        phase
      },
      "categories": array::unique(categories[]->title),
      "services": *[_type == "service" && coalesce(hidden, false) == false && references(^._id)] | order(orderRank asc) {
        title,
        "slug": slug.current
      },
      youtubeUrls
    }
  `,
    { slug },
  );
}

export async function getProjectSlugs() {
  return client.fetch(`
    *[_type == "project" && defined(slug.current)].slug.current
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
    *[_type == "service" && coalesce(hidden, false) == false && defined(slug.current)] | order(orderRank asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      icon
    }
  `);
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "service" && coalesce(hidden, false) == false && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      icon,
      headline,
      intro,
      includes,
      timeline,
      faqs[] { question, answer },
      seoTitle,
      seoDescription,
      "relatedProjects": (relatedProjects[]->{ ${projectCard} })[defined(slug)]
    }
  `,
    { slug },
  );
}

export async function getServiceSlugs() {
  return client.fetch(`
    *[_type == "service" && coalesce(hidden, false) == false && defined(slug.current)].slug.current
  `);
}

export async function getServiceAreas() {
  return client.fetch(`
    *[_type == "serviceArea" && defined(slug.current)] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      county
    }
  `);
}

export async function getServiceAreaBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "serviceArea" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      county,
      headline,
      intro,
      nearbyTowns,
      seoTitle,
      seoDescription,
      "relatedProjects": (relatedProjects[]->{ ${projectCard} })[defined(slug)]
    }
  `,
    { slug },
  );
}

export async function getFaqItems() {
  return client.fetch(`
    *[_type == "faqItem" && coalesce(hidden, false) == false] | order(orderRank asc) {
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
      legalName,
      tagline,
      phone,
      tollFree,
      email,
      address,
      foundedYear,
      hicNumber,
      insurance,
      warranty,
      openingHours[] { days, opens, closes },
      emergencyNote,
      serviceAreas,
      serviceCounties[] { county, towns },
      aboutSections,
      additionalServices,
      socialLinks
    }
  `);
}

export async function getSitemapEntries(): Promise<{
  projects: { slug: string; updatedAt: string }[];
  services: { slug: string; updatedAt: string }[];
  areas: { slug: string; updatedAt: string }[];
  latest: string | null;
}> {
  return client.fetch(`{
    "projects": *[_type == "project" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt },
    "services": *[_type == "service" && coalesce(hidden, false) == false && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt },
    "areas": *[_type == "serviceArea" && defined(slug.current)] { "slug": slug.current, "updatedAt": _updatedAt },
    "latest": *[_type in ["siteSettings", "faqItem", "review", "service", "project"]] | order(_updatedAt desc)[0]._updatedAt
  }`);
}
