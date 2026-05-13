import { useState } from "react";
import { useNavigate } from "react-router";

// ── Pie chart ──────────────────────────────────────────────────────────────────
function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function slicePath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)} Z`;
}
function labelPos(cx: number, cy: number, r: number, start: number, end: number) {
  const mid = (start + end) / 2;
  return polarToCartesian(cx, cy, r * 0.65, mid);
}
const SLICES = [
  { label: "Clubes",  pct: 30, color: "#78C609" },
  { label: "Golf",    pct: 15, color: "#DA007C" },
  { label: "Running", pct: 20, color: "#FF6B35" },
  { label: "Padel",   pct: 35, color: "#2D60FF" },
];
function PieChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const cx = 110, cy = 110, r = 95;
  let deg = 0;
  const computed = SLICES.map((s, i) => {
    const start = deg; const end = deg + (s.pct / 100) * 360; deg = end;
    return { ...s, start, end, i };
  });
  return (
    <svg width="220" height="220" style={{ overflow: "visible" }}>
      {computed.map((s) => {
        const isHov = hovered === s.i;
        const rr = isHov ? r + 8 : r;
        const lp = labelPos(cx, cy, rr, s.start, s.end);
        return (
          <g key={s.i} onMouseEnter={() => setHovered(s.i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
            <path d={slicePath(cx, cy, rr, s.start, s.end)} fill={s.color}
              style={{ transformOrigin: `${cx}px ${cy}px`, transform: isHov ? "scale(1.06)" : "scale(1)", transition: "transform 0.18s ease", filter: isHov ? "drop-shadow(0 4px 10px rgba(0,0,0,0.2))" : "none" } as React.CSSProperties}
            />
            <text x={lp.x} y={lp.y - 6} textAnchor="middle" fontSize={isHov ? 13 : 12} fontWeight="700" fill="white" style={{ pointerEvents: "none", userSelect: "none" } as React.CSSProperties}>{s.pct}%</text>
            <text x={lp.x} y={lp.y + 9} textAnchor="middle" fontSize={isHov ? 11 : 10} fontWeight="600" fill="white" style={{ pointerEvents: "none", userSelect: "none" } as React.CSSProperties}>{s.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Bar chart ──────────────────────────────────────────────────────────────────
const BAR_MONTHS = [
  { month: "Ene", activas: 470, inactivas: 230 },
  { month: "Feb", activas: 340, inactivas: 120 },
  { month: "Mar", activas: 320, inactivas: 255 },
  { month: "Abr", activas: 470, inactivas: 365 },
  { month: "May", activas: 155, inactivas: 235 },
  { month: "Jun", activas: 385, inactivas: 235 },
  { month: "Jul", activas: 390, inactivas: 330 },
];
const MAX_VAL = 500, CHART_H = 180, BW = 18, COL_W = 70, LEFT_PAD = 36;

function BarChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const totalW = LEFT_PAD + BAR_MONTHS.length * COL_W + 10;
  return (
    <svg
      width="100%"
      height={CHART_H + 36}
      viewBox={`0 0 ${totalW} ${CHART_H + 36}`}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      {[0,100,200,300,400,500].map(v => {
        const y = CHART_H - (v / MAX_VAL) * CHART_H;
        return (
          <g key={v}>
            <line x1={LEFT_PAD} y1={y} x2={totalW} y2={y} stroke="#f0f0f0" strokeWidth={1} />
            <text x={LEFT_PAD - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#bbb">{v}</text>
          </g>
        );
      })}
      {BAR_MONTHS.map((d, i) => {
        const isHov = hoveredBar === i;
        const x = LEFT_PAD + i * COL_W + (COL_W - BW * 2 - 4) / 2;
        const hA = (d.activas / MAX_VAL) * CHART_H;
        const hI = (d.inactivas / MAX_VAL) * CHART_H;
        return (
          <g
            key={d.month}
            onMouseEnter={() => setHoveredBar(i)}
            onMouseLeave={() => setHoveredBar(null)}
            style={{
              transformBox: "fill-box",
              transformOrigin: "bottom",
              transform: isHov ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.15s ease",
              cursor: "pointer",
            } as React.CSSProperties}
          >
            <rect x={x} y={CHART_H - hA} width={BW} height={hA} rx={5}
              fill={isHov ? "#90d40a" : "#78C609"}
              style={{ transition: "fill 0.15s ease" }}
            />
            <rect x={x + BW + 4} y={CHART_H - hI} width={BW} height={hI} rx={5}
              fill={isHov ? "#ff3faa" : "#DA007C"}
              style={{ transition: "fill 0.15s ease" }}
            />
            <text x={x + BW + 2} y={CHART_H + 20} textAnchor="middle" fontSize={11}
              fill={isHov ? "#333" : "#aaa"}
              style={{ transition: "fill 0.15s ease" }}
            >
              {d.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Connection Card ────────────────────────────────────────────────────────────
function ConexionCard({ green, onClick }: { green: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, minWidth: 0, cursor: "pointer",
        background: green ? "#78C609" : "white",
        border: green ? "none" : "1.5px solid #ebebeb",
        borderRadius: 16, padding: "18px 20px 14px",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov
          ? "0 10px 28px rgba(0,0,0,0.18)"
          : green
            ? "0 6px 20px rgba(120,198,9,0.35)"
            : "0 4px 16px rgba(0,0,0,0.10)",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
    >
      <div style={{ fontSize: 11, color: green ? "rgba(255,255,255,0.75)" : "#bbb", marginBottom: 2 }}>Lugar</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: green ? "white" : "#222", marginBottom: 16 }}>
        Santo Domingo Country Club
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 10, color: green ? "rgba(255,255,255,0.7)" : "#bbb", marginBottom: 2 }}>Fecha</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: green ? "white" : "#333" }}>02 Abril 2026</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: green ? "rgba(255,255,255,0.7)" : "#bbb", marginBottom: 2 }}>Reserva</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: green ? "white" : "#78C609" }}>Vigente</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: green ? "white" : "#222", letterSpacing: 0.5 }}>
          ID-000-0000-00
        </span>
        <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.5)", background: "#ddd" }}>
          <img src="/BussinessHubFoto.svg" alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
}

// ── Action row ─────────────────────────────────────────────────────────────────
function ActionRow({ title, sub, icon }: { title: string; sub: string; icon: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, border: "1.5px solid #ebebeb", background: hov ? "#f8fef0" : "white", cursor: "pointer", transition: "background 0.2s ease" }}
    >
      <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#edf9d0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#222" }}>{title}</div>
        <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{sub}</div>
      </div>
      <span style={{ fontSize: 22, color: "#ccc", fontWeight: 300, lineHeight: 1 }}>+</span>
    </div>
  );
}

// ── Detail view ────────────────────────────────────────────────────────────────
const STAT_CARDS = [
  { bg: "#EDE9FF", iconColor: "#7C3AED" },
  { bg: "#FEF3C7", iconColor: "#D97706" },
  { bg: "#CCFBF1", iconColor: "#0D9488" },
];

type ServiceRow = {
  name: string; city: string; dates: string[]; extra: string; active: boolean;
};

const ROWS: ServiceRow[] = [
  { name: "S.D Country Club", city: "Santo domingo", dates: ["01 de Abril 2026","01 de Abril 2026","01 de Abril 2026"], extra: "Many publishing", active: false },
  { name: "S.D Country Club", city: "Santo domingo", dates: ["01 de Abril 2026","01 de Abril 2026","01 de Abril 2026"], extra: "01 de Abril 2026",  active: false },
  { name: "S.D Country Club", city: "Santo domingo", dates: ["01 de Abril 2026","01 de Abril 2026","01 de Abril 2026"], extra: "01 de Abril 2026",  active: true  },
  { name: "S.D Country Club", city: "Santo domingo", dates: ["01 de Abril 2026","01 de Abril 2026","01 de Abril 2026"], extra: "01 de Abril 2026",  active: false },
  { name: "S.D Country Club", city: "Santo domingo", dates: ["01 de Abril 2026","01 de Abril 2026","01 de Abril 2026"], extra: "01 de Abril 2026",  active: false },
  { name: "S.D Country Club", city: "Santo domingo", dates: ["01 de Abril 2026","01 de Abril 2026","01 de Abril 2026"], extra: "01 de Abril 2026",  active: false },
];

function ServiceRowItem({ row, idx }: { row: ServiceRow; idx: number }) {
  const navigate = useNavigate();
  const [hovBtn, setHovBtn] = useState(false);
  const dateColor = row.active ? "#78C609" : "#333";
  const iconBg    = row.active ? "#78C609" : (idx % 3 === 0 ? "#e8f5d0" : idx % 3 === 1 ? "#c8f0b0" : "#d8f5c0");
  const iconColor = row.active ? "white" : "#5a9e20";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 14, marginBottom: 10, background: row.active ? "#fafff5" : "white", border: row.active ? "1.5px solid #c8f0a0" : "1.5px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
        </svg>
      </div>
      <div style={{ minWidth: 150, flex: "0 0 150px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#222" }}>{row.name}</div>
        <div style={{ fontSize: 11, color: "#78C609", marginTop: 2, fontWeight: 500 }}>{row.city}</div>
      </div>
      {row.dates.map((d, i) => (
        <div key={i} style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: dateColor, whiteSpace: "nowrap" }}>{d}</div>
        </div>
      ))}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: dateColor, whiteSpace: "nowrap" }}>
          {row.active ? row.extra : "01 de Abril 2026"}
        </div>
        {!row.active && row.extra !== "01 de Abril 2026" && (
          <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>{row.extra}</div>
        )}
      </div>
      <button
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
        onClick={() => row.active && navigate("/clubs/details")}
        style={{ padding: "7px 18px", borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0, border: row.active ? "1.5px solid #78C609" : "1.5px solid #ddd", background: row.active ? (hovBtn ? "#78C609" : "white") : (hovBtn ? "#f5f5f5" : "white"), color: row.active ? (hovBtn ? "white" : "#78C609") : "#555", transition: "all 0.2s ease" }}
      >
        {row.active ? "Ver Detalles" : "Cancelar"}
      </button>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Overview() {
  const navigate = useNavigate();
  const [view, setView] = useState<"main" | "detail">("main");
  const [hovContact, setHovContact] = useState(false);
  const [hovVerMas,  setHovVerMas]  = useState(false);
  const [hovBack,    setHovBack]    = useState(false);

  if (view === "detail") {
    return (
      <div style={{ padding: "28px 32px", fontFamily: "Inter, sans-serif", background: "#f7f8fa", minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <button
            onClick={() => setView("main")}
            onMouseEnter={() => setHovBack(true)}
            onMouseLeave={() => setHovBack(false)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, color: "#2D60FF", fontWeight: 600, padding: 0,
              textDecoration: hovBack ? "underline" : "none",
              transition: "text-decoration 0.2s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D60FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Volver
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", margin: 0 }}>Detalle de conexiones activas</h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
          {STAT_CARDS.map((s, i) => (
            <div key={i} style={{ background: "white", borderRadius: 20, padding: "20px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>17</div>
                <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>Conexiones activas</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 20, padding: "24px 28px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", margin: 0, marginBottom: 20 }}>Bank Services List</h2>
          {ROWS.map((row, i) => <ServiceRowItem key={i} row={row} idx={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px", fontFamily: "Inter, sans-serif", background: "#f7f8fa", minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 310px", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Conexiones Activas</span>
              <span onClick={() => setView("detail")} style={{ fontSize: 12, color: "#2D60FF", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                Ver detalle
              </span>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              <ConexionCard green={true}  onClick={() => setView("detail")} />
              <ConexionCard green={false} onClick={() => setView("detail")} />
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 20, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Mis movimientos mensuales</span>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#555" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#78C609", display: "inline-block" }} /> Activas
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#555" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#DA007C", display: "inline-block" }} /> Inactivas
                </span>
              </div>
            </div>
            <div style={{ width: "100%" }}><BarChart /></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            <div style={{ background: "white", borderRadius: 20, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", display: "block", marginBottom: 20 }}>Mis Clubes</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                {[
                  { src: "/padel.svg",            label: "Casa de\nCampo" },
                  { src: "/BussinessHubFoto.svg", label: "Running\nClub" },
                  { src: "/padel.svg",            label: "Padel Club" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 58, height: 58, borderRadius: "50%", overflow: "hidden", border: "2.5px solid #ebebeb" }}>
                      <img src={c.src} alt={c.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#555", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.3 }}>{c.label}</span>
                  </div>
                ))}
                <div
                  onClick={() => navigate("/clubs")}
                  style={{ fontSize: 20, color: "#bbb", marginLeft: 4, cursor: "pointer", userSelect: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#78C609")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#bbb")}
                >
                  ›
                </div>
              </div>
              <button onMouseEnter={() => setHovContact(true)} onMouseLeave={() => setHovContact(false)}
                style={{ width: "100%", padding: "9px 0", borderRadius: 100, border: "1.5px solid #DA007C", background: hovContact ? "#FFF0F8" : "white", color: "#DA007C", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s ease" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Contactanos
              </button>
            </div>
            <div style={{ background: "white", borderRadius: 20, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", display: "block", marginBottom: 16 }}>Acciones Rapidas</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <ActionRow title="Chatear con IA" sub="Registra un nuevo requerimiento"
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#78C609" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84A16 16 0 0 0 14 15.09l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                />
                <ActionRow title="Agregar un negocio" sub="Agrega un nuevo club a la lista"
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#78C609" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", display: "block", marginBottom: 18 }}>Reservas mensuales</span>
            {[
              { name: "Santo Domingo Country Club", date: "01 de Abril de 2026" },
              { name: "Casa de Campo",              date: "01 de Abril de 2026" },
              { name: "Club de Golf Punta Cana",    date: "01 de Abril de 2026" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 2 ? "1px solid #f5f5f5" : "none" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fff9f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F4A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    <line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
                  </svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#222", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "#DA007C", marginTop: 2, fontWeight: 500 }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "white", borderRadius: 20, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", display: "block", marginBottom: 16 }}>Actividad Reciente</span>
            <div style={{ display: "flex", justifyContent: "center" }}><PieChart /></div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <span onMouseEnter={() => setHovVerMas(true)} onMouseLeave={() => setHovVerMas(false)}
                style={{ fontSize: 13, color: "#DA007C", fontWeight: 600, cursor: "pointer", textDecoration: hovVerMas ? "underline" : "none" }}>
                Ver Mas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}