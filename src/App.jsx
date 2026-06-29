import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";

// ─── PALETA NEÓN ──────────────────────────────────────────────────────────────
// BG:      #0A0A12
// Fuxia:   #FF2DA6
// Morado:  #A855F7
// Azul:    #00C8FF
// Amarillo:#FACC15
// Verde:   #39FF14
// ─────────────────────────────────────────────────────────────────────────────

// ─── DATOS ───────────────────────────────────────────────────────────────────

const APPS = [
  {
    id: 1,
    nombre: "Conjuanjugator",
    categoria: "Expresión Escrita",
    descripcion: "Practica la conjugación verbal de forma interactiva. Tiempos, modos y personas en contexto real.",
    tags: ["Expresión Escrita", "Conjugación", "Verbos", "Tiempos"],
    color: "#FF2DA6",
    url: "https://conjuanjugator-react.vercel.app",
    estado: "disponible",
  },
  {
    id: 2,
    nombre: "Convozjugator",
    categoria: "Expresión Oral",
    descripcion: "Entrena la pronunciación y el ritmo del español con actividades de conversación guiada.",
    tags: ["Expresión Oral", "Conjugación", "Verbos", "Tiempos"],
    color: "#A855F7",
    url: "https://convozjugator.vercel.app/",
    estado: "disponible",
  },
  {
    id: 3,
    nombre: "Ponlo",
    categoria: "Expresión Oral",
    descripcion: "Aprende colocaciones léxicas y el uso del imperativo en situaciones comunicativas auténticas.",
    tags: ["Colocaciones", "Imperativo", "Léxico"],
    color: "#00C8FF",
    url: "https://ponlo-silabos.vercel.app/",
    estado: "disponible",
  },
  {
    id: 4,
    nombre: "OyeRobot",
    categoria: "Expresión Oral",
    descripcion: "Aprende colocaciones léxicas y el uso del imperativo en situaciones comunicativas auténticas.",
    tags: ["Colocaciones", "Imperativo", "Léxico"],
    color: "#A855F7",
    url: "https://oyerobot.vercel.app/",
    estado: "disponible",
  },
  {
    id: 5,
    nombre: "Detective Del Pasado",
    categoria: "Comprensión Lectora",
    descripcion: "Practica e interioriza las diferencias de uso entre Pretérito Indefinido y Pretérito Imperfecto.",
    tags: ["Pasado Indefinido", "Pasado Imperfecto", "Verbos", "Contraste de Pasados"],
    color: "#39FF14",
    url: "https://detective-del-pasado.vercel.app/",
    estado: "disponible",
  },
  {
    id: 6,
    nombre: "ComuniTabu",
    categoria: "Expresión Oral",
    descripcion: "Dinámica de tabú adaptada al aula de ELE. Practica la descripción y el vocabulario en acción.",
    tags: ["Juego", "Vocabulario", "Definiciones", "Explicaciones"],
    color: "#FACC15",
    url: null,
    estado: "desarrollo",
  },
  {
    id: 7,
    nombre: "Operación ELE",
    categoria: "Inmersión",
    descripcion: "Aventura narrativa interactiva para aprender español tomando decisiones reales en la historia.",
    tags: ["Narrativa", "Decisiones", "Comprensión Lectora", "Comprensión Auditiva", "Expresión Oral", "Expresión Escrita"],
    color: "#39FF14",
    url: null,
    estado: "desarrollo",
  },
];

const CLASES = [
  {
    tipo: "Individual",
    icon: "individual",
    duracion: "45 min",
    descripcion: "Sesión personalizada 100% adaptada a tu nivel, objetivos y ritmo.",
    features: ["Plan de aprendizaje a medida", "Feedback inmediato", "Grabación disponible", "Material personalizado"],
    color: "#FF2DA6",
    cta: "Reservar individual",
  },
  {
    tipo: "Grupo pequeño",
    icon: "grupo",
    duracion: "45 min · 2–4 personas",
    descripcion: "Aprende con otros estudiantes de nivel similar. Más conversación, más dinámica.",
    features: ["2 a 4 estudiantes", "Nivel homogéneo", "Práctica colaborativa", "Precio reducido"],
    color: "#00C8FF",
    cta: "Reservar grupo",
    destacado: true,
  },
];

// ─── FLAGS DE VISIBILIDAD ─────────────────────────────────────────────────────
// Activar/desactivar secciones sin borrar código.
const MOSTRAR_CLASES = false; // poner en true cuando haya disponibilidad
const MOSTRAR_TALLER = true;

const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "ia-ele", label: "IA & ELE" },
  { id: "api", label: "API" },
  ...(MOSTRAR_TALLER ? [{ id: "taller", label: "Taller" }] : []),
  ...(MOSTRAR_CLASES ? [{ id: "clases", label: "Clases" }] : []),
  { id: "contacto", label: "Contacto" },
];

