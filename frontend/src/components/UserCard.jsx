import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  if (!user) return null;
  return (
    <article className="user-card">
      <p>{user.username}</p>
      <p>{user.email}</p>
      <div className="btns">
        <Link to={`/users/${encodeURIComponent(user.email)}`}>
          Voir {`${user.username}`}
        </Link>
        <button className="edit-btn">Modifier</button>
        <button className="delete-btn">Supprimer</button>
      </div>
    </article>
  );
}
