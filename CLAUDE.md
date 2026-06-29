# NODUS — Project Context for Claude Code

## What this is
NODUS is a Next.js 15 (App Router) knowledge graph platform. University subjects are nodes in an interactive canvas graph. Students navigate prerequisites, read node content, contribute notes, and follow learning paths.

## Tech stack
- Next.js 15, TypeScript (strict), Tailwind CSS
- Canvas-based graph renderer (no external graph library)
- Supabase PostgreSQL with Row Level Security (RLS) for data persistence
- Client-side data fetching via `@supabase/supabase-js`

## Data layer
- `lib/supabase.ts` — initializes Supabase client with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `lib/data.ts` — async functions to fetch node data and content from Supabase
  - `fetchNodeData()` — fetches published nodes with ring/angle/prerequisites
  - `getNodeContent(nodeId)` — fetches educational content for a node
  - `getNodeEdges()` — fetches prerequisite relationships
- `lib/graph-data.ts` — school metadata (colors, names, positions). Also contains backup hardcoded `nodeData` for emergency fallback
- `lib/node-content.ts` — backup hardcoded educational content (deprecated, use Supabase)

## Supabase tables
- **nodes** — node definitions with `estado` column filtering for published nodes only
  - Columns: id, label, description, school, ring, angle, difficulty, estado
  - RLS: public SELECT on `estado='published'` records
- **node_content** — educational content per node
  - Columns: node_id, summary, concepts, why, example, difficulty_note
  - RLS: public SELECT allowed
- **node_edges** — prerequisite relationships
  - Columns: source_id (prereq), target_id (node that unlocks)
  - RLS: public SELECT allowed

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (public, safe to commit)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anonymous API key for client access (public, safe to commit)
- `SUPABASE_URL` — same as above, used in server-side scripts
- `SUPABASE_SECRET_KEY` — secret admin key (NEVER commit, use `.env.local` only)

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
  navigation.tsx       — top nav: search (live filter with Supabase data), lente selector
  knowledge-graph.tsx  — canvas graph wrapper; fetches nodeData, shows loading state
  ruta-page.tsx        — learning path timeline view
  contribuir-page.tsx  — note submission form
  hero.tsx / footer.tsx / recent-nodes.tsx / learning-paths.tsx — landing page sections

hooks/
  use-graph-engine.ts  — canvas draw loop, pan/zoom, hover, school filter dimming
                         NOW accepts nodes as dependency-injected parameter

app/ (App Router pages)
  page.tsx             — landing page
  grafo/page.tsx       — client component, fetches nodeData, displays graph with filters
  nodo/[id]/page.tsx   — async server component, fetches node data and content from Supabase
  nodos/page.tsx       — async server component, lists all nodes by school
  ruta/                — learning path
  contribuir/          — contribution form
```

## Graph engine notes (use-graph-engine.ts)
- **Signature:** `useGraphEngine(isDark, nodes, onNodeClick?, activeSchool?, mode?, selectedEgoId?, selectedDestId?)`
  - `nodes` is dependency-injected: caller fetches data and passes it in
  - `activeSchool` is a Spanish label ("MATEMÁTICAS", "CS", etc.) or "TODOS"
  - Returns `{ canvasRef, tooltipData, tooltipPosition, tooltipVisible, legendItems, noRoutePath }`
- Initial pan is calculated dynamically on mount to center world-coordinate (CX=380, CY=340): `panX = cw/2 - CX*zoom`, `panY = ch/2 - CY*zoom`
- `hasInitialized` ref prevents re-centering on resize (preserves user pan state)
- ResizeObserver resizes canvas pixel buffer on container resize; does NOT reset pan
- School filter dimming: non-active nodes/edges → globalAlpha 0.15; hover takes priority
- `onNodeClick` kept fresh via `stateRef.current.onNodeClick` to avoid stale closures
- `nodes` in dependency array triggers recomputation of graph geometry and edges

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
