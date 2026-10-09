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
      <p>
        Welcome <span>{currentUser.username}</span>
      </p>
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
              <p>Client: {booking.clientName}</p>
              <p>Bateau: {booking.boatName}</p>
              <p>
                Date entrée:
                {new Date(booking.startDate).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                Date sortie:
                {new Date(booking.endDate).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
