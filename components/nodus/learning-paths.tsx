interface LearningPath {
  title: string
  nodeCount: number
  progress: number
}

const paths: LearningPath[] = [
  { title: "Fundamentos Matemáticos", nodeCount: 8, progress: 62 },
  { title: "Machine Learning Track", nodeCount: 12, progress: 25 },
  { title: "Finanzas Cuantitativas", nodeCount: 10, progress: 0 },
]

export function LearningPaths() {
  return (
    <aside className="brutalist-border brutalist-shadow bg-background p-6">
      <h2 className="mb-6 bg-accent px-3 py-1 font-sans text-sm font-bold uppercase tracking-wider text-accent-foreground inline-block">
        RUTAS DE APRENDIZAJE
      </h2>

      <div className="space-y-6">
        {paths.map((path, i) => (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-sans font-semibold text-foreground">{path.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {path.progress}%
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Progress bar */}
              <div className="flex-1 h-3 bg-secondary brutalist-border-2">
                <div 
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${path.progress}%` }}
                />
              </div>
            </div>

            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {path.nodeCount} nodos
            </p>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full brutalist-border-2 bg-background px-4 py-3 font-sans text-sm font-bold hover:bg-secondary transition-colors">
        + Crear Nueva Ruta
      </button>
    </aside>
  )
}
