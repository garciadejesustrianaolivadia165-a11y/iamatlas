import { Link } from "react-router";
import { useState, useEffect } from "react";

const navItems = [
  {
    label: "Inicio", href: "/",
    dropdown: [
      { label: "Overview",  href: "/dashboard" },
      { label: "Profile",   href: "/profile" },
      { label: "Calendar",  href: "/calendar" },
      { label: "Settings",  href: "/settings" },
    ],
  },
  {
    label: "Acerca de", href: "/about",
    dropdown: [
      { label: "Quiénes somos",   href: "/about/quienes-somos" },
      { label: "Directorio",      href: "/about/directorio" },
      { label: "Actualizaciones", href: "/about/actualizaciones" },
    ],
  },
  {
    label: "Términos y condiciones", href: "/legal",
    dropdown: [
      { label: "Política de Privacidad", href: "/legal" },
      { label: "Políticas de Seguridad", href: "/legal" },
    ],
  },
  {
    label: "Establecimientos", href: "/establecimientos",
    dropdown: [
      { label: "Business Hub", href: "/business-hub" },
      { label: "Tendencias",   href: "/establecimientos/tendencias" },
    ],
  },
];

const locRow1 = [
  { club: "Santo Domingo Country Club", items: ["Campo Senior", "Los Robles"],               extra: "La Estancia Golf & Country Club" },
  { club: "Casa de Campo",              items: ["Youth of the Dog", "Dúo Fore", "The Links"], extra: "La Estancia Golf & Country Club" },
  { club: "Santo Domingo Country Club", items: ["Campo Senior", "Los Nobles"],               extra: "La Estancia Golf & Country Club" },
  { club: "Casa de Campo",              items: ["Youth of the Dog", "Dúo Fore", "The Links"], extra: "La Estancia Golf & Country Club" },
];
const locRow2 = [
  { club: "Santo Domingo Country Club", items: ["Campo Senior", "Campus Senior", "Los Nobles"], extras: ["La Estancia Golf & Country Club", "Cayena Golf Club"] },
  { club: "Casa de Campo",              items: ["Youth of the Dog", "Dúo Fore", "The Links"],   extras: ["La Estancia Golf & Country Club"] },
  { club: "Santo Domingo Country Club", items: ["Campo Senior", "Campus Senior", "Los Nobles"], extras: ["La Estancia Golf & Country Club"] },
  { club: "Casa de Campo",              items: ["Youth of the Dog", "Dúo Fore", "The Links"],   extras: ["La Estancia Golf & Country Club"] },
];
const mapPlaces = [
  { name: "Santo Domingo Country Club",      items: ["Campo Senior", "Los Nobles"] },
  { name: "Santo Domingo Country Club",      items: ["Campus Senior", "Los Nobles"] },
  { name: "Santo Domingo Country Club",      items: ["Campus Senior", "Los Nobles"] },
  { name: "La Estancia Golf & Country Club", items: ["Campus Senior"] },
  { name: "Casa de Campo",                   items: ["Youth of the Dog", "Dúo Fore", "The Links"] },
  { name: "La Estancia Golf & Country Club", items: [] },
  { name: "Cayena Golf Club",                items: [] },
  { name: "Cayena Golf Club",                items: [] },
];

/* ─── Timeline data ─────────────────────────────────────────── */
const TL_NR = 80;
const TL_SR = 80;

const tlNodes = [
  { id: 1,  x: 165,  y: 150, sport: "TENNIS",
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=300&fit=crop",
    time: "09:00", tee: "TEE TIME 1C1",
    subs: [
      { label: "1 A", x: 165,  y: 400, sport: "PADEL",   infoDir: "right" as const,
        img: "https://images.unsplash.com/photo-1574259392081-cbdc5ab4e20f?w=200&h=200&fit=crop",
        time: "08:45", tee: "TEE TIME 1A" },
    ] },
  { id: 2,  x: 510,  y: 490, sport: "GOLF",
    img: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=300&h=300&fit=crop",
    time: "09:30", tee: "TEE TIME 1C2",
    subs: [
      { label: "2 A", x: 430,  y: 250, sport: "TENNIS", infoDir: "right" as const,
        img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=200&h=200&fit=crop",
        time: "09:15", tee: "TEE TIME 2A" },
      { label: "2 B", x: 510,  y: 760, sport: "PADEL",  infoDir: "right" as const,
        img: "https://images.unsplash.com/photo-1574259392081-cbdc5ab4e20f?w=200&h=200&fit=crop",
        time: "09:45", tee: "TEE TIME 2B" },
    ] },
  { id: 3,  x: 850,  y: 175, sport: "RUNNING",
    img: "https://images.unsplash.com/photo-1592919505780-303950717480?w=300&h=300&fit=crop",
    time: "10:00", tee: "TEE TIME 1C3",
    subs: [
      { label: "3 A", x: 850,  y: 770, sport: "RUNNING", infoDir: "right" as const,
        img: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=200&h=200&fit=crop",
        time: "10:15", tee: "TEE TIME 3A" },
    ] },
  { id: 4,  x: 1150, y: 510, sport: "SWIM",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=300&fit=crop",
    time: "11:00", tee: "TEE TIME 1C4",
    subs: [
      { label: "4 A", x: 980,  y: 720, sport: "SWIM",    infoDir: "right" as const,
        img: "https://images.unsplash.com/photo-1529170100279-694b29875e2e?w=200&h=200&fit=crop",
        time: "11:15", tee: "TEE TIME 4A" },
    ] },
  { id: 5,  x: 1440, y: 165, sport: "RUNNING",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=300&h=300&fit=crop",
    time: "12:00", tee: "TEE TIME 1C5",
    subs: [
      { label: "5 A", x: 1300, y: 755, sport: "RUNNING", infoDir: "right" as const,
        img: "https://images.unsplash.com/photo-1530282830661-cd9ce41aa9f0?w=200&h=200&fit=crop",
        time: "12:15", tee: "TEE TIME 5A" },
    ] },
  { id: 6,  x: 1730, y: 480, sport: "GOLF",
    img: "https://images.unsplash.com/photo-1591491019616-f77c1e17b8e4?w=300&h=300&fit=crop",
    time: "13:00", tee: "TEE TIME 1C6",
    subs: [
      { label: "6 A", x: 1580, y: 680, sport: "GOLF",    infoDir: "left" as const,
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        time: "13:15", tee: "TEE TIME 6A" },
    ] },
];

