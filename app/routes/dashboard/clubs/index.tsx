import { Link } from "react-router";
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

const IconDocument = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

type Club = { nombre: string; ubicacion: string; genero: string; email: string; };

const clubs: Club[] = [
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Femenino",   email: "play@gmail.com"  },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Masculino",  email: "play2@gmail.com" },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Indefinido", email: "play3@gmail.com" },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Femenino",   email: "play4@gmail.com" },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Masculino",  email: "play5@gmail.com" },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Indefinido", email: "play6@gmail.com" },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Femenino",   email: "play7@gmail.com" },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Masculino",  email: "play8@gmail.com" },
  { nombre: "PlayByPoint", ubicacion: "Connected 10/4/2026", genero: "Indefinido", email: "play9@gmail.com" },
];

const emptyClub: Club = { nombre: "", ubicacion: "", genero: "Femenino", email: "" };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: "100px",
  border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#333",
  outline: "none", boxSizing: "border-box", background: "white",
};

export default function ClubsIndex() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const [modal, setModal] = useState<{ open: boolean; isEdit: boolean; club: Club | null }>({
    open: false, isEdit: false, club: null,
  });
  const [form, setForm] = useState<Club>(emptyClub);

  const openAdd  = () => { setForm(emptyClub); setModal({ open: true, isEdit: false, club: null }); };
  const openEdit = (club: Club) => { setForm({ ...club }); setModal({ open: true, isEdit: true, club }); };
  const closeModal = () => setModal({ open: false, isEdit: false, club: null });

  const btnStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
    padding: "7px 16px", borderRadius: "100px",
    border: "1.5px solid #DA007C", background: "white",
    color: "#DA007C", fontSize: "13px", fontWeight: "500", cursor: "pointer",
  };

  return (
    <div style={{ padding: isMobile ? "16px" : "32px" }}>

      {/* Botón Agregar */}
      <div style={{ display: "flex", justifyContent: isMobile ? "stretch" : "flex-end", marginBottom: "24px" }}>
        <button
          onClick={openAdd}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "10px 22px", borderRadius: "100px",
            border: "2px solid #DA007C", background: "white",
            color: "#DA007C", fontSize: "14px", fontWeight: "600",
            cursor: "pointer", transition: "background 0.2s ease",
            width: isMobile ? "100%" : "auto",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
        >
          <IconPlus /> Agregar Clubes
        </button>
      </div>

      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#343C6A", marginBottom: "20px" }}>
        Conexiones Activas
      </h2>

      {/* Grid de cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: "20px",
      }}>
        {clubs.map((club, index) => (
          <div
            key={index}
            style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}
          >
            <img
              src="/padel.svg"
              alt="Club"
              style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "16px 20px 12px" }}>
              <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 6px", fontWeight: "500" }}>Nombre</p>
              {/* ── ÚNICO CAMBIO: badge en el nombre ── */}
              <span style={{
                display: "inline-block",
                background: "#FFE0CC",
                color: "#1a1a1a",
                fontSize: "14px",
                fontWeight: "600",
                padding: "4px 14px",
                borderRadius: "100px",
                marginBottom: "12px",
              }}>
                {club.nombre}
              </span>
              <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>Ubicacion</p>
              <p style={{ fontSize: "14px", color: "#333", margin: "0 0 14px" }}>{club.ubicacion}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => openEdit(club)}
                  style={btnStyle}
                  onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
                >
                  <IconEdit /> Editar
                </button>
                <button
                  style={btnStyle}
                  onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
                >
                  <IconTrash /> Eliminar
                </button>
              </div>
            </div>
            <div style={{ padding: "12px 20px", borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ background: "#16C098", color: "white", borderRadius: "100px", padding: "5px 16px", fontSize: "13px", fontWeight: "600" }}>
                Activo
              </span>
              <Link to={`/clubs/${index + 1}`} style={{ color: "inherit", lineHeight: 0 }}>
                <IconDocument />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL ── */}
      {modal.open && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000,
            padding: isMobile ? "16px" : "0",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "white", borderRadius: "20px",
              padding: isMobile ? "24px 20px" : "32px",
              width: isMobile ? "100%" : "560px",
              maxWidth: "100%",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: isMobile ? "8px" : "0",
              marginBottom: "24px",
            }}>
              <div>
                <p style={{ fontSize: "17px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>
                  {modal.isEdit ? "Editar club" : "Agregar club"}
                </p>
                <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                  {modal.isEdit ? "Actualiza la información del club." : "Ingresa la información del nuevo club."}
                </p>
              </div>
              {!isMobile && (
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>
                    {modal.isEdit ? "Edición" : "Registro"}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#333", margin: 0 }}>
                    {new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Genero</label>
              <div style={{ position: "relative" }}>
                <select
                  value={form.genero}
                  onChange={e => setForm({ ...form, genero: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "100px", border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#333", outline: "none", background: "white", appearance: "none", cursor: "pointer" }}
                >
                  <option>Femenino</option>
                  <option>Masculino</option>
                  <option>Indefinido</option>
                </select>
                <svg style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "16px", marginBottom: "32px",
            }}>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Correo Electrónico</label>
                <input type="email" placeholder="nombre@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>Contraseña</label>
                <input type="password" placeholder="••••••••••" defaultValue={modal.isEdit ? "placeholder" : ""} style={inputStyle} />
              </div>
            </div>

            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "12px",
            }}>
              <button
                style={btnStyle}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                <IconPlus /> {modal.isEdit ? "Guardar cambios" : "Agregar club"}
              </button>
              <button
                onClick={closeModal}
                style={btnStyle}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                <IconTrash /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}