"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Linkedin, Phone, Mail, MapPin, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  COMPANY_LINKEDIN_URL,
} from "@/src/lib/constants/contact";

const socialLinks = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    href: COMPANY_LINKEDIN_URL,
  },
];

const APP_PHONE = "+923160417351";
const APP_PHONE_2 = "+923034230144";

function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-1.5 rounded-md hover:bg-white/10 transition-colors",
        className
      )}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className="size-4 text-white/40 hover:text-white/60" />
      )}
    </button>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactEmail = CONTACT_EMAIL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsSubmitted(false);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to send message right now.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background Image and Animated Bubbles */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out opacity-20"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      ></div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-4 md:p-8 lg:p-12">
        {/* Main Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl p-4 md:p-8 rounded-xl grow">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get in touch
            </h2>
            <p className="text-white/60 mb-10 text-lg">
              Have a project in mind? We&apos;d love to hear from you. Reach out and let&apos;s create something amazing together.
            </p>

            {/* Contact Details */}
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/50 text-sm mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-white hover:text-blue-400 transition-colors font-medium"
                    >
                      {contactEmail}
                    </a>
                    <CopyButton text={contactEmail} />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/50 text-sm mb-1">Phone</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${APP_PHONE}`}
                        className="text-white hover:text-blue-400 transition-colors font-medium"
                      >
                        {APP_PHONE}
                      </a>
                      <CopyButton text={APP_PHONE} />
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${APP_PHONE_2}`}
                        className="text-white hover:text-blue-400 transition-colors font-medium"
                      >
                        {APP_PHONE_2}
                      </a>
                      <CopyButton text={APP_PHONE_2} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/50 text-sm mb-1">Office</p>
                  <p className="text-white font-medium">Pakistan, Lahore</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-4">Connect with us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Let&apos;s talk!
            </h2>

            {/* Form */}
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Message sent successfully!
                </h3>
                <p className="text-white/60">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-white/60">Leave us a brief message</p>
                {errorMessage && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                    {errorMessage}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80">
                      Your name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/80">
                    Briefly describe your project idea...
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Briefly describe your project idea..."
                    className="min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500/50"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send a message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* CSS for bubble animation */}
      <style jsx global>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) translateX(0) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh)
              translateX(calc(var(--rand-x-offset) * 10vw)) scale(1.2);
            opacity: 0;
          }
        }
        .animate-bubble {
          animation: bubble var(--animation-duration, 15s) ease-in-out infinite;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
