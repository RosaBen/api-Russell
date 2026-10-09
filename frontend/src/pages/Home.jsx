import { NavLink } from "react-router-dom";
export default function Home({ isConnected }) {
  return (
    <main className="home-page">
      <h1>Accueil</h1>
      <div className="description">
        <p>
          L'application sera utilisé par les employés de l'entreprise Russell's
          Catway
        </p>
        <p>Ils auront accès à un tableau de bord après s'être connecté</p>
      </div>
      <section className="list-pages">
        <h2>Pages:</h2>
        <ul>
          <li>Accès aux utilisateurs/employés</li>
          <li>Accès à la liste des Pontons</li>
          <li>Accès aux réservations</li>
        </ul>
      </section>
      <section className="list-actions">
        <h2>Actions:</h2>
        <ul>
          <li>Ajouter un élément</li>
          <li>Lire tous les éléments</li>
          <li>Lire chaque élément</li>
          <li>Modifier un élément</li>
          <li>Supprimer un élément</li>
        </ul>
      </section>
      <a
        href="#"
        // target="_blank" rel="noopener noreferrer"
      >
        Voir la documentation de l'api
      </a>
      {!isConnected && (
        <NavLink
          to="/login"
          // target="_blank"
          // rel="noopener noreferrer"
          className="home-connexion-btn"
        >
          Connexion
        </NavLink>
      )}
    </main>
  );
}
