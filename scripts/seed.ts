import { createClient } from "@supabase/supabase-js"
import { nodeData, schoolsLight } from "../lib/graph-data"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabaseSecretKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SECRET_KEY environment variables are required")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function seed() {
  console.log("Starting seed...")

  // Seed nodes
  console.log("Seeding nodes...")
  for (const node of nodeData) {
    if (node.id === "center") continue // Skip center node

    const school = schoolsLight.find(s => s.id === node.school)

    const { error } = await supabase.from("nodes").upsert(
      {
        id: node.id,
        label: node.label,
        description: node.desc,
        school: node.school,
        ring: node.ring,
        angle: node.angle,
        difficulty: node.diff,
        estado: "published",
      },
      { onConflict: "id" }
    )

    if (error) {
      console.error(`Error seeding node ${node.id}:`, error)
    }
  }

  // Seed node_edges
  console.log("Seeding edges...")
  for (const node of nodeData) {
    if (node.id === "center" || !node.prereqs || node.prereqs.length === 0) continue

    for (const prereqId of node.prereqs) {
      const { error } = await supabase.from("node_edges").upsert(
        {
          source_id: prereqId,
          target_id: node.id,
        },
        { onConflict: "source_id,target_id" }
      )

      if (error) {
        console.error(`Error seeding edge ${prereqId} -> ${node.id}:`, error)
      }
    }
  }

  console.log("Seed completed!")
}

seed()
