
/**
 * Fade-and-rise reveal.
 *
 * Progressive enhancement: content is fully visible by default. Only when the
 * inline head script has marked <html class="js"> is it hidden before revealing,
 * so visitors without JavaScript (and crawlers) always see everything.
 *
 * - trigger="view": revealed by <RevealObserver/> when scrolled into view.
 * - trigger="load": pure CSS animation on first paint (use above the fold, so
 *   the hero never waits for JavaScript to hydrate).
 *
 * Reduced-motion preferences are honoured in CSS (globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  trigger = "view",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  trigger?: "view" | "load";
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  return (
    <Tag
      data-reveal={trigger}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
