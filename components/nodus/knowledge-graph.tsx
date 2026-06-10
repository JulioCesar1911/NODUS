"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGraphEngine, type GraphMode } from "@/hooks/use-graph-engine"
import { nodeData, schoolsLight } from "@/lib/graph-data"

interface Props {
  compact?: boolean
  activeSchool?: string
}

const MODE_LABELS: Record<GraphMode, string> = {
  explore: "EXPLORAR",
  ego:     "EGO",
  ruta:    "RUTA",
}

const SCHOOL_LABELS: Record<string, string> = {
  math:   "MATEMÁTICAS",
  cs:     "COMPUTACIÓN",
  eng:    "INGENIERÍA",
  biz:    "NEGOCIOS",
  health: "SALUD",
  hum:    "HUMANIDADES",
}

// Nodes sorted by school order then ring, excluding center
const DEST_NODES = schoolsLight
  .flatMap(s => nodeData.filter(n => n.school === s.id).sort((a, b) => a.ring - b.ring))

export function KnowledgeGraph({ compact = false, activeSchool }: Props) {
  const [isDark, setIsDark]                     = useState(false)
  const [activeMode, setActiveMode]             = useState<GraphMode>("explore")
  const [selectedEgoId, setSelectedEgoId]       = useState<string | null>(null)
  const [selectedDestId, setSelectedDestId]     = useState<string | null>(null)
  // panelId: the node shown in the detail panel — works across all three modes
  const [panelId, setPanelId]                   = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const root = document.documentElement
    setIsDark(root.classList.contains("dark"))
    const observer = new MutationObserver(() => setIsDark(root.classList.contains("dark")))
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  function handleNodeClick(id: string) {
    if (id === "center") return
    if (compact) {
      router.push(`/nodo/${id}`)
      return
    }
    if (activeMode === "explore") {
      // Toggle: clicking same node closes the panel
      setPanelId(prev => prev === id ? null : id)
    } else if (activeMode === "ego") {
      // Toggle ego; panel always follows ego selection
      const isToggleOff = selectedEgoId === id
      setSelectedEgoId(isToggleOff ? null : id)
      setPanelId(isToggleOff ? null : id)
    } else if (activeMode === "ruta") {
      // Clicking a path node opens/toggles the detail panel, independent of route
      setPanelId(prev => prev === id ? null : id)
    }
  }

  // Close the detail panel. In EGO mode also clears the ego selection.
  function handlePanelClose() {
    if (activeMode === "ego") setSelectedEgoId(null)
    setPanelId(null)
  }

  function handleModeChange(newMode: GraphMode) {
    setActiveMode(newMode)
    setSelectedEgoId(null)
    setSelectedDestId(null)
    setPanelId(null)
  }

  const { canvasRef, tooltipData, tooltipPosition, tooltipVisible, legendItems, noRoutePath } =
    useGraphEngine(isDark, handleNodeClick, activeSchool, activeMode, selectedEgoId, selectedDestId)

  const panelNode   = panelId ? nodeData.find(n => n.id === panelId) : null
  const panelSchool = panelNode ? schoolsLight.find(s => s.id === panelNode.school) : null

  return (
    <div className="brutalist-border brutalist-shadow bg-background">

      {/* Mode switcher — full mode only */}
      {!compact && (
        <div
          className="flex flex-wrap items-center gap-3 p-3"
          style={{ borderBottom: "2px solid #0A0A0A" }}
        >
          <div className="flex">
            {(["explore", "ego", "ruta"] as GraphMode[]).map((m, i) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={[
                  "px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer",
                  i !== 0 ? "-ml-[2px]" : "",
                  activeMode === m
                    ? "brutalist-border bg-accent text-accent-foreground z-10 relative"
                    : "brutalist-border-2 bg-background text-foreground hover:bg-secondary",
                ].join(" ")}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>

          {/* Volver — EGO mode with selection */}
          {activeMode === "ego" && selectedEgoId && (
            <button
              onClick={handlePanelClose}
              className="brutalist-border-2 bg-background px-4 py-2 font-sans text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer"
            >
              ← Volver
            </button>
          )}
        </div>
      )}

      {/* RUTA destination picker */}
      {!compact && activeMode === "ruta" && (
        <div
          className="flex flex-wrap items-center gap-3 px-3 py-2"
          style={{ borderBottom: "2px solid #0A0A0A" }}
        >
          <select
            value={selectedDestId ?? ""}
            onChange={e => setSelectedDestId(e.target.value || null)}
            className="flex-1 min-w-0 brutalist-border-2 bg-background font-sans text-sm px-3 py-2 cursor-pointer"
          >
            <option value="">Seleccionar destino…</option>
            {schoolsLight.map(school => {
              const nodes = DEST_NODES.filter(n => n.school === school.id)
              if (nodes.length === 0) return null
              return (
                <optgroup key={school.id} label={SCHOOL_LABELS[school.id] ?? school.id}>
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.label}</option>
                  ))}
                </optgroup>
              )
            })}
          </select>

          {selectedDestId && (
            <button
              onClick={() => { setSelectedDestId(null); setPanelId(null) }}
              className="brutalist-border-2 bg-background px-4 py-2 font-sans text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer whitespace-nowrap"
            >
              ← Volver
            </button>
          )}

          {selectedDestId && noRoutePath && (
            <p className="w-full font-mono text-xs text-muted-foreground">
              Este nodo no tiene prerequisitos desde el centro.
            </p>
          )}
        </div>
      )}

      {/* Canvas wrapper */}
      <div
        className="relative overflow-hidden"
        style={{ height: compact ? 450 : 600 }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        {/* Hover tooltip */}
        {tooltipVisible && tooltipData && (
          <div
            style={{
              position:      "absolute",
              left:          tooltipPosition.x,
              top:           tooltipPosition.y,
              border:        `2px solid ${tooltipData.schoolColor}`,
              pointerEvents: "none",
              maxWidth:      220,
              zIndex:        10,
            }}
            className="bg-background brutalist-shadow-sm p-3"
          >
            <p className="font-serif text-base font-medium leading-tight">
              {tooltipData.label}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              {tooltipData.school}
              {tooltipData.diff > 0 && <span className="ml-1">· dif. {tooltipData.diff}</span>}
            </p>
            <p className="font-sans text-sm mt-1.5 leading-snug">{tooltipData.desc}</p>
            {tooltipData.prereqs.length > 0 && (
              <p className="font-mono text-xs text-muted-foreground mt-2">
                {"← "}{tooltipData.prereqs.join(", ")}
              </p>
            )}
            {tooltipData.unlocks.length > 0 && (
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                {"→ "}{tooltipData.unlocks.join(", ")}
              </p>
            )}
            <div
              style={{
                marginTop:  8,
                paddingTop: 8,
                borderTop:  "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize:   10,
                  color:      tooltipData.schoolColor,
                }}
              >
                Click para abrir clase →
              </span>
            </div>
          </div>
        )}

        {/* Legend (full mode only) */}
        {!compact && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {legendItems.map(item => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  style={{
                    display:         "inline-block",
                    width:           8,
                    height:          8,
                    borderRadius:    9999,
                    backgroundColor: item.color,
                    flexShrink:      0,
                  }}
                />
                <span className="font-mono text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail panel — full mode, all three modes */}
      {!compact && panelNode && panelSchool && (
        <div className="brutalist-border-2 border-t-0 bg-background p-5">
          <div className="flex items-start gap-4">

            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-muted-foreground">
                NODE_ID: {panelNode.id.toUpperCase()}
              </p>
              <h3 className="font-serif text-xl font-medium mt-0.5">
                {panelNode.label}
              </h3>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                {panelNode.desc}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    style={{
                      display:         "inline-block",
                      width:           8,
                      height:          8,
                      borderRadius:    9999,
                      backgroundColor: panelSchool.color,
                      flexShrink:      0,
                    }}
                  />
                  <span className="font-mono text-xs" style={{ color: panelSchool.color }}>
                    {panelSchool.name}
                  </span>
                </div>

                {panelNode.diff > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-xs text-muted-foreground">dif.</span>
                    {Array.from({ length: panelNode.diff }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          display:         "inline-block",
                          width:           6,
                          height:          6,
                          borderRadius:    9999,
                          backgroundColor: panelSchool.color,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => router.push(`/nodo/${panelNode.id}`)}
                className="brutalist-border brutalist-shadow bg-accent px-5 py-2.5 font-sans text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                Abrir clase →
              </button>
              <button
                onClick={handlePanelClose}
                className="brutalist-border-2 bg-background px-5 py-2 font-sans text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer whitespace-nowrap"
              >
                Cerrar ×
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
