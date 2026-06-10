// Shared graph data — importable from both server components and client hooks

export type School = { id: string; name: string; color: string; angle: number }

export type NodeDatum = {
  id: string
  label: string
  school: string
  ring: number
  angle: number
  diff: number
  prereqs: string[]
  desc: string
  careers: string[]
}

export const schoolsDark: School[] = [
  { id: "math",   name: "MATEMÁTICAS", color: "#FF6B35", angle: 270 },
  { id: "cs",     name: "COMPUTACIÓN", color: "#3B8EEA", angle: 210 },
  { id: "eng",    name: "INGENIERÍA",  color: "#9D6BED", angle: 150 },
  { id: "biz",    name: "NEGOCIOS",    color: "#D4A04A", angle: 30  },
  { id: "health", name: "SALUD",       color: "#34C759", angle: 90  },
  { id: "hum",    name: "HUMANIDADES", color: "#E8577A", angle: 330 },
]

export const schoolsLight: School[] = [
  { id: "math",   name: "MATEMÁTICAS", color: "#E55A20", angle: 270 },
  { id: "cs",     name: "COMPUTACIÓN", color: "#2B72C2", angle: 210 },
  { id: "eng",    name: "INGENIERÍA",  color: "#7B4FBF", angle: 150 },
  { id: "biz",    name: "NEGOCIOS",    color: "#B8860B", angle: 30  },
  { id: "health", name: "SALUD",       color: "#278C39", angle: 90  },
  { id: "hum",    name: "HUMANIDADES", color: "#C24466", angle: 330 },
]

export function getSchoolColor(schoolId: string, isDark = false): string {
  const schools = isDark ? schoolsDark : schoolsLight
  return schools.find(s => s.id === schoolId)?.color ?? "#0A0A0A"
}

