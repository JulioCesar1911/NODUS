import { Navigation } from "@/components/nodus/navigation"
import { Hero } from "@/components/nodus/hero"
import { KnowledgeGraph } from "@/components/nodus/knowledge-graph"
import { LearningPaths } from "@/components/nodus/learning-paths"
import { RecentNodes } from "@/components/nodus/recent-nodes"
import { Footer } from "@/components/nodus/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />
        
        {/* Graph + Sidebar Layout */}
        <section className="px-6 pb-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
            <KnowledgeGraph compact={true} />
            <LearningPaths />
          </div>
        </section>

        <RecentNodes />
      </main>

      <Footer />
    </div>
  )
}
