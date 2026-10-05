import { useEffect, useState } from "react";
import { getAllBookings } from "../assets/scripts/fetchBookings";
import BookingCard from "../components/BookingCard";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  async function fetchBookings() {
    setLoadingBookings(true);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error(error.message);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const bookingList = bookings.map((booking) => {
    const bookingId = `Cat${booking.catwayNumber}-${new Date(booking.endDate).getDate()}-${new Date(booking.endDate).getMonth()}`;
    return (
      <BookingCard booking={booking} key={booking._id} bookingId={bookingId} />
    );
  });

  if (loadingBookings) {
    return <p>Chargement ...</p>;
  }

  return (
    <main>
      <h1>Réservations</h1>
      <div className="booking-list">{bookingList}</div>
    </main>
  );
}
