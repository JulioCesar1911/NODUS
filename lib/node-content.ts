export interface NodeContent {
  summary: string
  concepts: { name: string; def: string }[]
  why: string
  example: string
  difficulty_note: string
}

export const nodeContent: Record<string, NodeContent> = {

  center: {
    summary: "NODUS es una plataforma de aprendizaje que organiza el conocimiento universitario como un grafo de nodos interconectados. En lugar de ver las materias como silos separados, NODUS te muestra cómo el Álgebra conecta con el Cálculo, cómo la Probabilidad alimenta al Machine Learning, y cómo la Física lleva a la Electrónica. La idea es simple: cualquier estudiante puede navegar su carrera con claridad, saber qué aprender primero y entender por qué cada materia importa.",
    concepts: [
      { name: "Grafo de conocimiento", def: "Representación visual donde cada materia es un nodo y las flechas indican prerequisitos." },
      { name: "Prerequisito", def: "Materia que hay que dominar antes de poder abordar otra con éxito." },
      { name: "Escuela", def: "Agrupación de nodos por área temática: Matemáticas, CS, Ingeniería, Negocios, Salud, Humanidades." },
      { name: "Dificultad", def: "Escala del 1 al 5 que refleja la curva de aprendizaje típica de cada materia." },
      { name: "Códice colectivo", def: "El contenido de cada nodo, construido y mejorado por contribuciones de estudiantes." },
      { name: "Lente de carrera", def: "Perspectiva que filtra el grafo según tu perfil: CS, Ingeniería, Finanzas, Datos." },
    ],
    why: "NODUS reduce el tiempo que los estudiantes pierden tomando materias sin saber para qué sirven. Te da un mapa completo de la carrera desde el primer día, para que puedas tomar decisiones informadas sobre qué aprender y en qué orden.",
    example: "Si querés estudiar Machine Learning, NODUS te muestra que necesitás Álgebra Lineal, Cálculo, Probabilidad y Programación — y en qué orden aprenderlos para no perder tiempo.",
    difficulty_note: "Lo más difícil de NODUS es resistir la tentación de saltear prerequisitos.",
  },

  algebra: {
    summary: "El Álgebra es el lenguaje simbólico de las matemáticas: estudia propiedades de números y operaciones a través de variables, permitiendo expresar relaciones generales sin depender de valores específicos. En la universidad sienta las bases para el cálculo y la mayoría de los cursos cuantitativos. Sin dominar ecuaciones, funciones y factorización, los pasos siguientes se vuelven innecesariamente difíciles.",
    concepts: [
      { name: "Función", def: "Relación que asigna a cada elemento del dominio exactamente un elemento del rango." },
      { name: "Ecuación cuadrática", def: "Ecuación de grado 2 (ax² + bx + c = 0) resuelta con la fórmula cuadrática o factorización." },
      { name: "Factorización", def: "Expresar un polinomio como producto de factores más simples." },
      { name: "Sistema de ecuaciones", def: "Conjunto de ecuaciones con varias incógnitas que se deben satisfacer simultáneamente." },
      { name: "Dominio y rango", def: "Conjunto de entradas válidas (dominio) y de salidas posibles (rango) de una función." },
      { name: "Logaritmo", def: "Inverso de la exponenciación: log_b(x) = y significa b^y = x." },
    ],
    why: "El Álgebra es el prerequisito implícito de casi toda la ciencia. Sin ella no se pueden manipular fórmulas de física, derivar en cálculo ni formular un modelo de negocios. Es la herramienta de base que más se usa sin nombrar.",
    example: "Si un problema dice 'el doble de un número menos 5 es 11', el Álgebra te da las herramientas para escribir 2x − 5 = 11 y resolverlo sistemáticamente: x = 8.",
    difficulty_note: "La factorización de polinomios con coeficientes no enteros y los sistemas con más de dos variables son los temas que más horas requieren.",
  },

  calc1: {
    summary: "El Cálculo I estudia el cambio y la acumulación de cantidades continuas. A través de los límites, construye una base rigurosa para definir la derivada (tasa de cambio instantánea) y la integral (acumulación). Estas dos herramientas son fundamentales en ingeniería, física, economía y computación: prácticamente toda fórmula que involucra cambio continuo requiere cálculo.",
    concepts: [
      { name: "Límite", def: "Valor al que se aproxima una función cuando la variable se acerca a un punto." },
      { name: "Derivada", def: "Tasa de cambio instantánea de una función; pendiente de la recta tangente." },
      { name: "Regla de la cadena", def: "Técnica para derivar funciones compuestas: (f∘g)' = f'(g(x))·g'(x)." },
      { name: "Integral definida", def: "Área acumulada bajo una curva en un intervalo dado." },
      { name: "Integral indefinida", def: "Antiderivada de una función, expresada con una constante de integración C." },
      { name: "Teorema fundamental del cálculo", def: "Conecta la derivación con la integración: la integral de f' es f." },
    ],
    why: "La derivada modela cómo cambia cualquier sistema en el tiempo: velocidad de un cohete, crecimiento de una inversión, sensibilidad de un precio. La integral acumula esos cambios para dar totales: distancia recorrida, área bajo una curva de demanda, probabilidad acumulada.",
    example: "Si tu posición es s(t) = 3t², tu velocidad en cualquier instante es v(t) = s'(t) = 6t. A los 2 segundos vas a 12 m/s.",
    difficulty_note: "El cálculo de límites con formas indeterminadas (0/0, ∞/∞) y la regla de la cadena en funciones compuestas múltiples son los escollos más comunes.",
  },

  calc2: {
    summary: "El Cálculo II profundiza en técnicas de integración y extiende el análisis a series infinitas. Se estudian métodos avanzados como integración por partes, fracciones parciales y sustitución trigonométrica, además de series de Taylor y de potencias. Estas herramientas son necesarias para resolver ecuaciones diferenciales, modelar fenómenos físicos y construir aproximaciones numéricas usadas en todo software científico.",
    concepts: [
      { name: "Integración por partes", def: "Técnica basada en ∫u dv = uv − ∫v du, útil para productos de funciones." },
      { name: "Serie de Taylor", def: "Representación de una función como suma infinita de potencias alrededor de un punto." },
      { name: "Convergencia", def: "Propiedad de una serie cuyos términos se suman hacia un valor finito." },
      { name: "Integral impropia", def: "Integral con límites infinitos o con discontinuidad en el intervalo de integración." },
      { name: "Sucesiones", def: "Lista ordenada de números definida por una regla que determina cada término." },
      { name: "Radio de convergencia", def: "Rango en que una serie de potencias converge a la función que representa." },
    ],
    why: "Las series de Taylor son la base de toda aproximación numérica en computación: así funciona la representación de funciones en calculadoras y compiladores. Las integrales avanzadas aparecen en probabilidad continua, mecánica cuántica y procesamiento de señales.",
    example: "e^x = 1 + x + x²/2! + x³/3! + ··· es la serie de Taylor de la exponencial. Con los primeros 5 términos se puede calcular e^0.5 con error menor a 0.001.",
    difficulty_note: "El mayor desafío es elegir la técnica de integración correcta para cada función — no hay una regla única, se aprende con práctica extensiva.",
  },

  calc3: {
    summary: "El Cálculo III extiende las ideas del cálculo de una variable a funciones de múltiples variables. Estudia derivadas parciales, gradientes, integrales dobles y triples, y el cálculo vectorial con los teoremas de Stokes y Gauss. Es la matemática que describe el espacio tridimensional y los campos físicos como el eléctrico o el gravitacional.",
    concepts: [
      { name: "Derivada parcial", def: "Tasa de cambio de una función multivariable respecto a una variable, manteniendo las demás fijas." },
      { name: "Gradiente", def: "Vector que apunta en la dirección de máximo crecimiento de una función escalar." },
      { name: "Multiplicadores de Lagrange", def: "Método para optimizar una función sujeta a restricciones de igualdad." },
      { name: "Integral doble", def: "Extensión de la integral a funciones de dos variables; calcula volúmenes." },
      { name: "Divergencia y rotacional", def: "Operadores vectoriales que miden expansión y rotación de campos vectoriales." },
      { name: "Teorema de Stokes", def: "Generalización del teorema fundamental del cálculo a superficies en 3D." },
    ],
    why: "Sin cálculo multivariable no se puede optimizar funciones con múltiples parámetros — exactamente lo que hace el aprendizaje automático al entrenar modelos. También es indispensable para la mecánica de fluidos, el electromagnetismo y la termodinámica.",
    example: "Para maximizar la ganancia de una empresa que produce dos bienes, se toman las derivadas parciales respecto a cada cantidad producida, se igualan a cero y se resuelve el sistema resultante.",
    difficulty_note: "Los multiplicadores de Lagrange y el cambio de coordenadas en integrales triples (cilíndricas y esféricas) son los temas que más horas de práctica demandan.",
  },

  linalg: {
    summary: "El Álgebra Lineal estudia los espacios vectoriales y las transformaciones lineales. Trabaja con vectores, matrices, sistemas de ecuaciones lineales, eigenvalores y eigenvectores. Es la matemática que subyace al Machine Learning, la computación gráfica, el análisis de datos, la robótica y casi toda la ciencia aplicada moderna.",
    concepts: [
      { name: "Vector", def: "Objeto con magnitud y dirección; en álgebra lineal, elemento de un espacio vectorial." },
      { name: "Multiplicación matricial", def: "Operación que combina dos matrices para representar composición de transformaciones." },
      { name: "Eigenvalor / Eigenvector", def: "Par (λ, v) tal que Av = λv: v es una dirección que la matriz solo escala, sin rotar." },
      { name: "Transformación lineal", def: "Función entre espacios vectoriales que preserva la adición y la multiplicación escalar." },
      { name: "Espacio nulo (kernel)", def: "Conjunto de vectores que la transformación lleva al vector cero." },
      { name: "Descomposición SVD", def: "Factorización de cualquier matriz en tres matrices que revelan su estructura geométrica." },
    ],
    why: "Toda red neuronal es fundamentalmente una secuencia de multiplicaciones de matrices. La compresión de imágenes, la recomendación de contenido y el análisis de componentes principales (PCA) son álgebra lineal aplicada directamente.",
    example: "Rotar una imagen 45° es multiplicar cada píxel (representado como vector 2D) por una matriz de rotación. Un solo producto matricial transforma todos los píxeles simultáneamente.",
    difficulty_note: "El concepto más abstracto es el de eigenvalores: entender por qué una matriz 'estira' ciertos vectores sin cambiar su dirección toma tiempo y visualización geométrica.",
  },

  stats: {
    summary: "La Estadística provee herramientas para recolectar, analizar e interpretar datos con incertidumbre. Estudia distribuciones de probabilidad, estimación de parámetros, pruebas de hipótesis e intervalos de confianza. Es indispensable en cualquier disciplina que tome decisiones basadas en datos, desde medicina hasta finanzas y políticas públicas.",
    concepts: [
      { name: "Distribución normal", def: "Distribución en forma de campana que describe muchos fenómenos naturales y errores de medición." },
      { name: "Intervalo de confianza", def: "Rango de valores que con cierta probabilidad contiene el parámetro poblacional verdadero." },
      { name: "Prueba de hipótesis", def: "Procedimiento para decidir si los datos apoyan una afirmación sobre la población." },
      { name: "p-valor", def: "Probabilidad de observar datos tan extremos como los obtenidos, asumiendo que la hipótesis nula es verdadera." },
      { name: "Regresión lineal", def: "Modelo que describe la relación entre variables ajustando la línea de mejor ajuste." },
      { name: "Correlación", def: "Medida de la fuerza y dirección de la relación lineal entre dos variables." },
    ],
    why: "La estadística es lo que separa una conclusión rigurosa de una anécdota. Todo experimento científico, estudio clínico y análisis de negocio depende de estadística para saber si un efecto es real o producto del azar.",
    example: "Para saber si una nueva droga funciona, no alcanza con que algunos pacientes mejoren: hay que aplicar una prueba t para determinar si la diferencia entre grupos es estadísticamente significativa o podría ser azar.",
    difficulty_note: "Lo más confuso es la interpretación del p-valor: no mide la probabilidad de que la hipótesis sea verdadera, sino la probabilidad de los datos dado que la hipótesis nula es cierta.",
  },

  prob: {
    summary: "La Probabilidad es el estudio matemático de la incertidumbre y el azar. Construye sobre el cálculo para definir variables aleatorias continuas, funciones de densidad y distribuciones acumuladas. Es el fundamento riguroso de la estadística, el machine learning y la teoría de la información.",
    concepts: [
      { name: "Espacio muestral", def: "Conjunto de todos los resultados posibles de un experimento aleatorio." },
      { name: "Variable aleatoria", def: "Función que asigna un número a cada resultado del espacio muestral." },
      { name: "Función de densidad (PDF)", def: "Función no negativa cuya integral sobre un intervalo da la probabilidad de ese intervalo." },
      { name: "Valor esperado", def: "Promedio ponderado de los posibles valores de una variable aleatoria." },
      { name: "Distribución conjunta", def: "Descripción de la probabilidad de dos o más variables aleatorias simultáneamente." },
      { name: "Teorema de Bayes", def: "Fórmula para actualizar la probabilidad de una hipótesis al obtener nueva evidencia." },
    ],
    why: "Todo modelo de ML tiene una interpretación probabilística. Las redes bayesianas, los modelos generativos y la inferencia estadística requieren dominar distribuciones y sus propiedades para poder formularse y entenderse correctamente.",
    example: "La distribución normal N(μ, σ²) describe el comportamiento de muchos fenómenos. Saber que el 95% de los valores caen dentro de ±2σ es la base para construir intervalos de confianza.",
    difficulty_note: "El mayor salto conceptual es pasar de probabilidad discreta a continua: la probabilidad de un punto exacto es cero y hay que trabajar con densidades e integrales, no con sumas.",
  },

  diffeq: {
    summary: "Las Ecuaciones Diferenciales (EDs) estudian ecuaciones que relacionan una función con sus derivadas. Modelan cualquier sistema donde la tasa de cambio depende del estado actual: crecimiento de poblaciones, circuitos eléctricos, sistemas mecánicos y fenómenos de difusión. Son el lenguaje natural de la física y la ingeniería.",
    concepts: [
      { name: "EDO de primer orden", def: "Ecuación que relaciona una función con su primera derivada; modelan crecimiento y decaimiento." },
      { name: "Condición inicial", def: "Valor de la función en un punto específico que determina la solución particular." },
      { name: "Solución general", def: "Familia de funciones que satisfacen la ecuación, parametrizada por constantes." },
      { name: "Sistema lineal de EDOs", def: "Conjunto de ecuaciones diferenciales acopladas, analizable con álgebra lineal." },
      { name: "Transformada de Laplace", def: "Herramienta que convierte EDOs en ecuaciones algebraicas más fáciles de resolver." },
      { name: "Estabilidad", def: "Propiedad de un sistema cuyos estados perturbados regresan al equilibrio." },
    ],
    why: "El movimiento de un péndulo, la carga de un condensador, la propagación de un virus, el calor en una placa: todos se modelan con EDOs. Sin ellas, la ingeniería y la física modernas son imposibles.",
    example: "La ecuación dx/dt = kx modela el crecimiento exponencial: la tasa de cambio es proporcional al estado. Su solución es x(t) = x₀·eᵏᵗ — describe desde el crecimiento bacteriano hasta el interés compuesto.",
    difficulty_note: "Los sistemas de ecuaciones diferenciales no lineales y las EDs en derivadas parciales (EDPs) requieren un dominio sólido del álgebra lineal y no siempre tienen solución analítica.",
  },

  "intro-prog": {
    summary: "La Introducción a la Programación enseña a pensar computacionalmente y a expresar esas ideas en código. Cubre los fundamentos universales: variables, tipos de datos, estructuras de control (condicionales y loops), funciones y recursión. Es el punto de entrada a toda la ciencia de la computación, independientemente del lenguaje elegido.",
    concepts: [
      { name: "Variable", def: "Nombre que hace referencia a un valor almacenado en memoria." },
      { name: "Función", def: "Bloque de código reutilizable que toma entradas (argumentos) y produce una salida." },
      { name: "Condicional (if/else)", def: "Estructura que ejecuta código distinto según si una condición es verdadera o falsa." },
      { name: "Bucle (for/while)", def: "Estructura que repite un bloque de código mientras se cumpla una condición." },
      { name: "Recursión", def: "Técnica donde una función se llama a sí misma para resolver un problema reduciéndolo." },
      { name: "Depuración (debugging)", def: "Proceso de encontrar y corregir errores en el código." },
    ],
    why: "Saber programar es la habilidad técnica más demandada del siglo XXI. Es la diferencia entre automatizar tareas o hacerlas a mano, entre analizar datos o solo leerlos, entre construir herramientas o depender de las de otros.",
    example: "Un loop que suma los primeros 100 números: en Python, `total = sum(range(1, 101))` devuelve 5050 en microsegundos. Sin programación, llevaría minutos hacerlo a mano.",
    difficulty_note: "El mayor obstáculo inicial es pensar como computadora: los errores de lógica (bugs) suelen ser más frustrantes que los de sintaxis porque el programa corre pero hace lo incorrecto.",
  },

  logic: {
    summary: "La Lógica Discreta estudia las estructuras matemáticas que son fundamentalmente contables y separadas, a diferencia del continuo. Abarca lógica proposicional, teoría de conjuntos, relaciones, funciones, combinatoria y teoría de grafos. Es la matemática de la informática: todo desde compiladores hasta bases de datos se funda en estas ideas.",
    concepts: [
      { name: "Proposición lógica", def: "Afirmación que puede ser verdadera o falsa; base de la lógica booleana." },
      { name: "Tabla de verdad", def: "Tabla que enumera todos los valores posibles de una expresión lógica." },
      { name: "Teoría de conjuntos", def: "Estudio de colecciones de objetos y las operaciones entre ellas (unión, intersección, complemento)." },
      { name: "Grafo", def: "Conjunto de nodos y aristas; modelo de relaciones entre objetos." },
      { name: "Inducción matemática", def: "Técnica de prueba que demuestra una propiedad para todos los enteros positivos." },
      { name: "Combinatoria", def: "Rama que cuenta configuraciones posibles: permutaciones, combinaciones, principio de inclusión-exclusión." },
    ],
    why: "Los circuitos lógicos de cualquier procesador implementan operaciones booleanas. Los algoritmos de búsqueda en grafos (BFS, DFS) son lógica discreta aplicada. Sin esta materia, diseñar estructuras de datos eficientes es imposible.",
    example: "Un árbol de decisión en Machine Learning es literalmente un grafo dirigido acíclico donde cada nodo es una proposición lógica que separa los datos en subconjuntos.",
    difficulty_note: "Las pruebas por inducción matemática son el concepto más exigente: entender por qué probar el caso base y el paso inductivo es suficiente para afirmar algo para todo n requiere práctica.",
  },

  "data-str": {
    summary: "Las Estructuras de Datos estudian cómo organizar y almacenar información en memoria para que pueda accederse y modificarse eficientemente. Cubre listas enlazadas, pilas, colas, árboles (binarios, AVL, B-trees), grafos y tablas hash. La elección de la estructura correcta es frecuentemente la diferencia entre un algoritmo que tarda segundos y uno que tarda días.",
    concepts: [
      { name: "Lista enlazada", def: "Secuencia de nodos donde cada uno apunta al siguiente; inserción O(1), acceso O(n)." },
      { name: "Árbol binario de búsqueda", def: "Árbol donde el subárbol izquierdo contiene menores y el derecho mayores que la raíz." },
      { name: "Hash table", def: "Estructura que mapea claves a valores usando una función hash; acceso promedio O(1)." },
      { name: "Heap (montículo)", def: "Árbol binario completo donde cada nodo es mayor (o menor) que sus hijos; base de la cola de prioridad." },
      { name: "Pila y Cola", def: "Pila: LIFO (último en entrar, primero en salir). Cola: FIFO (primero en entrar, primero en salir)." },
      { name: "Grafo (representación)", def: "Puede representarse como lista de adyacencia (eficiente en espacio) o matriz de adyacencia (eficiente en consulta)." },
    ],
    why: "Cada vez que usás Google Maps, el GPS usa un grafo con algoritmos de camino mínimo. Cada base de datos usa árboles B+ para sus índices. Cada variable de Python tiene una estructura de datos detrás.",
    example: "Una hash table permite verificar si un username ya existe en O(1) — tiempo constante, sin importar si hay 100 o 100 millones de usuarios. Un array sin ordenar tardaría O(n).",
    difficulty_note: "Los árboles balanceados (AVL, rojo-negro) y su algoritmo de rebalanceo son conceptualmente densos: hay que rastrear rotaciones y casos borde en papel antes de codificarlos.",
  },

  algo: {
    summary: "Algoritmos estudia métodos sistemáticos y eficientes para resolver problemas computacionales. Analiza la complejidad de tiempo y espacio, y cubre paradigmas como divide y vencerás, programación dinámica y algoritmos voraces. Es la materia que transforma un programador competente en un ingeniero capaz de resolver problemas a escala.",
    concepts: [
      { name: "Notación Big-O", def: "Describe el crecimiento del tiempo o espacio de un algoritmo en función del tamaño de la entrada." },
      { name: "Divide y vencerás", def: "Paradigma que divide el problema en subproblemas más pequeños, los resuelve y combina los resultados." },
      { name: "Programación dinámica", def: "Técnica que resuelve problemas con subproblemas solapados memoizando resultados intermedios." },
      { name: "Algoritmo voraz (greedy)", def: "Toma siempre la decisión localmente óptima esperando obtener la solución global óptima." },
      { name: "Backtracking", def: "Exploración exhaustiva del espacio de soluciones, descartando ramas inviables tempranamente." },
      { name: "NP-completitud", def: "Clase de problemas para los que no se conoce algoritmo eficiente; reducibles entre sí." },
    ],
    why: "La diferencia entre un algoritmo O(n²) y uno O(n log n) sobre 10 millones de registros es la diferencia entre 3 minutos y 0.2 segundos. Para sistemas reales, la complejidad algorítmica es tan importante como la corrección.",
    example: "MergeSort divide el array recursivamente hasta tener piezas de un elemento y las ordena al combinar: O(n log n). BubbleSort hace n² comparaciones. Con n = 1.000.000 la diferencia es 20 millones vs. 1 billón de operaciones.",
    difficulty_note: "La programación dinámica — reconocer que un problema tiene subproblemas solapados y memoizarlos — es el concepto más difícil de internalizar y requiere practicar muchos problemas diferentes.",
  },

  databases: {
    summary: "Bases de Datos estudia cómo almacenar, organizar y consultar grandes volúmenes de información de manera persistente y confiable. El modelo relacional, el lenguaje SQL, la normalización y las transacciones ACID son los pilares. Prácticamente toda aplicación del mundo real — desde una red social hasta un sistema bancario — tiene una base de datos relacional detrás.",
    concepts: [
      { name: "Modelo relacional", def: "Organización de datos en tablas (relaciones) con filas y columnas y relaciones entre ellas." },
      { name: "SQL", def: "Lenguaje declarativo para consultar y manipular bases de datos relacionales." },
      { name: "Normalización (1FN-3FN)", def: "Proceso de estructurar tablas para eliminar redundancia y dependencias problemáticas." },
      { name: "Índice", def: "Estructura de datos auxiliar (generalmente árbol B+) que acelera las consultas a costo de espacio." },
      { name: "Transacción ACID", def: "Garantiza Atomicidad, Consistencia, Aislamiento y Durabilidad en operaciones sobre datos." },
      { name: "JOIN", def: "Operación que combina filas de dos tablas basándose en una condición de coincidencia." },
    ],
    why: "Sin bases de datos bien diseñadas, las aplicaciones no escalan, los datos se corrompen y las consultas tardan minutos en vez de milisegundos. Entender cómo funciona un índice puede hacer que una consulta pase de 10 segundos a 10 milisegundos.",
    example: "`SELECT nombre, edad FROM usuarios WHERE pais = 'Argentina' ORDER BY edad DESC LIMIT 10` recupera los 10 argentinos más grandes en milisegundos, incluso con millones de filas, gracias a un índice sobre la columna `pais`.",
    difficulty_note: "El diseño del esquema relacional antes de escribir código es lo que más cuesta: pensar en tablas, claves foráneas y normalización antes de objetos es un cambio de paradigma.",
  },

  ml: {
    summary: "Machine Learning estudia cómo construir sistemas que aprenden de datos sin ser programados explícitamente para cada tarea. Cubre regresión, clasificación, clustering, árboles de decisión, máquinas de soporte vectorial y redes neuronales superficiales. Es la base de la inteligencia artificial aplicada: desde reconocimiento de voz hasta detección de fraude.",
    concepts: [
      { name: "Función de pérdida", def: "Medida del error del modelo que el algoritmo de entrenamiento busca minimizar." },
      { name: "Descenso del gradiente", def: "Algoritmo iterativo que actualiza los parámetros en la dirección del gradiente negativo de la pérdida." },
      { name: "Overfitting", def: "El modelo memoriza los datos de entrenamiento y falla en datos nuevos." },
      { name: "Validación cruzada", def: "Técnica que evalúa el modelo en múltiples particiones de datos para estimar su desempeño real." },
      { name: "Regularización", def: "Penalización de la complejidad del modelo para reducir el overfitting (L1, L2)." },
      { name: "Curva ROC / AUC", def: "Herramienta gráfica que evalúa la calidad de un clasificador binario a distintos umbrales." },
    ],
    why: "ML es la tecnología que permite automatizar decisiones a escala: qué contenido mostrarte, si aprobar un crédito, si una imagen tiene un tumor. Entender cómo funciona permite tanto construirlo como auditarlo críticamente.",
    example: "Una regresión logística aprende a clasificar emails como spam o no-spam ajustando pesos que minimizan el error de clasificación en miles de emails etiquetados, sin que nadie programe las reglas explícitamente.",
    difficulty_note: "El mayor desafío es el overfitting y el bias-variance tradeoff: construir modelos que generalicen sin memorizar los datos de entrenamiento requiere intuición que se desarrolla con práctica.",
  },

  deep: {
    summary: "Deep Learning estudia redes neuronales con múltiples capas que aprenden representaciones jerárquicas de los datos. Permite resolver tareas que antes parecían exclusivamente humanas: reconocimiento de imágenes, generación de texto, traducción automática. Requiere datos en volumen, capacidad de cómputo (GPU) y comprensión sólida de la optimización.",
    concepts: [
      { name: "Neurona artificial", def: "Unidad computacional que aplica una transformación lineal seguida de una función de activación." },
      { name: "Retropropagación", def: "Algoritmo que calcula el gradiente de la pérdida respecto a cada parámetro usando la regla de la cadena." },
      { name: "Función de activación", def: "Función no lineal (ReLU, sigmoid, tanh) que da a la red capacidad de aprender relaciones complejas." },
      { name: "Red convolucional (CNN)", def: "Arquitectura con capas de convolución que aprenden filtros espaciales; dominan visión por computadora." },
      { name: "Atención (Transformer)", def: "Mecanismo que pondera la relevancia de diferentes partes de la entrada; base de GPT y BERT." },
      { name: "Dropout", def: "Regularización que desactiva aleatoriamente neuronas durante el entrenamiento para reducir overfitting." },
    ],
    why: "GPT, DALL-E, AlphaFold son arquitecturas de Deep Learning. Es la tecnología que redefine qué pueden hacer las computadoras, y entender sus fundamentos matemáticos permite usarla con criterio en vez de como caja negra.",
    example: "Una red convolucional aprende automáticamente a detectar bordes en las primeras capas, formas en las intermedias y objetos completos en las últimas — todo desde ejemplos etiquetados, sin programar ningún detector.",
    difficulty_note: "El entrenamiento de redes profundas depende de muchos hiperparámetros (learning rate, arquitectura, inicialización) cuyo impacto es difícil de predecir; se aprende principalmente experimentando.",
  },

  webdev: {
    summary: "Desarrollo Web estudia la construcción de aplicaciones que corren en el navegador y en servidores conectados a internet. Cubre HTML/CSS para la interfaz, JavaScript para la interactividad, APIs REST para la comunicación y bases de datos para la persistencia. Es la habilidad más directamente empleable de la carrera de CS.",
    concepts: [
      { name: "HTML/CSS", def: "HTML estructura el contenido; CSS define su presentación visual." },
      { name: "JavaScript", def: "Lenguaje de programación del navegador que permite interactividad y lógica del lado cliente." },
      { name: "API REST", def: "Interfaz que permite la comunicación entre frontend y backend mediante HTTP y JSON." },
      { name: "HTTP", def: "Protocolo de transferencia de hipertexto; la base de la comunicación web." },
      { name: "Autenticación y autorización", def: "Mecanismos para verificar la identidad del usuario y controlar qué puede hacer." },
      { name: "Base de datos (backend)", def: "Sistema de persistencia de datos al que el servidor accede para leer y escribir información." },
    ],
    why: "El 90% del software con el que interactuamos diariamente es una aplicación web. Saber construirlas abre la puerta a herramientas para tu propio trabajo, startups, y la mayoría de los empleos en la industria tech.",
    example: "Cuando hacés login en una app, tu navegador hace un POST a `/api/auth/login` con tu email y contraseña. El servidor verifica contra la base de datos, genera un JWT token y te lo devuelve — todo eso es desarrollo web.",
    difficulty_note: "El ecosistema de JavaScript cambia constantemente y puede ser abrumador; conviene aprender los fundamentos del lenguaje antes de adoptar cualquier framework.",
  },

  physics1: {
    summary: "Física I estudia la mecánica clásica: cómo se mueven los objetos y qué los hace moverse. A través de las leyes de Newton, la cinemática y la dinámica, establece los principios que gobiernan desde la trayectoria de un proyectil hasta el movimiento de planetas. Es la primera materia de física universitaria y la base para electricidad, circuitos y mecánica cuántica.",
    concepts: [
      { name: "Leyes de Newton", def: "Tres leyes que describen la relación entre fuerza, masa y movimiento." },
      { name: "Cinemática", def: "Descripción del movimiento sin considerar sus causas: posición, velocidad, aceleración." },
      { name: "Trabajo y energía", def: "Trabajo es fuerza aplicada a lo largo de un desplazamiento; la energía cinética es ½mv²." },
      { name: "Impulso y momentum", def: "El impulso cambia el momentum (p = mv); su conservación rige las colisiones." },
      { name: "Dinámica rotacional", def: "Análogo de la segunda ley de Newton para objetos que giran: τ = Iα." },
      { name: "Gravitación universal", def: "Toda masa atrae a toda otra con una fuerza F = Gm₁m₂/r²." },
    ],
    why: "Los ingenieros que diseñan puentes, aviones o robots dependen de la mecánica clásica para calcular fuerzas, vibraciones y trayectorias. Sin esta base, el diseño estructural y el análisis de sistemas mecánicos son imposibles.",
    example: "Un auto que frena desde 100 km/h necesita cierta distancia de frenado calculable con F = ma. Con la fricción como única fuerza horizontal, se puede determinar exactamente cuánto espacio necesita el ABS para detenerlo.",
    difficulty_note: "La dinámica rotacional es el tema más denso: entender momentos de inercia y la analogía con la traslación (torque ↔ fuerza, inercia ↔ masa) requiere visualización geométrica.",
  },

  physics2: {
    summary: "Física II estudia el electromagnetismo: las fuerzas eléctricas y magnéticas, los campos que las describen y su unificación en las ecuaciones de Maxwell. Cubre desde la ley de Coulomb hasta las ondas electromagnéticas. Es la física que está detrás de toda la tecnología eléctrica y electrónica moderna.",
    concepts: [
      { name: "Campo eléctrico", def: "Vector que describe la fuerza por unidad de carga en cada punto del espacio." },
      { name: "Ley de Gauss", def: "El flujo eléctrico a través de una superficie cerrada es proporcional a la carga encerrada." },
      { name: "Potencial eléctrico", def: "Energía potencial por unidad de carga; relacionado con el campo por E = −∇V." },
      { name: "Inducción electromagnética", def: "Un campo magnético variable en el tiempo genera un campo eléctrico (ley de Faraday)." },
      { name: "Ecuaciones de Maxwell", def: "Cuatro ecuaciones que unifican electricidad y magnetismo y predicen las ondas EM." },
      { name: "Ondas electromagnéticas", def: "Propagación de campos E y B acoplados; la luz es un caso particular." },
    ],
    why: "Todo dispositivo electrónico — desde un teléfono hasta un MRI médico — funciona según los principios del electromagnetismo. Un ingeniero eléctrico que no entiende campos E y B no puede diseñar antenas, transformadores ni circuitos de RF.",
    example: "Un transformador que convierte 220V a 5V funciona por inducción: el campo magnético variable en la bobina primaria induce una corriente en la secundaria. La razón de voltajes es igual a la razón de vueltas.",
    difficulty_note: "La relación entre potencial eléctrico y campo (E = −∇V) y el trabajo con integrales de línea en campos vectoriales requieren manejo fluido del cálculo multivariable.",
  },

  circuits: {
    summary: "Análisis de Circuitos estudia cómo se comporta la corriente eléctrica en redes de componentes como resistores, condensadores e inductores. Usando las leyes de Kirchhoff y técnicas como el análisis nodal, permite calcular voltajes y corrientes en cualquier circuito. Es la base del diseño electrónico: amplificadores, filtros, fuentes de poder y toda la electrónica analógica.",
    concepts: [
      { name: "Ley de Ohm", def: "V = IR: el voltaje es el producto de la corriente por la resistencia." },
      { name: "Leyes de Kirchhoff", def: "KCL: la suma de corrientes en un nodo es cero. KVL: la suma de voltajes en un lazo es cero." },
      { name: "Thévenin / Norton", def: "Cualquier red lineal se puede reemplazar por una fuente de tensión en serie o de corriente en paralelo con una resistencia." },
      { name: "Filtro RC", def: "Red de resistor y condensador que atenúa frecuencias según su relación f ≷ 1/(2πRC)." },
      { name: "Análisis nodal", def: "Método sistemático que asigna voltajes a los nodos y plantea ecuaciones con KCL." },
      { name: "Fasores", def: "Representación de señales sinusoidales como números complejos para simplificar el análisis AC." },
    ],
    why: "Sin análisis de circuitos no se pueden diseñar los sensores de un robot, el amplificador de un micrófono ni el regulador de voltaje de una fuente de poder. Toda la electrónica analógica descansa en estos principios.",
    example: "Un filtro pasa-bajos RC atenúa frecuencias altas y deja pasar las bajas. Los altavoces usan filtros para separar agudos y graves y enviarlos al tweeter y al woofer correspondientes.",
    difficulty_note: "La respuesta en frecuencia con números complejos (fasores) y el análisis AC en estado estacionario es el salto conceptual más exigente del curso.",
  },

  signals: {
    summary: "Señales y Sistemas estudia cómo procesar información continua en el tiempo usando la Transformada de Fourier y la Transformada de Laplace. Permite analizar sistemas en el dominio de la frecuencia en vez del tiempo, lo que simplifica enormemente problemas de filtrado, control y comunicaciones.",
    concepts: [
      { name: "Señal", def: "Función del tiempo (u otra variable) que transmite información." },
      { name: "Sistema LTI", def: "Sistema Lineal e Invariante en el Tiempo; caracterizado completamente por su respuesta al impulso." },
      { name: "Transformada de Fourier", def: "Descompone una señal en sus componentes de frecuencia." },
      { name: "Transformada de Laplace", def: "Generalización de Fourier al plano complejo; fundamental para análisis de estabilidad." },
      { name: "Convolución", def: "Operación que describe la salida de un sistema LTI como superposición de respuestas al impulso." },
      { name: "Función de transferencia", def: "Cociente entre la transformada de la salida y la de la entrada; resume el comportamiento del sistema." },
    ],
    why: "El audio digital, las comunicaciones inalámbricas, la resonancia magnética (MRI) y los sistemas de control automático están diseñados en el dominio de la frecuencia. Sin esta materia, diseñar un filtro de audio o un controlador PID es prácticamente imposible.",
    example: "La voz humana tiene componentes entre 300 y 3400 Hz. El sistema telefónico aplica un filtro pasa-banda en ese rango: la Transformada de Fourier revela las frecuencias presentes y permite diseñar el filtro.",
    difficulty_note: "La convolución en el dominio continuo es el concepto más abstracto: cuesta hasta que se visualiza como superposición de respuestas al impulso desplazadas en el tiempo.",
  },

  "comp-arch": {
    summary: "Arquitectura de Computadoras estudia cómo está construida la máquina que ejecuta el código. Cubre la organización de la CPU, el ciclo de instrucción (fetch-decode-execute), la jerarquía de memoria (caché, RAM, disco), el lenguaje ensamblador y el pipeline. Entender esto explica por qué un código puede ser correcto pero innecesariamente lento.",
    concepts: [
      { name: "ISA (Instruction Set Architecture)", def: "Conjunto de instrucciones que la CPU puede ejecutar; la interfaz entre software y hardware." },
      { name: "Pipeline", def: "Técnica que divide la ejecución en etapas superpuestas para aumentar el throughput." },
      { name: "Caché", def: "Memoria pequeña y rápida que almacena copias de los datos más usados para reducir latencia." },
      { name: "Memoria virtual", def: "Abstracción que da a cada proceso su propio espacio de direcciones, gestionado por el sistema operativo." },
      { name: "Paralelismo", def: "Ejecución simultánea de instrucciones o hilos para aprovechar múltiples núcleos." },
      { name: "Ensamblador", def: "Lenguaje de bajo nivel donde cada instrucción corresponde directamente a una operación de la CPU." },
    ],
    why: "Escribir código sin entender la arquitectura es como conducir sin saber de mecánica: funciona hasta que necesitás optimizar, depurar un problema de bajo nivel o diseñar un sistema embebido. Los mejores ingenieros de sistemas saben qué pasa debajo del compilador.",
    example: "Un fallo de caché (cache miss) puede hacer que una operación tarde 200 ciclos en vez de 4. Un loop que accede a un array secuencialmente (cache-friendly) puede ser 10 veces más rápido que uno que accede aleatoriamente.",
    difficulty_note: "El pipeline y los hazards (dependencias de datos, control y estructurales) son lo más denso: hay que visualizar el flujo de instrucciones a través de múltiples etapas simultáneamente.",
  },

  robotics: {
    summary: "Robótica integra mecánica, electrónica, control y software para diseñar sistemas que interactúan físicamente con el mundo. Estudia cinemática de manipuladores, sistemas de control realimentado, sensores y actuadores. Es una materia de síntesis que aplica física, álgebra lineal, señales y programación en un único sistema real.",
    concepts: [
      { name: "Cinemática directa", def: "Calcular la posición del efector final dado el estado (ángulos) de cada articulación." },
      { name: "Cinemática inversa", def: "Calcular los ángulos de cada articulación para que el efector final llegue a una posición dada." },
      { name: "Control PID", def: "Controlador proporcional-integral-derivativo que corrige el error entre la posición deseada y la real." },
      { name: "Transformación homogénea", def: "Matriz 4×4 que representa rotación y traslación combinadas en el espacio 3D." },
      { name: "Odometría", def: "Estimación de la posición de un robot a partir del movimiento de sus ruedas o articulaciones." },
      { name: "Sensor / Actuador", def: "Sensor: convierte señales físicas en datos. Actuador: convierte señales eléctricas en movimiento." },
    ],
    why: "Los brazos robóticos en fábricas, los drones de entrega, los autos autónomos y las prótesis inteligentes son todos sistemas robóticos. Es el frente donde la computación se encuentra con el mundo físico.",
    example: "Para que el brazo de un robot coloque una pieza en un punto exacto, se resuelve la cinemática inversa: dadas las coordenadas del destino, se calculan los ángulos de cada articulación mediante álgebra lineal.",
    difficulty_note: "La cinemática inversa de manipuladores con más de 3 grados de libertad no tiene solución analítica general y requiere métodos numéricos iterativos que pueden ser inestables.",
  },

  micro: {
    summary: "La Microeconomía estudia cómo los individuos y las empresas toman decisiones de asignación de recursos escasos. Analiza la oferta y la demanda, la formación de precios, las estructuras de mercado (competencia perfecta, monopolio, oligopolio) y la teoría del consumidor. Es el fundamento de todo análisis económico y de los modelos de negocios modernos.",
    concepts: [
      { name: "Oferta y demanda", def: "El precio de equilibrio es donde la cantidad ofrecida iguala a la cantidad demandada." },
      { name: "Elasticidad", def: "Sensibilidad de la cantidad demandada u ofrecida ante cambios en el precio u otros factores." },
      { name: "Excedente del consumidor", def: "Diferencia entre lo que el consumidor está dispuesto a pagar y lo que paga efectivamente." },
      { name: "Estructura de mercado", def: "Clasificación según el número de oferentes: competencia perfecta, oligopolio, monopolio." },
      { name: "Utilidad marginal", def: "Satisfacción adicional que obtiene un consumidor al consumir una unidad más de un bien." },
      { name: "Equilibrio de Nash", def: "Situación donde ningún jugador puede mejorar su resultado cambiando unilateralmente su estrategia." },
    ],
    why: "Entender la elasticidad precio ayuda a decidir si subir precios aumenta o reduce los ingresos. La teoría de juegos (Nash) explica desde la fijación de precios entre competidores hasta las negociaciones internacionales.",
    example: "Si Uber sube tarifas un 10% y la demanda cae solo un 3%, la elasticidad es −0.3 (inelástica): los ingresos aumentan. Si la demanda cae un 15%, la elasticidad es −1.5 (elástica): mejor no subir.",
    difficulty_note: "Los modelos de maximización de utilidad con restricciones presupuestarias requieren cálculo multivariable y la intuición económica detrás de los multiplicadores de Lagrange cuesta conectar al principio.",
  },

  macro: {
    summary: "La Macroeconomía estudia la economía como un todo: el crecimiento del PBI, la inflación, el desempleo, el comercio exterior y las políticas monetaria y fiscal. Analiza cómo los bancos centrales, los gobiernos y los mercados financieros interactúan para determinar el nivel de actividad económica.",
    concepts: [
      { name: "PBI (Producto Bruto Interno)", def: "Valor total de los bienes y servicios finales producidos en un país en un período." },
      { name: "Inflación", def: "Aumento sostenido del nivel general de precios que reduce el poder adquisitivo." },
      { name: "Política monetaria", def: "Control de la oferta de dinero y las tasas de interés por parte del banco central." },
      { name: "Política fiscal", def: "Uso del gasto público e impuestos por parte del gobierno para influir en la actividad." },
      { name: "Multiplicador fiscal", def: "Efecto amplificado del gasto del gobierno sobre el PBI a través de la cadena de consumo." },
      { name: "Curva de Phillips", def: "Relación inversa empírica entre inflación y desempleo, especialmente en el corto plazo." },
    ],
    why: "Las decisiones de la Reserva Federal o el Banco Central afectan tasas de interés, tipo de cambio y crédito disponible — en cascada, afectan a toda empresa y consumidor. Un CFO que no entiende macro toma decisiones de inversión sin contexto.",
    example: "Cuando el Banco Central sube la tasa de interés para combatir la inflación, el crédito se encarece, las empresas invierten menos, el desempleo puede subir y el PBI crecer más despacio — esa cadena completa es macroeconomía.",
    difficulty_note: "La distinción entre efectos de corto y largo plazo, y el debate entre modelos Keynesianos y neoclásicos, puede confundir porque ambas escuelas predicen resultados distintos ante las mismas políticas.",
  },

  accounting: {
    summary: "La Contabilidad es el sistema de registro, clasificación y comunicación de las transacciones económicas de una organización. Produce los tres estados financieros fundamentales: el balance general, el estado de resultados y el flujo de efectivo. Es el lenguaje de los negocios: sin saber leer estados financieros, es imposible evaluar la salud de cualquier empresa.",
    concepts: [
      { name: "Activo / Pasivo / Patrimonio", def: "Activos son lo que posee la empresa; pasivos lo que debe; patrimonio es la diferencia." },
      { name: "Balance general", def: "Foto de la situación financiera en un momento: Activos = Pasivos + Patrimonio." },
      { name: "Estado de resultados", def: "Muestra ingresos, costos y utilidad neta durante un período." },
      { name: "Flujo de efectivo", def: "Registra las entradas y salidas de dinero real: operativo, inversión y financiamiento." },
      { name: "Principio de devengo", def: "Los ingresos y gastos se registran cuando se generan, no cuando se cobra o paga el efectivo." },
      { name: "EBITDA", def: "Utilidades antes de intereses, impuestos, depreciación y amortización; proxy del flujo operativo." },
    ],
    why: "Un inversor que no sabe leer un balance no puede distinguir una empresa sólida de una en problemas. Un emprendedor que no lleva contabilidad no sabe si realmente está ganando o perdiendo dinero.",
    example: "Una empresa puede tener ganancias en su estado de resultados y al mismo tiempo no tener efectivo para pagar sueldos — porque registra ingresos por devengo antes de cobrarlos. Esto causa quiebras de empresas 'rentables'.",
    difficulty_note: "El principio de devengo y su distinción del criterio de caja es conceptualmente contraintuitivo; es la clave para entender el 80% de las diferencias entre los tres estados financieros.",
  },

  "fin-corp": {
    summary: "Las Finanzas Corporativas estudian cómo las empresas toman decisiones de inversión y financiamiento para maximizar el valor para sus accionistas. Cubre la valuación por flujo de fondos descontados (DCF), el costo de capital (WACC), la estructura de capital y el análisis de proyectos. Es la materia central de finanzas, banca de inversión y consultoría estratégica.",
    concepts: [
      { name: "VPN (Valor Presente Neto)", def: "Suma de los flujos de caja futuros descontados a hoy; si VPN > 0, el proyecto crea valor." },
      { name: "TIR (Tasa Interna de Retorno)", def: "Tasa de descuento que hace el VPN igual a cero; se compara con el costo de capital." },
      { name: "DCF (Flujo de Caja Descontado)", def: "Método de valuación que proyecta flujos futuros y los descuenta al presente." },
      { name: "WACC", def: "Costo promedio ponderado del capital: pondera el costo del deuda y del equity de la empresa." },
      { name: "Costo de oportunidad", def: "Valor de la mejor alternativa sacrificada al tomar una decisión." },
      { name: "Apalancamiento", def: "Uso de deuda para amplificar el retorno sobre el capital propio, con mayor riesgo." },
    ],
    why: "Toda decisión de inversión empresarial — comprar maquinaria, adquirir otra empresa, lanzar un producto — puede evaluarse con un modelo DCF. Sin entender el WACC, no se puede comparar el costo de diferentes fuentes de financiamiento.",
    example: "Una empresa evalúa invertir $1M en maquinaria que generará $250K de flujo libre por 6 años. Con un WACC del 10%, el VPN es positivo: el proyecto crea valor y debe realizarse.",
    difficulty_note: "Construir un modelo financiero completo con proyecciones enlazadas, análisis de sensibilidad y escenarios es técnicamente exigente y se aprende principalmente con práctica en Excel.",
  },

  quant: {
    summary: "Las Finanzas Cuantitativas aplican matemáticas avanzadas, estadística y computación al análisis de mercados financieros. Estudia la valuación de derivados (opciones, futuros), la gestión de riesgo y los modelos estocásticos (Black-Scholes, movimiento browniano). Es la intersección de las finanzas con el Machine Learning y la ciencia de datos.",
    concepts: [
      { name: "Derivado financiero", def: "Instrumento cuyo valor depende del precio de un activo subyacente (acción, divisa, índice)." },
      { name: "Movimiento browniano", def: "Proceso estocástico continuo que modela la aleatoriedad de los precios de activos." },
      { name: "Modelo Black-Scholes", def: "Fórmula para calcular el precio justo de una opción europea basada en 5 parámetros." },
      { name: "Value at Risk (VaR)", def: "Pérdida máxima esperada de un portafolio con cierta probabilidad en un horizonte dado." },
      { name: "Arbitraje", def: "Ganancia libre de riesgo explotando diferencias de precio del mismo activo en mercados distintos." },
      { name: "Backtest", def: "Evaluación de una estrategia de trading aplicándola retroactivamente sobre datos históricos." },
    ],
    why: "Los hedge funds, los bancos de inversión y las fintech usan modelos cuantitativos para diseñar estrategias de trading, gestionar riesgo y valorar instrumentos complejos. Es una de las aplicaciones más exigentes del ML.",
    example: "Una opción call da el derecho de comprar una acción a $100 en 3 meses. Black-Scholes calcula cuánto debe costar hoy esa opción dado el precio actual, la volatilidad y la tasa libre de riesgo.",
    difficulty_note: "El cálculo estocástico (lema de Itô, integrales de Itô) es matemáticamente exigente; requiere dominio sólido de cálculo y probabilidad antes de abordar los modelos de tiempo continuo.",
  },

  marketing: {
    summary: "El Marketing estudia cómo las organizaciones crean valor para los clientes y comunican ese valor para generar demanda. Cubre la segmentación de mercados, el posicionamiento de marca, el mix de marketing (las 4Ps), el comportamiento del consumidor y el marketing digital. Es la interfaz entre una empresa y sus clientes.",
    concepts: [
      { name: "Segmentación", def: "División del mercado en grupos con necesidades y características similares." },
      { name: "Posicionamiento", def: "Lugar que ocupa una marca en la mente del consumidor respecto a la competencia." },
      { name: "Mix de marketing (4Ps)", def: "Producto, Precio, Plaza (distribución) y Promoción — las decisiones clave de marketing." },
      { name: "Customer Lifetime Value (CLV)", def: "Valor total que un cliente genera para la empresa durante toda su relación." },
      { name: "Funnel de conversión", def: "Proceso de llevar al potencial cliente desde el conocimiento hasta la compra y retención." },
      { name: "Ciclo de vida del producto", def: "Etapas (introducción, crecimiento, madurez, declive) que sigue un producto en el mercado." },
    ],
    why: "Un producto excelente sin estrategia de marketing puede fracasar, y un producto mediocre bien posicionado puede dominar el mercado. Entender cómo se forma la percepción del valor es clave para cualquier rol de negocios o emprendimiento.",
    example: "Apple no vende computadoras, vende 'simplicidad y creatividad'. Ese posicionamiento les permite cobrar 3 veces más que la competencia por hardware similar — es la estrategia de marketing más rentable de las últimas décadas.",
    difficulty_note: "Lo más difícil de marketing no es conceptual sino empírico: medir correctamente qué campañas funcionan en un mundo con múltiples canales y atribución imperfecta.",
  },

  bio: {
    summary: "La Biología estudia los procesos de la vida: desde la estructura y función de la célula hasta la evolución de las especies. Cubre biología celular, genética, fisiología y ecología. Es el punto de entrada a todas las ciencias de la salud y la biotecnología, y también es crecientemente relevante para la computación (bioinformática, biología sintética, algoritmos evolutivos).",
    concepts: [
      { name: "Célula eucariota", def: "Célula con núcleo definido y organelos membranosos; la unidad de los organismos complejos." },
      { name: "ADN / ARN", def: "Moléculas que almacenan y transmiten la información genética mediante una secuencia de bases." },
      { name: "Síntesis proteica", def: "Proceso de transcripción (ADN → ARN) y traducción (ARN → proteína) que expresa los genes." },
      { name: "Mitosis / Meiosis", def: "Mitosis: división celular que produce copias idénticas. Meiosis: produce células sexuales con mitad del genoma." },
      { name: "Selección natural", def: "Mecanismo de la evolución: los individuos más aptos dejan más descendencia." },
      { name: "Ecosistema", def: "Sistema formado por los seres vivos de un área y su interacción con el entorno físico." },
    ],
    why: "La biotecnología, la medicina personalizada, el diseño de fármacos y el CRISPR son todos biología aplicada. En CS, los algoritmos evolutivos y las redes neuronales biológicamente inspiradas tienen raíces directas en la biología.",
    example: "El ADN es un código de 4 letras (A, T, G, C) leído en tripletes (codones) para producir aminoácidos. La transcripción y traducción son un compilador molecular: ADN → ARN → proteína.",
    difficulty_note: "La cantidad de términos específicos (enzimas, proteínas, vías metabólicas) puede ser abrumadora; la clave es entender los mecanismos y no intentar memorizar cada nombre.",
  },

  anatomy: {
    summary: "La Anatomía estudia la estructura del cuerpo humano: los órganos, sistemas y su disposición espacial. Cubre los sistemas musculoesquelético, cardiovascular, respiratorio, nervioso, digestivo y reproductor. Es el mapa fundamental que todo profesional de la salud necesita para entender la fisiología, la patología y la clínica.",
    concepts: [
      { name: "Sistema musculoesquelético", def: "Huesos, articulaciones y músculos que dan soporte y permiten el movimiento." },
      { name: "Sistema cardiovascular", def: "Corazón y vasos sanguíneos que circulan sangre, nutrientes y oxígeno." },
      { name: "Sistema nervioso", def: "Red de neuronas que transmite señales y coordina las funciones del cuerpo." },
      { name: "Planos anatómicos", def: "Referencias espaciales estandarizadas: sagital, coronal y axial para describir posiciones." },
      { name: "Homeostasis", def: "Capacidad del organismo de mantener condiciones internas estables ante cambios externos." },
      { name: "Inervación", def: "Distribución de nervios en un tejido u órgano que determina su control y sensibilidad." },
    ],
    why: "Sin conocer la anatomía no se pueden interpretar imágenes médicas (radiografías, TAC), realizar procedimientos clínicos ni entender por qué una enfermedad produce determinados síntomas.",
    example: "Saber que el nervio ciático recorre la cara posterior del muslo explica por qué una hernia de disco lumbar puede causar dolor que baja por la pierna — la inflamación comprime el nervio lejos de donde se origina el problema.",
    difficulty_note: "La anatomía exige un esfuerzo considerable de memorización tridimensional; las relaciones espaciales entre órganos son difíciles de aprender solo con texto y requieren modelos o disección.",
  },

  biochem: {
    summary: "La Bioquímica estudia los procesos químicos que ocurren en los seres vivos. Analiza la estructura y función de las macromoléculas biológicas (proteínas, lípidos, carbohidratos, ácidos nucleicos), el metabolismo energético y las vías de señalización celular. Es el puente entre la química y la biología, y la base de la farmacología y la biotecnología.",
    concepts: [
      { name: "Aminoácido / Proteína", def: "Las proteínas son cadenas de aminoácidos que se pliegan en estructuras 3D con funciones específicas." },
      { name: "Enzima", def: "Proteína catalizadora que acelera reacciones bioquímicas sin consumirse en el proceso." },
      { name: "Glucólisis", def: "Vía metabólica que convierte glucosa en piruvato, produciendo ATP en el citoplasma." },
      { name: "Ciclo de Krebs", def: "Serie de reacciones en la mitocondria que oxida acetil-CoA para producir ATP y NADH." },
      { name: "ATP", def: "Adenosín trifosfato: la 'moneda energética' universal de la célula." },
      { name: "Vía metabólica", def: "Secuencia de reacciones químicas catalizadas por enzimas que transforman moléculas." },
    ],
    why: "Todo fármaco actúa modificando una reacción bioquímica: inhibiendo una enzima, bloqueando un receptor o alterando una vía metabólica. Sin bioquímica no hay diseño de fármacos ni comprensión de enfermedades metabólicas como la diabetes.",
    example: "La aspirina inhibe la enzima COX (ciclooxigenasa), que produce prostaglandinas responsables del dolor e inflamación. Al bloquear la enzima, se corta la producción de esas moléculas y el dolor disminuye.",
    difficulty_note: "Las vías metabólicas (glucólisis, ciclo de Krebs, cadena respiratoria) tienen muchos pasos intermedios; entender la lógica energética del proceso es más importante que memorizar cada molécula.",
  },

  biostats: {
    summary: "La Bioestadística aplica los métodos estadísticos al diseño e interpretación de estudios biológicos y médicos. Cubre el diseño de ensayos clínicos aleatorios, análisis de supervivencia, regresión logística y métodos para datos correlacionados. Es la herramienta que permite determinar si un tratamiento médico realmente funciona.",
    concepts: [
      { name: "Ensayo clínico aleatorizado", def: "Estudio donde los participantes se asignan aleatoriamente a tratamiento o control para eliminar sesgos." },
      { name: "Riesgo relativo / Odds ratio", def: "Medidas de asociación entre exposición y enfermedad usadas en estudios epidemiológicos." },
      { name: "Curva de Kaplan-Meier", def: "Estimador no paramétrico de la función de supervivencia a lo largo del tiempo." },
      { name: "Regresión de Cox", def: "Modelo para datos de supervivencia que estima el efecto de covariables sobre el tiempo hasta un evento." },
      { name: "Sesgo", def: "Error sistemático en un estudio que lleva a conclusiones incorrectas sobre la verdadera asociación." },
      { name: "Poder estadístico", def: "Probabilidad de detectar un efecto real cuando existe; determina el tamaño muestral necesario." },
    ],
    why: "Sin bioestadística no existiría la medicina basada en evidencia. Es la disciplina que decide qué tratamientos se aprueban: cada fármaco en el mercado pasó por ensayos clínicos analizados con bioestadística.",
    example: "Un estudio encuentra que una vacuna reduce la infección un 85%. La bioestadística determina si ese resultado es estadísticamente significativo o podría ser azar, calculando intervalos de confianza y valores p.",
    difficulty_note: "El análisis de supervivencia con datos censurados y los modelos para medidas repetidas son más complejos que la estadística clásica y requieren atención especial a los supuestos del modelo.",
  },

  pharma: {
    summary: "La Farmacología estudia cómo los fármacos interactúan con el organismo: cómo se absorben, distribuyen, metabolizan y eliminan (farmacocinética), y cómo producen sus efectos biológicos (farmacodinamia). Es la base del tratamiento médico racional y del desarrollo de nuevos medicamentos.",
    concepts: [
      { name: "Farmacocinética (ADME)", def: "Absorción, Distribución, Metabolismo y Excreción: describe el recorrido del fármaco en el cuerpo." },
      { name: "Farmacodinamia", def: "Estudio de los efectos bioquímicos y fisiológicos del fármaco y su mecanismo de acción." },
      { name: "Receptor", def: "Molécula (generalmente proteína) con la que el fármaco interactúa para producir su efecto." },
      { name: "Agonista / Antagonista", def: "Agonista: activa el receptor. Antagonista: bloquea el receptor impidiendo la activación." },
      { name: "Vida media (t½)", def: "Tiempo necesario para que la concentración plasmática del fármaco se reduzca a la mitad." },
      { name: "Curva dosis-respuesta", def: "Relación entre la dosis administrada y la magnitud del efecto farmacológico." },
    ],
    why: "Saber farmacología permite entender por qué algunos medicamentos se toman con comida, por qué ciertos antibióticos se dosifican cada 8 horas y otros cada 24, y por qué ciertas combinaciones de fármacos son peligrosas.",
    example: "La aspirina tiene vida media de ~6 horas, pero para antiagregación plaquetaria se toma una vez al día porque inhibe irreversiblemente la enzima COX — el plaquetario afectado no puede regenerarla durante su vida útil.",
    difficulty_note: "Relacionar los parámetros farmacocinéticos (volumen de distribución, clearance, biodisponibilidad) con ajustes de dosis en insuficiencia renal o hepática requiere integrar mucho conocimiento previo.",
  },

  neuro: {
    summary: "La Neurociencia estudia el sistema nervioso: su estructura, función y cómo genera el comportamiento, la cognición y la conciencia. Integra biología molecular, electrofisiología, psicología y computación para entender cómo el cerebro procesa información. Es una de las fronteras científicas más activas del siglo XXI.",
    concepts: [
      { name: "Neurona", def: "Célula especializada en transmitir señales eléctricas y químicas." },
      { name: "Potencial de acción", def: "Señal eléctrica todo-o-nada que viaja por el axón de la neurona." },
      { name: "Sinapsis", def: "Unión entre neuronas donde se transmite la señal mediante neurotransmisores." },
      { name: "Neurotransmisor", def: "Molécula química (dopamina, serotonina, GABA) que transmite la señal sináptica." },
      { name: "Plasticidad sináptica", def: "Capacidad de las sinapsis de fortalecerse o debilitarse según el uso; base del aprendizaje." },
      { name: "Sistemas cerebrales", def: "Redes de regiones cerebrales que trabajan coordinadas para funciones específicas (memoria, emoción, movimiento)." },
    ],
    why: "La neurociencia está en la base del tratamiento del Alzheimer, la depresión y el Parkinson, del desarrollo de interfaces cerebro-computadora (BCI) y de la IA inspirada en el cerebro. Entender cómo aprende el cerebro informa el diseño de algoritmos de aprendizaje.",
    example: "La potenciación a largo plazo (LTP) es el mecanismo celular del aprendizaje: sinapsis que se activan juntas se fortalecen. El principio 'neuronas que disparan juntas se conectan juntas' (Hebb) inspiró el aprendizaje en redes neuronales artificiales.",
    difficulty_note: "La neurociencia de sistemas — cómo regiones cerebrales trabajan en conjunto para producir cognición — es mucho más difícil que la neurociencia celular porque los fenómenos son más complejos y los métodos más indirectos.",
  },

  philo: {
    summary: "La Filosofía estudia las preguntas más fundamentales sobre la existencia, el conocimiento, la moralidad y la razón. A través de la lógica formal, la epistemología, la metafísica y la ética, desarrolla la capacidad de pensar rigurosamente sobre cualquier problema. Es la disciplina que enseña a argumentar con claridad y a cuestionar los supuestos que damos por sentados.",
    concepts: [
      { name: "Argumento válido", def: "Argumento donde las premisas garantizan lógicamente la conclusión." },
      { name: "Epistemología", def: "Rama de la filosofía que estudia la naturaleza, el origen y los límites del conocimiento." },
      { name: "Metafísica", def: "Estudio de la naturaleza fundamental de la realidad: ser, tiempo, causalidad, identidad." },
      { name: "Racionalismo vs. Empirismo", def: "Racionalismo: el conocimiento viene de la razón. Empirismo: viene de la experiencia sensorial." },
      { name: "Lógica formal", def: "Sistema axiomático para evaluar la validez de argumentos mediante reglas de inferencia." },
      { name: "Sofisma", def: "Argumento que parece válido pero contiene un error lógico oculto." },
    ],
    why: "La capacidad de distinguir un argumento válido de uno inválido, identificar supuestos ocultos y pensar con precisión sobre conceptos abstractos es aplicable en cualquier disciplina. Los fundadores de la computación teórica (Turing, Church) eran filósofos matemáticos.",
    example: "El problema de 'la mente y el cuerpo' de Descartes — ¿cómo se relaciona lo mental con lo físico? — es hoy central en neurociencia, IA e interfaces cerebro-computadora. La filosofía plantea las preguntas que la ciencia luego intenta responder.",
    difficulty_note: "Los textos filosóficos originales (Kant, Hegel, Heidegger) son notoriamente difíciles; la clave es buscar buenos comentarios y no dudar en releer los mismos párrafos múltiples veces.",
  },

  ethics: {
    summary: "La Ética estudia qué acciones son correctas o incorrectas y por qué. Analiza las grandes teorías normativas — el utilitarismo, la deontología kantiana, la ética de virtudes — y las aplica a dilemas concretos en medicina, tecnología, negocios y la vida pública. En el mundo actual, la ética aplicada a la IA y a la biotecnología es urgente y prácticamente no tiene precedentes.",
    concepts: [
      { name: "Utilitarismo", def: "Una acción es correcta si maximiza el bienestar total del mayor número de personas." },
      { name: "Imperativo categórico (Kant)", def: "Actúa solo según máximas que puedas querer que sean leyes universales." },
      { name: "Ética de virtudes", def: "La ética se centra en el carácter del agente, no en las reglas o las consecuencias." },
      { name: "Dilema moral", def: "Situación donde no existe una opción claramente correcta y cualquier elección tiene costos éticos." },
      { name: "Ética aplicada", def: "Aplicación de marcos éticos a problemas concretos: bioética, ética tecnológica, ética empresarial." },
      { name: "Derechos y deberes", def: "Enfoque deontológico que identifica obligaciones morales independientemente de las consecuencias." },
    ],
    why: "Las decisiones de los ingenieros que diseñan algoritmos de recomendación o sistemas de vigilancia tienen consecuencias éticas reales. La bioética determina qué experimentos médicos son permisibles. La ética profesional define límites en cualquier carrera.",
    example: "Un algoritmo de contratación entrenado en datos históricos aprende a discriminar por género o raza. La ética ayuda a articular por qué está mal, qué principios viola y cómo debería diseñarse de manera diferente.",
    difficulty_note: "El mayor desafío no es aprender las teorías sino aplicarlas: los dilemas reales son complejos y diferentes marcos éticos pueden llevar a conclusiones contradictorias.",
  },

  linguistics: {
    summary: "La Lingüística es la ciencia del lenguaje: estudia cómo los seres humanos adquieren, usan y procesan el lenguaje. Cubre la fonología (sonidos), la morfología (palabras), la sintaxis (oraciones), la semántica (significado) y la pragmática (uso en contexto). Es fundamental para el procesamiento del lenguaje natural (NLP) en computación y para entender la cognición humana.",
    concepts: [
      { name: "Fonema / Morfema", def: "Fonema: unidad mínima de sonido. Morfema: unidad mínima de significado." },
      { name: "Gramática generativa (Chomsky)", def: "Teoría de que el lenguaje es un sistema de reglas generativas que produce oraciones bien formadas." },
      { name: "Semántica composicional", def: "Principio de que el significado de una oración se construye a partir del significado de sus partes." },
      { name: "Acto de habla", def: "Uso del lenguaje para realizar acciones: prometer, pedir, afirmar, amenazar." },
      { name: "Adquisición del lenguaje", def: "Proceso por el cual los niños aprenden su lengua materna sin instrucción explícita." },
      { name: "Tipología lingüística", def: "Clasificación de las lenguas del mundo según sus características estructurales comunes." },
    ],
    why: "Los modelos de lenguaje como GPT están construidos sobre fundamentos lingüísticos: tokenización, análisis sintáctico y representaciones semánticas. Entender lingüística formal hace más comprensible cómo funcionan estos modelos y cuáles son sus limitaciones.",
    example: "La oración 'Volando se llega lejos' es gramaticalmente ambigua. La lingüística formal describe esta ambigüedad con árboles de análisis sintáctico — exactamente lo que hacen los parsers en compiladores y en NLP.",
    difficulty_note: "La sintaxis formal (gramáticas de Chomsky, X-bar theory) es técnicamente densa y requiere abstraer de los ejemplos concretos hacia reglas generativas muy abstractas.",
  },

  physiology: {
    summary: "La Fisiología estudia cómo los órganos y sistemas del cuerpo humano funcionan para mantener la vida. Analiza los mecanismos del sistema cardiovascular, respiratorio, renal, endocrino y nervioso desde una perspectiva de regulación y homeostasis. Es el puente indispensable entre la anatomía (estructura) y la patología (disfunción): solo se puede entender qué sale mal cuando primero se domina qué sale bien.",
    concepts: [
      { name: "Homeostasis", def: "Mantenimiento activo de condiciones internas estables (temperatura, pH, glucosa) ante cambios externos." },
      { name: "Gasto cardíaco", def: "Volumen de sangre que el corazón bombea por minuto: frecuencia cardíaca × volumen sistólico." },
      { name: "Hematosis", def: "Intercambio gaseoso en los pulmones: O₂ pasa a la sangre y CO₂ es eliminado." },
      { name: "Filtración glomerular (TFG)", def: "Tasa a la que el riñón filtra la sangre; clave para evaluar función renal." },
      { name: "Retroalimentación negativa", def: "Mecanismo regulatorio donde el efecto de una señal reduce la señal misma, estabilizando el sistema." },
      { name: "Potencial de reposo", def: "Diferencia de voltaje (−70 mV) a través de la membrana neuronal en ausencia de estimulación." },
    ],
    why: "Entender la fisiología es entender por qué los síntomas de las enfermedades tienen sentido. La hipertensión, la diabetes y la insuficiencia cardíaca son desregulaciones de mecanismos fisiológicos concretos. Sin esta base, la clínica se convierte en memorización de síntomas sin comprensión.",
    example: "Cuando un paciente pierde sangre, el sistema nervioso simpático aumenta la frecuencia cardíaca y contrae los vasos periféricos para mantener la presión arterial — un ejemplo de retroalimentación homeostática que todo médico debe poder explicar.",
    difficulty_note: "Integrar la función de múltiples sistemas simultáneamente — por ejemplo, cómo el riñón y el pulmón cooperan para regular el pH — es conceptualmente exigente y requiere dominar cada sistema por separado antes de integrarlos.",
  },

  genetics: {
    summary: "La Genética estudia cómo la información hereditaria se almacena en el ADN, se expresa como proteínas y se transmite de generación en generación. Cubre la herencia mendeliana, la estructura del cromosoma, la regulación génica, las mutaciones y los trastornos cromosomales. Conecta directamente con la bioquímica (el ADN es una molécula) y con la medicina (las enfermedades genéticas tienen mecanismos moleculares precisos).",
    concepts: [
      { name: "Herencia mendeliana", def: "Reglas de Mendel sobre cómo se transmiten los alelos: dominancia, recesividad, segregación." },
      { name: "Genotipo / Fenotipo", def: "Genotipo: composición alélica del individuo. Fenotipo: características observables resultantes." },
      { name: "Mutación", def: "Cambio en la secuencia del ADN; puede ser puntual, deleción, inserción o duplicación." },
      { name: "Regulación génica", def: "Control de cuándo, dónde y cuánto se expresa un gen, mediante promotores, factores de transcripción y epigenética." },
      { name: "Cariotipo", def: "Representación ordenada de los cromosomas de una célula; revela anomalías cromosómicas." },
      { name: "Genomía", def: "Estudio del genoma completo de un organismo; permite identificar variantes asociadas a enfermedades." },
    ],
    why: "Cada vez más enfermedades (cáncer, fibrosis quística, síndrome de Down) se entienden y tratan a nivel genético. La medicina de precisión personaliza tratamientos según el perfil genético del paciente. Sin genética, la oncología, la pediatría y la medicina preventiva del siglo XXI son incomprensibles.",
    example: "La fibrosis quística es causada por una mutación puntual en el gen CFTR que codifica un canal de cloro. Al conocer la mutación exacta, los farmacólogos diseñaron moduladores específicos (ivacaftor) que restauran la función proteica — tratamiento imposible sin genética molecular.",
    difficulty_note: "La genética de poblaciones y la herencia ligada al sexo con cromosomas X e Y son los temas donde más errores conceptuales se acumulan; hay que trazar los cruces cuidadosamente antes de inferir probabilidades.",
  },

  pathology: {
    summary: "La Patología estudia los mecanismos de las enfermedades: qué ocurre a nivel celular y tisular cuando el cuerpo falla. Cubre la lesión celular, la inflamación aguda y crónica, la neoplasia, los trastornos hemodinámicos (trombosis, edema) y la reparación de tejidos. Es el puente definitivo entre las ciencias básicas y la clínica: conecta todo lo aprendido en biología, bioquímica, fisiología y genética con la enfermedad observable.",
    concepts: [
      { name: "Necrosis / Apoptosis", def: "Necrosis: muerte celular por daño; proceso inflamatorio. Apoptosis: muerte celular programada; sin inflamación." },
      { name: "Inflamación aguda", def: "Respuesta inmediata al daño tisular: vasodilatación, exudado y llegada de neutrófilos." },
      { name: "Neoplasia", def: "Crecimiento celular anormal y autónomo; benigno (localizado) o maligno (invasivo y metastásico)." },
      { name: "Trombosis", def: "Formación de un coágulo intravascular que puede obstruir el flujo sanguíneo." },
      { name: "Fibrosis", def: "Depósito excesivo de tejido conectivo como respuesta a daño crónico; reemplaza tejido funcional." },
      { name: "Metástasis", def: "Diseminación de células malignas desde el tumor primario a sitios distantes por vía sanguínea o linfática." },
    ],
    why: "Toda enfermedad tiene un mecanismo patológico subyacente. La patología es lo que permite al médico razonar desde el síntoma hasta la causa: por qué un infarto provoca necrosis miocárdica, por qué la cirrosis causa hipertensión portal, por qué el cáncer de pulmón metastatiza al cerebro. Sin esta lógica, la medicina es pura memorización.",
    example: "Un tumor benigno de mama (fibroadenoma) crece desplazando tejido pero respeta los límites tisulares y no invade. Un carcinoma invasor rompe la membrana basal y puede llegar a los ganglios linfáticos — la diferencia entre ambos define el tratamiento y el pronóstico.",
    difficulty_note: "Integrar la patología con la clínica requiere sintetizar conocimientos de todas las materias previas al mismo tiempo; los casos clínicos basados en patología son el mejor método de estudio.",
  },

  strategy: {
    summary: "La Estrategia Empresarial estudia cómo las organizaciones crean y sostienen ventajas competitivas en el tiempo. Cubre el análisis del entorno competitivo (fuerzas de Porter), la cadena de valor, los modelos de negocio, la estrategia de océano azul y los ciclos de planificación estratégica. Conecta la microeconomía (estructura de mercados) con la contabilidad (posición financiera de la empresa) para tomar decisiones de largo plazo.",
    concepts: [
      { name: "Cinco fuerzas de Porter", def: "Marco que analiza la intensidad competitiva de una industria: rivales, entrantes, sustitutos, proveedores y clientes." },
      { name: "Ventaja competitiva", def: "Capacidad de una empresa de generar más valor que sus rivales de manera sostenible." },
      { name: "Cadena de valor", def: "Conjunto de actividades que añaden valor al producto: logística, operaciones, marketing, servicio." },
      { name: "Estrategia genérica", def: "Las tres opciones de Porter: liderazgo en costos, diferenciación o enfoque en nicho." },
      { name: "FODA (SWOT)", def: "Análisis de Fortalezas, Oportunidades, Debilidades y Amenazas para situaciones estratégicas." },
      { name: "Océano azul", def: "Estrategia de crear un espacio de mercado sin competencia en lugar de competir en mercados existentes." },
    ],
    why: "Las empresas que no tienen estrategia clara compiten solo en precio y se destruyen en guerras de desgaste. Entender las fuerzas estructurales de una industria permite posicionarse donde la competencia es menos intensa y la rentabilidad más sostenible.",
    example: "Apple no compite en la guerra de precios de PCs porque eligió una estrategia de diferenciación: diseño, ecosistema cerrado y marca. Las cinco fuerzas explican por qué puede mantener márgenes de 40% en una industria donde los competidores tienen márgenes del 5%.",
    difficulty_note: "El mayor desafío es pasar del análisis a la decisión: los marcos dan vocabulario y estructura, pero la elección estratégica real requiere juicio sobre incertidumbres que no pueden modelarse completamente.",
  },

  operations: {
    summary: "La Gestión de Operaciones estudia cómo diseñar, operar y mejorar los procesos que producen y entregan bienes y servicios. Cubre el diseño de procesos, la planificación de capacidad, la gestión de inventarios (modelo EOQ), la cadena de suministro, el manufactura esbelta (lean) y los fundamentos de Six Sigma para la calidad. Conecta la estadística (control de calidad) con la contabilidad (costos de producción).",
    concepts: [
      { name: "Cuello de botella", def: "Etapa del proceso con menor capacidad que limita el throughput de todo el sistema." },
      { name: "EOQ (Cantidad Económica de Pedido)", def: "Cantidad óptima de inventario a pedir que minimiza los costos totales de pedido y almacenamiento." },
      { name: "Manufactura esbelta (Lean)", def: "Filosofía de eliminar todo desperdicio (tiempo, inventario, movimiento) del proceso productivo." },
      { name: "Six Sigma", def: "Metodología para reducir la variabilidad en procesos mediante DMAIC (Definir, Medir, Analizar, Mejorar, Controlar)." },
      { name: "Cadena de suministro", def: "Red de proveedores, fabricantes y distribuidores que entregan el producto al cliente final." },
      { name: "Tiempo de ciclo", def: "Tiempo total necesario para completar una unidad de producto desde el inicio hasta la entrega." },
    ],
    why: "La diferencia entre una empresa con operaciones eficientes y una ineficiente puede ser del 20-30% en costos con el mismo producto. Amazon, Toyota y Zara son ejemplos donde la excelencia operativa es la ventaja competitiva central.",
    example: "Toyota aplica el sistema Kanban (pull system) para fabricar solo lo que se demanda: una pieza se produce solo cuando el siguiente paso del proceso la solicita. Resultado: casi cero inventario en proceso y tiempo de ciclo drásticamente reducido.",
    difficulty_note: "La optimización de colas (teoría de colas) y la simulación de procesos con variabilidad estocástica requieren estadística avanzada; los modelos deterministas son más accesibles pero menos realistas.",
  },

  hrm: {
    summary: "Los Recursos Humanos (HRM) es la disciplina que gestiona el activo más valioso de cualquier organización: las personas. Cubre el reclutamiento y selección, la inducción, la evaluación del desempeño, la compensación y beneficios, el desarrollo de carrera, la cultura organizacional y los fundamentos del derecho laboral. Es la disciplina que hace que las estrategias empresariales se conviertan en comportamiento colectivo real.",
    concepts: [
      { name: "Descripción de puesto", def: "Documento que define las responsabilidades, requisitos y condiciones de trabajo de un rol." },
      { name: "Evaluación de desempeño", def: "Proceso formal de medir el logro de objetivos y competencias de un empleado en un período." },
      { name: "Compensación total", def: "Suma del salario base, bonos, beneficios (seguro, vacaciones) y compensación no monetaria." },
      { name: "Cultura organizacional", def: "Conjunto de valores, normas y comportamientos compartidos que definen cómo funciona realmente una organización." },
      { name: "Rotación de personal (turnover)", def: "Tasa a la que los empleados dejan la organización; alto turnover es costoso y señal de problemas." },
      { name: "Contrato psicológico", def: "Conjunto de expectativas no escritas entre empleado y empleador sobre lo que cada uno dará y recibirá." },
    ],
    why: "Las empresas con alta rotación de personal gastan hasta el 150% del salario anual por cada empleado que pierden, considerando reclutamiento, capacitación y pérdida de conocimiento. Una estrategia de talento sólida es tan crítica para los resultados como una estrategia de producto.",
    example: "Google implementó 'Project Oxygen' analizando datos de miles de evaluaciones de managers para identificar qué comportamientos predicen equipos de alto desempeño. El resultado: 8 comportamientos concretos que se volvieron el marco de desarrollo de liderazgo de la empresa.",
    difficulty_note: "Lo más difícil de RRHH no es conceptual sino aplicado: diseñar sistemas que sean percibidos como justos por las personas involucradas, en contextos legales y culturales específicos que no se pueden ignorar.",
  },

  "data-viz": {
    summary: "La Visualización de Datos estudia cómo representar información cuantitativa de manera visual para facilitar la comprensión, el análisis y la comunicación. Cubre los principios de codificación visual de Bertin y Tufte, la selección de gráficos según el tipo de mensaje, la teoría del color para datos, los dashboards interactivos y la narrativa con datos. Conecta la estadística (comunicar resultados con rigor) con las bases de datos (transformar datos crudos en visualizaciones útiles).",
    concepts: [
      { name: "Codificación visual", def: "Asignación de variables de datos a propiedades visuales: posición, longitud, área, color, forma." },
      { name: "Relación señal-ruido (Tufte)", def: "Principio de eliminar todo elemento visual que no transmita información útil." },
      { name: "Escala de color", def: "Secuencial (magnitud), divergente (desviación de un centro) o categórica (grupos discretos)." },
      { name: "Dashboard", def: "Panel que centraliza varias visualizaciones para monitorear KPIs en tiempo real o en resumen." },
      { name: "Narrativa de datos", def: "Estructura que combina visualizaciones con contexto para contar una historia convincente con los datos." },
      { name: "Gráfico interactivo", def: "Visualización que permite al usuario filtrar, hacer zoom o explorar dimensiones adicionales." },
    ],
    why: "Un análisis estadístico correcto comunicado con el gráfico equivocado puede llevar a conclusiones falsas. La capacidad de transformar tablas de datos en visualizaciones claras y honestas es lo que diferencia a un analista de datos de un tomador de decisiones.",
    example: "El cuarteto de Anscombe muestra cuatro conjuntos de datos con idénticas estadísticas descriptivas (media, varianza, correlación) pero patrones completamente distintos que solo se revelan al graficarlos — una demostración clásica de por qué siempre hay que visualizar los datos antes de modelarlos.",
    difficulty_note: "La dificultad no está en las herramientas sino en la selección del gráfico correcto: elegir entre un mapa de calor, un gráfico de dispersión o un diagrama de Sankey requiere entender tanto los datos como la pregunta que se quiere responder.",
  },

  mlops: {
    summary: "MLOps (Machine Learning Operations) estudia cómo llevar modelos de ML a producción de manera confiable, reproducible y escalable. Cubre el ciclo de vida completo: seguimiento de experimentos, versionado de modelos y datos, integración y entrega continua (CI/CD) para ML, feature stores, monitoreo de modelos en producción, detección de data drift y pruebas A/B de modelos. Conecta el Machine Learning con la infraestructura de bases de datos y el desarrollo web.",
    concepts: [
      { name: "Seguimiento de experimentos", def: "Registro sistemático de parámetros, métricas y artefactos de cada entrenamiento para reproducibilidad." },
      { name: "Feature store", def: "Repositorio centralizado que almacena y sirve features preprocesadas para entrenamiento e inferencia." },
      { name: "CI/CD para ML", def: "Pipelines automáticos que reentrenan, evalúan y despliegan modelos cuando los datos o el código cambian." },
      { name: "Monitoreo de modelos", def: "Vigilancia continua de las métricas de desempeño del modelo en producción para detectar degradación." },
      { name: "Data drift", def: "Cambio en la distribución de los datos de entrada que hace que el modelo entrenado pierda precisión." },
      { name: "A/B testing de modelos", def: "Despliegue simultáneo de dos versiones de un modelo a subconjuntos de usuarios para comparar su desempeño real." },
    ],
    why: "El 87% de los proyectos de ML nunca llegan a producción. MLOps es la disciplina que cierra esa brecha: sin pipelines reproducibles y monitoreo continuo, un modelo que funciona en un notebook deja de funcionar meses después en producción sin que nadie lo note.",
    example: "Un modelo de recomendación entrenado en enero puede degradarse en marzo cuando los patrones de compra cambian. Sin monitoreo de data drift y reentrenamiento automático, los usuarios ven recomendaciones cada vez peores hasta que alguien nota la caída en la tasa de clics.",
    difficulty_note: "La complejidad no está en ningún concepto aislado sino en la orquestación: integrar seguimiento de experimentos, versionado de datos, CI/CD y monitoreo en un pipeline unificado requiere dominar múltiples herramientas simultáneamente.",
  },

  history: {
    summary: "La Historia estudia el pasado humano a través del análisis crítico de fuentes primarias y secundarias. En el nivel universitario va más allá de memorizar fechas: analiza causas, consecuencias, patrones estructurales y cómo distintas perspectivas construyen narrativas diferentes. Desarrolla el pensamiento crítico sobre el cambio, la continuidad y la causalidad.",
    concepts: [
      { name: "Fuente primaria / secundaria", def: "Primaria: documento contemporáneo al evento. Secundaria: interpretación posterior de fuentes primarias." },
      { name: "Historiografía", def: "Estudio de cómo se ha escrito la historia: métodos, corrientes y sesgos de los historiadores." },
      { name: "Causalidad histórica", def: "Análisis de las causas (inmediatas, estructurales, contingentes) de los procesos históricos." },
      { name: "Periodización", def: "División del tiempo en períodos con características comunes; cualquier periodización implica una interpretación." },
      { name: "Historia global", def: "Perspectiva que analiza procesos históricos en su escala mundial e interconectada." },
      { name: "Historia social", def: "Enfoque que estudia la vida cotidiana, las estructuras sociales y los grupos marginados." },
    ],
    why: "Entender el pasado es la única forma de contextualizar el presente. Las crisis económicas, los conflictos geopolíticos y las transformaciones tecnológicas tienen antecedentes históricos que iluminan sus dinámicas actuales.",
    example: "La Gran Depresión de 1929 fue estudiada a fondo por los economistas que diseñaron la respuesta a la crisis financiera de 2008. Ben Bernanke, presidente de la Fed, era académicamente un experto en la Depresión — la historia como guía de política.",
    difficulty_note: "El mayor desafío es la escritura histórica: construir un argumento causalmente coherente sobre el pasado, respaldado con evidencia, sin caer en el presentismo (juzgar el pasado con valores actuales).",
  },

}
