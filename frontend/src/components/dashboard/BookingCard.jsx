import { useLocation, Link } from "react-router-dom";
import BookingForm from "./BookingForm";

export default function BookingCard({
  booking,
  handleChange,
  setShowForm,
  showForm,
  handleEdit,
  catwaysList,
  editForm,
  setEditForm,
  handleDelete,
}) {
  if (!booking) return null;
  const location = useLocation();

  const isBookingsPage = location.pathname === "/reservations";

  const formatDate = (value) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const bookingNumber = `Cat${booking.catwayNumber}-${String(new Date(booking.endDate).getDate()).padStart(2, "0")}-${String(new Date(booking.endDate).getMonth() + 1).padStart(2, "0")}-${new Date(booking.endDate).getFullYear()}`;

  return (
    <>
      {showForm && (
        <BookingForm
          catwaysList={catwaysList}
          submitText="Modifier"
          inputChange={handleChange(setEditForm)}
          submit={handleEdit}
          form={editForm}
        />
      )}
      {!showForm && booking && (
        <article className="booking-card">
          <p>
            Réservation: <span>{bookingNumber}</span>
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
              <Link
                to="/reservation"
                className="blue"
                onClick={() => {
                  sessionStorage.setItem("selectedBookingId", booking._id);
                  sessionStorage.setItem(
                    "selectedBookingCatwayNumber",
                    booking.catwayNumber,
                  );
                }}
              >
                Plus d'infos
              </Link>
            )}
            {!isBookingsPage && (
              <div className="edit-del-btns">
                <button
                  className="edit-btn orange"
                  onClick={() => {
                    setEditForm({
                      catwayNumber: booking.catwayNumber,
                      clientName: booking.clientName,
                      boatName: booking.boatName,
                      startDate: booking.startDate.slice(0, 10),
                      endDate: booking.endDate.slice(0, 10),
                    });
                    setShowForm(true);
                  }}
                >
                  Modifier
                </button>
                <button className="delete-btn red" onClick={handleDelete}>
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </article>
      )}
    </>
  );
}
