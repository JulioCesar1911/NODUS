import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="brutalist-border-2 border-b-0 border-l-0 border-r-0 bg-background px-6 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Open Source Badge */}
          <div className="brutalist-border-2 bg-secondary px-3 py-1">
            <span className="font-mono text-xs font-bold">OPEN SOURCE</span>
          </div>
          
          <a 
            href="#" 
            className="font-sans text-sm font-semibold hover:text-accent transition-colors"
          >
            Contribuir
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-sm text-muted-foreground">
            Construido por la comunidad
          </span>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="brutalist-border-2 flex h-10 w-10 items-center justify-center bg-background hover:bg-accent transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
