"use client"

import { useRef, useState, useEffect } from "react"
import { schoolsDark, schoolsLight } from "@/lib/graph-data"
import type { School } from "@/lib/graph-data"
import type { NodeDatum } from "@/lib/data"

// ─── Types ────────────────────────────────────────────────────────────────────

export type GraphMode = "explore" | "ego" | "ruta"

export type TooltipData = {
  label: string
  school: string
  schoolColor: string
  diff: number
  desc: string
  prereqs: string[]
  unlocks: string[]
}

export type LegendItem = { id: string; name: string; color: string }

type ComputedNode = NodeDatum & { x: number; y: number; w: number; h: number }

type Edge = { from: ComputedNode; to: ComputedNode }

// ─── Constants ────────────────────────────────────────────────────────────────

const SCHOOL_FILTER_MAP: Record<string, string> = {
  "MATEMÁTICAS": "math",
  "CS":          "cs",
  "INGENIERÍA":  "eng",
  "NEGOCIOS":    "biz",
  "SALUD":       "health",
  "HUMANIDADES": "hum",
}

const CX = 380
const CY = 340
const ACCENT    = "#FF6B35"
const ACCENT_FG = "#0A0A0A"

// ─── Geometry ─────────────────────────────────────────────────────────────────

function computeNodes(nodes: NodeDatum[]): ComputedNode[] {
  return nodes.map(n => {
    if (n.ring === 0) return { ...n, x: CX, y: CY, w: 66, h: 32 }
    const r = n.ring * 95
    const a = (n.angle - 90) * (Math.PI / 180)
    return {
      ...n,
      x: CX + Math.cos(a) * r,
      y: CY + Math.sin(a) * r,
      w: Math.max(n.label.length * 6.5 + 22, 78),
      h: 28,
    }
  })
}

function buildEdges(nodes: ComputedNode[]): Edge[] {
  const map = new Map(nodes.map(n => [n.id, n]))
  const edges: Edge[] = []
  for (const node of nodes) {
    for (const prereqId of node.prereqs) {
      const prereq = map.get(prereqId)
      if (prereq) edges.push({ from: prereq, to: node })
    }
  }
  return edges
}

// ─── BFS path (RUTA mode) ─────────────────────────────────────────────────────

function computeRoutePath(destId: string, nodes: NodeDatum[]): { ids: Set<string>; ordered: string[] } {
  const nodeMap = new Map(nodes.map(n => [n.id, n]))
  const queue: Array<{ id: string; path: string[] }> = [{ id: destId, path: [destId] }]
  const visited = new Set<string>([destId])

  while (queue.length > 0) {
    const { id, path } = queue.shift()!
    if (id === "center") {
      const ordered = [...path].reverse()
      return { ids: new Set(ordered), ordered }
    }
    const node = nodeMap.get(id)
    if (!node) continue
    for (const prereqId of node.prereqs) {
      if (!visited.has(prereqId)) {
        visited.add(prereqId)
        queue.push({ id: prereqId, path: [...path, prereqId] })
      }
    }
  }
  return { ids: new Set(), ordered: [] }
}

// ─── Visible set helper ───────────────────────────────────────────────────────

