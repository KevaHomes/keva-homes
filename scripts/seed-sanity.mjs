import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "nwvsvx0p",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const categories = [
  "Back Yard", "Basements", "Bathroom", "Concrete", "Decks", "Driveway",
  "Electric", "Exterior Renovations", "Fire Pit", "Flooring/Tiles", "Framing",
  "Front Steps", "Front Yard", "HVAC", "Hardscaping", "Heated Floors",
  "Home Renovation", "House Additions", "Insulation", "Interior Renovations",
  "Irrigation", "Kitchen", "Landscaping", "Lighting", "Masonry",
  "Outdoor Kitchen", "Painting", "Pathway", "Patio", "Plumbing", "Pool",
  "Railings", "Retaining Wall", "Roofing", "Siding", "Spray Foam", "Stairs",
  "Stone", "Stucco", "Subfloor",
];

const services = [
  {
    title: "Interior Renovations",
    slug: "interior-renovations",
    description: "From minor upgrades to major overhauls, our team can help you transform the interior of your home. Whether it's a kitchen remodel, bathroom renovation, or a complete interior makeover, we have the expertise to bring your vision to life.",
    icon: "Home",
    order: 1,
  },
  {
    title: "Exterior Renovations",
    slug: "exterior-renovations",
    description: "We can help you improve the exterior of your home with our renovation services. Our team can upgrade your siding, roofing, windows, doors, and more to give your home a fresh new look.",
    icon: "Building2",
    order: 2,
  },
  {
    title: "Structural Repairs",
    slug: "structural-repairs",
    description: "Our team can help you with all types of structural repairs, including foundation, roof, and wall repairs. We use the latest techniques and materials to ensure your building is safe and secure.",
    icon: "Wrench",
    order: 3,
  },
  {
    title: "Energy Efficiency Upgrades",
    slug: "energy-efficiency",
    description: "Upgrade your building to be more energy-efficient and save money on utility bills. Our team can install insulation, energy-efficient windows, and more.",
    icon: "Zap",
    order: 4,
  },
  {
    title: "Custom Renovations",
    slug: "custom-renovations",
    description: "Do you have a unique renovation project in mind? Our Keva Homes team can help you bring your vision to life with our custom renovation services.",
    icon: "Paintbrush",
    order: 5,
  },
  {
    title: "Post-Construction",
    slug: "post-construction",
    description: "The last step in any build. This phase includes site cleanup, systems training, final inspections and obtaining the certificate of occupancy.",
    icon: "ClipboardCheck",
    order: 6,
  },
];

const projects = [
  {
    slug: "bloomfield-exterior-renovation-2025",
    title: "Complete Exterior Home Renovation",
    location: "Bloomfield, NJ",
    status: "featured",
    season: "Summer 2025",
    description: "Have a look at the before and after of our Completed Exterior Home Renovation Project in Bloomfield, NJ.",
    categories: ["Exterior Renovations", "Roofing", "Siding"],
    order: 1,
  },
  {
    slug: "lyndhurst-nj-renovation",
    title: "Complete Home Renovation",
    location: "Lyndhurst, NJ",
    status: "completed",
    season: "Winter 2023",
    description: "Have a look at the before and after of our Home Renovation Project in Lyndhurst, NJ! From Demolition to rebuilding a brand new first floor, this project is one of our proudest accomplishments.",
    categories: ["Home Renovation", "Kitchen", "Flooring/Tiles"],
    order: 2,
  },
  {
    slug: "west-caldwell-renovation",
    title: "Complete Home Renovation",
    location: "West Caldwell, NJ",
    status: "completed",
    season: "Fall 2023",
    description: "Take a look at a Home renovation complete with new roofing, a second floor and master bathroom remodel.",
    categories: ["Home Renovation", "Roofing", "Bathroom"],
    order: 3,
  },
  {
    slug: "bloomfield-garage-deck-driveway",
    title: "Garage, Deck, and Driveway Addition",
    location: "Bloomfield, NJ",
    status: "completed",
    season: "Fall 2023",
    description: "A Complete Garage, Driveway, and Deck Addition to a wonderful home in Bloomfield, NJ.",
    categories: ["Decks", "Driveway", "House Additions"],
    order: 4,
  },
  {
    slug: "bloomfield-complete-renovation",
    title: "Complete Home Renovation",
    location: "Bloomfield, NJ",
    status: "completed",
    season: "Spring 2023",
    description: "A complete house renovation and facelift. From second-story addition, driveway, masonry, patio, deck, siding, and more.",
    categories: ["Home Renovation", "House Additions", "Masonry", "Decks", "Siding"],
    order: 5,
  },
  {
    slug: "hillside-church-renovation",
    title: "Complete 10,000 Sq. Ft. Church Renovation",
    location: "Hillside, NJ",
    status: "current",
    season: "2023-2024",
    description: "Follow along with our newest project, a Complete Renovation of a 10,000 Square Foot Church in Hillside, NJ.",
    categories: ["Home Renovation", "Framing", "Roofing"],
    order: 6,
  },
  {
    slug: "east-orange-renovation",
    title: "Complete Home Renovation",
    location: "East Orange, NJ",
    status: "completed",
    season: "2023",
    description: "A complete Home Renovation and facelift in East Orange, NJ.",
    categories: ["Home Renovation", "Exterior Renovations"],
    order: 7,
  },
];

