import { Link } from "react-router-dom";

export default function Navbar({ classDesktop, onClick, isConnected }) {
  return (
    <nav className={classDesktop}>
      <Link
        to="/"
        // target="_blank"
        // rel="noopener noreferrer"
        onClick={onClick}
      >
        Accueil
      </Link>
      {!isConnected && (
        <>
          <Link
            to="/login"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={onClick}
          >
            Connexion
          </Link>
          <Link
            to="/register"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={onClick}
          >
            Créer un compte
          </Link>
        </>
      )}
      {isConnected && (
        <>
          <button className="logout-btn">Déconnexion</button>
          <Link
            to="/users"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={onClick}
          >
            Utilisateurs
          </Link>
          <Link
            to="/catways"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={onClick}
          >
            Pontons
          </Link>
          <Link
            to="/reservations"
            // target="_blank"
            // rel="noopener noreferrer"
            onClick={onClick}
          >
            Réservations
          </Link>
        </>
      )}
    </nav>
  );
}
