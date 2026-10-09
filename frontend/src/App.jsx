// Import React components
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Import pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dasboard/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Dasboard/Users";
import User from "./pages/Dasboard/User";
import Catways from "./pages/Dasboard/Catways";
import Catway from "./pages/Dasboard/Catway";
import Bookings from "./pages/Dasboard/Bookings";
import Booking from "./pages/Dasboard/Booking";

// Import Components
import Layout from "./components/Layouts/Layout";
import DashboardLayout from "./components/Layouts/DashboardLayout";

// Styles-scripts
import "./assets/styles/app.css";
import "./assets/styles/header.css";
import "./assets/styles/dashboard.css";
import "./assets/styles/users.css";
import "./assets/styles/userform.css";
import "./assets/styles/catways.css";
import "./assets/styles/catwayForm.css";
import "./assets/styles/bookings.css";
import "./assets/styles/bookingForm.css";
import { getAllCatways } from "./assets/scripts/fetchCatways";
import { getUser, logout } from "./assets/scripts/fetchUsers";
import { getAllBookings } from "./assets/scripts/fetchBookings";

function App() {
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [catways, setCatways] = useState([]);
  const [loadingCatways, setLoadingCatways] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentBookings, setCurrentBookings] = useState([]);
  const navigate = useNavigate();

  const handleChange = (setForm) => (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function fetchCatways() {
    setLoadingCatways(true);
    try {
      const data = await getAllCatways();
      setCatways(data);
    } catch (error) {
      console.error(error.message);
      setCatways([]);
    } finally {
      setLoadingCatways(false);
    }
  }

  async function getCurrentUser() {
    const loggedUser = sessionStorage.getItem("logged");
    try {
      if (!loggedUser) return;
      const user = await getUser(loggedUser);
      setCurrentUser(user);
    } catch (error) {
      console.error(error.message);
      setCurrentUser(null);
    }
  }

  async function getCurrentBookings() {
    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    try {
      const data = await getAllBookings();
      const todayBookings = data.filter((booking) => {
        if (!booking.startDate || !booking.endDate) {
          console.warn("dates manquantes", booking);
          return false;
        }

        const startDate = booking.startDate.slice(0, 10);
        const endDate = booking.endDate.slice(0, 10);

        return startDate <= today && endDate >= today;
      });
      setCurrentBookings(todayBookings);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      setCurrentUser(null);
      setIsConnected(false);
      sessionStorage.removeItem("logged");
      sessionStorage.removeItem("selectedUser");
      sessionStorage.removeItem("selectedBookingId");
      sessionStorage.removeItem("selectedBookingCatwayNumber");
      sessionStorage.removeItem("selectedCatway");
      sessionStorage.removeItem("prevPage");
      navigate("/");
    } catch (error) {
      console.error("login error", error);
    }
  }

  useEffect(() => {
    if (!isConnected) return;
    fetchCatways();
    getCurrentBookings();
  }, [isConnected]);

  function handleUserError(form) {
    const newErrors = {};
    if (!form.username.trim()) {
      newErrors.username =
        "Le nom d'utilisateur est obligatoire et doit contenir entre 3 et 15 caractères";
    }
    if (!form.email.trim()) {
      newErrors.email =
        "L'email' est obligatoire et doit avoir un format valide";
    }

    if (!form.password.trim()) {
      newErrors.password =
        "Le mot de passe est obligatoire avec minimum 6 caractères";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  }

  const catwaysList = catways.map((catway) => catway.catwayNumber);
  if (error) return <p role="alert">{error}</p>;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            isConnected={isConnected}
            logout={handleLogout}
          />
        }
      >
        <Route index element={<Home isConnected={isConnected} />} />
        <Route
          path="register"
          element={
            <Register
              handleChange={handleChange}
              errors={errors}
              handleUserError={handleUserError}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login
              handleChange={handleChange}
              setIsConnected={setIsConnected}
              getCurrentUser={getCurrentUser}
              errors={errors}
            />
          }
        />
        <Route
          path="dashboard"
          element={
            <DashboardLayout isConnected={isConnected} logout={handleLogout} />
          }
        >
          <Route
            index
            element={
              <Dashboard
                handleChange={handleChange}
                currentUser={currentUser}
                currentBookings={currentBookings}
              />
            }
          />
          <Route path="users" element={<Users handleChange={handleChange} />} />
          <Route
            path="user"
            element={
              <User
                handleChange={handleChange}
                isConnected={isConnected}
                errors={errors}
                handleUserError={handleUserError}
              />
            }
          />

          <Route
            path="catways"
            element={
              <Catways
                handleChange={handleChange}
                catways={catways}
                setCatways={setCatways}
                loadingCatways={loadingCatways}
                fetchCatways={fetchCatways}
                isConnected={isConnected}
              />
            }
          />
          <Route
            path="catway"
            element={<Catway handleChange={handleChange} />}
          />
          <Route
            path="reservations"
            element={
              <Bookings
                handleChange={handleChange}
                catways={catways}
                fetchCatways={fetchCatways}
              />
            }
          />
          <Route
            path="reservation"
            element={
              <Booking
                handleChange={handleChange}
                catways={catways}
                catwaysList={catwaysList}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
