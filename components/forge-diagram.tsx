const LAYERS = [
  { label: 'AI Agents', y: 0 },
  { label: 'Data Engineering', y: 46 },
  { label: 'SaaS, Customized', y: 92 },
  { label: 'Custom Software', y: 138 },
]

// Isometric layered "forge" stack rendered as thin technical linework.
export function ForgeDiagram() {
  // isometric offsets
  const w = 150
  const dx = 78
  const dy = 40

  return (
    <svg
      viewBox="0 0 560 340"
      fill="none"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Isometric diagram of INNOVI's four stacked service layers: custom software, customized SaaS, data engineering, and AI agents."
    >
      {LAYERS.map((layer, i) => {
        // base top-left anchor for each slab
        const ox = 90
        const oy = 60 + layer.y
        const top = `${ox},${oy} ${ox + w},${oy - dy / 2 + 20} ${ox + w + dx},${oy + 20} ${ox + dx},${oy + dy / 2 + 20}`
        const isTop = i === 0
        return (
          <g key={layer.label}>
            {/* slab top face */}
            <polygon
              points={top}
              className={
                isTop
                  ? 'fill-accent/10 stroke-accent'
                  : 'fill-transparent stroke-foreground/35'
              }
              strokeWidth={1}
            />
            {/* left side */}
            <polygon
              points={`${ox},${oy} ${ox + dx},${oy + dy / 2 + 20} ${ox + dx},${oy + dy / 2 + 38} ${ox},${oy + 18}`}
              className={
                isTop
                  ? 'fill-accent/5 stroke-accent'
                  : 'fill-foreground/[0.02] stroke-foreground/25'
              }
              strokeWidth={1}
            />
            {/* right side */}
            <polygon
              points={`${ox + dx},${oy + dy / 2 + 20} ${ox + w + dx},${oy + 20} ${ox + w + dx},${oy + 38} ${ox + dx},${oy + dy / 2 + 38}`}
              className={
                isTop
                  ? 'fill-accent/10 stroke-accent'
                  : 'fill-foreground/[0.04] stroke-foreground/25'
              }
              strokeWidth={1}
            />
            {/* node dots on top layer only */}
            {isTop &&
              [0, 1, 2, 3].map((c) =>
                [0, 1, 2].map((r) => (
                  <circle
                    key={`${c}-${r}`}
                    cx={ox + 34 + c * 26 + r * 20}
                    cy={oy + 8 + r * 8 - c * 4}
                    r={1.6}
                    className="fill-amber"
                  />
                )),
              )}
            {/* label line + text */}
            <line
              x1={ox + w + dx}
              y1={oy + 20}
              x2={ox + w + dx + 40}
              y2={oy + 20}
              className="stroke-foreground/30"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={ox + w + dx + 46}
              y={oy + 24}
              className="fill-muted-foreground font-mono text-[11px] uppercase tracking-wider"
            >
              {layer.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
