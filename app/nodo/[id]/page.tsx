import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/nodus/navigation"
import { Footer } from "@/components/nodus/footer"
import { nodeData, schoolsLight } from "@/lib/graph-data"
import { nodeContent } from "@/lib/node-content"

export function generateStaticParams() {
  return nodeData.map(n => ({ id: n.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const node = nodeData.find(n => n.id === id)
  if (!node) return {}
  return {
    title: `${node.label} — NODUS`,
    description: node.desc,
  }
}

export default async function NodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const node = nodeData.find(n => n.id === id)
  if (!node) notFound()

  const content = nodeContent[node.id]
  const school  = schoolsLight.find(s => s.id === node.school)
  const schoolColor = school?.color ?? "#0A0A0A"
  const schoolName  = school?.name ?? node.school.toUpperCase()

  const nodeMap     = new Map(nodeData.map(n => [n.id, n]))
  const prereqNodes = node.prereqs
    .map(pid => nodeMap.get(pid))
    .filter((n): n is NonNullable<typeof n> => n !== undefined && n.id !== "center")

  const unlocksNodes = nodeData.filter(n => n.prereqs.includes(node.id))

  const sameSchool = nodeData
    .filter(n => n.school === node.school && n.id !== node.id)
    .sort((a, b) => a.ring - b.ring)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <span>›</span>
            {school && (
              <>
                <Link href="/nodos" className="hover:text-foreground transition-colors">{schoolName}</Link>
                <span>›</span>
              </>
            )}
            <span className="text-foreground">{node.label}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="mb-3">
              <span className="bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent-foreground">
                {schoolName}
              </span>
            </div>
            <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight">
              {node.label}
            </h1>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              NODE_ID: {node.id} · Dificultad {node.diff}/5
              {school && <> · {schoolName}</>}
            </p>
            {node.school !== "center" && (
              <div className="mt-4 h-1" style={{ backgroundColor: schoolColor }} />
            )}
          </div>

          {/* Two-column layout */}
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

            {/* ── Left: content ── */}
            <div className="space-y-12">

              {content ? (
                <>
                  {/* ¿Qué es? */}
                  <section>
                    <h2 className="mb-4 inline-block bg-accent px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-accent-foreground">
                      ¿QUÉ ES?
                    </h2>
                    <p className="font-serif text-xl leading-relaxed">{content.summary}</p>
                  </section>

                  {/* Conceptos clave */}
                  <section>
                    <h2 className="mb-4 inline-block bg-accent px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-accent-foreground">
                      CONCEPTOS CLAVE
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {content.concepts.map((c, i) => (
                        <div key={i} className="brutalist-border brutalist-shadow-sm bg-background p-4">
                          <div className="font-sans text-sm font-bold uppercase tracking-wide">
                            {c.name}
                          </div>
                          <div className="my-2 h-px bg-border" />
                          <div className="font-sans text-sm text-muted-foreground">{c.def}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* ¿Para qué sirve? */}
                  <section>
                    <h2 className="mb-4 inline-block bg-accent px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-accent-foreground">
                      ¿PARA QUÉ SIRVE?
                    </h2>
                    <p className="font-sans leading-relaxed">{content.why}</p>
                  </section>

                  {/* Ejemplo concreto */}
                  <section>
                    <h2 className="mb-4 inline-block bg-foreground px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider text-background">
                      EJEMPLO CONCRETO
                    </h2>
                    <div className="brutalist-border bg-secondary p-5">
                      <p className="font-serif text-lg italic leading-relaxed">
                        <span
                          className="mr-2 font-sans not-italic font-bold"
                          style={{ color: "#FF6B35" }}
                        >
                          →
                        </span>
                        {content.example}
                      </p>
                    </div>
                  </section>

                  {/* Lo más difícil */}
                  <section>
                    <h2 className="mb-4 inline-block brutalist-border-2 bg-secondary px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider">
                      LO MÁS DIFÍCIL
                    </h2>
                    <div className="brutalist-border-2 bg-background p-4">
                      <p className="font-sans text-muted-foreground">
                        <span className="mr-2 font-bold" style={{ color: "#FF6B35" }}>⚠</span>
                        {content.difficulty_note}
                      </p>
                    </div>
                  </section>
                </>
              ) : (
                <div className="brutalist-border bg-secondary p-8 text-center">
                  <p className="font-serif text-2xl">Contenido en construcción</p>
                  <p className="mt-3 font-sans text-muted-foreground">
                    Este nodo aún no tiene contenido educativo completo. ¿Querés contribuir?
                  </p>
                  <Link
                    href="/contribuir"
                    className="mt-6 inline-block brutalist-border brutalist-shadow bg-accent px-6 py-3 font-sans font-bold hover:opacity-90 transition-opacity"
                  >
                    Contribuir →
                  </Link>
                </div>
              )}

            </div>

            {/* ── Right: sidebar ── */}
            <aside className="space-y-5">

              {/* Prerequisites */}
              <div className="brutalist-border brutalist-shadow-sm bg-background p-4">
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                  PREREQUISITOS
                </h3>
                {prereqNodes.length === 0 ? (
                  <p className="font-sans text-sm italic text-muted-foreground">
                    Punto de partida — no necesitás nada previo
                  </p>
                ) : (
                  <div className="space-y-2">
                    {prereqNodes.map(prereq => {
                      const ps = schoolsLight.find(s => s.id === prereq.school)
                      return (
                        <div
                          key={prereq.id}
                          className="brutalist-border-2 p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              style={{
                                display: "inline-block",
                                width: 8,
                                height: 8,
                                borderRadius: 9999,
                                backgroundColor: ps?.color ?? "#0A0A0A",
                                flexShrink: 0,
                              }}
                            />
                            <span className="font-sans text-sm font-semibold truncate">
                              {prereq.label}
                            </span>
                          </div>
                          <Link
                            href={`/nodo/${prereq.id}`}
                            className="font-mono text-sm text-accent hover:underline ml-2 shrink-0"
                          >
                            Ver →
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Unlocks */}
              {unlocksNodes.length > 0 && (
                <div className="brutalist-border brutalist-shadow-sm bg-background p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
                      ESTO DESBLOQUEA
                    </h3>
                    <span className="font-bold" style={{ color: "#FF6B35" }}>→</span>
                  </div>
                  <div className="space-y-2">
                    {unlocksNodes.map(unlock => {
                      const us = schoolsLight.find(s => s.id === unlock.school)
                      return (
                        <div
                          key={unlock.id}
                          className="brutalist-border-2 p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              style={{
                                display: "inline-block",
                                width: 8,
                                height: 8,
                                borderRadius: 9999,
                                backgroundColor: us?.color ?? "#0A0A0A",
                                flexShrink: 0,
                              }}
                            />
                            <span className="font-sans text-sm font-semibold truncate">
                              {unlock.label}
                            </span>
                          </div>
                          <Link
                            href={`/nodo/${unlock.id}`}
                            className="font-mono text-sm text-accent hover:underline ml-2 shrink-0"
                          >
                            Ver →
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Same school */}
              {sameSchool.length > 0 && (
                <div className="brutalist-border brutalist-shadow-sm bg-background p-4">
                  <h3 className="mb-1 font-mono text-xs font-bold uppercase tracking-wider">
                    EN ESTA ESCUELA
                  </h3>
                  <p
                    className="mb-3 font-mono text-xs font-bold"
                    style={{ color: schoolColor }}
                  >
                    {schoolName}
                  </p>
                  <div className="space-y-2">
                    {sameSchool.map(sn => (
                      <Link
                        key={sn.id}
                        href={`/nodo/${sn.id}`}
                        className="block brutalist-border-2 p-2 font-sans text-sm font-semibold hover:bg-secondary transition-colors"
                      >
                        {sn.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to graph */}
              <Link
                href="/grafo"
                className="block w-full brutalist-border bg-background py-3 text-center font-sans font-bold hover:bg-secondary transition-colors"
              >
                ← Ver en el grafo
              </Link>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
