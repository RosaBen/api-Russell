import { useEffect, useState } from "react";
import { getBooking } from "../assets/scripts/fetchBookings";
import BookingCard from "../components/BookingCard";

export default function Booking() {
  const [booking, setBooking] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);
  const [bookingId, setBookingId] = useState(() =>
    sessionStorage.getItem("selectedBookingId"),
  );
  const [bookingCatwayNumber, setBookingCatwayNumber] = useState(() =>
    sessionStorage.getItem("selectedBookingCatwayNumber"),
  );

  async function fetchBooking() {
    if (!bookingCatwayNumber || !bookingId) {
      setBooking(null);
      setLoadingBooking(false);
      return;
    }
    setLoadingBooking(true);
    try {
      const bookingData = await getBooking(bookingCatwayNumber, bookingId);
      setBooking(bookingData);
    } catch (error) {
      console.error(error.message);
      setBooking(null);
    } finally {
      setLoadingBooking(false);
    }
  }

  useEffect(() => {
    fetchBooking();
  }, [bookingCatwayNumber, bookingId]);

  if (loadingBooking) {
    return <p>Chargement ...</p>;
  }
  return (
    <main>
      <BookingCard booking={booking} />
    </main>
  );
}
