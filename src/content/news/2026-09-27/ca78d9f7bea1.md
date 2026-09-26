---
title: "FinanceHub #2: Cuando el código compila pero igual está mal"
originalUrl: "https://dev.to/eduuu_dev/financehub-2-cuando-el-codigo-compila-pero-igual-esta-mal-39i7"
date: "2026-09-26T23:49:54.482Z"
---

# FinanceHub #2: When the code compiles but is still wrong

**Introducción**
En el artículo anterior conté cómo decidimos migrar FinanceHub de una plataforma no-code a un backend propio, y que la parte difícil no fue escribir código: fue decidir cómo construirlo. Dije que antes de pedirle cualquier tarea a un agente de IA, definimos la arquitectura, el modelo de datos, el contrato de API y un plan por fases. Esta es la parte de cómo eso se sostuvo en la práctica, y lo que encontramos cuando lo pusimos a prueba de verdad.

**Introduction**
In the previous article, I shared how we decided to migrate FinanceHub from a no-code platform to our own backend, and that the hard part wasn't writing the code: it was deciding how to build it. I mentioned that before asking an AI agent for any task, we defined the architecture, the data model, the API contract, and a phased plan. This is about how that held up in practice, and what we found when we put it to the real test.

***

**Empezar por la spec, no por el código**
La regla de fondo fue simple de enunciar y difícil de respetar bajo presión: el contrato de API (openapi.yml) y el schema de base de datos se trataron como entradas fijas, no como algo que se pudiera improvisar al toparse con un gap. En concreto: Si un campo no está en el contrato, no existe en el DTO. Protocolo contract-first: cualquier cambio de forma en un endpoint actualiza openapi.yml primero, se avisa explícitamente, y recién después se escribe código. Nunca al revés.

**Start with the spec, not the code**
The underlying rule was simple to state but difficult to respect under pressure: the API contract (openapi.yml) and the database schema were treated as fixed inputs, not as something that could be improvised when hitting a gap. Specifically: If a field isn't in the contract, it doesn't exist in the DTO. Contract-first protocol: any shape change in an endpoint updates openapi.yml first, is explicitly communicated, and only then is code written. Never the other way around.

***

