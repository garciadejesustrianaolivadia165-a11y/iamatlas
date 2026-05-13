import { Link } from "react-router";

export default function Login() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/waves-bg.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}>

      <div style={{
        width: "100%",
        maxWidth: "480px",
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}>

        <img src="/atlas.svg" alt="Atlas" style={{ width: "64px", marginBottom: "8px" }} />

        <h1 style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#1a1a1a",
          margin: 0,
          textAlign: "center",
        }}>
          ¡Bienvenido de nuevo!
        </h1>

        <p style={{ fontSize: "14px", color: "#666", margin: 0, textAlign: "center" }}>
          Inicia sesión en tu cuenta de Atlas
        </p>

        <div style={{ width: "100%" }}>
          <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
            Correo electrónico *
          </label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: "100px",
              border: "1px solid #ccc",
              fontSize: "14px",
              boxSizing: "border-box" as const,
              outline: "none",
              background: "white",
              color: "#000",
              display: "block",
            }}
          />
        </div>

        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "13px", color: "#333" }}>Contraseña *</label>
            <span style={{ fontSize: "13px", color: "#666", cursor: "pointer" }}>
              ¿Olvidaste la contraseña?
            </span>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: "100px",
              border: "1px solid #ccc",
              fontSize: "14px",
              boxSizing: "border-box" as const,
              outline: "none",
              background: "white",
              color: "#000",
              display: "block",
            }}
          />
        </div>

        <Link
          to="/dashboard"
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(218, 0, 124, 0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "100px",
            border: "2px solid #DA007C",
            background: "transparent",
            color: "#DA007C",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "center",
            textDecoration: "none",
            boxSizing: "border-box" as const,
            display: "block",
            transition: "background 0.2s ease",
          }}
        >
          Iniciar Sección
        </Link>

        <div style={{ textAlign: "center", fontSize: "13px", color: "#555", lineHeight: "1.8" }}>
          <p style={{ margin: 0 }}>
            No tienes cuenta?{" "}
            <Link to="/signup" style={{ color: "#DA007C", textDecoration: "none" }}>
              Regístrate aquí
            </Link>
          </p>
          <p style={{ margin: 0 }}>
            Si no has confirmado,{" "}
            <Link to="/signup" style={{ color: "#DA007C", textDecoration: "none" }}>
              Confirma aquí
            </Link>
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#999", margin: 0 }}>
          Al iniciar sesión, aceptas nuestros{" "}
          <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>
            Términos y Condiciones
          </Link>{" "}y{" "}
          <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>
            Política de Privacidad
          </Link>
        </p>

        <button style={{
          width: "100%",
          padding: "14px",
          borderRadius: "100px",
          border: "none",
          background: "#888",
          color: "white",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          boxSizing: "border-box" as const,
        }}>
          <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: "18px", height: "18px" }} />
          continue with google
        </button>

      </div>

      <div style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#DA007C" }} />
        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#C8E535" }} />
        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#FF6B35" }} />
      </div>

    </div>
  );
}