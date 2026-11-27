import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";

export function NotFoundContent() {
  return (
    <PageHero eyebrow="404 · Page not found" title="This page is still a sketch." lead="The page you're looking for doesn't exist or has moved.">
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/portfolio" variant="ghost">
          View the portfolio
        </ButtonLink>
      </div>
    </PageHero>
  );
}
