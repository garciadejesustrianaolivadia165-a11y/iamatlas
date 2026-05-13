import { useState } from "react";
import { useNavigate } from "react-router";

const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAY_HEADERS = ["L","Ma","Mi","J","V","S","D"];
const COL_DAYS    = ["Lun","Mar","Mie","Jue","Vie","Sab","Dom"];
const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2,"0")}:00`);
const ROW_H = 56;

function getMondayOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  return d;
}
function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

type CalEvent = { label: string; day: number; startHour: number; duration: number; bg: string; textColor: string; };

const sampleEvents: CalEvent[] = [
  { label: "Práctica de Pádel",  day: 0, startHour: 9,    duration: 1,   bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 0, startHour: 10,   duration: 0.4, bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 0, startHour: 10.4, duration: 0.4, bg: "#FADADD", textColor: "#C62828" },
  { label: "Práctica de Pádel",  day: 0, startHour: 10.8, duration: 0.4, bg: "#FFF9C4", textColor: "#F57F17" },
  { label: "Práctica de Pádel",  day: 1, startHour: 9,    duration: 1,   bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 1, startHour: 10,   duration: 0.5, bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 1, startHour: 10.5, duration: 0.5, bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 1, startHour: 11,   duration: 2.5, bg: "#D1C4E9", textColor: "#4A148C" },
  { label: "Práctica de Pádel",  day: 1, startHour: 14,   duration: 1,   bg: "#B2DFDB", textColor: "#00695C" },
  { label: "Práctica de Pádel",  day: 2, startHour: 9,    duration: 1,   bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 2, startHour: 12,   duration: 1.5, bg: "#FADADD", textColor: "#C62828" },
  { label: "Event Name",         day: 2, startHour: 13,   duration: 0.5, bg: "#FFF9C4", textColor: "#F57F17" },
  { label: "Práctica de Pádel",  day: 2, startHour: 14,   duration: 0.5, bg: "#FFF9C4", textColor: "#F57F17" },
  { label: "Práctica de Pádel",  day: 2, startHour: 14.5, duration: 0.7, bg: "#FFF9C4", textColor: "#F57F17" },
  { label: "Práctica de Pádel",  day: 3, startHour: 9,    duration: 1,   bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 3, startHour: 12,   duration: 3,   bg: "#FADADD", textColor: "#C62828" },
  { label: "Definición act",     day: 3, startHour: 12.5, duration: 2,   bg: "#FADADD", textColor: "#C62828" },
  { label: "Práctica de Pádel",  day: 4, startHour: 9,    duration: 1,   bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Práctica de Pádel",  day: 4, startHour: 17,   duration: 1.2, bg: "#D1C4E9", textColor: "#4A148C" },
];

const todayEvents = [
  { label: "Práctica de Pádel",    time: "08:00", color: "#78C609" },
  { label: "Campeonato de Pádel",  time: "09:00", color: "#FF4444" },
  { label: "Competencia de Pádel", time: "10:00", color: "#FF8C00" },
  { label: "Práctica de Pádel",    time: "11:00", color: "#78C609" },
  { label: "Práctica de Pádel",    time: "12:00", color: "#78C609" },
];
const tomorrowEvents = [
  { label: "Práctica de Pádel", time: "13:00", color: "#78C609" },
  { label: "Práctica de Pádel", time: "14:00", color: "#8B5CF6" },
  { label: "Práctica de Pádel", time: "15:00", color: "#2D60FF" },
];
const pendingEvents = [
  { label: "Práctica de Pádel", time: "01-05 al 14-02", color: "#78C609" },
];

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <div onClick={onChange} style={{
    width: "44px", height: "24px", borderRadius: "100px",
    background: value ? "#78C609" : "#ddd",
    position: "relative", cursor: "pointer", flexShrink: 0,
    transition: "background 0.2s ease",
  }}>
    <div style={{
      position: "absolute", top: "2px",
      left: value ? "22px" : "2px",
      width: "20px", height: "20px", borderRadius: "50%",
      background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      transition: "left 0.2s ease",
    }} />
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 18px", borderRadius: "100px",
  border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#333",
  outline: "none", boxSizing: "border-box", background: "white",
};

const selectStyle: React.CSSProperties = {
  padding: "5px 28px 5px 14px", borderRadius: "100px",
  border: "1.5px solid #78C609", background: "white",
  color: "#78C609", fontSize: "13px", fontWeight: "600",
  cursor: "pointer", appearance: "none", outline: "none",
};

export default function CalendarIndex() {
  const today = new Date();
  const navigate = useNavigate();
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [calMonth,       setCalMonth]       = useState(today.getMonth());
  const [calYear,        setCalYear]        = useState(today.getFullYear());
  const [hoveredDay,     setHoveredDay]     = useState<number | null>(null);
  const [selectedEvent,  setSelectedEvent]  = useState<CalEvent | null>(null);
  const [modalOpen,      setModalOpen]      = useState(false);
  const [evDesc,         setEvDesc]         = useState("");
  const [evDate,         setEvDate]         = useState("");
  const [evTimeStart,    setEvTimeStart]    = useState("");
  const [evTimeEnd,      setEvTimeEnd]      = useState("");
  const [allDay,         setAllDay]         = useState(false);
  const [includeOthers,  setIncludeOthers]  = useState(false);
  const [guestEmail,     setGuestEmail]     = useState("");

  const monday = getMondayOfWeek(today);
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
  const weekLabel = `${monday.getDate()}-${sunday.getDate()} ${MONTHS_ES[monday.getMonth()]} ${monday.getFullYear()}`;
  const calDays = getCalendarDays(calYear, calMonth);
  const prevMonth = () => calMonth === 0 ? (setCalMonth(11), setCalYear(y => y - 1)) : setCalMonth(m => m - 1);
  const nextMonth = () => calMonth === 11 ? (setCalMonth(0),  setCalYear(y => y + 1)) : setCalMonth(m => m + 1);

  const startHourLabel = (h: number) => `${String(Math.floor(h)).padStart(2,"0")}:${h % 1 === 0.5 ? "30" : "00"}`;
  const endHourLabel   = (h: number, d: number) => startHourLabel(h + d);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 72px)", fontFamily: "Inter, sans-serif", overflow: "hidden" }}>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <div style={{ width: "270px", borderRight: "1px solid #eee", background: "white", overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "#343C6A" }}>{MONTHS_ES[calMonth]}</span>
              <div>
                <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 6px" }}>‹</button>
                <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 6px" }}>›</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "6px" }}>
              {DAY_HEADERS.map(d => <div key={d} style={{ textAlign: "center", fontSize: "11px", color: "#aaa", fontWeight: "600", padding: "4px 0" }}>{d}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
              {calDays.map((day, i) => {
                const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "30px", height: "30px", margin: "1px auto", borderRadius: "50%",
                    fontSize: "12px", cursor: day ? "pointer" : "default",
                    background: isToday ? "#78C609" : "transparent",
                    color: !day ? "transparent" : isToday ? "white" : "#333",
                    fontWeight: isToday ? "700" : "400",
                  }}>{day ?? ""}</div>
                );
              })}
            </div>
          </div>
          <div style={{ padding: "16px 20px 20px" }}>
            {[{ title: "Hoy", events: todayEvents }, { title: "Mañana", events: tomorrowEvents }, { title: "Pendientes", events: pendingEvents }].map(section => (
              <div key={section.title}>
                <p style={{ fontSize: "15px", fontWeight: "700", color: "#343C6A", margin: "14px 0 10px" }}>{section.title}</p>
                {section.events.map((ev, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: ev.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "12px", color: "#333" }}>{ev.label}</span>
                    </div>
                    <span style={{ fontSize: "11px", color: "#aaa" }}>{ev.time}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 24px", borderBottom: "1px solid #eee", background: "white", flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: "4px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span style={{ fontSize: "15px", fontWeight: "600", color: "#343C6A" }}>{weekLabel}</span>
          <div style={{ position: "relative" }}>
            <select
              value="Semanal"
              onChange={e => {
  if (e.target.value === "Mensual") navigate("/calendar/month");
  if (e.target.value === "Diario")  navigate("/calendar/week");
}}
              style={selectStyle}
            >
              <option>Semanal</option><option>Mensual</option><option>Diario</option>
            </select>
            <svg style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#78C609" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px" }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button onClick={() => setModalOpen(true)}
              style={{ padding: "8px 20px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
            >Agregar un evento</button>
          </div>
        </div>

        {/* Cabecera días */}
        <div style={{ background: "white", flexShrink: 0, borderBottom: "1px solid #eee" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "64px", flexShrink: 0 }} />
            {COL_DAYS.map((day, i) => (
              <div key={day} style={{
                flex: 1, textAlign: "center", height: "38px", lineHeight: "38px",
                fontSize: "13px", fontWeight: "600", color: "#888",
                borderLeft: "1px solid #eee",
                background: hoveredDay === i ? "#e8e8e8" : i >= 5 ? "#f8f8f8" : "white",
                transition: "background 0.15s ease",
              }}>{day}</div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ display: "flex", position: "relative" }}>
            <div style={{ width: "64px", flexShrink: 0 }}>
              {hours.map(h => (
                <div key={h} style={{ height: `${ROW_H}px`, padding: "6px 8px 0", fontSize: "11px", color: "#bbb", borderBottom: "1px solid #f0f0f0", boxSizing: "border-box" }}>{h}</div>
              ))}
            </div>
            {COL_DAYS.map((day, dayIdx) => (
              <div
                key={day}
                onMouseEnter={() => setHoveredDay(dayIdx)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{
                  flex: 1, position: "relative", borderLeft: "1px solid #eee",
                  background: hoveredDay === dayIdx
                    ? (dayIdx >= 5 ? "#ebebeb" : "#f0f0f0")
                    : (dayIdx >= 5 ? "#f8f8f8" : "white"),
                  transition: "background 0.15s ease",
                }}
              >
                {hours.map(h => (
                  <div key={h} style={{ height: `${ROW_H}px`, borderBottom: "1px solid #f0f0f0" }} />
                ))}
                {sampleEvents.filter(ev => ev.day === dayIdx).map((ev, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedEvent(ev)}
                    style={{
                      position: "absolute",
                      top: `${ev.startHour * ROW_H}px`,
                      left: "3px", right: "3px",
                      height: `${ev.duration * ROW_H - 3}px`,
                      background: ev.bg, borderRadius: "6px",
                      padding: "4px 8px", overflow: "hidden",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.93)"; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: "600", color: ev.textColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.label}</span>
                    <span style={{ fontSize: "10px", color: ev.textColor, flexShrink: 0, marginLeft: "4px" }}>08:00</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP EVENTO */}
      {selectedEvent && (
        <div onClick={() => setSelectedEvent(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: "16px", width: "340px", maxWidth: "90vw", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", overflow: "hidden" }}>
            <div style={{ background: selectedEvent.bg, padding: "20px 24px 16px", borderBottom: `3px solid ${selectedEvent.textColor}22` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <p style={{ fontSize: "17px", fontWeight: "700", color: selectedEvent.textColor, margin: 0 }}>{selectedEvent.label}</p>
                <button onClick={() => setSelectedEvent(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 0 12px", color: selectedEvent.textColor, fontSize: "18px", lineHeight: 1 }}>✕</button>
              </div>
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div>
                  <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px" }}>Horario</p>
                  <p style={{ fontSize: "14px", color: "#333", margin: 0, fontWeight: "500" }}>{startHourLabel(selectedEvent.startHour)} – {endHourLabel(selectedEvent.startHour, selectedEvent.duration)}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <div>
                  <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px" }}>Día</p>
                  <p style={{ fontSize: "14px", color: "#333", margin: 0, fontWeight: "500" }}>{COL_DAYS[selectedEvent.day]}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <div>
                  <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px" }}>Duración</p>
                  <p style={{ fontSize: "14px", color: "#333", margin: 0, fontWeight: "500" }}>{selectedEvent.duration >= 1 ? `${selectedEvent.duration}h` : `${Math.round(selectedEvent.duration * 60)} min`}</p>
                </div>
              </div>
            </div>
            <div style={{ padding: "0 24px 20px" }}>
              <button onClick={() => setSelectedEvent(null)}
                style={{ width: "100%", padding: "10px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AGREGAR EVENTO */}
      {modalOpen && (
        <div onClick={() => setModalOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: "20px", padding: "32px", width: "540px", maxWidth: "90vw", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <p style={{ fontSize: "17px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>Agregar evento</p>
                <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Completa la información del nuevo evento</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 2px" }}>Registro</p>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#333", margin: 0 }}>{today.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Descripción del evento</label>
                <input type="text" placeholder="Ej: Práctica de Pádel" value={evDesc} onChange={e => setEvDesc(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Fecha</label>
                <input type="date" value={evDate} onChange={e => setEvDate(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Toggle value={allDay} onChange={() => setAllDay(v => !v)} />
                <span style={{ fontSize: "14px", color: "#333" }}>Todo el día</span>
              </div>
              {!allDay && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Hora de inicio</label>
                    <input type="time" value={evTimeStart} onChange={e => setEvTimeStart(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Hora de fin</label>
                    <input type="time" value={evTimeEnd} onChange={e => setEvTimeEnd(e.target.value)} style={inputStyle} />
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Toggle value={includeOthers} onChange={() => setIncludeOthers(v => !v)} />
                <span style={{ fontSize: "14px", color: "#333" }}>Incluir otras personas</span>
              </div>
              {includeOthers && (
                <div>
                  <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Correo de invitados</label>
                  <input type="email" placeholder="invitado@gmail.com" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} style={inputStyle} />
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "11px 22px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Agregar evento
              </button>
              <button onClick={() => setModalOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "11px 22px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
