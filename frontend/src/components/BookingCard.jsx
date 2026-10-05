import { useLocation, useNavigate } from "react-router-dom";

export default function BookingCard({ booking, bookingId }) {
  if (!booking) return null;
  const location = useLocation();
  const navigate = useNavigate();
  const isBookingsPage = location.pathname === "/reservations";

  const formatDate = (value) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleViewBooking = () => {
    sessionStorage.setItem("selectedBookingId", booking._id);
    sessionStorage.setItem("selectedBookingCatwayNumber", booking.catwayNumber);
    navigate("/reservation");
  };
  return (
    <article className="booking-card">
      <p>
        Réservation: <span>{bookingId}</span>
      </p>
      <p>
        Ponton <span>{booking.catwayNumber}</span>
      </p>
      <p>
        Client: <span>{booking.clientName}</span>
      </p>
      <p>
        Nom du bateau: <span>{booking.boatName}</span>
      </p>
      <div className="renting-period">
        <time dateTime={booking.startDate}>
          Date d'entrée:
          <span>{`${formatDate(booking.startDate)}`}</span>
        </time>
        <time dateTime={booking.endDate}>
          Date de départ:
          <span>{` ${formatDate(booking.endDate)}`}</span>
        </time>
      </div>
      <div className="btns">
        {isBookingsPage && (
          <button onClick={handleViewBooking}>Voir la réservation</button>
        )}
        {!isBookingsPage && (
          <div className="edit-del-btns">
            <button className="edit-btn">Modifier</button>
            <button className="delete-btn">Supprimer</button>
          </div>
        )}
      </div>
    </article>
  );
}
