"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/nodus/navigation"
import { KnowledgeGraph } from "@/components/nodus/knowledge-graph"
import { fetchNodeData, type NodeDatum } from "@/lib/data"

const AREAS = ["TODOS", "MATEMÁTICAS", "CS", "INGENIERÍA", "NEGOCIOS", "SALUD", "HUMANIDADES"]

export default function GrafoPage() {
  const [active, setActive] = useState("TODOS")
  const [nodes, setNodes] = useState<NodeDatum[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNodes = async () => {
      setIsLoading(true)
      const data = await fetchNodeData()
      setNodes(data)
      setIsLoading(false)
    }
    loadNodes()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 py-10">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Header */}
          <div className="flex items-center gap-4">
            <h1 className="bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground">
              GRAFO DE CONOCIMIENTO
            </h1>
            <span className="font-mono text-sm text-muted-foreground">
              {isLoading ? "Cargando..." : `${nodes.length} nodos`}
            </span>
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-0">
            {AREAS.map((area, i) => (
              <button
                key={area}
                onClick={() => setActive(area)}
                className={[
                  "px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide transition-colors",
                  i !== 0 ? "-ml-[2px]" : "",
                  active === area
                    ? "brutalist-border bg-accent text-accent-foreground font-bold z-10 relative"
                    : "brutalist-border-2 bg-background text-foreground hover:bg-secondary",
                ].join(" ")}
              >
                {area}
              </button>
            ))}
          </div>

          {/* Graph */}
          <KnowledgeGraph compact={false} activeSchool={active} />

        </div>
      </main>
    </div>
  )
}
