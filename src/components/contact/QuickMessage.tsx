"use client";

import { useId, useState } from "react";
import { whatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const MAX_NAME = 80;
const MAX_MESSAGE = 1000;

/**
 * Compose a short message and hand it to the visitor's own WhatsApp or email
 * app, pre-filled. Nothing is sent to or stored on a server, so this works
 * without a backend. (Detailed briefs go through the Start a Project form.)
 */
export function QuickMessage({ whatsapp, email }: { whatsapp: string; email: string }) {
  const id = useId();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [sent, setSent] = useState<"" | "whatsapp" | "email">("");

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!message.trim()) next.message = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length) setSent("");
    if (next.name) document.getElementById(`${id}-name`)?.focus();
    else if (next.message) document.getElementById(`${id}-message`)?.focus();
    return Object.keys(next).length === 0;
  };

  const text = () => `Hello Bezalel Designs, I'm ${name.trim()}.\n\n${message.trim()}`;

  const sendWhatsApp = () => {
    if (!validate()) return;
    const href = whatsAppLink(whatsapp, text());
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
    setSent("whatsapp");
  };

  // A real mailto link, kept up to date as the visitor types.
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    `Enquiry from ${name.trim() || "the website"}`,
  )}&body=${encodeURIComponent(text())}`;

  const field =
    "mt-2 w-full rounded-2xl border bg-ink/70 px-4 py-3.5 text-[0.95rem] text-white placeholder:text-faint transition-colors focus:border-purple-bright focus:outline-none";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        sendWhatsApp();
      }}
      className="flex flex-col gap-5"
    >
      <div>
        <label htmlFor={`${id}-name`} className="text-sm font-medium">
          Your name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          maxLength={MAX_NAME}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSent("");
            if (errors.name) setErrors((x) => ({ ...x, name: undefined }));
          }}
          aria-invalid={Boolean(errors.name) || undefined}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          placeholder="e.g. Ama Mensah"
          className={cn(field, errors.name ? "border-danger" : "border-white/10")}
        />
        {errors.name ? (
          <p id={`${id}-name-error`} className="mt-2 text-sm text-danger">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor={`${id}-message`} className="text-sm font-medium">
            Message
          </label>
          <span className="font-mono text-xs text-mute" aria-hidden>
            {message.length}/{MAX_MESSAGE}
          </span>
        </div>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          maxLength={MAX_MESSAGE}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSent("");
            if (errors.message) setErrors((x) => ({ ...x, message: undefined }));
          }}
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          placeholder="What would you like to create?"
          className={cn(field, "resize-y", errors.message ? "border-danger" : "border-white/10")}
        />
        {errors.message ? (
          <p id={`${id}-message-error`} className="mt-2 text-sm text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-purple-bright px-6 font-medium text-ink shadow-[0_10px_40px_-8px_rgba(185,140,255,0.55)] transition-colors hover:bg-purple-soft"
        >
          Send on WhatsApp
        </button>
        <a
          href={mailtoHref}
          onClick={(e) => {
            if (!validate()) e.preventDefault();
            else setSent("email");
          }}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-6 font-medium text-white transition-colors hover:bg-white/[0.12]"
        >
          Send by email
        </a>
      </div>

      <p className="text-sm text-mute" role="status" aria-live="polite">
        {sent === "whatsapp"
          ? "WhatsApp opened with your message. Press send there to deliver it."
          : sent === "email"
            ? "Your email app opened with your message. Press send there to deliver it."
            : "Opens your own WhatsApp or email app with the message filled in. Nothing is stored on this site."}
      </p>
    </form>
  );
}