function getVisibleSet(
  mode: GraphMode,
  selectedEgoId: string | null,
  routePathIds: Set<string>,
  nodes: ComputedNode[],
): Set<string> | null {
  if (mode === "ego" && selectedEgoId) {
    const egoNode = nodes.find(n => n.id === selectedEgoId)
    if (egoNode) {
      const prereqIds = new Set(egoNode.prereqs)
      const unlockIds = new Set(
        nodes.filter(n => n.prereqs.includes(selectedEgoId)).map(n => n.id),
      )
      return new Set([selectedEgoId, ...prereqIds, ...unlockIds])
    }
  } else if (mode === "ruta" && routePathIds.size > 0) {
    return routePathIds
  }
  return null
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGraphEngine(
  isDark: boolean,
  nodes: NodeDatum[],
  onNodeClick?: (nodeId: string) => void,
  activeSchool?: string,
  mode: GraphMode = "explore",
  selectedEgoId: string | null = null,
  selectedDestId: string | null = null,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tooltipData, setTooltipData]       = useState<TooltipData | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [noRoutePath, setNoRoutePath]       = useState(false)

  const stateRef = useRef({
    zoom: 0.52,
    panX: 108,
    panY: 20,
    hoveredId:    null as string | null,
    isPanning:    false,
    mouseDownX:   0,
    mouseDownY:   0,
    hasDragged:   false,
    rafId:        0,
    nodes:        [] as ComputedNode[],
    edges:        [] as Edge[],
    schools:      [] as School[],
    isDark:       false,
    onNodeClick:  null as ((id: string) => void) | null,
    mode:         "explore" as GraphMode,
    selectedEgoId: null as string | null,
    routePathIds:    new Set<string>(),
    routePathOrdered: [] as string[],
  })

  const hasInitialized = useRef(false)

  // Keep these fresh without re-running the main effect
  stateRef.current.onNodeClick   = onNodeClick ?? null
  stateRef.current.mode          = mode
  stateRef.current.selectedEgoId = selectedEgoId

  // Recompute BFS path when destination or mode changes
  useEffect(() => {
    if (mode === "ruta" && selectedDestId) {
      const result = computeRoutePath(selectedDestId, nodes)
      stateRef.current.routePathIds    = result.ids
      stateRef.current.routePathOrdered = result.ordered
      setNoRoutePath(result.ids.size === 0)
    } else {
      stateRef.current.routePathIds    = new Set()
      stateRef.current.routePathOrdered = []
      setNoRoutePath(false)
    }
  }, [mode, selectedDestId, nodes])

  const legendItems: LegendItem[] = (isDark ? schoolsDark : schoolsLight).map(s => ({
    id:    s.id,
    name:  s.name,
    color: s.color,
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const st = stateRef.current
    st.isDark   = isDark
    st.schools  = isDark ? schoolsDark : schoolsLight
    st.nodes    = computeNodes(nodes)
    st.edges    = buildEdges(st.nodes)

    const dpr = window.devicePixelRatio || 1
    const ctx  = canvas.getContext("2d")!

    function resizeCanvas() {
      const cw = canvas!.offsetWidth  || 680
      const ch = canvas!.offsetHeight || 520
      canvas!.width  = cw * dpr
      canvas!.height = ch * dpr
      ctx.scale(dpr, dpr)
      if (!hasInitialized.current) {
        st.panX = cw / 2 - CX * st.zoom
        st.panY = ch / 2 - CY * st.zoom
        hasInitialized.current = true
      }
    }

    resizeCanvas()

    const ro = new ResizeObserver(resizeCanvas)
    ro.observe(canvas)

    const activeId = (activeSchool && activeSchool !== "TODOS")
      ? (SCHOOL_FILTER_MAP[activeSchool] ?? null)
      : null

    // ── Render ──────────────────────────────────────────────────────────────

    function render() {
      const {
        zoom, panX, panY, hoveredId, nodes, edges, schools, isDark: dark,
        mode: currentMode, selectedEgoId: egoId,
        routePathIds, routePathOrdered,
      } = st

      const W = canvas!.offsetWidth
      const H = canvas!.offsetHeight

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = dark ? "#0A0A0A" : "#FFFFFF"
      ctx.fillRect(0, 0, W, H)

      ctx.save()
      ctx.translate(panX, panY)
      ctx.scale(zoom, zoom)

      // Guide rings
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
      ctx.lineWidth   = 0.5 / zoom
      for (let ring = 1; ring <= 5; ring++) {
        ctx.beginPath()
        ctx.arc(CX, CY, ring * 95, 0, Math.PI * 2)
        ctx.stroke()
      }

      // School sectors
      for (const school of schools) {
        const a     = (school.angle - 90) * (Math.PI / 180)
        const start = a - (36 * Math.PI) / 180
        const end   = a + (36 * Math.PI) / 180
        const maxR  = 490
        const grad  = ctx.createRadialGradient(CX, CY, 0, CX, CY, maxR)
        grad.addColorStop(0, "rgba(0,0,0,0)")
        grad.addColorStop(1, school.color + "10")
        ctx.beginPath()
        ctx.moveTo(CX, CY)
        ctx.arc(CX, CY, maxR, start, end)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Visibility set for current mode
      const visibleSet = getVisibleSet(currentMode, egoId, routePathIds, nodes)

      // Connected set for hover dimming (explore mode only, no active visibleSet)
      const connectedIds = new Set<string>()
      if (hoveredId && !visibleSet) {
        connectedIds.add(hoveredId)
        for (const e of edges) {
          if (e.from.id === hoveredId) connectedIds.add(e.to.id)
          if (e.to.id   === hoveredId) connectedIds.add(e.from.id)
        }
        connectedIds.add("center")
      }

      // Destination school color for RUTA edges
      let destSchoolColor = ACCENT
      if (currentMode === "ruta" && routePathOrdered.length > 0) {
        const destNode = nodes.find(n => n.id === routePathOrdered[routePathOrdered.length - 1])
        if (destNode) {
          destSchoolColor = schools.find(s => s.id === destNode.school)?.color ?? ACCENT
        }
      }

      // ── Edges ───────────────────────────────────────────────────────────────

      for (const edge of edges) {
        const { from, to } = edge

        // Skip edges with an invisible endpoint
        if (visibleSet && (!visibleSet.has(from.id) || !visibleSet.has(to.id))) continue

        const x1 = from.x, y1 = from.y, x2 = to.x, y2 = to.y
        const dx = x2 - x1, dy = y2 - y1
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
        const cpx = mx - dy * 0.1, cpy = my + dx * 0.1

        const isActive  = !visibleSet && hoveredId && (from.id === hoveredId || to.id === hoveredId)
        const toSchool  = schools.find(s => s.id === to.school)
        const edgeColor = toSchool?.color ?? "#0A0A0A"

        // strokeColor is tracked separately so the arrowhead can reuse it
        let strokeColor: string
        if (currentMode === "ruta" && visibleSet) {
          strokeColor     = destSchoolColor
          ctx.lineWidth   = 2.5 / zoom
          ctx.globalAlpha = 1
        } else if (currentMode === "ego" && visibleSet) {
          // School color of the to-node: ego school for incoming, unlocked school for outgoing
          strokeColor     = edgeColor
          ctx.lineWidth   = 1.5 / zoom
          ctx.globalAlpha = 1
        } else if (isActive) {
          strokeColor     = edgeColor
          ctx.lineWidth   = 2 / zoom
          ctx.globalAlpha = 1
        } else {
          strokeColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
          ctx.lineWidth   = 0.7 / zoom
          if (hoveredId && !visibleSet) {
            ctx.globalAlpha = 0.25
          } else if (activeId && !visibleSet && from.school !== activeId && to.school !== activeId) {
            ctx.globalAlpha = 0.15
          } else {
            ctx.globalAlpha = 1
          }
        }
        ctx.strokeStyle = strokeColor

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.quadraticCurveTo(cpx, cpy, x2, y2)
        ctx.stroke()

        // Arrowhead on every drawn edge — points toward `to` (the prereq consumer)
        const isEgoEdge  = currentMode === "ego" && !!egoId && !!visibleSet
        const arrowLen   = (isEgoEdge ? 13 : 10) / zoom
        const arrowHalfW = (isEgoEdge ?  7 :  6) / zoom / 2

        // Tangent direction at endpoint: from control point toward (x2, y2)
        const tx = x2 - cpx, ty = y2 - cpy
        const tl = Math.sqrt(tx * tx + ty * ty)
        if (tl > 0) {
          const nx = tx / tl, ny = ty / tl

          // Place tip just before the target node's border
          const toIsEgo   = isEgoEdge && to.id === egoId
          const toHalfH   = (toIsEgo ? to.h + 8 : to.h) / 2
          const tipOffset = (toHalfH + 6) / zoom
          const tipX = x2 - nx * tipOffset
          const tipY = y2 - ny * tipOffset

          ctx.fillStyle = strokeColor
          ctx.beginPath()
          ctx.moveTo(tipX, tipY)
          ctx.lineTo(tipX - nx * arrowLen - ny * arrowHalfW, tipY - ny * arrowLen + nx * arrowHalfW)
          ctx.lineTo(tipX - nx * arrowLen + ny * arrowHalfW, tipY - ny * arrowLen - nx * arrowHalfW)
          ctx.closePath()
          ctx.fill()
        }

        ctx.globalAlpha = 1
      }

      // ── Nodes ───────────────────────────────────────────────────────────────

      for (const node of nodes) {
        const isHovered = node.id === hoveredId
        const isCenter  = node.id === "center"
        const isEgo     = currentMode === "ego" && node.id === egoId
        const school    = schools.find(s => s.id === node.school)
        const color     = school?.color ?? "#0A0A0A"

        // Ego node is rendered larger
        const nw = isEgo ? node.w + 16 : node.w
        const nh = isEgo ? node.h + 8  : node.h
        const hw = nw / 2, hh = nh / 2
        const nx = node.x - hw, ny = node.y - hh

        // Opacity
        if (visibleSet) {
          ctx.globalAlpha = visibleSet.has(node.id) ? 1 : 0.08
        } else if (hoveredId && !isCenter) {
          ctx.globalAlpha = connectedIds.has(node.id) ? 1 : 0.2
        } else if (activeId && !isCenter && node.school !== activeId) {
          ctx.globalAlpha = 0.15
        }

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.1)"
        ctx.fillRect(nx + 3, ny + 3, nw, nh)

        // Body
        if (isCenter) {
          ctx.fillStyle   = dark ? "#1A1A1A" : "#FFFFFF"
          ctx.fillRect(nx, ny, nw, nh)
          ctx.strokeStyle = dark ? "#FFFFFF" : "#0A0A0A"
          ctx.lineWidth   = 2.5 / zoom
          ctx.strokeRect(nx, ny, nw, nh)
        } else if (isEgo) {
          ctx.fillStyle   = color
          ctx.fillRect(nx, ny, nw, nh)
          ctx.strokeStyle = dark ? "#FFFFFF" : "#0A0A0A"
          ctx.lineWidth   = 3 / zoom
          ctx.strokeRect(nx, ny, nw, nh)
        } else if (isHovered || node.diff <= 2) {
          ctx.fillStyle = color
          ctx.fillRect(nx, ny, nw, nh)
        } else {
          ctx.fillStyle   = dark ? "#1A1A1A" : "#FFFFFF"
          ctx.fillRect(nx, ny, nw, nh)
          ctx.strokeStyle = color
          ctx.lineWidth   = 1.5 / zoom
          ctx.strokeRect(nx, ny, nw, nh)
        }

        // Label
        const solidFill = !isCenter && (isHovered || isEgo || node.diff <= 2)
        ctx.fillStyle    = solidFill ? "#FFFFFF" : (dark ? "#FFFFFF" : "#0A0A0A")
        ctx.font         = "500 9.5px Inter, sans-serif"
        ctx.textAlign    = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, node.x, node.y)

        // Difficulty dots (explore mode only)
        if (!isCenter && !visibleSet) {
          for (let d = 0; d < node.diff; d++) {
            const spacing = 5
            const totalW  = (node.diff - 1) * spacing
            const dotX    = node.x - totalW / 2 + d * spacing
            const dotY    = node.y + hh + 5
            ctx.beginPath()
            ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2)
            ctx.fillStyle   = color
            ctx.globalAlpha = 0.5
            ctx.fill()
          }
        }

        ctx.globalAlpha = 1

        // RUTA mode: step badge
        if (currentMode === "ruta" && visibleSet?.has(node.id)) {
          const stepIndex = routePathOrdered.indexOf(node.id)
          if (stepIndex >= 0) {
            const badgeR = 8 / zoom
            const bx     = nx
            const by     = ny
            ctx.globalAlpha = 1
            // Badge circle
            ctx.fillStyle = ACCENT
            ctx.beginPath()
            ctx.arc(bx, by, badgeR, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = dark ? "#0A0A0A" : "#FFFFFF"
            ctx.lineWidth   = 1 / zoom
            ctx.stroke()
            // Step number
            ctx.fillStyle    = ACCENT_FG
            ctx.font         = `bold ${8 / zoom}px "JetBrains Mono", monospace`
            ctx.textAlign    = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(String(stepIndex + 1), bx, by)
          }
        }

        ctx.globalAlpha = 1
      }

      // Faculty labels at outer radius
      for (const school of schools) {
        const a  = (school.angle - 90) * (Math.PI / 180)
        const lx = CX + Math.cos(a) * 490
        const ly = CY + Math.sin(a) * 490
        ctx.font         = '600 10px "JetBrains Mono", monospace'
        ctx.textAlign    = "center"
        ctx.textBaseline = "middle"
        ctx.globalAlpha  = 0.4
        ctx.fillStyle    = school.color
        ctx.fillText(school.name, lx, ly)
        ctx.globalAlpha  = 1
      }

      ctx.restore()
      st.rafId = requestAnimationFrame(render)
    }

    render()

    // ── Hit testing ─────────────────────────────────────────────────────────

    function worldXY(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      return { mx, my, wx: (mx - st.panX) / st.zoom, wy: (my - st.panY) / st.zoom }
    }

    function hitNode(wx: number, wy: number): ComputedNode | null {
      for (let i = st.nodes.length - 1; i >= 0; i--) {
        const n  = st.nodes[i]
        const nw = (st.mode === "ego" && n.id === st.selectedEgoId) ? n.w + 16 : n.w
        const nh = (st.mode === "ego" && n.id === st.selectedEgoId) ? n.h + 8  : n.h
        if (wx >= n.x - nw / 2 && wx <= n.x + nw / 2 &&
            wy >= n.y - nh / 2 && wy <= n.y + nh / 2) return n
      }
      return null
    }

    // ── Mouse events ─────────────────────────────────────────────────────────

    function onMouseMove(e: MouseEvent) {
      const { mx, my, wx, wy } = worldXY(e)

      if (st.isPanning) {
        st.panX += e.movementX
        st.panY += e.movementY
        const dx = e.clientX - st.mouseDownX
        const dy = e.clientY - st.mouseDownY
        if (Math.sqrt(dx * dx + dy * dy) > 4) st.hasDragged = true
        return
      }

      const hit    = hitNode(wx, wy)
      let   newId  = hit?.id ?? null

      // Suppress hover for invisible nodes in ego/ruta mode
      const curVS = getVisibleSet(st.mode, st.selectedEgoId, st.routePathIds, st.nodes)
      if (curVS && newId && !curVS.has(newId)) newId = null

      if (newId !== st.hoveredId) {
        st.hoveredId = newId
        canvas!.style.cursor = newId ? "pointer" : "default"

        if (newId && hit) {
          const nodeMap = new Map(st.nodes.map(n => [n.id, n]))
          const school  = st.schools.find(s => s.id === hit.school)
          const prereqLabels = hit.prereqs
            .map(pid => nodeMap.get(pid)?.label ?? pid)
            .filter(l => l !== "NODUS")
          const unlocks = st.nodes
            .filter(n => n.prereqs.includes(newId!))
            .map(n => n.label)

          setTooltipData({
            label:       hit.label,
            school:      school?.name ?? hit.school,
            schoolColor: school?.color ?? "#0A0A0A",
            diff:        hit.diff,
            desc:        hit.desc,
            prereqs:     prereqLabels,
            unlocks,
          })
          setTooltipPosition({ x: mx + 14, y: my - 8 })
          setTooltipVisible(true)
        } else {
          setTooltipVisible(false)
        }
      } else if (newId) {
        setTooltipPosition({ x: mx + 14, y: my - 8 })
      }
    }

    function onMouseDown(e: MouseEvent) {
      if (e.button === 0) {
        st.isPanning  = true
        st.hasDragged = false
        st.mouseDownX = e.clientX
        st.mouseDownY = e.clientY
        canvas!.style.cursor = "grabbing"
      }
    }

    function onMouseUp(e: MouseEvent) {
      if (!st.hasDragged) {
        const rect = canvas!.getBoundingClientRect()
        const mx   = e.clientX - rect.left
        const my   = e.clientY - rect.top
        const wx   = (mx - st.panX) / st.zoom
        const wy   = (my - st.panY) / st.zoom
        const hit  = hitNode(wx, wy)

        if (hit && st.onNodeClick) {
          if (st.mode === "ruta") {
            // only path nodes are clickable
            if (st.routePathIds.has(hit.id)) {
              st.onNodeClick(hit.id)
            }
          } else if (st.mode === "ego") {
            // ignore clicks on invisible nodes
            const vs = getVisibleSet(st.mode, st.selectedEgoId, st.routePathIds, st.nodes)
            if (!vs || vs.has(hit.id)) {
              st.onNodeClick(hit.id)
            }
          } else {
            st.onNodeClick(hit.id)
          }
        }
      }
      st.isPanning  = false
      st.hasDragged = false
      canvas!.style.cursor = st.hoveredId ? "pointer" : "default"
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const rect    = canvas!.getBoundingClientRect()
      const mx      = e.clientX - rect.left
      const my      = e.clientY - rect.top
      const factor  = e.deltaY < 0 ? 1.1 : 0.9
      const newZoom = Math.min(4, Math.max(0.25, st.zoom * factor))
      st.panX = mx - (mx - st.panX) * (newZoom / st.zoom)
      st.panY = my - (my - st.panY) * (newZoom / st.zoom)
      st.zoom = newZoom
    }

    function onMouseLeave() {
      st.isPanning  = false
      st.hasDragged = false
      st.hoveredId  = null
      setTooltipVisible(false)
      canvas!.style.cursor = "default"
    }

    // Separate window handler: only cancels panning when mouse is released
    // outside the canvas. Must NOT call onNodeClick — the canvas listener
    // already handles clicks and this would fire a second time via bubbling.
    function onWindowMouseUp() {
      if (st.isPanning) {
        st.isPanning  = false
        st.hasDragged = false
        canvas!.style.cursor = st.hoveredId ? "pointer" : "default"
      }
    }

    canvas.addEventListener("mousemove",  onMouseMove)
    canvas.addEventListener("mousedown",  onMouseDown)
    canvas.addEventListener("mouseup",    onMouseUp)
    canvas.addEventListener("wheel",      onWheel, { passive: false })
    canvas.addEventListener("mouseleave", onMouseLeave)
    window.addEventListener("mouseup",    onWindowMouseUp)

    return () => {
      cancelAnimationFrame(st.rafId)
      ro.disconnect()
      canvas.removeEventListener("mousemove",  onMouseMove)
      canvas.removeEventListener("mousedown",  onMouseDown)
      canvas.removeEventListener("mouseup",    onMouseUp)
      canvas.removeEventListener("wheel",      onWheel)
      canvas.removeEventListener("mouseleave", onMouseLeave)
      window.removeEventListener("mouseup",    onWindowMouseUp)
    }
  }, [isDark, activeSchool, nodes])

  return { canvasRef, tooltipData, tooltipPosition, tooltipVisible, legendItems, noRoutePath }
}
