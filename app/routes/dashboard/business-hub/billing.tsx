import { Link } from "react-router";
import { useState } from "react";

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DA007C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16C098" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const items = [
  { no: 1, articulo: "Servicio #1", desc: "Descripción", cantidad: 1, unidad: "Unidad (es)", precio: "$10,000.00", itbs: "0%", subtotal: "$10,000.00", total: "$10,000.00" },
  { no: 2, articulo: "Servicio #1", desc: "Descripción", cantidad: 2, unidad: "Unidad (es)", precio: "$2,500.00",  itbs: "0%", subtotal: "$5,000.00",  total: "$5,000.00"  },
  { no: 3, articulo: "Servicio #1", desc: "Descripción", cantidad: 1, unidad: "Unidad (es)", precio: "$45,000.00", itbs: "0%", subtotal: "$5,000.00",  total: "$45,000.00" },
];

const pagos = [
  { label: "Deposito No. 2020-04-0006", fecha: "Abr 24, 2026", cantidad: "$5,000.00"  },
  { label: "Pago parcial",              fecha: "Abr 24, 2026", cantidad: "$20,000.00" },
  { label: "Pago parcial",              fecha: "Abr 24, 2026", cantidad: "$20,000.00" },
];

const tdStyle: React.CSSProperties = {
  padding: "10px 12px", fontSize: "13px", color: "#333",
  borderBottom: "1px solid #f0f0f0", verticalAlign: "top",
};
const thStyle: React.CSSProperties = {
  padding: "10px 12px", fontSize: "11px", color: "#aaa",
  fontWeight: "600", textAlign: "left", borderBottom: "1px solid #eee",
  textTransform: "uppercase" as const, letterSpacing: "0.5px",
};

