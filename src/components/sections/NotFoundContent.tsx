import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function NotFoundContent() {
  return (
    <section className="grain flex min-h-[80svh] items-end bg-ink pt-40 pb-20">
      <Container>
        <SectionLabel index="404" className="text-stone-light">
          Page not found
        </SectionLabel>
        <h1 className="mt-8 max-w-[12ch] font-display text-d1">
          This page is <em>still a sketch</em>.
        </h1>
        <p className="mt-8 max-w-md text-lead text-stone-light">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/portfolio" variant="outline">
            View the portfolio
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
