import { Link } from "react-router";

export default function Signup() {
  return (
    <>
      <style>{`
        .signup-wrapper {
          min-height: 100vh;
          background-color: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 32px 16px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .signup-bg-top {
          position: absolute;
          inset: -5%;
          background-image: url('/arriba2.svg');
          background-size: cover;
          background-position: top center;
          background-repeat: no-repeat;
          filter: blur(0.5px);
          animation: driftTop 20s ease-in-out infinite;
          transform-origin: center;
          z-index: 0;
        }

        .signup-bg-bottom {
          position: absolute;
          inset: -5%;
          background-image: url('/abajo6.svg');
          background-size: cover;
          background-position: bottom center;
          background-repeat: no-repeat;
          filter: blur(0.5px);
          animation: driftBottom 22s ease-in-out infinite;
          transform-origin: center;
          z-index: 0;
        }

        @keyframes driftTop {
          0%   { transform: translate(0%, 0%) scale(1.05); }
          25%  { transform: translate(-2%, 2%) scale(1.07); }
          50%  { transform: translate(2%, -1%) scale(1.05); }
          75%  { transform: translate(-1%, 3%) scale(1.08); }
          100% { transform: translate(0%, 0%) scale(1.05); }
        }

        @keyframes driftBottom {
          0%   { transform: translate(0%, 0%) scale(1.05); }
          25%  { transform: translate(2%, -2%) scale(1.07); }
          50%  { transform: translate(-2%, 1%) scale(1.06); }
          75%  { transform: translate(1%, -3%) scale(1.08); }
          100% { transform: translate(0%, 0%) scale(1.05); }
        }

        /* Glass card */
        .signup-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 680px;
          padding: 40px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
        }

        .signup-title {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          text-align: center;
        }

        .signup-subtitle {
          font-size: 14px;
          color: #555;
          margin: 0;
          text-align: center;
        }

        /* Grids responsivos */
        .grid-3 {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }

        .grid-2 {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .signup-input,
        .signup-select {
          width: 100%;
          padding: 11px 16px;
          border-radius: 100px;
          border: 1px solid rgba(200, 200, 200, 0.8);
          font-size: 13px;
          box-sizing: border-box;
          outline: none;
          background: rgba(255, 255, 255, 0.80);
          color: #000;
          display: block;
        }

        .signup-select {
          cursor: pointer;
          appearance: auto;
        }

        .signup-phone-row {
          display: flex;
          gap: 8px;
        }

        .signup-phone-select {
          padding: 11px 8px;
          border-radius: 100px;
          border: 1px solid rgba(200, 200, 200, 0.8);
          font-size: 13px;
          background: rgba(255, 255, 255, 0.80);
          color: #000;
          cursor: pointer;
          outline: none;
          min-width: 90px;
        }

        .signup-phone-input {
          flex: 1;
          padding: 11px 16px;
          border-radius: 100px;
          border: 1px solid rgba(200, 200, 200, 0.8);
          font-size: 13px;
          box-sizing: border-box;
          outline: none;
          background: rgba(255, 255, 255, 0.80);
          color: #000;
        }

        .signup-btn-outline {
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          border: 2px solid #DA007C;
          background: transparent;
          color: #DA007C;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          box-sizing: border-box;
          display: block;
          transition: background 0.2s ease;
        }
        .signup-btn-outline:hover {
          background: rgba(218, 0, 124, 0.12);
        }

        .signup-btn-google {
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          border: none;
          background: rgba(136, 136, 136, 0.78);
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-sizing: border-box;
        }

        .signup-legal {
          text-align: center;
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .signup-dots {
          position: fixed;
          bottom: 40px;
          right: 40px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 3;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .grid-3 {
            grid-template-columns: 1fr 1fr;
          }
          .grid-3 > :last-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .signup-card {
            padding: 32px 20px;
            gap: 14px;
            border-radius: 18px;
          }

          .signup-title { font-size: 22px; }
          .signup-subtitle { font-size: 13px; }

          .grid-3 {
            grid-template-columns: 1fr;
          }
          .grid-3 > :last-child {
            grid-column: auto;
          }

          .grid-2 {
            grid-template-columns: 1fr;
          }

          .signup-btn-outline { padding: 12px; font-size: 14px; }
          .signup-btn-google { padding: 12px; font-size: 13px; }
          .signup-dots { bottom: 16px; right: 16px; }
        }

        @media (max-width: 360px) {
          .signup-card { padding: 24px 12px; }
          .signup-title { font-size: 20px; }
        }
      `}</style>

      <div className="signup-wrapper">

        <div className="signup-bg-top" />
        <div className="signup-bg-bottom" />

        <div className="signup-card">

          <img src="/atlas.svg" alt="Atlas" style={{ width: "64px", marginBottom: "8px" }} />

          <h1 className="signup-title">Crear tu cuenta</h1>
          <p className="signup-subtitle">Crea tu cuenta en Atlas.</p>

          {/* Fila 1: Nombre, Apellido, Género */}
          <div className="grid-3">
            <div>
              <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
                Nombre *
              </label>
              <input type="text" placeholder="Tu nombre" className="signup-input" />
            </div>

            <div>
              <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
                Apellido *
              </label>
              <input type="text" placeholder="Tu apellido" className="signup-input" />
            </div>

            <div>
              <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
                Género *
              </label>
              <select defaultValue="" className="signup-select">
                <option value="" disabled>Seleccionar</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="indefinido">Indefinido</option>
              </select>
            </div>
          </div>

          {/* Fila 2: Email + Teléfono */}
          <div className="grid-2">
            <div>
              <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
                Correo electrónico *
              </label>
              <input type="email" placeholder="correo@ejemplo.com" className="signup-input" />
            </div>

            <div>
              <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
                Teléfono *
              </label>
              <div className="signup-phone-row">
                <select defaultValue="+1do" className="signup-phone-select">
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
                <input type="tel" placeholder="(000) 000-0000" className="signup-phone-input" />
              </div>
            </div>
          </div>

          {/* Contraseña */}
          <div style={{ width: "100%" }}>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Contraseña *
            </label>
            <input type="password" placeholder="••••••••" className="signup-input" />
          </div>

          {/* Confirmar contraseña */}
          <div style={{ width: "100%" }}>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Confirmar contraseña *
            </label>
            <input type="password" placeholder="••••••••" className="signup-input" />
          </div>

          <Link to="/dashboard" className="signup-btn-outline">
            Crear Cuenta
          </Link>

          <p style={{ margin: 0, fontSize: "13px" }}>
            <Link to="/login" style={{ color: "#DA007C", textDecoration: "none" }}>
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </p>

          <p className="signup-legal">
            Al crear tu cuenta, aceptas nuestros{" "}
            <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>Términos y Condiciones</Link>
            {" "}y{" "}
            <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>Política de Privacidad</Link>
          </p>

          <button className="signup-btn-google">
            <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: "18px", height: "18px" }} />
            Continue with Google
          </button>

        </div>

        

      </div>
    </>
  );
}