import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactSubmissionEmail } from "@/src/emails/contact-submission";
import {
  CONTACT_EMAIL,
  CONTACT_DISPLAY_NAME,
} from "@/src/lib/constants/contact";

export const runtime = "nodejs";

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactRequestBody;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Render the React email component to HTML
    const emailHtml = await render(
      ContactSubmissionEmail({ name, email, message })
    );

    const result = await resend.emails.send({
      from: `${CONTACT_DISPLAY_NAME} <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New contact inquiry from ${name}`,
      html: emailHtml,
    });

    // Check if Resend returned an error
    if (result.error) {
      console.error("Resend API error:", result.error);
      return NextResponse.json(
        {
          error: result.error.message || "Failed to send email. Please check your Resend configuration.",
        },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", result.data);

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: `We could not send your message: ${errorMessage}. Please check your Resend API key and domain verification.`,
      },
      { status: 500 }
    );
  }
}

