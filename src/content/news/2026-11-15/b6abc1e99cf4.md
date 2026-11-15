---
title: "Cómo implementamos una base de datos NoSQL con Firebase Firestore y automatizamos su despliegue en la nube"
originalUrl: "https://dev.to/juancalderon1218/como-implementamos-una-base-de-datos-nosql-con-firebase-firestore-y-automatizamos-su-despliegue-en-4989"
date: "2026-11-15T00:56:17.000Z"
excerpt: true
---

> 本文为原文前 6,000 字符的节选翻译，完整内容请查看原文。

# Cómo implementamos una base de datos NoSQL con Firebase Firestore y automatizamos su despliegue en la nube

### Introducción
Cuando desarrollamos una aplicación web, una de las decisiones importantes es elegir cómo vamos a almacenar la información. Existen diferentes alternativas, pero no todas funcionan de la misma manera ni requieren la misma configuración. En nuestro proyecto decidimos trabajar con una base de datos NoSQL, porque queríamos conocer cómo funciona el almacenamiento mediante documentos y cómo se puede conectar directamente con una aplicación moderna. Para ponerlo en práctica desarrollamos TaskFlow, un sistema web para gestionar tareas personales utilizando React, Firebase Authentication y Cloud Firestore. Nuestro objetivo no era solamente crear una interfaz que permitiera registrar actividades, sino implementar una solución que almacenara los datos en la nube, controlara el acceso de los usuarios y pudiera publicarse automáticamente utilizando GitHub Actions. En este artículo explicaré cómo está organizada la aplicación, cómo funciona la base de datos NoSQL, qué mecanismos de seguridad utilizamos y cómo conseguimos automatizar su publicación.

### 引言
在开发 Web 应用程序时，重要的决策之一是选择如何存储信息。虽然存在多种替代方案，但并非所有方案的运作方式或配置要求都相同。在我们的项目中，我们决定使用 NoSQL 数据库，因为我们想了解基于文档的存储是如何工作的，以及它如何直接与现代应用程序连接。为了付诸实践，我们开发了 TaskFlow，这是一个使用 React、Firebase Authentication 和 Cloud Firestore 管理个人任务的 Web 系统。我们的目标不仅是创建一个允许记录活动的界面，还要实现一个能够将数据存储在云端、控制用户访问并能使用 GitHub Actions 自动发布的解决方案。在本文中，我将解释该应用程序的组织方式、NoSQL 数据库的工作原理、我们使用的安全机制以及我们如何实现发布自动化。

### 1. ¿En qué consiste TaskFlow?
TaskFlow es una aplicación que permite administrar actividades personales desde un navegador. Su funcionamiento es sencillo: el usuario se registra, inicia sesión y accede a un panel donde puede crear, consultar, modificar y eliminar sus tareas. Cada tarea contiene información básica, como el título, descripción, fecha límite y estado. También implementamos tres estados para organizar las actividades: pendiente, en proceso y completada. Una característica importante es que cada tarea está asociada al usuario que la registró. Esto permite organizar la información sin mezclar las actividades de distintas cuentas. [INSERTAR CAPTURA 1: Panel principal de TaskFlow]

### 1. TaskFlow 是什么？
TaskFlow 是一个允许通过浏览器管理个人活动的应用程序。其操作很简单：用户注册、登录并进入一个面板，在那里可以创建、查询、修改和删除任务。每个任务都包含基本信息，如标题、描述、截止日期和状态。我们还实现了三种状态来组织活动：待办、进行中和已完成。一个重要的特性是，每个任务都与注册它的用户相关联。这使得组织信息时不会混淆不同账户的活动。[插入截图 1：TaskFlow 主面板]

### 2. Arquitectura de la aplicación
Para organizar TaskFlow utilizamos una arquitectura basada en servicios de Firebase. La aplicación está dividida en tres componentes principales: Frontend: desarrollado con React y Vite. Es la parte visual con la que interactúa el usuario. Autenticación: implementada mediante Firebase Authentication, que permite registrar usuarios e iniciar sesión con correo y contraseña. Base de datos: desarrollada con Cloud Firestore, encargada de almacenar y recuperar los documentos de las tareas. El funcionamiento general puede representarse así: USUARIO | v APLICACIÓN REACT | +--------+--------+ | | v v FIREBASE AUTH CLOUD FIRESTORE | | Verifica usuario Guarda y consulta | documentos NoSQL +--------+--------+ | v PANEL DE TAREAS Esta organización nos permitió desarrollar las funcionalidades del sistema sin necesidad de implementar un servidor backend tradicional. En este caso, React utiliza directamente los SDK de Firebase para comunicarse con los servicios de autenticación y almacenamiento. Sin embargo, eso no significa que la aplicación carezca de backend. Firebase proporciona los servicios backend administrados que necesitamos.

### 2. 应用程序架构
为了组织 TaskFlow，我们使用了基于 Firebase 服务的架构。该应用程序分为三个主要组件：前端：使用 React 和 Vite 开发，是用户交互的视觉部分。身份验证：通过 Firebase Authentication 实现，允许用户注册并使用电子邮件和密码登录。数据库：使用 Cloud Firestore 开发，负责存储和检索任务文档。其总体运作方式可表示为：用户 | v React 应用程序 | +--------+--------+ | | v v Firebase Auth Cloud Firestore | | 验证用户 保存并查询 | NoSQL 文档 +--------+--------+ | v 任务面板。这种组织方式使我们无需实现传统的后端服务器即可开发系统功能。在这种情况下，React 直接使用 Firebase SDK 与身份验证和存储服务进行通信。然而，这并不意味着应用程序缺乏后端，Firebase 提供了我们所需的托管后端服务。

