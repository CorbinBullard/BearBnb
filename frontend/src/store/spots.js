import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/loadAllSpots';
const LOAD_CURRENT_SPOT = 'spots/loadCurrentSpot';
const CREATE_NEW_SPOT = 'spots/createNewSpot';
const CREATE_NEW_SPOT_IMAGE = 'spots/createNewSpotImage';

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
    const res = await fetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json();
        dispatch(loadCurrentSpot(spot));
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
        
        return spot;
    }
}

// =============== CREATE NEW SPOT IMAGE =============== //
const createNewSpotImage = (image) => {
    return {
        type: CREATE_NEW_SPOT_IMAGE,
        image
    }
}

// export const postNewSpotImageThunk = (image) => async dispatch => {
//     const {url, preview} = image;
//     const res = await csrfFetch('')
// }


const initialState = {allSpots: [], singleSpot: {}};


const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ALL_SPOTS: {
            const newState = {...state};

            // action.spots.Spots.forEach(spot => {
            //     newState.allSpots[spot.id]
            // });
            newState.allSpots = action.spots.Spots;
            return newState;
        }
        case LOAD_CURRENT_SPOT: {
            const newState = {...state};
            newState.singleSpot = action.spot;
            return newState;
        }
        default:
            return state;
    }
}
export default spotReducer;
