"use client"

import { useState } from "react"
import { Navigation } from "@/components/nodus/navigation"
import { ChevronDown } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type AreaId = "todos" | "matematicas" | "cs" | "economia"
type LensId = "cs" | "ingenieria" | "finanzas" | "datos"

interface GNode {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
  area: Exclude<AreaId, "todos">
  status: "canonical" | "draft"
  isCore: boolean
  description: string
  meta: string
}

interface Edge {
  from: string
  to: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
//
// Layout: 4 columnas izquierda→derecha
//   Col A (x=20):  calculo-1, algebra-lineal, intro-programacion
//   Col B (x=215): calculo-2, estadistica-basica, microeconomia, org-computadoras
//   Col C (x=450): probabilidad, estructuras-datos
//   Col D (x=695): machine-learning-basico
//
// viewBox: 880 × 490

const NODES: GNode[] = [
  {
    id: "calculo-1", label: "Cálculo I",
    x: 20, y: 78, w: 110, h: 46,
    area: "matematicas", status: "canonical", isCore: false,
    description: "Límites, derivadas e integrales. La base matemática de todo lo cuantitativo.",
    meta: "4 créditos · Matemáticas",
  },
  {
    id: "algebra-lineal", label: "Álgebra Lineal",
    x: 20, y: 198, w: 140, h: 46,
    area: "matematicas", status: "canonical", isCore: true,
    description: "Vectores, matrices, transformaciones lineales y espacios vectoriales.",
    meta: "4 créditos · Matemáticas",
  },
  {
    id: "intro-programacion", label: "Intro Programación",
    x: 20, y: 348, w: 158, h: 46,
    area: "cs", status: "canonical", isCore: false,
    description: "Fundamentos: variables, control de flujo, funciones y recursión.",
    meta: "3 créditos · CS",
  },
  {
    id: "calculo-2", label: "Cálculo II",
    x: 220, y: 23, w: 110, h: 46,
    area: "matematicas", status: "canonical", isCore: false,
    description: "Series de Taylor, integrales múltiples e introducción a EDOs.",
    meta: "4 créditos · Matemáticas",
  },
  {
    id: "estadistica-basica", label: "Estadística Básica",
    x: 215, y: 148, w: 155, h: 46,
    area: "matematicas", status: "canonical", isCore: false,
    description: "Distribuciones de probabilidad, inferencia y pruebas de hipótesis.",
    meta: "3 créditos · Matemáticas",
  },
  {
    id: "microeconomia", label: "Microeconomía",
    x: 220, y: 273, w: 130, h: 46,
    area: "economia", status: "canonical", isCore: false,
    description: "Teoría del consumidor, producción, mercados y equilibrio competitivo.",
    meta: "3 créditos · Economía",
  },
  {
    id: "organizacion-computadoras", label: "Org. Computadoras",
    x: 215, y: 413, w: 155, h: 46,
    area: "cs", status: "draft", isCore: false,
    description: "Arquitectura de CPU, memoria, pipeline de instrucciones y ensamblador.",
    meta: "3 créditos · CS",
  },
  {
    id: "probabilidad", label: "Probabilidad",
    x: 450, y: 73, w: 120, h: 46,
    area: "matematicas", status: "draft", isCore: false,
    description: "Variables aleatorias, distribuciones continuas y cadenas de Markov.",
    meta: "3 créditos · Matemáticas",
  },
  {
    id: "estructuras-datos", label: "Estructuras de Datos",
    x: 445, y: 293, w: 165, h: 46,
    area: "cs", status: "canonical", isCore: false,
    description: "Árboles, grafos, tablas hash y análisis de complejidad algorítmica.",
    meta: "4 créditos · CS",
  },
  {
    id: "machine-learning-basico", label: "Machine Learning",
    x: 695, y: 193, w: 155, h: 46,
    area: "cs", status: "canonical", isCore: true,
    description: "Regresión, clasificación, redes neuronales básicas y validación de modelos.",
    meta: "4 créditos · CS",
  },
]

// 18 conexiones directed: prerequisito → siguiente nodo
const EDGES: Edge[] = [
  { from: "calculo-1",            to: "calculo-2" },
  { from: "calculo-1",            to: "estadistica-basica" },
  { from: "calculo-1",            to: "microeconomia" },
  { from: "calculo-1",            to: "probabilidad" },
  { from: "calculo-2",            to: "probabilidad" },
  { from: "calculo-2",            to: "machine-learning-basico" },
  { from: "algebra-lineal",       to: "calculo-2" },
  { from: "algebra-lineal",       to: "estadistica-basica" },
  { from: "algebra-lineal",       to: "machine-learning-basico" },
  { from: "estadistica-basica",   to: "probabilidad" },
  { from: "estadistica-basica",   to: "machine-learning-basico" },
  { from: "probabilidad",         to: "machine-learning-basico" },
  { from: "intro-programacion",   to: "estructuras-datos" },
  { from: "intro-programacion",   to: "organizacion-computadoras" },
  { from: "intro-programacion",   to: "machine-learning-basico" },
  { from: "estructuras-datos",    to: "machine-learning-basico" },
  { from: "organizacion-computadoras", to: "machine-learning-basico" },
  { from: "microeconomia",        to: "machine-learning-basico" },
]

const NODE_MAP = new Map(NODES.map(n => [n.id, n]))

// ─── Bezier path: right edge of source → left edge of target ─────────────────

function edgePath(src: GNode, tgt: GNode): string {
  const MARGIN = 14          // gap between arrowhead tip and node border
  const x1 = src.x + src.w
  const y1 = src.y + src.h / 2
  const x2 = tgt.x - MARGIN
  const y2 = tgt.y + tgt.h / 2
  const hw = Math.max((x2 - x1) * 0.42, 28)   // horizontal pull, min 28
  return `M ${x1} ${y1} C ${x1 + hw} ${y1} ${x2 - hw} ${y2} ${x2} ${y2}`
}

// ─── Static config ────────────────────────────────────────────────────────────

const AREA_FILTERS: { id: AreaId; label: string }[] = [
  { id: "todos",       label: "TODOS" },
  { id: "matematicas", label: "MATEMÁTICAS" },
  { id: "cs",          label: "CS" },
  { id: "economia",    label: "ECONOMÍA" },
]

const LENS_OPTIONS: { id: LensId; label: string }[] = [
  { id: "cs",         label: "Ciencias de la Computación" },
  { id: "ingenieria", label: "Ingeniería" },
  { id: "finanzas",   label: "Finanzas" },
  { id: "datos",      label: "Ciencia de Datos" },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function GraphPage() {
  const [area,       setArea]       = useState<AreaId>("todos")
  const [lens,       setLens]       = useState<LensId>("cs")
  const [lensOpen,   setLensOpen]   = useState(false)
  const [hoveredId,  setHoveredId]  = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = selectedId ? (NODE_MAP.get(selectedId) ?? null) : null
  const currentLens = LENS_OPTIONS.find(l => l.id === lens)!.label

  const isActive = (n: GNode) => area === "todos" || n.area === area

  function nodeFill(n: GNode): string {
    if (!isActive(n)) return "#F5F5F5"
    if (n.isCore || hoveredId === n.id || selectedId === n.id) return "#FF6B35"
    return "#FFFFFF"
  }

  // Prerequisitos y desbloqueos del nodo seleccionado
  const prereqs  = selected ? EDGES.filter(e => e.to   === selected.id).map(e => NODE_MAP.get(e.from)?.label).filter(Boolean) : []
  const unlocks  = selected ? EDGES.filter(e => e.from === selected.id).map(e => NODE_MAP.get(e.to)?.label).filter(Boolean)   : []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-7xl">

          {/* ── Page header ── */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <h1 className="bg-accent px-4 py-1.5 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground">
              GRAFO DE CONOCIMIENTO
            </h1>
            <span className="font-mono text-xs text-muted-foreground">
              {NODES.length} nodos · {EDGES.length} conexiones
            </span>
          </div>

          {/* ── Controls bar ── */}
          <div className="brutalist-border mb-4 flex flex-wrap items-center justify-between gap-3 bg-background px-5 py-3">

            {/* Area filter */}
            <div className="flex">
              {AREA_FILTERS.map(({ id, label }, i) => (
                <button
                  key={id}
                  onClick={() => setArea(id)}
                  className={[
                    "brutalist-border-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide transition-colors",
                    i !== 0 ? "-ml-[2px]" : "",
                    area === id
                      ? "bg-accent text-accent-foreground"
                      : "bg-background text-foreground hover:bg-secondary",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5">

              {/* Lens dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLensOpen(v => !v)}
                  className="brutalist-border flex items-center gap-2 bg-background px-4 py-2 font-sans text-sm transition-colors hover:bg-secondary"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    LENTE
                  </span>
                  <span className="font-sans text-sm font-semibold">{currentLens}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${lensOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {lensOpen && (
                  <div className="absolute left-0 top-[calc(100%+3px)] z-20 w-full min-w-[240px] brutalist-border brutalist-shadow bg-background">
                    {LENS_OPTIONS.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => { setLens(id); setLensOpen(false) }}
                        className={[
                          "block w-full px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-secondary",
                          lens === id ? "bg-secondary font-semibold" : "",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="hidden items-center gap-4 font-mono text-xs text-muted-foreground sm:flex">
                <span className="flex items-center gap-1.5">
                  <span className="brutalist-border-2 inline-block h-3 w-3 bg-foreground" />
                  Canonical
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="brutalist-border-2 inline-block h-3 w-3 bg-background" />
                  Draft
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="brutalist-border-2 inline-block h-3 w-3 bg-accent" />
                  Core
                </span>
              </div>
            </div>
          </div>

          {/* ── Graph + Side panel ── */}
          <div className="flex">

            {/* SVG container */}
            <div className="brutalist-border brutalist-shadow flex-1 overflow-hidden bg-secondary">
              <svg
                viewBox="0 0 880 490"
                className="w-full"
                style={{ display: "block", height: "auto" }}
                preserveAspectRatio="xMidYMid meet"
                aria-label="Grafo de conocimiento de NODUS"
              >
                <defs>
                  {/* Arrowhead marker for active connections */}
                  <marker
                    id="arrow-active"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#0A0A0A" />
                  </marker>
                  {/* Arrowhead marker for dimmed connections */}
                  <marker
                    id="arrow-dim"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#0A0A0A" opacity="0.25" />
                  </marker>
                </defs>

                {/* ── Edges (drawn first, below nodes) ── */}
                {EDGES.map((edge, i) => {
                  const src = NODE_MAP.get(edge.from)
                  const tgt = NODE_MAP.get(edge.to)
                  if (!src || !tgt) return null

                  const bothActive  = isActive(src) && isActive(tgt)
                  const highlighted = hoveredId === edge.from  || hoveredId === edge.to
                                   || selectedId === edge.from || selectedId === edge.to

                  return (
                    <path
                      key={i}
                      d={edgePath(src, tgt)}
                      fill="none"
                      stroke="#0A0A0A"
                      strokeWidth={highlighted ? 2 : 1.5}
                      opacity={bothActive ? (highlighted ? 0.9 : 0.45) : 0.1}
                      markerEnd={bothActive ? "url(#arrow-active)" : "url(#arrow-dim)"}
                      className="transition-all duration-200"
                    />
                  )
                })}

                {/* ── Nodes (drawn on top of edges) ── */}
                {NODES.map((node) => {
                  const active   = isActive(node)
                  const fill     = nodeFill(node)
                  const isSelected = selectedId === node.id

                  return (
                    <g
                      key={node.id}
                      opacity={active ? 1 : 0.28}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedId(isSelected ? null : node.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Hard drop shadow */}
                      <rect
                        x={node.x + 4}
                        y={node.y + 4}
                        width={node.w}
                        height={node.h}
                        fill="#0A0A0A"
                      />
                      {/* Node body */}
                      <rect
                        x={node.x}
                        y={node.y}
                        width={node.w}
                        height={node.h}
                        fill={fill}
                        stroke="#0A0A0A"
                        strokeWidth={isSelected ? 4 : 3}
                      />
                      {/* Node label */}
                      <text
                        x={node.x + node.w / 2}
                        y={node.y + node.h / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="12.5"
                        fontWeight="600"
                        fill="#0A0A0A"
                        fontFamily="'Source Sans 3', system-ui, sans-serif"
                        style={{ pointerEvents: "none", userSelect: "none" }}
                      >
                        {node.label}
                      </text>
                      {/* Draft dot: small gray circle top-right */}
                      {node.status === "draft" && (
                        <circle
                          cx={node.x + node.w - 7}
                          cy={node.y + 7}
                          r={4}
                          fill="#737373"
                          stroke="#0A0A0A"
                          strokeWidth={1.5}
                        />
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* ── Side panel ── */}
            <div className="brutalist-border -ml-[3px] w-[290px] shrink-0 bg-background p-5">
              {selected ? (
                <div className="flex h-full flex-col">

                  {/* Status badge + close */}
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 font-mono text-xs font-bold uppercase ${
                        selected.isCore
                          ? "bg-accent text-accent-foreground"
                          : selected.status === "canonical"
                            ? "bg-foreground text-background"
                            : "brutalist-border-2 bg-secondary text-muted-foreground"
                      }`}
                    >
                      {selected.isCore ? "CORE" : selected.status}
                    </span>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Cerrar panel"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Node identity */}
                  <p className="font-mono text-xs text-muted-foreground">{selected.id}</p>
                  <h2 className="mt-1 font-serif text-2xl font-medium leading-tight">
                    {selected.label}
                  </h2>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{selected.meta}</p>

                  {/* Description */}
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                    {selected.description}
                  </p>

                  {/* Connections summary */}
                  <div className="mt-5 space-y-3">
                    {prereqs.length > 0 && (
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          Requiere
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {prereqs.map((label, i) => (
                            <span key={i} className="brutalist-border-2 bg-secondary px-2 py-0.5 font-mono text-xs">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {prereqs.length === 0 && (
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          Requiere
                        </span>
                        <p className="mt-1 font-sans text-xs italic text-muted-foreground">
                          Nodo raíz — sin prerequisitos
                        </p>
                      </div>
                    )}
                    {unlocks.length > 0 && (
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          Desbloquea
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {unlocks.map((label, i) => (
                            <span key={i} className="brutalist-border-2 bg-secondary px-2 py-0.5 font-mono text-xs">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={`/nodo/${selected.id}`}
                    className="brutalist-border mt-auto block w-full bg-accent py-3 text-center font-sans text-sm font-bold transition-opacity hover:opacity-90"
                  >
                    Abrir nodo →
                  </a>
                </div>
              ) : (
                /* Empty state */
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                  <div className="brutalist-border-2 flex h-12 w-12 items-center justify-center bg-secondary">
                    <span className="font-sans text-lg font-bold">
                      N<span className="text-accent">●</span>
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">
                      Hacé clic en un nodo para ver su detalle
                    </p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">
                      {NODES.length} nodos · {EDGES.length} conexiones
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