### 3. ¿Por qué elegimos Firebase Firestore?
Uno de los objetivos del proyecto era utilizar una base de datos NoSQL diferente de las tecnologías que normalmente se trabajan en aplicaciones tradicionales. Por eso elegimos Cloud Firestore, una base de datos orientada a documentos. En una base de datos relacional, como MySQL, normalmente definimos tablas y relaciones mediante un esquema estructurado. En Firestore, en cambio, la información se organiza mediante colecciones y documentos. Por ejemplo, para nuestro proyecto utilizamos la colección tareas. Cada documento representa una tarea registrada. Firestore | └── tareas | ├── tarea_001 | ├── titulo | ├── descripcion | ├── estado | ├── fecha | └── usuarioId | └── tarea_002 ├── titulo ├── descripcion ├── estado ├── fecha └── usuarioId Esto permitió almacenar las tareas mediante documentos identificados de forma independiente. Además, Firestore permite trabajar con consultas y escuchar cambios en tiempo real, características que aprovechamos para mantener actualizado el listado de tareas.

### 3. 为什么选择 Firebase Firestore？
该项目的目标之一是使用一种不同于传统应用程序中常用技术的 NoSQL 数据库。因此，我们选择了 Cloud Firestore，这是一个面向文档的数据库。在 MySQL 等关系型数据库中，我们通常通过结构化模式定义表和关系。而在 Firestore 中，信息是通过集合和文档来组织的。例如，对于我们的项目，我们使用了“任务”集合。每个文档代表一个已注册的任务。Firestore | └── 任务 | ├── 任务_001 | ├── 标题 | ├── 描述 | ├── 状态 | ├── 日期 | └── 用户ID | └── 任务_002 ├── 标题 ├── 描述 ├── 状态 ├── 日期 └── 用户ID。这允许通过独立标识的文档来存储任务。此外，Firestore 允许处理查询并实时监听更改，我们利用这些特性来保持任务列表的实时更新。

### 4. Diseño de los documentos NoSQL
Aunque Firestore no exige una estructura rígida como una tabla relacional, consideramos importante mantener una organización consistente. Por eso definimos campos comunes para todas las tareas. Un documento de ejemplo tiene esta estructura: { "titulo": "Implementar base de datos NoSQL", "descripcion": "Conectar React con Firebase Firestore", "estado": "En proceso", "fecha": "2026-11-20", "creada": "2026-11-14T23:00:00.000Z", "usuarioId": "uid_del_usuario" } Cada campo cumple una función específica. Campo Función titulo Identifica la actividad descripcion Explica qué debe realizarse estado Indica el progreso de la tarea fecha Establece una fecha límite creada Registra cuándo se creó usuarioId Identifica al propietario El campo usuarioId es especialmente importante, porque nos permite relacionar la información con Firebase Authentication. [INSERTAR CAPTURA 2: Documento almacenado en Cloud Firestore]

### 4. NoSQL 文档设计
尽管 Firestore 不像关系表那样要求严格的结构，但我们认为保持一致的组织结构非常重要。因此，我们为所有任务定义了通用字段。一个示例文档具有以下结构：{ "标题": "实现 NoSQL 数据库", "描述": "连接 React 与 Firebase Firestore", "状态": "进行中", "日期": "2026-11-20", "创建时间": "2026-11-14T23:00:00.000Z", "用户ID": "用户ID" } 每个字段都有特定的功能。字段 功能：标题 标识活动；描述 解释需要完成的内容；状态 指示任务进度；日期 设置截止日期；创建时间 记录创建时间；用户ID 标识所有者。用户ID 字段尤为重要，因为它允许我们将信息与 Firebase Authentication 关联起来。[插入截图 2：存储在 Cloud Firestore 中的文档]

### 5. Creación y conexión del proyecto
Para comenzar utilizamos Node.js, React y Vite. Desde la terminal ejecutamos: npm create vite@latest taskflow -- --template react Después instalamos las dependencias: cd taskflow npm install Una vez creada la aplicación, incorporamos Firebase mediante: npm install firebase Posteriormente configuramos el archivo firebase.js, donde inicializamos la aplicación y habilitamos los servicios necesarios. import { initializeApp } from 'firebase/app'; import { getFirestore } from 'firebase/firestore'; import { getAuth } from 'firebase/auth'; // Configuración obtenida desde Firebase Console const firebaseConfig = { // Datos de configuración de nuestra aplicación }; const app = initializeApp(firebaseConfig); export const db = getFirestore(app); export const auth = getAuth(app); De esta manera, los componentes React pueden utilizar db para realizar operaciones con Firestore y auth para gestionar las sesiones.

### 5. 项目创建与连接
首先，我们使用 Node.js、React 和 Vite。在终端中执行：npm create vite@latest taskflow -- --template react。然后安装依赖项：cd taskflow，npm install。应用程序创建完成后，通过以下命令引入 Firebase：npm install firebase。随后，我们配置 firebase.js 文件，在其中初始化应用程序并启用必要的服务。import { initializeApp } from 'firebase/app'; import { getFirestore } from 'firebase/firestore'; import { getAuth } from 'firebase/auth'; // 从 Firebase 控制台获取的配置 const firebaseConfig = { // 应用程序配置数据 }; const app = initializeApp(firebaseConfig); export const db = getFirestore(app); export const auth = getAuth(app); 通过这种方式，React 组件可以使用 db 对 Firestore 执行操作，并使用 auth 来管理会话。

### 6. Implementación de las operaciones CRUD
Una vez establecida la conexión, implementamos las operaciones principales de la aplica

### 6. CRUD 操作的实现
连接建立后，我们实现了应用程序的主要操作