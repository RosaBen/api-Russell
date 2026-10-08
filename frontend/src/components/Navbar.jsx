import { Link } from "react-router-dom";

export default function Navbar({ classDesktop, onClick }) {
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
      <Link
        to="/register"
        // target="_blank"
        // rel="noopener noreferrer"
        onClick={onClick}
      >
        Créer un compte
      </Link>
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
    </nav>
  );
}
