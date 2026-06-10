"use client"

import { useState } from "react"
import { Navigation } from "@/components/nodus/navigation"

// ─── Types ────────────────────────────────────────────────────────────────────

type LensId  = "cs" | "ingenieria" | "finanzas" | "datos"
type Estado  = "completado" | "en-progreso" | "bloqueado"

interface NodoRuta {
  id:          string
  orden:       number
  titulo:      string
  descripcion: string
  meta:        string
  estado:      Estado
  opcional?:   boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NODOS: NodoRuta[] = [
  {
    id: "calc1", orden: 1,
    titulo: "Cálculo I",
    descripcion: "Límites, derivadas e integrales. El punto de partida de toda disciplina cuantitativa.",
    meta: "calc1 · Nivel 1 · 4 créditos",
    estado: "completado",
  },
  {
    id: "linalg", orden: 2,
    titulo: "Álgebra Lineal",
    descripcion: "Vectores, matrices y transformaciones lineales. Lenguaje nativo del Machine Learning.",
    meta: "linalg · Nivel 1 · 4 créditos",
    estado: "completado",
  },
  {
    id: "calc2", orden: 3,
    titulo: "Cálculo II",
    descripcion: "Series de Taylor, integrales múltiples e introducción a ecuaciones diferenciales.",
    meta: "calc2 · Nivel 2 · 4 créditos",
    estado: "completado",
  },
  {
    id: "prob", orden: 4,
    titulo: "Probabilidad",
    descripcion: "Variables aleatorias, distribuciones continuas y cadenas de Markov. En curso.",
    meta: "prob · Nivel 2 · 3 créditos",
    estado: "en-progreso",
  },
  {
    id: "stats", orden: 5,
    titulo: "Estadística Básica",
    descripcion: "Inferencia estadística, pruebas de hipótesis y regresión lineal.",
    meta: "stats · Nivel 2 · 3 créditos",
    estado: "bloqueado",
  },
  {
    id: "data-str", orden: 6,
    titulo: "Estructuras de Datos",
    descripcion: "Árboles, grafos, tablas hash y análisis de complejidad algorítmica.",
    meta: "data-str · Nivel 3 · 4 créditos",
    estado: "bloqueado",
  },
  {
    id: "ml", orden: 7,
    titulo: "Machine Learning",
    descripcion: "Regresión, clasificación, redes neuronales básicas y metodología de validación.",
    meta: "ml · Nivel 3 · 4 créditos",
    estado: "bloqueado",
  },
  {
    id: "calc3", orden: 8,
    titulo: "Optimización",
    descripcion: "Descenso de gradiente, métodos de optimización convexa y sus aplicaciones en ML.",
    meta: "calc3 · Nivel 3 · 3 créditos",
    estado: "bloqueado",
    opcional: true,
  },
]

const LENTES: { id: LensId; label: string }[] = [
  { id: "cs",         label: "CS" },
  { id: "ingenieria", label: "Ingeniería" },
  { id: "finanzas",   label: "Finanzas" },
  { id: "datos",      label: "Datos" },
]

const CONTRIBUIDORES = [
  { iniciales: "JM", nombre: "julio_m",   rol: "guardián",  pct: 42 },
  { iniciales: "LS", nombre: "luisa_sv",  rol: "editor",    pct: 33 },
  { iniciales: "EG", nombre: "enrique_g", rol: "aportante", pct: 25 },
]

const COMPLETADOS = NODOS.filter(n => n.estado === "completado").length   // 3
const TOTAL       = NODOS.length                                           // 8
const PROGRESO    = Math.round((COMPLETADOS / TOTAL) * 100)                // 37

// ─── Sub-components ───────────────────────────────────────────────────────────

function CirculoOrden({ orden, estado }: { orden: number; estado: Estado }) {
  const completado  = estado === "completado"
  const enProgreso  = estado === "en-progreso"

  return (
    <div
      className={[
        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center font-mono text-sm font-bold brutalist-border",
        completado ? "bg-accent text-accent-foreground" : "bg-foreground text-background",
        enProgreso ? "ring-2 ring-offset-1 ring-accent" : "",
      ].join(" ")}
    >
      {completado ? "✓" : orden}
    </div>
  )
}

function BadgeEstado({ estado }: { estado: Estado }) {
  if (estado === "completado")
    return (
      <span className="bg-foreground px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-background">
        ✓ COMPLETADO
      </span>
    )
  if (estado === "en-progreso")
    return (
      <span className="bg-accent px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-accent-foreground">
        EN PROGRESO
      </span>
    )
  return (
    <span className="brutalist-border-2 bg-secondary px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
      BLOQUEADO
    </span>
  )
}

function BotonAccion({ estado, id }: { estado: Estado; id: string }) {
  if (estado === "bloqueado")
    return (
      <button
        disabled
        className="brutalist-border-2 w-full cursor-not-allowed bg-secondary py-2 font-sans text-sm font-semibold text-muted-foreground opacity-50"
      >
        Requiere anterior
      </button>
    )
  if (estado === "en-progreso")
    return (
      <a
        href={`/nodo/${id}`}
        className="brutalist-border block w-full bg-accent py-2 text-center font-sans text-sm font-bold transition-opacity hover:opacity-90"
      >
        Continuar →
      </a>
    )
  return (
    <a
      href={`/nodo/${id}`}
      className="brutalist-border block w-full bg-secondary py-2 text-center font-sans text-sm font-semibold transition-colors hover:bg-background"
    >
      Repasar nodo →
    </a>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RutaPage() {
  const [lente, setLente] = useState<LensId>("cs")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-7xl">

          {/* ── Route header ── */}
          <header className="brutalist-border brutalist-shadow mb-8 bg-background p-8">
            <div className="mb-4">
              <span className="bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground">
                RUTA DE APRENDIZAJE
              </span>
            </div>
            <h1 className="font-serif text-5xl font-medium tracking-tight">
              Fundamentos Matemáticos
            </h1>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {TOTAL} nodos · ~40 horas estimadas · 127 estudiantes siguiendo esta ruta
            </p>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  PROGRESO
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {COMPLETADOS}/{TOTAL} nodos
                </span>
              </div>
              <div className="brutalist-border relative h-7 overflow-hidden bg-secondary">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${PROGRESO}%` }}
                />
                <span className="absolute inset-0 flex items-center px-3 font-mono text-xs font-bold">
                  {PROGRESO}% completado
                </span>
              </div>
            </div>
          </header>

          {/* ── Two-column layout ── */}
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

            {/* ── Left: Vertical timeline ── */}
            <section>
              <h2 className="mb-6 inline-block bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground">
                SECUENCIA DE NODOS
              </h2>

              {/* Timeline container */}
              <div className="relative">
                {/* Vertical connecting line */}
                <div
                  className="absolute inset-y-0 w-[2px] bg-foreground"
                  style={{ left: "19px" }}
                />

                <div className="space-y-6">
                  {NODOS.map((nodo) => (
                    <div
                      key={nodo.id}
                      className={[
                        "relative flex items-start gap-5",
                        nodo.estado === "bloqueado" ? "opacity-50" : "",
                      ].join(" ")}
                    >
                      {/* Order circle */}
                      <CirculoOrden orden={nodo.orden} estado={nodo.estado} />

                      {/* Card */}
                      <div
                        className={[
                          "flex-1 bg-background p-5 transition-all duration-200",
                          nodo.estado === "bloqueado"
                            ? "brutalist-border-2"
                            : nodo.estado === "en-progreso"
                              ? "brutalist-border brutalist-shadow"
                              : "brutalist-border brutalist-shadow-sm",
                          nodo.estado !== "bloqueado"
                            ? "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#0A0A0A]"
                            : "",
                          nodo.opcional ? "border-dashed" : "",
                        ].join(" ")}
                        style={nodo.opcional ? { borderStyle: "dashed", borderWidth: "2px" } : {}}
                      >
                        {/* Card header */}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <BadgeEstado estado={nodo.estado} />
                            {nodo.opcional && (
                              <span className="brutalist-border-2 bg-secondary px-2 py-0.5 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                                OPCIONAL
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs text-muted-foreground">
                            {nodo.orden}/{TOTAL}
                          </span>
                        </div>

                        {/* Title & description */}
                        <h3 className="mt-3 font-serif text-xl font-medium leading-tight">
                          {nodo.titulo}
                        </h3>
                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted-foreground">
                          {nodo.descripcion}
                        </p>

                        {/* Metadata */}
                        <p className="mt-3 font-mono text-xs text-muted-foreground">
                          {nodo.meta}
                        </p>

                        {/* Action button */}
                        <div className="mt-4">
                          <BotonAccion estado={nodo.estado} id={nodo.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Right: Sidebar ── */}
            <aside className="space-y-0">

              {/* Lente activa */}
              <div className="brutalist-border bg-background p-5">
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                  LENTE ACTIVA
                </h3>
                <div className="flex flex-col gap-0">
                  {LENTES.map((l, i) => (
                    <button
                      key={l.id}
                      onClick={() => setLente(l.id)}
                      className={[
                        "brutalist-border-2 py-2.5 font-sans text-sm font-semibold transition-colors",
                        i !== 0 ? "-mt-[2px]" : "",
                        lente === l.id
                          ? "bg-accent text-accent-foreground"
                          : "bg-background text-foreground hover:bg-secondary",
                      ].join(" ")}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tu progreso */}
              <div className="brutalist-border -mt-[3px] bg-background p-5">
                <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider">
                  TU PROGRESO
                </h3>
                <div className="grid grid-cols-2 gap-[2px]">
                  {[
                    { valor: "3/8",  etiqueta: "Nodos completados" },
                    { valor: "~12h", etiqueta: "Tiempo invertido" },
                    { valor: "4",    etiqueta: "Días de racha" },
                    { valor: "#23",  etiqueta: "Posición en ruta" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className={[
                        "brutalist-border-2 bg-secondary p-4 text-center",
                        i === 0 ? "bg-accent" : "",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "font-mono text-2xl font-bold leading-none",
                          i === 0 ? "text-accent-foreground" : "",
                        ].join(" ")}
                      >
                        {stat.valor}
                      </div>
                      <div
                        className={[
                          "mt-1.5 font-sans text-xs leading-tight",
                          i === 0 ? "text-accent-foreground" : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {stat.etiqueta}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contribuidores */}
              <div className="brutalist-border -mt-[3px] bg-background p-5">
                <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider">
                  CONTRIBUIDORES DE ESTA RUTA
                </h3>
                <div className="space-y-4">
                  {CONTRIBUIDORES.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="brutalist-border-2 flex h-10 w-10 shrink-0 items-center justify-center bg-secondary font-sans text-sm font-bold">
                        {c.iniciales}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-sans text-sm font-semibold">
                          {c.nombre}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {c.pct}% del contenido · {c.rol}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="brutalist-border mt-5 w-full bg-background py-2.5 font-sans text-sm font-semibold transition-colors hover:bg-secondary">
                  Aportar a esta ruta →
                </button>
              </div>

              {/* Mini-graph placeholder */}
              <div className="brutalist-border -mt-[3px] bg-secondary p-5">
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                  NODOS DE ESTA RUTA
                </h3>
                <div className="space-y-1.5">
                  {NODOS.map((nodo) => (
                    <div key={nodo.id} className="flex items-center gap-2">
                      <span
                        className={[
                          "brutalist-border-2 flex h-5 w-5 shrink-0 items-center justify-center font-mono text-[10px] font-bold",
                          nodo.estado === "completado"
                            ? "bg-accent text-accent-foreground"
                            : nodo.estado === "en-progreso"
                              ? "bg-foreground text-background"
                              : "bg-background text-muted-foreground",
                        ].join(" ")}
                      >
                        {nodo.estado === "completado" ? "✓" : nodo.orden}
                      </span>
                      <span
                        className={[
                          "font-sans text-xs",
                          nodo.estado === "bloqueado" ? "text-muted-foreground" : "text-foreground font-semibold",
                        ].join(" ")}
                      >
                        {nodo.titulo}
                      </span>
                      {nodo.opcional && (
                        <span className="ml-auto font-mono text-[10px] text-muted-foreground">opt.</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
