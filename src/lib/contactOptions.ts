// Dropdown options for the contact form. Shared by the form, the notification email and Studio.

export const PROJECT_TYPES = [
  { value: "whole-house", label: "Whole-House Renovation" },
  { value: "addition", label: "Home Addition" },
  { value: "kitchen-bath", label: "Kitchen or Bathroom" },
  { value: "basement", label: "Basement Finishing" },
  { value: "exterior", label: "Roofing, Siding or Exterior" },
  { value: "outdoor", label: "Deck, Patio or Hardscaping" },
  { value: "new-construction", label: "New Home Construction" },
  { value: "commercial", label: "Commercial Renovation" },
  { value: "structural", label: "Structural Repair" },
  { value: "emergency", label: "Emergency Repair" },
  { value: "other", label: "Other" },
  // Older values, kept so earlier submissions still show a readable label in Studio
  { value: "interior", label: "Interior Renovation (old form)" },
  { value: "custom", label: "Custom Project (old form)" },
] as const;

export const REFERRAL_SOURCES = [
  { value: "google", label: "Google Search" },
  { value: "google-maps", label: "Google Maps" },
  { value: "ai-assistant", label: "ChatGPT or another AI assistant" },
  { value: "bing", label: "Bing" },
  { value: "yelp", label: "Yelp" },
  { value: "houzz", label: "Houzz" },
  { value: "social", label: "Facebook or Instagram" },
  { value: "referral", label: "Friend, neighbor or family" },
  { value: "past-customer", label: "I'm a past customer" },
  { value: "job-site", label: "Saw a KEVA job site" },
  { value: "other", label: "Other" },
] as const;

export const CURRENT_PROJECT_TYPES = PROJECT_TYPES.filter((o) => !o.label.endsWith("(old form)"));

export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string | undefined,
): string | undefined {
  return options.find((o) => o.value === value)?.label;
}
