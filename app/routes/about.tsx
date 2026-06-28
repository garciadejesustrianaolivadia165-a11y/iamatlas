import { Link } from "react-router";
import { useState } from "react";

const navItems = [
  {
    label: "Inicio", href: "/",
    dropdown: [
      { label: "Overview",  href: "/dashboard" },
      { label: "Profile",   href: "/profile" },
      { label: "Calendar",  href: "/calendar" },
      { label: "Settings",  href: "/settings" },
    ],
  },
  {
    label: "Acerca de", href: "/about",
    dropdown: [
      { label: "Quiénes somos",   href: "/about" },
      { label: "Directorio",      href: "/about" },
      { label: "Actualizaciones", href: "/about" },
    ],
  },
  {
    label: "Términos y condiciones", href: "/legal",
    dropdown: [
      { label: "Política de Privacidad", href: "/legal" },
      { label: "Políticas de Seguridad", href: "/legal" },
    ],
  },
  {
    label: "Establecimientos", href: "/establecimientos",
    dropdown: [
      { label: "Business Hub", href: "/business-hub" },
      { label: "Tendencias",   href: "/establecimientos/tendencias" },
    ],
  },
];

export default function About() {
  const [dark, setDark] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .lp { font-family: 'Space Grotesk', system-ui, sans-serif; color: #1a1a1a; overflow-x: hidden; background: white; position: relative; transition: background 0.35s ease, color 0.35s ease; }
        .lp *, .lp *::before, .lp *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .lp.dark { background: #0d0d0d; color: white; }

        /* NAV */
        .lp-nav { position: fixed; top: 0; left: 0; right: 0; width: 100%; z-index: 200; background: rgba(255,255,255,0.90); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.35); height: 72px; padding: 0 clamp(24px,4vw,56px); display: flex; align-items: center; justify-content: space-between; transition: background 0.35s ease, border-color 0.35s ease; }
        .lp.dark .lp-nav { background: rgba(13,13,13,0.94); border-bottom-color: rgba(255,255,255,0.10); }
        .lp-nav-links { display: flex; align-items: center; gap: clamp(20px,3vw,44px); }
        .lp-nav-item { position: relative; display: flex; align-items: center; }
        .lp-nav-item::after { content: ""; position: absolute; top: 100%; left: -20px; right: -20px; height: 26px; }
        .lp-nav-link { font-size: clamp(12px,1vw,14px); font-weight: 500; color: #1a1a1a; text-decoration: none; white-space: nowrap; transition: color .15s; }
        .lp.dark .lp-nav-link { color: #e0e0e0; }
        .lp-nav-item:hover .lp-nav-link { color: #DA007C; }
        .lp-dropdown { display: none; position: absolute; top: calc(100% + 18px); left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.18); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.40); border-radius: 14px; padding: 8px; min-width: 210px; box-shadow: 0 16px 48px rgba(0,0,0,0.10); z-index: 300; transition: background 0.35s ease; }
        .lp.dark .lp-dropdown { background: rgba(18,18,18,0.95); border-color: rgba(255,255,255,0.12); }
        .lp-dropdown::before { content: ""; position: absolute; top: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 10px; height: 10px; background: rgba(255,255,255,0.22); border-left: 1px solid rgba(255,255,255,0.40); border-top: 1px solid rgba(255,255,255,0.40); }
        .lp-nav-item:hover .lp-dropdown { display: block; }
        .lp-dropdown-item { display: block; padding: 10px 18px; border-radius: 9px; font-size: 13px; font-weight: 500; color: #1a1a1a; text-decoration: none; font-family: inherit; transition: background .15s, color .15s; white-space: nowrap; }
        .lp.dark .lp-dropdown-item { color: #e0e0e0; }
        .lp-dropdown-item:hover { background: rgba(218,0,124,0.10); color: #DA007C; }
        .lp-nav-cta { padding: 13px clamp(44px,5vw,72px); border-radius: 100px; background: #DA007C; color: white; border: 2px solid #DA007C; font-size: clamp(13px,1.1vw,15px); font-weight: 600; text-decoration: none; font-family: inherit; transition: background 0.2s ease, color 0.2s ease; white-space: nowrap; min-width: 150px; text-align: center; }
        .lp-nav-cta:hover { background: rgba(218,0,124,0.12); color: #DA007C; }
        .lp-dark-toggle { width: 52px; height: 28px; border-radius: 100px; border: 2px solid #ddd; background: #f0f0f0; cursor: pointer; position: relative; padding: 0; outline: none; transition: background 0.3s ease, border-color 0.3s ease; flex-shrink: 0; }
        .lp.dark .lp-dark-toggle { background: #111; border-color: #555; }
        .lp-dark-toggle-knob { position: absolute; top: 2px; width: 20px; height: 20px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 4px rgba(0,0,0,0.22); transition: left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease; color: #666; }
        .lp.dark .lp-dark-toggle-knob { background: #2a2a2a; color: #bbb; }

        /* WAVE BG */
        .ab-bg-wave { position: absolute; top: 0; left: 0; width: 100%; height: auto; pointer-events: none; z-index: 0; mix-blend-mode: multiply; }
        .lp.dark .ab-bg-wave { filter: invert(1) hue-rotate(180deg); mix-blend-mode: screen; opacity: 0.35; }

        /* HERO */
        .ab-hero { background: transparent; padding: clamp(80px,10vw,140px) clamp(32px,6vw,96px) clamp(60px,8vw,100px); text-align: center; position: relative; }
        .ab-hero-img { display: block; width: clamp(400px,82vw,1080px); max-width: 100%; margin: 0 auto clamp(20px,2.5vw,36px); mix-blend-mode: multiply; }
        .lp.dark .ab-hero-img { mix-blend-mode: normal; }
        .ab-hero-sub { font-size: clamp(14px,1.4vw,18px); color: #555; line-height: 1.7; max-width: 640px; margin: 0 auto; transition: color 0.35s ease; }
        .lp.dark .ab-hero-sub { color: #999; }

        /* MISIÓN / VISIÓN / VALORES */
        .ab-mvv { background: transparent; padding: clamp(40px,6vw,96px) clamp(32px,6vw,96px); position: relative; }
        .ab-mvv-row { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px,5vw,72px); margin-bottom: clamp(48px,6vw,88px); }
        .ab-mvv-card { display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 420px; margin: 0 auto; }
        .ab-mvv-icon { margin-bottom: 18px; }
        .ab-mvv-icon img { width: clamp(48px,5.5vw,72px); height: clamp(48px,5.5vw,72px); object-fit: contain; display: block; mix-blend-mode: multiply; }
        .lp.dark .ab-mvv-icon img { filter: invert(1) hue-rotate(180deg); mix-blend-mode: screen; }
        .ab-mvv-title { font-size: clamp(20px,2vw,26px); font-weight: 700; color: #1a1a1a; margin-bottom: clamp(10px,1.2vw,16px); transition: color 0.35s ease; }
        .lp.dark .ab-mvv-title { color: white; }
        .ab-mvv-title .pink { color: #DA007C; }
        .ab-mvv-title-img { display: block; width: clamp(180px,18vw,280px); max-width: 100%; margin: 0 auto clamp(10px,1.2vw,16px); }
        .ab-mvv-body { font-size: clamp(13px,1vw,15px); color: #555; line-height: 1.75; transition: color 0.35s ease; }
        .lp.dark .ab-mvv-body { color: #999; }
        .ab-mvv-center { display: flex; justify-content: center; }
        .ab-mvv-center .ab-mvv-card { align-items: center; text-align: center; max-width: 480px; }

        /* STATS */
        .ab-stats { background: transparent; padding: clamp(32px,4vw,56px) clamp(16px,2vw,32px); position: relative; }
        .ab-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: clamp(10px,1.2vw,16px); }
        .ab-stat-card { display: flex; align-items: center; gap: clamp(12px,1.4vw,20px); background: #c8f07a; border-radius: 100px; padding: clamp(16px,1.8vw,22px) clamp(22px,2.4vw,32px) clamp(16px,1.8vw,22px) clamp(12px,1.2vw,16px); box-shadow: 0 20px 52px rgba(0,0,0,0.18); cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .ab-stat-card:hover { transform: translateY(-7px); box-shadow: 0 28px 64px rgba(0,0,0,0.22); }
        .ab-stat-icon { width: clamp(68px,7.5vw,92px); height: clamp(68px,7.5vw,92px); border-radius: 50%; background: #1e4a08; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ab-stat-icon svg { width: 50%; height: 50%; }
        .ab-stat-num { font-size: clamp(34px,4vw,56px); font-weight: 800; color: #1a2e05; line-height: 1; }
        .ab-stat-label { font-size: clamp(11px,0.9vw,14px); color: #3a5a14; margin-top: 4px; font-weight: 500; }

        /* CTA */
        .ab-cta { background: transparent; padding: clamp(64px,8vw,120px) clamp(32px,6vw,96px); text-align: center; position: relative; }
        .ab-cta-title { display: block; width: clamp(320px,55vw,840px); max-width: 100%; margin: 0 auto clamp(16px,2vw,24px); }
        .ab-cta-body { font-size: clamp(13px,1.1vw,15px); color: #888; max-width: 640px; margin: 0 auto clamp(28px,3.5vw,48px); line-height: 1.7; transition: color 0.35s ease; }
        .lp.dark .ab-cta-body { color: #666; }
        .ab-cta-btn { display: inline-block; padding: clamp(13px,1.2vw,18px) clamp(36px,4vw,64px); border-radius: 100px; background: #DA007C; color: white; border: 2px solid #DA007C; font-size: clamp(14px,1.2vw,16px); font-weight: 700; text-decoration: none; font-family: inherit; transition: background 0.2s ease, color 0.2s ease; }
        .ab-cta-btn:hover { background: rgba(218,0,124,0.12); color: #DA007C; }

        /* FOOTER */
        .lp-footer { background: white; padding: clamp(40px,5vw,72px) clamp(32px,6vw,96px) clamp(24px,3vw,48px); transition: background 0.35s ease; }
        .lp.dark .lp-footer { background: #0d0d0d; }
        .lp-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.2fr; gap: clamp(24px,4vw,56px); margin-bottom: clamp(32px,4vw,56px); }
        .lp-footer-brand-name { font-size: clamp(15px,1.4vw,20px); font-weight: 800; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .lp-footer-brand p { font-size: clamp(12px,1vw,14px); color: #555; line-height: 1.7; max-width: 220px; transition: color 0.35s ease; }
        .lp.dark .lp-footer-brand p { color: #999; }
        .lp-footer-col h4 { font-size: clamp(12px,1vw,14px); font-weight: 700; color: #1a1a1a; margin-bottom: 16px; transition: color 0.35s ease; }
        .lp.dark .lp-footer-col h4 { color: white; }
        .lp-footer-col ul { list-style: none; }
        .lp-footer-col ul li { margin-bottom: 10px; }
        .lp-footer-col ul li a { font-size: clamp(12px,1vw,14px); color: #555; text-decoration: none; transition: color 0.35s ease; }
        .lp.dark .lp-footer-col ul li a { color: #999; }
        .lp-footer-col ul li a:hover { color: #DA007C; }
        .lp-footer-col p { font-size: clamp(12px,1vw,14px); color: #555; line-height: 1.7; transition: color 0.35s ease; }
        .lp.dark .lp-footer-col p { color: #999; }
        .lp-footer-bottom { position: relative; display: flex; justify-content: space-between; align-items: center; padding-top: 36px; border-top: 2px solid #1a1a1a; transition: border-color 0.35s ease; }
        .lp.dark .lp-footer-bottom { border-top-color: rgba(255,255,255,0.10); }
        .lp-footer-copy { font-size: 12px; color: #555; transition: color 0.35s ease; }
        .lp.dark .lp-footer-copy { color: #999; }
        .lp-footer-socials { display: flex; gap: 10px; position: absolute; right: 0; top: -18px; background: white; padding-left: 10px; transition: background 0.35s ease; }
        .lp.dark .lp-footer-socials { background: #0d0d0d; }
        .lp-footer-social { width: 36px; height: 36px; border-radius: 50%; background: #1a1a1a; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: background .2s; }
        .lp.dark .lp-footer-social { background: #222; }
        .lp-footer-social:hover { background: #444; }
        .lp-footer-social svg { width: 15px; height: 15px; fill: white; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .lp-nav { padding: 0 20px; height: 60px; }
          .lp-nav-links { display: none; }
          .ab-hero { padding: 80px 24px 48px; }
          .ab-mvv { padding: 40px 24px; }
          .ab-mvv-row { grid-template-columns: 1fr; gap: 40px; }
          .ab-stats { padding: 32px 20px; }
          .ab-stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .ab-stat-card { padding: 8px 12px 8px 8px; }
          .ab-stat-num { font-size: 22px; }
          .ab-cta { padding: 48px 24px; }
          .lp-footer { padding: 48px 24px 32px; }
          .lp-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
      `}</style>

      <div className={`lp${dark ? " dark" : ""}`}>
        <img src="/isolation_mode_01_Lineup.jpg" className="ab-bg-wave" alt="" />

        {/* NAVBAR */}
        <nav className="lp-nav">
          <Link to="/">
            <img src={dark ? "/Atlas_blanco.svg" : "/atlas.svg"} alt="Atlas" style={{ height: "72px", display: "block" }} />
          </Link>
          <div className="lp-nav-links">
            {navItems.map((item) => (
              <div key={item.label} className="lp-nav-item">
                <Link to={item.href} className="lp-nav-link">{item.label}</Link>
                <div className="lp-dropdown">
                  {item.dropdown.map((sub) => (
                    <Link key={sub.label} to={sub.href} className="lp-dropdown-item">{sub.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              onClick={() => setDark(d => !d)}
              className="lp-dark-toggle"
              aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              <span className="lp-dark-toggle-knob" style={{ left: dark ? "calc(100% - 22px)" : "2px" }}>
                {dark ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                )}
              </span>
            </button>
            <Link to="/login" className="lp-nav-cta">Iniciar Cuenta</Link>
          </div>
        </nav>

        <div style={{ height: "72px" }} />

        {/* HERO */}
        <section className="ab-hero">
          <img
            src={dark ? "/titulo_dark.svg" : "/titulo_acerca_de.jpg"}
            alt="Transformando la gestión deportiva con inteligencia artificial"
            className="ab-hero-img"
          />
          <p className="ab-hero-sub">
            ENSO y Atlas unen fuerzas para crear la plataforma líder de gestión y reservas deportivas en República Dominicana y el Caribe.
          </p>
        </section>

        {/* MISIÓN / VISIÓN / VALORES */}
        <section className="ab-mvv">
          <div className="ab-mvv-row">

            {/* Nuestra Misión */}
            <div className="ab-mvv-card">
              <div className="ab-mvv-icon">
                <img src="/vector1.jpg" alt="Misión" />
              </div>
              {dark
                ? <img src="/mision_dark.svg" alt="Nuestra Misión" className="ab-mvv-title-img" />
                : <h2 className="ab-mvv-title">Nuestra <span className="pink">Misión</span></h2>
              }
              <p className="ab-mvv-body">
                Empoderar a los establecimientos deportivos con herramientas tecnológicas de primer nivel, conectándolos con una comunidad apasionada en un ecosistema digital sin fricciones.
              </p>
            </div>

            {/* Nuestra Visión */}
            <div className="ab-mvv-card">
              <div className="ab-mvv-icon">
                <img src="/vector3.jpg" alt="Visión" />
              </div>
              {dark
                ? <img src="/vision%20dark.svg" alt="Nuestra Visión" className="ab-mvv-title-img" />
                : <h2 className="ab-mvv-title">Nuestra <span className="pink">Visión</span></h2>
              }
              <p className="ab-mvv-body">
                Ser la plataforma número uno del Caribe para gestión deportiva, donde cada reserva sea tan fácil como enviar un mensaje de WhatsApp.
              </p>
            </div>

          </div>

          {/* Nuestros Valores */}
          <div className="ab-mvv-center">
            <div className="ab-mvv-card">
              <div className="ab-mvv-icon">
                <img src="/vector2.jpg" alt="Valores" />
              </div>
              {dark
                ? <img src="/valores%20dark.svg" alt="Nuestros Valores" className="ab-mvv-title-img" />
                : <h2 className="ab-mvv-title">Nuestros <span className="pink">Valores</span></h2>
              }
              <p className="ab-mvv-body">
                Innovación, accesibilidad y excelencia. Creemos que la tecnología debe simplificar la vida, no complicarla. Cada línea de código está pensada para ti.
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="ab-stats">
          <div className="ab-stats-grid">

            {/* 50+ Establecimientos — badge-percent */}
            <div className="ab-stat-card">
              <div className="ab-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                  <line x1="9" y1="15" x2="15" y2="9"/>
                  <circle cx="9.5" cy="9.5" r="0.6" fill="white" stroke="none"/>
                  <circle cx="14.5" cy="14.5" r="0.6" fill="white" stroke="none"/>
                </svg>
              </div>
              <div>
                <div className="ab-stat-num">50+</div>
                <div className="ab-stat-label">Establecimientos</div>
              </div>
            </div>

            {/* 10k+ Reservas — credit card */}
            <div className="ab-stat-card">
              <div className="ab-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="13" rx="3"/>
                  <line x1="2" y1="11" x2="22" y2="11"/>
                  <line x1="6" y1="16" x2="10" y2="16"/>
                </svg>
              </div>
              <div>
                <div className="ab-stat-num">10k+</div>
                <div className="ab-stat-label">Reservas mensuales</div>
              </div>
            </div>

            {/* 24/7 Disponibilidad — clock */}
            <div className="ab-stat-card">
              <div className="ab-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <polyline points="12 7 12 12 15.5 14.5"/>
                </svg>
              </div>
              <div>
                <div className="ab-stat-num">24/7</div>
                <div className="ab-stat-label">Disponibilidad</div>
              </div>
            </div>

            {/* 98% Conexiones — file-check */}
            <div className="ab-stat-card">
              <div className="ab-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <polyline points="9 13 11 15 15 11"/>
                </svg>
              </div>
              <div>
                <div className="ab-stat-num">98%</div>
                <div className="ab-stat-label">Conexiones activas</div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <section className="ab-cta">
          <img
            src={dark ? "/Texto_05_dark.svg" : "/Texto_05.svg"}
            alt="¿Listo para revolucionar tus reservaciones?"
            className="ab-cta-title"
          />
          <p className="ab-cta-body">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <Link to="/signup" className="ab-cta-btn">Empieza hoy</Link>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <div className="lp-footer-brand-name">
                <img src="/Atlas_completo.svg" alt="iam atlas" style={{ height: "48px", display: "block" }} />
              </div>
              <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p style={{ marginTop: "12px", fontSize: "12px" }}>@Atlas</p>
            </div>

            <div className="lp-footer-col">
              <h4>About us</h4>
              <ul>
                <li><a href="/">Zeux</a></li>
                <li><a href="/">Portfolio</a></li>
                <li><a href="/">Careers</a></li>
                <li><a href="/">Contact us</a></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h4>Contact us</h4>
              <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p style={{ marginTop: "10px" }}>+908 89097 890</p>
            </div>

            <div className="lp-footer-col" />
          </div>

          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">ALTLAS @2026</span>
            <div className="lp-footer-socials">
              <a href="/" className="lp-footer-social" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="/" className="lp-footer-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="/" className="lp-footer-social" aria-label="X">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="/" className="lp-footer-social" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
