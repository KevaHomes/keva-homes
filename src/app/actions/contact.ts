"use server";

import { writeClient } from "@/sanity/lib/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}) {
  try {
    await writeClient.create({
      _type: "contactSubmission",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType,
      message: formData.message,
      submittedAt: new Date().toISOString(),
      read: false,
    });

    await resend.emails.send({
      from: "KEVA Homes <onboarding@resend.dev>",
      to: "kevahomesllc@gmail.com",
      subject: `New Contact Form: ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
        <p><strong>Project Type:</strong> ${formData.projectType || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}
