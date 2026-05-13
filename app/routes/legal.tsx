import { useState, useEffect } from "react";
import { Link } from "react-router";

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

const LOREM = "Lorem ipsum dolor sit amet consectetur. Porttitor gravida sed metus ac quam nunc. Morbi nunc sed tempus facilisis dignissim sed. Hac pulvinar euismod odio morbi cras. Nunc pulvinar faucibus quam dui.\n\nSed ac nisi accumsan malesuada adipiscing accumsan diam. Eu ipsum a eu risus blandit vulputate nibh libero. Lectus nulla ullamcorper sagittis purus quisque est. Vestibulum facilisis egestas lorem vitae in in purus. Sed ac nisi accumsan malesuada adipiscing accumsan diam. Eu ipsum a eu risus blandit vulputate nibh libero. Lectus nulla ullamcorper sagittis purus quisque est.";

const sections = [
  { title: "1. Servicios",                    color: "#e8faa0" },
  { title: "2. Elegibilidad",                 color: "#d6f56e" },
  { title: "3. Cuentas de Usuario",           color: "#c8f05a" },
  { title: "4. Uso Aceptable",                color: "#b8e840" },
  { title: "5. Pagos y Pruebas Gratuitas",    color: "#a8e020" },
  { title: "6. Cambios en el Servicio",       color: "#90d000" },
  { title: "7. Descargos de Responsabilidad", color: "#78b800" },
];

export default function Legal() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{
      padding: isMobile ? "16px" : "32px",
      maxWidth: isMobile ? "100%" : "1100px",
    }}>

      {/* Cards superiores */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
        gap: "20px",
        marginBottom: "28px",
        alignItems: "stretch",
      }}>

        {/* Card izquierda */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "12px", marginLeft: "4px" }}>
            Términos Y Condiciones Legales
          </p>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: isMobile ? "24px 20px" : "32px 28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box" as const,
          }}>
            <p style={{
              fontSize: "13px",
              color: "#666",
              lineHeight: "1.8",
              margin: 0,
              textAlign: "center",
            }}>
              Bienvenido a iamAtlas. Al utilizar nuestros servicios ("Servicios"), usted acepta cumplir y
              estar legalmente obligado por estos Términos y Condiciones ("Términos"). Por favor,
              reviselos cuidadosamente.
            </p>
          </div>
        </div>

        {/* Card derecha */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#333", marginBottom: "12px", marginLeft: "4px" }}>
            ¿Listo para Comenzar?
          </p>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: isMobile ? "24px 20px" : "32px 28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            textAlign: "center",
            boxSizing: "border-box" as const,
          }}>
            <p style={{ fontSize: "15px", fontWeight: "700", margin: 0, color: "#1a1a1a", lineHeight: 1.5 }}>
              Al continuar, usted acepta estos<br />términos y condiciones.
            </p>
            <Link
              to="/dashboard"
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(218,0,124,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              style={{
                padding: "10px 22px",
                borderRadius: "100px",
                border: "2px solid #DA007C",
                color: "#DA007C",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "background 0.2s ease",
                width: isMobile ? "100%" : "auto",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <img src="/IconsAV.svg" alt="" style={{ width: "16px", height: "16px" }} />
              Continuar a Atlas
            </Link>
          </div>
        </div>

      </div>

      {/* Acordeón */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {sections.map((section, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                borderRadius: isMobile ? "20px" : "40px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                style={{
                  width: "100%",
                  padding: isMobile ? "16px 20px" : "20px 28px",
                  background: section.color,
                  border: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: isMobile ? "14px" : "15px",
                  fontWeight: "600",
                  color: "#1a1a2e",
                  textAlign: "left",
                }}
              >
                {section.title}
                <span style={{
                  fontSize: "24px",
                  fontWeight: "300",
                  display: "inline-block",
                  lineHeight: 1,
                  flexShrink: 0,
                  marginLeft: "12px",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.35s ease",
                }}>
                  ›
                </span>
              </button>

              <div style={{
                maxHeight: isOpen ? "600px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                <div style={{
                  background: "white",
                  padding: isMobile ? "20px" : "28px 32px",
                  fontSize: "14px",
                  color: "#444",
                  lineHeight: "1.9",
                  whiteSpace: "pre-line",
                }}>
                  {LOREM}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}