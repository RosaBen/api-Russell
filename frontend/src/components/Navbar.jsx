import { NavLink } from "react-router-dom";

export default function Navbar({ classNav, onClick, isConnected, logout }) {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <nav className={classNav}>
      <NavLink
        to="/"
        // target="_blank"
        // rel="noopener noreferrer"
        onClick={onClick}
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Accueil
      </NavLink>
      {!isConnected && (
        <>
          <NavLink
            to="/login"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={onClick}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Connexion
          </NavLink>
          <NavLink
            to="/register"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={onClick}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Créer un compte
          </NavLink>
        </>
      )}
      {isConnected && (
        <>
          <NavLink
            to="/dashboard"
            end
            onClick={onClick}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Tableau de bord
          </NavLink>
          <button className="logout-btn" onClick={logout}>
            Déconnexion
          </button>
        </>
      )}
    </nav>
  );
}
