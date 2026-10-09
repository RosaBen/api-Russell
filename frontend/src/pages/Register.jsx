import UserForm from "../components/dashboard/UserForm";
import { createUser } from "../assets/scripts/fetchUsers";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ handleChange, errors, handleUserError }) {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    handleUserError(registerForm);
    try {
      await createUser(registerForm);

      setRegisterForm({
        username: "",
        email: "",
        password: "",
      });
      navigate("/users");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="register-page">
      <h1>Créer un compte</h1>
      <UserForm
        submitText="Créer"
        inputChange={handleChange(setRegisterForm)}
        submit={handleRegister}
        form={registerForm}
        btnColor="green"
        errors={errors}
      />
      <Link
        to="/users"
        // target="_blank" rel="noopener noreferrer"
      >
        Liste des utilisateurs
      </Link>
    </main>
  );
}
