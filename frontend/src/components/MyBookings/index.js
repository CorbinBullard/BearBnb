import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserBookingsThunk } from "../../store/bookings";
import BookingCard from "./BookingCard";

const MyBookings = () => {
    const dispatch = useDispatch();
    const bookings = Object.values(useSelector(state => state.bookings.userBookings));

    useEffect(() => {
        dispatch(fetchUserBookingsThunk())
    }, [])

    console.log(bookings);
    if (!bookings) return null;
    return (
        <div id="MyBookings-page">
            <div id="all-bookings-cards-container">

                {bookings.length ?
                    (bookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking} spot={booking.Spot} />
                    ))) :
                    (<div>
                        <h1>Looks like you have no bookings at this time...</h1>
                    </div>)
                }
            </div>
        </div>
    )
}
export default MyBookings;
