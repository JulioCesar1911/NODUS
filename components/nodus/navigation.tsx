"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, User } from "lucide-react"
import { nodeData, schoolsLight } from "@/lib/graph-data"

type LensId = "cs" | "ingenieria" | "finanzas" | "datos"

const LENTES: { id: LensId; label: string }[] = [
  { id: "cs",         label: "Ciencias de la Computación" },
  { id: "ingenieria", label: "Ingeniería" },
  { id: "finanzas",   label: "Finanzas" },
  { id: "datos",      label: "Datos / IA" },
]

export function Navigation() {
  const router = useRouter()

  const [query, setQuery]           = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedLens, setSelectedLens] = useState<LensId>("cs")
  const [lensOpen, setLensOpen]     = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("nodus-lente")
    if (stored && LENTES.some(l => l.id === stored)) {
      setSelectedLens(stored as LensId)
    }
  }, [])

  const results = query
    ? nodeData
        .filter(n => n.id !== "center")
        .filter(n =>
          n.label.toLowerCase().includes(query.toLowerCase()) ||
          n.desc.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : []

  function handleLensSelect(id: LensId) {
    setSelectedLens(id)
    localStorage.setItem("nodus-lente", id)
    setLensOpen(false)
  }

  const currentLens = LENTES.find(l => l.id === selectedLens) ?? LENTES[0]

  return (
    <header className="brutalist-border-2 border-t-0 border-l-0 border-r-0 bg-background px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="font-sans text-2xl font-bold tracking-tight">
            N<span className="text-accent">●</span>DUS
          </span>
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSearchOpen(true) }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
            onKeyDown={e => { if (e.key === "Escape") { setSearchOpen(false); setQuery("") } }}
            placeholder="Buscar nodos, conceptos, materias..."
            className="w-full brutalist-border bg-background py-3 pl-12 pr-4 font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {searchOpen && results.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 border-2 border-foreground bg-background shadow-[4px_4px_0_#0A0A0A]">
              {results.map(node => {
                const school = schoolsLight.find(s => s.id === node.school)
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      router.push(`/nodo/${node.id}`)
                      setSearchOpen(false)
                      setQuery("")
                    }}
                    className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left font-sans hover:bg-secondary"
                  >
                    <span className="text-sm font-semibold">{node.label}</span>
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                      {school?.name ?? node.school}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Nav links + Lente + Avatar */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-0">
            <Link
              href="/nodos"
              className="brutalist-border-2 bg-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide hover:bg-secondary transition-colors"
            >
              Nodos
            </Link>
            <Link
              href="/grafo"
              className="brutalist-border-2 -ml-[2px] bg-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide hover:bg-secondary transition-colors"
            >
              Grafo
            </Link>
          </nav>

          {/* Lente selector */}
          <div className="relative">
            <button
              onClick={() => setLensOpen(prev => !prev)}
              onBlur={() => setTimeout(() => setLensOpen(false), 150)}
              className="flex items-center gap-2 border-2 border-accent bg-background px-4 py-2"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">LENTE</span>
              <span className="font-sans text-sm font-semibold">{currentLens.label}</span>
            </button>
            {lensOpen && (
              <div className="absolute right-0 top-full z-50 min-w-full border-2 border-foreground bg-background shadow-[4px_4px_0_#0A0A0A]">
                {LENTES.filter(l => l.id !== selectedLens).map(lens => (
                  <button
                    key={lens.id}
                    onClick={() => handleLensSelect(lens.id)}
                    className="block w-full whitespace-nowrap px-4 py-2 text-left font-sans text-sm font-semibold hover:bg-secondary"
                  >
                    {lens.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="brutalist-border flex h-11 w-11 items-center justify-center bg-background hover:bg-secondary transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
