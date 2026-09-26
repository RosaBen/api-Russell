export default function User({ user }) {
  return (
    <article className="user-card">
      <p>{user.username}</p>
      <p>{user.email}</p>
      <div className="btns">
        <button className="edit-btn">Modifier</button>
        <button className="delete-btn">Supprimer</button>
      </div>
    </article>
  );
}
