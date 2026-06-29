import { supabase } from "./supabase"
import { schoolsLight, schoolsDark } from "./graph-data"

export interface NodeDatum {
  id: string
  label: string
  desc: string
  school: string
  ring: number
  angle: number
  diff: number
  prereqs: string[]
}

export interface NodeContent {
  summary: string
  concepts: Array<{ name: string; def: string }>
  why: string
  example: string
  difficulty_note: string
}

let cachedNodes: NodeDatum[] | null = null

export async function fetchNodeData(): Promise<NodeDatum[]> {
  if (cachedNodes) return cachedNodes

  try {
    const { data: nodes, error } = await supabase
      .from("nodes")
      .select("*")
      .eq("estado", "published")

    if (error) throw error
    if (!nodes) return []

    const nodeMap = new Map(nodes.map((n: any) => [n.id, n]))

    const { data: edges, error: edgesError } = await supabase
      .from("node_edges")
      .select("*")

    if (edgesError) throw edgesError

    const prereqMap = new Map<string, string[]>()
    if (edges) {
      edges.forEach((edge: any) => {
        if (!prereqMap.has(edge.target_id)) {
          prereqMap.set(edge.target_id, [])
        }
        prereqMap.get(edge.target_id)!.push(edge.source_id)
      })
    }

    const result: NodeDatum[] = nodes.map((n: any) => ({
      id: n.id,
      label: n.label,
      desc: n.description,
      school: n.school,
      ring: n.ring,
      angle: n.angle,
      diff: n.difficulty || 0,
      prereqs: prereqMap.get(n.id) || [],
    }))

    cachedNodes = result
    return result
  } catch (error) {
    console.error("Error fetching node data:", error)
    return []
  }
}

export async function getNodeContent(nodeId: string): Promise<NodeContent | null> {
  try {
    const { data, error } = await supabase
      .from("node_content")
      .select("*")
      .eq("node_id", nodeId)
      .single()

    if (error) throw error
    if (!data) return null

    return {
      summary: data.summary,
      concepts: data.concepts || [],
      why: data.why,
      example: data.example,
      difficulty_note: data.difficulty_note,
    }
  } catch (error) {
    console.error("Error fetching node content:", error)
    return null
  }
}

export async function getNodeEdges(): Promise<Array<{ source: string; target: string }>> {
  try {
    const { data, error } = await supabase.from("node_edges").select("*")

    if (error) throw error
    if (!data) return []

    return data.map((edge: any) => ({
      source: edge.source_id,
      target: edge.target_id,
    }))
  } catch (error) {
    console.error("Error fetching node edges:", error)
    return []
  }
}

export function getSchoolsLight() {
  return schoolsLight
}

export function getSchoolsDark() {
  return schoolsDark
}
