// Import React components
import { Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";
import User from "./pages/User";

// Styles-scripts
import "./assets/styles/app.css";
import "./assets/styles/users.css";
import "./assets/styles/userform.css";

function App() {
  const handleChange = (setForm) => (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register handleChange={handleChange} />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/user" element={<User handleChange={handleChange} />} />
      </Routes>
    </div>
  );
}

export default App;
