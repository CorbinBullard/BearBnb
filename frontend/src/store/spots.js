const LOAD_ALL_SPOTS = 'spots/loadAllSpots';
const LOAD_CURRENT_SPOT = 'spots/loadCurrentSpot'


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



const initialState = {allSpots: {}, singleSpot: {}};


const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ALL_SPOTS: {
            const newState = {...state};

            // action.spots.Spots.forEach(spot => {
            //     newState.allSpots[spot.id]
            // });
            newState.allSpots = action.spots.Spots
            return newState;
        }
        case LOAD_CURRENT_SPOT: {
            const newState = {...state}
            newState.singleSpot = action.spot;
            return newState;
        }
        default:
            return state;
    }
}
export default spotReducer;
