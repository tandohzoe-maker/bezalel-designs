"use client";

/* Last-resort boundary if the root layout itself fails. Kept dependency-free. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-GH">
      <body style={{ margin: 0, background: "#0b0b0c", color: "#fff", fontFamily: "Georgia, serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
          <div>
            <h1 style={{ fontWeight: 400, fontSize: "clamp(2rem, 6vw, 4rem)", margin: 0 }}>Something went wrong.</h1>
            <p style={{ color: "#a9a7a2", fontFamily: "system-ui, sans-serif" }}>Please refresh the page.</p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 24,
                padding: "14px 28px",
                background: "#f4f1ea",
                color: "#0b0b0c",
                border: 0,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
