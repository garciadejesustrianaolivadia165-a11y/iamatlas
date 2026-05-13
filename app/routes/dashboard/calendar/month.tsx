import { useState } from "react";
import { useNavigate } from "react-router";

const MONTHS_ES   = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAY_HEADERS = ["L","Ma","Mi","J","V","S","D"];
const WEEK_COLS   = ["Lun","Mar","Mie","Jue","Vie","Sab","Dom"];

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

type MEvent = { label: string; bg: string; textColor: string; startHour: number; duration: number; };

const monthEvents: Record<number, MEvent[]> = {
  5:  [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   }],
  7:  [{ label: "Campeonato",        bg: "#FADADD", textColor: "#C62828", startHour: 10, duration: 2   }],
  9:  [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   },
       { label: "Competencia",       bg: "#FFF9C4", textColor: "#F57F17", startHour: 15, duration: 1.5 }],
  11: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   }],
  13: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   },
       { label: "Reunión de equipo", bg: "#D1C4E9", textColor: "#4A148C", startHour: 14, duration: 1   },
       { label: "Golf Academy",      bg: "#FADADD", textColor: "#C62828", startHour: 17, duration: 2   }],
  14: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   }],
  15: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   },
       { label: "Torneo de Pádel",   bg: "#BBDEFB", textColor: "#1565C0", startHour: 11, duration: 3   }],
  17: [{ label: "Torneo Regional",   bg: "#B2DFDB", textColor: "#00695C", startHour: 10, duration: 4   }],
  19: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   }],
  20: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   },
       { label: "Competencia",       bg: "#FADADD", textColor: "#C62828", startHour: 12, duration: 2   }],
  21: [{ label: "Golf Academy",      bg: "#FFF9C4", textColor: "#F57F17", startHour: 8,  duration: 2   }],
  22: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   }],
  25: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   },
       { label: "Reunión de equipo", bg: "#D1C4E9", textColor: "#4A148C", startHour: 15, duration: 1   }],
  27: [{ label: "Práctica de Pádel", bg: "#C8F7C5", textColor: "#2E7D32", startHour: 9,  duration: 1   }],
  28: [{ label: "Campeonato",        bg: "#FADADD", textColor: "#C62828", startHour: 10, duration: 3   }],
};

