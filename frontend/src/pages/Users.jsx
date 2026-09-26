import { useEffect, useState } from "react";
import { getAllUsers } from "../assets/scripts/fetchApi";
import User from "../components/User";

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const userlist = await getAllUsers();
        setUsers(userlist);
      } catch (error) {
        console.error(error.message);
        setUsers({});
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Chargement ...</p>;
  }

  const usersList = users.map((user) => <User user={user} key={user._id} />);
  return (
    <>
      <h1>Utilisateurs</h1>
      <div className="users-list">{usersList}</div>
    </>
  );
}