export default function Billing() {
  const [hoverAgregar, setHoverAgregar] = useState(false);
  const [hoverEnviar, setHoverEnviar] = useState(false);

  return (
    <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>

      {/* ── COLUMNA IZQUIERDA ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
          <Link
            to="/business-hub"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              color: "#2D60FF", textDecoration: "none", fontSize: "14px", fontWeight: 500,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D60FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver atras
          </Link>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#343C6A", margin: 0 }}>
            Detalle de facturación #000000-2026
          </h2>
        </div>

        {/* Card principal */}
        <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "20px", overflow: "hidden" }}>

          {/* Header de la factura */}
          <div style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: "16px", borderBottom: "1px solid #f0f0f0" }}>
            <img
              src="/empresa.svg"
              alt="Empresa"
              style={{ width: "80px", height: "80px", objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "15px", color: "#1a1a1a", margin: "0 0 4px" }}>Club registrado #1</p>
                  <p style={{ fontSize: "13px", color: "#666", margin: "0 0 2px" }}>José García</p>
                  <p style={{ fontSize: "13px", color: "#666", margin: "0 0 2px" }}>789/1 Sector-2c, 38200 Santo Domingo, Rep. Dom</p>
                  <p style={{ fontSize: "13px", color: "#666", margin: "0 0 2px" }}>848172194 | Club#1@gmail.com</p>
                  <p style={{ fontSize: "13px", color: "#666", margin: "0 0 2px" }}>NCF: 362 521 879 00034</p>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>RNC: 842-484021</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    background: "#f5f5f5", borderRadius: "100px",
                    padding: "6px 14px", fontSize: "12px",
                    fontWeight: "600", color: "#555", display: "block", marginBottom: "16px",
                  }}>
                    #000000-2026
                  </span>
                  <p style={{ fontSize: "12px", color: "#aaa", margin: "0 0 4px" }}>Cantidad total</p>
                  <p style={{ fontSize: "22px", fontWeight: "800", color: "#1a1a1a", margin: 0 }}>$53,000.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Fecha de facturación", value: "01/04/2026" },
                { label: "Fecha de entrega",     value: "01/04/2026" },
                { label: "Condiciones de pago",  value: "Plazo de 15 días", bold: true },
                { label: "Payment Deadline",     value: "01/04/2026" },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 2px", fontWeight: "500" }}>{item.label}</p>
                  <p style={{ fontSize: "13px", color: "#1a1a1a", margin: 0, fontWeight: item.bold ? "700" : "400" }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "11px", color: "#aaa", margin: "0 0 8px", fontWeight: "500" }}>Detalles de cliente</p>
              <p style={{ fontWeight: "700", fontSize: "14px", color: "#1a1a1a", margin: "0 0 4px" }}>José García</p>
              {[
                "789/1 Sector-2c, 38200 Santo Domingo, Rep. Dom",
                "848172194 | Club#1@gmail.com",
                "NCF: 362 521 879 00034",
                "RNC: 842-484021",
              ].map((line, i) => (
                <p key={i} style={{ fontSize: "13px", color: "#666", margin: "0 0 2px" }}>{line}</p>
              ))}
              <p style={{ fontSize: "11px", color: "#aaa", margin: "16px 0 4px", fontWeight: "500" }}>Notas:</p>
              <p style={{ fontSize: "13px", color: "#666", margin: 0, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet consectetur. Porttitor gravida sed metus ac quam nunc. Morbi nunc sed tempus facilisis dignissim sed. Hac pulvinar euismod odio morbi cras. Nunc pulvinar faucibus quam dui.
              </p>
            </div>
          </div>

          {/* Tabla */}
          <div style={{ padding: "20px 24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["No.", "Artículo", "Cantidad", "Precio Unitario", "ITBS", "Subtotal", "Total"].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.no}>
                    <td style={tdStyle}>{item.no}</td>
                    <td style={tdStyle}>
                      <p style={{ margin: "0 0 2px", fontWeight: "500" }}>{item.articulo}</p>
                      <p style={{ margin: 0, color: "#aaa", fontSize: "12px" }}>{item.desc}</p>
                    </td>
                    <td style={tdStyle}>
                      <p style={{ margin: "0 0 2px" }}>{item.cantidad}</p>
                      <p style={{ margin: 0, color: "#aaa", fontSize: "12px" }}>{item.unidad}</p>
                    </td>
                    <td style={tdStyle}>{item.precio}</td>
                    <td style={tdStyle}>{item.itbs}</td>
                    <td style={tdStyle}>{item.subtotal}</td>
                    <td style={tdStyle}>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totales */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f0f0f0" }}>
              {[
                { label: "Subtotal",    value: "$50,000.00", bold: false },
                { label: "Descuentos", value: "$0.00",       bold: false },
                { label: "Total ITBS", value: "$3,500.00",   bold: false },
                { label: "Total Price",value: "$53,000.00",  bold: true  },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", gap: "48px" }}>
                  <span style={{ fontSize: "13px", color: row.bold ? "#1a1a1a" : "#666", fontWeight: row.bold ? "700" : "400" }}>{row.label}</span>
                  <span style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: row.bold ? "800" : "400", minWidth: "90px", textAlign: "right" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COLUMNA DERECHA ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Botón Agregar negocio */}
        <button
          onMouseEnter={() => setHoverAgregar(true)}
          onMouseLeave={() => setHoverAgregar(false)}
          style={{
            width: "100%", padding: "12px", borderRadius: "100px",
            border: "2px solid #DA007C",
            background: hoverAgregar ? "#FFF0F8" : "white",
            color: "#DA007C",
            fontSize: "14px", fontWeight: "600",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "8px",
            transition: "background 0.2s ease",
          }}
        >
          <IconStar />
          Agregar negocio
        </button>

        {/* Status de facturación */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 12px" }}>Status de facturación</p>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: "#f0fdf8", borderRadius: "100px", padding: "10px",
            color: "#16C098", fontWeight: "600", fontSize: "14px",
          }}>
            <IconClock />
            En tiempo
          </div>
        </div>

        {/* Enviar factura */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <p style={{ fontSize: "13px", color: "#666", margin: "0 0 12px", textAlign: "center" }}>Factura pendiente a envió</p>
          <button
            onMouseEnter={() => setHoverEnviar(true)}
            onMouseLeave={() => setHoverEnviar(false)}
            style={{
              width: "100%", padding: "11px", borderRadius: "100px",
              border: "2px solid #DA007C",
              background: hoverEnviar ? "#FFF0F8" : "white",
              color: "#DA007C",
              fontSize: "14px", fontWeight: "600",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
              transition: "background 0.2s ease",
            }}
          >
            <IconSend />
            Enviar factura
          </button>
        </div>

        {/* Resumen */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <p style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a", margin: "0 0 16px" }}>Resumen</p>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
            <span style={{ fontSize: "14px", color: "#333" }}>Total</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a1a1a" }}>$ 53,000.00</span>
          </div>

          {pagos.map((pago, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#16C098", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a1a" }}>{pago.label}</span>
              </div>
              <div style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>Fecha</span>
                  <span style={{ fontSize: "12px", color: "#333" }}>{pago.fecha}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>Cantidad</span>
                  <span style={{ fontSize: "12px", color: "#333" }}>{pago.cantidad}</span>
                </div>
              </div>
            </div>
          ))}

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: "16px", borderTop: "1px solid #f0f0f0",
          }}>
            <span style={{ fontSize: "13px", color: "#333" }}>Cantidad restante</span>
            <span style={{
              background: "#f5f5f5", borderRadius: "8px",
              padding: "6px 12px", fontSize: "13px", fontWeight: "700", color: "#1a1a1a",
            }}>
              $5,000.00 Incl. VAT
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}