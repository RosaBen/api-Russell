import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getUser } from "../assets/scripts/fetchApi";
import UserCard from "../components/UserCard";

export default function User() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const location = useLocation();
  useEffect(() => {
    async function fetchUser() {
      setLoadingUser(true);
      try {
        const email =
          location.state?.email || sessionStorage.getItem("selectedUser");
        if (!email) {
          setUser(null);
          return;
        }
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
  }, [location.state]);

  if (loadingUser) {
    return <p>Chargement ...</p>;
  }
  return (
    <>
      <UserCard user={user} />
    </>
  );
}
