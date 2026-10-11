"use server";

import { writeClient } from "@/sanity/lib/client";
import { Resend } from "resend";
import { PROJECT_TYPES, REFERRAL_SOURCES, optionLabel } from "@/lib/contactOptions";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  referralSource: string;
  referralDetail: string;
  message: string;
}) {
  try {
    await writeClient.create({
      _type: "contactSubmission",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      referralSource: formData.referralSource || undefined,
      referralDetail: formData.referralDetail || undefined,
      message: formData.message,
      submittedAt: new Date().toISOString(),
      read: false,
    });

    const projectType = optionLabel(PROJECT_TYPES, formData.projectType) ?? "Not specified";
    const heardFrom = optionLabel(REFERRAL_SOURCES, formData.referralSource) ?? "Not specified";
    const heardDetail = formData.referralDetail ? ` (${escapeHtml(formData.referralDetail)})` : "";

    await resend.emails.send({
      from: "KEVA Homes <onboarding@resend.dev>",
      to: "kevahomesllc@gmail.com",
      subject: `New Contact Form: ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(formData.phone || "Not provided")}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>How they heard about us:</strong> ${escapeHtml(heardFrom)}${heardDetail}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(formData.message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}
