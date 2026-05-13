import { Link } from "react-router";
import { useEffect, useState } from "react";

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

const IconDocument = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

export default function ClubDetail() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const btnStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "6px",
    padding: "7px 16px", borderRadius: "100px",
    border: "1.5px solid #DA007C", background: "white",
    color: "#DA007C", fontSize: "13px", fontWeight: "500", cursor: "pointer",
  };

  return (
    <div style={{ padding: isMobile ? "16px" : "32px", fontFamily: "Inter, sans-serif" }}>

      {/* Volver */}
      <div style={{ marginBottom: "24px" }}>
        <Link
          to="/clubs"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#2D60FF", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D60FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver a Clubs
        </Link>
      </div>

      {/* Sección superior */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
        gap: "24px",
        marginBottom: "40px",
        alignItems: "start",
      }}>

        {/* Card del club */}
        <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}>
          <img
            src="/padel.svg"
            alt="Club"
            style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
          />
          <div style={{ padding: "16px 20px 12px" }}>
            <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>Nombre</p>
            <p style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 12px" }}>PlayByPoint</p>
            <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>Ubicacion</p>
            <p style={{ fontSize: "14px", color: "#333", margin: "0 0 14px" }}>Connected 10/4/2026</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={btnStyle} onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }} onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
                <IconEdit /> Editar
              </button>
              <button style={btnStyle} onMouseEnter={e => { e.currentTarget.style.background = "#FFF0F8"; }} onMouseLeave={e => { e.currentTarget.style.background = "white"; }}>
                <IconTrash /> Eliminar
              </button>
            </div>
          </div>
          <div style={{ padding: "12px 20px", borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ background: "#16C098", color: "white", borderRadius: "100px", padding: "5px 16px", fontSize: "13px", fontWeight: "600" }}>
              Activo
            </span>
            <IconDocument />
          </div>
        </div>

        {/* Detalles */}
        <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: isMobile ? "20px 16px" : "28px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#343C6A", margin: "0 0 24px" }}>
            Detalles de Club
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "20px" : "32px",
          }}>
            {/* Fechas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { label: "Fecha de facturación", value: "01/04/2026" },
                { label: "Fecha de entrega",     value: "01/04/2026" },
                { label: "Condiciones de pago",  value: "Plazo de 15 días", bold: true },
                { label: "Payment Deadline",     value: "01/04/2026" },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 4px", fontWeight: "500" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", color: "#1a1a1a", margin: 0, fontWeight: item.bold ? "700" : "400" }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Cliente */}
            <div>
              <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 8px", fontWeight: "500" }}>Detalles de cliente</p>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 6px" }}>José García</p>
              {[
                "789/1 Sector-2c, 38200 Santo Domingo, Rep. Dom",
                "848172194 | Club#1@gmail.com",
                "NCF: 362 521 879 00034",
                "RNC: 842-484021",
              ].map((line, i) => (
                <p key={i} style={{ fontSize: "13px", color: "#666", margin: "0 0 4px" }}>{line}</p>
              ))}
              <p style={{ fontSize: "11px", color: "#aaa", margin: "16px 0 6px", fontWeight: "500" }}>Notas:</p>
              <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet consectetur. Porttitor gravida sed metus ac quam nunc. Morbi nunc sed tempus facilisis dignissim sed.
              </p>
            </div>
          </div>

          {/* Galería — scroll horizontal en móvil */}
          <div style={{
            marginTop: "28px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflowX: isMobile ? "auto" : "visible",
            paddingBottom: isMobile ? "4px" : "0",
          }}>
            {[1, 2, 3, 4, 5].map(i => (
              <img
                key={i}
                src="/padel.svg"
                alt={`foto ${i}`}
                style={{
                  width: isMobile ? "80px" : "90px",
                  height: "64px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flexShrink: 0,
                  border: i === 1 ? "2px solid #2D60FF" : "2px solid transparent",
                }}
              />
            ))}
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#343C6A", marginBottom: "16px" }}>
        Ubicacion en tiempo real
      </h2>
      <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <iframe
          title="Mapa"
          src="https://maps.google.com/maps?q=Santo+Domingo,+Dominican+Republic&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height={isMobile ? 260 : 420}
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  );
}