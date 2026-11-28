"use client";

import { useId, useState } from "react";
import { printsConfig, printsNumberFor } from "@/config/site";
import { formatPhoneForDisplay, whatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/**
 * Quote request for Bezalel Prints. Prices depend on quantity, so the visitor
 * picks a product and quantity and WhatsApp opens on the right number with a
 * ready message (shirts/banners/cards → prints line; frames → frames line).
 * Nothing is stored on the site.
 */
export function PrintQuote({ initial }: { initial?: string }) {
  const id = useId();
  const products = printsConfig.products;
  const [slug, setSlug] = useState<string>(products.some((p) => p.slug === initial) ? initial! : products[0].slug);
  const [qty, setQty] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const product = products.find((p) => p.slug === slug)!;
  const number = printsNumberFor(product);

  const send = () => {
    const n = Number(qty);
    if (!qty || !Number.isInteger(n) || n < 1) {
      setError("Please enter how many you need (a whole number).");
      document.getElementById(`${id}-qty`)?.focus();
      return;
    }
    setError("");
    const msg = [
      `Hello Bezalel Prints${name.trim() ? `, I'm ${name.trim()}` : ""}.`,
      `I'd like a quote for ${product.title.toLowerCase()}.`,
      `Quantity: ${n}`,
      details.trim() ? `Details: ${details.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const href = whatsAppLink(number, msg);
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-3.5 text-[0.95rem] text-white placeholder:text-faint focus:border-purple-bright focus:outline-none";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      className="flex flex-col gap-5"
    >
      <fieldset>
        <legend className="text-sm font-medium">What do you need printed?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {products.map((p) => (
            <label
              key={p.slug}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-2xl border px-3 py-3 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-purple-bright",
                slug === p.slug
                  ? "border-purple-bright bg-purple-bright/15 text-white"
                  : "border-white/10 text-white/75 hover:border-white/30",
              )}
            >
              <input
                type="radio"
                name={`${id}-product`}
                value={p.slug}
                checked={slug === p.slug}
                onChange={() => {
                  setSlug(p.slug);
                  setSent(false);
                }}
                className="sr-only"
              />
              {p.title.replace(" printing", "")}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-qty`} className="text-sm font-medium">
            Quantity
          </label>
          <input
            id={`${id}-qty`}
            inputMode="numeric"
            value={qty}
            onChange={(e) => {
              setQty(e.target.value.replace(/[^\d]/g, "").slice(0, 6));
              setError("");
              setSent(false);
            }}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${id}-qty-error` : undefined}
            placeholder="e.g. 50"
            className={cn(field, error && "border-danger")}
          />
          {error ? (
            <p id={`${id}-qty-error`} className="mt-2 text-sm text-danger">
              {error}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium">
            Your name <span className="text-mute">(optional)</span>
          </label>
          <input
            id={`${id}-name`}
            autoComplete="name"
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-details`} className="text-sm font-medium">
          Details <span className="text-mute">(optional)</span>
        </label>
        <textarea
          id={`${id}-details`}
          rows={3}
          maxLength={600}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Sizes, colours, dimensions, deadline…"
          className={cn(field, "resize-y")}
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-purple-bright px-6 font-medium text-ink shadow-[0_10px_40px_-8px_rgba(185,140,255,0.55)] hover:bg-purple-soft"
      >
        Get a quote on WhatsApp
      </button>

      <p className="text-sm text-mute" role="status" aria-live="polite">
        {sent
          ? "WhatsApp opened with your request. Press send there to deliver it."
          : `${product.line === "frames" ? "Frames" : "Shirts, banners and cards"} are handled on ${formatPhoneForDisplay(number)}.`}
      </p>
    </form>
  );
}
