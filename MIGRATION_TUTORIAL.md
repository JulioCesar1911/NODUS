# NODUS Supabase Migration Tutorial

## Overview
This document explains the migration of NODUS from hardcoded data files to a live Supabase PostgreSQL database, including what changed, why, and how it works.

## The Problem (Before)

### Original Architecture
The NODUS frontend originally stored all data in static TypeScript files:
- `lib/graph-data.ts` — 500+ lines of node definitions
- `lib/node-content.ts` — 1000+ lines of educational content

```typescript
// Old approach
const nodeData = [
  { id: "calc1", label: "Cálculo I", ring: 1, angle: 30, ... },
  { id: "calc2", label: "Cálculo II", ring: 2, angle: 45, ... },
  // ...hundreds more lines
]
```

### Issues
1. **Static content** — Any change required code deployment
2. **No data persistence** — New contributions weren't saved
3. **Scalability** — Large files bloat the bundle
4. **Not dynamic** — Can't distinguish published vs draft content
5. **Difficult updates** — Manual edits to TypeScript objects prone to errors

## The Solution (After)

### New Architecture: Supabase
We moved to **Supabase PostgreSQL** with Row Level Security (RLS):

```
┌─────────────────────┐
│   Browser/App       │
│  (Client-side)      │
└──────────┬──────────┘
           │ NEXT_PUBLIC_SUPABASE_ANON_KEY
           │ (Public, safe to commit)
           ▼
┌─────────────────────────────┐
│  Supabase PostgreSQL        │
│  - nodes table              │ ◄── RLS: public SELECT on estado='published'
│  - node_content table       │ ◄── RLS: public SELECT allowed
│  - node_edges table         │ ◄── RLS: public SELECT allowed
└─────────────────────────────┘
```

---

## Key Changes Explained

### 1. Supabase Client (`lib/supabase.ts`)

**What it is:** A wrapper that initializes the Supabase JavaScript client

**Code:**
```typescript
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Why:**
- Uses environment variables instead of hardcoding URLs
- `NEXT_PUBLIC_` prefix makes it safe for client-side use
- Single source of truth for Supabase connection

---

### 2. Data Fetching Layer (`lib/data.ts`)

**What it is:** Async functions that fetch data from Supabase tables

**Main functions:**

#### `fetchNodeData()`
Fetches all published nodes with their prerequisite relationships.

```typescript
export async function fetchNodeData(): Promise<NodeDatum[]> {
  // 1. Fetch all published nodes
  const { data: nodes } = await supabase
    .from("nodes")
    .select("*")
    .eq("estado", "published")  // Only published nodes

  // 2. Fetch prerequisite edges
  const { data: edges } = await supabase
    .from("node_edges")
    .select("*")

  // 3. Build prerequisite map from edges
  const prereqMap = new Map<string, string[]>()
  edges?.forEach((edge: any) => {
    if (!prereqMap.has(edge.target_id)) {
      prereqMap.set(edge.target_id, [])
    }
    prereqMap.get(edge.target_id)!.push(edge.source_id)
  })

  // 4. Return formatted nodes with prerequisites
  return nodes.map((n: any) => ({
    id: n.id,
    label: n.label,
    desc: n.description,
    school: n.school,
    ring: n.ring,
    angle: n.angle,
    diff: n.difficulty || 0,
    prereqs: prereqMap.get(n.id) || [],
  }))
}
```

**Why this approach:**
- **Data filtering** — Only published nodes are visible to anonymous users
- **Caching** — Results are cached to avoid repeated requests
- **Structured data** — Prerequisites are fetched separately and merged for efficiency

#### `getNodeContent(nodeId)`
Fetches educational content for a specific node.

```typescript
export async function getNodeContent(nodeId: string): Promise<NodeContent | null> {
  const { data } = await supabase
    .from("node_content")
    .select("*")
    .eq("node_id", nodeId)
    .single()  // Expect exactly one row

  return {
    summary: data.summary,
    concepts: data.concepts || [],
    why: data.why,
    example: data.example,
    difficulty_note: data.difficulty_note,
  }
}
```

**Why:**
- Separates content (often large) from node metadata
- Fetches only when needed (not all nodes at once)
- Uses `.single()` for type safety

---

### 3. Updated Components

#### `components/nodus/knowledge-graph.tsx`

**Before:**
```typescript
import { nodeData } from "@/lib/graph-data"  // Hardcoded import

