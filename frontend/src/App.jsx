// Import React components
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";
import User from "./pages/User";
import Catways from "./pages/Catways";
import Catway from "./pages/Catway";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Styles-scripts
import "./assets/styles/app.css";
import "./assets/styles/header.css";
import "./assets/styles/users.css";
import "./assets/styles/userform.css";
import "./assets/styles/catways.css";
import "./assets/styles/catwayForm.css";
import "./assets/styles/bookings.css";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const handleChange = (setForm) => (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <main>
        {showMenu && <div className="modal-overlay"></div>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register handleChange={handleChange} />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/user" element={<User handleChange={handleChange} />} />
          <Route
            path="/catways"
            element={<Catways handleChange={handleChange} />}
          />
          <Route
            path="/catway"
            element={<Catway handleChange={handleChange} />}
          />
          <Route
            path="/reservations"
            element={<Bookings handleChange={handleChange} />}
          />
          <Route
            path="/reservation"
            element={<Booking handleChange={handleChange} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
