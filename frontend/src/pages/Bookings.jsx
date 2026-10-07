import { useEffect, useState } from "react";
import { getAllBookings, createBooking } from "../assets/scripts/fetchBookings";
import BookingCard from "../components/BookingCard";
import BookingForm from "../components/BookingForm";

export default function Bookings({ handleChange, catways, fetchCatways }) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",
  });

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

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      const newBooking = await createBooking(
        bookingForm,
        bookingForm.catwayNumber,
      );

      console.log("booking created");
      setBookings((prev) => [newBooking, ...prev]);
      await fetchBookings();
      setBookingForm({
        catwayNumber: "",
        clientName: "",
        boatName: "",
        startDate: "",
        endDate: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchCatways();
  }, []);

  const catwaysList = catways.map((catway) => catway.catwayNumber);

  const bookingList = bookings.map((booking) => {
    return (
      <BookingCard
        booking={booking}
        key={booking._id}
        setShowForm={setShowForm}
        showForm={showForm}
        catwaysList={catwaysList}
        handleChange={handleChange}
        setBookingForm={setBookingForm}
      />
    );
  });

  if (loadingBookings) {
    return <p>Chargement ...</p>;
  }

  return (
    <main>
      <h1>Réservations</h1>
      {!showForm && (
        <button
          className="create-booking-btn"
          onClick={() => setShowForm(true)}
        >
          Nouvelle Réservation
        </button>
      )}
      {showForm && (
        <div className="booking-form-modal">
          <BookingForm
            catwaysList={catwaysList}
            submitText="Réserver"
            inputChange={handleChange(setBookingForm)}
            submit={handleCreateBooking}
            form={bookingForm}
          />
          <button onClick={() => setShowForm(false)}>X</button>
        </div>
      )}
      <div className="booking-list">{bookingList}</div>
    </main>
  );
}
