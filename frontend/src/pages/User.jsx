import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../assets/scripts/fetchApi";
import UserCard from "../components/UserCard";

export default function User() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { email: emailParam } = useParams();
  useEffect(() => {
    async function fetchUser() {
      setLoadingUser(true);
      try {
        const email = decodeURIComponent(emailParam || "");
        const userData = await getUser(email);
        setUser(userData);
      } catch (error) {
        console.error(error.message);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, [emailParam]);

  if (loadingUser) {
    return <p>Chargement ...</p>;
  }
  return (
    <>
      <UserCard user={user} />
    </>
  );
}
