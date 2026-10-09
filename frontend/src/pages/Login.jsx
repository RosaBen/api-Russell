import { useState } from "react";
import { login } from "../assets/scripts/fetchUsers";
import UserForm from "../components/dashboard/UserForm";
import { useNavigate } from "react-router-dom";

export default function Login({
  handleChange,
  setIsConnected,
  errors,
  getCurrentUser,
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
      sessionStorage.setItem("logged", loginForm.email);

      setIsConnected(true);
      await getCurrentUser();
      setLoginForm({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error) {
      sessionStorage.removeItem("logged");
      setIsConnected(false);
      setLoginForm({
        email: "",
        password: "",
      });
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
