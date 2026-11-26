import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

type Variant = "solid" | "outline" | "text";
type Tone = "dark" | "light"; // the surface the button sits on

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 label whitespace-nowrap transition-[background-color,color,border-color] duration-300 ease-[var(--ease-atelier)] disabled:pointer-events-none disabled:opacity-50";

const styles: Record<Tone, Record<Variant, string>> = {
  dark: {
    solid: "h-13 px-7 bg-bone text-ink hover:bg-white",
    outline: "h-13 px-7 border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
    text: "h-auto px-0 text-white hover:text-amethyst-light",
  },
  light: {
    solid: "h-13 px-7 bg-ink text-white hover:bg-graphite-2",
    outline: "h-13 px-7 border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
    text: "h-auto px-0 text-ink hover:text-amethyst-dark",
  },
};

type CommonProps = {
  variant?: Variant;
  tone?: Tone;
  arrow?: "right" | "external" | false;
  className?: string;
  children: React.ReactNode;
};

function Arrow({ kind }: { kind: "right" | "external" }) {
  const Icon = kind === "external" ? ArrowUpRightIcon : ArrowRightIcon;
  return (
    <Icon className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-atelier)] group-hover/btn:translate-x-1" />
  );
}

export function buttonClasses({
  variant = "solid",
  tone = "dark",
  className,
}: Pick<CommonProps, "variant" | "tone" | "className">) {
  return cn(base, styles[tone][variant], className);
}

type ButtonLinkProps = CommonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    external?: boolean;
  };

/** A link styled as a button. External links open in a new tab safely. */
export function ButtonLink({
  variant,
  tone,
  arrow = "right",
  className,
  children,
  external,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, tone, className });
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

export function Button({ variant, tone, arrow = false, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, tone, className })} {...rest}>
      <span>{children}</span>
      {arrow ? <Arrow kind={arrow} /> : null}
    </button>
  );
}
