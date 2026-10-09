import { useEffect, useState } from "react";
import { getAllUsers } from "../../assets/scripts/fetchUsers";
import UserCard from "../../components/dashboard/UserCard";
import { Link } from "react-router-dom";

export default function Users() {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    setLoadingUsers(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error.message);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loadingUsers) {
    return <p>Chargement ...</p>;
  }

  const usersList = users.map((user) => (
    <UserCard user={user} key={user._id || user.email} />
  ));
  return (
    <main className="users-page">
      <h1>Utilisateurs</h1>
      <Link
        to="/register"
        className="green"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        Ajouter un nouvel utilisateur
      </Link>
      <div className="users-list">{usersList}</div>
    </main>
  );
}
