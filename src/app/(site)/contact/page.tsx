import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact KEVA Homes for a free consultation. Call (973) 444-4996 or send us a message about your construction project.",
};

export default function ContactPage() {
  return <ContactClient />;
}