/* Sub-connector: ortogonal punteado con flecha */
function TLConnector({ nx, ny, sx, sy, active }: {
  nx: number; ny: number; sx: number; sy: number; idx: number; active: boolean;
}) {
  const GREEN = "#4DBD1E";
  const r = 12;
  const subBelow = sy > ny;
  const subRight = sx >= nx;
  const dx = subRight ? 1 : -1;
  const dy = subBelow ? 1 : -1;

  /* Exit top/bottom edge of main circle; enter opposite edge of sub circle */
  const startX = nx, startY = ny + dy * TL_NR;
  const endX = sx, endY = sy - dy * TL_SR;

  const nearlyVertical = Math.abs(sx - nx) < 25;

  let d: string;
  if (nearlyVertical) {
    d = `M ${startX},${startY} V ${endY}`;
  } else {
    const midY = startY + (endY - startY) * 0.5;
    d = [
      `M ${startX},${startY}`,
      `V ${midY - r * dy}`,
      `Q ${startX},${midY} ${startX + r * dx},${midY}`,
      `H ${endX - r * dx}`,
      `Q ${endX},${midY} ${endX},${midY + r * dy}`,
      `V ${endY}`,
    ].join(" ");
  }

  /* Arrow pointing into the sub node */
  const aW = 7, aL = 12;
  const arrowPts = subBelow
    ? `${endX},${endY + 2} ${endX - aW},${endY - aL} ${endX + aW},${endY - aL}`
    : `${endX},${endY - 2} ${endX - aW},${endY + aL} ${endX + aW},${endY + aL}`;

  return (
    <g style={{ opacity: active ? 1 : 0, transition: "opacity 0.45s cubic-bezier(0.34,1.3,0.64,1) 0.1s" }}>
      <path d={d} fill="none" stroke={GREEN} strokeWidth="2"
        strokeDasharray="8 5" strokeLinecap="round" />
      <circle cx={startX} cy={startY} r={5} fill={GREEN} />
      <polygon points={arrowPts} fill={GREEN} />
    </g>
  );
}

/* Nodo-a-nodo: ortogonal con tramos sólido + punteado y chevrons dobles */
function TLNodeConnector({ ax, ay, bx, by, idx }: {
  ax: number; ay: number; bx: number; by: number; idx: number;
}) {
  const GREEN = "#5DC030";
  const r = 14;
  const midX = ax + (bx - ax) * (0.42 + (idx % 3) * 0.05);
  const dx = bx >= ax ? 1 : -1;
  const dy = by >= ay ? 1 : -1;
  const flat = Math.abs(by - ay) < 20;

  /* Segment 1: horizontal ax→midX (includes first rounded corner) */
  const seg1 = flat
    ? `M ${ax},${ay} H ${(ax + bx) / 2}`
    : `M ${ax},${ay} H ${midX - r * dx} Q ${midX},${ay} ${midX},${ay + r * dy}`;

  /* Segment 2: vertical midX portion + second corner + horizontal to bx */
  const seg2 = flat
    ? `M ${(ax + bx) / 2},${ay} H ${bx}`
    : `M ${midX},${ay + r * dy} V ${by - r * dy} Q ${midX},${by} ${midX + r * dx},${by} H ${bx}`;

  /* Alternate solid/dashed per connector index */
  const [solidSeg, dashSeg] = idx % 2 === 0 ? [seg1, seg2] : [seg2, seg1];

  /* Chevron positions */
  const ch1x = ax + (midX - ax) * 0.55;
  const ch1y = ay;
  const ch2x = midX;
  const ch2y = ay + (by - ay) * 0.52;

  /* Arrow at destination (pointing right/left) */
  const aW = 7, aL = 14;
  const arrowPts = `${bx + dx * 2},${by} ${bx - dx * aL},${by - aW} ${bx - dx * aL},${by + aW}`;

  return (
    <g>
      <path d={solidSeg} fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" />
      <path d={dashSeg}  fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 6" />
      {/* dot at origin */}
      <circle cx={ax} cy={ay} r={5} fill={GREEN} />
      {/* double chevron on horizontal portion (pointing right) */}
      <polyline points={`${ch1x-10},${ch1y-6} ${ch1x-1},${ch1y} ${ch1x-10},${ch1y+6}`} fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`${ch1x-2},${ch1y-6} ${ch1x+7},${ch1y} ${ch1x-2},${ch1y+6}`}  fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* double chevron on vertical portion */}
      {!flat && dy > 0 && <>
        <polyline points={`${ch2x-6},${ch2y-10} ${ch2x},${ch2y-1} ${ch2x+6},${ch2y-10}`} fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`${ch2x-6},${ch2y-2} ${ch2x},${ch2y+7} ${ch2x+6},${ch2y-2}`}  fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>}
      {!flat && dy < 0 && <>
        <polyline points={`${ch2x-6},${ch2y+10} ${ch2x},${ch2y+1} ${ch2x+6},${ch2y+10}`} fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`${ch2x-6},${ch2y+2} ${ch2x},${ch2y-7} ${ch2x+6},${ch2y+2}`}  fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>}
      {/* arrow head at destination */}
      <polygon points={arrowPts} fill={GREEN} />
    </g>
  );
}

