import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getUser, editUser, deleteUser } from "../../assets/scripts/fetchUsers";
import UserCard from "../../components/dashboard/UserCard";

export default function User({
  handleChange,
  errors,
  handleUserError,
  isConnected,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [email, setEmail] = useState(
    () => location.state?.email || sessionStorage.getItem("selectedUser") || "",
  );
  const [showEditForm, setShowEditForm] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  async function fetchUser() {
    if (!email) {
      setUser(null);
      setLoadingUser(false);
      return;
    }
    setLoadingUser(true);
    try {
      const userData = await getUser(email);
      setUser(userData);
      sessionStorage.setItem("selectedUser", userData.email);
    } catch (error) {
      console.error(error.message);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    handleUserError(editForm);
    try {
      const currentEmail = email;
      await editUser(currentEmail, editForm);
      const nextEmail = editForm.email?.trim() || currentEmail;
      if (nextEmail !== currentEmail) {
        sessionStorage.setItem("selectedUser", nextEmail);
        setEmail(nextEmail);
      } else {
        const newData = await getUser(currentEmail);
        setUser(newData);
      }

      setShowEditForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(email);
      sessionStorage.removeItem("selectedUser");
      navigate("/users");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [email]);

  if (loadingUser) {
    return <p>Chargement ...</p>;
  }
  return (
    <main className="user-page">
      <UserCard
        user={user}
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        setEditForm={setEditForm}
        handleEdit={handleEdit}
        handleChange={handleChange}
        editForm={editForm}
        handleDelete={handleDelete}
        errors={errors}
        isConnected={isConnected}
      />
      {!showEditForm && (
        <Link
          to="/users"
          // target="_blank" rel="noopener noreferrer"
          onClick={() => sessionStorage.removeItem("selectedUser")}
        >
          Liste des utilisateurs
        </Link>
      )}
    </main>
  );
}
