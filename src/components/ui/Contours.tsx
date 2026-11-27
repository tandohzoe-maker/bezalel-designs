/**
 * Decorative topographic contour lines, generated deterministically on the
 * server (no image request). Purely visual: hidden from assistive tech.
 */

function blob(cx: number, cy: number, r: number, seed: number, points = 90) {
  const pts: string[] = [];
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * Math.PI * 2;
    const n =
      Math.sin(t * 2 + seed) * 0.16 +
      Math.sin(t * 3 - seed * 1.7) * 0.09 +
      Math.cos(t * 5 + seed * 0.6) * 0.045;
    const rr = r * (1 + n);
    pts.push(`${(cx + Math.cos(t) * rr * 1.35).toFixed(1)},${(cy + Math.sin(t) * rr).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

const centres = [
  { x: 220, y: 760, seed: 1.2, rings: 14, step: 46 },
  { x: 1260, y: 180, seed: 2.6, rings: 12, step: 50 },
  { x: 900, y: 980, seed: 0.4, rings: 8, step: 52 },
];

const paths = centres.flatMap((c) =>
  Array.from({ length: c.rings }, (_, k) => blob(c.x, c.y, 40 + k * c.step, c.seed + k * 0.22)),
);

export function Contours({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
