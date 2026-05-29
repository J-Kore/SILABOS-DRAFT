import { useState, useEffect, useRef } from "react";

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
    url: "https://conjuanjugator2.netlify.app/",
    estado: "disponible",
  },
  {
    id: 2,
    nombre: "Convozjugator",
    categoria: "Expresión Oral",
    descripcion: "Entrena la pronunciación y el ritmo del español con actividades de conversación guiada.",
    tags: ["Expresión Oral", "Conjugación", "Verbos", "Tiempos"],
    color: "#A855F7",
    url: "https://convozjugator.netlify.app/",
    estado: "disponible",
  },
  {
    id: 3,
    nombre: "Ponlo",
    categoria: "Expresión Oral",
    descripcion: "Aprende colocaciones léxicas y el uso del imperativo en situaciones comunicativas auténticas.",
    tags: ["Colocaciones", "Imperativo", "Léxico"],
    color: "#00C8FF",
    url: "https://ponlo.netlify.app/",
    estado: "disponible",
  },
  {
    id: 4,
    nombre: "ComuniTabu",
    categoria: "Expresión Oral",
    descripcion: "Dinámica de tabú adaptada al aula de ELE. Practica la descripción y el vocabulario en acción.",
    tags: ["Juego", "Vocabulario", "Definiciones", "Explicaciones"],
    color: "#39FF14",
    url: null,
    estado: "desarrollo",
  },
  {
    id: 5,
    nombre: "Operación ELE",
    categoria: "Inmersión",
    descripcion: "Aventura narrativa interactiva para aprender español tomando decisiones reales en la historia.",
    tags: ["Narrativa", "Decisiones", "Comprensión Lectora", "Comprensión Auditiva", "Expresión Oral", "Expresión Escrita"],
    color: "#FACC15",
    url: null,
    estado: "desarrollo",
  },
];

const CLASES = [
  {
    tipo: "Individual",
    emoji: "👤",
    duracion: "45 min",
    descripcion: "Sesión personalizada 100% adaptada a tu nivel, objetivos y ritmo.",
    features: ["Plan de aprendizaje a medida", "Feedback inmediato", "Grabación disponible", "Material personalizado"],
    color: "#FF2DA6",
    cta: "Reservar individual",
  },
  {
    tipo: "Grupo pequeño",
    emoji: "👥",
    duracion: "45 min · 2–4 personas",
    descripcion: "Aprende con otros estudiantes de nivel similar. Más conversación, más dinámica.",
    features: ["2 a 4 estudiantes", "Nivel homogéneo", "Práctica colaborativa", "Precio reducido"],
    color: "#00C8FF",
    cta: "Reservar grupo",
    destacado: true,
  },
];

