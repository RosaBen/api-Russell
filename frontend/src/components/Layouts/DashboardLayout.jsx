import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout({ isConnected }) {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    isConnected && (
      <>
        <nav className="dashboard-nav">
          <div className="dashboard-links">
            <NavLink
              to="/dashboard/users"
              // target="_blank"
              // rel="noopener noreferrer"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Utilisateurs
            </NavLink>
            <NavLink
              to="/dashboard/catways"
              // target="_blank"
              // rel="noopener noreferrer"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Pontons
            </NavLink>
            <NavLink
              to="/dashboard/reservations"
              // target="_blank"
              // rel="noopener noreferrer"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              Réservations
            </NavLink>
          </div>
          <button className="dashboard-logout-btn">Déconnexion</button>
        </nav>
        <Outlet />
      </>
    )
  );
}
