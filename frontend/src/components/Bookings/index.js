import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotBookingsThunk, fetchUserBookingsThunk, postBookingThunk } from "../../store/bookings";

const Bookings = ({ spot, user }) => {
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings.userBookings)

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [errors, setErrors] = useState({})
    const today = new Date().toLocaleDateString('en-CA');
    const date = today.split('-')
    date[2]++;
    const tomorrow = date.join('-')

    useEffect(() => {
        if (user) {
            dispatch(fetchUserBookingsThunk())
                .then(() => dispatch(fetchSpotBookingsThunk(spot.id)));
        }

    }, []);

    useEffect(() => {
        const start = startDate.split('-').join('');
        const end = endDate.split('-').join('');

        const errorsObj = {}
        if (!startDate) errorsObj.startDate = "Start Date is required";
        if (!endDate) errorsObj.endDate = "End Date is required";
        if (startDate && endDate && end - start <= 0) errorsObj.date = "End date cannot be on or before Start Date";
        setErrors(errorsObj)
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

    }
    console.log("TODAY : ", today)
    console.log("TOMORROW : ", tomorrow)

    console.log("CURRENT USER BOOKINGS", bookings)
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
                </div>
                <button disabled={Object.values(errors).length}>Book This Listing</button>
            </form>

        </div>
    )
}
export default Bookings;