const faqItems = [
  { question: "What types of buildings do you specialize in constructing?", answer: "That depends on your project. Every project Keva Homes, LLC undertakes, requires extensive preparation and planning. We specialize in residential and commercial construction, including new builds, renovations, and restorations." },
  { question: "Do you do all the work yourself?", answer: "As a construction and repairs/restorations firm we will do some of the work ourselves and some will be done by our trusted subcontractors. We manage the entire project and ensure quality at every step." },
  { question: "Will you be the lowest bidder?", answer: "We encourage our prospective clients to compare the level of service they are getting for the investment they are making. We provide transparent, competitive pricing with no hidden costs." },
  { question: "Why should I consider Construction and Repairs/Restoration?", answer: "You owe it to yourself and your sanity to be able to count on one firm to be accountable for your entire project from start to finish. A single point of contact simplifies communication, budgeting, and scheduling." },
  { question: "I'm getting 3 to 5 estimates on my project. We're not making our choice based on the lowest price. What can you tell me?", answer: "We will be glad to cost your project as long as you have construction-ready plans and material specifications. Our estimates are thorough and transparent so you can compare value, not just price." },
  { question: "Do you charge for an estimate?", answer: "Our initial consultation in your home is free of charge. This first visit usually takes about 30 minutes to an hour depending on the scope of the project." },
  { question: "When would you be available for an in-home consultation?", answer: "Please call us anytime Monday through Friday for available appointment times at 833-KEVA-HOME or (973) 444-4996." },
  { question: "Who needs to be at our first meeting?", answer: "IMPORTANT – All parties who will be making decisions regarding your project should be in attendance at our initial consultation to ensure everyone's needs are addressed." },
  { question: "Do I need to get permits to finish a basement?", answer: "Yes, a building permit from your local township is required. Having these inspections can also provide peace of mind that the work was done safely and up to code." },
  { question: "How many inspections are required?", answer: "Amount of inspections vary according to project. Typical inspections and order of occurrence are: rough framing, rough electrical, rough plumbing, insulation, and final." },
  { question: "How much will permits cost?", answer: "Amount matters on size of basement and what is being done. Example, if you are putting in a bathroom you would need a plumbing permit as well. Costs vary by township." },
  { question: "How much will my taxes increase?", answer: "That would be according to cost of job and township tax rate. For example, if the job comes to $25,000 and the tax rate is $2.50 per $100, your taxes could increase by approximately $625/year." },
  { question: "How much of the cost that I spend would I get back in value if I sold my house?", answer: "That would depend on a couple of different factors. One would be what you had done for the project and the quality of the work. Generally, well-done renovations recoup 60-80% of their cost." },
  { question: "Do houses with unique and modernized remodels/restorations sell faster?", answer: "Yes, say if people are looking at 2 houses that are similar and one has a finished basement that is unique and modernized, the one with the finished basement will generally sell faster and for more money." },
  { question: "Where in NJ were most of your projects located?", answer: "Our primary business areas are North NJ. We serve Essex, Union, Morris, Bergen, Passaic and nearby counties." },
];

const reviews = [
  { author: "Jose T.", date: "July 20, 2020", rating: 5, content: "Vlad and his team did an amazing job renovating our home. Professional, on time, and the quality of work was outstanding. Highly recommend KEVA Homes!", source: "google", status: "approved" },
  { author: "Alex B.", date: "August 23, 2022", rating: 5, content: "Excellent work on our basement renovation. The team was professional, clean, and completed the project on schedule. Very happy with the results!", source: "google", status: "approved" },
  { author: "Dean D.", date: "October 22, 2023", rating: 5, content: "KEVA Homes transformed our outdated kitchen into a modern masterpiece. Vlad's attention to detail and commitment to quality is unmatched. Will definitely use them again!", source: "google", status: "approved" },
];

