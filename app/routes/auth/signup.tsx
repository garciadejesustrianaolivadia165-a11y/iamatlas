import { Link } from "react-router";

export default function Signup() {
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
      padding: "40px 0",
    }}>

      <div style={{
        width: "100%",
        maxWidth: "680px",
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}>

        <img src="/atlas.svg" alt="Atlas" style={{ width: "64px", marginBottom: "8px" }} />

        <h1 style={{ fontSize: "26px", fontWeight: "700", color: "#1a1a1a", margin: 0, textAlign: "center" }}>
          Crear tu cuenta
        </h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0, textAlign: "center" }}>
          Crea tu cuenta en Atlas.
        </p>

        {/* Fila 1: Nombre, Apellido, Género */}
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>

          <div>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Nombre *
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              style={{
                width: "100%", padding: "11px 16px", borderRadius: "100px",
                border: "1px solid #ccc", fontSize: "13px",
                boxSizing: "border-box" as const, outline: "none",
                background: "white", color: "#000",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Apellido *
            </label>
            <input
              type="text"
              placeholder="Tu apellido"
              style={{
                width: "100%", padding: "11px 16px", borderRadius: "100px",
                border: "1px solid #ccc", fontSize: "13px",
                boxSizing: "border-box" as const, outline: "none",
                background: "white", color: "#000",
              }}
            />
          </div>

          {/* Género — lista desplegable */}
          <div>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Género *
            </label>
            <select
              defaultValue=""
              style={{
                width: "100%", padding: "11px 16px", borderRadius: "100px",
                border: "1px solid #ccc", fontSize: "13px",
                boxSizing: "border-box" as const, outline: "none",
                background: "white", color: "#000", cursor: "pointer",
                appearance: "auto",
              }}
            >
              <option value="" disabled>Seleccionar</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="indefinido">Indefinido</option>
            </select>
          </div>

        </div>

        {/* Fila 2: Email + Teléfono */}
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

          <div>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Correo electrónico *
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              style={{
                width: "100%", padding: "11px 16px", borderRadius: "100px",
                border: "1px solid #ccc", fontSize: "13px",
                boxSizing: "border-box" as const, outline: "none",
                background: "white", color: "#000",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Teléfono *
            </label>
            <div style={{ display: "flex", gap: "8px" }}>

              {/* Selector de país con bandera */}
              <select
                defaultValue="+1do"
                style={{
                  padding: "11px 8px", borderRadius: "100px",
                  border: "1px solid #ccc", fontSize: "13px",
                  background: "white", color: "#000",
                  cursor: "pointer", outline: "none",
                  minWidth: "90px",
                }}
              >
                <option value="+1do">🇩🇴 +1</option>
                <option value="+1us">🇺🇸 +1</option>
                <option value="+1ca">🇨🇦 +1</option>
                <option value="+52">🇲🇽 +52</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+57">🇨🇴 +57</option>
                <option value="+58">🇻🇪 +58</option>
                <option value="+51">🇵🇪 +51</option>
                <option value="+54">🇦🇷 +54</option>
                <option value="+56">🇨🇱 +56</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+49">🇩🇪 +49</option>
              </select>

              <input
                type="tel"
                placeholder="(000) 000-0000"
                style={{
                  flex: 1, padding: "11px 16px", borderRadius: "100px",
                  border: "1px solid #ccc", fontSize: "13px",
                  boxSizing: "border-box" as const, outline: "none",
                  background: "white", color: "#000",
                }}
              />
            </div>
          </div>

        </div>

        {/* Contraseña */}
        <div style={{ width: "100%" }}>
          <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
            Contraseña *
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%", padding: "11px 20px", borderRadius: "100px",
              border: "1px solid #ccc", fontSize: "13px",
              boxSizing: "border-box" as const, outline: "none",
              background: "white", color: "#000",
            }}
          />
        </div>

        {/* Confirmar contraseña */}
        <div style={{ width: "100%" }}>
          <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
            Confirmar contraseña *
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%", padding: "11px 20px", borderRadius: "100px",
              border: "1px solid #ccc", fontSize: "13px",
              boxSizing: "border-box" as const, outline: "none",
              background: "white", color: "#000",
            }}
          />
        </div>

        {/* Botón Crear Cuenta */}
        <Link
          to="/dashboard"
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(218, 0, 124, 0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          style={{
            width: "100%", padding: "14px", borderRadius: "100px",
            border: "2px solid #DA007C", background: "transparent",
            color: "#DA007C", fontSize: "15px", fontWeight: "600",
            cursor: "pointer", textAlign: "center", textDecoration: "none",
            boxSizing: "border-box" as const, display: "block",
            transition: "background 0.2s ease",
          }}
        >
          Crear Cuenta
        </Link>

        <p style={{ margin: 0, fontSize: "13px" }}>
          <Link to="/login" style={{ color: "#DA007C", textDecoration: "none" }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </p>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#999", margin: 0 }}>
          Al crear tu cuenta, aceptas nuestros{" "}
          <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>Términos y Condiciones</Link>
          {" "}y{" "}
          <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>Política de Privacidad</Link>
        </p>

        <button style={{
          width: "100%", padding: "14px", borderRadius: "100px",
          border: "none", background: "#888", color: "white",
          fontSize: "14px", fontWeight: "500", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px", boxSizing: "border-box" as const,
        }}>
          <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: "18px", height: "18px" }} />
          Continue with Google
        </button>

      </div>

      {/* Círculos decorativos */}
      <div style={{ position: "fixed", bottom: "40px", right: "40px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#DA007C" }} />
        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#C8E535" }} />
        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#FF6B35" }} />
      </div>

    </div>
  );
}