/* Info label: SPORT / dot+time / tee */
function TLInfo({ sport, time, tee, dir, style }: {
  sport: string; time: string; tee: string; dir: "right" | "left";
  style?: React.CSSProperties;
}) {
  return (
    <div className={`lp-tl-info lp-tl-info--${dir}`} style={style}>
      <span className="lp-tl-info-sport">{sport}</span>
      <div className="lp-tl-info-row">
        <span className="lp-tl-info-dot" />
        <span className="lp-tl-info-time">{time}</span>
      </div>
      <span className="lp-tl-info-tee">{tee}</span>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [expandedNode, setExpandedNode] = useState<number | null>(null);
  const [tlScale, setTlScale] = useState(1);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const update = () => setTlScale(Math.min(1, window.innerWidth / 1860));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .lp { font-family: 'Space Grotesk', system-ui, sans-serif; color: #1a1a1a; overflow-x: hidden; background: white; transition: background 0.35s ease, color 0.35s ease; }
        .lp *, .lp *::before, .lp *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* DARK MODE BASE */
        .lp.dark { background: #0d0d0d; color: white; }

        /* NAV */
        .lp-nav {
          position: fixed; top: 0; left: 0; right: 0; width: 100%;
          z-index: 200;
          background: rgba(255, 255, 255, 0.90);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.35);
          height: 72px;
          padding: 0 clamp(24px, 4vw, 56px);
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.35s ease, border-color 0.35s ease;
        }
        .lp.dark .lp-nav { background: rgba(13,13,13,0.94); border-bottom-color: rgba(255,255,255,0.10); }
        .lp-nav-links { display: flex; align-items: center; gap: clamp(20px, 3vw, 44px); }
        .lp-nav-item { position: relative; display: flex; align-items: center; }
        .lp-nav-item::after { content: ""; position: absolute; top: 100%; left: -20px; right: -20px; height: 26px; }
        .lp-nav-link { font-size: clamp(12px, 1vw, 14px); font-weight: 500; color: #1a1a1a; text-decoration: none; white-space: nowrap; transition: color .15s; }
        .lp.dark .lp-nav-link { color: #e0e0e0; }
        .lp-nav-item:hover .lp-nav-link { color: #DA007C; }
        .lp-dropdown {
          display: none; position: absolute; top: calc(100% + 18px); left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.18); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.40); border-radius: 14px; padding: 8px; min-width: 210px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.10); z-index: 300;
          transition: background 0.35s ease;
        }
        .lp.dark .lp-dropdown { background: rgba(18,18,18,0.95); border-color: rgba(255,255,255,0.12); }
        .lp-dropdown::before {
          content: ""; position: absolute; top: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px;
          background: rgba(255,255,255,0.22);
          border-left: 1px solid rgba(255,255,255,0.40); border-top: 1px solid rgba(255,255,255,0.40);
        }
        .lp-nav-item:hover .lp-dropdown { display: block; }
        .lp-dropdown-item {
          display: block; padding: 10px 18px; border-radius: 9px;
          font-size: 13px; font-weight: 500; color: #1a1a1a;
          text-decoration: none; font-family: inherit; transition: background .15s, color .15s; white-space: nowrap;
        }
        .lp.dark .lp-dropdown-item { color: #e0e0e0; }
        .lp-dropdown-item:hover { background: rgba(218,0,124,0.10); color: #DA007C; }
        .lp-nav-cta {
          padding: 13px clamp(44px, 5vw, 72px); border-radius: 100px; background: #DA007C; color: white;
          border: 2px solid #DA007C; font-size: clamp(13px, 1.1vw, 15px); font-weight: 600;
          text-decoration: none; font-family: inherit; transition: background 0.2s ease, color 0.2s ease;
          white-space: nowrap; min-width: 150px; text-align: center;
        }
        .lp-nav-cta:hover { background: rgba(218, 0, 124, 0.12); color: #DA007C; }

        /* DARK TOGGLE */
        .lp-dark-toggle {
          width: 52px; height: 28px; border-radius: 100px;
          border: 2px solid #ddd; background: #f0f0f0;
          cursor: pointer; position: relative; padding: 0; outline: none;
          transition: background 0.3s ease, border-color 0.3s ease;
          flex-shrink: 0;
        }
        .lp.dark .lp-dark-toggle { background: #111; border-color: #555; }
        .lp-dark-toggle-knob {
          position: absolute; top: 2px; width: 20px; height: 20px; border-radius: 50%;
          background: white; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.22);
          transition: left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease;
          color: #666;
        }
        .lp.dark .lp-dark-toggle-knob { background: #2a2a2a; color: #bbb; }

        /* HERO */
        .lp-hero { position: relative; min-height: calc(100vh - 72px); background: white; display: flex; align-items: center; padding: clamp(40px, 5vw, 80px) 0 clamp(40px, 5vw, 80px) clamp(20px, 3vw, 48px); transition: background 0.35s ease; }
        .lp.dark .lp-hero { background: #0d0d0d; }
        .lp-hero-wave { position: absolute; top: 0; left: 0; width: 100%; height: auto; pointer-events: none; z-index: 0; }
        .lp-hero-content { position: relative; z-index: 1; max-width: clamp(600px, 76vw, 1100px); display: flex; flex-direction: column; gap: clamp(12px, 1.5vw, 20px); }
        .lp-hero-title { display: block; width: clamp(600px, 100vw, 1400px); max-width: 100%; }
        .lp-hero-sub { padding-left: clamp(8px, 1.4vw, 18px); font-size: clamp(16px, 1.8vw, 26px); font-weight: 600; color: #1a1a1a; line-height: 1.35; transition: color 0.35s ease; }
        .lp.dark .lp-hero-sub { color: white; }
        .lp-hero-body { padding-left: clamp(8px, 1.4vw, 18px); font-size: clamp(13px, 1.1vw, 16px); color: #555; line-height: 1.7; max-width: clamp(280px, 28vw, 420px); transition: color 0.35s ease; }
        .lp.dark .lp-hero-body { color: #999; }
        .lp-hero-btns { padding-left: clamp(8px, 1.4vw, 18px); display: flex; gap: 12px; flex-wrap: wrap; }
        .lp-btn-outline-pink { padding: clamp(10px, 1vw, 14px) clamp(20px, 2vw, 32px); border-radius: 100px; border: 2px solid #DA007C; color: #DA007C; font-size: clamp(13px, 1vw, 15px); font-weight: 600; text-decoration: none; font-family: inherit; transition: background 0.2s ease; }
        .lp-btn-outline-pink:hover { background: rgba(218, 0, 124, 0.12); color: #DA007C; }
        .lp-btn-outline-dark { padding: clamp(10px, 1vw, 14px) clamp(20px, 2vw, 32px); border-radius: 100px; border: 2px solid #1a1a1a; color: #1a1a1a; font-size: clamp(13px, 1vw, 15px); font-weight: 600; text-decoration: none; font-family: inherit; transition: background 0.2s ease, border-color 0.35s ease, color 0.35s ease; }
        .lp-btn-outline-dark:hover { background: rgba(26, 26, 26, 0.28); color: #1a1a1a; }
        .lp.dark .lp-btn-outline-dark { border-color: rgba(255,255,255,0.55); color: white; }
        .lp.dark .lp-btn-outline-dark:hover { background: rgba(255,255,255,0.10); color: white; }

        /* CÓMO FUNCIONA */
        .lp-how { position: relative; background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 140px); padding: clamp(48px, 6vw, 96px) clamp(32px, 6vw, 96px); transition: background 0.35s ease; }
        .lp.dark .lp-how { background: linear-gradient(to bottom, rgba(13,13,13,0) 0%, #0d0d0d 140px); }
        .lp-how-wave-h { position: absolute; top: 0; left: 0; width: 100%; height: auto; pointer-events: none; z-index: 0; }
        .lp-how-wave-v { position: absolute; top: 0; right: 0; height: 100%; width: auto; pointer-events: none; z-index: 0; }
        .lp-how-inner  { position: relative; z-index: 1; }
        .lp-how-title  { display: block; width: clamp(340px, 50vw, 800px); max-width: 100%; margin-bottom: clamp(12px, 1.5vw, 20px); }
        .lp-how-desc   { font-size: clamp(13px, 1.1vw, 16px); color: #555; line-height: 1.7; max-width: clamp(400px, 60vw, 820px); margin-bottom: clamp(32px, 4vw, 56px); transition: color 0.35s ease; }
        .lp.dark .lp-how-desc { color: #999; }
        .lp-how-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 72px); align-items: flex-start; }
        .lp-how-photo  { border-radius: clamp(12px, 1.5vw, 20px); width: 100%; aspect-ratio: 3/2; object-fit: cover; display: block; }
        .lp-how-btn    { display: inline-flex; align-items: center; gap: 8px; margin-top: clamp(12px, 1.5vw, 20px); padding: 11px 24px; border-radius: 100px; border: 2px solid #1a1a1a; color: #1a1a1a; font-size: clamp(12px, 1vw, 14px); font-weight: 600; text-decoration: none; font-family: inherit; transition: background 0.2s ease, border-color 0.35s ease, color 0.35s ease; }
        .lp-how-btn:hover { background: rgba(26, 26, 26, 0.28); color: #1a1a1a; }
        .lp.dark .lp-how-btn { border-color: rgba(255,255,255,0.55); color: white; }
        .lp.dark .lp-how-btn:hover { background: rgba(255,255,255,0.10); color: white; }
        .lp-how-right  { display: flex; flex-direction: column; align-items: flex-start; gap: clamp(14px, 1.8vw, 24px); padding-top: clamp(320px, 52vw, 760px); padding-left: clamp(24px, 4vw, 64px); }
        .lp-how-circle-wrap { position: relative; width: clamp(200px, 24vw, 340px); height: clamp(200px, 24vw, 340px); border-radius: 50%; overflow: hidden; box-shadow: 0 8px 36px rgba(0,0,0,0.15); flex-shrink: 0; }
        .lp-how-circle-wrap img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.4s ease, transform 0.4s ease; }
        .lp-how-circle-img1 { opacity: 1; transform: scale(1); }
        .lp-how-circle-img2 { opacity: 0; transform: scale(1.06); }
        .lp-how-circle-wrap:hover .lp-how-circle-img1 { opacity: 0; transform: scale(1.06); }
        .lp-how-circle-wrap:hover .lp-how-circle-img2 { opacity: 1; transform: scale(1.06); }
        .lp-how-text3      { display: block; width: clamp(240px, 35vw, 500px); max-width: 100%; }
        .lp-how-right-desc { font-size: clamp(13px, 1.1vw, 15px); color: #555; line-height: 1.7; transition: color 0.35s ease; }
        .lp.dark .lp-how-right-desc { color: #999; }

        /* LOCALIDADES */
        .lp-loc { background: white; padding: clamp(40px, 5vw, 72px) clamp(32px, 6vw, 96px) clamp(48px, 6vw, 96px); transition: background 0.35s ease; }
        .lp.dark .lp-loc { background: #0d0d0d; }
        .lp-loc-title { display: block; width: clamp(280px, 50vw, 720px); max-width: 100%; }
        .lp-loc-grid  { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(16px, 2vw, 28px); margin-top: clamp(20px, 2.5vw, 36px); }
        .lp-loc-row2  { margin-top: 12px; }
        .lp-loc-head  { font-size: clamp(11px, 1vw, 14px); font-weight: 700; color: #1a1a1a; margin-bottom: 8px; transition: color 0.35s ease; }
        .lp.dark .lp-loc-head { color: white; }
        .lp-loc-items { list-style: none; }
        .lp-loc-items li { font-size: clamp(11px, 0.9vw, 13px); color: #555; padding: 2px 0; display: flex; align-items: flex-start; gap: 6px; transition: color 0.35s ease; }
        .lp.dark .lp-loc-items li { color: #999; }
        .lp-loc-items li::before { content: "•"; color: #C8E535; font-size: 18px; line-height: 1; flex-shrink: 0; margin-top: -2px; }
        .lp-loc-extra { font-size: clamp(10px, 0.85vw, 12px); color: #aaa; margin-top: 6px; padding-left: 14px; transition: color 0.35s ease; }
        .lp.dark .lp-loc-extra { color: #666; }

        /* TIMELINE */
        .lp-tl { background: white; padding: clamp(20px, 2.5vw, 40px) 0; transition: background 0.35s ease; }
        .lp.dark .lp-tl { background: #0d0d0d; }
        .lp-tl-wrap { position: relative; width: 1860px; height: 1000px; }
        .lp-tl-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; pointer-events: none; opacity: 0.18; }
        .lp-tl-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
        .lp-tl-node { position: absolute; transform: translate(-50%, -50%); z-index: 5; }
        .lp-tl-node.has-subs { cursor: pointer; }
        .lp-tl-circle {
          width: 160px; height: 160px; border-radius: 50%;
          border: 3px solid #6BBE30;
          box-shadow: 0 0 0 5px rgba(107,190,48,0.18), 0 0 0 8px rgba(107,190,48,0.08);
          overflow: hidden; position: relative;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          background: #c8e8a0;
        }
        .has-subs .lp-tl-circle:hover {
          border-color: #C8E535;
          box-shadow: 0 0 0 6px rgba(200,229,53,0.32), 0 0 0 12px rgba(200,229,53,0.12);
          transform: scale(1.06);
        }
        .lp-tl-circle.open {
          border-color: #C8E535;
          box-shadow: 0 0 0 6px rgba(200,229,53,0.32), 0 0 0 12px rgba(200,229,53,0.12);
        }
        .lp-tl-circle img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lp-tl-sub { position: absolute; z-index: 8; transform: translate(-50%, -50%) scale(0.5); opacity: 0; pointer-events: none; transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .lp-tl-sub.visible { transform: translate(-50%, -50%) scale(1); opacity: 1; pointer-events: auto; }
        .lp-tl-sub-circle {
          width: 160px; height: 160px; border-radius: 50%;
          border: 3px solid #C8E535;
          box-shadow: 0 0 0 5px rgba(200,229,53,0.22), 0 0 0 8px rgba(200,229,53,0.08);
          overflow: hidden; position: relative; background: #c8e8a0;
        }
        .lp-tl-sub-circle img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lp-tl-info { position: absolute; display: flex; flex-direction: column; gap: 2px; z-index: 10; }
        .lp-tl-info--right { text-align: left; }
        .lp-tl-info--left  { text-align: right; }
        .lp-tl-info-sport  { font-size: 11px; font-weight: 700; color: #5DC030; text-transform: uppercase; letter-spacing: 1.5px; }
        .lp-tl-info-row    { display: flex; align-items: center; gap: 5px; }
        .lp-tl-info--left .lp-tl-info-row { flex-direction: row-reverse; }
        .lp-tl-info-dot    { width: 8px; height: 8px; border-radius: 50%; background: #5DC030; flex-shrink: 0; }
        .lp-tl-info-time   { font-size: 22px; font-weight: 800; color: #1a1a1a; line-height: 1.1; transition: color 0.35s ease; }
        .lp.dark .lp-tl-info-time { color: white; }
        .lp-tl-info-tee    { font-size: 10px; color: #999; letter-spacing: 0.5px; }
        .lp-tl-axis { position: absolute; left: 80px; right: 80px; top: 870px; height: 2px; background: none; border-top: 1.5px dashed rgba(93,192,48,0.30); }
        .lp.dark .lp-tl-axis { border-top-color: rgba(93,192,48,0.40); }
        .lp-tl-axis-dot  { position: absolute; width: 14px; height: 14px; background: #5DC030; border-radius: 50%; top: -6px; transform: translateX(-50%); box-shadow: 0 0 0 3px rgba(93,192,48,0.18); }
        .lp-tl-axis-time { position: absolute; font-size: 13px; font-weight: 600; color: #888; top: 18px; transform: translateX(-50%); font-family: 'Space Grotesk', sans-serif; }
        .lp.dark .lp-tl-axis-time { color: #666; }
        .lp-tl-today { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .lp-tl-today-dot   { width: 5px; height: 5px; background: #1a1a1a; border-radius: 50%; }
        .lp-tl-today-label { font-size: 15px; font-weight: 800; color: #5DC030; }
        .lp-tl-today-date  { font-size: 14px; color: #888; }

        /* MAPA */
        .lp-map { position: relative; overflow: hidden; background: white; padding: clamp(48px, 6vw, 96px) clamp(32px, 6vw, 96px); transition: background 0.35s ease; }
        .lp.dark .lp-map { background: #0d0d0d; }
        .lp-map-wave-v { position: absolute; top: 0; right: 0; height: 100%; width: auto; pointer-events: none; z-index: 0; }
        .lp-map-wave-h { position: absolute; bottom: 0; left: 0; width: 100%; height: auto; pointer-events: none; z-index: 0; }
        .lp-map-inner  { position: relative; z-index: 1; }
        .lp-map-title  { display: block; width: 100%; max-width: 1200px; max-height: clamp(110px, 13vw, 190px); object-fit: contain; object-position: left top; margin: 0 0 clamp(12px, 1.5vw, 20px); }
        .lp-map-grid   { display: grid; grid-template-columns: clamp(200px, 20vw, 280px) 1fr; gap: clamp(20px, 2.5vw, 36px); }
        .lp-map-list   { display: flex; flex-direction: column; gap: 14px; overflow-y: auto; max-height: 440px; padding-right: 8px; }
        .lp-map-place h4 { font-size: clamp(11px, 1vw, 13px); font-weight: 700; color: #1a1a1a; margin-bottom: 3px; transition: color 0.35s ease; }
        .lp.dark .lp-map-place h4 { color: white; }
        .lp-map-place ul { list-style: none; }
        .lp-map-place ul li { font-size: clamp(10px, 0.85vw, 12px); color: #666; display: flex; align-items: center; gap: 4px; transition: color 0.35s ease; }
        .lp.dark .lp-map-place ul li { color: #999; }
        .lp-map-place ul li::before { content: "•"; color: #C8E535; }
        .lp-map-frame  { width: 100%; height: clamp(300px, 35vw, 480px); border-radius: clamp(12px, 1.5vw, 20px); border: none; display: block; }

        /* NEWSLETTER */
        .lp-news { background: white; padding: clamp(40px, 5vw, 72px) clamp(32px, 6vw, 96px); display: flex; justify-content: center; transition: background 0.35s ease; }
        .lp.dark .lp-news { background: #0d0d0d; }
        .lp-news-card { background: #111; border-radius: clamp(16px, 2vw, 24px); padding: clamp(28px, 3.5vw, 52px) clamp(32px, 5vw, 72px); width: 100%; max-width: clamp(560px, 72vw, 940px); display: flex; justify-content: space-between; align-items: center; gap: clamp(24px, 4vw, 56px); transition: background 0.35s ease; }
        .lp.dark .lp-news-card { background: white; }
        .lp-news h2 { font-size: clamp(24px, 2.5vw, 36px); font-weight: 800; color: white; margin-bottom: 8px; }
        .lp.dark .lp-news h2 { color: #1a1a1a; }
        .lp-news p  { font-size: clamp(12px, 1vw, 14px); color: #666; line-height: 1.6; max-width: 340px; }
        .lp.dark .lp-news p { color: #555; }
        .lp-news-form { display: flex; align-items: center; flex-shrink: 0; background: white; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.15); padding: 6px 6px 6px 24px; min-width: clamp(300px, 34vw, 460px); box-shadow: 0 2px 16px rgba(0,0,0,0.18); }
        .lp.dark .lp-news-form { background: #111; border-color: rgba(255,255,255,0.12); }
        .lp-news-input { flex: 1; min-width: 0; background: transparent; border: none; outline: none; font-size: clamp(13px, 1vw, 15px); color: #1a1a1a; font-family: inherit; }
        .lp.dark .lp-news-input { color: white; }
        .lp-news-input::placeholder { color: #aaa; }
        .lp.dark .lp-news-input::placeholder { color: #666; }
        .lp-news-btn { padding: 12px 28px; background: #DA007C; border: 2px solid #DA007C; border-radius: 100px; color: white; font-size: clamp(13px, 1vw, 15px); font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.2s ease, color 0.2s ease; white-space: nowrap; flex-shrink: 0; }
        .lp-news-btn:hover { background: rgba(218, 0, 124, 0.12); color: #DA007C; }

        /* CTA */
        .lp-cta { position: relative; overflow: hidden; background: white; padding: clamp(64px, 8vw, 120px) clamp(32px, 6vw, 96px); text-align: center; transition: background 0.35s ease; }
        .lp.dark .lp-cta { background: #0d0d0d; }
        .lp-cta-title { display: block; width: clamp(320px, 55vw, 840px); max-width: 100%; margin: 0 auto clamp(16px, 2vw, 24px); }
        .lp-cta p     { font-size: clamp(13px, 1.2vw, 16px); color: #888; max-width: clamp(320px, 42vw, 600px); margin: 0 auto clamp(28px, 3.5vw, 48px); line-height: 1.7; }
        .lp.dark .lp-cta p { color: #666; }
        .lp-cta-btn   { display: inline-block; padding: clamp(13px, 1.2vw, 18px) clamp(36px, 4vw, 64px); border-radius: 100px; background: #DA007C; color: white; border: 2px solid #DA007C; font-size: clamp(14px, 1.2vw, 16px); font-weight: 700; text-decoration: none; font-family: inherit; transition: background 0.2s ease, color 0.2s ease; }
        .lp-cta-btn:hover { background: rgba(218, 0, 124, 0.12); color: #DA007C; }

        /* FOOTER */
        .lp-footer { background: white; border-top: none; padding: clamp(40px, 5vw, 72px) clamp(32px, 6vw, 96px) clamp(24px, 3vw, 48px); transition: background 0.35s ease; }
        .lp.dark .lp-footer { background: #0d0d0d; }
        .lp-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.2fr; gap: clamp(24px, 4vw, 56px); margin-bottom: clamp(32px, 4vw, 56px); }
        .lp-footer-brand-name { font-size: clamp(15px, 1.4vw, 20px); font-weight: 800; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .lp-footer-brand p    { font-size: clamp(12px, 1vw, 14px); color: #555; line-height: 1.7; max-width: 220px; transition: color 0.35s ease; }
        .lp.dark .lp-footer-brand p { color: #999; }
        .lp-footer-col h4     { font-size: clamp(12px, 1vw, 14px); font-weight: 700; color: #1a1a1a; margin-bottom: 16px; transition: color 0.35s ease; }
        .lp.dark .lp-footer-col h4 { color: white; }
        .lp-footer-col ul     { list-style: none; }
        .lp-footer-col ul li  { margin-bottom: 10px; }
        .lp-footer-col ul li a { font-size: clamp(12px, 1vw, 14px); color: #555; text-decoration: none; transition: color 0.35s ease; }
        .lp.dark .lp-footer-col ul li a { color: #999; }
        .lp-footer-col ul li a:hover { color: #DA007C; }
        .lp-footer-bottom { position: relative; display: flex; justify-content: space-between; align-items: center; padding-top: 36px; border-top: 2px solid #1a1a1a; transition: border-color 0.35s ease; }
        .lp.dark .lp-footer-bottom { border-top-color: rgba(255,255,255,0.10); }
        .lp-footer-copy { font-size: 12px; color: #555; transition: color 0.35s ease; }
        .lp.dark .lp-footer-copy { color: #999; }
        .lp-footer-socials { display: flex; gap: 10px; position: absolute; right: 0; top: -18px; background: white; padding-left: 10px; transition: background 0.35s ease; }
        .lp.dark .lp-footer-socials { background: #0d0d0d; }
        .lp-footer-social { width: 36px; height: 36px; border-radius: 50%; background: #1a1a1a; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: background .2s; }
        .lp.dark .lp-footer-social { background: #222; }
        .lp-footer-social:hover { background: #444; }
        .lp-footer-social svg { width: 15px; height: 15px; fill: white; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .lp-nav { padding: 0 20px; height: 60px; }
          .lp-nav-links { display: none; }
          .lp-hero { padding: 48px 0 48px 24px; min-height: 80vh; }
          .lp-hero-title { width: 90vw; }
          .lp-how { padding: 48px 24px; }
          .lp-how-grid { grid-template-columns: 1fr; gap: 40px; }
          .lp-loc { padding: 40px 24px 60px; }
          .lp-loc-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
          .lp-map { padding: 48px 24px; }
          .lp-map-grid { grid-template-columns: 1fr; }
          .lp-news { padding: 32px 20px; }
          .lp-news-card { flex-direction: column; align-items: stretch; padding: 28px 24px; }
          .lp-news-form { min-width: 0; width: 100%; }
          .lp-news-btn { padding: 11px 22px; }
          .lp-footer { padding: 48px 24px 32px; }
          .lp-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
      `}</style>

      <div className={`lp${dark ? " dark" : ""}`}>

        {/* NAVBAR */}
        <nav className="lp-nav">
          <Link to="/"><img src={dark ? "/Atlas_blanco.svg" : "/atlas.svg"} alt="Atlas" style={{ height: "72px", display: "block" }} /></Link>
          <div className="lp-nav-links">
            {navItems.map((item) => (
              <div key={item.label} className="lp-nav-item">
                <Link to={item.href} className="lp-nav-link">{item.label}</Link>
                <div className="lp-dropdown">
                  {item.dropdown.map((sub) => (
                    <Link key={sub.href} to={sub.href} className="lp-dropdown-item">{sub.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              onClick={() => setDark(d => !d)}
              className="lp-dark-toggle"
              aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              <span
                className="lp-dark-toggle-knob"
                style={{ left: dark ? "calc(100% - 22px)" : "2px" }}
              >
                {dark ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                )}
              </span>
            </button>
            <Link to="/login" className="lp-nav-cta">Iniciar Cuenta</Link>
          </div>
        </nav>

        <div style={{ height: "72px" }} />

        {/* HERO */}
        <section className="lp-hero">
          <img src="/Isolation_Mode_01_OF.svg" className="lp-hero-wave" alt="" />
          <div className="lp-hero-content">
            <img src="/Texto_01.svg" alt="Tu semana Resuelta" className="lp-hero-title" />
            <p className="lp-hero-sub">Atlas no es una app. Es tu asistente<br />inteligente en WhatsApp.</p>
            <p className="lp-hero-body">Reserva tus tiros, organiza tus partidas y planifica tu semana de golf — todo vía WhatsApp. Reserva en segundos. Disponibilidad 24/7. Recomendaciones personalizadas.</p>
            <div className="lp-hero-btns">
              <Link to="/login"  className="lp-btn-outline-pink">Iniciar Sesión</Link>
              <Link to="/signup" className="lp-btn-outline-dark">Registrarse</Link>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="lp-how">
          <img src="/Isolation_Mode_02.svg" className="lp-how-wave-h" alt="" />
          <img src="/Isolation_Mode_03.svg" className="lp-how-wave-v" alt="" />
          <div className="lp-how-inner">
            <img src={dark ? "/Texto_02_dark.svg" : "/Texto_02.svg"} alt="¿Cómo funciona ATLAS?" className="lp-how-title" />
            <p className="lp-how-desc">Reserva tus tiros, organiza tus partidas y planifica tu semana de golf — todo vía WhatsApp. Reserva en segundos. Disponibilidad 24/7. Recomendaciones personalizadas. Atlas usa IA para optimizar tus reservaciones y mejorar la experiencia de cliente.</p>
            <div className="lp-how-grid">
              <div>
                <img src="/padel image.svg" alt="Padel" className="lp-how-photo" />
                <Link to="/dashboard" className="lp-how-btn">
                  Explorar servicios
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
              <div className="lp-how-right">
                <div className="lp-how-circle-wrap">
                  <img src="https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=400&h=400&fit=crop" alt="Asistente" className="lp-how-circle-img1" />
                  <img src="/padel image.svg" alt="Asistente hover" className="lp-how-circle-img2" />
                </div>
                <img src={dark ? "/Texto_03_New_dark.svg" : "/Texto_03_New.svg"} alt="Atlas no es un app" className="lp-how-text3" />
                <p className="lp-how-right-desc">Reserva tus tiros, organiza tus partidas y planifica tu semana de golf — todo vía WhatsApp. Reserva en segundos. Disponibilidad 24/7. Recomendaciones personalizadas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* LOCALIDADES */}
        <section className="lp-loc">
          <img src={dark ? "/pink-04 1_dark.svg" : "/pink-04 1.svg"} alt="Los campos incluidos en esta versión" className="lp-loc-title" />
          <div className="lp-loc-grid">
            {locRow1.map((col, i) => (
              <div key={i}>
                <div className="lp-loc-head">{col.club}</div>
                <ul className="lp-loc-items">{col.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                <div className="lp-loc-extra">{col.extra}</div>
              </div>
            ))}
          </div>
          <div className="lp-loc-grid lp-loc-row2">
            {locRow2.map((col, i) => (
              <div key={i}>
                <div className="lp-loc-head">{col.club}</div>
                <ul className="lp-loc-items">{col.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                {col.extras.map((e, j) => <div key={j} className="lp-loc-extra">{e}</div>)}
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="lp-tl">
          <div style={{ width: '100%', overflow: 'hidden', height: Math.round(1000 * tlScale) }}>
            <div style={{ width: 1860, height: 1000, transformOrigin: 'top left', transform: `scale(${tlScale})` }}>
              <div className="lp-tl-wrap">

                <img src="/isolation_timeline.svg" className="lp-tl-bg" alt="" />

                <svg className="lp-tl-svg" viewBox="0 0 1860 1000">
                  {tlNodes.slice(0, -1).map((node, i) => {
                    const next = tlNodes[i + 1];
                    return (
                      <TLNodeConnector
                        key={`nc-${i}`}
                        ax={node.x + TL_NR} ay={node.y}
                        bx={next.x - TL_NR} by={next.y}
                        idx={i}
                      />
                    );
                  })}
                  {tlNodes.map((node, ni) => {
                    const baseIdx = tlNodes.slice(0, ni).reduce((sum, n) => sum + n.subs.length, 0);
                    return node.subs.map((sub, si) => (
                      <TLConnector
                        key={sub.label}
                        nx={node.x} ny={node.y}
                        sx={sub.x}  sy={sub.y}
                        idx={baseIdx + si}
                        active={expandedNode === node.id}
                      />
                    ));
                  })}
                </svg>

                {tlNodes.map(node => (
                  <div
                    key={node.id}
                    className={`lp-tl-node${node.subs.length > 0 ? " has-subs" : ""}`}
                    style={{ left: node.x, top: node.y }}
                    onClick={() => node.subs.length > 0 && setExpandedNode(expandedNode === node.id ? null : node.id)}
                  >
                    <div className={`lp-tl-circle${expandedNode === node.id ? " open" : ""}`}>
                      <img src={node.img} alt={`Actividad ${node.id}`} />
                    </div>
                  </div>
                ))}

                {tlNodes.map(node => (
                  <TLInfo
                    key={`info-${node.id}`}
                    sport={node.sport}
                    time={node.time}
                    tee={node.tee}
                    dir="right"
                    style={{ left: node.x, top: node.y >= 400 ? node.y - TL_NR - 70 : node.y + TL_NR + 12, transform: 'translateX(-50%)' }}
                  />
                ))}

                {tlNodes.map(node =>
                  node.subs.map(sub => (
                    <div
                      key={sub.label}
                      className={`lp-tl-sub${expandedNode === node.id ? " visible" : ""}`}
                      style={{ left: sub.x, top: sub.y }}
                    >
                      <div className="lp-tl-sub-circle">
                        <img src={sub.img} alt={sub.label} />
                      </div>
                    </div>
                  ))
                )}

                {tlNodes.map(node =>
                  node.subs.map(sub => (
                    <TLInfo
                      key={`info-sub-${sub.label}`}
                      sport={sub.sport}
                      time={sub.time}
                      tee={sub.tee}
                      dir={sub.infoDir}
                      style={{
                        opacity: expandedNode === node.id ? 1 : 0,
                        transition: "opacity 0.35s ease 0.2s",
                        pointerEvents: expandedNode === node.id ? "auto" : "none",
                        left: sub.x, top: sub.y < node.y ? sub.y - TL_SR - 70 : sub.y + TL_SR + 12, transform: 'translateX(-50%)',
                      }}
                    />
                  ))
                )}

                <div className="lp-tl-axis">
                  {[
                    { t: "09:00", pct: 0       },
                    { t: "10:00", pct: 16.667  },
                    { t: "11:00", pct: 33.333  },
                    { t: "12:00", pct: 50      },
                    { t: "13:00", pct: 66.667  },
                    { t: "14:00", pct: 83.333  },
                    { t: "15:00", pct: 100     },
                  ].map(({ t, pct }) => (
                    <div key={t}>
                      <div className="lp-tl-axis-dot"  style={{ left: `${pct}%` }} />
                      <div className="lp-tl-axis-time" style={{ left: `${pct}%` }}>{t}</div>
                    </div>
                  ))}
                </div>

                <div className="lp-tl-today">
                  <span className="lp-tl-today-label">TODAY</span>
                  <span className="lp-tl-today-date">· {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* MAPA */}
        <section className="lp-map">
          <img src="/isolation_mode_04.svg" className="lp-map-wave-v" alt="" />
          <img src="/Isolation_Mode_05.svg" className="lp-map-wave-h" alt="" />
          <div className="lp-map-inner">
            <img src={dark ? "/Texto_04_dark.svg" : "/Texto_04_New_ligth.svg"} alt="Encuentra nuestros clubes" className="lp-map-title" />
            <div className="lp-map-grid">
              <div className="lp-map-list">
                {mapPlaces.map((place, i) => (
                  <div key={i} className="lp-map-place">
                    <h4>{place.name}</h4>
                    {place.items.length > 0 && <ul>{place.items.map((p, j) => <li key={j}>{p}</li>)}</ul>}
                  </div>
                ))}
              </div>
              <iframe className="lp-map-frame" src="https://www.openstreetmap.org/export/embed.html?bbox=-71.0%2C18.2%2C-68.5%2C19.0&layer=mapnik" title="Mapa Atlas" />
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="lp-news">
          <div className="lp-news-card">
            <div>
              <h2>Empieza hoy</h2>
              <p>Subscribe to receive the latest news and updates about Atlas.<br />We promise not to spam you!</p>
            </div>
            <div className="lp-news-form">
              <input type="email" placeholder="Ingresa tu correo electrónico" value={email} onChange={e => setEmail(e.target.value)} className="lp-news-input" />
              <button className="lp-news-btn" onClick={() => setEmail("")}>Agregar</button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lp-cta">
          <img src={dark ? "/Texto_05_dark.svg" : "/Texto_05.svg"} alt="¿Listo para revolucionar?" className="lp-cta-title" />
          <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
          <Link to="/signup" className="lp-cta-btn">Empieza Hoy</Link>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <div className="lp-footer-brand-name">
                <img src="/Atlas_completo.svg" alt="Atlas" style={{ height: "48px", display: "block" }} />
              </div>
              <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p style={{ marginTop: "12px", fontSize: "12px", color: "#555" }}>atlas@gmail.com</p>
            </div>
            <div className="lp-footer-col">
              <h4>About us</h4>
              <ul>
                <li><a href="https://www.iamatlas.do/">Inicio</a></li>
                <li><a href="https://www.iamatlas.do/">Acerca</a></li>
                <li><a href="https://www.iamatlas.do/">Tablero</a></li>
                <li><a href="https://www.iamatlas.do/">Contact us</a></li>
              </ul>
            </div>
            <div className="lp-footer-col">
              <h4>Blog</h4>
              <ul>
                <li><a href="https://www.iamatlas.do/">Noticias</a></li>
                <li><a href="https://www.iamatlas.do/">Torneos</a></li>
                <li><a href="https://www.iamatlas.do/">Guías</a></li>
                <li><a href="https://www.iamatlas.do/">FAQ</a></li>
              </ul>
            </div>
            <div className="lp-footer-col">
              <h4>Contact us</h4>
              <ul>
                <li><a href="https://www.iamatlas.do/">info@iamatlas.com</a></li>
                <li><a href="https://www.iamatlas.do/">+1 (809) 555-1234</a></li>
              </ul>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">ALTLAS @2026</span>
            <div className="lp-footer-socials">
              <a href="https://www.iamatlas.do/" className="lp-footer-social" aria-label="X">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.iamatlas.do/" className="lp-footer-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.iamatlas.do/" className="lp-footer-social" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.iamatlas.do/" className="lp-footer-social" aria-label="TikTok">
                <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/></svg>
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}