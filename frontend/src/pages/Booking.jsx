import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getBooking,
  editBooking,
  deleteBooking,
} from "../assets/scripts/fetchBookings";
import BookingCard from "../components/BookingCard";

export default function Booking({ handleChange, catwaysList }) {
  const [booking, setBooking] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [currentBookingCatwayNumber, setCurrentCatwayNumber] = useState(
    () =>
      location.state?.catwayNumber ||
      sessionStorage.getItem("selectedBookingCatwayNumber") ||
      "",
  );
  const currentBookingId = sessionStorage.getItem("selectedBookingId");

  async function fetchBooking() {
    if (!currentBookingCatwayNumber || !currentBookingId) {
      setBooking(null);
      setLoadingBooking(false);
      return;
    }
    setLoadingBooking(true);
    try {
      const bookingData = await getBooking(
        currentBookingCatwayNumber,
        currentBookingId,
      );
      setBooking(bookingData);
    } catch (error) {
      console.error(error.message);
      setBooking(null);
    } finally {
      setLoadingBooking(false);
    }
  }

  const handleEditBooking = async (e) => {
    e.preventDefault();
    try {
      await editBooking(editForm, currentBookingCatwayNumber, currentBookingId);
      const nextNumber = editForm.catwayNumber || currentBookingCatwayNumber;
      if (nextNumber !== currentBookingCatwayNumber) {
        sessionStorage.setItem("selectedBookingCatwayNumber", nextNumber);
        setCurrentCatwayNumber(nextNumber);
      } else {
        const newData = await getBooking(
          currentBookingCatwayNumber,
          currentBookingId,
        );
        setBooking(newData);
        console.log("booking edited");
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      console.log(currentBookingCatwayNumber);
      await deleteBooking(currentBookingId, currentBookingCatwayNumber);
      sessionStorage.removeItem("selectedBookingCatwayNumber");
      sessionStorage.removeItem("selectedBookingId");
      navigate("/reservations");

      console.log("booking deleted");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [currentBookingCatwayNumber, currentBookingId]);

  if (loadingBooking) {
    return <p>Chargement ...</p>;
  }
  return (
    <main>
      <Link
        to="/reservations"
        // target="_blank" rel="noopener noreferrer"
        onClick={() => {
          sessionStorage.removeItem("selectedBookingCatwayNumber");
          sessionStorage.removeItem("selectedBookingId");
        }}
      >
        Retour aux réservations
      </Link>
      <BookingCard
        booking={booking}
        handleChange={handleChange}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleEdit={handleEditBooking}
        editForm={editForm}
        setEditForm={setEditForm}
        catwaysList={catwaysList}
        handleDelete={handleDelete}
      />
    </main>
  );
}
