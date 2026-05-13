import { useState, useRef } from "react";

const IconPencil = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 20px", borderRadius: "100px",
  border: "1.5px solid #e0e0e0", fontSize: "14px", color: "#333",
  outline: "none", boxSizing: "border-box", background: "white",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px", color: "#555", fontWeight: "500",
  display: "block", marginBottom: "8px",
};

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <div
    onClick={onChange}
    style={{
      width: "52px", height: "28px", borderRadius: "100px",
      background: value ? "#78C609" : "#ddd",
      position: "relative", cursor: "pointer", flexShrink: 0,
      transition: "background 0.25s ease",
    }}
  >
    <div style={{
      position: "absolute", top: "3px",
      left: value ? "27px" : "3px",
      width: "22px", height: "22px", borderRadius: "50%",
      background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      transition: "left 0.25s ease",
    }} />
  </div>
);

type Tab = "editar" | "avatar" | "seguridad";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>("editar");
  const [photoSrc, setPhotoSrc]   = useState<string>("/fotoperfil.svg");
  const [multiDevice, setMultiDevice]   = useState(true);
  const [toggleAgenda, setToggleAgenda] = useState(true);
  const [toggleSync, setToggleSync]     = useState(false);
  const [toggleBanca, setToggleBanca]   = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoSrc(URL.createObjectURL(file));
  };

  return (
    <div style={{ padding: "32px", fontFamily: "Inter, sans-serif" }}>
      <div style={{
        background: "white", borderRadius: "20px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "32px",
      }}>

        {/* Tabs + título */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          <div style={{ display: "flex", gap: "32px" }}>
            {([
              { key: "editar",    label: "Editar Perfil" },
              { key: "avatar",    label: "Mi Avatar"     },
              { key: "seguridad", label: "Seguridad"     },
            ] as { key: Tab; label: string }[]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "15px", fontWeight: activeTab === tab.key ? "600" : "400",
                  color: activeTab === tab.key ? "#78C609" : "#aaa",
                  paddingBottom: "8px",
                  borderBottom: activeTab === tab.key ? "2px solid #78C609" : "2px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>
              Información personal
            </p>
            <p style={{ fontSize: "13px", color: "#aaa", margin: 0 }}>
              Actualiza tus datos personales y preferencias
            </p>
          </div>
        </div>

        {/* ── TAB: EDITAR PERFIL ── */}
        {activeTab === "editar" && (
          <>
            <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
                <img src={photoSrc} alt="Perfil" style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", border: "3px solid #eee" }} />
                <button onClick={() => fileInputRef.current?.click()} style={{ position: "absolute", bottom: "4px", right: "4px", width: "28px", height: "28px", borderRadius: "50%", background: "#78C609", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <IconPencil />
                </button>
              </div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div><label style={labelStyle}>Nombre</label><input type="text" placeholder="INgrese su nombre" style={inputStyle} /></div>
                <div><label style={labelStyle}>Apellido</label><input type="text" placeholder="Ingrese su apellido" style={inputStyle} /></div>
                <div><label style={labelStyle}>Correo Electrónico</label><input type="email" placeholder="nombre@gmail.com" style={inputStyle} /></div>
                <div><label style={labelStyle}>Contraseña</label><input type="password" defaultValue="12345678910" style={inputStyle} /></div>
                <div>
                  <label style={labelStyle}>Genero</label>
                  <div style={{ position: "relative" }}>
                    <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                      <option>Femenino</option><option>Masculino</option><option>Indefinido</option>
                    </select>
                    <svg style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div><label style={labelStyle}>Número de telefono</label><input type="tel" placeholder="+18498843392" style={inputStyle} /></div>
              </div>
            </div>

            <div style={{ marginTop: "32px", padding: "24px", borderRadius: "16px", border: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 4px" }}>Contraseña</p>
              <p style={{ fontSize: "13px", color: "#aaa", margin: "0 0 20px" }}>Administra la seguridad de tu cuenta y contraseña</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 4px" }}>Cambiar contraseña</p>
                  <p style={{ fontSize: "13px", color: "#aaa", margin: 0 }}>Administra la seguridad de tu cuenta y contraseña</p>
                </div>
                <button style={{ padding: "11px 24px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s ease", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
                  Cambiar Contraseña
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
                <IconPlay /> Guardar
              </button>
            </div>
          </>
        )}

        {/* ── TAB: MI AVATAR ── */}
        {activeTab === "avatar" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Inputs dispositivo */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Nombre de dispositivo</label>
                <input type="text" placeholder="IPhone 17 Pro Max" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Pass Code de dispositivo</label>
                <input type="text" placeholder="00-0000-0000" style={inputStyle} />
              </div>
            </div>

            {/* Notificaciones */}
            <div>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 20px" }}>
                Notification
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Toggle value={toggleAgenda} onChange={() => setToggleAgenda(!toggleAgenda)} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Admitir que dispositivo haga cambios en mi agenda</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Toggle value={toggleSync} onChange={() => setToggleSync(!toggleSync)} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Sincronizar dispositivos</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <Toggle value={toggleBanca} onChange={() => setToggleBanca(!toggleBanca)} />
                  <span style={{ fontSize: "14px", color: "#333" }}>Compartir información bancaria con dispositivo conectado</span>
                </div>
              </div>
            </div>

            {/* Guardar */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
                <IconPlay /> Guardar
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: SEGURIDAD ── */}
        {activeTab === "seguridad" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#78C609", margin: "0 0 16px" }}>
                Autentificación de dispositivos
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <Toggle value={multiDevice} onChange={() => setMultiDevice(!multiDevice)} />
                <span style={{ fontSize: "14px", color: "#333" }}>Habilitar conexión a mi cuenta desde múltiples dispositivos</span>
              </div>
            </div>

            <div>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#78C609", margin: "0 0 20px" }}>Confirmar Acceso</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "500px" }}>
                <div><label style={labelStyle}>Contraseña Actual</label><input type="password" defaultValue="12345678910" style={inputStyle} /></div>
                <div><label style={labelStyle}>Nueva Contraseña</label><input type="password" defaultValue="12345678910" style={inputStyle} /></div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "100px", border: "2px solid #DA007C", background: "white", color: "#DA007C", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
                <IconPlay /> Guardar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}