import { csrfFetch } from "./csrf";
import deepCopy from "./deepCopy";

const LOAD_USER_BOOKINGS = 'bookings/LoadUserBookings';
const LOAD_SPOT_BOOKINGS = 'bookings/LoadSpotBookings';
const CREATE_BOOKING = 'bookings/CreateNewBooking'

const loadUserBookingsAction = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

export const fetchUserBookingsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/bookings/current');

    if (res.ok) {
        const bookings = await res.json();
        dispatch(loadUserBookingsAction(bookings))
    }
}


const loadSpotBookingsAction = bookings => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    }
}

export const fetchSpotBookingsThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (res.ok) {
        const bookings = await res.json();
        dispatch(loadSpotBookingsAction(bookings))
    }
}


// Create Booking

const createBookingAction = booking => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const postBookingThunk = (spotId, booking) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method: 'POST',
        body: JSON.stringify({...booking})
    });

    if (res.ok) {
        const booking = await res.json();
        dispatch(createBookingAction(booking));
    } else {
        return res.errors;
    }
}



const initialState = { userBookings: {}, currentSpotBookings: {} }

const bookingsReducer = (state = initialState, action) => {
    const newState = deepCopy(state);

    switch (action.type) {
        case LOAD_USER_BOOKINGS: {
            console.log(action);
            console.log("bookings: ", action.bookings);
            if (action.bookings.Bookings.length) {
                action.bookings.Bookings.forEach(booking => {
                    console.log("BOOKING: ", booking)
                    newState.userBookings[booking.id] = booking;
                });
            }
            return newState;
        }
        case LOAD_SPOT_BOOKINGS: {

            if (action.bookings.Bookings.length) {
                newState.currentSpotBookings = action.bookings;
            }

            return newState;
        }
        default:
            return state;
    }
}

export default bookingsReducer;
