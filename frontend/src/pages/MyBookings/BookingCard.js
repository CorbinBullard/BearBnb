import OpenModalButton from "../../components/OpenModalButton";
import CreateBooking from "../../pages/CreateBooking";
import ConfirmBookingCancel from "./ConfirmBookingCancel";
import "./MyBookings.css";
import UpdateBooking from "./UpdateBooking";

const BookingCard = ({ booking, spot }) => {
  const today = new Date().toLocaleDateString("en-CA").split("-").join("");
  const dateStr = booking.startDate.split("T")[0].split("-").join("");
  return (
    <div className="my-bookings-card-container">
      <img className="my-bookings-card-image" src={spot.previewImage} />
      <div className="my-bookings-card-right-side">
        <div className="my-bookings-card-info-container">
          <h4>{spot.name}</h4>
          <p>
            {spot.address}, {spot.city}, {spot.state}
          </p>
          <div className="bookings-dates-container">
            <label>Check In</label>
            <p className="booking-date">{booking.startDate.split("T")[0]}</p>
            <label>Check Out</label>
            <p className="booking-date">{booking.endDate.split("T")[0]}</p>
          </div>
        </div>
        {dateStr - today <= 0 ? (
          <p style={{ fontStyle: "italic", color: "rgb(130, 130, 130, 0.8)" }}>
            Booking Started
          </p>
        ) : (
          <div className="myBookings-update-delete-btns-container">
            <div className="my-bookings-card-update-delete-btns">
              <OpenModalButton
                buttonText={"Update Booking"}
                modalComponent={<UpdateBooking booking={booking} spot={spot} />}
              />
            </div>
            <div className="my-bookings-card-update/delete-btns">
              <OpenModalButton
                buttonText={"Cancel Booking"}
                modalComponent={<ConfirmBookingCancel bookingId={booking.id} />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BookingCard;
