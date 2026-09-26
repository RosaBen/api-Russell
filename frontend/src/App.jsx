// Import React components

// Import pages
import Register from "./pages/Register";
import Users from "./pages/Users";

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
      <main className="register users">
        {/* <Register handleChange={handleChange} /> */}
        <Users />
      </main>
    </div>
  );
}

export default App;