export function KnowledgeGraph() {
  // Uses nodeData directly
}
```

**After:**
```typescript
import { fetchNodeData } from "@/lib/data"

export function KnowledgeGraph() {
  const [nodes, setNodes] = useState<NodeDatum[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data on mount
  useEffect(() => {
    const loadNodes = async () => {
      setIsLoading(true)
      const data = await fetchNodeData()
      setNodes(data)
      setIsLoading(false)
    }
    loadNodes()
  }, [])

  // Show loading state while fetching
  if (isLoading) {
    return <p>Cargando grafo...</p>
  }

  // Pass nodes to hook (dependency injection)
  useGraphEngine(isDark, nodes, handleNodeClick, ...)
}
```

**Why:**
- **Loading state** — Users see feedback while data loads
- **Dependency injection** — Nodes are passed as a parameter, not imported directly
- **Testable** — Hook can be tested with mock nodes

#### `hooks/use-graph-engine.ts`

**Signature changed:**
```typescript
// Before
useGraphEngine(isDark, onNodeClick?, activeSchool?)

// After
useGraphEngine(isDark, nodes, onNodeClick?, activeSchool?, ...)
```

**Why:**
- **Separation of concerns** — Hook doesn't know where data comes from
- **Flexibility** — Can pass different data sources (Supabase, mock, etc.)
- **Testability** — Easy to test with specific node configurations

---

### 4. Server-Side Pages

#### `app/nodo/[id]/page.tsx`

**Before:**
```typescript
export function generateStaticParams() {
  return nodeData.map(n => ({ id: n.id }))  // Static generation
}

export default function NodePage({ params }) {
  const { id } = await params
  const node = nodeData.find(n => n.id === id)
  const content = nodeContent[node.id]
  // ...
}
```

**After:**
```typescript
// No generateStaticParams — routes are generated on-demand

export default async function NodePage({ params }) {
  const { id } = await params
  const nodes = await fetchNodeData()  // Fetch dynamically
  const node = nodes.find(n => n.id === id)
  const content = await getNodeContent(id)  // Fetch content
  // ...
}
```

**Why:**
- **On-demand rendering** — New nodes from Supabase are immediately available
- **No static generation** — Avoids outdated cached pages
- **Real-time updates** — Content changes are reflected instantly

#### `app/nodos/page.tsx`

Similar pattern: changed from `generateStaticParams()` to server-side async fetching.

---

### 5. Seed Script (`scripts/seed.ts`)

**Purpose:** Initialize Supabase tables with data from the hardcoded files.

**What it does:**
1. Reads `lib/graph-data.ts` (hardcoded node definitions)
2. Inserts nodes into the `nodes` table with `estado: "published"`
3. Inserts prerequisite relationships into `node_edges` table

**Security approach:**
```typescript
const supabaseUrl = process.env.SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabaseSecretKey) {
  console.error("Missing environment variables")
  process.exit(1)
}

// Use SECRET_KEY (admin privileges)
const supabase = createClient(supabaseUrl, supabaseSecretKey)
```

**Why:**
- Uses `SUPABASE_SECRET_KEY` (admin) instead of ANON key
- Never hardcoded — only from `.env.local`
- One-time operation to bootstrap the database

**How to run:**
```bash
SUPABASE_URL=https://... SUPABASE_SECRET_KEY=sb_secret_... npx ts-node scripts/seed.ts
```

---

## Security Model

### Three Key Concepts

#### 1. **Public Keys** (Safe to commit)
```
NEXT_PUBLIC_SUPABASE_URL=https://rfxjdgmfohgnwsxrtzih.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_jzDp_t0MD0RWbtbEThPDjQ_...
```
- Can be seen in browser network requests
- Read-only access to published content
- Used by all clients

#### 2. **Secret Key** (Never commit)
```
SUPABASE_SECRET_KEY=sb_secret_rfxjdgmfohgnwsxrtzih_...
```
- Full admin privileges
- Used ONLY in `.env.local` and server scripts
- Blocked by GitHub secret scanning

#### 3. **Row Level Security (RLS)** Policies
```sql
-- Anyone can SELECT published nodes
CREATE POLICY public_published_nodes ON nodes
  FOR SELECT USING (estado = 'published')