const todayEvents = [
  { label: "Práctica de Pádel",    time: "08:00", color: "#78C609" },
  { label: "Campeonato de Pádel",  time: "09:00", color: "#FF4444" },
  { label: "Competencia de Pádel", time: "10:00", color: "#FF8C00" },
  { label: "Práctica de Pádel",    time: "11:00", color: "#78C609" },
];
const tomorrowEvents = [
  { label: "Práctica de Pádel", time: "13:00", color: "#78C609" },
  { label: "Práctica de Pádel", time: "14:00", color: "#8B5CF6" },
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

export default function CalendarMonth() {
  const today = new Date();
  const navigate = useNavigate();
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [viewMonth,     setViewMonth]     = useState(today.getMonth());
  const [viewYear,      setViewYear]      = useState(today.getFullYear());
  const [miniMonth,     setMiniMonth]     = useState(today.getMonth());
  const [miniYear,      setMiniYear]      = useState(today.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<MEvent & { day: number } | null>(null);
  const [modalOpen,     setModalOpen]     = useState(false);
  const [evDesc,        setEvDesc]        = useState("");
  const [evDate,        setEvDate]        = useState("");
  const [evTimeStart,   setEvTimeStart]   = useState("");
  const [evTimeEnd,     setEvTimeEnd]     = useState("");
  const [allDay,        setAllDay]        = useState(false);
  const [includeOthers, setIncludeOthers] = useState(false);
  const [guestEmail,    setGuestEmail]    = useState("");

  const prevView = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
  const nextView = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1);
  const prevMini = () => miniMonth === 0 ? (setMiniMonth(11), setMiniYear(y => y - 1)) : setMiniMonth(m => m - 1);
  const nextMini = () => miniMonth === 11 ? (setMiniMonth(0), setMiniYear(y => y + 1)) : setMiniMonth(m => m + 1);

  const calDays  = getCalendarDays(viewYear, viewMonth);
  const miniDays = getCalendarDays(miniYear, miniMonth);

  const startHourLabel = (h: number) => `${String(Math.floor(h)).padStart(2,"0")}:${h % 1 >= 0.5 ? "30" : "00"}`;
  const endHourLabel   = (h: number, d: number) => startHourLabel(h + d);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 72px)", fontFamily: "Inter, sans-serif", overflow: "hidden" }}>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <div style={{ width: "270px", borderRight: "1px solid #eee", background: "white", overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "20px 20px 0" }}>
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
                const isToday = day === today.getDate() && miniMonth === today.getMonth() && miniYear === today.getFullYear();
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
          <button onClick={prevView} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 6px" }}>‹</button>
          <span style={{ fontSize: "15px", fontWeight: "600", color: "#343C6A", minWidth: "160px" }}>{MONTHS_ES[viewMonth]} {viewYear}</span>
          <button onClick={nextView} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#555", padding: "2px 6px" }}>›</button>
          <div style={{ position: "relative" }}>
            <select
              value="Mensual"
              onChange={e => {
  if (e.target.value === "Semanal") navigate("/calendar");
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

        {/* Cabecera días semana */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "white", borderBottom: "1px solid #eee", flexShrink: 0 }}>
          {WEEK_COLS.map((d, i) => (
            <div key={d} style={{
              textAlign: "center", padding: "10px 0", fontSize: "13px", fontWeight: "600",
              color: i >= 5 ? "#DA007C" : "#888",
              borderLeft: i > 0 ? "1px solid #eee" : "none",
            }}>{d}</div>
          ))}
        </div>

        {/* Grid mensual */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoRows: "minmax(110px, 1fr)" }}>
            {calDays.map((day, i) => {
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              const isWeekend = i % 7 >= 5;
              const events  = day ? (monthEvents[day] ?? []) : [];
              const visible = events.slice(0, 2);
              const extra   = events.length - visible.length;
              return (
                <div key={i} style={{
                  borderLeft: i % 7 !== 0 ? "1px solid #eee" : "none",
                  borderBottom: "1px solid #eee",
                  background: !day ? "#fafafa" : isWeekend ? "#fdf8ff" : "white",
                  padding: "6px", minHeight: "110px",
                }}>
                  {day && (
                    <>
                      <div style={{
                        width: "26px", height: "26px", borderRadius: "50%",
                        background: isToday ? "#78C609" : "transparent",
                        color: isToday ? "white" : isWeekend ? "#DA007C" : "#333",
                        fontSize: "13px", fontWeight: isToday ? "700" : "500",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "4px",
                      }}>{day}</div>
                      {visible.map((ev, ei) => (
                        <div key={ei} onClick={() => setSelectedEvent({ ...ev, day })}
                          style={{
                            background: ev.bg, color: ev.textColor,
                            fontSize: "11px", fontWeight: "600",
                            borderRadius: "4px", padding: "2px 6px",
                            marginBottom: "2px", cursor: "pointer",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.93)"; }}
                          onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; }}
                        >{ev.label}</div>
                      ))}
                      {extra > 0 && <div style={{ fontSize: "10px", color: "#aaa", paddingLeft: "4px" }}>+{extra} más</div>}
                    </>
                  )}
                </div>
              );
            })}
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
              {[
                { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, label: "Horario", value: `${startHourLabel(selectedEvent.startHour)} – ${endHourLabel(selectedEvent.startHour, selectedEvent.duration)}` },
                { icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>, label: "Fecha", value: `${selectedEvent.day} ${MONTHS_ES[viewMonth]} ${viewYear}` },
                { icon: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>, label: "Duración", value: selectedEvent.duration >= 1 ? `${selectedEvent.duration}h` : `${Math.round(selectedEvent.duration * 60)} min` },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{row.icon}</svg>
                  <div>
                    <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px" }}>{row.label}</p>
                    <p style={{ fontSize: "14px", color: "#333", margin: 0, fontWeight: "500" }}>{row.value}</p>
                  </div>
                </div>
              ))}
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
