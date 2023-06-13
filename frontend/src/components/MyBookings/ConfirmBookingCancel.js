import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookingThunk } from "../../store/bookings";

const ConfirmBookingCancel = ({ bookingId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // dispatch(deleteCurrentSpotThunk(spotId));
    const cancelBooking = async () => {
        dispatch(deleteBookingThunk(bookingId))
        closeModal();
    }

    return (
        <div id="delete-booking-modal-container">
            <h3>Are you sure you want to cancel this booking?</h3>
            <button id="delete-booking-button" onClick={cancelBooking}>Yes (Delete booking)</button>
            <button id="keep-booking-button" onClick={closeModal}>No (Keep booking)</button>
        </div>

    )
}
export default ConfirmBookingCancel;