-- Anyone can SELECT content
CREATE POLICY public_content ON node_content
  FOR SELECT USING (true)
```
- Database level enforcement
- No policy = no access (default deny)
- ANON key can only read; never modify

---

## Environment Variables

### Required Files

**`.env.local`** (Never commit)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_your_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=sb_secret_your_key_here
```

**`.env.example`** (Commit to git)
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_your_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=sb_secret_your_key_here
```

---

## Data Flow

### When a user visits `/nodo/calc1`:

```
1. Browser requests https://nodus-beta.vercel.app/nodo/calc1
   ↓
2. Next.js server (Node.js runtime on Vercel)
   ├─ Calls fetchNodeData()
   │  └─ Uses NEXT_PUBLIC_SUPABASE_ANON_KEY
   │     └─ Queries: SELECT * FROM nodes WHERE estado='published'
   │     └─ Returns ~92 nodes
   │
   ├─ Finds node with id="calc1"
   │
   └─ Calls getNodeContent("calc1")
      └─ Queries: SELECT * FROM node_content WHERE node_id='calc1'
         └─ Returns: summary, concepts, examples, etc.
   ↓
3. Renders HTML with content
   ↓
4. Browser receives pre-rendered page (no loading state needed on server render)
```

### When user opens the graph (`/grafo`):

```
1. Browser loads /grafo (client component)
   ↓
2. React mounts KnowledgeGraph
   ├─ Shows "Cargando grafo..." (loading state)
   │
   └─ useEffect calls fetchNodeData()
      └─ Browser-side fetch with ANON_KEY
         └─ Returns ~92 nodes
      └─ Calls useGraphEngine(isDark, nodes, ...)
         └─ Canvas renders with nodes, edges, interactions
   ↓
3. Graph fully interactive
```

---

## Fallback & Backup

### If Supabase is down:

Keep `lib/graph-data.ts` and `lib/node-content.ts` as emergency fallback.

**To activate fallback:**
1. Change `fetchNodeData()` to return hardcoded `nodeData`
2. Change `getNodeContent()` to return from `nodeContent` object
3. Redeploy

---

## Testing Checklist

✅ Hardcoded files (`lib/graph-data.ts`, `lib/node-content.ts`) — keep as backup  
✅ No secrets in git history  
✅ Vercel environment variables set (`NEXT_PUBLIC_SUPABASE_*`)  
✅ Supabase RLS policies created and tested  
✅ Seed script runs without errors  
✅ Pages fetch data and display correctly  
✅ Build succeeds with `npm run build`  
✅ Dev server works with `npm run dev`  

---

## Benefits of This Approach

| Aspect | Before | After |
|--------|--------|-------|
| **Content updates** | Requires code deployment | Instant (update DB) |
| **Data persistence** | Lost with each redeploy | Persistent in PostgreSQL |
| **Scale** | Entire codebase for all nodes | Only needed nodes fetched |
| **Security** | No access control | RLS + anon/admin separation |
| **Real-time** | Static at build time | Dynamic on-demand |
| **Testability** | Hard to mock | Easy to inject data |

---

## Summary

The NODUS migration replaces hardcoded static files with a dynamic Supabase backend:

1. **`lib/supabase.ts`** — Client initialization
2. **`lib/data.ts`** — Async data fetching with Supabase queries
3. **Components** — Fetch data on mount, show loading states, pass data via dependency injection
4. **Server pages** — Async render with data fetched server-side
5. **Security** — RLS policies, secret keys in environment only, no hardcoded credentials

Result: **Live, dynamic, secure, and scalable knowledge graph platform.**
