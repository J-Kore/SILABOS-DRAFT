# SILABOS — Documento de identidad y contexto del proyecto

## Quién soy
**Juanjo** — pedagogo especialista en ELE (Español como Lengua Extranjera) con más de 10 años de experiencia. Experto en el uso de inteligencia artificial para crear materiales, actividades y aplicaciones de aprendizaje. Basado en Tenerife, Canarias.

## SILABOS
**Spanish Interactive Laboratory Operations**

Una iniciativa para explorar, experimentar y compartir nuevas formas de aprender y enseñar español. Dirigida a:
- Estudiantes de ELE (todos los niveles, A1–C2)
- Docentes de ELE que quieren integrar IA en el aula
- Formadores que quieren aprender a usar IA en contextos educativos

Enfoque metodológico: comunicativo, input comprensible, práctica significativa y lúdica. La IA es un medio, no un fin.

---

## Identidad visual

### Paleta Santorini
| Token | Hex | Uso |
|-------|-----|-----|
| `--navy` | `#1B2A6B` | Color principal, fondos oscuros, textos |
| `--blue` | `#4A6FBF` | Color secundario, enlaces, acentos |
| `--sky`  | `#A8BFDF` | Color terciario, detalles, bordes |
| `--white`| `#F4F5F7` | Fondo principal, crema cálido |
| `--stone`| `#C5C4C8` | Gris piedra, separadores |

### Tipografía
- **Display / Títulos**: Playfair Display (serif, 700 / italic 400)
- **Cuerpo / UI**: DM Sans (sans-serif, 300 / 400 / 500)
- Cargadas desde Google Fonts en `index.html`

### Logo e insignia
- Nombre: **SILABOS** — letras con gradiente de color: SI (marino) · LAB (azul) · OS (celeste)
- Insignia: **Constelación de Orión** con 7 nodos (estrellas)
  - Betelgeuse (hombro izq) — marino, grande, con halo
  - Bellatrix (hombro der) — azul, mediana
  - Mintaka, Alnilam, Alnitak (cinturón) — celeste, iguales, inclinados
  - Saiph (pie izq) — azul, relleno
  - Rigel (pie der) — celeste, con gradiente blanco, con letra **S**, con halo
  - Línea inferior Saiph→Rigel: **discontinua**
  - Cinturón ligeramente inclinado: Mintaka(y=60) → Alnilam(y=58) → Alnitak(y=52)
- Tagline: **PEDAGOGÍA · IA · ELE**
- Archivos SVG generados: insignia sin fondo, logo completo, versiones con fondo blanco, versiones animadas (nacimiento estelar con flash de luz)

---

## Web — Stack técnico
- **Framework**: React + Vite
- **Estilos**: inline styles con tokens de la paleta (no Tailwind en los componentes)
- **Routing**: React Router DOM
- **Fuentes**: Google Fonts (Playfair Display + DM Sans) en `index.html`
- **Foto de perfil**: `/public/images/juanjo-perfil.jpg`

### Estructura de páginas
```
src/
  pages/
    Inicio.jsx
    IA.jsx
    Podcast.jsx
    Clases.jsx
    Contacto.jsx
  App.jsx
index.html
```

### App.jsx
- Navbar: fondo marino `#1B2A6B`, línea degradado superior, links en mayúscula, CTA "Contacto" en blanco
- Footer: dos columnas (marca + links), borde superior sutil
- CSS variables globales definidas en `:root`
- Hamburger menu para móvil

---

## Páginas

### Inicio.jsx
- Hero: fondo crema, titular "Español que *vive* en el aula", foto de perfil con marco editorial (borde celeste desplazado, degradado inferior con nombre)
- Stats: banda azul medio con +10 años, A1–C2, 100% online, IA
- Áreas: tres tarjetas enlazadas (IA & ELE, Podcast, Clases)
- CTA final: fondo marino, "Tu próxima clase de español *te está esperando*"

### IA.jsx
- Hero: titular "IA al servicio del *aprendizaje*" + cita
- **Apps arriba** (antes de "Cómo trabajo"): grid con mockups de ventana navegador, iframe embed en modal, contador disponibles/en desarrollo
- Cómo trabajo: tres bloques sobre marino
- CTA: banda azul medio

### Podcast.jsx
- Podcast: **Let's Speak Spanish**
- Plataformas: SoundCloud, Spotify, Apple Podcasts
- Playlists: Cultura hispana · Gramática y vocabulario · Temas variados
- Embed SoundCloud por playlist (actualizar URLs en archivo)

### Clases.jsx
- Modalidades: Individual (45 min) y Grupo pequeño (2–4, 45 min)
- Precios: ocultos (`MOSTRAR_PRECIOS = false`), activar cuando estén listos
- Paquetes preparados: Clase suelta · Bono 5 · Bono 10
- Proceso: 4 pasos (Contacto → Prueba → Plan → Empezamos)
- CTA: sesión de prueba gratuita de 20 min

### Contacto.jsx
- Columna izquierda: foto con marco + bio + email + LinkedIn
- Columna derecha: formulario (nombre, email, asunto, mensaje) con estado de confirmación
- Integración pendiente: Formspree o EmailJS
- Canales: Email + LinkedIn

---

## Apps creadas
| App | URL | Estado |
|-----|-----|--------|
| Conjuanjugator | https://conjuanjugator2.netlify.app/ | ✅ Disponible |
| Convozjugator | https://convozjugator.netlify.app/ | ✅ Disponible |
| Ponlo | https://ponlo.netlify.app/ | ✅ Disponible |
| ComuniTabu | — | 🔧 En desarrollo |
| SpanishAdventure | — | 🔧 En desarrollo |

Stack apps: HTML, React, JavaScript (mixto según la app)
Objetivo: desplegarlas en `silabos.es` embebidas via iframe para generar tráfico propio.

---

## Pendiente / Próximos pasos
- [ ] Actualizar URLs del podcast (SoundCloud embeds, Spotify, Apple Podcasts)
- [ ] Actualizar email y LinkedIn en Contacto.jsx
- [ ] Integrar formulario con Formspree o EmailJS
- [ ] Activar precios en Clases.jsx cuando estén definidos
- [ ] Implementar agenda/disponibilidad en Clases
- [ ] Implementar compras/pagos en Clases
- [ ] Integrar logo animado SVG en App.jsx (navbar)
- [ ] Configurar dominio silabos.es
- [ ] Configurar headers Netlify para permitir iframe embed de las apps
- [ ] Captura de pantallas reales para reemplazar mockups en IA.jsx

---

## Cómo usar este documento
Comparte este archivo al inicio de cada conversación con Claude para retomar el proyecto exactamente donde lo dejaste. Puedes decir: *"Aquí está mi documento de contexto de SILABOS, continuamos con..."*
