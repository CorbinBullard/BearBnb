import { csrfFetch } from "./csrf";
import deepCopy from "./deepCopy";

const LOAD_USER_BOOKINGS = 'bookings/LoadUserBookings';
const LOAD_SPOT_BOOKINGS = 'bookings/LoadSpotBookings';
const CREATE_BOOKING = 'bookings/CreateNewBooking';
const UPDATE_BOOKING = 'bookings/UpdateBooking';
const DELETE_BOOKING = 'bookings/DeleteBooking';
const CLEAR_USER_BOOKINGS = 'bookings/ClearUserBookings'

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
        dispatch(loadSpotBookingsAction(bookings));
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

    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify({ ...booking })
    });

    if (res.ok) {
        const booking = await res.json();
        dispatch(createBookingAction(booking));
    } else {
        return res.errors;
    }
}

// Update Booking
const updateBookingAction = booking => {
    return {
        type: UPDATE_BOOKING,
        booking
    }
}

export const updateBookingThunk = booking => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        body: JSON.stringify({...booking})
    })
    if (res.ok) {
        const booking = await res.json();
        dispatch(updateBookingAction(booking))
    }
}

// Delete Booking
const deleteBookingAction = bookingId => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

export const deleteBookingThunk = bookingId => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteBookingAction(bookingId));
    }
}
export const clearUserBookingsAction = () => {
    return {
        type: CLEAR_USER_BOOKINGS
    }
}


const initialState = { userBookings: {}, currentSpotBookings: {} }

const bookingsReducer = (state = initialState, action) => {
    const newState = deepCopy(state);

    switch (action.type) {
        case LOAD_USER_BOOKINGS: {
            newState.userBookings = {};
            if (action.bookings.Bookings.length) {
                action.bookings.Bookings.forEach(booking => {
                    newState.userBookings[booking.id] = booking;
                });
            }
            return newState;
        }
        case LOAD_SPOT_BOOKINGS: {
            if (action.bookings.Bookings.length) {
                newState.currentSpotBookings = action.bookings.Bookings;
            }
            return newState;
        }
        case CREATE_BOOKING: {
            newState.userBookings[action.booking.id] = action.booking
            return newState;
        }
        case UPDATE_BOOKING: {
            newState.userBookings[action.booking.id].startDate = action.booking.startDate;
            newState.userBookings[action.booking.id].endDate = action.booking.endDate;
            return newState;
        }
        case DELETE_BOOKING: {
            delete newState.userBookings[action.bookingId];
            return newState;
        }
        case CLEAR_USER_BOOKINGS: {
            newState.userBookings = {};
        }
        default:
            return state;
    }
}

export default bookingsReducer;
