import { Link } from "react-router";
import { useState } from "react";

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

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

type Business = {
  lugar: string;
  fecha: string;
  genero: string;
  email: string;
};

const businesses: Business[] = [
  { lugar: "PlayByPoint",   fecha: "Connected 10/4/2026", genero: "Femenino",   email: "play@gmail.com"    },
  { lugar: "FitZone",       fecha: "Connected 10/4/2026", genero: "Masculino",  email: "fitzone@gmail.com" },
  { lugar: "SportHub",      fecha: "Connected 10/4/2026", genero: "Indefinido", email: "sport@gmail.com"   },
  { lugar: "ActiveLife",    fecha: "Connected 10/4/2026", genero: "Femenino",   email: "active@gmail.com"  },
  { lugar: "GymPro",        fecha: "Connected 10/4/2026", genero: "Masculino",  email: "gym@gmail.com"     },
  { lugar: "WellnessClub",  fecha: "Connected 10/4/2026", genero: "Femenino",   email: "well@gmail.com"    },
  { lugar: "PowerFit",      fecha: "Connected 10/4/2026", genero: "Masculino",  email: "power@gmail.com"   },
  { lugar: "MoveMore",      fecha: "Connected 10/4/2026", genero: "Indefinido", email: "move@gmail.com"    },
  { lugar: "EliteGym",      fecha: "Connected 10/4/2026", genero: "Masculino",  email: "elite@gmail.com"   },
];

type ModalState = { open: boolean; isEdit: boolean; biz: Business | null };

const emptyBiz: Business = { lugar: "", fecha: "", genero: "Femenino", email: "" };

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: "100px",
  border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#333",
  outline: "none", boxSizing: "border-box", background: "white",
};

const selectStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: "100px",
  border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#333",
  outline: "none", background: "white", appearance: "none" as const,
  cursor: "pointer",
};

export default function BusinessHub() {
  const [modal, setModal] = useState<ModalState>({ open: false, isEdit: false, biz: null });
  const [form, setForm] = useState<Business>(emptyBiz);

  const openAdd = () => {
    setForm(emptyBiz);
    setModal({ open: true, isEdit: false, biz: null });
  };

  const openEdit = (biz: Business) => {
    setForm({ ...biz });
    setModal({ open: true, isEdit: true, biz });
  };

  const closeModal = () => setModal({ open: false, isEdit: false, biz: null });

  return (
    <div style={{ padding: "32px" }}>

      {/* Botón Agregar negocio */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <button
          onClick={openAdd}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 22px", borderRadius: "100px",
            border: "2px solid #DA007C", background: "white",
            color: "#DA007C", fontSize: "14px", fontWeight: "600",
            cursor: "pointer", transition: "background 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(218,0,124,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
        >
          <IconStar />
          Agregar negocio
        </button>
      </div>

      {/* Título */}
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#343C6A", marginBottom: "20px" }}>
        Conexiones Activas
      </h2>

      {/* Grid de cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {businesses.map((biz, index) => (
          <div
            key={index}
            style={{
              background: "white", borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 20px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>Lugar</p>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a", margin: 0 }}>{biz.lugar}</p>
                </div>
                <Link to="/business-hub/billing/1" style={{ color: "inherit", lineHeight: 0, display: "block" }}>
                  <IconDocument />
                </Link>
              </div>
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>Fecha</p>
                <p style={{ fontSize: "14px", color: "#333", margin: 0 }}>{biz.fecha}</p>
              </div>
            </div>

            <div style={{
              padding: "14px 20px", borderTop: "1px solid #f0f0f0",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <button
                onClick={() => openEdit(biz)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 16px", borderRadius: "100px",
                  border: "1.5px solid #DA007C", background: "white",
                  color: "#DA007C", fontSize: "13px", fontWeight: "500", cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(218,0,124,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                <IconEdit />
                Editar
              </button>

              <button
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 16px", borderRadius: "100px",
                  border: "1.5px solid #DA007C", background: "white",
                  color: "#DA007C", fontSize: "13px", fontWeight: "500", cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(218,0,124,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                <IconTrash />
                Eliminar
              </button>

              <div style={{ marginLeft: "auto" }}>
                <img
                  src="/BussinessHubFoto.svg"
                  alt="negocio"
                  style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid #eee" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL ── */}
      {modal.open && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "white", borderRadius: "20px",
              padding: "32px", width: "560px", maxWidth: "90vw",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              position: "relative",
            }}
          >
            {/* Cabecera del modal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <p style={{ fontSize: "17px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>
                  {modal.isEdit ? "Editar negocio" : "Agregar negocio"}
                </p>
                <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
                  {modal.isEdit
                    ? "Actualiza la información de la conexión del negocio."
                    : "Ingresa la información del nuevo negocio."}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>
                  {modal.isEdit ? "Edición" : "Registro"}
                </p>
                <p style={{ fontSize: "13px", fontWeight: "600", color: "#333", margin: 0 }}>
                  {new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            {/* Campo Género */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                Genero
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={form.genero}
                  onChange={e => setForm({ ...form, genero: e.target.value })}
                  style={selectStyle}
                >
                  <option>Femenino</option>
                  <option>Masculino</option>
                  <option>Indefinido</option>
                </select>
                <svg style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            {/* Correo + Contraseña */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="nombre@gmail.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  defaultValue={modal.isEdit ? "placeholder" : ""}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Botones + foto */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 20px", borderRadius: "100px",
                  border: "1.5px solid #DA007C", background: "white",
                  color: "#DA007C", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(218,0,124,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                <IconPlus />
                {modal.isEdit ? "Guardar cambios" : "Agregar negocio"}
              </button>

              <button
                onClick={closeModal}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 20px", borderRadius: "100px",
                  border: "1.5px solid #DA007C", background: "white",
                  color: "#DA007C", fontSize: "14px", fontWeight: "600", cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(218,0,124,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
              >
                <IconTrash />
                Cancelar
              </button>

              <div style={{ marginLeft: "auto" }}>
                <img
                  src="/BussinessHubFoto.svg"
                  alt="perfil"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #eee" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}