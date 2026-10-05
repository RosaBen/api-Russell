import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, editUser, deleteUser } from "../assets/scripts/fetchUsers";
import UserCard from "../components/UserCard";

export default function User({ handleChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [email, setEmail] = useState(
    () => location.state?.email || sessionStorage.getItem("selectedUser") || "",
  );
  const [showForm, setShowForm] = useState(false);
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
        console.log("user modified");
      }

      setShowForm(false);
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
      console.log("user deleted");
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
    <main>
      <h1>Information sur l'utilisateur</h1>
      <UserCard
        user={user}
        showForm={showForm}
        setShowForm={setShowForm}
        setEditForm={setEditForm}
        handleEdit={handleEdit}
        handleChange={handleChange}
        editForm={editForm}
        handleDelete={handleDelete}
      />
    </main>
  );
}
