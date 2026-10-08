import { useLocation, Link } from "react-router-dom";
import UserForm from "./UserForm";

export default function UserCard({
  user,
  handleChange,
  showEditForm,
  setShowEditForm,
  setEditForm,
  handleEdit,
  editForm,
  handleDelete,
  errors,
}) {
  if (!user) return null;
  const location = useLocation();
  const isUsersPage = location.pathname === "/users";
  const sessionStorageUser = () => {
    sessionStorage.setItem("selectedUser", user.email);
  };

  return (
    <>
      {!showEditForm && (
        <article className="user-card">
          <>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </>
          <div className="btns">
            {isUsersPage && (
              <Link to="/user" onClick={sessionStorageUser} className="blue">
                Plus d'infos
              </Link>
            )}
            {!isUsersPage && (
              <div className="edit-del-btns">
                <button
                  className="edit-btn orange"
                  aria-expanded={showEditForm}
                  aria-label="Modifier l'utilisateur"
                  aria-controls="user-form"
                  onClick={() => {
                    setEditForm({
                      username: user.username,
                      email: user.email,
                      password: "",
                    });
                    setShowEditForm(true);
                  }}
                >
                  Modifier
                </button>
                <button className="delete-btn red" onClick={handleDelete}>
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </article>
      )}
      {showEditForm && (
        <div className="form-page">
          <UserForm
            submitText="Modifier"
            inputChange={handleChange(setEditForm)}
            submit={handleEdit}
            form={editForm}
            btnColor="orange"
            errors={errors}
          />
          <button
            onClick={() => setShowEditForm(false)}
            aria-label="Fermer le formulaire"
          >
            X
          </button>
        </div>
      )}
    </>
  );
}
