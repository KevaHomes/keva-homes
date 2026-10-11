// Stages the SEO / AI-search content as Sanity DRAFTS so it can be reviewed on the preview
// deployment without changing the live site. Publish later with scripts/publish-seo-drafts.mjs.
//
// Run: node --env-file=.env.local scripts/seo-content-drafts.mjs
import { createClient } from "@sanity/client";
import { writeFileSync } from "node:fs";

const client = createClient({
  projectId: "nwvsvx0p",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const P = {
  dream: "2e00a443-eeb2-4d7a-a4b6-8984bd0cb2b0",
  morristown: "8502562f-031a-4022-b269-074d1ad7469c",
  whippany: "053c0c93-bbdb-438d-899c-0e418324fa34",
  bloomfieldExterior: "project-bloomfield-exterior-renovation-2025",
  lyndhurst: "project-lyndhurst-nj-renovation",
  bloomfieldGarage: "project-bloomfield-garage-deck-driveway",
  westCaldwell: "project-west-caldwell-renovation",
  bloomfieldComplete: "project-bloomfield-complete-renovation",
  eastOrange: "project-east-orange-renovation",
  hillside: "project-hillside-church-renovation",
};

const refs = (ids) => ids.map((id) => ({ _type: "reference", _ref: id, _key: id.replace(/[^a-z0-9]/gi, "").slice(-16) }));
const faqs = (items) => items.map(([question, answer], i) => ({ _type: "serviceFaq", _key: `faq${i}`, question, answer }));
const rank = (i) => `0|1${i.toString(36).padStart(2, "0")}000:`;

const PERMIT_FAQ = [
  "Who pulls the permits?",
  "KEVA Homes files the permits for you. The town's permit fees are paid by the property owner.",
];

// ---------------------------------------------------------------- services (in display order)
const services = [
  {
    id: "service-whole-house-renovations",
    title: "Whole-House Renovations",
    slug: "whole-house-renovations",
    icon: "Home",
    description:
      "Complete, top-to-bottom renovations managed by one team, from demolition and permits to the final walkthrough.",
    headline: "Whole-House Renovations in North Jersey",
    seoTitle: "Whole-House Renovations in North Jersey",
    seoDescription:
      "Complete home renovations across Essex, Bergen, Morris, Passaic and Union counties. One family-owned team from permits to final inspection. Free consultation.",
    intro: `A whole-house renovation touches almost every part of a home: the structure, the systems, the finishes and often the exterior too. KEVA Homes manages the entire job with one accountable team, so you're not juggling separate contractors for every trade.

We've completed whole-house renovations in Bloomfield, Lyndhurst, West Caldwell, East Orange and Whippany, from rebuilding a full first floor to complete interior and exterior transformations. We handle the planning, permits, trades and inspections each project needs, and we're used to working in occupied homes.`,
    includes: [
      "Planning, budgeting and scheduling",
      "Permits filed by KEVA",
      "Demolition and framing",
      "Kitchens, bathrooms and flooring",
      "Electrical, plumbing and HVAC",
      "Insulation, drywall and painting",
      "Roofing, siding, windows and doors",
      "Final inspections and cleanup",
    ],
    timeline: "Most whole-house renovations take 2–5 months, depending on the size of the home and the work involved.",
    faqs: faqs([
      [
        "How long does a whole-house renovation take?",
        "Most whole-house renovations take 2–5 months, depending on the size of the home and the scope of work.",
      ],
      [
        "Can we live in the house during the renovation?",
        "Often, yes. Occupied homes are never a problem for our team. For some jobs, like a full gut renovation, it may be easier to stay elsewhere for part of the project. We'll talk it through at your consultation.",
      ],
      PERMIT_FAQ,
    ]),
    related: [P.bloomfieldComplete, P.lyndhurst, P.whippany, P.westCaldwell, P.eastOrange],
  },
  {
    id: "service-home-additions",
    title: "Home Additions",
    slug: "home-additions",
    icon: "HousePlus",
    description:
      "Second-story, over-garage and garage additions that add space without leaving the home you love.",
    headline: "Home Additions in North Jersey",
    seoTitle: "Home Additions & Second-Story Additions in North Jersey",
    seoDescription:
      "Second-story, over-garage and garage additions across North Jersey. KEVA Homes handles permits, framing, roofing and finishes. Free in-home consultation.",
    intro: `Need more space without moving? KEVA Homes builds additions throughout North Jersey, including second-story additions, master suites above garages, and garage, deck and driveway additions.

We manage the job from permits and foundations through framing, roofing, windows, mechanical trades, interior finishes and the final inspection. In Morristown, we're adding a master suite with a full bathroom, laundry room and walk-in closet above a full-size garage.`,
    includes: [
      "Second-story additions",
      "Master suites and rooms above garages",
      "Garage additions",
      "Excavation, foundations and concrete",
      "Framing, roofing, windows and siding",
      "Electrical, plumbing and HVAC",
      "Bathrooms, closets and interior finishes",
      "Permits filed by KEVA",
    ],
    timeline: "Most additions take 3–6 months, depending on size.",
    faqs: faqs([
      ["How long does a home addition take?", "Most additions take 3–6 months, depending on the size of the addition."],
      [
        "Can you build an addition above my garage?",
        "Yes. Building above an existing garage is a common way to add a bedroom or master suite. We're currently building a master suite with a full bathroom, laundry room and walk-in closet above a garage in Morristown.",
      ],
      [
        "Do I need plans before you can price an addition?",
        "We'll be glad to price your project once you have construction-ready plans and material specifications. Your free consultation is a good place to start the conversation.",
      ],
      PERMIT_FAQ,
    ]),
    related: [P.morristown, P.bloomfieldGarage, P.bloomfieldComplete],
  },
  {
    id: "service-interior-renovations",
    title: "Kitchen & Bathroom Remodeling",
    slug: "kitchen-bathroom-remodeling",
    icon: "Bath",
    description:
      "Kitchen and bathroom remodels, from updated finishes to full gut renovations with new layouts.",
    headline: "Kitchen & Bathroom Remodeling in North Jersey",
    seoTitle: "Kitchen & Bathroom Remodeling in North Jersey",
    seoDescription:
      "Kitchen and bathroom remodels across Essex, Bergen, Morris, Passaic and Union counties. Kitchens in 6–8 weeks, bathrooms in 2–4. Free in-home consultation.",
    intro: `Kitchens and bathrooms are where most homeowners want the biggest change, and where good planning matters most. KEVA Homes handles the whole remodel: demolition, plumbing and electrical, framing, tile, flooring, cabinets, countertops and fixtures.

We remodel kitchens and bathrooms on their own or as part of a larger renovation, like the first floor we rebuilt in Lyndhurst and the master bathroom remodel in West Caldwell. Customers have trusted us with everything from a single new bathroom to two bathroom renovations at once.`,
    includes: [
      "Full kitchen remodels and new layouts",
      "Bathroom remodels, including master baths",
      "Tile, flooring and heated floors",
      "Cabinets, countertops and fixtures",
      "Plumbing and electrical updates",
      "Permits filed by KEVA",
    ],
    timeline: "Most kitchens take 6–8 weeks. Most bathrooms take 2–4 weeks.",
    faqs: faqs([
      ["How long does a kitchen remodel take?", "Most kitchen remodels take 6–8 weeks."],
      ["How long does a bathroom remodel take?", "Most bathroom remodels take 2–4 weeks."],
      [
        "Do I need a permit to remodel a kitchen or bathroom?",
        "If the work changes plumbing, electrical or structure, your town will usually require a permit. KEVA Homes files the permits for you, and the homeowner pays the town's fees.",
      ],
    ]),
    related: [P.lyndhurst, P.westCaldwell, P.whippany, P.bloomfieldComplete],
  },
  {
    id: "service-new-home-construction",
    title: "New Home Construction",
    slug: "new-home-construction",
    icon: "Hammer",
    description:
      "Custom homes built from the ground up, managed by one team from site work to the final inspection.",
    headline: "New Home Construction in North Jersey",
    seoTitle: "New Home Construction in North Jersey",
    seoDescription:
      "Custom homes built from the ground up in North Jersey, including a 10,000 sq. ft. home with an indoor pool in Woodcliff Lake. Most builds take 6–9 months.",
    intro: `KEVA Homes plans, manages and builds new homes from the ground up. We coordinate every phase, from excavation and foundations to framing, weatherproofing, mechanical systems, finishes and the final inspection.

Our current build is a 10,000-square-foot home with an indoor pool in Woodcliff Lake. You can follow its progress, from the first framing through weatherproofing and the mechanical, electrical and plumbing phase, on the project page.`,
    includes: [
      "Site work, excavation and foundations",
      "Framing and roofing",
      "Weatherproofing, windows and siding",
      "Electrical, plumbing and HVAC",
      "Kitchens, bathrooms and interior finishes",
      "Pools, decks and outdoor spaces",
      "Permits filed by KEVA",
    ],
    timeline: "Most new homes take 6–9 months to build.",
    faqs: faqs([
      ["How long does it take to build a new home?", "Most new homes take 6–9 months to build, depending on size and complexity."],
      PERMIT_FAQ,
    ]),
    related: [P.dream],
  },
  {
    id: "service-exterior-renovations",
    title: "Roofing, Siding & Exteriors",
    slug: "roofing-siding-exteriors",
    icon: "Building2",
    description: "New roofs, siding, windows, doors, front steps and complete exterior makeovers.",
    headline: "Roofing, Siding & Exterior Renovations in North Jersey",
    seoTitle: "Roofing, Siding & Exterior Renovations in North Jersey",
    seoDescription:
      "Roof replacement in 1–2 days and new siding in about a week, plus windows, doors, front steps and stucco across North Jersey. Free in-home consultation.",
    intro: `Your home's exterior protects everything inside it, and it's the first thing people see. KEVA Homes replaces roofs and siding, installs windows and doors, rebuilds front steps and handles complete exterior makeovers. We also install insulation and energy-efficient windows to help lower utility bills.

In Bloomfield, we completed a full exterior renovation in 2025, from rebuilding the front steps to new roofing, siding, paint and hardscaping. Roofing and siding products come with the manufacturer's warranty, on top of our one-year workmanship warranty.`,
    includes: [
      "Roof replacement",
      "Siding installation",
      "Windows and doors",
      "Front steps, railings and masonry",
      "Stucco and stone",
      "Insulation and energy-efficient upgrades",
      "Exterior painting",
    ],
    timeline: "Most roofs take 1–2 days. Most siding jobs take about a week.",
    faqs: faqs([
      ["How long does a new roof take?", "Most roof replacements take 1–2 days. Most siding jobs take about a week."],
      [
        "Is there a warranty on roofing and siding?",
        "Yes. Roofing shingles and siding come with the manufacturer's warranty, and our workmanship is covered for one year.",
      ],
    ]),
    related: [P.bloomfieldExterior, P.westCaldwell, P.whippany, P.bloomfieldComplete],
  },
  {
    id: "service-decks-patios-hardscaping",
    title: "Decks, Patios & Hardscaping",
    slug: "decks-patios-hardscaping",
    icon: "Fence",
    description: "Decks, patios, walkways, driveways and retaining walls that make the most of your outdoor space.",
    headline: "Decks, Patios & Hardscaping in North Jersey",
    seoTitle: "Decks, Patios & Hardscaping in North Jersey",
    seoDescription:
      "New decks, patios, walkways, driveways and retaining walls across North Jersey. Most hardscaping projects take 1–3 weeks. Free consultation with KEVA Homes.",
    intro: `KEVA Homes builds the outdoor spaces that make a house feel complete: decks, patios, walkways, driveways, retaining walls and front steps.

In Bloomfield, we added a garage, deck and new driveway to one home, and finished another with new hardscaping as part of a full exterior renovation. Larger projects have included outdoor kitchens and pools.`,
    includes: [
      "Decks and railings",
      "Patios and walkways",
      "Driveways and concrete",
      "Retaining walls and stone",
      "Front steps",
      "Outdoor kitchens and fire pits",
      "Irrigation and landscaping",
    ],
    timeline: "Most hardscaping projects take 1–3 weeks.",
    faqs: faqs([
      ["How long does a patio or hardscaping project take?", "Most hardscaping projects take 1–3 weeks."],
      [
        "Do I need a permit for a deck?",
        "Usually, yes. Most towns require a permit for a new deck. KEVA Homes files it for you, and the homeowner pays the town's fee.",
      ],
    ]),
    related: [P.bloomfieldGarage, P.bloomfieldExterior, P.bloomfieldComplete],
  },
  {
    id: "service-basement-finishing",
    title: "Basement Finishing",
    slug: "basement-finishing",
    icon: "Layers",
    description:
      "Turn an unfinished basement into living space, with framing, insulation, flooring, lighting and bathrooms.",
    headline: "Basement Finishing in North Jersey",
    seoTitle: "Basement Finishing in North Jersey",
    seoDescription:
      "Finished basements with bathrooms, flooring, lighting and insulation across North Jersey. Permits filed for you. Free in-home consultation from KEVA Homes.",
    intro: `A finished basement is one of the most practical ways to add living space to your home. KEVA Homes handles the framing, insulation, electrical, plumbing, flooring and finishes, plus the permits your town requires.

Basements have been part of several of our larger renovations, including projects in Bloomfield, Lyndhurst and Whippany.`,
    includes: [
      "Framing and insulation",
      "Electrical and lighting",
      "Bathrooms and plumbing",
      "Flooring and subfloors",
      "Drywall and painting",
      "Permits filed by KEVA",
    ],
    faqs: faqs([
      [
        "Do I need a permit to finish a basement?",
        "Yes. Finishing a basement requires a building permit from your town. Inspections also give you peace of mind that the work was done safely and up to code.",
      ],
      [
        "Can you add a bathroom in the basement?",
        "Yes. A basement bathroom also needs a plumbing permit, which we file along with the rest of your permits.",
      ],
    ]),
    related: [P.bloomfieldComplete, P.lyndhurst, P.whippany],
  },
  {
    id: "service-commercial-renovations",
    title: "Commercial Renovations",
    slug: "commercial-renovations",
    icon: "Store",
    description: "Renovations for commercial and institutional buildings, including occupied and operating sites.",
    headline: "Commercial Renovations in North Jersey",
    seoTitle: "Commercial Renovations in North Jersey",
    seoDescription:
      "Commercial and institutional renovations in North Jersey, including a 10,000 sq. ft. church renovation in Hillside. Occupied sites welcome. Free consultation.",
    intro: `KEVA Homes renovates commercial and institutional spaces as well as homes. Occupied and fully operating job sites are never a problem for our team.

In Hillside, we renovated a 10,000-square-foot church, including demolition, framing, a new roof, insulation, and new electrical, plumbing and HVAC work.`,
    includes: [
      "Interior renovations",
      "Roofing and exterior work",
      "Framing, insulation and drywall",
      "Electrical, plumbing and HVAC",
      "Work on occupied, operating sites",
      "Permits filed by KEVA",
    ],
    faqs: faqs([
      ["Can you work while our building stays open?", "Yes. Occupied and fully operating job sites are never a problem for our team."],
      PERMIT_FAQ,
    ]),
    related: [P.hillside],
  },
  {
    id: "service-structural-repairs",
    title: "Structural Repairs",
    slug: "structural-repairs",
    icon: "Wrench",
    description: "Foundation, framing, roof and wall repairs that keep your home safe and sound.",
    headline: "Structural Repairs in North Jersey",
    seoTitle: "Structural Repairs in North Jersey",
    seoDescription:
      "Foundation, framing, roof and wall repairs across North Jersey, with permits filed for you. Family-owned, licensed and insured. Free in-home consultation.",
    intro: `Structural problems don't fix themselves. KEVA Homes repairs foundations, framing, roofs and walls, and files the permits your town requires so the work is inspected and done to code.

Many of our renovations, like the first-floor rebuild in Lyndhurst and the full tear-down in Whippany, started with structural work before any finishes went in.`,
    includes: [
      "Foundation repairs",
      "Framing and subfloor repairs",
      "Roof structure repairs",
      "Wall repairs",
      "Permits filed by KEVA",
    ],
    faqs: faqs([
      [
        "Do structural repairs need a permit?",
        "Usually, yes. Your town decides what needs a permit. KEVA Homes files the permits for you, and the homeowner pays the town's fees.",
      ],
    ]),
    related: [P.lyndhurst, P.whippany],
  },
  {
    id: "service-emergency-repairs",
    title: "Emergency Repairs",
    slug: "emergency-repairs",
    icon: "Siren",
    description:
      "Call 833-KEVA-HOME at any hour for urgent repairs. Leave a voicemail and we'll call you back as soon as possible.",
    headline: "Emergency Repairs in North Jersey",
    seoTitle: "Emergency Construction Repairs in North Jersey",
    seoDescription:
      "Need an urgent repair? Call 833-KEVA-HOME at any hour. Family-owned, licensed and insured contractor serving Essex, Bergen, Morris, Passaic and Union counties.",
    intro: `When something goes wrong with your home, it can't always wait until Monday. KEVA Homes takes emergency calls at any hour at 833-KEVA-HOME.

Rates depend on when, where and what the emergency is. If we can't pick up when you call, leave a voicemail with all the details and we'll call you back as soon as possible.`,
    includes: [
      "Emergency line answered at any hour: 833-KEVA-HOME",
      "Serving Essex, Bergen, Morris, Passaic and Union counties",
      "The same licensed and insured KEVA team",
    ],
    faqs: faqs([
      [
        "How do I reach KEVA Homes in an emergency?",
        "Call 833-KEVA-HOME at any hour. If we can't pick up, leave a voicemail with all the details and we'll call you back as soon as possible.",
      ],
      ["How much does an emergency repair cost?", "Rates depend on when, where and what the emergency is. We'll talk it through when we call you back."],
    ]),
    related: [],
  },
];

const retiredServices = ["service-custom-renovations", "service-energy-efficiency", "service-post-construction"];

// ---------------------------------------------------------------- FAQ (in display order)
const faqDocs = [
  ["faq-1", "What type of contractor is KEVA Homes?", "KEVA Homes is a family-owned general contractor based in Bloomfield, NJ, in business since 2009. We handle residential and commercial construction, including whole-house renovations, additions, kitchens and bathrooms, basements, roofing and siding, decks and hardscaping, structural repairs, new homes and commercial renovations. Every project gets extensive planning and preparation before work begins."],
  ["faq-15", "What areas does KEVA Homes serve?", "We're based in Bloomfield and work throughout North Jersey, in Essex, Bergen, Morris, Passaic and Union counties. Towns we serve include Bloomfield, Montclair, Upper Montclair, Nutley, Verona, Livingston, North Caldwell, West Caldwell, Essex Fells, Roseland, Millburn and Short Hills in Essex County; Franklin Lakes, Ridgewood, Paramus, Upper Saddle River, Oakland, Dumont, Bergenfield, Closter and Alpine in Bergen County; Morristown, Morris Plains, Whippany, Hanover, Montville and Lincoln Park in Morris County; Pompton Lakes and Bloomingdale in Passaic County; and Summit in Union County. Don't see your town? Give us a call."],
  ["faq-licensed", "Is KEVA Homes licensed and insured?", "Yes. KEVA Homes is a registered New Jersey home improvement contractor (NJ HIC Reg. #13VH11129900). We carry general liability, workers' compensation and umbrella insurance."],
  ["faq-warranty", "Do you offer a warranty?", "Yes. Our workmanship is covered by a one-year warranty. Products such as roofing shingles, siding and flooring also carry the manufacturer's warranty, which we provide to you."],
  ["faq-timeline", "How long will my project take?", "It depends on the size of the job. Typical timelines are: roofing, 1–2 days; siding, about 1 week; hardscaping, 1–3 weeks; bathrooms, 2–4 weeks; kitchens, 6–8 weeks; whole-house renovations, 2–5 months; additions, 3–6 months depending on size; and new homes, 6–9 months. Your consultation is the best time to talk through the schedule for your project."],
  ["faq-6", "Do you charge for an estimate?", "No. Your initial in-home consultation is free and usually takes 30 minutes to an hour, depending on the scope of the project. For general questions, we're also happy to start with a quick phone consultation."],
  ["faq-7", "When are you available for an in-home consultation?", "Call us Monday through Saturday between 6 AM and 4 PM at 833-KEVA-HOME or (973) 444-4996 to set up a time."],
  ["faq-8", "Who needs to be at our first meeting?", "Everyone who will make decisions about your project should be at the initial consultation, so all of your needs are covered from the start."],
  ["faq-home", "Do I need to be home while you work?", "No, you don't need to be home while we work. For in-person visits, like the initial consultation, a decision maker needs to be there. For general questions, a quick phone consultation works too."],
  ["faq-permit-needed", "Will I need a permit?", "Most projects that involve structural, electrical, plumbing or mechanical work need a permit from your town's construction office, and your town decides exactly what's required. KEVA Homes files the permits for you. The permit fees themselves are paid by the homeowner."],
  ["faq-11", "How much will permits cost?", "Permit fees are set by your town's construction office and depend on the type and size of the work. For example, finishing a basement needs a building permit, and adding a bathroom down there also needs a plumbing permit. For exact fees, check with your township's construction office. We'll let you know which permits your project needs."],
  ["faq-10", "How many inspections are required?", "It depends on the project and your town. Typical inspections, in order, are rough framing, rough electrical, rough plumbing, insulation and a final inspection."],
  ["faq-9", "Do I need a permit to finish a basement?", "Yes. Finishing a basement requires a building permit from your town, plus a plumbing permit if you're adding a bathroom. The inspections that come with permits also give you peace of mind that the work was done safely and up to code."],
  ["faq-emergency", "Do you handle emergencies?", "Yes. 833-KEVA-HOME is available for emergencies at any hour. Rates depend on when, where and what the emergency is. If we can't pick up when you call, leave a voicemail with all the details and we'll call you back as soon as possible."],
  ["faq-2", "Do you do all the work yourself?", "As a construction and restoration company, we do some of the work ourselves, and some is done by our trusted subcontractors. Either way, we manage the entire project and check the quality at every step."],
  ["faq-3", "Will you be the lowest bidder?", "We encourage homeowners to compare the level of service they're getting for the investment they're making. We provide clear, competitive pricing with no hidden costs."],
  ["faq-5", "I'm getting 3 to 5 estimates on my project. We're not making our choice based on the lowest price. What can you tell me?", "We'll be glad to price your project as long as you have construction-ready plans and material specifications. Our estimates are thorough and clear, so you can compare value, not just price."],
  ["faq-12", "Will my property taxes go up after a renovation?", "They might. In New Jersey, your town's tax assessor decides whether an improvement changes your home's assessed value, and tax rates vary from town to town. Projects that add living space, like additions and finished basements, are the most likely to raise an assessment. For an estimate, contact your town's tax assessor's office."],
  ["faq-13", "How much of what I spend will I get back if I sell my house?", "It depends on the project, the house and the neighborhood. Updates that improve curb appeal often return most of their cost, while larger remodels and additions usually return part of it in resale value and the rest in how you live in your home. A local real estate agent can give you the best estimate for your house."],
  ["faq-14", "Do remodeled homes sell faster?", "Often, yes. If buyers are comparing two similar houses and one has a modern, finished basement, that home will usually sell faster and for more money."],
];
const hiddenFaqs = ["faq-4"]; // "Why should I consider Construction and Repairs/Restoration?" (Vlad asked to remove)

// ---------------------------------------------------------------- run
const clean = (doc) => {
  const { _rev, _createdAt, _updatedAt, ...rest } = doc;
  return rest;
};

async function draftFrom(id, changes) {
  const existing = (await client.getDocument(`drafts.${id}`)) ?? (await client.getDocument(id));
  return { ...(existing ? clean(existing) : {}), ...changes, _id: `drafts.${id}` };
}

for (const s of services) {
  for (const key of ["seoDescription"]) if (s[key].length > 160) throw new Error(`${s.id} ${key} is ${s[key].length} chars`);
}

const tx = client.transaction();
const touched = [];

let i = 1;
for (const s of services) {
  const { id, related, ...fields } = s;
  const doc = await draftFrom(id, {
    _type: "service",
    ...fields,
    slug: { _type: "slug", current: fields.slug },
    relatedProjects: refs(related),
    hidden: false,
    orderRank: rank(i++),
  });
  tx.createOrReplace(doc);
  touched.push(id);
}
for (const id of retiredServices) {
  tx.createOrReplace(await draftFrom(id, { hidden: true, orderRank: rank(i++) }));
  touched.push(id);
}

i = 1;
for (const [id, question, answer] of faqDocs) {
  tx.createOrReplace(await draftFrom(id, { _type: "faqItem", question, answer, hidden: false, orderRank: rank(i++) }));
  touched.push(id);
}
for (const id of hiddenFaqs) {
  tx.createOrReplace(await draftFrom(id, { hidden: true, orderRank: rank(i++) }));
  touched.push(id);
}

tx.createOrReplace(
  await draftFrom("serviceArea-bloomfield-nj", {
    _type: "serviceArea",
    title: "Bloomfield, NJ",
    slug: { _type: "slug", current: "bloomfield-nj" },
    county: "Essex County",
    headline: "General Contractor in Bloomfield, NJ",
    seoTitle: "General Contractor in Bloomfield, NJ",
    seoDescription:
      "KEVA Homes is a family-owned general contractor based in Bloomfield, NJ. Renovations, additions, exteriors, decks and more. Free in-home consultation.",
    intro: `KEVA Homes is a Bloomfield-based general contractor providing residential and commercial construction, remodeling and restoration services throughout Bloomfield and nearby Essex County towns. Our team handles everything from kitchens and bathrooms to complete home renovations, additions, decks, roofing, siding, structural repairs and exterior makeovers.

We've completed several projects right here in Bloomfield, including a complete home renovation with a second-story addition, a full exterior renovation with new front steps, roofing and siding, and a garage, deck and driveway addition. Because every project is different, we handle the planning, permits, trades and inspections each job needs.

Planning a renovation or addition in Bloomfield? Contact KEVA Homes to schedule a free initial consultation and talk through your project.`,
    nearbyTowns: ["Montclair", "Upper Montclair", "Nutley", "Verona", "North Caldwell", "West Caldwell", "Essex Fells"],
    relatedProjects: refs([P.bloomfieldComplete, P.bloomfieldExterior, P.bloomfieldGarage]),
  }),
);
touched.push("serviceArea-bloomfield-nj");

tx.createOrReplace(
  await draftFrom("siteSettings", {
    companyName: "KEVA Homes",
    legalName: "KEVA Homes LLC",
    tagline: "Building Dreams into Reality",
    foundedYear: 2009,
    hicNumber: "13VH11129900",
    insurance: "General liability, workers' compensation and umbrella insurance",
    warranty:
      "1-year workmanship warranty, plus the manufacturer's warranty on products like shingles, siding and flooring.",
    openingHours: [
      {
        _type: "hoursEntry",
        _key: "monsat",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "16:00",
      },
    ],
    emergencyNote:
      "833-KEVA-HOME is available for emergencies at any hour. Rates depend on when, where and what the emergency is. If we can't pick up, leave a voicemail with all the details and we'll call you back as soon as possible.",
    serviceAreas: "Essex, Bergen, Morris, Passaic & Union counties",
    serviceCounties: [
      ["Essex County", ["Bloomfield", "Montclair", "Upper Montclair", "Nutley", "Verona", "Livingston", "North Caldwell", "West Caldwell", "Essex Fells", "Roseland", "Millburn", "Short Hills", "East Orange"]],
      ["Bergen County", ["Franklin Lakes", "Ridgewood", "Paramus", "Upper Saddle River", "Woodcliff Lake", "Oakland", "Dumont", "Bergenfield", "Closter", "Alpine", "Lyndhurst"]],
      ["Morris County", ["Morristown", "Morris Plains", "Whippany", "Hanover", "Montville", "Lincoln Park"]],
      ["Passaic County", ["Pompton Lakes", "Bloomingdale"]],
      ["Union County", ["Summit", "Hillside"]],
    ].map(([county, towns]) => ({ _type: "countyEntry", _key: county.split(" ")[0].toLowerCase(), county, towns })),
    socialLinks: {
      facebook: "https://www.facebook.com/109556268138624",
      instagram: "https://www.instagram.com/kevahomes",
      youtube: "https://www.youtube.com/@KevaHomes",
      yelp: "https://www.yelp.com/biz/keva-homes-bloomfield",
      google: "https://maps.google.com/?cid=6658824963951446442",
    },
  }),
);
touched.push("siteSettings");

// Small project fixes: typos and missing categories
const hillside = await client.getDocument(P.hillside);
tx.createOrReplace(await draftFrom(P.hillside, { description: hillside.description.replace("begging stages", "beginning stages") }));
const dream = await client.getDocument(P.dream);
tx.createOrReplace(await draftFrom(P.dream, { description: dream.description.replace("we are busy away building", "we are busy building").trim() }));
const bc = await client.getDocument(P.bloomfieldComplete);
tx.createOrReplace(await draftFrom(P.bloomfieldComplete, { description: bc.description.replace("patio, deck, patio,", "patio, deck,").trim() }));
tx.createOrReplace(
  await draftFrom(P.morristown, {
    categories: refs(["category-house-additions", "category-bathroom", "category-framing"]),
  }),
);
touched.push(P.hillside, P.dream, P.bloomfieldComplete, P.morristown);

const result = await tx.commit();
writeFileSync(new URL("./seo-drafts-manifest.json", import.meta.url), JSON.stringify(touched, null, 2) + "\n");
console.log(`Staged ${touched.length} drafts (transaction ${result.transactionId}).`);
