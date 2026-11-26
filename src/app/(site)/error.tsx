"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaced in the server/browser logs; no details are shown to visitors.
    console.error(error);
  }, [error]);

  return (
    <section className="grain flex min-h-[80svh] items-end bg-ink pt-40 pb-20">
      <Container>
        <SectionLabel index="!" className="text-stone-light">
          Something went wrong
        </SectionLabel>
        <h1 className="mt-8 max-w-[14ch] font-display text-d2">
          We couldn&rsquo;t load <em>this page</em>.
        </h1>
        <p className="mt-8 max-w-md text-lead text-stone-light">
          Please try again. If it keeps happening, reach us directly on the contact page.
        </p>
        {error.digest ? <p className="label mt-6 text-stone">Reference: {error.digest}</p> : null}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
