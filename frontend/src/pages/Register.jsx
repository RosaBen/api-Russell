import UserForm from "../components/UserForm";
import { createUser } from "../assets/scripts/fetchUsers";
import { useState } from "react";

export default function Register({ handleChange }) {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(registerForm);
      console.log("user created");
      setRegisterForm({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main>
      <h1>Créer un compte</h1>
      <UserForm
        submitText="Créer"
        inputChange={handleChange(setRegisterForm)}
        submit={handleRegister}
        form={registerForm}
      />
    </main>
  );
}