El plan completo se escribió por adelantado, descompuesto en fases y tareas numeradas, cada una acotada a aproximadamente una entidad de dominio y su CRUD, con su propio paso de verificación decidido antes de empezar. Reglas vivas en archivos propios (.claude/rules/*.md) para todo lo que alguien nuevo en el código se equivocaría si no se le dice explícitamente: qué campos son calculados por triggers y nunca deben aceptarse en un request, la forma exacta de la paginación (no la que parece obvia a primera vista), el envelope de error estándar. Nada de esto es exótico. Es básicamente spec-driven development, aplicado de forma intuitiva antes de saberle poner nombre. Lo que sí cambió las reglas del juego fue quién ejecutaba el plan: un agente de IA, tarea por tarea, contra ese contrato fijo.

The entire plan was written in advance, broken down into phases and numbered tasks, each limited to approximately one domain entity and its CRUD, with its own verification step decided before starting. Living rules in dedicated files (.claude/rules/*.md) covered everything a newcomer to the code would get wrong if not explicitly told: which fields are calculated by triggers and should never be accepted in a request, the exact format of pagination (not the one that seems obvious at first glance), and the standard error envelope. None of this is exotic. It is basically spec-driven development, applied intuitively before we even knew what to call it. What did change the rules of the game was who executed the plan: an AI agent, task by task, against that fixed contract.

***

**"Compila y los tests pasan" no fue nunca la vara de medida**
Con un agente escribiendo la mayoría del código, la pregunta dejó de ser "¿funciona?" y pasó a ser "¿cómo lo sé?". La respuesta fue una verificación de 6 pasos por tarea, siempre en el mismo orden: Compilar limpio. Correr la suite de tests contra Postgres — el stack usa citext, row-level security y el schema auth de Supabase, así que nunca corrió contra un H2 en memoria. Levantar la app completa. Obtener un JWT emitido por Supabase, nunca un stub sintético. Probar a mano el endpoint: happy path, validación, ownership, 401/404. Limpiar los datos de prueba. Ese paso 4 en particular parece un detalle. No lo fue.

**"It compiles and tests pass" was never the yardstick**
With an agent writing most of the code, the question stopped being "does it work?" and became "how do I know?". The answer was a 6-step verification per task, always in the same order: Clean compile. Run the test suite against Postgres — the stack uses citext, row-level security, and the Supabase auth schema, so it never ran against an in-memory H2. Spin up the full app. Obtain a JWT issued by Supabase, never a synthetic stub. Manually test the endpoint: happy path, validation, ownership, 401/404. Clean up test data. That step 4 in particular seems like a detail. It wasn't.

***

**Lo que apareció al probar contra el sistema corriendo**
En cada uno de estos casos el código compilaba, la explicación del agente sonaba razonable, y aun así estaba mal. El login que fallaba en silencio. Supabase firma sus JWT con ES256. El decoder por defecto de Spring Security Resource Server solo confía en RS256. Todo token emitido por Supabase era rechazado con un 401 silencioso — nada crasheaba, nada quedaba en rojo, simplemente nadie podía entrar. Se detectó porque el paso 4 exigía ese token, no uno sintético fabricado para que el test pasara.

**What appeared when testing against the running system**
In each of these cases, the code compiled, the agent's explanation sounded reasonable, and yet it was wrong. The login that failed silently. Supabase signs its JWTs with ES256. The default Spring Security Resource Server decoder only trusts RS256. Every token issued by Supabase was rejected with a silent 401 — nothing crashed, nothing turned red, simply no one could log in. It was detected because step 4 required that token, not a synthetic one manufactured to make the test pass.

***

El PATCH que borraba datos. Una actualización parcial sobreescribía con null cualquier campo opcional que el cliente omitiera del body. Es el tipo de bug que nunca aparece en un test que manda el objeto completo, y que solo se manifiesta cuando un cliente manda un payload parcial, como hace cualquier formulario de edición. Veinticuatro políticas de seguridad que no protegían nada. El proyecto tenía row-level security habilitado en 20 tablas, con 24 políticas bien escritas. Todas eran código muerto: Postgres deniega acceso a nivel de GRANT de schema/tabla antes de evaluar cualquier policy, y ninguno de los schemas custom tenía ese GRANT otorgado para los roles sin privilegios que RLS debía proteger. Nada de esto aparece en un test unitario, en mvn test, ni leyendo las políticas una por una — hacía falta conectarse efectivamente como el rol restringido y confirmar que incluso los datos propios de un usuario volvían "permission denied" en vez de filtrarse correctamente.

The PATCH that deleted data. A partial update would overwrite with null any optional field the client omitted from the body. It's the type of bug that never appears in a test that sends the full object, and only manifests when a client sends a partial payload, as any edit form does. Twenty-four security policies that protected nothing. The project had row-level security enabled on 20 tables, with 24 well-written policies. They were all dead code: Postgres denies access at the schema/table GRANT level before evaluating any policy, and none of the custom schemas had that GRANT granted for the unprivileged roles that RLS was supposed to protect. None of this appears in a unit test, in `mvn test`, or by reading the policies one by one — you had to effectively connect as the restricted role and confirm that even a user's own data returned "permission denied" instead of being filtered correctly.

***

El reporte que mentía según la zona horaria. Una vista de resumen mensual agrupaba con date_trunc('month', columna_timestamptz). En UTC, eso es invisible. En el timezone que usa el proyecto, cada transacción se reportaba en silencio bajo el mes anterior. Se veía correcto leyendo el SQL. Se veía correcto en el código. Solo dejó de verse correcto al comparar los números contra un resultado ya conocido de antemano.

The report that lied based on the time zone. A monthly summary view grouped by `date_trunc('month', timestamptz_column)`. In UTC, that is invisible. In the time zone used by the project, every transaction was silently reported under the previous month. It looked correct reading the SQL. It looked correct in the code. It only stopped looking correct when comparing the numbers against a known result beforehand.

***

**Lo que esto significa**
Ninguno de estos bugs era exótico ni difícil de explicar una vez encontrado. Lo que los volvía peligrosos es que cada uno pasaba cualquier revisión superficial: el código compilaba, la lógica sonaba bien al leerla, y en más de un caso hasta "se veía correcto". Un agente de IA puede escribir muchísimo código, y puede sonar convincente explicando por qué ese código está bien. Pero "el agente dice que está bien" nunca fue tratado como suficiente — ni "los tests están en verde", si esos tests corrían contra un stub en vez de contra el sistema corriendo. La disciplina de verificación no reemplazó al agente. Decidió qué evidencia contaba como prueba de que algo funcionaba, y qué no.

**What this means**
None of these bugs were exotic or difficult to explain once found. What made them dangerous is that each one passed any superficial review: the code compiled, the logic sounded good when read, and in more than one case it even "looked correct." An AI agent can write a lot of code, and it can sound convincing explaining why that code is good. But "the agent says it's good" was never treated as sufficient — nor was "the tests are green," if those tests ran against a stub instead of the running system. The verification discipline didn't replace the agent. It decided what evidence counted as proof that something worked, and what didn't.

***

**Lo que viene**
Con el backend construido y verificado, el frontend trajo una clase distinta de problema: ya no había una spec nueva que seguir en cada paso, sino un sistema existente que había que mantener honesto a medida que aparecían hechos nuevos. Ahí apareció, entre otras cosas, un bug de cobro que ninguna suite en verde podía haber atrapado por diseño — y de eso quiero hablar en la próxima entrega.

**What's next**
With the backend built and verified, the frontend brought a different class of problem: there was no longer a new spec to follow at each step, but an existing system that had to be kept honest as new facts emerged. That's where, among other things, a billing bug appeared that no green suite could have caught by design — and that is what I want to talk about in the next installment.