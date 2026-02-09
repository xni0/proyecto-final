# 🎬 MovieHub - Aplicación de Películas

Aplicación web para explorar películas usando la API de The Movie Database (TMDB). Desarrollada con React, TypeScript y Vite.

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Explicación de cada Componente](#-explicación-de-cada-componente)
- [Instalación y Uso](#-instalación-y-uso)

## ✨ Características

- 🔐 **Sistema de autenticación** con API externa
- 🎥 **Explorar películas populares** y en cartelera
- 🔍 **Buscar películas** por título
- 🎭 **Filtrar por género**
- 📱 **Diseño responsive** con Tailwind CSS
- 🛡️ **Rutas protegidas** para usuarios autenticados
- ⚡ **Modo declarativo** - código simple y fácil de entender

## 📁 Estructura del Proyecto

```
src/
├── atoms/              # Componentes básicos reutilizables
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Loader.tsx
├── molecules/          # Componentes compuestos
│   ├── MovieCard.tsx
│   └── SearchBar.tsx
├── organisms/          # Componentes complejos
│   └── MovieGrid.tsx
├── layout/             # Estructura de la aplicación
│   ├── MainLayout.tsx
│   └── Navbar.tsx
├── routes/             # Páginas de la aplicación
│   ├── Home.tsx
│   ├── Search.tsx
│   ├── Genres.tsx
│   ├── NowPlaying.tsx
│   ├── MovieDetail.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── NotFound.tsx
├── context/            # Estado global
│   └── AuthContext.tsx
├── hooks/              # Hooks personalizados
│   ├── useAuth.ts
│   └── useMovies.ts
├── services/           # Llamadas a APIs
│   ├── auth.service.ts
│   └── movie.service.ts
├── guards/             # Protección de rutas
│   └── PrivateRoute.tsx
├── types/              # Tipos de TypeScript
│   └── movie.types.ts
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada
```

## 🔍 Explicación de cada Componente

### 📦 Atoms (Componentes Básicos)

#### `Button.tsx`
**Para qué sirve:** Botón reutilizable con estilos consistentes.
- **Recibe:** texto (children), variante (primary/secondary), eventos onClick
- **Retorna:** Botón con degradado y animaciones hover
- **Usado en:** Formularios, navegación, acciones

#### `Input.tsx`
**Para qué sirve:** Campo de texto con estilos uniformes.
- **Recibe:** placeholder, value, onChange, type
- **Retorna:** Input con borde, focus y transiciones
- **Usado en:** Login, Register, Search

#### `Loader.tsx`
**Para qué sirve:** Indicador visual de carga.
- **Recibe:** Nada
- **Retorna:** Spinner animado con mensaje "Cargando..."
- **Usado en:** Mientras se cargan películas o datos

### 🧩 Molecules (Componentes Compuestos)

#### `MovieCard.tsx`
**Para qué sirve:** Tarjeta individual de película.
- **Recibe:** Objeto `movie` (título, póster, calificación, fecha)
- **Retorna:** Tarjeta con imagen, info y efecto hover
- **Comportamiento:** Al hacer clic navega a detalle de película
- **Usado en:** Grid de películas

#### `SearchBar.tsx`
**Para qué sirve:** Barra de búsqueda con botón.
- **Recibe:** Función `onSearch`, placeholder opcional
- **Retorna:** Formulario con input y botón de búsqueda
- **Comportamiento:** Emite el término de búsqueda al hacer submit
- **Usado en:** Página Search (nota: actualmente la página usa Input directamente)

### 🏗️ Organisms (Componentes Complejos)

#### `MovieGrid.tsx`
**Para qué sirve:** Grid responsivo de películas.
- **Recibe:** Array de `movies`, título opcional
- **Retorna:** Grid con MovieCards (1-4 columnas según pantalla)
- **Comportamiento:** Si no hay películas, muestra mensaje
- **Usado en:** Home, Search, Genres, NowPlaying

### 🎨 Layout (Estructura)

#### `MainLayout.tsx`
**Para qué sirve:** Estructura base de todas las páginas.
- **Recibe:** Nada (usa Outlet de React Router)
- **Retorna:** Navbar + contenido dinámico + Footer
- **Comportamiento:** Envuelve todas las rutas
- **Usado en:** App.tsx como contenedor principal

#### `Navbar.tsx`
**Para qué sirve:** Barra de navegación superior.
- **Recibe:** Datos del contexto de autenticación
- **Retorna:** Logo, menú de navegación, botones login/logout
- **Comportamiento:** 
  - Si está autenticado: muestra nombre y botón cerrar sesión
  - Si no: muestra botones login/register
- **Usado en:** MainLayout

### 📄 Routes (Páginas)

#### `Home.tsx`
**Para qué sirve:** Página principal con películas populares.
- **Estado:** Lista de películas, página actual, loading
- **Funcionalidad:** Carga películas populares con paginación
- **Botón:** "Cargar Más Películas" añade más resultados

#### `Search.tsx`
**Para qué sirve:** Página de búsqueda de películas.
- **Estado:** Query de búsqueda, películas encontradas
- **Funcionalidad:** Busca películas mientras escribes (debounce 500ms)
- **Muestra:** Resultados o mensaje "No encontrado"

#### `Genres.tsx`
**Para qué sirve:** Explorar películas por género.
- **Estado:** Lista de géneros, género seleccionado, películas
- **Funcionalidad:** 
  1. Carga lista de géneros al inicio
  2. Al hacer clic en género, carga sus películas
- **Muestra:** Botones de géneros + grid de películas

#### `NowPlaying.tsx`
**Para qué sirve:** Películas actualmente en cines.
- **Usa:** Hook `useMovies('now-playing')`
- **Muestra:** Grid de películas en cartelera
- **Simple:** Solo muestra, no tiene interacción especial

#### `MovieDetail.tsx`
**Para qué sirve:** Detalle completo de una película.
- **Recibe:** ID de película por URL (parámetro)
- **Usa:** Hook `useMovieDetail(id)`
- **Muestra:** 
  - Backdrop de fondo
  - Póster grande
  - Título, sinopsis, calificación
  - Géneros, duración, fecha
  - Presupuesto y recaudación
- **Protegida:** Requiere autenticación

#### `Login.tsx`
**Para qué sirve:** Página de inicio de sesión.
- **Estado:** username, password, error
- **Funcionalidad:** 
  1. Usuario llena formulario
  2. Llama a `login()` del hook useAuth
  3. Si éxito, redirige a Home
  4. Si falla, muestra error

#### `Register.tsx`
**Para qué sirve:** Página de registro de nuevos usuarios.
- **Estado:** username, password, confirmPassword, error
- **Funcionalidad:**
  1. Valida que contraseñas coincidan
  2. Valida longitud mínima (6 caracteres)
  3. Llama a `register()` del hook
  4. Si éxito, redirige a Home

#### `NotFound.tsx`
**Para qué sirve:** Página 404 para rutas no existentes.
- **Muestra:** Mensaje de error 404
- **Retorna:** Botón para volver al inicio

### 🌐 Context (Estado Global)

#### `AuthContext.tsx`
**Para qué sirve:** Gestionar el usuario autenticado globalmente.
- **Estado:** `user` (null si no autenticado)
- **Funcionalidad:**
  1. Carga usuario de localStorage al inicio
  2. Guarda/elimina usuario automáticamente cuando cambia
- **Provee:** `user`, `setUser` a toda la app
- **Usado en:** useAuth hook

### 🪝 Hooks (Lógica Reutilizable)

#### `useAuth.ts`
**Para qué sirve:** Gestionar autenticación (login, register, logout).
- **Usa:** AuthContext
- **Estado local:** error
- **Funciones:**
  - `login(nick, pass)`: Autentica usuario
  - `register(nick, pass)`: Crea nuevo usuario
  - `logout()`: Cierra sesión
- **Retorna:** `user`, `isAuthenticated`, `error`, funciones
- **Usado en:** Login, Register, Navbar, PrivateRoute

#### `useMovies.ts`
**Para qué sirve:** Cargar películas desde la API.
- **useMovies(type)**: 
  - Recibe: 'popular' o 'now-playing'
  - Retorna: lista de películas, loading, error
  - Usado en: NowPlaying
- **useMovieDetail(id)**:
  - Recibe: ID de película
  - Retorna: detalle completo, loading, error
  - Usado en: MovieDetail

### ⚙️ Services (Llamadas a APIs)

#### `auth.service.ts`
**Para qué sirve:** Comunicación con API de autenticación.
- **Funciones:**
  - `login(nick, pass)`: POST a API externa, retorna usuario
  - `register(nick, pass)`: POST para crear usuario
  - `saveUser(user)`: Guarda en localStorage
  - `getStoredUser()`: Lee de localStorage
  - `logout()`: Elimina de localStorage
- **API:** http://www.ies-azarquiel.es/paco/apigafas

#### `movie.service.ts`
**Para qué sirve:** Comunicación con API de TMDB.
- **Funciones:**
  - `getPopularMovies(page)`: Películas populares
  - `searchMovies(query, page)`: Buscar por título
  - `getMovieDetails(id)`: Detalle completo
  - `getMoviesByGenre(genreId)`: Filtrar por género
  - `getGenres()`: Lista de géneros
  - `getNowPlayingMovies(page)`: En cartelera
  - `getImageUrl(path, size)`: URL de imágenes
- **API:** https://api.themoviedb.org/3

### 🛡️ Guards (Protección)

#### `PrivateRoute.tsx`
**Para qué sirve:** Proteger rutas que requieren autenticación.
- **Comportamiento:**
  1. Si está cargando → muestra Loader
  2. Si NO autenticado → redirige a /login
  3. Si autenticado → muestra el contenido (children)
- **Usado en:** Ruta /movie/:id en App.tsx

### 📘 Types (Tipos de TypeScript)

#### `movie.types.ts`
**Para qué sirve:** Definir la estructura de datos.
- **Movie:** Película básica (id, título, póster, etc.)
- **MovieDetail:** Película completa (extiende Movie + géneros, presupuesto, etc.)
- **Genre:** Género (id, nombre)
- **MoviesResponse:** Respuesta de API con paginación
- **User:** Usuario (id, username, email)

### 🚀 Archivos Principales

#### `App.tsx`
**Para qué sirve:** Configurar rutas de la aplicación.
- **Define todas las rutas:**
  - `/` → Home
  - `/search` → Search
  - `/genres` → Genres
  - `/now-playing` → NowPlaying
  - `/movie/:id` → MovieDetail (protegida)
  - `/login` → Login
  - `/register` → Register
  - `*` → NotFound
- **Envuelve todo en:** AuthProvider y BrowserRouter

#### `main.tsx`
**Para qué sirve:** Punto de entrada de la aplicación.
- **Renderiza:** App en el DOM
- **Importa:** Estilos globales (index.css)

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre http://localhost:5173

### Build para Producción
```bash
npm run build
```

### Preview de Producción
```bash
npm run preview
```

## 🔑 Credenciales de Prueba

Puedes crear tu propio usuario o usar credenciales del API del IES Azarquiel.

## 🎨 Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **TMDB API** - Datos de películas

## 📝 Notas de Desarrollo

Este proyecto usa **modo declarativo** para facilitar la comprensión:
- Estado mínimo necesario
- Funciones con una sola responsabilidad
- Comentarios explicativos
- Nombres descriptivos de variables

---

**Desarrollado con ❤️ para DWEC - Proyecto Final React**
