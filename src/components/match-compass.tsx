import type { MatchBreakdown } from "@/lib/types";

const AXES: { key: keyof MatchBreakdown; label: string; fullLabel: string; angle: number }[] = [
  { key: "industry", label: "Ind", fullLabel: "Industry", angle: -90 },
  { key: "stage", label: "Stg", fullLabel: "Stage", angle: 0 },
  { key: "geo", label: "Geo", fullLabel: "Geography", angle: 90 },
  { key: "signal", label: "Sig", fullLabel: "Signal", angle: 180 },
];

const CENTER = 70;
const RADIUS = 52;

function point(angleDeg: number, value: number) {
  const angle = (angleDeg * Math.PI) / 180;
  const r = (value / 100) * RADIUS;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

function ringPoint(angleDeg: number, r: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
}

/**
 * "Match Compass" — a four-axis radial plot of a match's score breakdown.
 * A deliberately non-generic visualization (instead of a plain progress bar)
 * that ties the product's cartography-inspired visual language to a real,
 * inspectable computation from src/lib/matching.ts.
 */
export function MatchCompass({
  score,
  breakdown,
  size = 140,
}: {
  score: number;
  breakdown: MatchBreakdown;
  size?: number;
}) {
  const polygonPoints = AXES.map((axis) => point(axis.angle, breakdown[axis.key]))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  const rings = [0.33, 0.66, 1];

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 140 140" width={size} height={size} role="img" aria-label={`Match score ${score} of 100`}>
        {rings.map((ratio) => (
          <polygon
            key={ratio}
            points={AXES.map((axis) => {
              const p = ringPoint(axis.angle, RADIUS * ratio);
              return `${p.x},${p.y}`;
            }).join(" ")}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}
        {AXES.map((axis) => {
          const p = ringPoint(axis.angle, RADIUS);
          return (
            <line
              key={axis.key}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="var(--border)"
              strokeWidth={1}
            />
          );
        })}
        <polygon points={polygonPoints} fill="var(--brand)" fillOpacity={0.18} stroke="var(--brand)" strokeWidth={1.5} />
        {AXES.map((axis) => {
          const p = point(axis.angle, breakdown[axis.key]);
          return <circle key={axis.key} cx={p.x} cy={p.y} r={2.5} fill="var(--brand)" />;
        })}
        <text
          x={CENTER}
          y={CENTER - 4}
          textAnchor="middle"
          className="font-display"
          style={{ fontSize: 22, fontWeight: 500, fill: "var(--foreground)" }}
        >
          {score}
        </text>
        <text
          x={CENTER}
          y={CENTER + 12}
          textAnchor="middle"
          style={{ fontSize: 9, fill: "var(--muted)", letterSpacing: "0.05em" }}
        >
          MATCH
        </text>
      </svg>
      {size >= 100 && (
        <div className="mt-1 grid grid-cols-2 gap-x-2.5 gap-y-0.5 text-[11px] text-muted">
          {AXES.map((axis) => (
            <div
              key={axis.key}
              className="flex items-center justify-between gap-1 whitespace-nowrap"
              title={axis.fullLabel}
            >
              <span>{axis.label}</span>
              <span className="tabular-nums text-foreground/80">{breakdown[axis.key]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
