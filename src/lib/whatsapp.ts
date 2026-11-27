/**
 * Normalise a phone number into the international digits-only form that
 * wa.me expects. Local Ghanaian numbers (e.g. "024 123 4567") are converted
 * to the +233 country code. Returns null if the number is not usable.
 */
export function normaliseWhatsAppNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 10) digits = `233${digits.slice(1)}`;

  digits = digits.replace(/\D/g, "");
  // E.164 allows up to 15 digits; anything under 8 is not a real number.
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

/** Build a wa.me link, optionally with a pre-filled message. */
export function whatsAppLink(raw: string | null | undefined, message?: string): string | null {
  const number = normaliseWhatsAppNumber(raw);
  if (!number) return null;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Human-friendly display of a stored number, e.g. "+233 24 123 4567". */
export function formatPhoneForDisplay(raw: string | null | undefined): string | null {
  const n = normaliseWhatsAppNumber(raw);
  if (!n) return null;
  if (n.startsWith("233") && n.length === 12) {
    return `+233 ${n.slice(3, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;
  }
  return `+${n}`;
}

/** tel: link in international form, e.g. "tel:+233209845375". */
export function telLink(raw: string | null | undefined): string | null {
  const n = normaliseWhatsAppNumber(raw);
  return n ? `tel:+${n}` : null;
}
