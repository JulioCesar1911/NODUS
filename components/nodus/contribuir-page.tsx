"use client"

import { Fragment, useState } from "react"
import { Navigation } from "@/components/nodus/navigation"
import { Upload, Cpu, UserCheck } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type LensId = "cs" | "ingenieria" | "finanzas" | "datos" | "general"

// ─── Data ─────────────────────────────────────────────────────────────────────

const NODOS_MVP = [
  { id: "calc1",      label: "Cálculo I" },
  { id: "linalg",     label: "Álgebra Lineal" },
  { id: "calc2",      label: "Cálculo II" },
  { id: "stats",      label: "Estadística Básica" },
  { id: "prob",       label: "Probabilidad" },
  { id: "intro-prog", label: "Intro a Programación" },
  { id: "data-str",   label: "Estructuras de Datos" },
  { id: "micro",      label: "Microeconomía" },
  { id: "comp-arch",  label: "Org. de Computadoras" },
  { id: "ml",         label: "Machine Learning Básico" },
]

const LENTES: { id: LensId; label: string }[] = [
  { id: "cs",         label: "CS" },
  { id: "ingenieria", label: "Ingeniería" },
  { id: "finanzas",   label: "Finanzas" },
  { id: "datos",      label: "Datos" },
  { id: "general",    label: "General" },
]

const STATS = [
  { valor: "2",   label: "nodos con\ncontribuciones activas" },
  { valor: "127", label: "estudiantes\ncontribuyeron" },
  { valor: "CC",  label: "BY-SA 4.0\nlicencia completamente libre" },
]

const PASOS = [
  {
    numero: "01",
    Icono: Upload,
    titulo: "Subís tus apuntes",
    desc: "Markdown, texto plano o LaTeX básico. No importa el formato ni la perfección.",
  },
  {
    numero: "02",
    Icono: Cpu,
    titulo: "La IA analiza y fusiona",
    desc: "Gemini compara tu aporte con el Códice actual e integra las explicaciones más claras.",
  },
  {
    numero: "03",
    Icono: UserCheck,
    titulo: "Tu nombre queda en el nodo",
    desc: "Aparecés como contribuidor permanente de cada nodo que hayas enriquecido.",
  },
]

const ROLES = [
  {
    nivel: "NIVEL 1",
    titulo: "Aportante",
    desc: "Subís apuntes al Códice. El punto de entrada para cualquier estudiante que quiera contribuir al proyecto. Sin requisitos previos.",
    requisito: "Requisito: ninguno",
  },
  {
    nivel: "NIVEL 2",
    titulo: "Editor",
    desc: "Revisás y aprobás fusiones propuestas por la IA. La plataforma te detecta automáticamente por la calidad consistente en tus aportes.",
    requisito: "Requisito: 5+ aportes aceptados",
  },
  {
    nivel: "NIVEL 3",
    titulo: "Guardián",
    desc: "Mantenés la coherencia y exactitud de un nodo a largo plazo. Surge orgánicamente de los editores más activos — no se solicita.",
    requisito: "Requisito: designación de la comunidad",
  },
]

// ─── Input classes (shared) ───────────────────────────────────────────────────

const INPUT_CLASS =
  "brutalist-border w-full bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"

// ─── Success screen ───────────────────────────────────────────────────────────