export const nodeData: NodeDatum[] = [
  // ── Center ──────────────────────────────────────────────────────────────────
  { id: "center",     label: "NODUS",              school: "center", ring: 0, angle: 0,   diff: 0, prereqs: [],                           desc: "Tu punto de partida",                    careers: ["datos", "medicina", "administracion"] },

  // ── Matemáticas ─────────────────────────────────────────────────────────────
  { id: "algebra",    label: "Álgebra",             school: "math",   ring: 1, angle: 270, diff: 1, prereqs: ["center"],                    desc: "Funciones, ecuaciones, factorización",   careers: ["datos", "administracion"] },
  { id: "calc1",      label: "Cálculo I",           school: "math",   ring: 2, angle: 260, diff: 2, prereqs: ["algebra"],                   desc: "Límites, derivadas, integrales",          careers: ["datos", "medicina", "administracion"] },
  { id: "calc2",      label: "Cálculo II",          school: "math",   ring: 3, angle: 255, diff: 3, prereqs: ["calc1"],                     desc: "Series, integrales múltiples",            careers: ["datos", "medicina"] },
  { id: "calc3",      label: "Cálculo III",         school: "math",   ring: 4, angle: 250, diff: 4, prereqs: ["calc2", "linalg"],           desc: "Optimización multivariable",              careers: ["datos"] },
  { id: "linalg",     label: "Álg. Lineal",         school: "math",   ring: 2, angle: 280, diff: 2, prereqs: ["algebra"],                   desc: "Vectores, matrices, eigenvalores",        careers: ["datos"] },
  { id: "stats",      label: "Estadística",         school: "math",   ring: 2, angle: 290, diff: 2, prereqs: ["calc1"],                     desc: "Distribuciones, inferencia",              careers: ["datos", "medicina", "administracion"] },
  { id: "prob",       label: "Probabilidad",        school: "math",   ring: 3, angle: 278, diff: 3, prereqs: ["calc2", "stats"],            desc: "Variables aleatorias continuas",          careers: ["datos", "medicina"] },
  { id: "diffeq",     label: "Ec. Diferenciales",   school: "math",   ring: 3, angle: 245, diff: 3, prereqs: ["calc2"],                     desc: "EDO, sistemas dinámicos",                 careers: ["datos"] },

  // ── Computación ─────────────────────────────────────────────────────────────
  { id: "intro-prog", label: "Intro Programación",  school: "cs",     ring: 1, angle: 210, diff: 1, prereqs: ["center"],                    desc: "Variables, funciones, loops",             careers: ["datos"] },
  { id: "logic",      label: "Lógica Discreta",     school: "cs",     ring: 2, angle: 200, diff: 2, prereqs: ["intro-prog", "algebra"],     desc: "Proposiciones, conjuntos, grafos",        careers: ["datos"] },
  { id: "data-str",   label: "Estr. de Datos",      school: "cs",     ring: 2, angle: 215, diff: 2, prereqs: ["intro-prog"],                desc: "Árboles, listas, hash maps",              careers: ["datos"] },
  { id: "algo",       label: "Algoritmos",          school: "cs",     ring: 3, angle: 208, diff: 3, prereqs: ["data-str", "logic"],         desc: "Ordenamiento, búsqueda, grafos",          careers: ["datos"] },
  { id: "databases",  label: "Bases de Datos",      school: "cs",     ring: 3, angle: 220, diff: 3, prereqs: ["data-str"],                  desc: "SQL, modelado relacional",                careers: ["datos"] },
  { id: "ml",         label: "Machine Learning",    school: "cs",     ring: 4, angle: 235, diff: 4, prereqs: ["algo", "prob", "linalg"],    desc: "Modelos, entrenamiento, evaluación",      careers: ["datos"] },
  { id: "deep",       label: "Deep Learning",       school: "cs",     ring: 5, angle: 240, diff: 5, prereqs: ["ml", "calc3"],               desc: "Redes neuronales, backprop",              careers: ["datos"] },
  { id: "webdev",     label: "Desarrollo Web",      school: "cs",     ring: 3, angle: 195, diff: 3, prereqs: ["data-str"],                  desc: "Frontend, backend, APIs",                 careers: ["datos"] },
  { id: "data-viz",   label: "Visualización Datos", school: "cs",     ring: 4, angle: 228, diff: 3, prereqs: ["stats", "databases"],        desc: "Gráficos, dashboards, storytelling",      careers: ["datos"] },
  { id: "mlops",      label: "MLOps",               school: "cs",     ring: 5, angle: 232, diff: 4, prereqs: ["ml", "databases", "webdev"], desc: "Deploy, monitoreo de modelos en prod",    careers: ["datos"] },

  // ── Ingeniería ───────────────────────────────────────────────────────────────
  { id: "physics1",   label: "Física I",            school: "eng",    ring: 1, angle: 150, diff: 1, prereqs: ["center"],                    desc: "Mecánica, cinemática, fuerzas",           careers: [] },
  { id: "physics2",   label: "Física II",           school: "eng",    ring: 2, angle: 145, diff: 2, prereqs: ["physics1", "calc1"],         desc: "Electricidad, magnetismo",                careers: [] },
  { id: "circuits",   label: "Circuitos",           school: "eng",    ring: 3, angle: 140, diff: 3, prereqs: ["physics2"],                  desc: "Análisis de circuitos, filtros",          careers: [] },
  { id: "signals",    label: "Señales y Sist.",     school: "eng",    ring: 3, angle: 155, diff: 3, prereqs: ["physics2", "diffeq"],        desc: "Transformadas, frecuencia",               careers: [] },
  { id: "comp-arch",  label: "Arq. Computadoras",   school: "eng",    ring: 3, angle: 168, diff: 3, prereqs: ["physics2", "intro-prog"],    desc: "CPU, memoria, ensamblador",               careers: [] },
  { id: "robotics",   label: "Robótica",            school: "eng",    ring: 4, angle: 148, diff: 4, prereqs: ["signals", "linalg"],         desc: "Control, sensores, actuadores",           careers: [] },

  // ── Negocios ─────────────────────────────────────────────────────────────────
  { id: "micro",      label: "Microeconomía",       school: "biz",    ring: 1, angle: 30,  diff: 1, prereqs: ["center"],                    desc: "Oferta, demanda, mercados",               careers: ["administracion"] },
  { id: "macro",      label: "Macroeconomía",       school: "biz",    ring: 2, angle: 30,  diff: 2, prereqs: ["micro"],                     desc: "PIB, inflación, política",                careers: ["administracion"] },
  { id: "accounting", label: "Contabilidad",        school: "biz",    ring: 2, angle: 50,  diff: 2, prereqs: ["micro"],                     desc: "Balance, estado de resultados",           careers: ["administracion"] },
  { id: "marketing",  label: "Marketing",           school: "biz",    ring: 2, angle: 10,  diff: 2, prereqs: ["micro"],                     desc: "Segmentación, posicionamiento",           careers: ["administracion"] },
  { id: "hrm",        label: "Recursos Humanos",    school: "biz",    ring: 2, angle: 62,  diff: 2, prereqs: ["micro"],                     desc: "Talento, cultura organizacional",         careers: ["administracion"] },
  { id: "fin-corp",   label: "Finanzas Corp.",      school: "biz",    ring: 3, angle: 30,  diff: 3, prereqs: ["accounting", "calc1"],       desc: "Valuación, DCF, WACC",                    careers: ["administracion"] },
  { id: "strategy",   label: "Estrategia",          school: "biz",    ring: 3, angle: 22,  diff: 3, prereqs: ["micro", "accounting"],       desc: "Ventaja competitiva, modelos de negocio", careers: ["administracion"] },
  { id: "operations", label: "Gestión Operaciones", school: "biz",    ring: 3, angle: 55,  diff: 3, prereqs: ["accounting", "stats"],       desc: "Procesos, cadena de suministro",          careers: ["administracion"] },
  { id: "quant",      label: "Finanzas Cuant.",     school: "biz",    ring: 4, angle: 45,  diff: 4, prereqs: ["fin-corp", "prob", "ml"],    desc: "Trading algorítmico, riesgo",             careers: ["administracion", "datos"] },

  // ── Salud ────────────────────────────────────────────────────────────────────
  { id: "bio",        label: "Biología",            school: "health", ring: 1, angle: 90,  diff: 1, prereqs: ["center"],                    desc: "Célula, genética, evolución",             careers: ["medicina"] },
  { id: "anatomy",    label: "Anatomía",            school: "health", ring: 2, angle: 82,  diff: 2, prereqs: ["bio"],                       desc: "Sistemas del cuerpo humano",              careers: ["medicina"] },
  { id: "biochem",    label: "Bioquímica",          school: "health", ring: 2, angle: 98,  diff: 2, prereqs: ["bio", "calc1"],              desc: "Metabolismo, enzimas",                    careers: ["medicina"] },
  { id: "biostats",   label: "Bioestadística",      school: "health", ring: 3, angle: 105, diff: 3, prereqs: ["stats", "bio"],              desc: "Ensayos clínicos, epidemiología",         careers: ["medicina", "datos"] },
  { id: "pharma",     label: "Farmacología",        school: "health", ring: 3, angle: 78,  diff: 3, prereqs: ["biochem", "anatomy"],        desc: "Farmacocinética",                         careers: ["medicina"] },
  { id: "physiology", label: "Fisiología",          school: "health", ring: 3, angle: 72,  diff: 3, prereqs: ["anatomy", "biochem"],        desc: "Función de órganos y sistemas",           careers: ["medicina"] },
  { id: "genetics",   label: "Genética",            school: "health", ring: 3, angle: 112, diff: 3, prereqs: ["bio", "biochem"],            desc: "Herencia, ADN, expresión génica",         careers: ["medicina"] },
  { id: "neuro",      label: "Neurociencia",        school: "health", ring: 4, angle: 88,  diff: 4, prereqs: ["pharma", "signals"],         desc: "Sistema nervioso, cognición",             careers: ["medicina"] },
  { id: "pathology",  label: "Patología",           school: "health", ring: 4, angle: 100, diff: 4, prereqs: ["physiology", "genetics"],    desc: "Mecanismos de enfermedad",                careers: ["medicina"] },

  // ── Humanidades ──────────────────────────────────────────────────────────────
  { id: "philo",      label: "Filosofía",           school: "hum",    ring: 1, angle: 330, diff: 1, prereqs: ["center"],                    desc: "Lógica, ética, metafísica",               careers: [] },
  { id: "ethics",     label: "Ética",               school: "hum",    ring: 2, angle: 325, diff: 2, prereqs: ["philo"],                     desc: "Bioética, ética profesional",             careers: ["medicina", "administracion"] },
  { id: "linguistics",label: "Lingüística",         school: "hum",    ring: 2, angle: 340, diff: 2, prereqs: ["philo"],                     desc: "Sintaxis, semántica, pragmática",         careers: [] },
  { id: "history",    label: "Historia",            school: "hum",    ring: 2, angle: 315, diff: 2, prereqs: ["philo"],                     desc: "Historia moderna, historiografía",        careers: [] },
]
