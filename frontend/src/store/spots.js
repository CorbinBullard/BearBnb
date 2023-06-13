import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/loadAllSpots';
const LOAD_CURRENT_SPOT = 'spots/loadCurrentSpot';
const CREATE_NEW_SPOT = 'spots/createNewSpot';
// const CREATE_NEW_SPOT_IMAGE = 'spots/createNewSpotImage';
const DELETE_SPOT = 'spots/deleteSpot';
const UPDATE_SPOT = 'spots/updateSpot';

// =============== LOAD ALL SPOTS =============== //
const loadSpots = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots: spots
    }
}

export const fetchAllSpotsThunk = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots));
    }
}

// =============== LOAD CURRENT SPOT =============== //

const loadCurrentSpot = spot => {
    return {
        type: LOAD_CURRENT_SPOT,
        spot
    }
}

export const fetchCurrentSpotThunk = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json();
        dispatch(loadCurrentSpot(spot));
        return spot;
    }
}

// =============== CREATE NEW SPOT =============== //
const createNewSpot = (spot) => {
    return {
        type: CREATE_NEW_SPOT,
        spot
    }
}

export const postNewSpotThunk = (spot) => async (dispatch) => {

    const {address, city, state, country, lat, lng, name, description, price} = spot;
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price })
    })
    if (res.ok) {
        const spot = await res.json();
        dispatch(createNewSpot(spot))
        return spot;
    }
}

// =============== GET CURRENT USERS SPOTS =============== //
export const fetchCurrentUserSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current');
    if (res.ok) {
        const spots = await res.json();
        dispatch(loadSpots(spots))
    }
}
// =============== DELETE CURRENT SPOT =============== //
const deleteSpot = spotId => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}
export const deleteCurrentSpotThunk = spotId => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteSpot(spotId))
    }
}
// =============== UPDATE CURRENT SPOT =============== //

const updateSpot = spot => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

export const updateCurrentSpotThunk = spot => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price })
    })
    if (res.ok) {
        const spot = await res.json()
        dispatch(updateSpot(spot))
    }
}

// REDUCER

const initialState = {allSpots: {}, singleSpot: {}};


const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ALL_SPOTS: {
            // const newState = {...state};
            const newState = {...state, allSpots: {}, singleSpot: {}};
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            // newState.allSpots = action.spots.Spots;
            return newState;
        }
        case LOAD_CURRENT_SPOT: {
            const newState = {...state, singleSpot: {}};
            newState.singleSpot = action.spot;
            return newState;
        }
        case DELETE_SPOT: {
            const newState = {allSpots: { ...state.allSpots }, singleSpot: {} }
            delete newState.allSpots[action.spotId];
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = {allSpots: {...state.allSpots}, singleSpot: {}}
            newState.singleSpot = action.spot;
            return newState;
        }
        default:
            return state;
    }
}
export default spotReducer;