const NAV_LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "ia-ele", label: "IA & ELE" },
  { id: "api", label: "API" },
  { id: "clases", label: "Clases" },
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
    const LINES = ["ia-l1","ia-l2","ia-l3","ia-l4","ia-l5","ia-l6","ia-l7","ia-l8"];
    const FLASHES = ["ia-fl1","ia-fl2","ia-fl3","ia-fl4","ia-fl5","ia-fl6","ia-fl7"];
    const STAR_DUR = 900, STAR_DELAY = 200;
    const LINE_START = STARS.length * STAR_DELAY + STAR_DUR + 200;
    const LINE_DUR = 380, LINE_DELAY = 120;

    function ease(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
    function easeOut(t) { return 1 - Math.pow(1-t,3); }
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
          el.setAttribute("opacity", t < 0.15 ? t/0.15 : 1-(t-0.15)/0.85);
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
          const bx = (1-et)*(1-et)*s.ox + 2*(1-et)*et*(cx-finalX) + et*et*0;
          const by = (1-et)*(1-et)*s.oy + 2*(1-et)*et*(cy-finalY) + et*et*0;
          el.setAttribute("opacity", Math.min(1, t * 3));
          el.setAttribute("transform", `translate(${bx},${by}) scale(${0.05 + 0.95*et})`);
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
      {["ia-fl1","ia-fl2","ia-fl3","ia-fl4","ia-fl5","ia-fl6","ia-fl7"].map((id, i) => {
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

// ─── MODAL IFRAME ──────────────────────────────────────────────────────────────
function AppModal({ app, onClose }) {
  if (!app) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(10,10,18,0.92)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0D0D1A",
          border: `1px solid ${app.color}44`,
          borderRadius: "8px",
          width: "min(92vw, 960px)",
          height: "min(88vh, 700px)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          boxShadow: `0 0 60px ${app.color}22`,
        }}
      >
        {/* Barra superior */}
        <div style={{
          background: "#0A0A12",
          borderBottom: `1px solid ${app.color}33`,
          padding: "10px 16px",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          {/* Dots */}
          <div style={{ display: "flex", gap: "6px" }}>
            <div onClick={onClose} style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", cursor: "pointer" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
          </div>
          <div style={{
            flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "4px",
            padding: "4px 12px", fontSize: "12px", color: "rgba(255,255,255,0.35)",
            fontFamily: "monospace",
          }}>
            {app.url}
          </div>
          <a href={app.url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: "11px", color: app.color, textDecoration: "none",
            border: `0.5px solid ${app.color}66`, padding: "4px 10px", borderRadius: "3px",
          }}>↗ Abrir</a>
        </div>
        {/* Iframe */}
        <iframe
          src={app.url}
          title={app.nombre}
          style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function SilabosLanding() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedApp, setSelectedApp] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);
  const [hoveredApp, setHoveredApp] = useState(null);

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

  function handleForm(e) {
    e.preventDefault();
    setFormSent(true);
  }

  const S = {
    bg: "#0A0A12",
    fuxia: "#FF2DA6",
    morado: "#A855F7",
    azul: "#00C8FF",
    amarillo: "#FACC15",
    verde: "#39FF14",
  };

  return (
    <div style={{ background: S.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
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
        .app-card { transition: transform 0.2s, border-color 0.2s, background 0.2s; cursor: pointer; }
        .app-card:hover { transform: translateY(-2px); }
        .btn-primary { transition: opacity 0.2s, transform 0.15s; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.98); }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: flex !important; } }
        @media (min-width: 769px) { .hamburger { display: none !important; } }
      `}</style>

      {/* ── MODAL ── */}
      {selectedApp && <AppModal app={selectedApp} onClose={() => setSelectedApp(null)} />}

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
            <span style={{ color: S.fuxia }}>SI</span>
            <span style={{ color: S.morado }}>LAB</span>
            <span style={{ color: S.azul }}>OS</span>
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
                color: activeSection === l.id ? "#fff" : "rgba(255,255,255,0.4)",
                padding: 0,
              }}>{l.label}</button>
            </li>
          ))}
          <li>
            <button onClick={() => scrollTo("contacto")} className="btn-primary" style={{
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
          {[0,1,2].map(i => <div key={i} style={{ width: "22px", height: "1.5px", background: menuOpen ? S.fuxia : "rgba(255,255,255,0.6)" }} />)}
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
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: `${S.fuxia}1A`, border: `0.5px solid ${S.fuxia}66`,
              borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
              letterSpacing: "0.1em", textTransform: "uppercase", color: S.fuxia,
              marginBottom: "1.5rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: S.fuxia }} />
              Pedagogía · IA · ELE
            </div>
            <h1 style={{
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
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: "1.75", maxWidth: "400px", marginBottom: "2.5rem" }}>
              Apps interactivas, clases personalizadas y recursos con IA para estudiantes y docentes que quieren llevar el español más lejos.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => scrollTo("ia-ele")} className="btn-primary" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
                letterSpacing: "0.07em", textTransform: "uppercase", color: "#fff",
                background: `linear-gradient(135deg, ${S.fuxia}, ${S.morado})`,
                padding: "13px 28px", borderRadius: "2px", border: "none", cursor: "pointer",
              }}>Explorar apps →</button>
              <button onClick={() => scrollTo("clases")} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                color: "rgba(255,255,255,0.45)", textDecoration: "underline", textUnderlineOffset: "3px",
              }}>Ver clases</button>
            </div>
          </div>

          {/* Apps rápidas */}
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>
              Apps disponibles ahora
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {APPS.filter(a => a.estado === "disponible").map(app => (
                <button key={app.id} className="app-card" onClick={() => setSelectedApp(app)}
                  style={{
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
          <div style={{ background: S.bg, padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <InsigniaStatic size={48} />
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>SILABOS</p>
          </div>
          {[
            { val: "+10 años", sub: "Experiencia ELE", color: S.fuxia },
            { val: "A1–C2", sub: "Todos los niveles", color: S.morado },
            { val: "3 apps", sub: "Disponibles ya", color: S.azul },
            { val: "100%", sub: "Online", color: S.amarillo },
          ].map((s, i) => (
            <div key={i} style={{ background: S.bg, padding: "1.5rem 1.25rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: s.color, marginBottom: "4px" }}>{s.val}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Para quién */}
      <section style={{ padding: "0 1.5rem 5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1.5rem" }}>Para quién</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {[
              {
                emoji: "🎓", titulo: "Estudiantes", color: S.fuxia,
                desc: "Practica español de forma interactiva con apps diseñadas para que aprendas a comunicarte de verdad. Desde A1 hasta C2.",
                tags: ["Expresión oral", "Comprensión", "Apps lúdicas", "A1–C2"],
              },
              {
                emoji: "🤝", titulo: "Docentes de ELE", color: S.morado,
                desc: "Integra IA en tu práctica docente. Recursos, actividades y herramientas para el aula con enfoque comunicativo.",
                tags: ["Materiales IA", "Formación", "Metodología", "MCER"],
              },
              {
                emoji: "🏛️", titulo: "Entidades educativas", color: S.azul,
                desc: "Soluciones escalables con IA pedagógica para centros, academias y plataformas que quieren integrar el español por niveles.",
                tags: ["EO · EE · CL · CA", "API", "Por niveles", "Institucional"],
              },
            ].map((card, i) => (
              <div key={i} style={{ background: `${card.color}08`, padding: "2.5rem 2rem", borderTop: `2px solid ${card.color}` }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${card.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "1.25rem" }}>{card.emoji}</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#fff", marginBottom: "0.75rem" }}>{card.titulo}</p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: "1.7", marginBottom: "1.25rem" }}>{card.desc}</p>
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
      <section id="ia-ele" style={{ padding: "5rem 1.5rem", background: "#0D0D1A", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "350px", height: "350px", background: `radial-gradient(circle, ${S.morado}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
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
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", maxWidth: "540px", lineHeight: "1.75" }}>
              Herramientas construidas con IA y metodología comunicativa para que el español se aprenda haciendo.
            </p>
          </div>

          {/* Grid apps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginBottom: "3rem" }}>
            {APPS.map(app => (
              <div key={app.id} className="app-card"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `0.5px solid ${app.color}33`,
                  borderRadius: "6px",
                  padding: "1.75rem",
                  opacity: app.estado === "desarrollo" ? 0.65 : 1,
                  cursor: app.estado === "disponible" ? "pointer" : "default",
                  position: "relative",
                }}
                onClick={() => app.estado === "disponible" && setSelectedApp(app)}
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
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: `${app.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "1rem" }}>
                  {["📚", "🎙️", "🧩", "🃏", "🗺️"][app.id - 1]}
                </div>
                <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: app.color, marginBottom: "6px" }}>{app.categoria}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#fff", marginBottom: "10px" }}>{app.nombre}</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7", marginBottom: "1.25rem" }}>{app.descripcion}</p>
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

          {/* Cómo trabajo */}
          <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", paddingTop: "3rem" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>Cómo trabajo</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
              {[
                { num: "01", titulo: "Input comprensible", desc: "Los materiales y apps se diseñan para que el estudiante reciba español real, ligeramente por encima de su nivel.", color: S.fuxia },
                { num: "02", titulo: "Práctica significativa", desc: "Cada actividad tiene un propósito comunicativo. Se aprende haciendo, no memorizando reglas.", color: S.morado },
                { num: "03", titulo: "IA como medio", desc: "La inteligencia artificial amplifica la metodología, no la reemplaza. El foco es siempre el aprendizaje.", color: S.azul },
              ].map((b, i) => (
                <div key={i} style={{ background: S.bg, padding: "2rem 1.75rem" }}>
                  <p style={{ fontFamily: "monospace", fontSize: "11px", color: b.color, marginBottom: "1rem", opacity: 0.7 }}>{b.num}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#fff", marginBottom: "0.75rem" }}>{b.titulo}</p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 3 — API
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="api" style={{ padding: "5rem 1.5rem", background: S.bg, position: "relative", overflow: "hidden" }}>
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
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: "1.8", marginBottom: "2rem" }}>
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
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{ep.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>// Documentación disponible próximamente</span>
                </div>
              </div>

              {/* Features */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                {["MCER A1–C2", "REST + JSON", "Rate limiting", "Auth API key"].map((f, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: "4px", padding: "10px 12px", fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: S.verde, fontSize: "10px" }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 4 — CLASES
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="clases" style={{ padding: "5rem 1.5rem", background: "#0D0D1A", position: "relative", overflow: "hidden" }}>
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
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", lineHeight: "1.75" }}>
              Metodología comunicativa con IA integrada. Enfoque en las 4 destrezas: expresión oral y escrita, comprensión lectora y auditiva.
            </p>
          </div>

          {/* Modalidades */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "3rem" }}>
            {CLASES.map((c, i) => (
              <div key={i} style={{
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
                <div style={{ fontSize: "32px", marginBottom: "1rem" }}>{c.emoji}</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", marginBottom: "6px" }}>{c.tipo}</p>
                <p style={{ fontSize: "12px", color: c.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>{c.duracion}</p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: "1.7", marginBottom: "1.5rem" }}>{c.descripcion}</p>
                <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                  {c.features.map((f, j) => (
                    <li key={j} style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", padding: "6px 0", borderBottom: "0.5px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
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
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2rem" }}>Cómo empezamos</p>
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
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA sesión prueba */}
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>Sin compromiso · 20 minutos · 100% online</p>
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

      {/* ═══════════════════════════════════════════════════════════════════════
          SECCIÓN 5 — CONTACTO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contacto" style={{ padding: "5rem 1.5rem 6rem", background: S.bg, position: "relative", overflow: "hidden" }}>
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
              {/* Foto placeholder elegante */}
              <div style={{
                width: "140px", height: "140px",
                background: `linear-gradient(135deg, ${S.fuxia}22, ${S.morado}22)`,
                border: `1px solid ${S.morado}44`,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "40px",
                marginBottom: "1.5rem",
              }}>🧑‍🏫</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", marginBottom: "4px" }}>Juanjo</p>
              <p style={{ fontSize: "13px", color: S.morado, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem" }}>Pedagogo · ELE · Tenerife</p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.75", maxWidth: "320px", marginBottom: "2rem" }}>
                Más de 10 años enseñando español. Experto en metodología comunicativa e integración de IA en contextos educativos.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { icon: "✉️", label: "email@silabos.es", href: "mailto:email@silabos.es" },
                  { icon: "🔗", label: "LinkedIn", href: "#" },
                ].map((c, i) => (
                  <a key={i} href={c.href} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    fontSize: "14px", color: "rgba(255,255,255,0.5)",
                    textDecoration: "none", padding: "8px 0",
                    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                  >
                    <span>{c.icon}</span> {c.label}
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
                  <div style={{ fontSize: "40px", marginBottom: "1rem" }}>✅</div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#fff", marginBottom: "0.75rem" }}>¡Mensaje enviado!</p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Te respondo en menos de 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleForm} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { key: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
                    { key: "email", label: "Email", type: "email", placeholder: "tu@email.com" },
                    { key: "asunto", label: "Asunto", type: "text", placeholder: "¿En qué puedo ayudarte?" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>{f.label}</label>
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
                    <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>Mensaje</label>
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
                  <button type="submit" className="btn-primary" style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500,
                    letterSpacing: "0.07em", textTransform: "uppercase", color: "#fff",
                    background: `linear-gradient(135deg, ${S.fuxia}, ${S.morado})`,
                    padding: "13px", borderRadius: "2px", border: "none", cursor: "pointer",
                  }}>Enviar mensaje</button>
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
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginLeft: "8px" }}>Pedagogía · IA · ELE</span>
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "11px", color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{l.label}</button>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} SILABOS</p>
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
  );
}
