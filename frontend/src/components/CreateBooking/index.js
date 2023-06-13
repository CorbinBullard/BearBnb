import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotBookingsThunk, fetchUserBookingsThunk, postBookingThunk } from "../../store/bookings";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Bookings.css"

const CreateBooking = ({ spot }) => {

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings.currentSpotBookings);
    const history = useHistory();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [errors, setErrors] = useState({});
    const today = new Date().toLocaleDateString('en-CA');
    const date = today.split('-');
    date[2]++;
    const tomorrow = date.join('-');

    useEffect(() => {
        if (user) {
            dispatch(fetchSpotBookingsThunk(spot.id));
        }

    }, []);

    useEffect(() => {
        const start = startDate.split('-').join('');
        const end = endDate.split('-').join('');


        const errorsObj = {};
        if (!startDate) errorsObj.startDate = "Start Date is required";
        if (!endDate) errorsObj.endDate = "End Date is required";
        if (startDate && endDate && end - start <= 0) errorsObj.date = "End date cannot be on or before Start Date";
        if (startDate && endDate) {
            for (let i = 0; i < bookings.length; i++) {
                const booking = bookings[i];
                const currStart = booking.startDate.split('-').join('');
                const currEnd = booking.endDate.split('-').join('');

                if (start <= currEnd && currStart <= end) {
                    errorsObj.bookingConflict = "Spot unavaliable during these dates";
                    break;
                }
            };
        }
        setErrors(errorsObj);

    }, [startDate, endDate])



    const handleSubmit = async e => {
        e.preventDefault();
        if (Object.values(errors).length) {

        }
        const booking = {
            startDate,
            endDate
        }
        try {
            const res = await dispatch(postBookingThunk(spot.id, booking))
        } catch (e) {
            console.log(e)
        }
        history.push('/bookings')

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
        <div className="booking-container">
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
                <button disabled={Object.values(errors).length} className={Object.values(errors).length ? 'disabled' : ''}>{errors.bookingConflict ? 'Spot unvaliable during these dates' : 'Book this Spot'}</button>
            </form>

        </div>
    )
}
export default CreateBooking;
