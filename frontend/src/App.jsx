// Import React components

// Import pages
import Register from "./pages/Register";

// Styles-scripts
import "./assets/styles/app.css";
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
      <main className="register">
        <Register handleChange={handleChange} />
      </main>
    </div>
  );
}

export default App;
