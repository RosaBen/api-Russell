import { useEffect, useState } from "react";
import { getAllUsers } from "../assets/scripts/fetchApi";
import UserCard from "../components/UserCard";

export default function Users() {
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
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
    fetchUsers();
  }, []);

  if (loadingUsers) {
    return <p>Chargement ...</p>;
  }

  const usersList = users.map((user) => (
    <UserCard user={user} key={user._id || user.email} />
  ));
  return (
    <main className="users">
      <h1>Utilisateurs</h1>
      <div className="users-list">{usersList}</div>
    </main>
  );
}
