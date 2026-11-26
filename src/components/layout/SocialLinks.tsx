import type { SocialLinks as Links } from "@/config/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const networks = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
] as const;

/** Only networks with a configured, valid https URL are rendered. */
export function activeSocials(links: Links) {
  return networks.filter(({ key }) => /^https:\/\/\S+$/i.test(links[key] ?? ""));
}

export function SocialLinks({
  links,
  variant = "icons",
  className,
}: {
  links: Links;
  variant?: "icons" | "text";
  className?: string;
}) {
  const items = activeSocials(links);
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex", variant === "icons" ? "gap-2" : "flex-col gap-3", className)}>
      {items.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={links[key]}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "transition-colors duration-300",
              variant === "icons"
                ? "flex size-10 items-center justify-center border border-current/15 hover:border-current/60"
                : "text-sm opacity-80 hover:opacity-100",
            )}
          >
            {variant === "icons" ? <Icon className="size-4" /> : label}
            <span className="sr-only">
              {variant === "icons" ? `Bezalel Designs on ${label}` : ""} (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
