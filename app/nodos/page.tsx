import Link from "next/link"
import { Navigation } from "@/components/nodus/navigation"
import { Footer } from "@/components/nodus/footer"
import { nodeData, schoolsLight } from "@/lib/graph-data"

export const metadata = {
  title: "Todos los nodos — NODUS",
  description: "Índice completo de materias organizadas por escuela.",
}

const SCHOOL_ORDER = ["math", "cs", "eng", "biz", "health", "hum"]

function DiffDots({ diff, color }: { diff: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: 9999,
            backgroundColor: i < diff ? color : "transparent",
            border: `1px solid ${color}`,
            opacity: i < diff ? 0.8 : 0.3,
          }}
        />
      ))}
    </div>
  )
}

export default function NodosPage() {
  const nodesBySchool = SCHOOL_ORDER.map(schoolId => {
    const school = schoolsLight.find(s => s.id === schoolId)!
    const nodes  = nodeData
      .filter(n => n.school === schoolId)
      .sort((a, b) => a.ring - b.ring)
    return { school, nodes }
  })

  const totalNodes = nodeData.filter(n => n.id !== "center").length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl space-y-14">

          {/* Header */}
          <div className="flex items-baseline gap-4">
            <h1 className="bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground">
              TODOS LOS NODOS
            </h1>
            <span className="font-mono text-sm text-muted-foreground">
              {totalNodes} materias disponibles
            </span>
          </div>

          {/* School sections */}
          {nodesBySchool.map(({ school, nodes }) => (
            <section key={school.id}>

              {/* School header */}
              <div
                className="mb-5 flex items-center gap-3 border-b-2 border-foreground pb-3"
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: 9999,
                    backgroundColor: school.color,
                    flexShrink: 0,
                  }}
                />
                <h2
                  className="font-mono text-sm font-bold uppercase tracking-widest"
                  style={{ color: school.color }}
                >
                  {school.name}
                </h2>
                <span className="font-mono text-xs text-muted-foreground">
                  {nodes.length} nodos
                </span>
              </div>

              {/* Node cards grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {nodes.map(node => (
                  <div
                    key={node.id}
                    className="brutalist-border brutalist-shadow-sm bg-background p-4 flex flex-col gap-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#0A0A0A] transition-all duration-150"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-medium leading-snug">
                        {node.label}
                      </h3>
                      <DiffDots diff={node.diff} color={school.color} />
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-snug flex-1">
                      {node.desc}
                    </p>

                    <Link
                      href={`/nodo/${node.id}`}
                      className="brutalist-border-2 block w-full py-2 text-center font-sans text-sm font-bold hover:bg-secondary transition-colors"
                      style={{ borderColor: school.color, color: school.color }}
                    >
                      Ver clase →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}

        </div>
      </main>

      <Footer />
    </div>
  )
}
