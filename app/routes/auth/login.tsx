import { Link } from "react-router";

export default function Login() {
  return (
    <>
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          background-color: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 24px 16px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .login-bg-top {
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

        .login-bg-bottom {
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

        /* Glass card — el blur solo aquí */
        .login-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          padding: 40px 32px;
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

        .login-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          text-align: center;
        }

        .login-subtitle {
          font-size: 14px;
          color: #555;
          margin: 0;
          text-align: center;
        }

        .login-input {
          width: 100%;
          padding: 12px 20px;
          border-radius: 100px;
          border: 1px solid rgba(200, 200, 200, 0.8);
          font-size: 14px;
          box-sizing: border-box;
          outline: none;
          background: rgba(255, 255, 255, 0.80);
          color: #000;
          display: block;
        }

        .login-btn-outline {
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
        .login-btn-outline:hover {
          background: rgba(218, 0, 124, 0.12);
        }

        .login-btn-google {
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

        .login-dots {
          position: fixed;
          bottom: 40px;
          right: 40px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 3;
        }

        .login-legal {
          text-align: center;
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .login-links {
          text-align: center;
          font-size: 13px;
          color: #444;
          line-height: 1.8;
        }

        @media (max-width: 480px) {
          .login-card { padding: 32px 20px; gap: 14px; border-radius: 18px; }
          .login-title { font-size: 22px; }
          .login-subtitle { font-size: 13px; }
          .login-input { padding: 10px 16px; font-size: 13px; }
          .login-btn-outline { padding: 12px; font-size: 14px; }
          .login-btn-google { padding: 12px; font-size: 13px; }
          .login-dots { bottom: 16px; right: 16px; }
        }

        @media (max-width: 360px) {
          .login-card { padding: 24px 12px; }
          .login-title { font-size: 20px; }
        }
      `}</style>

      <div className="login-wrapper">

        <div className="login-bg-top" />
        <div className="login-bg-bottom" />

        <div className="login-card">

          <img src="/atlas.svg" alt="Atlas" style={{ width: "64px", marginBottom: "8px" }} />

          <h1 className="login-title">¡Bienvenido de nuevo!</h1>
          <p className="login-subtitle">Inicia sesión en tu cuenta de Atlas</p>

          <div style={{ width: "100%" }}>
            <label style={{ fontSize: "13px", color: "#333", display: "block", marginBottom: "6px" }}>
              Correo electrónico *
            </label>
            <input type="email" placeholder="correo@ejemplo.com" className="login-input" />
          </div>

          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", color: "#333" }}>Contraseña *</label>
              <span style={{ fontSize: "13px", color: "#666", cursor: "pointer" }}>
                ¿Olvidaste la contraseña?
              </span>
            </div>
            <input type="password" placeholder="••••••••" className="login-input" />
          </div>

          <Link to="/dashboard" className="login-btn-outline">
            Iniciar Sección
          </Link>

          <div className="login-links">
            <p style={{ margin: 0 }}>
              No tienes cuenta?{" "}
              <Link to="/signup" style={{ color: "#DA007C", textDecoration: "none" }}>Regístrate aquí</Link>
            </p>
            <p style={{ margin: 0 }}>
              Si no has confirmado,{" "}
              <Link to="/signup" style={{ color: "#DA007C", textDecoration: "none" }}>Confirma aquí</Link>
            </p>
          </div>

          <p className="login-legal">
            Al iniciar sesión, aceptas nuestros{" "}
            <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>Términos y Condiciones</Link>
            {" "}y{" "}
            <Link to="/legal" style={{ color: "#777", textDecoration: "underline" }}>Política de Privacidad</Link>
          </p>

          <button className="login-btn-google">
            <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: "18px", height: "18px" }} />
            Continue with Google
          </button>

        </div>

        

      </div>
    </>
  );
}