import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

export default function UserCard({
  user,
  handleChange,
  showForm,
  setShowForm,
  setEditForm,
  handleEdit,
  editForm,
}) {
  if (!user) return null;
  const navigate = useNavigate();
  const location = useLocation();
  const isUsersPage = location.pathname === "/users";

  const handleViewUser = () => {
    sessionStorage.setItem("selectedUser", user.email);
    navigate(`/user`, {
      state: {
        email: user.email,
      },
    });
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <article className="user-card">
      <p>{user.username}</p>
      <p>{user.email}</p>
      <div className="btns">
        {isUsersPage && <button onClick={handleViewUser}>Voir</button>}
        {!isUsersPage && (
          <div className="edit-del-btns">
            <button className="edit-btn" onClick={handleShowForm}>
              Modifier
            </button>
            <button className="delete-btn">Supprimer</button>
          </div>
        )}
      </div>
      {showForm && (
        <UserForm
          submitText="Modifier"
          inputChange={handleChange(setEditForm)}
          submit={handleEdit}
          form={editForm}
        />
      )}
    </article>
  );
}
