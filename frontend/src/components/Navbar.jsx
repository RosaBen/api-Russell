import { Link } from "react-router-dom";

export default function Navbar({ classDesktop }) {
  return (
    <nav className={classDesktop}>
      <Link
        to="/"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        Accueil
      </Link>
      <Link
        to="/users"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        Utilisateurs
      </Link>
      <Link
        to="/catways"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        Pontons
      </Link>
    </nav>
  );
}
