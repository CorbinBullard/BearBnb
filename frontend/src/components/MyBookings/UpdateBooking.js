import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotBookingsThunk, fetchUserBookingsThunk, postBookingThunk, updateBookingThunk } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const UpdateBooking = ({ booking, spot }) => {
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings.currentSpotBookings);
    const history = useHistory();
    const [startDate, setStartDate] = useState(booking.startDate.split('T')[0]);
    const [endDate, setEndDate] = useState(booking.endDate.split('T')[0]);

    const [errors, setErrors] = useState({});
    const today = new Date().toLocaleDateString('en-CA');
    const date = today.split('-');
    date[2]++;
    const tomorrow = date.join('-');

    useEffect(() => {
        const start = startDate.split('-').join('');
        const end = endDate.split('-').join('');


        const errorsObj = {};
        if (!startDate) errorsObj.startDate = "Start Date is required";
        if (!endDate) errorsObj.endDate = "End Date is required";
        if (startDate && endDate && end - start <= 0) errorsObj.date = "End date cannot be on or before Start Date";
        if (startDate && endDate) {
            for (let i = 0; i < bookings.length; i++) {
                const _booking = bookings[i];
                if (_booking.id === booking.id) continue;
                console.log(_booking)
                const currStart = _booking.startDate.split('-').join('');
                const currEnd = _booking.endDate.split('-').join('');

                if (start <= currEnd && currStart <= end) {
                    errorsObj.bookingConflict = "Spot unavaliable during these dates";
                    break;
                }
            };
        }
        setErrors(errorsObj);

    }, [startDate, endDate])

    useEffect(() => {
        if (user) {
            dispatch(fetchSpotBookingsThunk(booking.spotId));
        }

    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBooking = {
            id: booking.id,
            startDate,
            endDate
        }
        dispatch(updateBookingThunk(newBooking))
        closeModal()
    }
    function getNumberOfDays(start, end) {
        const date1 = new Date(start);
        const date2 = new Date(end);

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    }

    return (
        <div className="update-booking-container">
            <div className="price-stars">
                <p id="spot-price">${spot.price} night</p>
                <p><i className="fa fa-star gold" /> {spot.avgStarRating ? spot.avgStarRating.toFixed(2) : "stars"}  <i className="fas fa-circle" />  {!spot.numReviews ? "New" : spot.numReviews === 1 ? spot.numReviews + " Review" : spot.numReviews + " Reviews"}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div id="booking-dates-container">
                    <label>
                        Start Date
                        <input
                            min={today}
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        End Date
                        <input
                            min={tomorrow}
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </label>
                    {startDate && endDate && !Object.values(errors).length &&
                        <p>Total: ${(spot.price * (getNumberOfDays(startDate, endDate))).toFixed(2)}</p>
                    }
                </div>
                {Object.values(errors).length ? (
                    <p className="errors">{errors.date}</p>
                ) : ('')}
                <button disabled={Object.values(errors).length}>{errors.date ? 'Spot unvaliable during these dates' : 'Update Booking'}</button>
            </form>
        </div>
    )
}
export default UpdateBooking;
