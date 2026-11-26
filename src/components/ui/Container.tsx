import { cn } from "@/lib/cn";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** The site-wide horizontal frame: 1440px max, fluid gutters. */
export function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12", className)} {...rest}>
      {children}
    </Tag>
  );
}
