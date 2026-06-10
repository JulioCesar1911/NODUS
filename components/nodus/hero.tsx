export function Hero() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight md:text-6xl lg:text-7xl text-balance">
          El conocimiento no es{" "}
          <span className="relative inline-block">
            <span className="relative z-10">lineal</span>
            <span className="absolute bottom-2 left-0 right-0 h-4 bg-accent -z-0" />
          </span>
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-xl text-muted-foreground leading-relaxed">
          Explora materias universitarias como una red de conceptos interconectados. 
          Cada nodo se adapta a tu carrera profesional.
        </p>
      </div>
    </section>
  )
}
