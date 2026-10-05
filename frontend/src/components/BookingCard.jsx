import { useLocation } from "react-router-dom";

export default function BookingCard({ booking, bookingId }) {
  if (!booking) return null;
  const location = useLocation();
  // const isBookingsPage = location.pathname === "/reservations";
  return (
    <article className="booking-card">
      <p>
        Réservation: <span>{bookingId}</span>
      </p>
      <p>
        Ponton numéro <span>{booking.catwayNumber}</span>
      </p>
      <p>
        Client: <span>{booking.clientName}</span>
      </p>
      <p>
        Nom du bateau: <span>{booking.boatName}</span>
      </p>
      <div className="renting-period">
        <time dateTime="20/12/2026">
          Date d'entrée:
          <span>{` ${new Date(booking.startDate).getDate()}/${new Date(booking.startDate).getMonth()}/${new Date(booking.startDate).getFullYear()}`}</span>
        </time>
        <time dateTime="20/12/2026">
          Date de départ:
          <span>{` ${new Date(booking.endDate).getDate()}/${new Date(booking.endDate).getMonth()}/${new Date(booking.endDate).getFullYear()}`}</span>
        </time>
      </div>
    </article>
  );
}
