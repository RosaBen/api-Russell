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
  handleDelete,
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

  return (
    <>
      {!showForm && (
        <article className="user-card">
          <>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </>
          <div className="btns">
            {isUsersPage && <button onClick={handleViewUser}>Voir</button>}
            {!isUsersPage && (
              <div className="edit-del-btns">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditForm({
                      username: user.username,
                      email: user.email,
                      password: "",
                    });
                    setShowForm(true);
                  }}
                >
                  Modifier
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </article>
      )}
      {showForm && (
        <div className="form-page">
          <UserForm
            submitText="Modifier"
            inputChange={handleChange(setEditForm)}
            submit={handleEdit}
            form={editForm}
          />
          <button onClick={() => setShowForm(false)}>X</button>
        </div>
      )}
    </>
  );
}
