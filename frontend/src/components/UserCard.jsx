import { Link, useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  if (!user) return null;
  const navigate = useNavigate();
  const handleClickUser = () => {
    sessionStorage.setItem("selectedUser", user.email);
    navigate(`/user`, {
      state: {
        email: user.email,
      },
    });
  };
  return (
    <article className="user-card">
      <p>{user.username}</p>
      <p>{user.email}</p>
      <div className="btns">
        <button onClick={handleClickUser}>Voir</button>
        <button className="edit-btn">Modifier</button>
        <button className="delete-btn">Supprimer</button>
      </div>
    </article>
  );
}