const siteSettings = {
  _type: "siteSettings",
  _id: "siteSettings",
  companyName: "KEVA Homes",
  tagline: "Building Dreams into Reality",
  phone: "(973) 444-4996",
  tollFree: "833-KEVA-HOME",
  email: "kevahomesllc@gmail.com",
  address: "Bloomfield, NJ",
  serviceAreas: "Essex, Union, Morris, Bergen, Passaic & surrounding counties",
  aboutSections: [
    {
      _key: "whoWeAre",
      title: "Who We Are",
      content: "KEVA Homes is a family owned and operated construction business. Being homeowners as well as business owners, we understand the need for a reliable and trustworthy partner in your construction endeavor. We are here to make it easy for you. Our projects include both new construction and repairs/restorations for residential and commercial. Occupied and fully operational job sites are never a problem, and we can also plan, manage, and build your project from the ground up.",
    },
    {
      _key: "whatWereAbout",
      title: "What We're About",
      content: "We offer an end-to-end client experience that includes seamless communication, budgeting, staffing, material purchasing, permitting, and all construction phases from demolition to post-construction. Call us today and bring our project management skills and extensive construction experience to your next endeavor.",
    },
    {
      _key: "clientSatisfaction",
      title: "Client Satisfaction",
      content: "Keva Homes prides ourselves in customer satisfaction. You owe it to yourself and your sanity to be able to count on one firm to be accountable for your entire project from start to finish. Our clients' satisfaction is our top priority. We work closely with them to ensure that their vision is realized and that the final product exceeds their expectations.",
    },
  ],
  additionalServices: [
    "Steps", "Decks", "Siding", "Stucco", "Driveways", "Tile", "Sidewalk",
    "Roofing", "Hardscape", "Swimming Pools", "Bathrooms", "Kitchens",
    "Basements", "Masonry", "Landscaping", "Painting", "HVAC", "Plumbing",
    "Electric", "Framing",
  ],
  socialLinks: {
    facebook: "https://www.facebook.com/kevahomesllc/",
    instagram: "https://www.instagram.com/kevahomes/",
    youtube: "https://www.youtube.com/@KevaHomes",
    yelp: "https://www.yelp.com/biz/keva-homes-bloomfield",
  },
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function seed() {
  console.log("Seeding Sanity...\n");

  // 1. Create categories
  console.log("Creating categories...");
  const categoryMap = {};
  for (const cat of categories) {
    const slug = slugify(cat);
    const doc = await client.createOrReplace({
      _type: "category",
      _id: `category-${slug}`,
      title: cat,
      slug: { _type: "slug", current: slug },
    });
    categoryMap[cat] = doc._id;
    process.stdout.write(".");
  }
  console.log(` ${categories.length} categories`);

  // 2. Create services
  console.log("Creating services...");
  for (const svc of services) {
    await client.createOrReplace({
      _type: "service",
      _id: `service-${svc.slug}`,
      title: svc.title,
      slug: { _type: "slug", current: svc.slug },
      description: svc.description,
      icon: svc.icon,
      order: svc.order,
    });
    process.stdout.write(".");
  }
  console.log(` ${services.length} services`);

  // 3. Create projects (with category references)
  console.log("Creating projects...");
  for (const proj of projects) {
    const categoryRefs = proj.categories.map((cat) => ({
      _type: "reference",
      _ref: categoryMap[cat],
      _key: slugify(cat),
    }));

    await client.createOrReplace({
      _type: "project",
      _id: `project-${proj.slug}`,
      title: proj.title,
      slug: { _type: "slug", current: proj.slug },
      description: proj.description,
      location: proj.location,
      season: proj.season,
      status: proj.status,
      categories: categoryRefs,
      order: proj.order,
    });
    process.stdout.write(".");
  }
  console.log(` ${projects.length} projects`);

  // 4. Create FAQ items
  console.log("Creating FAQ items...");
  for (let i = 0; i < faqItems.length; i++) {
    const faq = faqItems[i];
    await client.createOrReplace({
      _type: "faqItem",
      _id: `faq-${i + 1}`,
      question: faq.question,
      answer: faq.answer,
      order: i + 1,
    });
    process.stdout.write(".");
  }
  console.log(` ${faqItems.length} FAQ items`);

  // 5. Create reviews
  console.log("Creating reviews...");
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    await client.createOrReplace({
      _type: "review",
      _id: `review-${i + 1}`,
      author: review.author,
      rating: review.rating,
      content: review.content,
      date: review.date,
      source: review.source,
      status: review.status,
    });
    process.stdout.write(".");
  }
  console.log(` ${reviews.length} reviews`);

  // 6. Create site settings (singleton)
  console.log("Creating site settings...");
  await client.createOrReplace(siteSettings);
  console.log(" done");

  console.log("\nSeeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
