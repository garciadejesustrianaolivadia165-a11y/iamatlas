import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const IconBusiness = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
  </svg>
);

const IconProfile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const IconSettings = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

const IconSubscriptions = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM12 6l1.5 3 3.5.5-2.5 2.5.5 3.5L12 14l-3 1.5.5-3.5L7 9.5l3.5-.5z"/>
  </svg>
);

const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#718EBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const navItems = [
  { to: "/dashboard",    label: "Overview",       Icon: IconHome          },
  { to: "/business-hub", label: "Business Hub",   Icon: IconBusiness      },
  { to: "/clubs",        label: "Suscripcions",   Icon: IconSubscriptions },
  { to: "/profile",      label: "Profile",        Icon: IconProfile       },
  { to: "/calendar",     label: "Calendar",       Icon: IconCalendar      },
  { to: "/legal",        label: "Setting",        Icon: IconSettings      },
];

const pageTitles: Record<string, string> = {
  "/dashboard":    "Overview",
  "/calendar":     "Calendar",
  "/business-hub": "Business Hub",
  "/clubs":        "Suscripcions",
  "/profile":      "Profile",
  "/settings":     "Settings",
  "/legal":        "Términos",
};

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

export default function DashboardLayout() {
  const location = useLocation();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, sidebarOpen]);

  const title = Object.entries(pageTitles).find(([path]) =>
    location.pathname === path || location.pathname.startsWith(path + "/")
  )?.[1] ?? "Atlas";

  const sidebarContent = (
    <>
      {navItems.map(({ to, label, Icon }) => {
        const active = location.pathname === to || location.pathname.startsWith(to + "/");
        return (
          <div key={to} style={{ position: "relative" }}>
            {active && (
              <div style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 5,
                height: 36,
                background: "#64A508",
                borderRadius: "0 6px 6px 0",
              }} />
            )}
            <Link
              to={to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 16px 12px 24px",
                borderRadius: "10px",
                marginLeft: "8px",
                marginRight: "8px",
                color: active ? "#64A508" : "#B0B7C3",
                background: active ? "#f3faeb" : "transparent",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: active ? "600" : "500",
                transition: "all 0.2s ease",
              }}
            >
              <Icon />
              {label}
            </Link>
          </div>
        );
      })}

      <div style={{ marginTop: "auto", paddingLeft: "24px", paddingBottom: "8px" }}>
        <Link to="/login" style={{ color: "#B0B7C3", fontSize: "13px", textDecoration: "none" }}>
          Cerrar sesión
        </Link>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f7fa" }}>

      {/* ── HEADER ── */}
      <header style={{
        display: "flex",
        alignItems: "center",
        background: "white",
        borderBottom: "1px solid #eee",
        padding: isMobile ? "0 16px" : "0 28px",
        height: "72px",
        gap: isMobile ? "12px" : "20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}>

        {isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#343C6A", flexShrink: 0 }}
          >
            <IconMenu />
          </button>
        )}

        <div style={{ minWidth: isMobile ? "auto" : "220px" }}>
          <img src="/logoOF.svg" alt="iam atlas" style={{ height: "44px", display: "block" }} />
        </div>

        {!isMobile && (
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#343C6A", margin: 0, flex: 1 }}>
            {title}
          </h1>
        )}

        {isMobile && <div style={{ flex: 1 }} />}

        {!isMobile && (
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#f0f0f5", borderRadius: "100px",
            padding: "8px 18px", width: "220px",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar"
              style={{ border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "#333", width: "100%" }}
            />
          </div>
        )}

        {!isMobile && (
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#718EBF" }}>
            <IconSettings />
          </button>
        )}

        {/* Bell con punto naranja — SVG */}
        <div style={{ position: "relative" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}>
            <IconBell />
          </button>
          <div style={{
            position: "absolute", top: "2px", right: "2px",
            width: "9px", height: "9px",
            background: "#FF6B35", borderRadius: "50%",
            border: "2px solid white",
          }} />
        </div>

        <img
          src="/fotoperfil.svg"
          alt="Perfil"
          style={{
            width: "44px", height: "44px", borderRadius: "50%",
            objectFit: "cover", cursor: "pointer",
            border: "2px solid #eee", flexShrink: 0,
          }}
        />
      </header>

      {/* ── CUERPO ── */}
      <div style={{ display: "flex", flex: 1 }}>

        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 199,
            }}
          />
        )}

        <aside style={
          isMobile
            ? {
                position: "fixed",
                top: 0,
                left: sidebarOpen ? 0 : "-260px",
                width: "240px",
                height: "100vh",
                background: "white",
                padding: "0 0 32px 0",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                zIndex: 200,
                boxShadow: sidebarOpen ? "4px 0 20px rgba(0,0,0,0.15)" : "none",
                transition: "left 0.3s ease",
                overflowY: "auto",
              }
            : {
                width: "220px",
                minWidth: "220px",
                background: "white",
                padding: "32px 16px 32px 0",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderRight: "1px solid #eee",
                boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
              }
        }>
          {isMobile && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 16px 12px 24px",
              borderBottom: "1px solid #f0f0f0",
              marginBottom: "8px",
            }}>
              <img src="/logoOF.svg" alt="iam atlas" style={{ height: "36px", display: "block" }} />
              <button
                onClick={() => setSidebarOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#B0B7C3", padding: "4px" }}
              >
                <IconClose />
              </button>
            </div>
          )}

          {sidebarContent}
        </aside>

        <main style={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}