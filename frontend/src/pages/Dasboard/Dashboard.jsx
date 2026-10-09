import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

export default function Dashboard({
  handleChange,
  currentUser,
  currentBookings,
}) {
  const today = new Date();
  const navigate = useNavigate();

  return (
    <main className="dashboard-page">
      <h1>Tableau de Bord</h1>
      <button
        className="previous-page-btn"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/home");
          }
        }}
      >
        <IoMdReturnLeft /> Retour à la page précédente
      </button>
      <h2>
        Welcome <span>{currentUser.username}</span>
      </h2>
      <div className="dashboard-infos">
        <p>{currentUser.email}</p>
        <p>
          {today.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <a
          href="#"
          // target="_blank" rel="noopener noreferrer"
        >
          Documentation Api
        </a>
      </div>
      <section className="current-bookings">
        <h2>Réservations en cours</h2>
        {currentBookings.map((booking) => {
          return (
            <div className="current-booking" key={booking._id}>
              <p>Ponton {booking.catwayNumber}</p>
              <p>
                Client: <span>{booking.clientName}</span>
              </p>
              <p>
                Bateau: <span>{booking.boatName}</span>
              </p>
              <p>
                Date entrée:
                <span>
                  {" "}
                  {new Date(booking.startDate).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p>
                Date sortie:
                <span>
                  {" "}
                  {new Date(booking.endDate).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