// ─── INSIGNIA ESTÁTICA ────────────────────────────────────────────────────────
function InsigniaStatic({ size = 80 }) {
  return (
    <svg viewBox="-24 -24 173 173" width={size} height={size} style={{ display: "block", flexShrink: 0 }}>
      <defs>
        <radialGradient id="sg-gb" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF2DA6" />
          <stop offset="100%" stopColor="#A855F7" />
        </radialGradient>
        <radialGradient id="sg-gr" cx="35%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#00C8FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </radialGradient>
        <radialGradient id="sg-hb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF2DA6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF2DA6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sg-hr" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00C8FF" stopOpacity="0" />
        </radialGradient>
        <filter id="sg-glow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="24" cy="14" r="22" fill="url(#sg-hb)" />
      <circle cx="100" cy="100" r="22" fill="url(#sg-hr)" />
      <line x1="24" y1="14" x2="88" y2="26" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="24" y1="14" x2="34" y2="60" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="88" y1="26" x2="78" y2="52" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="34" y1="60" x2="56" y2="58" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round" />
      <line x1="56" y1="58" x2="78" y2="52" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="60" x2="20" y2="108" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="78" y1="52" x2="100" y2="100" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="108" x2="100" y2="100" stroke="#00C8FF" strokeWidth="0.8" strokeDasharray="3,4" strokeLinecap="round" />
      <g filter="url(#sg-glow)"><circle cx="24" cy="14" r="10" fill="url(#sg-gb)" /></g>
      <circle cx="88" cy="26" r="7" fill="#A855F7" />
      <circle cx="34" cy="60" r="5" fill="#00C8FF" />
      <circle cx="56" cy="58" r="5" fill="#00C8FF" />
      <circle cx="78" cy="52" r="5" fill="#00C8FF" />
      <circle cx="20" cy="108" r="6" fill="#A855F7" />
      <g filter="url(#sg-glow)">
        <circle cx="100" cy="100" r="10" fill="url(#sg-gr)" />
        <circle cx="100" cy="100" r="10" fill="none" stroke="#0A0A12" strokeWidth="0.8" />
        <text x="100" y="104" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#0A0A12">S</text>
      </g>
      <line x1="24" y1="1" x2="24" y2="5" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="24" y1="23" x2="24" y2="27" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="11" y1="14" x2="15" y2="14" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="33" y1="14" x2="37" y2="14" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="100" y1="87" x2="100" y2="91" stroke="#00C8FF" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="100" y1="109" x2="100" y2="113" stroke="#00C8FF" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="87" y1="100" x2="91" y2="100" stroke="#00C8FF" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="109" y1="100" x2="113" y2="100" stroke="#00C8FF" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── INSIGNIA ANIMADA ─────────────────────────────────────────────────────────
function InsigniaAnimada({ size = 44 }) {
  const svgRef = useRef(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const svg = svgRef.current;
    if (!svg) return;

    const STARS = [
      { id: "ia-betelgeuse", ox: 60, oy: 60 },
      { id: "ia-bellatrix", ox: -50, oy: 50 },
      { id: "ia-mintaka", ox: 35, oy: -45 },
      { id: "ia-alnilam", ox: -40, oy: -35 },
      { id: "ia-alnitak", ox: -35, oy: 40 },
      { id: "ia-saiph", ox: 55, oy: -50 },
      { id: "ia-rigel", ox: -55, oy: -40 },
    ];
    const LINES = ["ia-l1", "ia-l2", "ia-l3", "ia-l4", "ia-l5", "ia-l6", "ia-l7", "ia-l8"];
    const FLASHES = ["ia-fl1", "ia-fl2", "ia-fl3", "ia-fl4", "ia-fl5", "ia-fl6", "ia-fl7"];
    const STAR_DUR = 900, STAR_DELAY = 200;
    const LINE_START = STARS.length * STAR_DELAY + STAR_DUR + 200;
    const LINE_DUR = 380, LINE_DELAY = 120;

    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function animate({ duration, delay = 0, onProgress, onDone }) {
      const start = performance.now() + delay;
      function frame(now) {
        const elapsed = now - start;
        if (elapsed < 0) { requestAnimationFrame(frame); return; }
        const t = Math.min(1, elapsed / duration);
        onProgress(t);
        if (t < 1) requestAnimationFrame(frame);
        else if (onDone) onDone();
      }
      requestAnimationFrame(frame);
    }
    function fadeIn(el, dur, delay) {
      if (!el) return;
      animate({ duration: dur, delay, onProgress(t) { el.setAttribute("opacity", easeOut(t)); } });
    }
    function animateFlash(el) {
      if (!el) return;
      animate({
        duration: 550,
        onProgress(t) {
          el.setAttribute("r", easeOut(t) * 26);
          el.setAttribute("opacity", t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85);
        },
        onDone() { el.setAttribute("opacity", 0); }
      });
    }

    STARS.forEach((s, i) => {
      const el = svg.getElementById(s.id);
      if (!el) return;
      const flashEl = svg.getElementById(FLASHES[i]);
      const finalX = parseFloat(el.getAttribute("data-fx") || 0);
      const finalY = parseFloat(el.getAttribute("data-fy") || 0);
      const cx = (finalX + s.ox + finalX) / 2 + (finalY - s.oy) * 0.3;
      const cy = (finalY + s.oy + finalY) / 2 + (s.ox - finalX) * 0.3;
      animate({
        duration: STAR_DUR, delay: i * STAR_DELAY,
        onProgress(t) {
          const et = ease(t);
          const bx = (1 - et) * (1 - et) * s.ox + 2 * (1 - et) * et * (cx - finalX) + et * et * 0;
          const by = (1 - et) * (1 - et) * s.oy + 2 * (1 - et) * et * (cy - finalY) + et * et * 0;
          el.setAttribute("opacity", Math.min(1, t * 3));
          el.setAttribute("transform", `translate(${bx},${by}) scale(${0.05 + 0.95 * et})`);
        },
        onDone() {
          el.removeAttribute("transform");
          el.setAttribute("opacity", 1);
          if (flashEl) animateFlash(flashEl);
          if (i === 0) { setTimeout(() => fadeIn(svg.getElementById("ia-hb"), 600, 0), 100); }
          if (i === 6) { setTimeout(() => fadeIn(svg.getElementById("ia-hr"), 600, 0), 100); }
        }
      });
    });

    LINES.forEach((id, li) => {
      const el = svg.getElementById(id);
      if (!el) return;
      if (li === 7) {
        animate({ duration: LINE_DUR, delay: LINE_START + li * LINE_DELAY, onProgress(t) { el.setAttribute("opacity", easeOut(t)); } });
      } else {
        const len = Math.hypot(el.x2.baseVal.value - el.x1.baseVal.value, el.y2.baseVal.value - el.y1.baseVal.value);
        el.setAttribute("opacity", 1);
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
        animate({
          duration: LINE_DUR, delay: LINE_START + li * LINE_DELAY,
          onProgress(t) { el.style.strokeDashoffset = len * (1 - easeOut(t)); }
        });
      }
    });
  }, []);

  return (
    <svg ref={svgRef} viewBox="-24 -24 173 173" width={size} height={size} style={{ display: "block" }}>
      <defs>
        <radialGradient id="ia-gb" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF2DA6" /><stop offset="100%" stopColor="#A855F7" />
        </radialGradient>
        <radialGradient id="ia-gr" cx="35%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="50%" stopColor="#00C8FF" /><stop offset="100%" stopColor="#A855F7" />
        </radialGradient>
        <radialGradient id="ia-hbg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF2DA6" stopOpacity="0.35" /><stop offset="100%" stopColor="#FF2DA6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ia-hrg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.4" /><stop offset="100%" stopColor="#00C8FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ia-flash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" /><stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
        <filter id="ia-glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="ia-glow-sm">
          <feGaussianBlur stdDeviation="1" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle id="ia-hb" cx="24" cy="14" r="22" fill="url(#ia-hbg)" opacity="0" />
      <circle id="ia-hr" cx="100" cy="100" r="22" fill="url(#ia-hrg)" opacity="0" />
      <line id="ia-l1" x1="24" y1="14" x2="88" y2="26" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" opacity="0" />
      <line id="ia-l2" x1="24" y1="14" x2="34" y2="60" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" opacity="0" />
      <line id="ia-l3" x1="88" y1="26" x2="78" y2="52" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" opacity="0" />
      <line id="ia-l4" x1="34" y1="60" x2="56" y2="58" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round" opacity="0" filter="url(#ia-glow-sm)" />
      <line id="ia-l5" x1="56" y1="58" x2="78" y2="52" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round" opacity="0" filter="url(#ia-glow-sm)" />
      <line id="ia-l6" x1="34" y1="60" x2="20" y2="108" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" opacity="0" />
      <line id="ia-l7" x1="78" y1="52" x2="100" y2="100" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" opacity="0" />
      <line id="ia-l8" x1="20" y1="108" x2="100" y2="100" stroke="#00C8FF" strokeWidth="0.8" strokeDasharray="3,4" strokeLinecap="round" opacity="0" />
      <g id="ia-betelgeuse" opacity="0" data-fx="24" data-fy="14" filter="url(#ia-glow)"><circle cx="24" cy="14" r="10" fill="url(#ia-gb)" /></g>
      <g id="ia-bellatrix" opacity="0" data-fx="88" data-fy="26"><circle cx="88" cy="26" r="7" fill="#A855F7" /></g>
      <g id="ia-mintaka" opacity="0" data-fx="34" data-fy="60"><circle cx="34" cy="60" r="5" fill="#00C8FF" /></g>
      <g id="ia-alnilam" opacity="0" data-fx="56" data-fy="58"><circle cx="56" cy="58" r="5" fill="#00C8FF" /></g>
      <g id="ia-alnitak" opacity="0" data-fx="78" data-fy="52"><circle cx="78" cy="52" r="5" fill="#00C8FF" /></g>
      <g id="ia-saiph" opacity="0" data-fx="20" data-fy="108"><circle cx="20" cy="108" r="6" fill="#A855F7" /></g>
      <g id="ia-rigel" opacity="0" data-fx="100" data-fy="100" filter="url(#ia-glow)">
        <circle cx="100" cy="100" r="10" fill="url(#ia-gr)" />
        <circle cx="100" cy="100" r="10" fill="none" stroke="#0A0A12" strokeWidth="0.8" />
        <text x="100" y="104" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#0A0A12">S</text>
      </g>
      {["ia-fl1", "ia-fl2", "ia-fl3", "ia-fl4", "ia-fl5", "ia-fl6", "ia-fl7"].map((id, i) => {
        const cx = [24, 88, 34, 56, 78, 20, 100][i];
        const cy = [14, 26, 60, 58, 52, 108, 100][i];
        return <circle key={id} id={id} cx={cx} cy={cy} r="1" fill="url(#ia-flash)" opacity="0" />;
      })}
      <g id="ia-db" opacity="0">
        <line x1="24" y1="1" x2="24" y2="5" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="24" y1="23" x2="24" y2="27" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="11" y1="14" x2="15" y2="14" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="33" y1="14" x2="37" y2="14" stroke="#FF2DA6" strokeWidth="0.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── FONDO ESTELAR ────────────────────────────────────────────────────────────
// Campo de estrellas sutil: titileo desincronizado, deriva mínima, parallax con
// scroll y estrellas fugaces ocasionales con trayectoria aleatoria. Misma técnica
// (canvas + requestAnimationFrame) que la insignia. pointer-events:none, detrás de todo.
function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const TINTS = ["#FF2DA6", "#00C8FF", "#A855F7"];
    const DENSITY = 130;   // estrellas por "pantalla" de campo
    const TWINKLE = 0.45;  // intensidad del titileo (0–1)
    const TINT = 0.15;     // proporción de estrellas con color neón
    const DRIFT = 0.35;    // deriva horizontal (0–1)

    let W = 0, H = 0, dpr = 1, field = 0;
    let stars = [];
    let shooters = [];
    let nextShoot = 16000 + Math.random() * 14000;
    let rafId = 0;
    const t0 = performance.now();
    let last = t0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      field = H * 3;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      // Densidad proporcional al área del campo, normalizada a una pantalla de
      // referencia, para que el cielo se vea igual de poblado en cualquier viewport.
      const screens = field / H;
      const perScreen = (DENSITY * W) / 1280;
      const count = Math.max(80, Math.min(420, Math.round(perScreen * screens)));
      stars = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        const useTint = Math.random() < TINT;
        stars.push({
          x: Math.random() * W,
          y: Math.random() * field,
          r: 0.4 + depth * 1.3,
          depth,
          base: 0.15 + depth * 0.5,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.4 + Math.random() * 1.2,
          color: useTint ? TINTS[(Math.random() * TINTS.length) | 0] : "#FFFFFF",
        });
      }
    }

    function spawnShooter() {
      // Origen y trayectoria aleatorios: cruza desde cualquier borde superior,
      // con ángulo variado hacia abajo (entre ~25° y ~155°).
      const fromLeft = Math.random() < 0.5;
      const sx = fromLeft ? Math.random() * W * 0.4 : W - Math.random() * W * 0.4;
      const sy = Math.random() * H * 0.45;
      const baseAngle = fromLeft
        ? Math.PI * (0.12 + Math.random() * 0.22)   // hacia abajo-derecha
        : Math.PI * (0.66 + Math.random() * 0.22);  // hacia abajo-izquierda
      shooters.push({
        x: sx, y: sy, len: 0,
        maxLen: 110 + Math.random() * 90,
        life: 0, speed: 6 + Math.random() * 4,
        angle: baseAngle,
      });
    }

    function frame(now) {
      const dt = Math.min(50, now - last);
      last = now;
      const t = (now - t0) / 1000;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        const x = s.x + (reduce ? 0 : Math.sin(t * 0.05 * DRIFT + s.tw) * s.depth * 12 * DRIFT);
        // Parallax con wrap infinito: la estrella se desplaza con el scroll según
        // su profundidad y se reposiciona módulo-campo, de modo que SIEMPRE hay
        // cielo en pantalla por mucho que se baje.
        const par = scrollY * (0.1 + s.depth * 0.35);
        let y = ((s.y - par) % field + field) % field;
        // El campo es más alto que el viewport; solo pintamos la franja visible.
        if (y > H + 6) continue;
        const twinkle = reduce ? 1 : (1 - TWINKLE) + TWINKLE * (0.5 + 0.5 * Math.sin(t * s.twSpeed + s.tw));
        const alpha = Math.max(0, Math.min(1, s.base * twinkle));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.depth > 0.75) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!reduce) {
        nextShoot -= dt;
        if (nextShoot <= 0) {
          spawnShooter();
          nextShoot = 16000 + Math.random() * 14000; // cada ~16–30 s
        }
        shooters = shooters.filter((sh) => {
          sh.life += dt;
          sh.x += Math.cos(sh.angle) * sh.speed;
          sh.y += Math.sin(sh.angle) * sh.speed;
          sh.len = Math.min(sh.maxLen, sh.len + sh.speed * 2);
          const tailX = sh.x - Math.cos(sh.angle) * sh.len;
          const tailY = sh.y - Math.sin(sh.angle) * sh.len;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, "rgba(255,255,255,0.8)");
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          return sh.x > -160 && sh.x < W + 160 && sh.y < H + 160 && sh.life < 3000;
        });
      }

      rafId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── HOOK REVEAL ON SCROLL ────────────────────────────────────────────────────
// Observa elementos con [data-reveal] y les añade la clase .in al entrar en
// viewport (una sola vez). El escalonado entre hermanos lo aplica el CSS via
// --reveal-i. Respeta prefers-reduced-motion.
function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── ICONOS DE APPS ───────────────────────────────────────────────────────────
// Familia line-art mixta: contorno blanco + detalle de acento en el color de la
// app. id 1–5 según el array APPS. size en px. El color de acento se pasa para
// no acoplar el SVG a un hex fijo.
function AppIcon({ id, size = 28, color = "#fff" }) {
  const W = "rgba(255,255,255,0.85)";  // contorno principal
  const W2 = "rgba(255,255,255,0.75)"; // detalle secundario
  const common = { width: size, height: size, viewBox: "0 0 32 32", fill: "none" };

  switch (id) {
    case 1: // Conjuanjugator — documento + pluma (escritura/conjugación)
      return (
        <svg {...common}>
          <path d="M7 25 L7 9 a2 2 0 0 1 2-2 l10 0 a2 2 0 0 1 2 2 l0 8" stroke={W} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 25 a2 2 0 0 0 2 2 l8 0" stroke={W} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="11" y1="13" x2="17" y2="13" stroke={W2} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="11" y1="17" x2="15" y2="17" stroke={W2} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M24 16 l-7 7 -3.2 0.8 0.8 -3.2 7 -7 a1.6 1.6 0 0 1 2.4 2.6 z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case 2: // Convozjugator — dos bocadillos + onda de voz (conversación)
      return (
        <svg {...common}>
          <path d="M5 8 a2 2 0 0 1 2 -2 l11 0 a2 2 0 0 1 2 2 l0 7 a2 2 0 0 1 -2 2 l-7 0 l-4 3 l0 -3 a2 2 0 0 1 -2 -2 z" fill={color} fillOpacity="0.16" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 11 q1.5 -2 3 0 q1.5 2 3 0 q1.5 -2 3 0" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M19 19 l8 0 a2 2 0 0 1 2 2 l0 4 a2 2 0 0 1 -2 2 l-1 0 l0 2 l-3 -2 l-4 0 a2 2 0 0 1 -2 -2 l0 -4 a2 2 0 0 1 2 -2 z" fill="rgba(255,255,255,0.06)" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="21.5" cy="23.5" r="1" fill={color} />
          <circle cx="24.5" cy="23.5" r="1" fill={color} />
        </svg>
      );
    case 3: // Ponlo — bocadillo de voz que dirige + pieza L que encaja en su hueco
      return (
        <svg {...common}>
          <path d="M3 4 l9 0 a1.5 1.5 0 0 1 1.5 1.5 l0 4 a1.5 1.5 0 0 1 -1.5 1.5 l-5 0 l-3 2.5 l0 -2.5 a1.5 1.5 0 0 1 -1.5 -1.5 l0 -4 a1.5 1.5 0 0 1 1.5 -1.5 z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M5 7.5 q1 -1.2 2 0 q1 1.2 2 0 q1 -1.2 2 0" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M19 4 l4 0 l0 4 l3 0 l0 4 l-7 0 z" fill={color} fillOpacity="0.28" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
          <line x1="22" y1="14" x2="22" y2="17" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.5 2" />
          <path d="M15 29 l0 -9 l7 0 l0 -3 l7 0 l0 12 z" fill="rgba(255,255,255,0.03)" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );

    case 4: // OyeRobot
      return (
        <svg {...common}>
          <path d="M3 4 l9 0 a1.5 1.5 0 0 1 1.5 1.5 l0 4 a1.5 1.5 0 0 1 -1.5 1.5 l-5 0 l-3 2.5 l0 -2.5 a1.5 1.5 0 0 1 -1.5 -1.5 l0 -4 a1.5 1.5 0 0 1 1.5 -1.5 z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M5 7.5 q1 -1.2 2 0 q1 1.2 2 0 q1 -1.2 2 0" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M19 4 l4 0 l0 4 l3 0 l0 4 l-7 0 z" fill={color} fillOpacity="0.28" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
          <line x1="22" y1="14" x2="22" y2="17" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="1.5 2" />
          <path d="M15 29 l0 -9 l7 0 l0 -3 l7 0 l0 12 z" fill="rgba(255,255,255,0.03)" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );

      
    case 5: // ComuniTabu — bocadillo con palabra tachada (describe sin decir)
      return (
        <svg {...common}>
          <path d="M5 8 a2.5 2.5 0 0 1 2.5 -2.5 l17 0 a2.5 2.5 0 0 1 2.5 2.5 l0 10 a2.5 2.5 0 0 1 -2.5 2.5 l-11 0 l-6 4.5 l0 -4.5 a2.5 2.5 0 0 1 -2.5 -2.5 z" fill={color} fillOpacity="0.08" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
          <line x1="10" y1="11" x2="22" y2="11" stroke={W2} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="10" y1="15" x2="18" y2="15" stroke={W2} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="8" y1="13" x2="24" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 6: // Operación ELE — mapa con ruta y estrella de misión (aventura narrativa)
      return (
        <svg {...common}>
          <path d="M6 9 l7 -2 l6 2 l7 -2 v16 l-7 2 l-6 -2 l-7 2 z" fill={color} fillOpacity="0.10" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
          <line x1="13" y1="7" x2="13" y2="23" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          <line x1="19" y1="9" x2="19" y2="25" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          <path d="M10 20 q3 -4 6 -2 q3 2 6 -3" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeDasharray="1.5 2.5" />
          <path d="M22 13 l0.9 1.9 l2.1 0.3 l-1.5 1.5 l0.4 2.1 l-1.9 -1 l-1.9 1 l0.4 -2.1 l-1.5 -1.5 l2.1 -0.3 z" fill={color} stroke={color} strokeWidth="0.8" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── ICONOS UI ────────────────────────────────────────────────────────────────
// Audiencias, modalidades de clase y contacto. Misma familia que AppIcon:
// contorno blanco + detalle de acento. name identifica el icono; color es el acento.
function UiIcon({ name, size = 24, color = "#fff" }) {
  const W = "rgba(255,255,255,0.85)";
  const W2 = "rgba(255,255,255,0.75)";
  const common = { width: size, height: size, viewBox: "0 0 32 32", fill: "none" };

  switch (name) {
    case "estudiantes": // birrete de graduación
      return (
        <svg {...common}>
          <path d="M4 13 l12 -5 l12 5 l-12 5 z" fill={color} fillOpacity="0.2" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 15 l0 5 a7 3.5 0 0 0 14 0 l0 -5" stroke={W} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="28" y1="13" x2="28" y2="19" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "docentes": // figura frente a pizarra/pantalla (enseñanza)
      return (
        <svg {...common}>
          <rect x="14" y="5" width="14" height="10" rx="1.5" fill={color} fillOpacity="0.18" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
          <line x1="17" y1="9" x2="25" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="17" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="8" cy="11" r="3.5" fill="rgba(255,255,255,0.06)" stroke={W} strokeWidth="1.6" />
          <path d="M3 26 a5 5 0 0 1 10 0" stroke={W} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <line x1="13" y1="16" x2="13" y2="22" stroke={W2} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "entidades": // edificio institucional con columnas
      return (
        <svg {...common}>
          <path d="M16 4 l11 6 l-22 0 z" fill={color} fillOpacity="0.18" stroke={W} strokeWidth="1.6" strokeLinejoin="round" />
          <line x1="8" y1="12" x2="8" y2="23" stroke={W} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="13" y1="12" x2="13" y2="23" stroke={W} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="19" y1="12" x2="19" y2="23" stroke={W} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="24" y1="12" x2="24" y2="23" stroke={W} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="5" y1="26" x2="27" y2="26" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "individual": // una persona
      return (
        <svg {...common}>
          <circle cx="16" cy="11" r="5" fill={color} fillOpacity="0.2" stroke={W} strokeWidth="1.6" />
          <path d="M6 27 a10 8 0 0 1 20 0" stroke={W} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "grupo": // dos personas
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="4" fill="rgba(255,255,255,0.06)" stroke={W} strokeWidth="1.6" />
          <circle cx="21" cy="12" r="3.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.6" />
          <path d="M3 26 a8 6 0 0 1 16 0" stroke={W} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M19 22 a7 5 0 0 1 10 4" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "email": // sobre con solapa de color
      return (
        <svg {...common}>
          <rect x="4" y="8" width="24" height="16" rx="2.5" fill="rgba(255,255,255,0.04)" stroke={W} strokeWidth="1.6" />
          <path d="M5 10 l11 8 l11 -8" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "linkedin": // logo oficial, monocromo blanco
      return (
        <svg {...common}>
          <rect x="4" y="4" width="24" height="24" rx="4" fill="none" stroke={W} strokeWidth="1.6" />
          <rect x="8.5" y="13" width="3" height="9" fill={W} />
          <rect x="8.3" y="8.5" width="3.4" height="3.4" rx="1.7" fill={W} />
          <path d="M15 22 l0 -9 l3 0 l0 1.4 a3.2 3.2 0 0 1 5.5 2.2 l0 5.4 l-3 0 l0 -4.8 a1.5 1.5 0 0 0 -3 0 l0 4.8 z" fill={W} />
        </svg>
      );
    case "enviado": // check de confirmación
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" fill={color} fillOpacity="0.08" stroke={W} strokeWidth="1.6" />
          <path d="M11 16 l3.5 3.5 l6.5 -7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "avatar": // retrato line-art de Juanjo, inspirado en su dibujo
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <path d="M20 10 q-7 4 -7 18 q0 16 8 25 q5 5 11 5 q6 0 11 -5 q8 -9 8 -25 q0 -14 -8 -18 q-12 -5 -23 0 z" fill={color} fillOpacity="0.12" stroke={W} strokeWidth="2" strokeLinejoin="round" />
          <path d="M18 24 q1 -4 3 -6 q-1 3 1 4 q2 -4 5 -5 q-1 3 1 4 q3 -4 6 -4 q-1 2 1 3 q3 -3 6 -2 q3 1 4 6 q-4 -3 -10 -2.5 q-2 4 -5 4.5 q-7 1 -12 -1.5 z" fill={W} />
          <path d="M12 26 q-3 1 -2 6 q1 3 3 2" stroke={W} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M52 26 q3 1 2 6 q-1 3 -3 2" stroke={W} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M38 28 q3 -1.5 6 0" stroke={W} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="41" cy="31" r="1.6" fill={color} />
          <path d="M34 30 q1 8 -2 11" stroke={W2} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M24 46 q8 6 16 0" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function SilabosLanding() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [hoveredApp, setHoveredApp] = useState(null);
  // Abre una app a pantalla completa en una pestaña nueva y registra el clic.
  function abrirApp(app) {
    if (!app.url) return; // apps en desarrollo (url null) no abren
    track("abrir_app", { app: app.nombre });
    window.open(app.url, "_blank", "noopener,noreferrer");
  }

  useReveal();

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  // Endpoint de Formspree. Reemplaza xxxxxxxx por el ID de tu formulario
  // (lo encuentras en formspree.io → tu form → "Integration" / "Form endpoint").
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdavgvwy";

  async function handleForm(e) {
    e.preventDefault();
    setFormError("");
    setFormSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: formState.nombre,
          email: formState.email,
          asunto: formState.asunto,
          mensaje: formState.mensaje,
          _subject: `SILABOS · ${formState.asunto || "Nuevo mensaje"}`,
        }),
      });
      if (res.ok) {
        setFormSent(true);
        setFormState({ nombre: "", email: "", asunto: "", mensaje: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setFormError(
          data?.errors?.[0]?.message ||
          "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme directamente por email."
        );
      }
    } catch {
      setFormError("Problema de conexión. Revisa tu internet e inténtalo de nuevo.");
    } finally {
      setFormSending(false);
    }
  }

  const S = {
    bg: "#0A0A12",
    fuxia: "#FF2DA6",
    morado: "#A855F7",
    azul: "#00C8FF",
    amarillo: "#FACC15",
    verde: "#39FF14",
  };

  // hex (#RRGGBB) → rgba con alpha, para los resplandores de hover
  const hexA = (hex, a) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  };

  return (
    <div style={{ background: S.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff", position: "relative" }}>
      <StarfieldCanvas />
      <Analytics />
      <div style={{ position: "relative", zIndex: 1 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A12; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A12; }
        ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.4); border-radius: 2px; }
        .nav-link { transition: color 0.2s; }
        .nav-link:hover { color: rgba(255,255,255,0.9) !important; }
        .app-card { transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.35s ease; cursor: pointer; }
        .app-card:hover { transform: translateY(-4px); }
        .btn-primary { transition: opacity 0.2s, transform 0.15s; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.98); }

        /* ── Reveal on scroll ── */
        [data-reveal] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
          transition-delay: calc(var(--reveal-i, 0) * 80ms);
          will-change: opacity, transform;
        }
        [data-reveal].in { opacity: 1; transform: none; }

        /* ── Glow neón en hover de tarjetas (color via --ac / --acglow) ── */
        .glow-card { transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.35s ease; }
        .glow-card:hover {
          transform: translateY(-4px);
          border-color: var(--ac) !important;
          box-shadow: 0 0 0 0.5px var(--ac), 0 8px 40px -8px var(--acglow);
        }
        .glow-row { transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.3s ease; }
        .glow-row:hover {
          transform: translateX(3px);
          box-shadow: -3px 0 16px -6px var(--acglow);
        }

        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: flex !important; } }
        @media (min-width: 769px) { .hamburger { display: none !important; } }

        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          .app-card:hover, .glow-card:hover, .glow-row:hover { transform: none; }
          html { scroll-behavior: auto; }
          .breathe-glow, .logo-si, .logo-lab, .logo-os { animation: none !important; }
        }

        /* ── Glow que respira: resplandor de texto que cicla entre los neón ── */
        @keyframes breatheGlow {
          0%   { text-shadow: 0 0 16px rgba(255,45,166,0.45), 0 0 32px rgba(255,45,166,0.18); }
          33%  { text-shadow: 0 0 16px rgba(168,85,247,0.45), 0 0 32px rgba(168,85,247,0.18); }
          66%  { text-shadow: 0 0 16px rgba(0,200,255,0.45), 0 0 32px rgba(0,200,255,0.18); }
          100% { text-shadow: 0 0 16px rgba(255,45,166,0.45), 0 0 32px rgba(255,45,166,0.18); }
        }
        .breathe-glow { animation: breatheGlow 45s ease-in-out infinite; }

        /* Glow para botones (box-shadow en vez de text-shadow) */
        @keyframes breatheBox {
          0%   { box-shadow: 0 0 22px -4px rgba(255,45,166,0.5); }
          33%  { box-shadow: 0 0 22px -4px rgba(168,85,247,0.5); }
          66%  { box-shadow: 0 0 22px -4px rgba(0,200,255,0.5); }
          100% { box-shadow: 0 0 22px -4px rgba(255,45,166,0.5); }
        }
        .breathe-box { animation: breatheBox 45s ease-in-out infinite; }

        /* Logo SILABOS: cada tramo deriva entre colores, desfasado, ciclo lento */
        @keyframes logoShift {
          0%   { color: #FF2DA6; }
          33%  { color: #A855F7; }
          66%  { color: #00C8FF; }
          100% { color: #FF2DA6; }
        }
        .logo-si  { animation: logoShift 48s ease-in-out infinite; animation-delay: 0s; }
        .logo-lab { animation: logoShift 48s ease-in-out infinite; animation-delay: -16s; }
        .logo-os  { animation: logoShift 48s ease-in-out infinite; animation-delay: -32s; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "rgba(10,10,18,0.97)",
        borderBottom: "1px solid rgba(168,85,247,0.15)",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 1.5rem", height: "64px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button onClick={() => scrollTo("inicio")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", padding: 0 }}>
          <InsigniaAnimada size={40} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", letterSpacing: "0.14em" }}>
            <span className="logo-si" style={{ color: S.fuxia }}>SI</span>
            <span className="logo-lab" style={{ color: S.morado }}>LAB</span>
            <span className="logo-os" style={{ color: S.azul }}>OS</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none" }}>
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <button onClick={() => scrollTo(l.id)} className="nav-link" style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 400,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: activeSection === l.id ? "#fff" : "rgba(255,255,255,0.72)",
                padding: 0,
              }}>{l.label}</button>
            </li>
          ))}
          <li>
            {/* Enlace a /aula/: NO hace scrollTo (es otra página estática), por eso es <a>, no <button>, y va con su propio estilo de píldora para diferenciarse del resto de la nav */}
            <a href="/aula/index.html" onClick={() => track("abrir_aula")} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: S.azul, textDecoration: "none",
              border: `1px solid ${S.azul}55`, borderRadius: "20px",
              padding: "5px 14px", background: `${S.azul}0F`,
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.azul }} />
              Aula
            </a>
          </li>
          <li>
            <button onClick={() => scrollTo("contacto")} className="btn-primary breathe-box" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "#fff", background: `linear-gradient(135deg, ${S.fuxia}, ${S.morado})`,
              padding: "9px 20px", borderRadius: "2px", border: "none", cursor: "pointer",
            }}>Contacto</button>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer", color: "#fff",
          display: "flex", flexDirection: "column", gap: "5px", padding: "4px",
        }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: "22px", height: "1.5px", background: menuOpen ? S.fuxia : "rgba(255,255,255,0.78)" }} />)}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0,
          background: "rgba(10,10,18,0.98)", borderBottom: `1px solid rgba(255,45,166,0.2)`,
          zIndex: 99, padding: "1.5rem",
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.7)", padding: "8px 0",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            }}>{l.label}</button>
          ))}
          <a href="/aula/index.html"
            onClick={() => { track("abrir_aula"); setMenuOpen(false); }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: S.azul, textDecoration: "none", padding: "8px 0",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.azul }} />
            Aula
          </a>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 1 — INICIO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="inicio" style={{ padding: "5rem 1.5rem 3rem", position: "relative", overflow: "hidden" }}>
        {/* Halos */}
        <div style={{ position: "absolute", top: "-100px", left: "-80px", width: "400px", height: "400px", background: `radial-gradient(circle, ${S.fuxia}1A 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "0", right: "-60px", width: "300px", height: "300px", background: `radial-gradient(circle, ${S.azul}1E 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* Copy */}
          <div>
            <div data-reveal className="breathe-box" style={{ "--reveal-i": 0,
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: `${S.fuxia}1A`, border: `0.5px solid ${S.fuxia}66`,
              borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase", color: S.fuxia,
              marginBottom: "1.5rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.fuxia }} />
              Pedagogía · IA · ELE
            </div>
            <h1 data-reveal className="breathe-glow" style={{ "--reveal-i": 1,
              fontFamily: "'Playfair Display', serif", fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 58px)", lineHeight: "1.08",
              color: "#fff", marginBottom: "1.25rem",
            }}>
              Aprende español<br />con{" "}
              <em style={{
                fontStyle: "italic",
                background: `linear-gradient(135deg, ${S.fuxia} 0%, ${S.morado} 50%, ${S.azul} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>inteligencia</em>
            </h1>
            <p data-reveal style={{ "--reveal-i": 2, fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: "1.75", maxWidth: "400px", marginBottom: "2.5rem" }}>
              Apps interactivas, recursos con IA y formación para docentes. Un laboratorio donde la tecnología está al servicio de la enseñanza, no al revés.
            </p>
            <div data-reveal style={{ "--reveal-i": 3, display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => scrollTo("ia-ele")} className="btn-primary breathe-box" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
                letterSpacing: "0.07em", textTransform: "uppercase", color: "#fff",
                background: `linear-gradient(135deg, ${S.fuxia}, ${S.morado})`,
                padding: "13px 28px", borderRadius: "2px", border: "none", cursor: "pointer",
              }}>Explorar apps →</button>
              <button onClick={() => scrollTo(MOSTRAR_TALLER ? "taller" : "contacto")} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                color: "rgba(255,255,255,0.65)", textDecoration: "underline", textUnderlineOffset: "3px",
              }}>{MOSTRAR_TALLER ? "Ver el taller" : "Contacto"}</button>
            </div>
          </div>

          {/* Apps rápidas */}
          <div data-reveal style={{ "--reveal-i": 2 }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "0.75rem" }}>
              Apps disponibles ahora
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {APPS.filter(a => a.estado === "disponible").map(app => (
                <button key={app.id} className="app-card glow-row" onClick={() => abrirApp(app)}
                  style={{
                    "--ac": app.color, "--acglow": hexA(app.color, 0.5),
                    background: hoveredApp === app.id ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    borderLeft: `2px solid ${app.color}`,
                    borderRadius: "4px", padding: "0.875rem 1rem",
                    cursor: "pointer", textAlign: "left", width: "100%",
                  }}
                  onMouseEnter={() => setHoveredApp(app.id)}
                  onMouseLeave={() => setHoveredApp(null)}
                >
                  <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: app.color, marginBottom: "4px" }}>{app.categoria}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#fff", marginBottom: "6px" }}>{app.nombre}</p>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {app.tags.map((tag, j) => (
                      <span key={j} style={{ fontSize: "10px", color: app.color, border: `0.5px solid ${app.color}55`, padding: "2px 7px", borderRadius: "2px" }}>{tag}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "0 1.5rem 4rem" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1px", background: "rgba(255,255,255,0.05)",
          border: "0.5px solid rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden",
        }}>
          <div style={{ background: "rgba(10,10,18,0.5)", padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <InsigniaStatic size={48} />
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.72)", letterSpacing: "0.06em", textTransform: "uppercase" }}>SILABOS</p>
          </div>
          {[
            { val: "+10 años", sub: "Experiencia ELE", color: S.fuxia },
            { val: "A1–C2", sub: "Todos los niveles", color: S.morado },
            { val: "3 apps", sub: "Disponibles ya", color: S.azul },
            { val: "100%", sub: "Online", color: S.amarillo },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(10,10,18,0.5)", padding: "1.5rem 1.25rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: s.color, marginBottom: "4px" }}>{s.val}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Para quién */}
      <section style={{ padding: "0 1.5rem 5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "1.5rem" }}>Para quién</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {[
              {
                icon: "estudiantes", titulo: "Estudiantes", color: S.fuxia,
                desc: "Practica español de forma interactiva con apps diseñadas para que aprendas a comunicarte de verdad. Desde A1 hasta C2.",
                tags: ["Expresión oral", "Comprensión", "Apps lúdicas", "A1–C2"],
              },
              {
                icon: "docentes", titulo: "Docentes de ELE", color: S.morado,
                desc: "Integra IA en tu práctica docente. Recursos, actividades y herramientas para el aula con enfoque comunicativo.",
                tags: ["Materiales IA", "Formación", "Metodología", "MCER"],
              },
              {
                icon: "entidades", titulo: "Entidades educativas", color: S.azul,
                desc: "Soluciones escalables con IA pedagógica para centros, academias y plataformas que quieren integrar el español por niveles.",
                tags: ["EO · EE · CL · CA", "API", "Por niveles", "Institucional"],
              },
            ].map((card, i) => (
              <div key={i} className="glow-card" data-reveal style={{ "--reveal-i": i, "--ac": card.color, "--acglow": hexA(card.color, 0.45), background: `${card.color}08`, padding: "2.5rem 2rem", borderTop: `2px solid ${card.color}` }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${card.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <UiIcon name={card.icon} size={24} color={card.color} />
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#fff", marginBottom: "0.75rem" }}>{card.titulo}</p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginBottom: "1.25rem" }}>{card.desc}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {card.tags.map((t, j) => (
                    <span key={j} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "2px", border: `0.5px solid ${card.color}55`, color: card.color }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 2 — IA & ELE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="ia-ele" style={{ padding: "5rem 1.5rem", background: "rgba(13,13,26,0.55)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "350px", height: "350px", background: `radial-gradient(circle, ${S.morado}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div data-reveal style={{ "--reveal-i": 0, marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: `${S.morado}1A`, border: `0.5px solid ${S.morado}55`,
              borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase", color: S.morado,
              marginBottom: "1.25rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.morado }} />
              IA & ELE
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", color: "#fff", lineHeight: "1.1", marginBottom: "1rem" }}>
              IA al servicio del{" "}
              <em style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${S.morado}, ${S.azul})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>aprendizaje</em>
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", maxWidth: "540px", lineHeight: "1.75" }}>
              Herramientas construidas con IA y metodología comunicativa para que el español se aprenda haciendo.
            </p>
          </div>

          {/* Grid apps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginBottom: "3rem" }}>
            {APPS.map((app, i) => (
              <div key={app.id} className="app-card glow-card" data-reveal
                style={{
                  "--reveal-i": i, "--ac": app.color, "--acglow": hexA(app.color, 0.45),
                  background: "rgba(255,255,255,0.03)",
                  border: `0.5px solid ${app.color}33`,
                  borderRadius: "6px",
                  padding: "1.75rem",
                  opacity: app.estado === "desarrollo" ? 0.65 : 1,
                  cursor: app.estado === "disponible" ? "pointer" : "default",
                  position: "relative",
                }}
                onClick={() => app.estado === "disponible" && abrirApp(app)}
              >
                {app.estado === "desarrollo" && (
                  <div style={{
                    position: "absolute", top: "14px", right: "14px",
                    fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase",
                    color: S.amarillo, border: `0.5px solid ${S.amarillo}55`,
                    padding: "3px 8px", borderRadius: "2px",
                  }}>En desarrollo</div>
                )}
                {app.estado === "disponible" && (
                  <div style={{
                    position: "absolute", top: "14px", right: "14px",
                    fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase",
                    color: S.verde, border: `0.5px solid ${S.verde}55`,
                    padding: "3px 8px", borderRadius: "2px",
                  }}>Disponible</div>
                )}
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: `${app.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <AppIcon id={app.id} size={24} color={app.color} />
                </div>
                <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: app.color, marginBottom: "6px" }}>{app.categoria}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#fff", marginBottom: "10px" }}>{app.nombre}</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: "1.7", marginBottom: "1.25rem" }}>{app.descripcion}</p>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {app.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: "11px", color: app.color, border: `0.5px solid ${app.color}44`, padding: "3px 8px", borderRadius: "2px" }}>{tag}</span>
                  ))}
                </div>
                {app.estado === "disponible" && (
                  <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "6px", color: app.color, fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em" }}>
                    Abrir app <span style={{ fontSize: "16px" }}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Banner Aula — distinto de las tarjetas de app: enlaza a la zona de práctica para alumnos */}
          <a
            href="/aula/index.html"
            onClick={() => track("abrir_aula")}
            data-reveal
            style={{
              "--reveal-i": APPS.length,
              display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap",
              textDecoration: "none",
              background: "rgba(255,255,255,0.03)",
              border: `1px dashed ${S.azul}55`,
              borderRadius: "6px",
              padding: "1.5rem 1.75rem",
              marginBottom: "3rem",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${S.azul}AA`; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${S.azul}55`; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            <div style={{ width: "44px", height: "44px", flexShrink: 0, borderRadius: "8px", background: `${S.azul}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={S.azul} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3 2 8l10 5 10-5-10-5Z" />
                <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
              </svg>
            </div>
            <div style={{ flex: "1 1 240px" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: S.azul, marginBottom: "4px" }}>Para tus alumnos</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#fff" }}>Aula · material de repaso por niveles</p>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: "1.6", flex: "2 1 280px", margin: 0 }}>
              Actividades interactivas (A1–B2) que uso en clase para presentar y practicar contenidos: teoría, textos comentados y ejercicios autocorregidos.
            </p>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: S.azul, fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
              Entrar al aula <span style={{ fontSize: "16px" }}>→</span>
            </span>
          </a>

          {/* Texto de interés / editorial */}
          <div data-reveal style={{ "--reveal-i": 0, borderTop: "0.5px solid rgba(255,255,255,0.07)", paddingTop: "3rem", marginBottom: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", lineHeight: "1.25", marginBottom: "1rem" }}>
                ¿Por qué IA en el aprendizaje de idiomas?
              </h3>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: "1.8" }}>
                Aprender una lengua exige práctica constante, retroalimentación inmediata y exposición a contextos reales. Tres cosas difíciles de garantizar para cada estudiante con los recursos de un aula tradicional. Aquí es donde la inteligencia artificial marca la diferencia: permite crear experiencias que se adaptan al nivel de cada persona, responden al instante y ofrecen práctica ilimitada sin sustituir nunca el criterio pedagógico de quien enseña.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", lineHeight: "1.25", marginBottom: "1rem" }}>
                La metodología, primero
              </h3>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: "1.8" }}>
                En SILABOS la IA es una herramienta, no el objetivo. Cada app nace de una decisión metodológica: qué destreza queremos trabajar (expresión oral, comprensión, escritura), qué tipo de práctica es significativa y cómo hacer que el estudiante reciba input comprensible. La tecnología llega después, para hacer posible esa idea pedagógica. Por eso lo que construimos aquí funciona en el aula de verdad, no solo sobre el papel.
              </p>
            </div>
          </div>

          {/* Cómo trabajo */}
          <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", paddingTop: "3rem" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "2rem" }}>Cómo trabajo</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
              {[
                { num: "01", titulo: "Input comprensible", desc: "Los materiales y apps se diseñan para que el estudiante reciba español real, ligeramente por encima de su nivel.", color: S.fuxia },
                { num: "02", titulo: "Práctica significativa", desc: "Cada actividad tiene un propósito comunicativo. Se aprende haciendo, no memorizando reglas.", color: S.morado },
                { num: "03", titulo: "IA como medio", desc: "La inteligencia artificial amplifica la metodología, no la reemplaza. El foco es siempre el aprendizaje.", color: S.azul },
              ].map((b, i) => (
                <div key={i} style={{ background: "rgba(10,10,18,0.5)", padding: "2rem 1.75rem" }}>
                  <p style={{ fontFamily: "monospace", fontSize: "11px", color: b.color, marginBottom: "1rem", opacity: 0.7 }}>{b.num}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#fff", marginBottom: "0.75rem" }}>{b.titulo}</p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)", lineHeight: "1.7" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 3 — API
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="api" style={{ padding: "5rem 1.5rem", background: "rgba(10,10,18,0.4)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "300px", height: "300px", background: `radial-gradient(circle, ${S.verde}0F 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
            {/* Copy */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: `${S.verde}15`, border: `0.5px solid ${S.verde}44`,
                borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
                letterSpacing: "0.1em", textTransform: "uppercase", color: S.verde,
                marginBottom: "1.5rem",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.verde, boxShadow: `0 0 8px ${S.verde}` }} />
                En desarrollo
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", lineHeight: "1.1", marginBottom: "1rem" }}>
                API ELE<br />
                <em style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${S.verde}, ${S.azul})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>por niveles</em>
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: "1.8", marginBottom: "2rem" }}>
                Estamos construyendo una API para la integración de contenidos de español estructurados por niveles MCER (A1–C2) en plataformas educativas. Vocabulario, gramática, actividades y evaluación.
              </p>
              <button onClick={() => scrollTo("contacto")} className="btn-primary" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#000", background: S.verde,
                padding: "12px 24px", borderRadius: "2px", border: "none", cursor: "pointer",
              }}>Solicitar acceso anticipado</button>
            </div>

            {/* Endpoints preview */}
            <div>
              <div style={{ background: "#0D0D1A", border: `1px solid ${S.verde}22`, borderRadius: "6px", overflow: "hidden" }}>
                {/* Header terminal */}
                <div style={{ background: "rgba(57,255,20,0.07)", borderBottom: `1px solid ${S.verde}22`, padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: S.verde, boxShadow: `0 0 6px ${S.verde}` }} />
                  <span style={{ fontFamily: "monospace", fontSize: "12px", color: `${S.verde}99` }}>silabos.es/api/v1</span>
                </div>
                {/* Endpoints */}
                <div style={{ padding: "1.25rem" }}>
                  {[
                    { method: "GET", path: "/vocabulary/:level", desc: "Vocabulario por nivel MCER", color: S.azul },
                    { method: "GET", path: "/grammar/:level", desc: "Estructuras gramaticales", color: S.azul },
                    { method: "POST", path: "/activity/generate", desc: "Generar actividad con IA", color: S.morado },
                    { method: "GET", path: "/assessment/:level", desc: "Test de nivel adaptativo", color: S.fuxia },
                  ].map((ep, i) => (
                    <div key={i} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: i < 3 ? "0.5px solid rgba(255,255,255,0.05)" : "none", alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily: "monospace", fontSize: "10px", fontWeight: 700,
                        color: ep.color, border: `0.5px solid ${ep.color}44`,
                        padding: "2px 6px", borderRadius: "2px", flexShrink: 0,
                      }}>{ep.method}</span>
                      <div>
                        <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#fff", marginBottom: "2px" }}>{ep.path}</p>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)" }}>{ep.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)", fontFamily: "monospace" }}>// Documentación disponible próximamente</span>
                </div>
              </div>

              {/* Features */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                {["MCER A1–C2", "REST + JSON", "Rate limiting", "Auth API key"].map((f, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: "4px", padding: "10px 12px", fontSize: "12px", color: "rgba(255,255,255,0.72)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: S.verde, fontSize: "10px" }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN — TALLER (próximamente)
      ═══════════════════════════════════════════════════════════════════════ */}
      {MOSTRAR_TALLER && (
      <section id="taller" style={{ padding: "5rem 1.5rem", background: "rgba(13,13,26,0.55)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", left: "-80px", width: "420px", height: "420px", background: `radial-gradient(circle, ${S.amarillo}10 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div data-reveal style={{ "--reveal-i": 0, marginBottom: "3rem", maxWidth: "640px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: `${S.amarillo}1A`, border: `0.5px solid ${S.amarillo}66`,
              borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase", color: S.amarillo,
              marginBottom: "1.5rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.amarillo }} />
              Próximamente · Taller
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: "1.1", color: "#fff", marginBottom: "1.25rem" }}>
              Crea tus propias apps educativas <em style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${S.amarillo}, ${S.fuxia})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>sin saber programar</em>
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: "1.75" }}>
              Un taller práctico para docentes de cualquier materia. Aprende a usar la inteligencia artificial para construir actividades y aplicaciones interactivas a la medida de tu aula, partiendo de cero. Sin código, sin conocimientos técnicos previos: solo tus ideas y las herramientas adecuadas.
            </p>
          </div>

          {/* Qué te llevas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "3rem" }}>
            {[
              { titulo: "De la idea a la app", desc: "Convierte una actividad que ya haces en clase en una aplicación interactiva que tus alumnos pueden usar.", color: S.amarillo },
              { titulo: "Sin programar", desc: "Trabajarás guiando a la IA con tus palabras. Nada de lenguajes de programación ni instalaciones complejas.", color: S.fuxia },
              { titulo: "Para cualquier materia", desc: "Idiomas, ciencias, historia, matemáticas… La metodología sirve para enseñar lo que enseñes.", color: S.morado },
            ].map((b, i) => (
              <div key={i} data-reveal className="glow-card" style={{ "--reveal-i": i, "--ac": b.color, "--acglow": hexA(b.color, 0.4), background: `${b.color}08`, border: `0.5px solid ${b.color}22`, borderRadius: "6px", padding: "1.75rem 1.5rem" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#fff", marginBottom: "0.6rem" }}>{b.titulo}</p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: "1.7" }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div data-reveal style={{ "--reveal-i": 1, background: `linear-gradient(135deg, ${S.amarillo}10, ${S.fuxia}10)`, border: `0.5px solid ${S.amarillo}33`, borderRadius: "8px", padding: "2.5rem 2rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#fff", marginBottom: "0.5rem" }}>
              Aún no hay fecha, pero puedes ser de los primeros en saberlo
            </p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 1.75rem" }}>
              Si te interesa el taller, escríbeme y te avisaré en cuanto abra inscripciones, con todos los detalles de fecha, formato y precio.
            </p>
            <button onClick={() => scrollTo("contacto")} className="btn-primary" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
              letterSpacing: "0.07em", textTransform: "uppercase", color: "#fff",
              background: `linear-gradient(135deg, ${S.amarillo}, ${S.fuxia})`,
              padding: "13px 28px", borderRadius: "2px", border: "none", cursor: "pointer",
            }}>Quiero que me avisen →</button>
          </div>

        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 4 — CLASES (oculta tras MOSTRAR_CLASES)
      ═══════════════════════════════════════════════════════════════════════ */}
      {MOSTRAR_CLASES && (
      <section id="clases" style={{ padding: "5rem 1.5rem", background: "rgba(13,13,26,0.55)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", background: `radial-gradient(circle, ${S.fuxia}12 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: `${S.fuxia}1A`, border: `0.5px solid ${S.fuxia}55`,
              borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase", color: S.fuxia,
              marginBottom: "1.25rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.fuxia }} />
              Clases de español
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 48px)", color: "#fff", lineHeight: "1.1", marginBottom: "1rem" }}>
              Clases{" "}
              <em style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${S.fuxia}, ${S.morado})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>personalizadas</em>
              <br />100% online
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", maxWidth: "500px", lineHeight: "1.75" }}>
              Metodología comunicativa con IA integrada. Enfoque en las 4 destrezas: expresión oral y escrita, comprensión lectora y auditiva.
            </p>
          </div>

          {/* Modalidades */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "3rem" }}>
            {CLASES.map((c, i) => (
              <div key={i} className="glow-card" data-reveal style={{
                "--reveal-i": i, "--ac": c.color, "--acglow": hexA(c.color, 0.4),
                background: `${c.color}08`, border: `1px solid ${c.color}${c.destacado ? "55" : "22"}`,
                borderRadius: "6px", padding: "2.25rem",
                position: "relative",
                boxShadow: c.destacado ? `0 0 30px ${c.color}15` : "none",
              }}>
                {c.destacado && (
                  <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: `linear-gradient(135deg, ${S.azul}, ${S.morado})`,
                    fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#fff", padding: "4px 14px", borderRadius: "20px", fontWeight: 500,
                  }}>Más popular</div>
                )}
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${c.color}1A`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <UiIcon name={c.icon} size={28} color={c.color} />
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", marginBottom: "6px" }}>{c.tipo}</p>
                <p style={{ fontSize: "12px", color: c.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>{c.duracion}</p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", marginBottom: "1.5rem" }}>{c.descripcion}</p>
                <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                  {c.features.map((f, j) => (
                    <li key={j} style={{ fontSize: "13px", color: "rgba(255,255,255,0.78)", padding: "6px 0", borderBottom: "0.5px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: c.color, fontSize: "10px" }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo("contacto")} className="btn-primary" style={{
                  width: "100%", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px", fontWeight: 500, letterSpacing: "0.07em",
                  textTransform: "uppercase", color: "#fff",
                  background: `linear-gradient(135deg, ${c.color}, ${S.morado})`,
                  padding: "12px", borderRadius: "2px", border: "none", cursor: "pointer",
                }}>{c.cta}</button>
              </div>
            ))}
          </div>

          {/* Proceso */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "2.5rem" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "2rem" }}>Cómo empezamos</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
              {[
                { n: "1", paso: "Contacto", desc: "Cuéntame tus objetivos y nivel actual", color: S.fuxia },
                { n: "2", paso: "Sesión prueba", desc: "20 minutos gratis para conocernos", color: S.morado },
                { n: "3", paso: "Plan a medida", desc: "Diseñamos juntos el camino a seguir", color: S.azul },
                { n: "4", paso: "¡Empezamos!", desc: "Clases regulares según tu agenda", color: S.verde },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `${p.color}22`, border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "12px", color: p.color }}>
                    {p.n}
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#fff" }}>{p.paso}</p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.72)", lineHeight: "1.6" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA sesión prueba */}
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)", marginBottom: "1rem" }}>Sin compromiso · 20 minutos · 100% online</p>
            <button onClick={() => scrollTo("contacto")} className="btn-primary" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff",
              background: `linear-gradient(135deg, ${S.fuxia}, ${S.morado}, ${S.azul})`,
              padding: "14px 36px", borderRadius: "2px", border: "none", cursor: "pointer",
              backgroundSize: "200% auto",
            }}>Reservar sesión de prueba gratuita</button>
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 5 — CONTACTO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contacto" style={{ padding: "5rem 1.5rem 6rem", background: "rgba(10,10,18,0.4)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: `radial-gradient(ellipse, ${S.morado}12 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: `${S.morado}1A`, border: `0.5px solid ${S.morado}55`,
              borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase", color: S.morado,
              marginBottom: "1.25rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.morado }} />
              Contacto
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", lineHeight: "1.1" }}>
              Hablemos de{" "}
              <em style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${S.morado}, ${S.azul})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>español</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem" }}>
            {/* Perfil */}
            <div>
              {/* Avatar line-art de Juanjo */}
              <div style={{
                width: "140px", height: "140px",
                background: `linear-gradient(135deg, ${S.fuxia}22, ${S.morado}22)`,
                border: `1px solid ${S.morado}44`,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.5rem",
              }}>
                <UiIcon name="avatar" size={92} color={S.morado} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", marginBottom: "4px" }}>Juanjo</p>
              <p style={{ fontSize: "13px", color: S.morado, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>Pedagogo · ELE · Tenerife</p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: "1.75", maxWidth: "320px", marginBottom: "2rem" }}>
                Más de 10 años enseñando español. Experto en metodología comunicativa e integración de IA en contextos educativos.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { icon: "email", label: "info@silabos.es", href: "mailto:info@silabos.es" },
                  { icon: "linkedin", label: "LinkedIn", href: "https://es.linkedin.com/in/juan-jos%C3%A9-ojeda-santana-65274637" },
                ].map((c, i) => (
                  <a key={i} href={c.href} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    fontSize: "14px", color: "rgba(255,255,255,0.72)",
                    textDecoration: "none", padding: "8px 0",
                    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.72)"}
                  >
                    <UiIcon name={c.icon} size={18} color={S.morado} /> {c.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <div>
              {formSent ? (
                <div style={{
                  background: `${S.verde}10`, border: `1px solid ${S.verde}33`,
                  borderRadius: "6px", padding: "3rem 2rem", textAlign: "center",
                }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                    <UiIcon name="enviado" size={48} color={S.verde} />
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#fff", marginBottom: "0.75rem" }}>¡Mensaje enviado!</p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.72)" }}>Te respondo en menos de 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleForm} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { key: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                    { key: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
                    { key: "asunto", label: "Asunto", type: "text", placeholder: "¿En qué puedo ayudarte?" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "6px" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required
                        value={formState[f.key]}
                        onChange={e => setFormState(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.04)",
                          border: "0.5px solid rgba(255,255,255,0.1)",
                          borderRadius: "3px", padding: "12px 14px",
                          fontSize: "14px", color: "#fff",
                          fontFamily: "'DM Sans', sans-serif",
                          outline: "none",
                        }}
                        onFocus={e => e.target.style.borderColor = `${S.morado}88`}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)", marginBottom: "6px" }}>Mensaje</label>
                    <textarea
                      placeholder="Cuéntame más..."
                      required
                      rows={4}
                      value={formState.mensaje}
                      onChange={e => setFormState(p => ({ ...p, mensaje: e.target.value }))}
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.04)",
                        border: "0.5px solid rgba(255,255,255,0.1)",
                        borderRadius: "3px", padding: "12px 14px",
                        fontSize: "14px", color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        outline: "none", resize: "vertical",
                      }}
                      onFocus={e => e.target.style.borderColor = `${S.morado}88`}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                  {formError && (
                    <p style={{ fontSize: "13px", color: S.fuxia, margin: "0" }}>{formError}</p>
                  )}
                  <button type="submit" disabled={formSending} className="btn-primary" style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
                    letterSpacing: "0.07em", textTransform: "uppercase", color: "#fff",
                    background: `linear-gradient(135deg, ${S.fuxia}, ${S.morado})`,
                    padding: "13px", borderRadius: "2px", border: "none",
                    cursor: formSending ? "default" : "pointer",
                    opacity: formSending ? 0.6 : 1,
                  }}>{formSending ? "Enviando…" : "Enviar mensaje"}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: "#060610",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        padding: "2.5rem 1.5rem",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <InsigniaStatic size={28} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "16px", letterSpacing: "0.12em" }}>
              <span style={{ color: S.fuxia }}>SI</span>
              <span style={{ color: S.morado }}>LAB</span>
              <span style={{ color: S.azul }}>OS</span>
            </span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)", marginLeft: "8px" }}>Pedagogía · IA · ELE</span>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "11px", color: "rgba(255,255,255,0.72)",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{l.label}</button>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)" }}>© {new Date().getFullYear()} SILABOS</p>
        </div>
      </footer>

      {/* PODCAST — Preparado pero oculto */}
      {/* 
        SECCIÓN PODCAST — Let's Speak Spanish
        Descomenta cuando estés listo.
        
        <section id="podcast" style={{ display: 'none' }}>
          <div>
            <h2>Let's Speak Spanish</h2>
            <p>Podcast disponible en SoundCloud, Spotify y Apple Podcasts</p>
            Playlists:
            - Cultura hispana
            - Gramática y vocabulario  
            - Temas variados
            
            SoundCloud embed:
            <iframe src="[URL_SOUNDCLOUD_PLAYLIST_1]" ... />
            <iframe src="[URL_SOUNDCLOUD_PLAYLIST_2]" ... />
            <iframe src="[URL_SOUNDCLOUD_PLAYLIST_3]" ... />
            
            Spotify embed:
            <iframe src="[URL_SPOTIFY]" ... />
          </div>
        </section>
      */}
      </div>
    </div>
  );
}