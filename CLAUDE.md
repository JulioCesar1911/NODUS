# NODUS — Project Context for Claude Code

## What this is
NODUS is a Next.js 15 (App Router) knowledge graph platform. University subjects are nodes in an interactive canvas graph. Students navigate prerequisites, read node content, contribute notes, and follow learning paths.

## Tech stack
- Next.js 15, TypeScript (strict), Tailwind CSS
- Canvas-based graph renderer (no external graph library)
- No backend — all data is static in `lib/`

## Key data files (read these first when touching data)
- `lib/graph-data.ts` — all node definitions (`nodeData`) and school colors. **Source of truth for node IDs and node positions (ring + angle).**
- `lib/node-content.ts` — educational content per node (summary, concepts, why, example, difficulty_note)

## Canonical node IDs (do NOT use the old names)
| Display name         | Correct ID   |
|----------------------|--------------|
| Cálculo I            | calc1        |
| Cálculo II           | calc2        |
| Cálculo III          | calc3        |
| Álgebra Lineal       | linalg       |
| Estadística          | stats        |
| Probabilidad         | prob         |
| Intro Programación   | intro-prog   |
| Estructuras de Datos | data-str     |
| Machine Learning     | ml           |
| Microeconomía        | micro        |
| Macroeconomía        | macro        |
| Arq. Computadoras    | comp-arch    |
| Finanzas Corp.       | fin-corp     |

School IDs: `math`, `cs`, `eng`, `biz`, `health`, `hum`, `center`

## Node positioning rules (graph-data.ts)
- Nodes are placed by `ring` (distance from center, 1–5) and `angle` (degrees, 0–360)
- Nodes on the same ring must be **at least 25° apart** to avoid overlap
- Current biz school angles (do not crowd these further):
  - micro: ring 1, angle 30
  - marketing: ring 2, angle 10 | macro: ring 2, angle 30 | accounting: ring 2, angle 50
  - fin-corp: ring 3, angle 30
  - quant: ring 4, angle 45

## Component map
```
components/nodus/
  navigation.tsx       — top nav: search (live filter), lente selector (localStorage)
  knowledge-graph.tsx  — canvas graph wrapper, receives activeSchool prop
  ruta-page.tsx        — learning path timeline view
  contribuir-page.tsx  — note submission form
  hero.tsx / footer.tsx / recent-nodes.tsx / learning-paths.tsx — landing page sections

hooks/
  use-graph-engine.ts  — canvas draw loop, pan/zoom, hover, school filter dimming

app/ (App Router pages)
  page.tsx             — landing page
  grafo/page.tsx       — full graph with school filter bar
  nodo/[id]/page.tsx   — individual node page (async, params: Promise<{id}>)
  nodos/               — node listing
  ruta/                — learning path
  contribuir/          — contribution form
```

## Graph engine notes (use-graph-engine.ts)
- `useGraphEngine(isDark, onNodeClick?, activeSchool?)` — activeSchool is a Spanish label ("MATEMÁTICAS", "CS", etc.) or "TODOS"
- Initial pan is calculated dynamically on mount to center world-coordinate (CX=380, CY=340) in the canvas: `panX = cw/2 - CX*zoom`, `panY = ch/2 - CY*zoom`
- `hasInitialized` ref prevents re-centering on resize or effect re-runs (preserves user pan state)
- ResizeObserver resizes the canvas pixel buffer on container resize; does NOT reset pan
- School filter dimming: non-active nodes/edges → globalAlpha 0.15; hover takes priority over school filter
- `onNodeClick` is kept fresh via `stateRef.current.onNodeClick` (outside effect) to avoid stale closures

## Patterns to follow
- All client components have `"use client"` at top
- Brutalist design system: use existing CSS classes (`brutalist-border`, `brutalist-shadow`, `brutalist-border-2`, `brutalist-shadow-sm`)
- Node links always use the canonical ID: `/nodo/${node.id}`
- `params` in async page components are typed as `Promise<{id: string}>` (Next.js 15)

## What NOT to do
- Do not add `typescript: { ignoreBuildErrors: true }` to next.config.mjs
- Do not create static routes under `app/nodo/<id>/` — use the dynamic `[id]` route
- Do not use old IDs (calculo-1, algebra-lineal, etc.) anywhere
- Do not put two biz nodes on the same ring closer than 25° apart
