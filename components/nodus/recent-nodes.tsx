import { Users } from "lucide-react"

interface RecentNode {
  title: string
  contributors: number
  updatedAt: string
  category: string
}

const recentNodes: RecentNode[] = [
  { 
    title: "Redes Neuronales Convolucionales", 
    contributors: 12, 
    updatedAt: "Hace 2 horas",
    category: "Deep Learning"
  },
  { 
    title: "Teorema de Bayes", 
    contributors: 8, 
    updatedAt: "Hace 5 horas",
    category: "Probabilidad"
  },
  { 
    title: "Árboles de Decisión", 
    contributors: 15, 
    updatedAt: "Ayer",
    category: "Machine Learning"
  },
  { 
    title: "Derivadas Parciales", 
    contributors: 6, 
    updatedAt: "Hace 2 días",
    category: "Cálculo II"
  },
]

export function RecentNodes() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground inline-block">
          NODOS ACTUALIZADOS RECIENTEMENTE
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {recentNodes.map((node, i) => (
            <article 
              key={i} 
              className="brutalist-border brutalist-shadow-sm bg-background p-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#0A0A0A] transition-all duration-200 cursor-pointer"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {node.category}
              </span>
              <h3 className="mt-2 font-serif text-lg font-medium leading-tight">
                {node.title}
              </h3>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="font-mono text-xs">{node.contributors}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {node.updatedAt}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
