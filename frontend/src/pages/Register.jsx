import UserForm from "../components/UserForm";
import { createUser } from "../assets/scripts/fetchUsers";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ handleChange, errors, setErrors }) {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerForm.username.trim()) {
      newErrors.username =
        "Le nom d'utilisateur est obligatoire et doit contenir entre 3 et 15 caractères";
    }
    if (!registerForm.email.trim()) {
      newErrors.email =
        "L'email' est obligatoire et doit avoir un format valide";
    }

    if (!registerForm.password.trim()) {
      newErrors.password =
        "Le mot de passe est obligatoire avec minimum 6 caractères";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      await createUser(registerForm);
      console.log("user created");
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
