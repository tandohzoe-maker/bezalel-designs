"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaced in the server/browser logs; no details are shown to visitors.
    console.error(error);
  }, [error]);

  return (
    <PageHero
      eyebrow="Something went wrong"
      title="We couldn't load this page."
      lead="Please try again. If it keeps happening, reach us directly on the contact page."
    >
      {error.digest ? <p className="eyebrow mt-6 justify-center">Reference: {error.digest}</p> : null}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/contact" variant="ghost">
          Contact us
        </ButtonLink>
      </div>
    </PageHero>
  );
}
