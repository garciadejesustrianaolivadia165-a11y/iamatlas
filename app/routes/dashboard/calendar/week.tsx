import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

const MONTHS_ES   = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS_ES     = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const DAY_HEADERS = ["L","Ma","Mi","J","V","S","D"];
const hours       = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2,"0")}:00`);
const ROW_H       = 56;

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

type DayEvent = { label: string; startHour: number; duration: number; bg: string; textColor: string; };

const dayEventsData: DayEvent[] = [
  { label: "Práctica de Pádel",   startHour: 9,    duration: 1,   bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Campeonato de Pádel", startHour: 10,   duration: 0.5, bg: "#FADADD", textColor: "#C62828" },
  { label: "Competencia",         startHour: 10.5, duration: 0.5, bg: "#FFF9C4", textColor: "#F57F17" },
  { label: "Reunión de equipo",   startHour: 12,   duration: 1.5, bg: "#D1C4E9", textColor: "#4A148C" },
  { label: "Práctica de Pádel",   startHour: 15,   duration: 2,   bg: "#C8F7C5", textColor: "#2E7D32" },
  { label: "Golf Academy",        startHour: 17,   duration: 1,   bg: "#B2DFDB", textColor: "#00695C" },
];

const todayEvents    = [
  { label: "Práctica de Pádel",    time: "08:00", color: "#78C609" },
  { label: "Campeonato de Pádel",  time: "09:00", color: "#FF4444" },
  { label: "Competencia de Pádel", time: "10:00", color: "#FF8C00" },
  { label: "Práctica de Pádel",    time: "11:00", color: "#78C609" },
];
const tomorrowEvents = [
  { label: "Práctica de Pádel", time: "13:00", color: "#78C609" },
  { label: "Práctica de Pádel", time: "14:00", color: "#8B5CF6" },
];
const pendingEvents  = [
  { label: "Práctica de Pádel", time: "01-05 al 14-02", color: "#78C609" },
];

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <div onClick={onChange} style={{ width: "44px", height: "24px", borderRadius: "100px", background: value ? "#78C609" : "#ddd", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s ease" }}>
    <div style={{ position: "absolute", top: "2px", left: value ? "22px" : "2px", width: "20px", height: "20px", borderRadius: "50%", background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.2s ease" }} />
  </div>
);

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 18px", borderRadius: "100px",
  border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#333",
  outline: "none", boxSizing: "border-box", background: "white",
};

export default function CalendarDay() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const today = new Date();
  const navigate = useNavigate();
  const [currentDate,   setCurrentDate]   = useState(new Date(today));
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [miniMonth,     setMiniMonth]     = useState(today.getMonth());
  const [miniYear,      setMiniYear]      = useState(today.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<DayEvent | null>(null);
  const [modalOpen,     setModalOpen]     = useState(false);
  const [evDesc,        setEvDesc]        = useState("");
  const [evDate,        setEvDate]        = useState("");
  const [evTimeStart,   setEvTimeStart]   = useState("");
  const [evTimeEnd,     setEvTimeEnd]     = useState("");
  const [allDay,        setAllDay]        = useState(false);
  const [includeOthers, setIncludeOthers] = useState(false);
  const [guestEmail,    setGuestEmail]    = useState("");

  useEffect(() => {
    if (isMobile && sidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, sidebarOpen]);

  const prevDay  = () => { const d = new Date(currentDate); d.setDate(d.getDate() - 1); setCurrentDate(d); };
  const nextDay  = () => { const d = new Date(currentDate); d.setDate(d.getDate() + 1); setCurrentDate(d); };
  const prevMini = () => miniMonth === 0 ? (setMiniMonth(11), setMiniYear(y => y - 1)) : setMiniMonth(m => m - 1);
  const nextMini = () => miniMonth === 11 ? (setMiniMonth(0), setMiniYear(y => y + 1)) : setMiniMonth(m => m + 1);

  const miniDays = getCalendarDays(miniYear, miniMonth);
  const isToday  = currentDate.toDateString() === today.toDateString();
  const dayLabel = `${DAYS_ES[currentDate.getDay()]}, ${currentDate.getDate()} ${MONTHS_ES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  const dayLabelShort = `${DAYS_ES[currentDate.getDay()].slice(0,3)}, ${currentDate.getDate()} ${MONTHS_ES[currentDate.getMonth()].slice(0,3)}`;
  const startHourLabel = (h: number) => `${String(Math.floor(h)).padStart(2,"0")}:${h % 1 >= 0.5 ? "30" : "00"}`;
  const endHourLabel   = (h: number, d: number) => startHourLabel(h + d);
  const nowTop = (() => { const n = new Date(); return (n.getHours() + n.getMinutes() / 60) * ROW_H; })();

  const SidebarContent = () => (
    <div style={{ background: "white", overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "20px 20px 0" }}>
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
            <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#555" }}>✕</button>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#343C6A" }}>{MONTHS_ES[miniMonth]}</span>
          <div>
            <button onClick={prevMini} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 6px" }}>‹</button>
            <button onClick={nextMini} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 6px" }}>›</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "6px" }}>
          {DAY_HEADERS.map(d => <div key={d} style={{ textAlign: "center", fontSize: "11px", color: "#aaa", fontWeight: "600", padding: "4px 0" }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {miniDays.map((day, i) => {
            const isTod = day === today.getDate() && miniMonth === today.getMonth() && miniYear === today.getFullYear();
            return (
              <div key={i}
                onClick={() => { if (day) { setCurrentDate(new Date(miniYear, miniMonth, day)); if (isMobile) setSidebarOpen(false); } }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", margin: "1px auto", borderRadius: "50%", fontSize: "12px", cursor: day ? "pointer" : "default", background: isTod ? "#78C609" : "transparent", color: !day ? "transparent" : isTod ? "white" : "#333", fontWeight: isTod ? "700" : "400" }}
              >{day ?? ""}</div>
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
  );

  return (
    <div style={{ display: "flex", height: "calc(100vh - 72px)", fontFamily: "Inter, sans-serif", overflow: "hidden" }}>

      {!isMobile && sidebarOpen && (
        <div style={{ width: "270px", borderRight: "1px solid #eee", flexShrink: 0, overflowY: "auto" }}><SidebarContent /></div>
      )}
      {isMobile && sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200 }} />
          <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "270px", zIndex: 201, boxShadow: "2px 0 16px rgba(0,0,0,0.15)", overflowY: "auto" }}><SidebarContent /></div>
        </>
      )}

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", padding: isMobile ? "10px 12px" : "12px 20px", borderBottom: "1px solid #eee", background: "white", flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: "4px", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <button onClick={prevDay} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 4px", flexShrink: 0 }}>‹</button>

          <span style={{ fontSize: isMobile ? "12px" : "15px", fontWeight: "600", color: "#343C6A", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {isMobile ? dayLabelShort : dayLabel}
          </span>

          <button onClick={nextDay} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 4px", flexShrink: 0 }}>›</button>

          {isToday && <span style={{ fontSize: "11px", fontWeight: "700", background: "#78C609", color: "white", padding: "3px 10px", borderRadius: "100px", flexShrink: 0 }}>Hoy</span>}

          <div style={{ position: "relative", flexShrink: 0 }}>
            <select
              value="Diario"
              onChange={e => {
                if (e.target.value === "Semanal") navigate("..",        { relative: "path" });
                if (e.target.value === "Mensual") navigate("../month",  { relative: "path" });
              }}
              style={{ padding: "6px 28px 6px 12px", borderRadius: "100px", border: "1.5px solid #78C609", background: "white", color: "#78C609", fontSize: "13px", fontWeight: "600", cursor: "pointer", appearance: "none", WebkitAppearance: "none", outline: "none", minWidth: "108px" }}
            >
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
              <option value="Diario">Diario</option>
            </select>
            <svg style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#78C609" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", flexShrink: 0 }}>
            {!isMobile && (
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            )}
            {isMobile ? (
              <button onClick={() => setModalOpen(true)} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</button>
            ) : (
              <button onClick={() => setModalOpen(true)}
                style={{ padding: "8px 18px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "13px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >Agregar evento</button>
            )}
          </div>
        </div>

        {/* Cabecera columna día */}
        <div style={{ background: "white", flexShrink: 0, borderBottom: "1px solid #eee" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: isMobile ? "44px" : "64px", flexShrink: 0 }} />
            <div style={{ flex: 1, textAlign: "center", height: isMobile ? "48px" : "54px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderLeft: "1px solid #eee" }}>
              <span style={{ fontSize: "11px", color: "#aaa", fontWeight: "600", textTransform: "uppercase" }}>
                {isMobile ? DAYS_ES[currentDate.getDay()].slice(0,3) : DAYS_ES[currentDate.getDay()]}
              </span>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", marginTop: "2px", background: isToday ? "#78C609" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: isMobile ? "15px" : "18px", fontWeight: "700", color: isToday ? "white" : "#333" }}>{currentDate.getDate()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid horario */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ display: "flex", position: "relative" }}>
            <div style={{ width: isMobile ? "44px" : "64px", flexShrink: 0 }}>
              {hours.map(h => (
                <div key={h} style={{ height: `${ROW_H}px`, padding: isMobile ? "6px 4px 0" : "6px 8px 0", fontSize: isMobile ? "10px" : "11px", color: "#bbb", borderBottom: "1px solid #f0f0f0", boxSizing: "border-box" }}>{h}</div>
              ))}
            </div>
            <div style={{ flex: 1, position: "relative", borderLeft: "1px solid #eee", background: "white" }}>
              {hours.map(h => <div key={h} style={{ height: `${ROW_H}px`, borderBottom: "1px solid #f0f0f0" }} />)}
              {isToday && (
                <div style={{ position: "absolute", top: `${nowTop}px`, left: 0, right: 0, display: "flex", alignItems: "center", zIndex: 10, pointerEvents: "none" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#DA007C", marginLeft: "-5px" }} />
                  <div style={{ flex: 1, height: "2px", background: "#DA007C" }} />
                </div>
              )}
              {dayEventsData.map((ev, i) => (
                <div key={i} onClick={() => setSelectedEvent(ev)}
                  style={{ position: "absolute", top: `${ev.startHour * ROW_H}px`, left: isMobile ? "4px" : "8px", right: isMobile ? "4px" : "8px", height: `${ev.duration * ROW_H - 4}px`, background: ev.bg, borderRadius: "10px", padding: isMobile ? "6px 8px" : "10px 16px", overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", borderLeft: `4px solid ${ev.textColor}`, display: "flex", flexDirection: "column", justifyContent: "center" }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.93)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
                >
                  <span style={{ fontSize: isMobile ? "11px" : "13px", fontWeight: "700", color: ev.textColor }}>{ev.label}</span>
                  <span style={{ fontSize: isMobile ? "10px" : "11px", color: ev.textColor, opacity: 0.8, marginTop: "2px" }}>{startHourLabel(ev.startHour)} – {endHourLabel(ev.startHour, ev.duration)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div onClick={() => setSelectedEvent(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: isMobile ? "20px 20px 0 0" : "16px", width: isMobile ? "100%" : "340px", maxWidth: "90vw", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", overflow: "hidden" }}>
            <div style={{ background: selectedEvent.bg, padding: "20px 24px 16px", borderBottom: `3px solid ${selectedEvent.textColor}22` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: "17px", fontWeight: "700", color: selectedEvent.textColor, margin: 0 }}>{selectedEvent.label}</p>
                <button onClick={() => setSelectedEvent(null)} style={{ background: "none", border: "none", cursor: "pointer", color: selectedEvent.textColor, fontSize: "18px" }}>✕</button>
              </div>
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Horario",  value: `${startHourLabel(selectedEvent.startHour)} – ${endHourLabel(selectedEvent.startHour, selectedEvent.duration)}` },
                { label: "Fecha",    value: isMobile ? dayLabelShort : dayLabel },
                { label: "Duración", value: selectedEvent.duration >= 1 ? `${selectedEvent.duration}h` : `${Math.round(selectedEvent.duration * 60)} min` },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <p style={{ fontSize: "11px", color: "#aaa", margin: 0 }}>{row.label}</p>
                  <p style={{ fontSize: "14px", color: "#333", margin: 0, fontWeight: "500" }}>{row.value}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: "0 24px 24px" }}>
              <button onClick={() => setSelectedEvent(null)} style={{ width: "100%", padding: "10px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }} onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div onClick={() => setModalOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: isMobile ? "20px 20px 0 0" : "20px", padding: isMobile ? "24px 20px 32px" : "32px", width: isMobile ? "100%" : "540px", maxWidth: isMobile ? "100%" : "90vw", boxShadow: "0 8px 40px rgba(0,0,0,0.15)", maxHeight: isMobile ? "90vh" : "auto", overflowY: isMobile ? "auto" : "visible" }}>
            <p style={{ fontSize: isMobile ? "15px" : "17px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>Agregar evento</p>
            <p style={{ fontSize: "13px", color: "#888", margin: "0 0 20px" }}>Completa la información del nuevo evento</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div><label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Descripción</label><input type="text" placeholder="Ej: Práctica de Pádel" value={evDesc} onChange={e => setEvDesc(e.target.value)} style={inputStyle} /></div>
              <div><label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Fecha</label><input type="date" value={evDate} onChange={e => setEvDate(e.target.value)} style={inputStyle} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}><Toggle value={allDay} onChange={() => setAllDay(v => !v)} /><span style={{ fontSize: "14px", color: "#333" }}>Todo el día</span></div>
              {!allDay && (
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
                  <div><label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Hora inicio</label><input type="time" value={evTimeStart} onChange={e => setEvTimeStart(e.target.value)} style={inputStyle} /></div>
                  <div><label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Hora fin</label><input type="time" value={evTimeEnd} onChange={e => setEvTimeEnd(e.target.value)} style={inputStyle} /></div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}><Toggle value={includeOthers} onChange={() => setIncludeOthers(v => !v)} /><span style={{ fontSize: "14px", color: "#333" }}>Incluir otras personas</span></div>
              {includeOthers && <div><label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Correo invitados</label><input type="email" placeholder="invitado@gmail.com" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} style={inputStyle} /></div>}
            </div>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px", marginTop: "28px" }}>
              <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "11px 22px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "14px", fontWeight: "600", cursor: "pointer", width: isMobile ? "100%" : "auto" }} onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }} onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Agregar evento
              </button>
              <button onClick={() => setModalOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "11px 22px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "14px", fontWeight: "600", cursor: "pointer", width: isMobile ? "100%" : "auto" }} onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }} onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}