import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

/**
 * Pill buttons.
 * - primary: bright purple with ink text and a soft glow (main call to action)
 * - light:   white pill (secondary emphasis, e.g. header CTA)
 * - ghost:   translucent pill with hairline (quiet actions, "Learn more")
 * - link:    text only
 */
export type ButtonVariant = "primary" | "light" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-atelier)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-purple-bright text-ink shadow-[0_10px_40px_-8px_rgba(185,140,255,0.55)] hover:bg-purple-soft hover:shadow-[0_12px_48px_-6px_rgba(185,140,255,0.7)]",
  light: "bg-white text-ink hover:bg-white/85",
  ghost: "border border-white/10 bg-white/[0.06] text-white backdrop-blur hover:border-white/20 hover:bg-white/[0.12]",
  link: "h-auto rounded-none px-0 text-white hover:text-purple-bright",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: Size;
  arrow?: "right" | "external" | false;
  className?: string;
  children: React.ReactNode;
};

function Arrow({ kind }: { kind: "right" | "external" }) {
  const Icon = kind === "external" ? ArrowUpRightIcon : ArrowRightIcon;
  return (
    <Icon className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-atelier)] group-hover/btn:translate-x-0.5" />
  );
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<CommonProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], variant === "link" ? "" : sizes[size], className);
}

type ButtonLinkProps = CommonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    external?: boolean;
  };

/** A link styled as a button. External links open in a new tab safely. */
export function ButtonLink({
  variant,
  size,
  arrow = "right",
  className,
  children,
  external,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow kind={external ? "external" : arrow} /> : null}
    </>
  );

  if (external) {
    return (
      <a href={String(href)} className={classes} target="_blank" rel="noopener noreferrer" {...(rest as object)}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, arrow = false, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow kind={arrow} /> : null}
    </button>
  );
}
