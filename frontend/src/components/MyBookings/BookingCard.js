import CreateBooking from "../CreateBooking";
import OpenModalButton from "../OpenModalButton";
import ConfirmBookingCancel from "./ConfirmBookingCancel";
import "./MyBookings.css"
import UpdateBooking from "./UpdateBooking";

const BookingCard = ({ booking, spot }) => {

    const today = new Date().toLocaleDateString('en-CA').split('-').join('');
    const dateStr = booking.startDate.split('T')[0].split('-').join('')
    return (
        <div className="my-bookings-card-container">
            <img className="my-bookings-card-image"
                src={spot.previewImage} />
            <div className="my-bookings-card-info-container">
                <p>{spot.address}, {spot.city}, {spot.state}</p>
                <label>Check In</label>
                <p>{booking.startDate.split('T')[0]}</p>
                <label>Check Out</label>
                <p>{booking.endDate.split('T')[0]}</p>
            </div>
            {dateStr - today <= 0 ?
                (<div>Booking Started</div>)
                :
                (<>
                    <div>
                        <OpenModalButton
                            buttonText={"Update Booking"}
                            modalComponent={<UpdateBooking booking={booking} spot={spot} />}
                        />
                    </div>
                    <div>
                        <OpenModalButton
                            buttonText={"Cancel Booking"}
                            modalComponent={<ConfirmBookingCancel bookingId={booking.id} />}
                        />
                    </div>
                </>)}
        </div>
    )
}
export default BookingCard;