function Enviado({
  nodoId,
  lente,
  onReset,
}: {
  nodoId: string
  lente: LensId
  onReset: () => void
}) {
  const nodoLabel = NODOS_MVP.find(n => n.id === nodoId)?.label ?? nodoId

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex items-center justify-center px-6 py-24">
        <div className="brutalist-border brutalist-shadow mx-auto w-full max-w-lg bg-background p-10 text-center">
          <div className="brutalist-border mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-accent">
            <UserCheck className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-3xl font-medium">¡Apuntes enviados!</h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
            La IA va a analizar tu aporte en los próximos minutos. Si mejora el Códice
            actual, tu nombre aparecerá como contribuidor permanente.
          </p>
          <div className="brutalist-border-2 mt-5 bg-secondary px-4 py-3">
            <p className="font-mono text-xs text-muted-foreground">
              NODO: {nodoLabel.toUpperCase()} · LENTE: {lente.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onReset}
            className="brutalist-border mt-6 w-full bg-background py-3 font-sans text-sm font-semibold transition-colors hover:bg-secondary"
          >
            ← Contribuir a otro nodo
          </button>
        </div>
      </main>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ContribuirPage() {
  const [nodoId,    setNodoId]    = useState("")
  const [titulo,    setTitulo]    = useState("")
  const [lente,     setLente]     = useState<LensId>("general")
  const [contenido, setContenido] = useState("")
  const [fuentes,   setFuentes]   = useState("")
  const [enviado,   setEnviado]   = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nodoId || !contenido.trim()) return
    setEnviado(true)
  }

  function handleReset() {
    setEnviado(false)
    setNodoId("")
    setTitulo("")
    setContenido("")
    setFuentes("")
    setLente("general")
  }

  if (enviado) {
    return <Enviado nodoId={nodoId} lente={lente} onReset={handleReset} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>

        {/* ── Hero ── */}
        <section className="px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight">
              El conocimiento mejora<br />cuando se comparte
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-xl leading-relaxed text-muted-foreground">
              Tus apuntes pueden convertirse en el Códice definitivo de una materia.
            </p>

            {/* Stats */}
            <div className="brutalist-border brutalist-shadow mt-10 inline-grid grid-cols-3">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className={[
                    "px-8 py-5 text-center",
                    i < STATS.length - 1 ? "border-r-2 border-foreground" : "",
                  ].join(" ")}
                >
                  <div className="font-mono text-3xl font-bold leading-none">
                    {stat.valor}
                  </div>
                  <div className="mt-2 whitespace-pre-line font-sans text-xs leading-relaxed text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form ── */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit} noValidate>
              <div className="brutalist-border brutalist-shadow bg-background p-8">
                <h2 className="mb-8 inline-block bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground">
                  SUBIR APUNTES
                </h2>

                <div className="space-y-7">

                  {/* 1. Nodo */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold">
                      ¿Para qué nodo?
                    </label>
                    <select
                      value={nodoId}
                      onChange={e => setNodoId(e.target.value)}
                      required
                      className={INPUT_CLASS}
                    >
                      <option value="">Seleccioná un nodo...</option>
                      {NODOS_MVP.map(n => (
                        <option key={n.id} value={n.id}>
                          {n.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Título */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold">
                      Título de tus apuntes
                    </label>
                    <input
                      type="text"
                      value={titulo}
                      onChange={e => setTitulo(e.target.value)}
                      placeholder="ej: Resumen completo de límites y continuidad"
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* 3. Lente */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold">
                      Lente de carrera
                    </label>
                    <div className="flex">
                      {LENTES.map((l, i) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => setLente(l.id)}
                          className={[
                            "brutalist-border-2 flex-1 py-2.5 font-sans text-sm font-semibold transition-colors",
                            i !== 0 ? "-ml-[2px]" : "",
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

                  {/* 4. Contenido */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold">
                      Tus apuntes
                    </label>
                    <textarea
                      value={contenido}
                      onChange={e => setContenido(e.target.value)}
                      required
                      placeholder="Pegá tu contenido en Markdown o texto plano..."
                      className={[INPUT_CLASS, "min-h-[300px] resize-none"].join(" ")}
                    />
                    <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                      Aceptamos Markdown, LaTeX básico y texto plano
                    </p>
                  </div>

                  {/* 5. Fuentes */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-semibold">
                      Fuentes utilizadas
                      <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">
                        (opcional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={fuentes}
                      onChange={e => setFuentes(e.target.value)}
                      placeholder="Stewart Cálculo 8va ed., apuntes de clase, etc."
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="brutalist-border brutalist-shadow w-full bg-accent py-4 font-sans text-lg font-bold transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#0A0A0A]"
                    >
                      ENVIAR APUNTES →
                    </button>
                    <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
                      Tu aporte se publica bajo CC BY-SA 4.0 · Tu nombre quedará en los contribuidores
                    </p>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </section>

        {/* ── ¿Qué pasa con tus apuntes? ── */}
        <section className="border-y-2 border-foreground bg-secondary px-6 py-14">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-10 inline-block bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground">
              ¿QUÉ PASA CON TUS APUNTES?
            </h2>
            <div className="flex items-start gap-3">
              {PASOS.map((paso, i) => (
                <Fragment key={paso.numero}>
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-mono text-4xl font-bold leading-none text-accent">
                        {paso.numero}
                      </span>
                      <div className="brutalist-border-2 flex h-10 w-10 shrink-0 items-center justify-center bg-background">
                        <paso.Icono className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="font-sans text-base font-semibold leading-snug">
                      {paso.titulo}
                    </h3>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted-foreground">
                      {paso.desc}
                    </p>
                  </div>
                  {i < PASOS.length - 1 && (
                    <div className="mt-6 shrink-0 font-mono text-2xl font-bold text-muted-foreground">
                      →
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ── Roles de contribución ── */}
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 inline-block bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground">
              ROLES DE CONTRIBUCIÓN
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {ROLES.map((rol, i) => (
                <div
                  key={i}
                  className="brutalist-border brutalist-shadow-sm bg-background p-5 transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#0A0A0A]"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                    {rol.nivel}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-medium">{rol.titulo}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                    {rol.desc}
                  </p>
                  <p className="mt-5 border-t-2 border-foreground pt-3 font-mono text-xs text-muted-foreground">
                    {rol.requisito}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
