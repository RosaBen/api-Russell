import { useState } from "react";
import { login } from "../assets/scripts/fetchUsers";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

export default function Login({
  handleChange,
  setIsConnected,
  setCurrentUser,
  errors,
}) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm);
      const currentEmail = loginForm.email;
      sessionStorage.setItem("logged", currentEmail);
      setCurrentUser(currentEmail);
      console.log("user connected");
      setIsConnected(true);
      setLoginForm({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      sessionStorage.removeItem("logged");
      setCurrentUser(null);
      console.error("login error", error);
    }
  };
  return (
    <main className="login-page">
      <h1>Connectez vous</h1>
      <UserForm
        inputChange={handleChange(setLoginForm)}
        submitText="Connexion"
        submit={handleLogin}
        form={loginForm}
        btnColor="green"
        errors={errors}
      />
    </main>
  );
}
